///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
//Modules
//Less
import './index.less';
//interface
import {InterfaceDetail} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';

//Main
class Action extends React.Component<Props, State> {
    state: State = {
        fileList: [],
        imgBgShow: false,
        imgBgSrc: '',
        isMore: true,
        taskDetailHeight: null,
        detail: {},
        isShowSend: false
    };

    data: Data = {
        taskDetail: null,
        staffTypeCon: {
            0: '分派人',
            10: '执行人',
            20: '抄送人'
        },
        assignStatusCon: {
            0: '未完成',
            10: '已完成',
            20: '已逾期'
        }
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        let pthis = this;
        G.setTitle('任务详情');
        G.fixFixed();
        this.getDetail().then((k) => {
            this.setState({
                taskDetailHeight: $(this.data.taskDetail).height()
            });
        });
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

    /*
    * 任务详情
    * */
    async getDetail() {
        const {recordId} = this.props.match.params;
        try {
            const result = await util.GET<InterfaceDetail>
            ({url: '/oa/api/assignment/detail', data: {recordId}, isLoading: true});
            if (result) {
                const fileList: { attachmentKey?: string, attachmentUrl?: string }[] = [];
                (result.attachs || []).forEach((value, index, array) => {
                    fileList.push({
                        attachmentKey: value.downloadKey,
                        attachmentUrl: value.fileUrl
                    });
                });
                this.setState({
                    detail: result,
                    fileList: fileList
                });
            }
        } catch (e) {

        }
    }

    /*
    * 任务删除
    * */
    taskDel = () => {
        const {recordId} = this.props.match.params;
        util.POST({
            url: '/oa/api/assignment/delete',
            data: {
                recordId: recordId
            },
            isLoading: true
        }).then(() => {
            G.toast2.show('plugins/gz2.png', '删除成功', 2000, () => {
                history.back();
            });
        });
    };

    taskEdit = () => {
        const {recordId} = this.props.match.params;
        window.location.href = `#/task/${recordId}`;
    };

    /*
    * 任务留言
    * */
    taskReply = (replyCon: string) => {
        const {recordId} = this.props.match.params;
        util.POST({
            url: '/oa/api/assignment/reply',
            data: {
                recordId: recordId || '',
                content: replyCon || ''
            },
            isLoading: true
        }).then(() => {
            G.toast2.show('plugins/gz2.png', '留言成功', 2000, () => {
                this.getDetail();
            });
        });
    };

    showSend = () => {
        this.setState({
            isShowSend: true
        });
    };

    /*
    * 发送留言
    * */
    taskSendReply = (data: string) => {
        if (data.length > 500) G.toast.show('请输入正确留言，限制字数500');
        if (!!data && data.length < 500) {
            this.taskReply(data);
        }
        this.setState({
            isShowSend: false
        });
    };

    /*
    * 任务完成
    * */
    taskDone = () => {
        const {recordId} = this.props.match.params;
        util.POST({
            url: '/oa/api/assignment/done',
            data: {
                recordId: recordId || ''
            },
            isLoading: true
        }).then(() => {
            G.toast2.show('plugins/gz2.png', '任务完成', 2000, () => {
                this.getDetail();
            });
        });
    };

    /*
    * 删除留言
    * */
    leavingDel = (id: string) => {
        return () => {
            util.POST({
                url: '/oa/api/assignment/reply/delete',
                data: {
                    replyId: id
                },
                isLoading: true
            }).then(() => {
                G.toast2.show('plugins/gz2.png', '删除成功', 2000, () => {
                    this.getDetail();
                });
            });
        };
    }
}

export default Action;
