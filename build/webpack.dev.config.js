const path = require("path");
const webpackMerge = require("webpack-merge");
const webpackDevConfig = require("./webpack.base.config");
const utils = require("./utils");

utils.runServer(7008);

module.exports = webpackMerge(webpackDevConfig, {
    mode: 'development',
    entry: {
        app: [
            './src/index',
        ],
    },
    output: {
        path: path.join(__dirname, "../assets"),
        filename: "bundle.[hash:8].js"
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'css-hot-loader',
                    },
                    {
                        loader: 'style-loader',
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
    devServer: {
        historyApiFallback: true,
        port: 7000,
        host: '0.0.0.0',
        // hot: true,
        inline: true,
        contentBase: path.join(__dirname, "../assets"),
        proxy: {
            '/proxy': {
                target: 'http://127.0.0.1:7008',
                changeOrigin: true
            },
            '/remote': {
                target: 'https://sit3.jianjian.work',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/remote': ''
                }
            },
        }
    },
});
