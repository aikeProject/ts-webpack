///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
import {
    SureCallBackMember,
    SureCallBackPhone,
    SureCallBackGroup,
    initListMember,
    initListGroup,
} from '../../../third/PageContacts/interface';
//Modules
//Less
import './index.less';
//interface
import {
    RelationListPublicUser,
    RelationListPublicUserUsers,
    DeptList
} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
import * as Constant from "../../Common/Constans";
//Main
class Action extends React.Component<Props, State> {
    refActionSheet: any;
    refPageContacts: any;
    data: Data = {
        buttonMap: {
        },
        depts: [],
        allCompanyDeptId: 0,
    };
    state: State = {
        list: [],
        fetchType: Constant.RelationType.ALL,
        isShowHwContacts: false
    };
    constructor(props: Props) {
        super(props);
        this.data.buttonMap[Constant.RelationType.ALL] = '筛选';
        this.data.buttonMap[Constant.RelationType.EACH] = '互相公开';
        this.data.buttonMap[Constant.RelationType.VIEW_ME] = '我向Ta公开';
        this.data.buttonMap[Constant.RelationType.VIEW_IT] = 'Ta向我公开';
        this.contactsHashChange = this.contactsHashChange.bind(this);
    }
    componentDidMount() {
        let pthis = this;
        G.setTitle('公开日程名单');
        G.fixFixed();
        pthis.fetchList();
        //获取公司的全公司部门,用来判断是不是选择了全公司
        (function () {
            G.ajax2({
                url: '/dept/list',
                data: { pageSize: 20 },
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
    fetchList() {
        let pthis = this;
        G.ajax({
            url: '/oa/api/schedule/v1/relation/listPublicUser',
            type: 'GET',
            data: {
                relationType: pthis.state.fetchType
            },
            async: false,
            success: function (data: RelationListPublicUser) {
                pthis.setState({
                    list: data.users || []
                });
                pthis.data.depts = data.depts || [];
            }
        });
    }
    showActionFetch() {
        let pthis = this;
        let actionsConnects: any = [];
        let l = [
            { id: Constant.RelationType.ALL, t: '全部' },
            { id: Constant.RelationType.EACH, t: '互相公开' },
            { id: Constant.RelationType.VIEW_ME, t: '我向Ta公开' },
            { id: Constant.RelationType.VIEW_IT, t: 'Ta向我公开' }
        ];
        $.each(l, function (idx, one) {
            actionsConnects.push({
                text: one.t, info: { color: '', id: one.id }, cb: (idx: number, text: string, info: any) => {
                    // console.log(idx, text, info);
                    pthis.setState({
                        fetchType: info.id
                    }, function () {
                        pthis.fetchList();
                    });
                }
            });
        });
        pthis.refActionSheet.show(actionsConnects, () => {
            // console.log('cancel');
        });
    }
    showChangeAction(userInfo: RelationListPublicUserUsers) {
        let pthis = this;
        let actionsConnects: any = [];
        let l = [];
        //Enum(我对他公开：1，我取消对他公开:2，我想看他:3，我不想看他:4)
        //相互关注 可以: 不向他公开 不看他日程/看他日程
        if (userInfo.userRelation.publicRelationType == Constant.RelationType.EACH) {
            l.push({ id: 2, t: '不向Ta公开' });
            if (userInfo.userRelation.isSeeHe == 'Y') {
                l.push({ id: 4, t: '不看Ta的日程' });
            } else {
                l.push({ id: 3, t: '看Ta的日程' });
            }
        }
        //我向Ta公开 可以: 我不向他公开 
        if (userInfo.userRelation.publicRelationType == Constant.RelationType.VIEW_ME) {
            l.push({ id: 2, t: '不向Ta公开' });
        }
        //Ta向我公开 可以: 我不向他公开  不看他日程/看他日程
        if (userInfo.userRelation.publicRelationType == Constant.RelationType.VIEW_IT) {
            l.push({ id: 1, t: '向Ta公开日程' });
            if (userInfo.userRelation.isSeeHe == 'Y') {
                l.push({ id: 4, t: '不看Ta的日程' });
            } else {
                l.push({ id: 3, t: '看Ta的日程' });
            }
        }
        $.each(l, function (idx, one) {
            actionsConnects.push({
                text: one.t, info: { color: '', id: one.id }, cb: (idx: number, text: string, info: any) => {
                    // console.log(idx, text, info);
                    let tFn = function () {
                        //  console.log( userInfo);
                        G.ajax({
                            url: '/oa/api/schedule/v1/relation/operate',
                            data: {
                                uId: userInfo.userId,
                                relationOperation: info.id
                            },
                            type: 'POST',
                            success: function (data: boolean) {
                                pthis.fetchList();
                            }
                        });
                    };
                    if (info.id == 2) {
                        G.confirm.show('Ta已把你加到关注名单<br/>确定不向Ta公开日程吗？', [function () { }, function () {
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
    //
    contactsHashChange() {
        let pthis = this;
        if (window.location.href.indexOf('--contacts') > -1) {
            let list: Array<initListMember | initListGroup> = [];
            (pthis.state.list || []).map(function (one, idx) {
                if (
                    one.publicUserType == Constant.ENUM_PUBLIC_USER_TYPE_FROM.FROM_USER
                    && (one.userRelation.publicRelationType == Constant.RelationType.EACH
                        || one.userRelation.publicRelationType == Constant.RelationType.VIEW_ME)
                )
                    list.push({
                        id: one.userId,
                        userName: one.userName,
                        mobile: '',
                        type: 'member'
                    });
            });
            this.data.depts.map((one) => {
                list.push({
                    deptName: one.deptName,
                    id: one.deptId,
                    type: 'group'
                });
            });
            this.refPageContacts.setInitList(list, false);
            this.setState({
                isShowHwContacts: true
            });
        } else {
            this.setState({
                isShowHwContacts: false
            });
        }
    }
    sureSelectHwMCallBack(tlist: Array<SureCallBackMember>, phoneList: Array<SureCallBackPhone>, groupList: Array<SureCallBackGroup>) {
        let pthis = this;
        // let list: Array<SureCallBackMember> = [];
        let uIds: Array<number> = [];
        let deptIds: Array<number> = [];
        $.each(tlist || [], function (idx: number, one: SureCallBackMember) {
            // list.push(one);
            uIds.push(one.id);
        });
        let isHasTopDept = false;
        $.each(groupList || [], function (idx: number, one: SureCallBackGroup) {
            // list.push(one);
            if (one.id == pthis.data.allCompanyDeptId) {
                isHasTopDept = true;
            }
            deptIds.push(one.id);
        });
        if (isHasTopDept) {
            return G.alert.show('不能选择全公司');
        }
        G.ajax({
            url: '/oa/api/schedule/v1/relation/share',
            type: 'POST',
            data: {
                uIds: uIds.toString(),
                deptIds: deptIds.toString()
            },
            success: function (data: boolean) {
                G.toast.show('已向Ta公开日程');
                pthis.fetchList();
            }
        });
        history.go(-1);
    }
    showContacts() {
        window.addEventListener('hashchange', this.contactsHashChange);
        window.location.href = window.location.href + '/--contacts';
    }
}

export default Action;
