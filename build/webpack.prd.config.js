const path = require("path");
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDevConfig = require("./webpack.base.config");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const dependencies = require("../package").dependencies;
const utils = require("./utils");

module.exports = webpackMerge(webpackDevConfig, {
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
                        loader: "css-loader",
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
        // runtimeChunk: {
        //     name: 'manifest'
        // },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                // default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                //     minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                //     priority: -20, // 优先级
                //     reuseExistingChunk: true, // 默认使用已有的模块
                // },
                // 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    // 优先级
                    priority: 10
                },
                // 打包业务中公共代码
                common: {
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true, // 默认使用已有的模块
                }
            }
        }
    },
    plugins: [
        // new UglifyJSPlugin(),
        new CleanWebpackPlugin(
            ['assets/*.js', 'assets/*.css', 'assets/images/**', 'assets/index.html'],　 //匹配删除的文件
            {
                root: path.join(__dirname, '../'),       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: devMode ? '[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            filename: 'all.[contenthash:8].css',
            chunkFilename: 'all.[contenthash:8].css'
        }),
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
