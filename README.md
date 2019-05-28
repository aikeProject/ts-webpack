#### 项目运行
-   `启动` `npm run start`
-   `打包` `npm run build`
-   `代码检查` `npm run eslint`

#### 开发日志

##### `日程管理` 3.0开发 （开发人：成雨）
-   主要开发功能 `任务` 模块的，新增，修改，查看
-   项目升级 添加`plugin-transform-runtime`和`@babel/runtime`，因为`Babel`默认只转换新的 JavaScript 语法，而不转换新的 API,
    例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法
    （比如 Object.assign）都不会转译。引入这两个包就是为了支持这些新特性。
    注意：`@babel/runtime`不能作为公共模块打包。凯哥为我们写的项目默认是把`dependencies`的包都做为公共模块。所以有一点修改
    ```js
    // 文件 build/utils.js
    {
        objToList: function (obj) {
            let list = [];
            for (let key in obj) {
                // @babel/runtime 不能作为公共模块打包
                 if (key !== '@babel/runtime') {
                      list.push(key);
                 }
            }
            return list;
        }
    }
    ```
-   `dayjs` 处理时间 大小`2kb`