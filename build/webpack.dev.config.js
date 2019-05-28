const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const gulp = require('gulp');

const webpackDevConfig = require("./webpack.base.config");
const dependencies = require("../package").dependencies;
const utils = require("./utils");

utils.runServer(7008);

module.exports = webpackMerge(webpackDevConfig, {
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
                changeOrigin: true,
                pathRewrite: {
                    '^/remote': ''
                }
            },
        }
    },
});
