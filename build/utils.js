var http = require("http");
var url = require("url");
var path = require("path");
const os = require("os");
// HappyPack 实现并发编译，提升 loader 的解析速度
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// 不打包到公共包
var noModules = ['@babel/runtime-corejs3', '@babel/runtime'];

module.exports = {
    objToList: function (obj) {
        let list = [];
        for (let key in obj) {
            // @babel/runtime 不能作为公共模块打包
            if (noModules.indexOf(key) == -1) {
                list.push(key);
            }
        }
        return list;
    },
    runServer: function (port) {
        var mock = {};
        mock.util = {};
        mock.config = {
            baseModel: function (model) {
                return {
                    "success": true,
                    "errorMsg": "",
                    "errorCode": "",
                    "model": model,
                    "attributes": null
                }
            },
            baseModelError: function (msg) {
                return {
                    "success": false,
                    "errorMsg": msg || "接口异常",
                    "errorCode": "",
                    "model": null,
                    "attributes": null
                }
            },
            delay: function () {
                return parseInt((Math.random() * 1000));
            },
            prefix: '/proxy'
        };

        mock.run = function (apiName, callback, id) {
            delete require.cache[require.resolve('./mymock.js')];
            try {
                var mockMap = require("./mymock.js");
            } catch (e) {
                console.error('mock file ERROR!');
                callback(mock.config.baseModelError('mock文件错误!!!'));
                return;
            }

            //匹配
            var mappingList = [];
            let tmpReturnModelList = null;
            for (var oneApiName in mockMap) {
                tmpReturnModelList = mockMap[oneApiName];
                var tExp = new RegExp(oneApiName);
                if (tExp.exec(apiName) == apiName) {
                    mappingList.push({
                        name: oneApiName,
                        model: tmpReturnModelList
                    });
                }
            }
            if (mappingList.length > 1) {
                callback(mock.config.baseModelError('mock匹配多个,详见控制台'));
                mappingList.map(function (one, idx) {
                    console.warn('\t\t匹配:' + one.name);
                })
                return;
            }

            returnModelList = mappingList.length > 0 ? mappingList[0].model : [];
            var returnModel = null;
            if (typeof id == 'number') {
                for (var i = 0; i < returnModelList.lenght; i++) {
                    if (id == returnModelList[i].id) {
                        returnModel = returnModelList[i];
                    }
                }
            } else {
                if (returnModelList.length > 0) {
                    returnModel = returnModelList[0];
                }
            }
            if (null == returnModel) {
                callback(mock.config.baseModelError('接口未找到'));
                return;
            }
            setTimeout(function () {
                if (returnModel.error) {
                    callback(mock.config.baseModelError());
                } else {
                    callback(mock.config.baseModel(returnModel.data));
                }
            }, mock.config.delay());
        };
        var server = function (request, response) {
            response.writeHead(200, {"Content-Type": "application/json:; charset=UTF-8"});
            if (request.method == "GET") {
                var params = [];
                var requestInfo = url.parse(request.url, true);
                var pathname = requestInfo.pathname.substr(mock.config.prefix.length);
                params = requestInfo.query;
                mock.run(pathname, function (data) {
                    response.write(JSON.stringify(data));
                    response.end();
                }, '');
            } else {
                var postdata = "";
                var requestInfo = url.parse(request.url, true);
                var pathname = requestInfo.pathname.substr(mock.config.prefix.length);
                request.addListener("data", function (postchunk) {
                    postdata += postchunk;
                });
                request.addListener("end", function () {
                    mock.run(pathname, function (data) {
                        response.write(JSON.stringify(data));
                        response.end();
                    });
                });
            }
        }
        http.createServer(server).listen(port);
        console.log('server run at :' + port);
    },
    resolve: function (dir) {
        return path.join(__dirname, '..', dir);
    },
    createHappyPlugin: function (id, loaders) {
        return new HappyPack({
            id: id,
            loaders: loaders,
            threadPool: happyThreadPool,
            verbose: process.env.HAPPY_VERBOSE === '1' // make happy more verbose with HAPPY_VERBOSE=1
        });
    }
};
