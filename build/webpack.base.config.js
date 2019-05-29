const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 压缩js代码
// webpack-parallel-uglify-plugin 能够把任务分解给多个子进程去并发的执行，
// 子进程处理完后再把结果发送给主进程，从而实现并发编译，进而大幅提升js压缩速度
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

// 注入编译好的‘dll’文件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const utils = require("./utils");
const config = require('./config');

const base = {
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
                exclude: /node_modules/,
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
        new webpack.DllReferencePlugin({
            manifest: require("../dll/react.dll.manifest.json")
        }),
        // 往html中注入dll js
        new AddAssetHtmlPlugin([{
            // 注入到html中的路径
            publicPath: "/dll",
            // 最终输出的目录
            outputPath: "dll",
            filepath: utils.resolve('dll/*.js'),
            includeSourcemap: false,
            typeOfAsset: "js" // options js、css; default js
        }]),
        new webpack.NamedModulesPlugin()
    ],
    optimization: {
        minimizer: [
            // 多进程压缩
            new ParallelUglifyPlugin({
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

if (config.base.analyzerReport) {
    // 编译结果分析
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    base.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = base;
