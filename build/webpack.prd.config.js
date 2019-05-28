const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackDevConfig = require("./webpack.base.config");
const dependencies = require("../package").dependencies;
const utils = require("./utils");

module.exports = webpackMerge(webpackDevConfig, {
    plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(
            ['assets/*.js', 'assets/*.css', 'assets/images/**', 'assets/index.html'],　 //匹配删除的文件
            {
                root: path.join(__dirname, '../'),       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash:8].js'
        }),
    ],
    output: {
        path: path.join(__dirname, "../assets"),
        filename: "bundle.[chunkhash:8].js"
    },
    entry: {
        vendor: utils.objToList(dependencies),
        app: [
            './src/index',
        ],
    },
});