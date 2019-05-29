const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require("./utils");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!src/index.html',
            // template: 'src/index.html',
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
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
};
