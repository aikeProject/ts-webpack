/**
 * @author 成雨
 * @date 2019/5/29 0029$
 * @Description: webpack 配置文件
 */

const path = require('path');
const utils = require('./utils.js');

module.exports = {
    base: {
        // 出口
        assetsRoot: utils.resolve('assets'),

        // 是否开启bundle分析
        // npm命令后面加上--report 就表示最后启动bundle分析，不加就不会启动bundle分析
        // 默认关闭
        analyzerReport: process.env.npm_config_report || false
    },
    dev: {
        // cdn
        assetsPublicPath: '',

        // dev server
        host: 'localhost',
        port: 7000,
        // 自动打开浏览器 默认关闭
        autoOpenBrowser: false,
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
        },

        // 接口数据 mock
        mockPort: 7001
    },
    build: {
        // cdn
        assetsPublicPath: '',

        // gzip压缩 默认关闭
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
    }
};
