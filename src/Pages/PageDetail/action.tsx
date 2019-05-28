///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Constans from '../../Common/Constans';
//Components
//Modules
//Less
import './index.less';
//interface
import {
    ScheduleV1Detail,
    ScheduleV2User
} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
//Main
class Action extends React.Component<Props, State> {
    state: State = {
        detail: {
            subject: '',
            remark: '',
            startTime: '',
            endTime: '',
            priority: Constans.PRIORITY.NORMAL,
            isOpen: 'N',
            staffs: [],
            depts: [],
            status: 0,
            isOwner: 'N',
            noticeTime: '',
            keeperName: '',
            ownerName: '',
            ownerId: 0,
            keeperDept: '',
        }
    };
    constructor(props: Props) {
        super(props);
    }
    componentDidMount() {
        let pthis = this;
        this.fetchDetail();
    }
    fetchDetail() {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/detail/' + pthis.props.match.params.id,
            data: {
                userId: parseInt(pthis.props.match.params.leaderId) > 0 ? parseInt(pthis.props.match.params.leaderId) : null,
            },
            success: function (data: { data: ScheduleV1Detail }) {
                if (parseInt(pthis.props.match.params.leaderId) > 0) {
                    G.ajax({
                        url: '/oa/api/schedule/v2/user/' + pthis.props.match.params.leaderId,
                        cache: false,
                        success: function (data2: ScheduleV2User) {
                            if (data2.isKeeper) {
                                G.setTitle(data.data.ownerName + '领导的日程详情');
                            } else if (data.data.isOwner == 'Y') {
                                G.setTitle('我的日程详情');
                            } else {
                                G.setTitle(data.data.ownerName + '的日程详情');
                            }
                        }
                    });
                }
                else {
                    G.setTitle('日程详情');
                }

                pthis.setState({
                    detail: data.data,
                });
            }
        });
    }
    deleteDetail() {
        let pthis = this;
        G.confirm.show('确定删除吗?', [function () { }, function () {
            G.ajax({
                url: '/oa/api/schedule/v1/delete/' + pthis.props.match.params.id,
                type: 'POST',
                data: {},
                success: function (data: boolean) {
                    G.toast.show('删除成功');
                    history.go(-1);
                }
            });
        }]);
    }
    doneIt() {
        let pthis = this;
        G.confirm.show('确定完成了吗?', [function () { }, function () {
            G.ajax({
                url: '/oa/api/schedule/v1/done',
                type: 'POST',
                data: {
                    recordId: pthis.props.match.params.id,
                    userId: pthis.props.match.params.leaderId == '0' ? null : pthis.props.match.params.leaderId
                },
                success: function (data: boolean) {
                    G.toast.show('操作成功');
                    pthis.fetchDetail();
                    history.go(-1);
                }
            });
        }]);
    }
    delIt() {
        let pthis = this;
        G.confirm.show('确定删除吗?', [function () { }, function () {
            G.ajax({
                url: '/oa/api/schedule/v1/delete/' + pthis.props.match.params.id,
                type: 'POST',
                data: {},
                success: function (data: boolean) {
                    G.toast.show('操作成功');
                    history.go(-1);
                }
            });
        }]);
    }
}

export default Action;
