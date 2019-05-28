import * as Constant from '../Common/Constans';
import {
    ScheduleV1ListItem,
    ScheduleV1ListExtraInfoSummary,
    ScheduleV1ListExtraInfoMeeting,
    ScheduleV1ListExtraInfoVisitor,
    ScheduleV1ListExtraInfoPostOffice,
} from '../Interface/interface';

export function test(s: string): string {
    return s;
}

export function changeLevelToString(num: number): string {
    switch (num) {
        case Constant.PRIORITY.HIGH:
            return 'high';
        case Constant.PRIORITY.LOW:
            return 'low';
        case Constant.PRIORITY.NORMAL:
            return 'normal';
        case Constant.PRIORITY.MIDDLE:
            return 'middle';
        default:
            return 'normal';
    }
}

export function parse15Minites(time: string) {
    // time = 15:36 => return 15:45
    let timeArr: string[] = time.split(':');
    let timeCal = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    timeCal = Math.ceil(timeCal / 15) * 15;
    let honr = Math.floor(timeCal / 60);
    let minu = timeCal - honr * 60;
    return (honr < 10 ? '0' + honr : honr) + ':' + (minu < 10 ? '0' + minu : minu);
}


//转换
export interface renderItem {
    time: string,
    title: string,
    descript: string[] | string,
    tempId: number,
    tip: string,
    object: any,
    type: number,
    level: string,
    refId: number,
    url: string,
}

export function changeSchedule(list: Array<ScheduleV1ListItem>, isColleage: boolean, userId: string): Array<renderItem> {
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
                level: changeLevelToString(item.priority),
                refId: item.id,
                url: '#/detail/' + item.id + '/' + (isColleage ? '0' : pthis.props.match.params.userId),
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
                level: changeLevelToString(item.priority),
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
                level: changeLevelToString(item.priority),
                refId: item.id,
                url: '../postoffice/redirect.html?page=enter',
            };
        }
        if (item.type == Constant.SCHEDULE_TYPE.SUMMARY) {
            let ob: ScheduleV1ListExtraInfoSummary = item.extraInfo;
            return {
                time: '',
                title: ob.summarySubject,
                descript: (ob.staffs.length > 0 ? ob.staffs[0].name + '等' + ob.staffs.length + '人 ' : '') + ob.eventSubject,
                tempId: idx,
                tip: '',
                object: item,
                type: item.type,
                level: changeLevelToString(item.priority),
                refId: item.id,
                url: '../mn/redirect.html?page=detailsummary&id=' + item.thirdId,
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
                time: (item.startTime || '').substr(11, 5) + '-' + (item.endTime || '').substr(11, 5),
                title: ob.visitPurpose,
                descript: [(ob.staffs.length > 0 ? '访客: ' + ob.staffs[0].name + '等' + ob.staffs.length + '人 ' : ''), ob.visitAddress ? '访客单位: ' + ob.visitAddress : ''],
                tempId: idx,
                tip: tip,
                object: item,
                type: item.type,
                level: changeLevelToString(item.priority),
                refId: item.id,
                url: '../visitor/redirect.html?page=detail&vid=' + item.thirdId + '&cancel=1'
            };
        }
    });
}

// 上传文件
export function upload(options: {
    uploadFileType?: string,
    url?: string,
    file?: any,
}) {
    let formData = new FormData();
    return new Promise((resolve, reject) => {
        formData.append("file", options.file);
        formData.append('uploadFileType', options.uploadFileType);
        let request = new XMLHttpRequest();
        request.open("POST", G.BASE_URL() + options.url);
        request.timeout = 60 * 1000;
        request.send(formData);
        request.onload = function (oEvent) {
            if (request.status == 200) {
                try {
                    let response = JSON.parse(request.response);
                    if (response.success) {
                        resolve(response.model);
                        console.log("上传成功---");
                    } else {
                        G.toast.show(response.errorMsg || "上传出错，请重试");
                        reject();
                    }
                } catch (e) {
                    G.toast.show('连接出错，请稍后重试');
                    reject();
                }
            } else {
                G.toast.show('连接出错，请稍后重试');
                reject();
            }
        };
        request.ontimeout = function () {
            $('#file-input').val('');
            G.toast.show('上传超时');
            reject();
        };
        request.onerror = function () {
            $('#file-input').val('');
            G.toast.show('连接出错，请稍后重试');
            reject();
        };
    });
}

interface PlainObject<T = any> {
    [key: string]: T;
}

// GET
interface InterfaceGET extends JQuery.AjaxSettings {
    url: string,
    type?: 'GET',
    isLoading?: boolean,
}

interface InterfaceReq<ST> {
    errorCode?: string, // 错误码
    errorMsg?: string, // 错误提示
    success: boolean, // 接口是否成功
    model: ST
}

export function GET<ST>(options: InterfaceGET): Promise<ST> {
    if (typeof options != 'object') return;
    return new Promise((resolve, reject) => {
        const defaultOptions = {
            url: G.BASE_URL() + options.url,
            type: 'GET',
            data: options.data,
            success: function (data: InterfaceReq<ST>) {
                G.removeWaitDom();
                if (typeof (data) == 'string') {
                    data = JSON.parse(data);
                }
                if (!data.success) {
                    if (data.errorMsg) {
                        G.toast.show(data.errorMsg);
                    } else {
                        G.toast.show('服务器开小差啦. 请稍候再试试.');
                    }
                    reject(data);
                    return;
                }
                resolve(data.model);
            },
            error: function (data: any) {
                G.removeWaitDom();
                reject(data);
            },
        };
        if (options.isLoading) G.addWaitDom();
        $.ajax(defaultOptions);
    });
}

interface InterfacePOST extends JQuery.AjaxSettings {
    url: string,
    type?: 'POST',
    isLoading?: boolean,
    contentType?: 'application/json;charset=UTF-8' | 'application/x-www-form-urlencoded'
}

// POST
export function POST<ST>(options: InterfacePOST) {
    if (typeof options != 'object') return;
    return new Promise((resolve, reject) => {
        const defaultOptions = {
            url: G.BASE_URL() + options.url,
            type: 'POST',
            data: options.data ? JSON.stringify(options.data) : '',
            contentType: options.contentType || 'application/json;charset=UTF-8',
            success: function (data: InterfaceReq<ST>) {
                G.removeWaitDom();
                if (typeof (data) == 'string') {
                    data = JSON.parse(data);
                }
                if (!data.success) {
                    if (data.errorMsg) {
                        G.toast.show(data.errorMsg);
                    } else {
                        G.toast.show('服务器开小差啦. 请稍候再试试.');
                    }
                    reject(data);
                    return;
                }
                resolve(data.model);
            },
            error: function (data: any) {
                G.removeWaitDom();
                reject(data);
            },
        };
        if (options.isLoading) G.addWaitDom();
        $.ajax(defaultOptions);
    });
}

export default {};

