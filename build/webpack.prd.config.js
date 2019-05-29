const path = require("path");
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 将css从js中分割成独立文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const utils = require("./utils");
const webpackDevConfig = require("./webpack.base.config");
const config = require('./config.js');

const webpackPrdConfig = webpackMerge(webpackDevConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "happypack/loader?id=happy-css",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: [
                                        "iOS >= 7",
                                        "Firefox >= 20",
                                        "Android > 4",
                                        "Firefox ESR",
                                        '> 5%'
                                    ], //适配到浏览器最新的几个版本
                                    cascade: false,
                                    remove: true //是否去掉不必要的前缀 默认：true
                                }),
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                    },
                ]
            }
        ],
    },
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
                    priority: -20,
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
            ['assets/*.js', 'assets/*.css', 'assets/images/**', 'assets/index.html'],
            {
                // 根目录
                root: path.join(__dirname, '../'),
                // 开启在控制台输出信息　　　　　　　　　　
                verbose: true,
                // 启用删除文件　　　　　　　　　　
                dry: false
            }
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'all.[contenthash:8].css',
            chunkFilename: 'all.[contenthash:8].css'
        }),
        utils.createHappyPlugin('happy-css', ['css-loader']),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
                preset: ['default', {discardComments: {removeAll: true}}],
            },
            canPrint: true
        })
    ],
    output: {
        path: path.join(__dirname, "../assets"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "[name].[chunkhash:8].js"
    },
    entry: {
        // vendor: utils.objToList(dependencies),
        app: [
            './src/index',
        ],
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
