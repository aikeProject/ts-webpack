///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Contants from '../../Common/Constans';

const dayjs = require('dayjs');
//Components
//Modules
//Less
import './index.less';
//interface
import {InterfaceCreate, InterfaceDetail} from '../../Interface/interface';

import {
    State, Props, Data,
    Dept, Member, NameNode
} from './interface';
import {
    initListGroup,
    initListMember,
    SureCallBackGroup,
    SureCallBackMember,
    SureCallBackPhone
} from "../../../third/PageContacts/interface";

//Main
class Action extends React.Component<Props, State> {
    state: State = {
        // 任务
        subject: '',
        // 任务描述
        remark: '',
        // 文件列表
        fileList: [],
        // 执行人
        nameList: [],
        // 图片预览
        imgBgShow: false,
        imgBgSrc: '',
        // 优先级
        level: 'normal',
        // 抄送人员
        copyList: [],
        // 截止时间
        stopDate: "",
        txTime: {},
        isShowContacts: false,
        isVIP: false
    };
    data: Data = {
        refPageContacts: null,
        v_time: null,
        txMap: Contants.NOTICE_MAP,
        // 执行人
        userListExecutor: [],
        // 抄送人
        userListCopy: [],
        // 选人类型 0执行人 1抄送人
        isSelectType: 0,
        subjectInput: null
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const {recordId} = this.props.match.params;
        let pthis = this;
        G.setTitle(recordId ? '编辑任务' : '新建任务');
        G.fixFixed();
        // 编辑任务
        if (recordId) {
            this.getDetail();
        }
        // vip
        this.isVIP();
    }

    componentWillUnmount(): void {
        window.removeEventListener('hashchange', this.contactsHashChange);
    }

    handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        if (key == 'subject') {
            let val = e.target.innerText;
            this.setState({
                subject: $.trim(val)
            });
        }
        // remark
        if (key == 'remark') {
            this.setState({
                remark: val
            });
        }
    }

    /**
     * 上传文件
     */
    async uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
        let _this = this;
        const {fileList} = _this.state;
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            G.toast.show('单个文件最大10M');
            e.target.value = '';
            return;
        }
        try {
            G.addWaitDom();
            const result: { downloadKey?: string, fileUrl?: string } = await util.upload({
                uploadFileType: '131172',
                // uploadFileType: '128',
                url: '/file/uploadCommonFile',
                file: file,
            });
            G.removeWaitDom();
            if (result) {
                if (!result.downloadKey || !result.fileUrl) {
                    G.toast.show('服务器繁忙，请稍后再试');
                    return;
                }
                fileList.push({
                    downloadKey: result.downloadKey,
                    fileUrl: result.fileUrl
                });
                this.setState({
                    fileList: fileList
                });
            }
        } catch (e) {
            G.removeWaitDom();
        }
    }

    /**
     * 图片放大
     */
    bigImg = (src: string) => {
        return () => {
            this.setState({
                imgBgShow: true,
                imgBgSrc: src
            });
        };
    };

    /**
     * 删除文件
     */
    deleteFile = (key: number) => {
        return () => {
            const {fileList} = this.state;
            fileList.splice(key, 1);
            this.setState({
                fileList: fileList
            });
        };
    }

    /*
    * 优先级
    * */
    changeLevel = (levelStr: string) => {
        return () => {
            this.setState({
                level: levelStr
            });
        };
    };

    /*
    * 选人组件
    * */
    showContacts = (type: number) => {
        return () => {
            setTimeout(() => {
                $(document).scrollTop(1);
            }, 200);
            this.data.isSelectType = type;
            window.addEventListener('hashchange', this.contactsHashChange);
            window.location.href = window.location.href + '/--contacts';
        };
    };

    /* 选人组件 */
    sureSelectMCallBack(tlist: Array<SureCallBackMember>, phoneList: Array<SureCallBackPhone>, groupList: Array<SureCallBackGroup>) {
        let pthis = this;
        let timestamp = new Date().getTime();
        let userList: Array<Member> = [];
        let nameList: Array<NameNode> = [];
        const {isSelectType} = this.data;
        $.each(tlist || [], function (idx: number, one: SureCallBackMember) {
            userList.push({
                userName: one.userName,
                id: one.id,
                timestamp: timestamp + idx
            });
        });
        // 执行人
        if (isSelectType === 0) {
            pthis.data.userListExecutor = userList;
        }
        // 抄送人
        if (isSelectType === 1) {
            pthis.data.userListCopy = userList;
        }
        $.each(userList || [], function (idx: number, one: Member) {
            nameList.push({
                name: one.userName,
                timestamp: one.timestamp,
                memberNode: one
            });
        });
        nameList = _.sortBy(nameList, function (item: NameNode) {
            return item.timestamp;
        });

        // 执行人
        if (isSelectType === 0) {
            pthis.setState({
                nameList: nameList
            });
        }
        // 抄送人
        if (isSelectType === 1) {
            pthis.setState({
                copyList: nameList
            });
        }
        history.go(-1);
    }

    /**
     * 选人回显
     */
    contactsHashChange = () => {
        let pthis = this;
        const {isSelectType} = this.data;
        //回显
        if (window.location.href.indexOf('--contacts') > -1) {
            let list: Array<initListMember | initListGroup> = [];
            if (isSelectType === 0) {
                (pthis.data.userListExecutor || []).map(function (one, idx) {
                    list.push({
                        id: one.id,
                        userName: one.userName,
                        mobile: '',
                        type: 'member'
                    });
                });
            }
            if (isSelectType === 1) {
                (pthis.data.userListCopy || []).map(function (one, idx) {
                    list.push({
                        id: one.id,
                        userName: one.userName,
                        mobile: '',
                        type: 'member'
                    });
                });
            }
            this.data.refPageContacts.setInitList(list, false);
            this.setState({
                isShowContacts: true
            });
        } else {
            this.setState({
                isShowContacts: false
            });
        }
    }

    /**
     * 时间选择
     */
    showTimeActions() {
        const {v_time} = this.data;
        let pthis = this;
        let divs = [];
        let st = 0;
        let et = 11 + 12;
        for (let i = st; i <= et; i++) {
            let ti = (i < 10 ? "0" : "") + i;
            divs.push('<div data-value="' + ti + '">' + ti + "</div>");
        }
        let divs2 = [];
        for (let i = 0; i <= 55; i += 15) {
            let ti = (i < 10 ? "0" : "") + i;
            divs2.push('<div data-value="' + ti + '">' + ti + "</div>");
        }
        let stime = v_time.value;
        let n1 = 0;
        let n2 = 0;
        let type = 1;
        if (type == 1 && stime != "") {
            let stimeA: any = stime.substr(9, 5).split(":");
            n1 = stimeA[0] * 1 - st;
            n2 = stimeA[1] / 5;
        } else {
            if (stime == "") {
                let nowtime = G.parseDate(new Date().getTime());
                let nowtimeA = nowtime.split(" ")[1].split(":");
                n1 = nowtimeA[0] * 1 - st;
                n2 = Math.ceil((nowtimeA[1] * 1.0) / 5);
            } else {
                let stimeA: any = stime.split(":");
                n1 = stimeA[0] * 1 - st + 1;
                n2 = stimeA[1] / 5;
            }
        }
        //日历.从今天到之后90天.
        let divsll = [];
        let n0 = 0;
        let nowDate = new Date().getTime();
        let stval = v_time.value;
        if (stval) {
            stval = stval.substr(0, 5);
        }
        for (let i = 0; i < 31; i++) {
            let t = G.parseDate(nowDate + (i * 24 * 3600 * 1000), 1);
            let td = t.substr(5, 5);
            if (stval == td) {
                n0 = i;
            }
            let week = G.dayInWeek(t);
            divsll.push(
                '<div data-value="' + t + '">' + td + " 周" + week + "</div>"
            );
        }

        G.selectYHS.show(divsll, divs, divs2, n0, n1, n2);
        G.selectYHS.sureCallBack = function (v0: any, t0: any, v1: any, t1: any, v2: any, t2: any, n0: any, n1: any, n2: any) {
            if (G.fixDate(t0 + " " + t1 + ":" + t2 + ":00") * 1 <= new Date().getTime()) {
                G.toast.show("截止时间不能为过去时间");
                return false;
            }

            // 2019-04-03 12：45
            // stopDate.value = t0 + " " + t1 + ":" + t2;
            // 此时间用来传给后台
            pthis.setState({
                stopDate: t0 + " " + t1 + ":" + t2 + ':00'
            });
            // 03月26日 周二 16:16
            v_time.value = v0 + " " + t1 + ":" + t2;
        };
        G.selectYHS.scrollCallBack = [
            function () {
            },
            function (v1: any, t1: any, n1: any) {
                let divs2 = [];
                for (let i = 0; i <= 55; i += 15) {
                    let ti = (i < 10 ? "0" : "") + i;
                    divs2.push('<div data-value="' + ti + '">' + ti + "</div>");
                }
                G.selectYHS.showr(divs2, 1);
            },
            function () {
            }
        ];
    }

    /*
    * 提醒时间选择
    * */
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
    }

    /**
     * 新增 or 编辑 任务
     */
    addOrEditTask = () => {
        const {recordId} = this.props.match.params;
        const {subject, remark, level, stopDate, fileList} = this.state;
        const {userListExecutor, userListCopy} = this.data;
        if (!subject || subject.length > 150) {
            G.toast.show('请输入正确任务主题，限制字数150字');
            return;
        }
        if (!!remark && remark.length > 500) {
            G.toast.show('请输入正确任务主题，限制字数500字');
            return;
        }
        // 执行人
        if ((userListExecutor || []).length === 0) {
            G.toast.show('请选择执行人');
            return;
        }
        if (!stopDate) {
            G.toast.show('请选择结束时间');
            return;
        }
        const reqData: InterfaceCreate = {
            subject: subject,
            remark: remark,
            priority: level === 'normal' ? 0 : level === 'low' ? 10 : level === 'high' ? 30 : 0,
            endTime: stopDate,
            executors: _.pluck((userListExecutor || []), 'id').join(','),
            ccUsers: _.pluck((userListCopy || []), 'id').join(','),
            attachKeys: _.pluck((fileList || []), 'downloadKey').join(',')
        };
        // 编辑
        if (recordId) {
            reqData.recordId = recordId;
            util.POST({
                url: '/oa/api/assignment/data/edit',
                data: reqData,
                isLoading: true
            }).then(() => {
                G.toast2.show('plugins/gz2.png', '修改成功', 2000, function () {
                    window.location.href = `#/index/0/0/${G.parseDate(new Date())}/1`;
                });
            });
            return;
        }
        // 新增
        util.POST({
            url: '/oa/api/assignment/data/create',
            data: reqData,
            isLoading: true
        }).then(() => {
            G.toast2.show('plugins/gz2.png', '保存成功', 2000, function () {
                window.location.href = `#/index/0/0/${G.parseDate(new Date())}/1`;
            });
        });

    };

    /*
    * 任务详情
    * */
    async getDetail() {
        const {recordId} = this.props.match.params;
        const {v_time} = this.data;
        try {
            const result = await util.GET<InterfaceDetail>
            ({url: '/oa/api/assignment/detail', data: {recordId}, isLoading: true});
            if (result) {
                const fileList: { downloadKey?: string, fileUrl?: string }[] = [];
                let timestamp = new Date().getTime();
                const nameList: Array<NameNode> = [];
                const copyList: Array<NameNode> = [];
                const userListExecutor: Array<Member> = [];
                const userListCopy: Array<Member> = [];
                (result.attachs || []).forEach((value) => {
                    fileList.push({
                        downloadKey: value.downloadKey,
                        fileUrl: value.fileUrl
                    });
                });
                (result.executors || []).forEach((value, index) => {
                    nameList.push({
                        name: value.userName,
                        timestamp: timestamp + index,
                    });
                    userListExecutor.push({
                        userName: value.userName,
                        id: value.uid,
                        timestamp: timestamp + index
                    });
                });
                this.data.userListExecutor = userListExecutor;
                (result.ccUsers || []).forEach((value, index) => {
                    copyList.push({
                        name: value.userName,
                        timestamp: timestamp + index,
                    });
                    userListCopy.push({
                        userName: value.userName,
                        id: value.uid,
                        timestamp: timestamp + index
                    });
                });
                this.data.userListCopy = userListCopy;
                this.data.subjectInput.innerText = result.subject;
                this.setState({
                    subject: result.subject,
                    remark: result.remark,
                    nameList: nameList,
                    copyList: copyList,
                    stopDate: result.endTime && G.parseDate(result.endTime),
                    fileList: fileList,
                    level: Contants.PRIORITY.NORMAL === result.priority ? 'normal'
                        : Contants.PRIORITY.LOW === result.priority ? 'low'
                            : Contants.PRIORITY.MIDDLE === result.priority ? 'middle'
                                : Contants.PRIORITY.HIGH === result.priority ? 'high' : 'normal'
                }, () => {
                    v_time.value = dayjs(result.endTime).format('MM-DD ddd HH:mm');
                });
            }
        } catch (e) {

        }
    }

    isVIP() {
        util.POST<{ isVip: boolean }>({
            url: '/api/vip/service/isVip',
            data: {
                appCode: ''
            }
        }).then((data: { isVip: boolean }) => {
            this.setState({
                isVIP: data.isVip
            });
        });
    }
}

export default Action;
