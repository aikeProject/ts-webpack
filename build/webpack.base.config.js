const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require("./utils");

module.exports = {
    plugins: [
        new ExtractTextPlugin({filename: "all.[contenthash:8].css"}),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!src/index.html',
            filename: './index.html',
            showErrors: false,
        }),
        new webpack.NamedModulesPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'},
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'babel-loader'},
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
            {

                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
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
                })
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
}