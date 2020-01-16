import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Button, Upload, Icon, message} from 'antd';
import './App.css';

const { Dragger } = Upload;

const App = () => {
    const [fileList, setFileList] = useState([])
    const gameInstance = useRef({})

    function createUnityInstance(jsonUrl) {
        gameInstance.current = window.UnityLoader.instantiate("gameContainer", "Build/Build.json", {onProgress: window.UnityProgress});
        console.log(gameInstance.current);
    }

    useEffect(() => {
        createUnityInstance()
    }, [])

    function handleFullscreen() {
        gameInstance.current.SetFullscreen(1);
    }

    async function handleUpload(file) {
        const fd = new FormData();
        fd.append('file', file)
        console.log(file);
        setFileList([{
            uid: file.uid,
            name: file.name,
            status: 'uploading',
        }])
        try {
            const result = await axios.post('/api/v1/upload', fd);
            console.log(result);
            if (!result) return
            console.log(result.data[file.name].id)
            gameInstance.current.SendMessage('GameManager', 'WebInfoProcessor', result.data[file.name].url)
        } catch(e) {
            message.error('未知错误');
        }

        setFileList([{
            uid: file.uid,
            name: file.name,
            status: 'done',
        }])
    }

    const props = {
        name: 'files',
        multiple: false,
        accept: '.wav',
        fileList,
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            handleUpload(file)

            return false;
        }
      };

    return (
        <>
            <Button style={{position: 'absolute'}} onClick={createUnityInstance}>重置</Button>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                <Dragger {...props} style={{width: 320, height: 150, background: '#fff'}}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="cloud-upload" style={{fontSize: 40}}/>
                    </p>
                    <p style={{fontSize: 12}}>点击或将wav文件拖到这里上传</p>
                </Dragger>
            </div>
            <div className="webgl-content">
            <div id="gameContainer" style={{width: 640, height: 400, position: 'relative'}}></div>
            <div className="footer">
                <div className="webgl-logo"></div>
                <div className="fullscreen" style={{cursor: 'pointer'}} onClick={handleFullscreen}></div>
                <div className="title">WebGLBuild</div>
            </div>
            </div>
        </>
    )
} 

export default App;