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
    ScheduleV1ListItem,
    ScheduleV1ListExtraInfoSummary,
    ScheduleV1ListExtraInfoMeeting,
    ScheduleV1ListExtraInfoVisitor,
    ScheduleV1ListExtraInfoPostOffice,
    ScheduleV1PartnerList,
    ScheduleV3PartnersDatas,
} from '../../Interface/interface';
import {renderItem} from '../../Common/util';

import {
    State,
    Props,
    Data,
} from './interface';

const dayjs = require('dayjs');

//Main
class Action extends React.Component<Props, State> {
    refActionSheet: any;
    data: Data = {};
    state: State = {
        isKeeper: 'N',
        isLoad: false,
        datas: {
            leaders: [],
            partners: []
        },
        showMoreMap: {},
        page: this.props.match.params.page || '0'
    };

    constructor(props: Props) {
        super(props);
        location.replace(`#/colleageList/${this.state.page}`);
    }

    componentDidMount() {
        let pthis = this;
        G.fixFixed();
        G.setTitle('同事日程');
        this.fetchAllRcList();
    }

    fetchAllRcList() {
        G.ajax({
            url: '/oa/api/schedule/v3/partners/datas',
            type: 'GET',
            cache: false,
            success: (data: ScheduleV3PartnersDatas) => {
                this.setState({
                    isLoad: true,
                    isKeeper: data.isKeeper || 'N',
                    datas: data || {
                        leaders: [],
                        partners: []
                    }
                });
            }
        });
    }


    //---------------------------------
    showMore(userId: number) {
        let {showMoreMap} = this.state;
        showMoreMap[userId] = true;
        this.setState({showMoreMap});
    }

    //只有同事才会置顶
    makeTop(userId: number, isTop: 'Y' | 'N') {
        // let pthis = this;
        // let newIsTop: 'Y' | 'N' = (isTop == 'Y' ? 'N' : 'Y');
        // G.ajax({
        //     url: '/oa/api/schedule/v1/relation/top',
        //     data: {
        //         uId: userId,
        //         isTop: newIsTop
        //     },
        //     type: 'POST',
        //     success: (data: boolean) => {
        //         let list = this.state.datas.partners;
        //         let newList = list.map((one) => {
        //             if (one.userId == userId) {
        //                 one.isTop = newIsTop;
        //             }
        //             return one;
        //         });
        //         let datas = this.state.datas;
        //         datas.partners = newList;
        //         this.setState({
        //             datas
        //         });
        //     }
        // });
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

    timeFormat = (time: string) => {
        const timeDate: Date = time && G.fixDate(time).getTime();
        if (timeDate) {
            return dayjs(timeDate).format('YYYY-M-D (ddd) HH:mm');
        }
        return '';
    };

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
                    // time: (item.startTime && item.endTime ? (' ' + (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5)) : ''),
                    time: item.startTime && item.endTime ? `${pthis.timeFormat(item.startTime)} - ${(item.endTime || '').substr(11, 5)}` : '',
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
                    // time: (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5),
                    time: item.startTime && item.endTime ? `${pthis.timeFormat(item.startTime)} - ${(item.endTime || '').substr(11, 5)}` : '',
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
                    url: '#/meetingSummary/' + item.id + '/' + (isColleage ? 0 : userId),
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

    showColleageIndex(userId: number, isLeader: boolean, e: any) {
        // 取当前时间
        const startTime = G.parseDate(new Date(), 1);
        window.location.href = '#/index/' + userId + '/' + (isLeader ? '1' : '0') + '/' + startTime;
    }

    // tab
    navLinkClick = (page: string) => {
        return () => {
            this.setState({
                page: page
            }, () => {
                location.replace(`#/colleageList/${this.state.page}`);
            });
        };
    }
}

export default Action;
