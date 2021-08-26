var path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  chainWebpack(config) {
    // 路径配置
    config.resolve.alias.set('@', resolve('src')) //根目录
  }
}
