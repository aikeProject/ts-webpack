///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Constant from '../../Common/Constans';
//Components
//Modules
//Less
import './index.less';
//interface
import {
    ScheduleV1List,
    ScheduleV1ListItem,
    SkylightCommonGetHolidayImage,
    ScheduleV1PartnerList,
    RelationGetRelation,
    scheduleV1CalendarDatas,
    RelationListPublicUser,
    ScheduleV2User,
    RelationListPublicUserUsers,
    ScheduleV1ListExtraInfoMeeting,
    ScheduleV1ListExtraInfoSummary,
    ScheduleV1ListExtraInfoVisitor,
    ScheduleV1ListExtraInfoPostOffice,
    InterfaceTaskList,
} from '../../Interface/interface';
import {renderItem} from '../../Common/util';

import {
    State,
    Props,
    Data,
} from './interface';

//Main
class Action extends React.Component<Props, State> {
    refActionSheet: any;
    data: Data = {
        allList: null,
        allOtherList: null,
        nodataList: [
            '轻松处理各种烦琐的事',
            '让所有人看到你的努力',
            '高效的时间管理工具',
            '让每天日程更加高效',
            '管理每天最重要的事',
            '高效安排每天的事情',
            '提升团队效率和执行力'
        ],
        taskList: {
            0: '全部',
            10: '我发出的',
            20: '我执行的',
            30: '抄送我的',
        },
        pageNo: 0,
        pageSize: 10
    };
    state: State = {
        showAllCalendar: false,
        newDate: this.props.match.params.chooseDate ? G.fixDate(this.props.match.params.chooseDate) : new Date(),
        defaultDate: this.props.match.params.chooseDate ? G.fixDate(this.props.match.params.chooseDate) : new Date(),
        topTimeList: [],
        allTimeList: [],
        weekList: [],
        calendarScheduleMap: {},
        //-
        renderDoneList: [],
        renderTodoList: [],
        staffBabyCard: null,
        relationForOther: null,
        isLoad: false,
        // 页面切换
        page: this.props.match.params.page || '0',
        // 范围选择
        isShowSelectFlag: false,
        // 当前选中的 task 范围
        curTask: '0',
        // 添加
        isShowAdd: false,
        // 任务列表
        taskListState: [],
        enabled: false,
        stop: true,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        let pthis = this;
        const {page} = this.state;
        const {userIsLeader, userId} = this.props.match.params;
        G.fixFixed();
        // G.calendar.init().showCalendar(true)
        this.showTopTimeNav(this.state.newDate);
        this.fetchAllRcList(this.state.newDate);
        this.fetchList();
        let newDate = pthis.state.newDate;
        if (pthis.props.match.params.userId == 0) {
            G.setTitle('我的日程');
            G.ajax({
                url: '/skylight/common/getHolidayImage',
                data: {
                    date: G.parseDate(newDate, 1),
                    userId: (pthis.props.match.params.userId * 1 ? pthis.props.match.params.userId * 1 : null)
                },
                // type: 'POST',
                success: function (data: SkylightCommonGetHolidayImage) {
                    pthis.setState({
                        staffBabyCard: data,
                        isLoad: true
                    });
                }
            });
        } else if (pthis.props.match.params.userIsLeader * 1) {
            G.ajax({
                url: '/oa/api/schedule/v2/user/' + pthis.props.match.params.userId,
                cache: false,
                success: function (data: ScheduleV2User) {
                    if (data.isKeeper) {
                        G.setTitle(data.name + '领导的日程');
                    } else {
                        alert('无权查看其他领导日程');
                        history.go(-1);
                    }
                }
            });
        }
        //查看别人的时候 需要获取相互关系
        else {
            G.ajax({
                url: '/oa/api/schedule/v1/relation/listPublicUser',
                type: 'GET',
                data: {
                    relationType: Constant.RelationType.ALL
                },
                async: false,
                success: function (data: RelationListPublicUser) {
                    $.each(data || [], function (idx: number, one: RelationListPublicUserUsers) {
                        if (one.userId == pthis.props.match.params.userId) {
                            let title = one.userName + '公开日程';
                            if (title.length > 8) {
                                title = one.userName.substr(0, 5) + '...' + '日程';
                            }
                            G.setTitle(title);
                            return false;
                        }
                    });
                }
            });
            this.fetchRelaction();
        }

        // 任务
        this.getTaskList();
        location.replace(`#/index/${userId || 0}/${userIsLeader || 0}/${G.parseDate(newDate, 1)}/${page}`);
    }

    componentWillUnmount(): void {
        $(document).off('click');
    }

    fetchRelaction() {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/relation/getRelation',
            data: {
                uId: pthis.props.match.params.userId
            },
            cache: false,
            success: function (data: RelationGetRelation) {
                pthis.setState({
                    relationForOther: data
                });
            }
        });
    }

    fetchScheduleMap(startDate: string, endDate: string): void {
        let pthis = this;
        G.ajax({
            url: 'schedule/v1/calendar/datas',
            data: {
                startDate: startDate,
                endDate: endDate,
                userId: (pthis.props.match.params.userId * 1 ? pthis.props.match.params.userId * 1 : null)
            },
            success: function (data: { datas: Array<scheduleV1CalendarDatas> }) {
                (data.datas || []).forEach(function (one: scheduleV1CalendarDatas, idx) {
                    let calendarScheduleMap = pthis.state.calendarScheduleMap;
                    calendarScheduleMap[one.calDate] = true;
                    pthis.setState({calendarScheduleMap: calendarScheduleMap});
                });
            }
        });
    }

    //---------------------------------时间
    fetchAllRcList(searchDate: Date) {
        // https://sit.jianjian.work/skylight/common/getHolidayImage?date=2018-06-16
        let pthis = this;
        let newDate = searchDate;
        //当前选中天的当月和当天的前后2周和当前选中天的前后两周
        //当天的前后2周可只在加载的时候获取一次.
        //当前选中天的当月和当前选中天的前后两周合并为:当天的月的倒数两周和下月的前两周. 在年月未变化时.可不请求.
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let beforeTwoWeek = new Date(year, month, -14);
        let afterTwoWeek = new Date(year, month + 1, 14);
        G.ajax({
            url: '/oa/api/schedule/v1/calendar/datas',
            data: {
                startDate: G.parseDate(beforeTwoWeek, 1),
                endDate: G.parseDate(afterTwoWeek, 1),
                userId: (pthis.props.match.params.userId ? pthis.props.match.params.userId : null)
            },
            success: function (data: { datas: Array<scheduleV1CalendarDatas> }) {
                let calendarScheduleMap = pthis.state.calendarScheduleMap;
                (data.datas || []).forEach(function (one: scheduleV1CalendarDatas, idx) {
                    calendarScheduleMap[one.calDate] = true;
                });
                pthis.setState({calendarScheduleMap: calendarScheduleMap});
            }
        });
    }

    //渲染不展开时时间控件
    showTopTimeNav(date: Date): void {
        let pthis = this;
        let daysArr: Array<string> = [];
        for (let i = 0; i < 21; i++) {
            let curTime: number = new Date(date).getTime() + (i - 7) * 24 * 60 * 60 * 1000;
            daysArr.push(G.parseDate(curTime, 1));
        }
        this.setState({
            topTimeList: daysArr
        }, function () {
            let topItemW = $(".dayBox .dayItem").width();
            $(".dayBox").scrollLeft(topItemW * 6);
        });
    }

    //控件选择日期
    setNewTopTime(date: string): void {
        //如果在自己的主页. 改变时间需要改变url
        if (this.props.match.params.userId * 1 == 0) {
            window.location.replace('#/index/' + this.props.match.params.userId + '/0/' + date);
        }
        let pthis = this;
        if (date) {
            let newDate = G.fixDate(date);
            let oldDate = pthis.state.newDate;
            let defaultDate = pthis.state.defaultDate;
            this.setState({
                newDate: newDate
            }, function () {
                if (!(oldDate.getFullYear() == newDate.getFullYear() && oldDate.getMonth() == newDate.getMonth())) {
                    pthis.fetchAllRcList(newDate);
                }
                pthis.fetchList();
            });
        }
    }

    //显示展开的时间控件
    showCompileTimeBox(date: Date): void {
        let pthis = this;
        let days: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let day: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let daysArr: Array<string> = [];
        for (let i = 0; i < days + day; i++) {
            let time: string = "";
            if (i < day) {
                time = null;
            } else {
                time = G.parseDate(new Date(date.getFullYear(), date.getMonth(), i - day + 1), 1);
            }
            daysArr.push(time);
        }
        let startWeek: number = G.weekOfYear(date.getFullYear(), date.getMonth() + 1, 1);
        let endWeek: number = G.weekOfYear(date.getFullYear(), date.getMonth() + 1, days);
        let weekList: Array<number> = [];
        for (let j = startWeek; j <= endWeek; j++) {
            weekList.push(j);
        }
        this.setState({
            showAllCalendar: true,
            allTimeList: daysArr,
            defaultDate: date,
            weekList: weekList
        });
    }

    hideCompileTimeBox(): void {
        let pthis = this;
        this.showTopTimeNav(this.state.newDate);
        $(".topCompileTimeBox").addClass("hideSlideMove");
        setTimeout(function () {
            pthis.setState({
                showAllCalendar: false
            });
        }, 500);
    }

    prevMonth(): void {
        let date: Date = this.state.defaultDate;
        let year: number = date.getFullYear();
        let month: number = date.getMonth();
        month -= 1;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        let newDefaultDate = new Date(year, month, 15);
        this.showCompileTimeBox(newDefaultDate);
        this.fetchAllRcList(newDefaultDate);
    }

    nextMonth(): void {
        let date: Date = this.state.defaultDate;
        let year: number = date.getFullYear();
        let month: number = date.getMonth();
        month += 1;
        if (month > 11) {
            month = 0;
            year += 1;
        }
        let newDefaultDate = new Date(year, month, 15);
        this.showCompileTimeBox(newDefaultDate);
        this.fetchAllRcList(newDefaultDate);
    }

    removeCard() {
        this.setState({
            staffBabyCard: null
        });
    }

    //---------------------------------
    fetchList(): void {
        let pthis = this;
        //获取自己的日程
        if (!(pthis.props.match.params.userId * 1)) {
            G.ajax({
                url: '/oa/api/schedule/v1/list',
                cache: false,
                data: {
                    curDate: G.parseDate(pthis.state.newDate, 1),
                },
                success: function (data: ScheduleV1List) {
                    pthis.data.allList = data;
                    let dones: Array<ScheduleV1ListItem> = data.done;
                    let todos: Array<ScheduleV1ListItem> = data.todo;
                    pthis.setState({
                        renderDoneList: pthis.changeSchedule(dones, false, pthis.props.match.params.userId),
                        renderTodoList: pthis.changeSchedule(todos, false, pthis.props.match.params.userId),
                        isLoad: true
                    });
                }
            });
        }
        //获取领导的
        else if (pthis.props.match.params.userIsLeader * 1) {
            G.ajax({
                url: '/oa/api/schedule/v2/list',
                cache: false,
                data: {
                    curDate: G.parseDate(pthis.state.newDate, 1),
                    userId: pthis.props.match.params.userId
                },
                success: function (data: ScheduleV1List) {
                    pthis.data.allList = data;
                    let dones: Array<ScheduleV1ListItem> = data.done;
                    let todos: Array<ScheduleV1ListItem> = data.todo;
                    pthis.setState({
                        renderDoneList: pthis.changeSchedule(dones, false, pthis.props.match.params.userId),
                        renderTodoList: pthis.changeSchedule(todos, false, pthis.props.match.params.userId),
                        isLoad: true
                    });
                }
            });
        }
        //获取同事的
        else {
            G.ajax({
                url: '/oa/api/schedule/v1/partner/list',
                cache: false,
                data: {
                    curDate: G.parseDate(pthis.state.newDate, 1),
                    userId: pthis.props.match.params.userId
                },
                success: function (data: { datas: Array<ScheduleV1PartnerList> }) {
                    pthis.data.allOtherList = data.datas || [];
                    let list: Array<ScheduleV1PartnerList> = data.datas;
                    // let todos: Array<ScheduleV1ListItem> = data.todo;
                    pthis.setState({
                        // renderDoneList: pthis.changeOtherSchedule(list),
                        renderTodoList: pthis.changeSchedule(list, true, pthis.props.match.params.userId),
                        isLoad: true
                    });
                }
            });
        }

    }

    changeOtherSchedule(list: Array<ScheduleV1PartnerList>): Array<renderItem> {
        let pthis = this;
        let reList: Array<renderItem> = [];
        return list.map(function (item: ScheduleV1PartnerList, idx: number) {
            return {
                time: (item.startTime && item.endTime ? (' ' + (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5)) : ''),
                title: item.subject,
                descript: item.remark,
                tempId: idx,
                tip: '',
                object: item,
                type: Constant.SCHEDULE_TYPE.SELF,
                level: 'normal',
                refId: item.id,
                url: '#/detail/' + item.id + '/0'//同事日程不传用户id
            };
        });
    }

    //转换函数. 后端返回的object 转成显示格式
    changeSchedule(list: Array<ScheduleV1ListItem>, isColleage: boolean, userId: number = 0): Array<renderItem> {
        let pthis = this;
        let reList: Array<renderItem> = [];
        return list.map(function (item: ScheduleV1ListItem, idx: number) {
            if (typeof item.extraInfo == 'string') {
                item.extraInfo = JSON.parse(item.extraInfo) || {};
            }
            if (item.type == Constant.SCHEDULE_TYPE.SELF) {
                return {
                    time: (item.startTime && item.endTime ? (' ' + (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5)) : ''),
                    title: item.subject,
                    descript: item.remark,
                    tempId: idx,
                    tip: (item.isOwner == 'N' ? item.ownerName + '创建 ' : '') + (item.isOpen == 'Y' ? '公开' : ''),
                    object: item,
                    type: item.type,
                    level: util.changeLevelToString(item.priority),
                    refId: item.id,
                    url: '#/detail/' + item.id + '/' + (isColleage ? '0' : userId),
                };
            }
            if (item.type == Constant.SCHEDULE_TYPE.MEETING) {
                let ob: ScheduleV1ListExtraInfoMeeting = item.extraInfo;
                let tipStatus: { [key: number]: string } = {
                    10: '未开始',
                    20: '已开始',
                    30: '进行中',
                    40: '已结束',
                    50: '已取消'
                };
                let tip = tipStatus[ob.status];
                return {
                    time: (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5),
                    title: item.subject,
                    descript: [ob.roomName, item.ownerName + '(发起人)' + (item.staffs.length > 1 ? '; ' + item.staffs[0].userName : '') + ('等' + (item.staffs.length) + '人')],
                    tempId: idx,
                    tip: tip,
                    object: item,
                    type: item.type,
                    level: util.changeLevelToString(item.priority),
                    refId: item.id,
                    url: '../mn/redirect.html?page=detailevent&id=' + item.thirdId,
                };
            }
            if (item.type == Constant.SCHEDULE_TYPE.POSTOFFICE) {
                let ob: ScheduleV1ListExtraInfoPostOffice = item.extraInfo;
                return {
                    time: '',
                    title: '小邮局 - 你有一个快递待领取',
                    descript: [(ob.expressAddress ? ob.expressAddress : null), (ob.expressNo ? '快递单号 ' + ob.expressNo : null)],
                    tempId: idx,
                    tip: ob.status == 20 ? '已签收' : '',
                    object: item,
                    type: item.type,
                    level: util.changeLevelToString(item.priority),
                    refId: item.id,
                    url: '../postoffice/redirect.html?page=enter',
                };
            }
            if (item.type == Constant.SCHEDULE_TYPE.SUMMARY) {
                let ob: ScheduleV1ListExtraInfoSummary = item.extraInfo;
                return {
                    time: '',
                    title: item.subject,
                    descript: [ob.eventSubject, `分派人：${item.ownerName}`],
                    tempId: idx,
                    tip: '',
                    object: item,
                    type: item.type,
                    level: util.changeLevelToString(item.priority),
                    refId: item.id,
                    url: '#/meetingSummary/' + item.id + '/0',
                };
            }
            if (item.type == Constant.SCHEDULE_TYPE.VISITOR) {
                let ob: ScheduleV1ListExtraInfoVisitor = item.extraInfo;
                let tipStatus: { [key: number]: string } = {
                    10: '已预约',
                    20: '已到访',//'已来访', 第一版本不显示. 9月迭代又需要展示
                    30: '已取消',
                    40: '已过期'
                };
                let tip = tipStatus[ob.status];
                return {
                    //2018-12-12 去掉访客的时间(item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5)
                    time: '',
                    title: ob.visitPurpose,
                    descript: [(ob.staffs.length > 0 ? '访客: ' + ob.staffs[0].name + '等' + ob.staffs.length + '人 ' : ''), ob.visitAddress ? '访客单位: ' + ob.visitAddress : ''],
                    tempId: idx,
                    tip: tip,
                    object: item,
                    type: item.type,
                    level: util.changeLevelToString(item.priority),
                    refId: item.id,
                    url: '../visitor/redirect.html?page=detail&vid=' + item.thirdId + '&cancel=1'
                };
            }
        });
    }

    clickDoneIt(one: renderItem, idx: number): void {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/done/',
            type: 'POST',
            data: {
                recordId: one.refId,
                userId: (this.props.match.params.userIsLeader == 1 ? this.props.match.params.userId : null),
            },
            success: function (data: boolean) {
                let renderTodoList: Array<renderItem> = _.filter(pthis.state.renderTodoList, function (t: renderItem, tidx: number) {
                    return (tidx != idx);
                });
                let didObject: ScheduleV1ListItem = one.object;
                let renderDoneList = pthis.state.renderDoneList;
                renderDoneList.unshift(pthis.changeSchedule([didObject], false, pthis.props.match.params.userId)[0]);
                //如果todoList 变空了. 切换map中的数值,去掉日历下标点
                let calendarScheduleMap = pthis.state.calendarScheduleMap;
                if (renderTodoList.length == 0) {
                    calendarScheduleMap[G.parseDate(pthis.state.newDate, 1)] = false;
                }
                pthis.setState({
                    renderTodoList: renderTodoList,
                    renderDoneList: renderDoneList,
                    calendarScheduleMap: calendarScheduleMap
                });
            }
        });
    }

    clickTodoIt(one: renderItem, idx: number): void {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/todo/',
            type: 'POST',
            data: {
                recordId: one.refId,
                userId: (this.props.match.params.userIsLeader == 1 ? this.props.match.params.userId : null),
            },
            success: function (data: boolean) {
                let renderDoneList: Array<renderItem> = _.filter(pthis.state.renderDoneList, function (t: renderItem, tidx: number) {
                    return (tidx != idx);
                });
                let didObject: ScheduleV1ListItem = one.object;
                let renderTodoList = pthis.state.renderTodoList;
                renderTodoList.unshift(pthis.changeSchedule([didObject], false, pthis.props.match.params.userId)[0]);
                //如果todoList有数据. map中设置有true,日历上显示下标点
                let calendarScheduleMap = pthis.state.calendarScheduleMap;
                if (renderTodoList.length > 0) {
                    calendarScheduleMap[G.parseDate(pthis.state.newDate, 1)] = true;
                }
                pthis.setState({
                    renderTodoList: renderTodoList,
                    renderDoneList: renderDoneList,
                    calendarScheduleMap: calendarScheduleMap
                });
            }
        });
    }

    showActionPublic() {
        let pthis = this;
        let actionsConnects: any = [];
        let l = [];
        //Enum(我对他公开：1，我取消对他公开:2，我想看他:3，我不想看他:4)
        //相互关注 可以: 不向他公开 不看他日程/看他日程
        if (pthis.state.relationForOther.publicRelationType == Constant.RelationType.EACH) {
            l.push({id: 2, t: '不向Ta公开'});
            if (pthis.state.relationForOther.isSeeHe == 'Y') {
                l.push({id: 4, t: '不看Ta的日程'});
            } else {
                l.push({id: 3, t: '看Ta的日程'});
            }
        }
        //我向Ta公开 可以: 我不向他公开 
        if (pthis.state.relationForOther.publicRelationType == Constant.RelationType.VIEW_ME) {
            l.push({id: 2, t: '不向Ta公开'});
        }
        //Ta向我公开 可以: 我不向他公开  不看他日程/看他日程
        if (pthis.state.relationForOther.publicRelationType == Constant.RelationType.VIEW_IT) {
            l.push({id: 1, t: '向Ta公开日程'});
            if (pthis.state.relationForOther.isSeeHe == 'Y') {
                l.push({id: 4, t: '不看Ta的日程'});
            } else {
                l.push({id: 3, t: '看Ta的日程'});
            }
        }
        $.each(l, function (idx, one) {
            actionsConnects.push({
                text: one.t, info: {color: '', id: one.id}, cb: (idx: number, text: string, info: any) => {
                    // console.log(idx, text, info);
                    let tFn = function () {
                        G.ajax({
                            url: '/oa/api/schedule/v1/relation/operate',
                            data: {
                                uId: pthis.props.match.params.userId,
                                relationOperation: info.id
                            },
                            type: 'POST',
                            success: function (data: boolean) {
                                pthis.fetchRelaction();
                            }
                        });
                    };
                    if (info.id == 2) {
                        G.confirm.show('Ta已把你加到关注名单<br/>确定不向Ta公开日程吗？', [function () {
                        }, function () {
                            tFn();
                        }]);
                    } else {
                        tFn();
                    }

                }
            });
        });
        pthis.refActionSheet.show(actionsConnects, () => {
            // console.log('cancel');
        });
    }

    actionTop() {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/relation/top',
            data: {
                uId: pthis.props.match.params.userId,
                isTop: (pthis.state.relationForOther.isTop == 'Y' ? 'N' : 'Y')
            },
            type: 'POST',
            success: function (data: boolean) {
                pthis.fetchRelaction();
            }
        });
    }

    // tab
    navLinkClick = (page: string) => {
        return () => {
            this.setState({
                page: page
            }, () => {
                const {newDate} = this.state;
                const {userId, userIsLeader} = this.props.match.params;
                location.replace(`#/index/${userId || 0}/${userIsLeader || 0}/${G.parseDate(newDate, 1)}/${page}`);
            });
        };
    }

    /**
     * 选择任务范围
     */
    clickSelectTask = (type: string) => {
        return () => {
            this.setState({
                curTask: type,
                isShowSelectFlag: false,
                taskListState: []
            }, () => {
                // 获取范围内数据
                this.data.pageNo = 0;
                this.getTaskList();
                $('body').removeClass('position-fixed');
            });
        };
    };

    showTask = () => {
        const {isShowSelectFlag} = this.state;
        this.setState({
            isShowSelectFlag: !isShowSelectFlag
        }, () => {
            if (!isShowSelectFlag) {
                $('body').addClass('position-fixed');
            } else {
                $('body').removeClass('position-fixed');
            }
        });
    };

    showAdd = () => {
        this.setState({
            isShowAdd: true
        }, () => {
            $(document).off('click');
            $(document).on('click', (e: JQuery.Event) => {
                if ($(e.target).hasClass('add')) {
                    return;
                }
                this.setState({
                    isShowAdd: false,
                }, () => {
                    $(document).off('click');
                });
            });
        });
    };

    /**
     * 添加任务 添加日程
     */
    clickAdd = (type: string) => {
        return () => {
            if (type === 'schedule_1') {
                window.location.href = '#/editSchedule/0/0/' + G.parseDate(this.state.newDate.getTime(), 1);
            }
            if (type == 'schedule_2') {
                window.location.href = '#/editSchedule/0/' + this.props.match.params.userId + '/' + G.parseDate(this.state.newDate.getTime(), 1);
            }
            if (type == 'task') {
                window.location.href = '#/task';
            }
        };
    };

    /*
    * 任务列表
    * */
    async getTaskList() {
        const {pageNo, pageSize} = this.data;
        const {taskListState, curTask} = this.state;
        try {
            this.setState({
                stop: true
            });
            const result = await util.GET<InterfaceTaskList>({
                url: '/oa/api/assignment/list',
                data: {
                    pageNo: pageNo + 1,
                    pageSize: pageSize,
                    searchType: curTask
                },
                isLoading: true
            });
            if (result) {
                this.data.pageNo += 1;
                this.setState({
                    taskListState: [].concat(taskListState, (result.datas || []))
                }, () => {
                    this.setState({
                        enabled: !!(result.datas || []).length,
                        stop: false
                    });
                });
            }
        } catch (e) {
        }
    }

    // 任务详情
    gotoDetail(recordId: string) {
        window.location.href = `#/taskDetail/${recordId || ''}`;
    }
}

export default Action;
