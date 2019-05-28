'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['./actions', './store'], function (Actions, Store) {
    return function (_Reflux$Component) {
        _inherits(Component, _Reflux$Component);

        function Component(props) {
            _classCallCheck(this, Component);

            var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

            _this.store = Store;
            //state
            var pthis = _this;
            _this.state = {
                isSearch: false, //是否显示搜索
                isShowAll: false, //显示全部选人
                barDeptList: [], //{},{}头部的部门路径
                curList: {
                    subDeptList: [],
                    userList: [],
                    page: 1,
                    isCheck: false //是否默认选中
                }, //当前的通讯录列表
                recentList: [], //最近联系人
                sltMap: {}, //当前已选的人
                sltGroupMap: {}, //已选择分组
                curSearchList: [], //搜索的当前列表
                sltPhoneMap: {}, //当前已选的电话
                seachKeyWords: "", //当前的搜索关键词
                clearAll: pthis.props.clearAll,
                onlyMember: pthis.props.onlyMember + '' == 'undefined' ? pthis.props.params.onlyMember + '' == 'undefined' ? true : pthis.props.params.onlyMember == 'false' ? false : true : pthis.props.onlyMember //是否只能选成员
            };
            _this.data = {
                isFetchingDept: false
            };
            _this.timer = null; //搜素请求次数优化
            _this.showSearchBar.bind(_this);
            _this.showAddPhoneNum.bind(_this);
            _this.fetchDeptById.bind(_this);
            _this.checkThisMember.bind(_this);
            _this.showRecentMembers.bind(_this);
            _this.bindScrollLoad.bind(_this);
            _this.searchBind.bind(_this);
            _this.checkThisPhone.bind(_this);
            _this.sureThisSelect.bind(_this);
            _this.checkThisGroup.bind(_this);
            _this.touchSearch.bind(_this);
            _this.bindFn.bind(_this);

            return _this;
        }

        //显示搜索


        _createClass(Component, [{
            key: 'showSearchBar',
            value: function showSearchBar() {
                window.scroll(0, 0);
                var pthis = this;
                var isSearchFlag = !this.state.isSearch;
                if (isSearchFlag) {
                    //将要显示搜索
                    $(pthis.refs.search_ipt).val('');
                    // setTimeout(function () {
                    $(pthis.refs.search_ipt).focus();
                    // }, 500);
                    window.scroll(0, 0);
                }
                this.setState({ isSearch: isSearchFlag, seachKeyWords: "", curSearchList: [] });

                //将要显示搜索
                //setTimeout(function () {
                //}, 300);
            }

            //显示添加的号码

        }, {
            key: 'showAddPhoneNum',
            value: function showAddPhoneNum() {
                var pthis = this;
                G.confirm.show(['请输入电话号码', '请输入参会人员的电话号码', '<input type="tel" id="js_ipt_phone" class="js_ipt" placeholder="请输入手机号或固话()">'], [function () {}, function () {
                    var phone = $.trim($('#js_ipt_phone').val());
                    if (pthis.state.sltPhoneMap[phone]) {
                        setTimeout(function () {
                            G.toast.show('请勿重复添加号码');
                        }, 300);
                        return false;
                    }
                    //1xxxxxxx 和0xxx xxxxxxxx
                    if (/^1\d{10}$/.test(phone) || /^0\d{8,12}$/.test(phone)) {
                        //先查询一下这个号码是不是通讯录里存在的.
                        G.ajax2({
                            url: '/user/search',
                            cache: false,
                            async: false,
                            data: { key: phone },
                            success: function success(data) {
                                if (data && data.length >= 1) {
                                    //如果这个号码存在. 就把他放到当前的选人的列表里.
                                    var one = data[0];
                                    var map = pthis.state.sltMap;
                                    if (map[one.id]) {} else {
                                        map[one.id] = one;
                                    }
                                    pthis.setState({ sltMap: map });
                                } else {
                                    //如果不存在. 就当作一般的电话
                                    pthis.state.sltPhoneMap[phone] = { phone: phone };
                                    pthis.setState(this.state);
                                }
                            }
                        });
                    } else {
                        setTimeout(function () {
                            G.toast.show('请输入正确的手机号');
                        }, 300);
                        //结束后不关闭
                        return false;
                    }
                }]);
                //获取焦点
                $('#js_ipt_phone').focus();
            }

            //根据id查询子成员和部门

        }, {
            key: 'fetchDeptById',
            value: function fetchDeptById(id, idx, len) {
                //最后一个tab不允许切换
                if (idx && len) {
                    if (idx + 1 >= len) {
                        return;
                    }
                }
                var pthis = this;
                G.ajax2({
                    url: '/dept/list',
                    data: { pageSize: 20, currentDeptId: id, pageNo: 1 },
                    type: 'get',
                    success: function success(data) {
                        var model = data;
                        pthis.setState({ curList: model });
                        //查找当前的id是否在bar中.如果是: 移除当前以及以后
                        var i = 0;
                        var list = pthis.state.barDeptList;
                        for (; i < list.length; i++) {
                            if (list[i].deptId == model.currentDept.deptId) {
                                break;
                            }
                        }
                        list = list.slice(0, i);
                        list.push(model.currentDept);
                        pthis.state.curList.page = 1;
                        pthis.state.barDeptList = list;
                        //当前部门是否全被选中.如果是. 需要默认选中
                        pthis.state.curList.isCheck = pthis.state.sltGroupMap[id] ? true : false;
                        pthis.setState(pthis.state);
                        //把部门面包屑靠最右.
                        setTimeout(function () {
                            pthis.refs.spbar.scrollLeft = 10000;
                        }, 50);
                    }
                });
            }

            //滚动加载子成员和部门

        }, {
            key: 'fetchScrollDept',
            value: function fetchScrollDept() {
                var pthis = this;
                if (pthis.data.isFetchingDept) {
                    return;
                }
                pthis.data.isFetchingDept = true;
                var currentDeptId = pthis.state.barDeptList[pthis.state.barDeptList.length - 1].id;
                G.ajax2({
                    url: '/dept/list',
                    data: { pageSize: 20, currentDeptId: currentDeptId, pageNo: pthis.state.curList.page + 1 },
                    type: 'get',
                    async: false,
                    success: function success(data) {
                        if (data) {
                            if (data.userList && data.userList.length > 0) {
                                var t = pthis.state.curList;
                                t.userList = t.userList.concat(data.userList);
                                pthis.state.curList.page += 1;
                                pthis.setState(pthis.state);
                            }
                        }
                        pthis.data.isFetchingDept = false;
                    },
                    error: function error() {
                        pthis.data.isFetchingDept = false;
                    }
                });
            }

            //选中和取消选择的人

        }, {
            key: 'checkThisMember',
            value: function checkThisMember(one, hideSearch) {
                var pthis = this;
                if (pthis.props.singleMember) {
                    pthis.props.singleMember(one);
                }
                var map = this.state.sltMap;
                if (map[one.id]) {
                    map[one.id] = null;
                    delete map[one.id];
                } else {
                    map[one.id] = one;
                    map[one.id]._timestamp = new Date() * 1;
                }
                this.setState({ sltMap: map });
                //重置搜索框内容
                if (hideSearch === true) {
                    pthis.setState({ seachKeyWords: "", curSearchList: [] });
                    pthis.refs.search_ipt.value = '';
                    // setTimeout(function () {
                    //     pthis.refs.search_ipt.value = '';
                    //     // pthis.refs.search_ipt.focus();
                    // }, 50);
                    this.showSearchBar();
                }
            }

            //选择和取消选择的号码

        }, {
            key: 'checkThisPhone',
            value: function checkThisPhone(phone, hideSearch) {
                var pthis = this;
                var map = this.state.sltPhoneMap;
                if (map[phone]) {
                    map[phone] = null;
                    delete map[phone];
                } else {
                    map[phone] = { phone: phone, _timestamp: new Date() * 1 };
                }
                this.setState({ sltPhoneMap: map });
                //重置搜索框内容
                if (hideSearch === true) {
                    //延迟隐藏.视觉效果好一些.
                    setTimeout(function () {
                        pthis.setState({ seachKeyWords: "", curSearchList: [] });
                    }, 500);
                    //setTimeout(function () {
                    //$(pthis.refs.search_ipt).val('');
                    //$(pthis.refs.search_ipt).focus();
                    //}, 50);
                    this.showSearchBar();
                }
            }

            //选择当前的分组

        }, {
            key: 'checkThisGroup',
            value: function checkThisGroup(one, e) {
                if (e && e.target && e.stopPropagation) {
                    e.stopPropagation();
                }
                var pthis = this;
                var map = this.state.sltGroupMap;
                if (map[one.id]) {
                    map[one.id] = null;
                    delete map[one.id];
                } else {
                    map[one.id] = one;
                    map[one.id]._timestamp = new Date() * 1;
                }
                this.setState({ sltGroupMap: map });
            }

            //显示最近联系人

        }, {
            key: 'showRecentMembers',
            value: function showRecentMembers() {
                var pthis = this;
                G.ajax2({
                    url: '/user/showRecentContacts',
                    cache: false,
                    success: function success(data) {
                        if (data) {
                            pthis.setState({
                                recentList: data
                            });
                        }
                    }
                });
            }
        }, {
            key: 'bindFn',
            value: function bindFn(e) {
                if ($(window).scrollTop() + $(window).height() + 10 >= $(document.body).height()) {
                    // load next page
                    this.fetchScrollDept();
                }
            }
            //绑定滚动

        }, {
            key: 'bindScrollLoad',
            value: function bindScrollLoad() {
                var pthis = this;
                var b = this.bindFn.bind(this);
                $(document).unbind('scrollstop', b).on('scrollstop', b);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                $(document).unbind('scrollstop');
            }
            //显示全部选中的人列表

        }, {
            key: 'showAllSltMembers',
            value: function showAllSltMembers(isShowAll) {
                this.setState({ isShowAll: isShowAll });
            }

            //搜索

        }, {
            key: 'searchBind',
            value: function searchBind(e) {
                var pthis = this;
                var eTarget = e.target;
                //设置定时器修改click change事件执行顺序
                setTimeout(function () {
                    var seachKeyWords = $.trim($(eTarget).val());
                    pthis.setState({ seachKeyWords: seachKeyWords });
                    clearTimeout(pthis.timer);
                    if (seachKeyWords == '') {
                        pthis.setState({ curSearchList: [] });
                    } else {
                        pthis.timer = setTimeout(function () {
                            G.ajax2({
                                url: '/user/search',
                                cache: false,
                                async: false,
                                data: { key: seachKeyWords },
                                success: function success(data) {
                                    if (data) {
                                        pthis.setState({ curSearchList: data });
                                        pthis.setState({ seachKeyWords: seachKeyWords });
                                    }
                                }
                            });
                        }, 600);
                    }
                }, 1);
            }

            //确定选择

        }, {
            key: 'sureThisSelect',
            value: function sureThisSelect() {
                var pthis = this;
                var sltList = _.toArray(this.state.sltMap);
                var noPhones = [];
                var noPhonesList = [];
                $.each(sltList || [], function (idx, one) {
                    if (one.mobile && one.mobile.length > 1) {} else {
                        noPhonesList.push(one);
                        noPhones.push(one.userName);
                    }
                });
                if (pthis.props.noPhoneCheck === false) {
                    noPhones = [];
                }
                var sureFun = function sureFun() {
                    if (pthis.props.component) {
                        pthis.props.sureFn(_.toArray(pthis.state.sltMap), _.toArray(pthis.state.sltPhoneMap), _.toArray(pthis.state.sltGroupMap));
                    } else {
                        //页面逻辑
                        var subData = {
                            "uIds": _.pluck(pthis.state.sltMap, 'id').join(','), //字符串，用户主键Id,多个用逗号分隔
                            "labelAttendee": '', //字符串，参会人标签Id，多个标签的话以逗号分隔  //暂时没有这个功能
                            "channel": 'wechat', //请求渠道:web或者wechat,web表示PC端,wechat表示微信端
                            "teleAttendee": _.keys(pthis.state.sltPhoneMap).join(',') //通过电话单独添加的参会人员，逗号分隔，只有电话会议时起作用，其他时候忽略
                        };
                        G.ajax2({
                            url: '/event/teleconference/startTemp',
                            type: 'post',
                            data: subData,
                            success: function success(data) {
                                if (data) {
                                    var eventId = data.eventId;
                                    var supplierEventId = data.supplierEventId;
                                    window.location.href = '?a=' + new Date() * 1 + '#/teleconference/1/' + eventId;
                                }
                            }
                        });
                    }
                };
                if (noPhones.length == 0) {
                    sureFun();
                } else {
                    if (pthis.props.phoneNotExitAndAlarmCb) {
                        if (pthis.props.phoneNotExitAndAlarmCb(noPhonesList, _.toArray(pthis.state.sltMap), _.toArray(pthis.state.sltPhoneMap), _.toArray(pthis.state.sltGroupMap))) {
                            sureFun();
                        }
                    } else {
                        G.confirm.show(['以下人员号码缺失，无法参会', noPhones.join('、')], [function () {}, function () {
                            sureFun();
                        }], ['取消', '继续开会']);
                    }
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.component) {} else {
                    G.setTitle('马上开会');
                }
                //初始加载
                var pthis = this;
                G.ajax2({
                    url: '/dept/list',
                    data: { pageSize: 20 },
                    type: 'get',
                    success: function success(data) {
                        pthis.state.curList.subDeptList = data.subDeptList;
                        pthis.state.curList.userList = data.userList;
                        pthis.state.curList.page = 1;
                        pthis.state.isCheck = false;
                        pthis.state.barDeptList = [data.currentDept];
                        pthis.setState(pthis.state);
                    }
                });
                //绑定滚动
                this.bindScrollLoad();
                //最近联系人
                this.showRecentMembers();
            }
        }, {
            key: 'setInitList',
            value: function setInitList(list, listDisable) {
                var pthis = this;
                //当前控件作为一个组件.接收参数
                if (list) {
                    pthis.state.sltMap = {};
                    pthis.state.sltPhoneMap = {};
                    pthis.state.sltGroupMap = {};
                    list.map(function (one, idx) {
                        if (one.type == 'member') {
                            pthis.state.sltMap[one.id] = {
                                id: one.id,
                                userName: one.userName,
                                mobile: one.mobile,
                                type: listDisable ? 'init' : '',
                                _timestamp: 1
                            };
                        }
                        if (one.type == 'phone') {
                            pthis.state.sltPhoneMap[one.phone] = {
                                phone: one.phone,
                                type: listDisable ? 'init' : '',
                                _timestamp: 1
                            };
                        }
                        if (one.type == 'group') {
                            pthis.state.sltGroupMap[one.id] = {
                                id: one.id,
                                deptName: one.deptName,
                                type: listDisable ? 'init' : '',
                                _timestamp: 1
                            };
                        }
                    });
                    pthis.setState(pthis.state);
                }
            }
        }, {
            key: 'touchSearch',
            value: function touchSearch() {
                $(this.refs.search_ipt).blur();
            }
        }, {
            key: 'render',
            value: function render() {
                var pthis = this;
                var sltList = _.sortBy(_.toArray(pthis.state.sltMap), function (one) {
                    return -1 * one._timestamp;
                });
                var sltPhoneList = _.sortBy(_.toArray(pthis.state.sltPhoneMap), function (one) {
                    return -1 * one._timestamp;
                });
                var sltGroupList = _.sortBy(_.toArray(pthis.state.sltGroupMap), function (one) {
                    return -1 * one._timestamp;
                });
                this.state.isShowAll = (sltList.length > 0 || sltPhoneList.length > 0 || sltGroupList.length > 0) && this.state.isShowAll;
                return React.createElement("div", { className: "_PageContacts" }, React.createElement("div", { className: "search_bar" }, React.createElement("div", { className: "main" }, React.createElement("div", { className: "placehoder", style: { display: pthis.state.isSearch ? 'none' : 'block' },
                    onClick: this.showSearchBar.bind(this) }, React.createElement("span", null, "搜索")), React.createElement("div", { className: "hidesearch",
                    onClick: pthis.state.isSearch ? function () {} : pthis.showSearchBar.bind(pthis),
                    style: { opacity: pthis.state.isSearch ? '1' : '0' } }, React.createElement("div", { className: "input_w" }, React.createElement("input", { placeholder: "请输入姓名或电话", type: "search", ref: "search_ipt",
                    onInput: pthis.searchBind.bind(pthis) })), React.createElement("span", { className: "cncl",
                    onClick: pthis.state.isSearch ? this.showSearchBar.bind(this) : function () {} }, "取消")), React.createElement("div", { className: "top_hidesearch", onClick: pthis.showSearchBar.bind(pthis),
                    style: { display: pthis.state.isSearch ? 'none' : 'block' } }))),
                /*搜索结果层*/
                React.createElement("div", { className: "se_list", style: { display: pthis.state.isSearch ? 'block' : 'none' } }, React.createElement("div", { className: "main", onTouchStart: pthis.touchSearch.bind(pthis) },
                /*搜索结果*/
                pthis.state.curSearchList.map(function (one, idx) {
                    var isInit = pthis.state.sltMap[one.id] && pthis.state.sltMap[one.id].type == 'init' ? true : false;
                    return React.createElement("div", { className: "list_o bottom_1px_line hicon", key: "seaM" + one.id,
                        onClick: isInit ? function () {} : pthis.checkThisMember.bind(pthis, one, true) }, React.createElement("i", { className: "slct " + (isInit ? 'def' : pthis.state.sltMap[one.id] ? 'yes' : 'not') }), React.createElement("span", { className: "label" }, React.createElement("span", null, one.userName), React.createElement("span", {
                        className: "desc" }, one.deptNames ? '（' + (one.deptNames.length > 12 ? one.deptNames.substr(0, 12) + '...' : one.deptNames) + '）' : '')));
                }),

                /*输入的是电话号码.则显示可以添加*/
                pthis.state.curSearchList.length == 0 && pthis.props.noOther != 1 && (/^1\d{10}$/.test(pthis.state.seachKeyWords) || /^0\d{8,12}$/.test(pthis.state.seachKeyWords)) ? React.createElement("div", { className: "list_o bottom_1px_line hicon",
                    onClick: pthis.state.sltPhoneMap[pthis.state.seachKeyWords] && pthis.state.sltPhoneMap[pthis.state.seachKeyWords].type == 'init' ? function () {} : pthis.checkThisPhone.bind(pthis, pthis.state.seachKeyWords, true) }, React.createElement("i", { className: "slct " + (pthis.state.sltPhoneMap[pthis.state.seachKeyWords] && pthis.state.sltPhoneMap[pthis.state.seachKeyWords].type == 'init' ? 'def' : pthis.state.sltPhoneMap[pthis.state.seachKeyWords] ? 'yes' : 'not') }), React.createElement("span", { className: "label" }, React.createElement("span", null, pthis.state.seachKeyWords), React.createElement("span", {
                    className: "desc" }, '通讯录没有对应成员'))) : '',

                /*没有搜索结果*/
                pthis.state.curSearchList.length == 0 && pthis.props.noOther != 1 && (/^1\d{10}$/.test(pthis.state.seachKeyWords) || /^0\d{8,12}$/.test(pthis.state.seachKeyWords)) ? React.createElement("div", { className: "list_o bottom_1px_line" }, React.createElement("span", { className: "label" }, React.createElement("span", {
                    className: "desc" }, pthis.state.seachKeyWords.length == 0 ? '请输入关键词搜索' : '请更换关键词搜索'))) : ''), React.createElement("div", { className: "bg" })), React.createElement("div", { className: "phone_num top_1px_line bottom_1px_line", onClick: this.showAddPhoneNum.bind(this),
                    style: { display: pthis.state.barDeptList.length > 1 || pthis.state.isSearch || pthis.props.noOther == 1 ? 'none' : 'block' } }, React.createElement("span", null, "手动添加电话号码"), React.createElement("img", { src: "images/hysdh/phone_n_add.png" })), React.createElement("div", { className: "spbar bottom_1px_line",
                    style: { display: pthis.state.barDeptList.length > 1 || pthis.state.recentList.length == 0 || pthis.state.isSearch || pthis.props.noOther == 1 ? 'none' : 'block' } }, "最近联系人"), React.createElement("div", { className: "list_m",
                    style: { display: pthis.state.barDeptList.length > 1 || pthis.state.recentList.length == 0 || pthis.state.isSearch || pthis.props.noOther == 1 ? 'none' : 'block' } }, pthis.state.recentList.map(function (one, idx) {
                    var isInit = pthis.state.sltMap[one.id] && pthis.state.sltMap[one.id].type == 'init' ? true : false;
                    return React.createElement("div", { className: "list_o bottom_1px_line hicon", key: "recM" + one.id,
                        onClick: isInit ? function () {} : pthis.checkThisMember.bind(pthis, one) }, React.createElement("i", { className: "slct " + (isInit ? 'def' : pthis.state.sltMap[one.id] ? 'yes' : 'not') }), React.createElement("img", { src: G.fixAvatar(one.avatar), className: "hicon" }), React.createElement("span", { className: "label" }, one.userName));
                })), React.createElement("div", { className: "spbar top_1px_line", ref: "spbar",
                    style: { display: pthis.state.isSearch ? 'none' : 'block' } },
                /*当前的部门导航*/
                this.state.barDeptList.map(function (one, idx) {
                    return React.createElement("span", { key: 'bar' + one.id, className: idx + 1 < pthis.state.barDeptList.length ? 'c' : '',
                        onClick: pthis.fetchDeptById.bind(pthis, one.id, idx, pthis.state.barDeptList.length) }, one.deptName + ' ' + (idx + 1 < pthis.state.barDeptList.length ? '/ ' : ''));
                })), React.createElement("div", { className: "list_m", style: { display: pthis.state.isSearch ? 'none' : 'block' } },
                /*当前列表的部门*/
                pthis.state.curList.subDeptList.map(function (one, idx) {
                    //上一部门被选中,或者当前部门是初始化选中的. 是不可选的.
                    var isInit = pthis.state.sltGroupMap[one.id] && pthis.state.sltGroupMap[one.id].type == 'init' ? true : false;
                    return React.createElement("div", { className: "list_o bottom_1px_line ricon", key: "dept" + one.id,
                        onClick: pthis.state.curList.isCheck ? function () {} : pthis.fetchDeptById.bind(pthis, one.id, 0, 0)
                    }, React.createElement("i", { className: "slct " + (pthis.state.curList.isCheck || isInit ? 'def' : pthis.state.sltGroupMap[one.id] ? 'yes' : 'not'),
                        style: { display: pthis.state.onlyMember ? 'none' : '' },
                        onClick: pthis.state.curList.isCheck || isInit ? function () {} : pthis.checkThisGroup.bind(pthis, one) }), React.createElement("span", { className: "label" }, one.deptName));
                }),

                /*当前列表的成员*/
                pthis.state.curList.userList.map(function (one, idx) {
                    var isInit = pthis.state.sltMap[one.id] && pthis.state.sltMap[one.id].type == 'init' ? true : false;
                    return React.createElement("div", { className: "list_o bottom_1px_line hicon", key: "memb" + one.id,
                        onClick: pthis.state.curList.isCheck || isInit ? function () {} : pthis.checkThisMember.bind(pthis, one) }, pthis.props.singleMember ? null : React.createElement("i", { className: "slct " + (pthis.state.curList.isCheck || isInit ? 'def' : pthis.state.sltMap[one.id] ? 'yes' : 'not') }), React.createElement("img", { src: G.fixAvatar(one.avatar), className: "hicon" }), React.createElement("span", { className: "label" }, one.userName));
                }), pthis.state.curList.subDeptList.length + pthis.state.curList.userList.length == 0 ? React.createElement("div", { className: "list_o bottom_1px_line hicon" }, React.createElement("span", { className: "label" }, "没有数据...")) : ''), React.createElement("div", { className: "down_bar",
                    style: pthis.state.clearAll ? { display: sltList.length + sltPhoneList.length + sltGroupList.length > 0 ? 'block' : 'block' } : { display: sltList.length + sltPhoneList.length + sltGroupList.length > 0 ? 'block' : 'none' } }, React.createElement("div", { className: "bg", onClick: this.showAllSltMembers.bind(this, false),
                    style: { display: pthis.state.isShowAll ? 'block' : 'none' } }), React.createElement("div", { className: "udrop dropl", style: { display: pthis.state.isShowAll ? 'block' : 'none' } },
                /*已经选择的人员和部门.和电话*/

                sltList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''),
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisMember.bind(pthis, one) }, one.userName);
                }), sltPhoneList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''),
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisPhone.bind(pthis, one.phone) }, one.phone);
                }), sltGroupList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''),
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisGroup.bind(pthis, one) }, one.deptName);
                })), React.createElement("div", { style: { display: pthis.state.isShowAll ? 'block' : 'none' } }, React.createElement("div", { className: "main" }, React.createElement("div", { className: "btn c", onClick: pthis.showAllSltMembers.bind(this, false) }, React.createElement("span", null, "收起")), React.createElement("div", { className: "btn s", onClick: pthis.sureThisSelect.bind(this) }, React.createElement("span", null, pthis.props.component ? '确定' : '马上开会')))), React.createElement("div", { className: "main2",
                    style: pthis.state.clearAll ? { display: sltList.length + sltPhoneList.length + sltGroupList.length > 0 ? 'block' : 'block' } : { display: sltList.length + sltPhoneList.length + sltGroupList.length > 0 ? 'block' : 'none' } }, React.createElement("div", { className: "btn dropl" },
                /*缩略的整体: 已经选择的人员和部门.和电话*/

                sltList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''), key: one.id,
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisMember.bind(pthis, one) }, one.userName);
                }), sltPhoneList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''), key: one.id,
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisPhone.bind(pthis, one.phone) }, one.phone);
                }), sltGroupList.map(function (one, idx) {
                    return React.createElement("span", { className: "one" + (one.type == 'init' ? ' nodel' : ''), key: one.id,
                        onClick: one.type == 'init' ? function () {} : pthis.checkThisGroup.bind(pthis, one) }, one.deptName);
                })), React.createElement("div", { className: "btn c", onClick: pthis.showAllSltMembers.bind(this, true) }, React.createElement("span", {
                    className: "u" })), React.createElement("div", { className: "btn s", onClick: pthis.sureThisSelect.bind(this) }, React.createElement("span", null, React.createElement("span", null, (pthis.props.component ? '确定' : '马上开会') + (pthis.state.onlyMember ? '(' + (sltList.length + sltPhoneList.length) + ')' : ''))))), React.createElement("div", { className: "fixed" })));
            }
        }]);

        return Component;
    }(Reflux.Component);
});