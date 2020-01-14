const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  console.log("Setup proxy is ever called");
  app.use(proxy("/api/v1/upload", { target: "http://unity.apps-dev.danlu.netease.com" }));
};