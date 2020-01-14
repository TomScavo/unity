
import axios from 'axios';

const input = document.querySelector('#upload');

async function handleUpload(e) {
    const target = e.target;
    const file = target.files[0];

    const fd = new FormData();
    fd.append('file', file);

    const result = await axios.post('/api/v1/upload', fd);
    debugger
    console.log(result)
}

input.onchange = handleUpload;