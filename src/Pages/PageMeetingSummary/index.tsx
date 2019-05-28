///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import { Route, match } from 'react-router-dom';
import * as util from '../../Common/util';
const PageContacts = require('../../../third/PageContacts/index.js');
//Components
//Modules
//Less
import './index.less';
import '../../../third/PageContacts/index.less';
//interface
import {
} from '../../Interface/interface';

import {
    PageContactsInterface
} from '../../../third/PageContacts/interface';

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
        // pthis.state.status = 1;
        // pthis.state.remark = "123";
        return (
            <div className="_PageMeetingSummary">
                {((match: match<{}>) => {
                    return (
                        <>
                            <Route exact path={`${match.url}`} component={() => {
                                return (
                                    <>
                                        <div className="m30"></div>
                                        <div className="line_item top_1px_line">
                                            <div className="title fl">主题</div>
                                            <div className="content fl">{pthis.state.subject}</div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="content_box top_1px_line">
                                            <pre className={pthis.state.contentModel ? (pthis.state.isShowAll ? 'detail' : 'detail minH') : 'detail'}>
                                                {pthis.state.content}
                                            </pre>
                                            <div className={pthis.state.contentModel ? 'btn' : 'hide'} onClick={pthis.toggleContent.bind(pthis)}><span>{pthis.state.isShowAll ? '收起' : '查看更多'}</span><i className={pthis.state.isShowAll ? 'icon active' : 'icon'}></i></div>
                                        </div>
                                        <div className="m20 top_1px_line"></div>
                                        <div className="line_item top_1px_line">
                                            <div className="title fl">分派人</div>
                                            <div className="content fl">{pthis.state.ownerName}</div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="line_item top_1px_line half_line">
                                            <div className="title fl">分派时间</div>
                                            <div className="content fl">{pthis.state.creatTime || ''}</div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className={(pthis.state.status == 1 && !pthis.state.remark) || pthis.state.isOwner == 'N' ? 'hide' : 'm20 top_1px_line'}></div>
                                        <div className={(pthis.state.status == 1 && !pthis.state.remark) || pthis.state.isOwner == 'N' ? 'hide' : 'remark top_1px_line'}>
                                            <textarea placeholder="请输入留言备注" defaultValue={pthis.state.remark} onChange={pthis.handleChange.bind(pthis, 'remark')} readOnly={pthis.state.status == 1 ? true : false}></textarea>
                                        </div>
                                        <div className="m20 top_1px_line"></div>
                                        <div className="line_item top_1px_line" onClick={pthis.showContacts.bind(pthis)}>
                                            <div className="title fl black">通知人员</div>
                                            <div className={pthis.state.status == 1 || pthis.state.isOwner == 'N' ? 'hide' : 'jt fr'}>请选择</div>
                                            <div className="clear"></div>
                                        </div>
                                        {
                                            pthis.state.nameList.length > 0 ?
                                                <div className="texts top_1px_line">
                                                    {
                                                        pthis.state.nameList.map((one, idx) => {
                                                            return (<span key={idx}>{one.name + (idx < pthis.state.nameList.length - 1 ? ';' : '')}</span>);
                                                        })
                                                    }
                                                </div>
                                                : null
                                        }
                                        <div className="m20 top_1px_line"></div>
                                        <div className={pthis.state.status == 1 || pthis.state.isOwner == 'N' ? 'hide' : 'bottom_box top_1px_line'}>
                                            <div className="temp"></div>
                                            <div className="bottom_btn">
                                                <div className="btn" onClick={pthis.subData.bind(pthis)}>执行完成</div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }} />
                            <Route exact={true} path={`${match.url}/contacts`} component={() => {
                                return (
                                    <div className="aaaa">
                                        <div className="cover"></div>
                                        <PageContacts ref={(o: PageContactsInterface) => { pthis.refComponentContact = o; }} phoneNotExitAndAlarmCb={() => { return true; }} sureFn={this.sureSelectMCallBack.bind(this)} component={true} clearAll={true} onlyMember={true} noOther={1} />
                                    </div>
                                );
                            }} />
                        </>
                    );
                })(pthis.props.match)}
            </div>
        );
    }
}

export default Page;
