const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  debugger
  app.use("/api/v1/upload", proxy({
    target: "http://unity.apps-dev.danlu.netease.com",
    changeOrigin: true
  }));
};