///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
//Modules
//Less
import './index.less';
//interface
import {
    ScheduleV1Detail
} from '../../Interface/interface';

import {
    SureCallBackMember,
    PageContactsInterface,
    initListMember,
    initListGroup,
    initListPhone
} from '../../../third/PageContacts/interface';

import {
    State,
    Props,
    Data,
    summaryDetail
} from './interface';
//Main
class Action extends React.Component<Props, State> {
    refComponentContact: PageContactsInterface;
    state: State = {
        nameList: [],
        remark: '',
        subject: '',
        ownerName: '',
        creatTime: '',
        status: 0,
        content: '',
        isShowAll: false,
        contentModel: false,
        isOwner: 'N'
    }
    data: Data = {
        subFlag: false
    }
    constructor(props: Props) {
        super(props);
    }
    componentDidMount() {
        let pthis = this;
        G.setTitle("任务分派");
        pthis.getDetail();
    }

    getDetail() {
        let pthis = this;
        var leaderId = parseInt(pthis.props.match.params.leaderId || '0') || '';
        G.ajax({
            url: '/oa/api/schedule/v1/detail/' + pthis.props.match.params.id + '?userId=' + leaderId,
            type: 'GET',
            cache: false,
            success: function (data: { data: ScheduleV1Detail }) {
                let details = data.data;
                let subject = details.subject || '';
                let ownerName = details.ownerName || '';
                let remark = details.remark || '';
                let notifyUsers = details.notifyUsers || [];
                let status = details.status || 0;
                let isOwner = details.isOwner || 'N';
                let creatTime = details.createTime || '';
                pthis.summaryDetail(details.thirdId);
                pthis.setState({
                    subject: subject,
                    ownerName: ownerName,
                    remark: remark,
                    nameList: notifyUsers,
                    status: status,
                    isOwner: isOwner,
                    creatTime: creatTime
                });
            }
        });
    }

    handleChange(type: string, e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        let newState: { [key: string]: any } = this.state;
        newState[type] = val;
    }

    showContacts() {
        let pthis = this;
        if (pthis.state.status == 1 || pthis.state.isOwner == 'N') {
            return false;
        }
        let users = this.state.nameList;
        let list: Array<initListMember | initListGroup | initListPhone> = [];
        $.each(users || [], function (idx, one) {
            list.push({
                userName: one.name,
                mobile: '',
                id: one.id,
                type: 'member'
            });
        });
        window.location.href = '#/meetingSummary/' + this.props.match.params.id + '/' + (this.props.match.params.leaderId || '0') + '/contacts';
        setTimeout(() => {
            pthis.refComponentContact.setInitList(list, false);
        }, 100);
    }

    summaryDetail(id: string) {
        let pthis = this;
        let postData = {
            summaryId: id
        };
        G.ajax2({
            url: '/summary/showSummary',
            type: 'GET',
            data: postData,
            success: function (data: summaryDetail) {
                pthis.setState({
                    content: data.content
                }, function () {
                    let preH = $("pre.detail").outerHeight();
                    let minH = 1.68 * fsz + 10;
                    if (preH > minH) {
                        pthis.setState({
                            contentModel: true,
                            isShowAll: false
                        });
                    }
                });
            }
        });
    }

    toggleContent() {
        this.setState({
            isShowAll: !this.state.isShowAll
        });
    }

    sureSelectMCallBack(data: Array<SureCallBackMember>): void {
        let dataList = data || [];
        let nameList: any = [];
        dataList.map(function (result, key) {
            let obj: any = {};
            obj.name = result.userName;
            obj.id = result.id;
            nameList.push(obj);
        });
        this.setState({
            nameList: nameList
        });
        history.go(-1);
    }

    subData() {
        let pthis = this;
        if (pthis.data.subFlag) {
            return;
        }
        let remark = pthis.state.remark.trim();
        let notifyUsers = pthis.state.nameList || [];
        let postData = {
            id: pthis.props.match.params.id,
            remark: remark,
            notifyUsers: notifyUsers,
            leaderId: this.props.match.params.leaderId == '0' ? null : this.props.match.params.leaderId
        };
        pthis.data.subFlag = true;
        G.ajax3({
            url: '/oa/api/schedule/v1/doneSummarySchedule',
            type: 'POST',
            data: postData,
            success: function (data: boolean) {
                pthis.data.subFlag = false;
                G.toast.show('操作成功');
                pthis.getDetail();
            },
            error: function () {
                pthis.data.subFlag = false;
            }
        });
    }
}

export default Action;
