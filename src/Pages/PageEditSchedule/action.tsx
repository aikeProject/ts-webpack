///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Contants from '../../Common/Constans';
//Components
//Modules
//Less
import './index.less';
//interface
import {
    ScheduleV1Detail,
    ScheduleV1DetailDepts,
    ScheduleV1DetailStaffs,
    ScheduleV2User,
    DeptList
} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
    Dept,
    Member,
    NameNode
} from './interface';
import {
    SureCallBackMember,
    SureCallBackPhone,
    SureCallBackGroup,
    initListMember,
    initListGroup,
} from '../../../third/PageContacts/interface';

//Main
class Action extends React.Component<Props, State> {
    refActionSheet: any;
    refPageContacts: any;
    state: State = {
        // chooseDate: this.props.match.params.chooseDate || G.parseDate((new Date()).getTime(), 1),
        isShowContacts: false,
        isPublic: false,
        level: 'normal',
        startTime: this.props.match.params.chooseDate
            ? this.props.match.params.chooseDate + ' ' + util.parse15Minites(G.parseDate((new Date()).getTime() + 10 * 60 * 1000).substr(11, 5)) + ':00'
            : G.parseDate((new Date()).getTime() + 10 * 60 * 1000, 1) + util.parse15Minites(G.parseDate((new Date()).getTime() + 10 * 60 * 1000).substr(11, 5)) + ':00',
        endTime: this.props.match.params.chooseDate
            ? this.props.match.params.chooseDate + ' ' + util.parse15Minites(G.parseDate((new Date()).getTime() + 70 * 60 * 1000).substr(11, 5)) + ':00'
            : G.parseDate((new Date()).getTime() + 70 * 60 * 1000, 1) + util.parse15Minites(G.parseDate((new Date()).getTime() + 70 * 60 * 1000).substr(11, 5)) + ':00',
        nameList: [],
        subject: '',
        descript: '',
        txTime: {},
        leaderValue: '',
    };
    data: Data = {
        deptList: [],
        userList: [],
        txMap: Contants.NOTICE_MAP,
        subFlag: false,
        allCompanyDeptId: 0
    };

    constructor(props: Props) {
        super(props);
        this.contactsHashChange = this.contactsHashChange.bind(this);
    }

    componentDidMount() {
        let pthis = this;
        G.fixFixed();
        if (pthis.props.match.params.scheduleId != '0') {
            G.setTitle('编辑日程');
            G.ajax({
                url: '/oa/api/schedule/v1/detail/' + pthis.props.match.params.scheduleId,
                type: 'GET',
                data: {
                    userId: parseInt(pthis.props.match.params.leaderId) > 0 ? parseInt(pthis.props.match.params.leaderId) : null,
                },
                cache: false,
                success: function (data: { data: ScheduleV1Detail }) {
                    let depts: Array<Dept> = [];
                    let staffs: Array<Member> = [];
                    let timestamp = new Date().getTime();
                    let userList: Array<Member> = [];
                    let deptList: Array<Dept> = [];
                    let nameList: Array<NameNode> = [];
                    $.each(data.data.staffs || [], function (idx: number, one: ScheduleV1DetailStaffs) {
                        userList.push({
                            userName: one.userName,
                            id: one.userId,
                            timestamp: timestamp + idx
                        });
                    });
                    timestamp += data.data.staffs.length;
                    $.each(data.data.depts || [], function (idx: number, one: ScheduleV1DetailDepts) {
                        deptList.push({
                            deptId: one.deptId,
                            deptName: one.deptName,
                            timestamp: timestamp + idx,
                            id: one.id
                        });
                    });
                    pthis.data.userList = userList;
                    pthis.data.deptList = deptList;
                    $.each(userList || [], function (idx: number, one: Member) {
                        nameList.push({
                            name: one.userName,
                            timestamp: timestamp + 1,
                            memberNode: one
                        });
                    });
                    $.each(deptList || [], function (idx: number, one: Dept) {
                        nameList.push({
                            name: one.deptName,
                            timestamp: timestamp + idx,
                            deptNode: one
                        });
                    });
                    nameList = _.sortBy(nameList, function (item: NameNode) {
                        return item.timestamp;
                    });
                    pthis.setState({
                        nameList: nameList
                    });
                    let level: string = 'normal';
                    // 0-无 10-低 20-中 30-高
                    switch (data.data.priority) {
                        case Contants.PRIORITY.NORMAL:
                            level = 'normal';
                            break;
                        case Contants.PRIORITY.HIGH:
                            level = 'high';
                            break;
                        case Contants.PRIORITY.LOW:
                            level = 'low';
                            break;
                        default:
                            level = 'normal';
                    }
                    // if (data.priority == Contants.PRIORITY.NORMAL) {
                    //     level = 'normal';
                    // }
                    //noticeTime
                    let txTime: { [key: number]: number } = {};
                    let noticeTimeArr = (data.data.noticeTime || "").split(',');
                    $.each(noticeTimeArr || [], (idx, one) => {
                        if (one) {
                            txTime[parseInt(one)] = 1;
                        }
                    });
                    pthis.setState({
                        subject: data.data.subject,
                        descript: data.data.remark,
                        startTime: data.data.startTime,
                        endTime: data.data.endTime,
                        level: level,
                        isPublic: data.data.isOpen == 'Y' ? true : false,
                        nameList: nameList,
                        txTime: txTime
                    });
                }
            });
        } else {
            G.setTitle('新建日程');
        }
        //是否新增的是领导日程
        if (parseInt(pthis.props.match.params.leaderId) > 0) {
            G.ajax({
                url: '/oa/api/schedule/v2/user/' + pthis.props.match.params.leaderId,
                cache: false,
                success: function (data: ScheduleV2User) {
                    if (data.isKeeper) {
                        pthis.setState({
                            leaderValue: data.name + ' ' + data.position
                        });
                    }
                }
            });
        }
        //获取公司的全公司部门,用来判断是不是选择了全公司
        (function () {
            G.ajax2({
                url: '/dept/list',
                data: {pageSize: 20},
                success: function (data: DeptList) {
                    if (data.subDeptList && data.subDeptList.length == 1) {
                        pthis.data.allCompanyDeptId = data.subDeptList[0].id;
                    }
                }
            });
        })();
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.contactsHashChange);
    }

    //通讯录操作 start
    contactsHashChange() {
        let pthis = this;
        if (window.location.href.indexOf('--contacts') > -1) {
            //回显
            let list: Array<initListMember | initListGroup> = [];
            (pthis.data.userList || []).map(function (one, idx) {
                list.push({
                    id: one.id,
                    userName: one.userName,
                    mobile: '',
                    type: 'member'
                });
            });
            (pthis.data.deptList || []).map(function (one, idx) {
                list.push({
                    id: one.id,
                    deptName: one.deptName,
                    type: 'group'
                });
            });
            this.refPageContacts.setInitList(list, false);
            this.setState({
                isShowContacts: true
            });
        } else {
            this.setState({
                isShowContacts: false
            });
        }
    }

    showContacts() {
        window.addEventListener('hashchange', this.contactsHashChange);
        window.location.href = window.location.href + '/--contacts';
    }

    sureSelectMCallBack(tlist: Array<SureCallBackMember>, phoneList: Array<SureCallBackPhone>, groupList: Array<SureCallBackGroup>) {
        let pthis = this;
        let timestamp = new Date().getTime();
        let userList: Array<Member> = [];
        let deptList: Array<Dept> = [];
        let nameList: Array<NameNode> = [];
        $.each(tlist || [], function (idx: number, one: SureCallBackMember) {
            userList.push({
                userName: one.userName,
                id: one.id,
                timestamp: timestamp + idx
            });
        });
        timestamp += tlist.length;
        $.each(groupList || [], function (idx: number, one: SureCallBackGroup) {
            deptList.push({
                deptId: one.deptId,
                deptName: one.deptName,
                timestamp: timestamp + idx,
                id: one.id
            });
        });
        pthis.data.userList = userList;
        pthis.data.deptList = deptList;
        $.each(userList || [], function (idx: number, one: Member) {
            nameList.push({
                name: one.userName,
                timestamp: one.timestamp,
                memberNode: one
            });
        });
        $.each(deptList || [], function (idx: number, one: Dept) {
            nameList.push({
                name: one.deptName,
                timestamp: one.timestamp,
                deptNode: one
            });
        });
        nameList = _.sortBy(nameList, function (item: NameNode) {
            return item.timestamp;
        });
        pthis.setState({
            nameList: nameList
        });
        history.go(-1);
    }

    //通讯录操作 end
    togglePublic() {
        this.setState({
            isPublic: !this.state.isPublic
        });
    }

    changeLevel(levelStr: string) {
        this.setState({
            level: levelStr
        });
    }

    handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (key == 'subject') {
            this.setState({
                subject: val
            });
        }
        if (key == 'descript') {
            this.setState({
                descript: val
            });
        }
    }

    subData() {
        let pthis = this;
        let subject = $.trim(pthis.state.subject);
        if (subject == '') {
            G.toast.show('请输入主题');
            return false;
        }
        if (subject.length > 20) {
            G.toast.show('主题不超过20字');
            return false;
        }
        let descript = $.trim(pthis.state.descript);
        if (descript.length > 150) {
            G.toast.show('描述最多150字');
            return false;
        }
        // //不能一个为空
        if (pthis.state.startTime.length > 0 && pthis.state.endTime.length == 0) {
            G.toast.show('请选择结束时间');
            return false;
        }
        if (pthis.state.endTime.length > 0 && pthis.state.startTime.length == 0) {
            G.toast.show('请选择开始时间');
            return false;
        }
        //判断时间
        let startDateTime: Date = G.fixDate(pthis.state.startTime);
        // if (pthis.state.startTime.length > 0) {
        // startDateTime = G.fixDate(pthis.state.chooseDate + ' ' + pthis.state.startTime + ':00');
        // } else {
        // startDateTime = G.fixDate(pthis.state.chooseDate + ' 23:59:59');
        // }
        // if (chooseDate.getTime() < G.fixDate(G.parseDate(new Date().getTime(), 1))) {
        //     G.toast.show('请选择今天及之后的日期');
        //     return false;
        // }

        // let nowTime = new Date().getTime();
        // if (startDateTime.getTime() <= nowTime) {
        //     G.toast.show('开始时间不能早于当前时间');
        //     return false;
        // }
        let endDateTime: Date = G.fixDate(pthis.state.endTime);
        if (endDateTime <= startDateTime) {
            G.toast.show('结束时间不能晚于开始时间');
            return false;
        }
        let url = '/oa/api/schedule/v2/add';
        if (pthis.props.match.params.scheduleId != '0') {
            url = '/oa/api/schedule/v2/edit';
        }
        //判断是否选择了全公司
        if (_.filter(pthis.data.deptList || [], (one: SureCallBackGroup) => {
            return pthis.data.allCompanyDeptId == one.deptId;
        }).length > 0) {
            G.toast.show('不能选择全公司');
            return false;
        }
        let priority = Contants.PRIORITY.NORMAL;
        switch (pthis.state.level) {
            case 'normal':
                priority = Contants.PRIORITY.NORMAL;
                break;
            case 'low':
                priority = Contants.PRIORITY.LOW;
                break;
            case 'high':
                priority = Contants.PRIORITY.HIGH;
                break;
            default:
                priority = Contants.PRIORITY.NORMAL;
        }
        if (pthis.data.subFlag) {
            return;
        }
        pthis.data.subFlag = true;
        let subData: any = {
            subject: subject,
            remark: descript,
            startTime: pthis.state.startTime,
            endTime: pthis.state.endTime,
            priority: priority,
            isOpen: pthis.state.isPublic ? 'Y' : 'N',
            userIds: _.pluck(pthis.data.userList, 'id').toString(),
            deptIds: _.pluck(pthis.data.deptList, 'id').toString(),
            groupIds: '',
            id: (pthis.props.match.params.scheduleId != '0' ? pthis.props.match.params.scheduleId : null),
            noticeTime: _.keys(pthis.state.txTime || {}).join(','),
        };
        if (pthis.state.leaderValue) {
            subData.leaderId = pthis.props.match.params.leaderId;
        }
        G.ajax3({
            url: url,
            data: subData,
            type: 'POST',
            success: function (data: boolean) {
                G.toast2.show('plugins/gz2.png', '保存成功', 2000);
                pthis.data.subFlag = false;
                // history.go(-1);
                window.location.href = `#/index/0/0/${G.parseDate(new Date())}/0`;
            },
            error: () => {
                pthis.data.subFlag = false;
            }
        });

    }

    // showCaledar() {
    //     let pthis = this;
    //     G.calendar.sureCallBack = function (date: string) {
    //         if (G.fixDate(date) * 1 < G.fixDate(G.parseDate(new Date().getTime(), 1))) {
    //             G.toast.show('不能选择过去的时间');
    //             return false;
    //         }
    //         pthis.setState({
    //             chooseDate: date
    //         });
    //     }
    //     G.calendar.cancelCallBack = function () {
    //     }
    //     G.calendar.setCurTime(G.fixDate(pthis.state.chooseDate).getTime()).showCalendar(true);
    // }
    showNoticeTimer() {
        let pthis = this;
        let divs = [];
        for (let one in pthis.data.txMap) {
            divs.push({
                html: pthis.data.txMap[one],
                value: one,
                select: (pthis.state.txTime[one] ? true : false)
            });
        }
        G.multiselect.show(divs, function (flag: boolean, idx: number, item: number) {

        }, function (list: number[]) {
            if (list.length == 0) {
                G.toast.show('至少选择一项');
                return false;
            }
            pthis.state.txTime = {};
            $.each(list || [], function (idx, one: any) {
                pthis.state.txTime[one.value] = one.value;
                pthis.setState(pthis.state);
            });
        }, function () {
        });
        // let pthis = this;
        // let actionsConnects: any = [];
        // let l: Array<{ id: string, t: string }> = [];
        // // l.push({ id: 0, t: '不提醒' });
        // // l.push({ id: 15, t: '提前15分钟' });
        // // l.push({ id: 30, t: '提前30分钟' });
        // // l.push({ id: 45, t: '提前45分钟' });
        // // l.push({ id: 60, t: '提前一小时' });
        // for (let t in this.data.txMap) {
        //     l.push({
        //         id: t,
        //         t: this.data.txMap[t]
        //     });
        // }
        // $.each(l, function (idx, one) {
        //     actionsConnects.push({
        //         text: one.t, info: { color: '', id: one.id }, cb: (idx: number, text: string, info: any) => {
        //             pthis.setState({
        //                 txTime: parseInt(l[idx].id)
        //             });
        //         }
        //     });
        // });
        // pthis.refActionSheet.show(actionsConnects, () => {
        //     // console.log('cancel');
        // });
    }

    chooseTimer(key: string) {
        let pthis = this;
        let divs0: Array<string> = [], sn0: number = 0;
        let divs1: Array<string> = [], sn1: number = 0;
        let divs2: Array<string> = [], sn2: number = 0;
        // 往后推30天
        let day30 = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
        let today = new Date(day30);
        let curTime = '';
        if (key == 'startTime') {
            curTime = this.state.startTime;
        }
        if (key == 'endTime') {
            curTime = this.state.endTime;
        }
        for (let i = 0; i <= 90; i++) {
            let tDate = G.parseDate(today.getTime() + i * 1000 * 3600 * 24, 2).substr(5);
            let valueDate = G.parseDate(today.getTime() + i * 1000 * 3600 * 24, 1);
            divs0.push('<div data-value="' + valueDate + '">' + tDate + '</div>');
            if (curTime && curTime.substr(0, 10) == valueDate) {
                sn0 = i;
            }
        }
        for (let i = 0; i < 24; i++) {
            let t = (i < 10 ? '0' + i : i);
            divs1.push('<div data-value="' + t + '">' + t + '时</div>');
            if (curTime && curTime.substr(11, 2) == t) {
                sn1 = i;
            }
        }
        for (let i = 0; i < 4; i++) {
            let t = (i * 15 < 10 ? '0' + i * 15 : i * 15);
            divs2.push('<div data-value="' + t + '">' + t + '分</div>');
            if (curTime && curTime.substr(14, 2) == t) {
                sn2 = i;
            }
        }
        G.selectYHS.show(divs0, divs1, divs2, sn0, sn1, sn2, ['取消', '确定'], '');
        G.selectYHS.sureCallBack = function (t0: string, v0: string, t1: string, v1: string, t2: string, v2: string, n0: number, n1: number, n2: number) {
            if (key == 'startTime') {
                let startDateTime: Date = G.fixDate(v0 + ' ' + v1 + ':' + v2 + ':00');
                // let nowTime = new Date().getTime();
                // if (startDateTime.getTime() <= nowTime) {
                //     G.toast.show('开始时间不能晚于当前时间');
                //     return false;
                // }
                pthis.setState({
                    [key]: v0 + ' ' + v1 + ':' + v2 + ':00',
                    endTime: G.parseDate(startDateTime.getTime() + 60 * 60 * 1000)
                });
            }
            if (key == 'endTime') {
                let endDateTime: Date = G.fixDate(v0 + ' ' + v1 + ':' + v2 + ':00');
                let startDateTime: Date = G.fixDate(pthis.state.startTime);
                if (endDateTime <= startDateTime) {
                    G.toast.show('结束时间不能晚于开始时间');
                    return false;
                }
                pthis.setState({
                    [key]: v0 + ' ' + v1 + ':' + v2 + ':00'
                });
            }
        };
        G.selectYHS.scrollCallBack = [function (v0: string, t0: string, n0: number) {
        }, function (v1: string, t1: string, n1: number) {
        }, function () {
        }];
    }
}

export default Action;
