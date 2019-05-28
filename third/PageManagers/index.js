define(['../PageContacts/index'], function (PageContacts) {
    return class Component extends Reflux.Component {
        constructor(props) {
            super(props);
            //
            this.state = {
                isShow: false,
                appCode: '', //当前应用的appCode
                managerModel: false, //单独应用和聚合应用展示不一样 true:聚合应用
                userType: '',
                adminManagerList: [],
                modelManagerList: [],
                appFunctionCode: 'schedule'
            };
            this.delThisManager.bind(this);
            this.sureCallBack.bind(this);
            this.showContacts.bind(this);
            // this.fetchAll.bind(this);
        }

        // fetchAll() {
        //     let pthis = this;
        //     G.ajax2({
        //         url: '/manage/pc/user/searchStaff',
        //         data: {
        //             pageSize: 1000,
        //             pageNo: 1,
        //             isAdmin: 'Y',
        //             appCode: 'meeting'
        //         },
        //         success: function (data) {
        //             pthis.setState({ 'list': data.datas });
        //         }
        //     });
        // }

        //超管列表
        fetchAdmin() {
            let pthis = this;
            G.ajax2({
                'url': '/keystone/manageScope/listSuperAdmin',
                'type': 'POST',
                'contentType': "application/json",
                success: function (data) {
                    let adminManagerList = data || [];
                    pthis.setState({
                        adminManagerList: adminManagerList
                    })
                }
            })
        }

        //模块管理员列表
        fetchModelAdmin() {
            let pthis = this;
            let postData = {
                appFunctionCode: pthis.state.appFunctionCode
            }
            G.ajax2({
                'url': '/keystone/manageScope/listFunctionAdmin',
                'type': 'POST',
                'data': JSON.stringify(postData),
                'contentType': "application/json",
                success: function (data) {
                    let modelManagerList = data || [];
                    pthis.setState({
                        modelManagerList: modelManagerList
                    })
                }
            })
        }

        //当前应用
        currentApp() {
            let pthis = this;
            G.ajax2({
                'url': '/user/currentApp',
                'type': 'GET',
                success: function (data) {
                    let appCode = data || '';
                    let managerModel = false;
                    if (appCode && (appCode == 'enterprise' || appCode == 'adminService')) {
                        managerModel = true;
                    }
                    pthis.setState({
                        appCode: appCode,
                        managerModel: managerModel
                    })
                    // pthis.setState({
                    //     appCode: appCode,
                    //     managerModel: false
                    // })
                }
            })
        }

        currUser() {
            let pthis = this;
            G.ajax2({
                'url': '/user/currUser',
                'type': 'GET',
                success: function (data) {
                    pthis.setState({
                        userType: data.userType
                    })
                }
            })
        }

        componentDidMount() {
            let pthis = this;
            G.setTitle('管理员');
            G.fixFixed();
            pthis.currentApp();
            pthis.currUser();
            pthis.fetchAdmin();
            pthis.fetchModelAdmin();
        }

        //移除模块管理员
        delThisManager(id) {
            let pthis = this;
            G.confirm.show('确定删除该管理员信息吗？', [function () {
            }, function () {
                let postData = {
                    uIds: [id],
                    appFunctionCode: pthis.state.appFunctionCode
                }
                G.ajax2({
                    'url': '/keystone/roleCheck/manageScope/delFunction',
                    'type': 'POST',
                    'data': JSON.stringify(postData),
                    'contentType': "application/json",
                    success: function (data) {
                        G.toast2.show(require("./images/gz2.png"), '删除成功', '', function () {
                            pthis.fetchAdmin();
                            pthis.fetchModelAdmin();
                        });
                    }
                })
            }], ['取消', '删除']);
        }

        //单独应用移除超管
        //delAdminManager
        delAdminManager(id) {
            let pthis = this;
            G.confirm.show('确定删除该管理员信息吗？', [function () {
            }, function () {
                let postData = {
                    uIds: [id]
                }
                G.ajax2({
                    'url': '/keystone/roleCheck/manageScope/delAdmin',
                    'type': 'POST',
                    'data': JSON.stringify(postData),
                    'contentType': "application/json",
                    success: function (data) {
                        G.toast2.show(require("./images/gz2.png"), '删除成功', '', function () {
                            pthis.fetchAdmin();
                            pthis.fetchModelAdmin();
                        });
                    }
                })
            }], ['取消', '删除']);
        }

        sureCallBack(list, phoneList, groupList) {
            let pthis = this;
            var idStr = [];
            $.each(list || [], function (idx, one) {
                if (one.type && one.type == 'init') {

                } else  {
                    idStr.push(one.id);
                }
            });
            G.setTitle('管理员');

            //过滤原来的
            if (pthis.state.managerModel) {
                let postData = {
                    uidList: idStr,
                    manageScopeList: [{ "appFunctionCode": pthis.state.appFunctionCode }]
                };
                G.ajax2({
                    'url': '/keystone/roleCheck/manageScope/addFunctionAdmin',
                    'type': 'POST',
                    'data': JSON.stringify(postData),
                    'contentType': "application/json",
                    success: function (data) {
                        G.toast2.show(require("./images/gz2.png"), '添加成功', '', function () {
                            window.history.go(-1);
                            pthis.fetchAdmin();
                            pthis.fetchModelAdmin();
                        });
                    }
    
                })
            } else {
                let postData = {
                    uIds: idStr
                };
                G.ajax2({
                    'url': '/keystone/roleCheck/manageScope/addSuperAdmin',
                    'type': 'POST',
                    'data': JSON.stringify(postData),
                    'contentType': "application/json",
                    success: function (data) {
                        G.toast2.show(require("./images/gz2.png"), '添加成功', '', function () {
                            window.history.go(-1);
                            pthis.fetchAdmin();
                            pthis.fetchModelAdmin();
                        });
                    }
    
                })
            }
            
            this.setState({ isShow: !this.state.isShow });
        }

        showContacts() {
            let _h1 = $(document).height();
            let _h2 = $(window).height()
            var setHeight = _h1 >= _h2 ? _h1 : _h2;
            $(".contactover").css('height', setHeight);
            let pthis = this;
            window.location.href = window.location.href + '/aaaa:true';
            G.setTitle('新增管理员');
            var funcRef = function () {
                if (window.location.href.indexOf('/aaaa:true') == -1) {
                    //切换回来了
                    pthis.setState({ isShow: false });
                    //移除
                    pthis.refs.pageContacts.setInitList([]);
                    window.removeEventListener("hashchange", funcRef);

                }
            }
            //绑定
            window.addEventListener("hashchange", funcRef, false);
            let initList = [];
            $.each(pthis.state.adminManagerList || [], function (idx, one) {
                initList.push({
                    type: 'member',
                    id: one.userId,
                    userName: one.userName,
                    deptNames: one.deptNames
                });
            });
            $.each(pthis.state.modelManagerList || [], function (idx, one) {
                initList.push({
                    type: 'member',
                    id: one.userId,
                    userName: one.userName,
                    deptNames: one.deptNames
                });
            });
            window.scrollTo(0, 0)
            pthis.refs.pageContacts.setInitList(initList, true);
            pthis.setState({ isShow: !this.state.isShow });
        }

        render() {
            let pthis = this;
            console.log(pthis.state)
            return (
                React.createElement("div", {className: "_PageManagers"}, 
                    
                        pthis.state.managerModel ?
                            React.createElement("div", null, 
                                React.createElement("div", {className: pthis.state.adminManagerList.length ? 'title' : 'hide'}, 
                                    "超级管理员（请前往服务商后台添加）"
                                ), 
                                React.createElement("div", {className: "item_wrap top_1px_line"}, 
                                    
                                        pthis.state.adminManagerList.map(function (one, idx) {
                                            one.avatar = one.avatar;
                                            return (
                                                React.createElement("div", {className: "item_box"}, 
                                                    React.createElement("div", {className: "item top_1px_line", key: 'adm' + idx}, 
                                                        React.createElement("img", {src: G.fixAvatar(one.avatar)}), 

                                                        React.createElement("p", {className: "name"}, one.userName), 

                                                        React.createElement("p", {className: "txt"}, (one.position ? one.position : ''))
                                                    )
                                                )
                                            )
                                        }), 
                                    
                                    React.createElement("div", {style: { position: 'relative'}, className: "top_1px_line"})
                                ), 
                                React.createElement("div", {className: pthis.state.modelManagerList.length ? 'title' : 'hide'}, 
                                    "模块管理员（由超级管理员添加/删除）"
                                ), 
                                React.createElement("div", {className: "item_wrap top_1px_line"}, 
                                    
                                        pthis.state.modelManagerList.map(function (one, idx) {
                                            one.avatar = one.avatar;
                                            return (
                                                React.createElement("div", {className: "item_box"}, 
                                                    React.createElement("div", {className: "item top_1px_line", key: 'adm' + idx}, 
                                                        React.createElement("img", {src: G.fixAvatar(one.avatar)}), 

                                                        React.createElement("p", {className: "name"}, one.userName), 

                                                        React.createElement("p", {className: "txt"}, (one.position ? one.position : '')), 
                                                        React.createElement("span", {className: pthis.state.userType == 'U_1003' ? 'del' : 'hide', style: { 'display': (one.owner ? 'none' : '')}, 
                                                            onClick: pthis.delThisManager.bind(pthis, one.userId)})
                                                    )
                                                )
                                            )
                                        }), 
                                    
                                    React.createElement("div", {style: { position: 'relative'}, className: "top_1px_line"})
                                )
                            )
                            :
                            React.createElement("div", null, 
                                React.createElement("div", {className: "ma"}), 
                                /*<div className="relative top_1px_line"></div>*/
                                React.createElement("div", {className: "item_wrap top_1px_line"}, 
                                    
                                        pthis.state.adminManagerList.map(function (one, idx) {
                                            one.avatar = one.avatar;
                                            return (
                                                React.createElement("div", {className: "item_box"}, 
                                                    React.createElement("div", {className: "item top_1px_line", key: 'adm' + idx}, 
                                                        React.createElement("img", {src: G.fixAvatar(one.avatar)}), 

                                                        React.createElement("p", {className: "name"}, one.userName), 

                                                        React.createElement("p", {className: "txt"}, (one.position ? one.position : '')), 
                                                        React.createElement("span", {className: "del", style: { 'display': (one.owner ? 'none' : '')}, 
                                                            onClick: pthis.delAdminManager.bind(pthis, one.userId)})
                                                    )
                                                )
                                            )
                                        }), 
                                    
                                    React.createElement("div", {style: { position: 'relative'}, className: "top_1px_line"})
                                )
                            ), 
                    

                    React.createElement("div", {className: pthis.state.userType == 'U_1003' ? 'd_btn' : 'hide'}, 
                        React.createElement("div", {className: "main top_1px_line"}, 
                            React.createElement("button", {className: "btn", onClick: pthis.showContacts.bind(pthis)}, pthis.state.managerModel ? '添加模块管理员' : '添加管理员')
                        )
                    ), 
                    React.createElement("div", {className: "contactover", style: { display: (pthis.state.isShow ? 'block' : 'none')}}, 
                        React.createElement(PageContacts, {ref: "pageContacts", phoneNotExitAndAlarmCb: () => { return true }, sureFn: this.sureCallBack.bind(this), component: true, 
                            onlyMember: true, noOther: 1, noPhoneCheck: false})
                    )
                )
            )
        }
    }
})