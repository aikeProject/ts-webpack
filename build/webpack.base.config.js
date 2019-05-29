const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const utils = require("./utils");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'happypack/loader?id=happy-babel'},
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'happypack/loader?id=happy-babel'},
                    {loader: 'awesome-typescript-loader'},
                ],
            },
            {
                test: /\.(jpg|gif|svg)$/,
                loader: "url-loader?limit=1024&name=images/[hash:8].[name].[ext]"
            },
            {
                test: /\.png$/,
                loader: "file-loader?name=images/[hash:8].[name].[ext]"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!src/index.html',
            filename: './index.html',
            showErrors: false,
        }),
        utils.createHappyPlugin('happy-babel', [{
            loader: 'babel-loader',
            options: {
                babelrc: true,
                cacheDirectory: true // 启用缓存
            }
        }]),
        new webpack.NamedModulesPlugin(),
    ],
    optimization: {
        minimizer: [
            new ParallelUglifyPlugin({ // 多进程压缩
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    }
                }
            }),
        ],
    },
    resolve: {
        // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
        modules: [
            utils.resolve('src'),
            utils.resolve('node_modules'),
        ],
        alias: {
            '@': utils.resolve('src')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
};
