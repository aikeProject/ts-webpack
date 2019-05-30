const path = require("path");
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 将css从js中分割成独立文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const utils = require("./utils");
const webpackDevConfig = require("./webpack.base.config");
const config = require('./config.js');

const webpackPrdConfig = webpackMerge(webpackDevConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            // 多进程压缩
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        // 不需格式化
                        comments: false,
                        // 不保留注释
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
            // 压缩css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: cssnano,
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
                canPrint: true
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                // 模块缓存规则，设置为false，默认缓存组将禁用
                default: {
                    // 模块被引用>=2次，拆分至vendors公共模块
                    minChunks: 2,
                    // 优先级
                    priority: 5,
                    // 默认使用已有的模块
                    reuseExistingChunk: true,
                },
                // 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    // 优先级
                    priority: 10
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(
            // 匹配删除的文件
            ['assets/*'],
            {
                // 根目录
                root: path.join(__dirname, '../'),
                // 开启在控制台输出信息　　　　　　　　　　
                verbose: false
            }
        ),
        new CopyPlugin([
            {
                from: utils.resolve('public'),
                to: utils.resolve('assets'),
            }
        ]),
        utils.createHappyPlugin('happy-css', ['css-loader']),
    ],
    output: {
        path: path.join(__dirname, "../assets"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js",
        publicPath: config.build.assetsPublicPath
    },
});

if (config.build.productionGzip) {
    // 添加gzip压缩插件
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackPrdConfig.plugins.push(
        new CompressionWebpackPlugin({
            // 压缩后文件名
            filename: '[path].gz[query]',
            //  算法
            algorithm: 'gzip',
            // 针对文件的正则表达式规则，符合规则的文件被压缩
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            // 文件大于这个值会被压缩
            threshold: 10240,
            // 压缩率
            minRatio: 0.8
        })
    );
}

module.exports = webpackPrdConfig;
