/**
 * @author 成雨
 * @date 2019/5/29 0029$
 * @Description: webpack 配置文件
 */

const path = require('path');

console.log('--npm_config_report--', process.env.npm_config_report);

module.exports = {
    base: {
        // 是否开启bundle分析
        // npm命令后面加上--report 就表示最后启动bundle分析，不加就不会启动bundle分析
        // 默认关闭
        analyzerReport: process.env.npm_config_report || false
    },
    dev: {},
    build: {
        // gzip压缩
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
    }
};
