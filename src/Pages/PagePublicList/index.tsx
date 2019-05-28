///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
const ActionSheet = require('../../../third/ActionSheet/index.js');
const PageContacts = require('../../../third/PageContacts/index.js');
//Modules
//Less
import './index.less';
//interface
import {
    RelationListPublicUser,
    RelationListPublicUserUsers
} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
//Main
import Action from './action';
class Page extends Action {
    constructor(props: Props) {
        super(props);
    }
    render() {
        let pthis = this;
        return (
            <div className="_PagePublicList">
                <div className="tools">
                    <div className={"main" + (pthis.state.list.length == 0 ? '' : ' bottom_1px_line')}>
                        <span className="add" onClick={pthis.showContacts.bind(pthis)}>添加公开对象</span>
                        <span className="select" onClick={pthis.showActionFetch.bind(pthis)}>{pthis.data.buttonMap[pthis.state.fetchType]}</span>
                    </div>
                </div>
                <div className="list">
                    {
                        pthis.state.list.map(function (one: RelationListPublicUserUsers, idx: number) {
                            return (
                                <div className={"item" + (idx > 0 ? ' top_1px_line' : '')} key={one.userId}>
                                    <img className="head" src={G.fixAvatar(one.avatar)} />
                                    <p>
                                        <span className="name">{one.userName}</span>
                                        <span className="desc">{one.deptName}</span>
                                    </p>
                                    <button onClick={pthis.showChangeAction.bind(pthis, one)}>{pthis.data.buttonMap[one.userRelation.publicRelationType]}</button>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    pthis.state.list.length == 0 ?
                        <div className="no_data">
                            <img src={require('./images/no_list.png')} />
                            <p className="t1">点击“添加公开对象”</p>
                            <p className="t2">把你公开日程分享给合作伙伴</p>
                        </div>
                        : null
                }
                <ActionSheet ref={(o: any) => { this.refActionSheet = o; }} />
                <div className="aaaa" style={{ display: (this.state.isShowHwContacts ? 'block' : 'none') }}>
                    <div className="cover"></div>
                    <PageContacts ref={(o: any) => { this.refPageContacts = o; }} phoneNotExitAndAlarmCb={() => { return true; }}
                        sureFn={this.sureSelectHwMCallBack.bind(this)}
                        component={true}
                        onlyMember={false}
                        clearAll={true}
                        noOther={1} />
                </div>
            </div>
        );
    }
}

export default Page;
