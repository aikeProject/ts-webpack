/**
 * @author 成雨
 * @date 2019/5/29 0029$
 * @Description: webpack打包时，有一些框架代码是基本不变的，比如说 babel-polyfill、vue、vue-router、vuex、axios、element-ui、fastclick ,react, react-dom等，
 * 这些模块也有不小的 size，每次编译都要加载一遍，比较费时费力。使用 DLLPlugin 和 DLLReferencePlugin 插件，便可以将这些模块提前打包
 */

const webpack = require("webpack");
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");

// dll文件存放的目录
const dllPath = path.resolve(__dirname, "../dll");
const utils = require('./utils.js');

module.exports = {
    entry: {
        // 把 react 相关模块的放到一个单独的动态链接库
        react: ["react", "react-dom", "dayjs"]
    },
    output: {
        filename: "[name]-[hash:8].dll.js", // 生成react.dll.js
        path: dllPath,
        library: "_dll_[name]"
    },
    plugins: [
        // 清除之前的dll文件
        new CleanWebpackPlugin(["*.js"], {
            root: dllPath,
        }),
        new webpack.DllPlugin({
            name: "_dll_[name]",
            // manifest.json 描述动态链接库包含了哪些内容
            path: utils.resolve("dll/[name].dll.manifest.json")
        }),
    ],
};
