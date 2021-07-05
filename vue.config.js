var path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  chainWebpack(config) {
    // 路径配置
    config.resolve.alias
      .set("@", resolve("src")) //根目录
      .set("@contol", resolve("src/contol")) //控件
      .set("@views", resolve("src/views")) //页面文件
      .set("@assets", resolve("src/assets")) //静态文件
      .set("@style", resolve("src/style")) //样式文件
      .set("@utils", resolve("src/utils")) //公用func
      .set("@router", resolve("src/router")) //router
      .set("@store", resolve("src/store")) //store
      .set("@mock", resolve("src/mock")); //mock
  },
};
