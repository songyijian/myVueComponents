# vue 控件（vuecontol）

## 环境（yarn）

```
yarn install
yarn run serve
yarn run build
yarn run test
yarn run lint
yarn run test:e2e
```

#### 路径配置 vue.config.js

```
chainWebpack(config) {
  // 路径配置
  config.resolve.alias
    .set('~', resolve('src'))               //根目录
    .set('@contol', resolve('src/contol'))  //控件
    .set('@views', resolve('src/views'))    //页面文件
    .set('@assets', resolve('src/assets'))  //静态文件
    .set('@style', resolve('src/style'))    //样式文件
    .set('@func', resolve('src/func'))      //公用func
    .set('@router', resolve('src/router'))  //router
}
```

#### mock 数据

实现： 本地 mock.js 拦截 ajax 请求  
mock.js (https://github.com/nuysoft/Mock/wiki)

```
mock
  > index.js //入口文件,模块引入import "./home.js"
```

#### 模版

支持</>,pug 写法

```
// vue.config.js
chainWebpack(config) {
  // pug模版配置
  config.module.rule('pug')
    .test(/\.pug$/)
    .use('pug-html-loader')
    .loader('pug-html-loader')
    .end()
}
```
