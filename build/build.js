/**
 * @author 成雨
 * @date 2019/5/29 0029$
 * @Description: webpack 方法
 */

const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackPrdConfig = require('./webpack.prd.config');
const spinner = ora('编译...\n').start();

webpack(webpackPrdConfig, function (err, stats) {
    if (err) {
        spinner.fail('编译失败...\n\n');
        console.log(err);
        return;
    }
    spinner.succeed('编译结束...\n');

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n'
    );

    console.log(chalk.cyan('  编译成功！\n'));
    // console.log(chalk.yellow(
    //     '  提示: 编译后的文件可以上传并且部署到服务器\n' +
    //     '  通过file:// 打开index.html不会起作用.\n'
    // ));
});
