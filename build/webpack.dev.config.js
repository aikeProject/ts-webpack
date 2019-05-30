const path = require("path");
const webpackMerge = require("webpack-merge");
const webpackDevConfig = require("./webpack.base.config");
const utils = require("./utils");
const config = require("./config");

// mock数据 本地服务
utils.runServer(config.dev.mockPort);

module.exports = webpackMerge(webpackDevConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: config.base.assetsRoot,
        filename: "[name].[hash:8].js",
        publicPath: config.dev.assetsPublicPath
    },
    plugins: [
        utils.createHappyPlugin('happy-css', [{
            loader: 'css-loader',
            // options: {
            //     css modules
            // importLoaders: 1,
            // modules: true,
            // localIdentName: '[local]__[hash:7]'
            // }
        }]),
    ],
    devServer: {
        historyApiFallback: true,
        port: config.dev.port || 7000,
        host: config.dev.host || 'localhost',
        // hot: true,
        inline: true,
        open: config.dev.autoOpenBrowser || false,
        contentBase: utils.resolve('public'),
        proxy: config.dev.proxy || {}
    },
});
