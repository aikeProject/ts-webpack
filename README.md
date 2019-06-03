##### webpack 配置

- 升级 webpack4

- 运行之前先执行

```
npm run dll
```
- 将一些基本不变的包事先打包好，直接引用

- 开发运行

```
npm start
```

- 生产打包

```
npm run build:build
```

- 依赖包分析

```
开发运行
npm run start:report

生成运行
npm run build:progress
```

- 目录结构

```
|-- .babelrc
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- package.json
    |-- README.md
    |-- tsconfig.json typescript 配置文件
    |-- .cache
    |-- assets webpack 打包出口
    |-- build  webpack 配置文件目录
    |   |-- build.js 
    |   |-- config.js  webpack 参数配置文件
    |   |-- mymock.js  mock 数据文件
    |   |-- utils.js   
    |   |-- webpack.base.config.js 基础配置
    |   |-- webpack.dev.config.js  开发配置
    |   |-- webpack.dll.config.js  dll配置
    |   |-- webpack.prd.config.js  生产配置
    |-- dll
    |-- public 不参与打包的静态文件目录
    |   |-- index.html html模版
    |-- source  
    |   |-- dll.png
    |   |-- happypack.png
    |   |-- ParallelUglifyPlugin.png
    |   |-- ParallelUglifyPlugin2.png
    |   |-- Snipaste_2019-05-29_13-01-04.png
    |-- src 项目开发文件夹
    |   |-- App.less
    |   |-- App.tsx
    |   |-- index.tsx webpack打包入口文件
    |   |-- Common
    |   |   |-- Constans.ts
    |   |   |-- global.d.ts typescript 配置文件
    |   |   |-- util.ts
    |   |-- Components 组件
    |   |   |-- .gitkeep
    |   |-- images 
    |   |-- Interface
    |   |   |-- interface.tsx
    |   |-- Modules
    |   |   |-- .gitkeep
    |   |-- Pages 
    |   |   |-- Empty
    |   |   |   |-- action.tsx
    |   |   |   |-- index.less
    |   |   |   |-- index.tsx
    |   |   |   |-- interface.tsx
    |   |   |   |-- images
    |   |   |       |-- test.png
```
