///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Contants from '../../Common/Constans';
//Components
const PageContacts = require('../../../third/PageContacts/index.js');
const ActionSheet = require('../../../third/ActionSheet/index.js');
//Modules
//Less
import './index.less';
//interface
import {
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
            <div className="_PageEditSchedule">
                <div className="ma30"></div>
                <div className="ipts_w top_1px_line">
                    {
                        pthis.state.leaderValue ?
                            <div className="ipt_line">
                                <label className="require">领导</label>
                                <input placeholder="请输入" readOnly={true} value={pthis.state.leaderValue} />
                            </div>
                            : null
                    }
                    <div className={"ipt_line" + (pthis.state.leaderValue ? " top_1px_line" : "")}>
                        <label className="require">主题</label>
                        <input placeholder="请输入" onChange={pthis.handleInput.bind(pthis, 'subject')} value={pthis.state.subject} />
                    </div>
                    <div className="ipt_line top_1px_line textarea_line">
                        <textarea className="textarea" onChange={pthis.handleInput.bind(pthis, 'descript')} value={pthis.state.descript} placeholder="请输入日程描述"></textarea>
                    </div>
                    <div className="split top_1px_line"></div>
                </div>
                <div className="ma20"></div>
                {/* <div className="ipts_w top_1px_line">
                    <div className="ipt_line top_1px_line" onClick={pthis.showCaledar.bind(pthis)}>
                        <label className="require">日期</label>
                        <span>{pthis.state.chooseDate.split('-')[0] + '年' + pthis.state.chooseDate.split('-')[1] + '月' + pthis.state.chooseDate.split('-')[2] + '日 周' + G.dayInWeek(pthis.state.chooseDate)}</span>
                    </div>
                    <div className="ipt_line top_1px_line">
                        <label>开始时间</label>
                        <input className="a" onClick={pthis.changeTime.bind(pthis, 'startTime')} value={pthis.state.startTime} placeholder="开始时间" readOnly={true} />
                        <input className="c" value="-" readOnly={true} />
                        <input className="b" onClick={pthis.changeTime.bind(pthis, 'endTime')} value={pthis.state.endTime} placeholder="结束时间" readOnly={true} />
                    </div>
                    <div className="split top_1px_line"></div>
                </div> */}
                <div className="spceil_timer top_1px_line bottom_1px_line">
                    <div className="timer fl" onClick={pthis.chooseTimer.bind(pthis, 'startTime')}>
                        <span>开始</span>
                        <span>{G.parseDate(G.fixDate(pthis.state.startTime).getTime(), 2)}</span>
                        <span>{pthis.state.startTime.substr(11, 5)}</span>
                    </div>
                    <div className="sp fl"></div>
                    <div className="timer fl" onClick={pthis.chooseTimer.bind(pthis, 'endTime')}>
                        <span>结束</span>
                        <span>{G.parseDate(G.fixDate(pthis.state.endTime).getTime(), 2)}</span>
                        <span>{pthis.state.endTime.substr(11, 5)}</span>
                    </div>
                </div>
                <div className="ma20"></div>
                <div className="ipts_w top_1px_line">
                    <div className="ipt_line top_1px_line">
                        <label>同步人员</label>
                        <i className="rdrop" onClick={pthis.showContacts.bind(pthis)}>请选择</i>
                    </div>
                    {
                        pthis.state.nameList.length > 0 ?
                            <div className="texts top_1px_line">
                                {
                                    pthis.state.nameList.map((one, idx) => {
                                        return (<span key={one.timestamp}>{one.name + (idx < pthis.state.nameList.length - 1 ? ';' : '')}</span>);
                                    })
                                }
                            </div>
                            : null
                    }
                    {
                        pthis.state.nameList.length > 0 ?
                            <div className="split top_1px_line"></div>
                            : null
                    }
                </div>
                {
                    pthis.state.nameList.length > 0 ?
                        <div className="title">
                            <span>添加后，该日程将同步到对方“我的日程”中</span>
                        </div>
                        : <div className="ma20 top_1px_line"></div>
                }
                <div className="ipts_w top_1px_line">
                    <div className="ipt_line top_1px_line">
                        <label>优先级</label>
                        <i onClick={pthis.changeLevel.bind(pthis, 'normal')} className={"sbtn" + (pthis.state.level == 'normal' ? " normal" : '')}><span>无</span></i>
                        <i onClick={pthis.changeLevel.bind(pthis, 'low')} className={"sbtn" + (pthis.state.level == 'low' ? " low" : '')}><span>低</span></i>
                        <i onClick={pthis.changeLevel.bind(pthis, 'high')} className={"sbtn" + (pthis.state.level == 'high' ? " high" : '')}><span>高</span></i>
                    </div>
                    <div className="ipt_line top_1px_line">
                        <label>公开日程</label>
                        <i className={"qbtn" + (pthis.state.isPublic ? '' : ' off')} onClick={pthis.togglePublic.bind(pthis)}></i>
                    </div>
                    <div className="split top_1px_line"></div>
                </div>
                <div className="title">
                    <span>开启后，对公开日程的同事可见</span>
                </div>
                <div className="ipts_w top_1px_line bottom_1px_line">
                    <div className="ipt_line" onClick={pthis.showNoticeTimer.bind(pthis)}>
                        <label>提醒时间</label>
                        {(() => {
                            let str: string[] = [];
                            for (let t in pthis.state.txTime) {
                                Contants.NOTICE_MAP[t] && str.push(Contants.NOTICE_MAP[t]);
                            }
                            return (
                                <i className={"rdrop" + (str.length ? ' clr' : '')} >{str.join(';') || '请选择'}</i>
                            );
                        })()}
                    </div>
                </div>
                <div className="ma20"></div>
                <div className="footer">
                    <div className="main btn_1">
                        <button onClick={pthis.subData.bind(pthis)}>
                            <span>保存</span>
                        </button>
                    </div>
                </div>
                {/* adsfasdf */}
                <div className="aaaa" style={{ display: (this.state.isShowContacts ? 'block' : 'none') }}>
                    <div className="cover"></div>
                    <PageContacts ref={(o: any) => { this.refPageContacts = o; }} phoneNotExitAndAlarmCb={() => { return true; }}
                        sureFn={this.sureSelectMCallBack.bind(this)}
                        component={true}
                        onlyMember={false}
                        clearAll={true}
                        noOther={1} />
                </div>
                <ActionSheet ref={(o: any) => { this.refActionSheet = o; }} />
            </div>
        );
    }
}

export default Page;
