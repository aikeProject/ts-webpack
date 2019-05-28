///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Contants from '../../Common/Constans';
//Components
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
        let stTime = '';
        let etTime = '';
        if (pthis.state.detail.startTime) {
            let t = G.fixDate(pthis.state.detail.startTime);
            stTime = G.parseDate(t, 2).substr(5) + ' ' + G.parseDate(t).substr(11, 5);
        }
        if (pthis.state.detail.endTime) {
            let t = G.fixDate(pthis.state.detail.endTime);
            etTime = G.parseDate(t, 2).substr(5) + ' ' + G.parseDate(t).substr(11, 5);
        }
        if (stTime.substr(0, 6) == etTime.substr(0, 6)) {
            etTime = etTime.substr(7);
        }
        return (
            <div className="_PageDetail">
                <div className="ma30"></div>
                <div className="ipts_w top_1px_line">
                    <div className="ipt_line">
                        <label>时间</label>
                        <span>{stTime} - {etTime}</span>
                    </div>
                    <div className="ipt_line top_1px_line">
                        <label>标题</label>
                        <span>{pthis.state.detail.subject}</span>
                    </div>
                    {
                        pthis.state.detail.remark ?
                            <div className="ipt_line top_1px_line">
                                <label>描述</label>
                                <span>{pthis.state.detail.remark}</span>
                            </div>
                            : null
                    }
                    <div className="split top_1px_line"></div>
                </div>
                <div className="ma20"></div>
                {
                    pthis.state.detail.depts.length || pthis.state.detail.staffs.length ?
                        <div>
                            <div className="ipts_w top_1px_line">
                                <div className="ipt_line top_1px_line">
                                    <label>同步人员</label>
                                    <span>{_.pluck(pthis.state.detail.depts, 'deptName').join('; ') + (pthis.state.detail.staffs.length && pthis.state.detail.depts.length ? '; ' : '') + _.pluck(pthis.state.detail.staffs, 'userName').join('; ')}</span>
                                </div>
                                <div className="split top_1px_line"></div>
                            </div>
                            <div className="ma20"></div>
                        </div>
                        : null
                }
                <div className="ipts_w top_1px_line">
                    <div className="ipt_line">
                        <label>优先级</label>
                        <span>
                            {
                                pthis.state.detail.priority == Contants.PRIORITY.NORMAL ? '无' :
                                    pthis.state.detail.priority == Contants.PRIORITY.LOW ? '低' :
                                        pthis.state.detail.priority == Contants.PRIORITY.MIDDLE ? '中' :
                                            pthis.state.detail.priority == Contants.PRIORITY.HIGH ? '高' :
                                                '其他'
                            }
                        </span>
                    </div>
                    <div className="ipt_line top_1px_line">
                        <label>是否公开</label>
                        <span>{pthis.state.detail.isOpen == 'Y' ? '' : '不'}公开</span>
                    </div>
                    {
                        (pthis.state.detail.noticeTime || '').length > 0 ?
                            <div className="ipt_line top_1px_line">
                                <label>提醒时间</label>
                                <span>
                                    {(() => {
                                        let str: string[] = [];
                                        let t: string[] = pthis.state.detail.noticeTime.split(',');
                                        for (let i = 0; i < t.length; i++) {
                                            Contants.NOTICE_MAP[t[i]] && str.push(Contants.NOTICE_MAP[t[i]]);
                                        }
                                        return (
                                            <span className={"rdrop" + (str.length ? ' clr' : '')} >{str.join(';') || '请选择'}</span>
                                        );
                                    })()}
                                </span>
                            </div>
                            : null
                    }
                    <div className="split top_1px_line"></div>
                </div>
                <div className="ma20"></div>
                {
                    pthis.state.detail.keeperName ?
                        <div className="ipts_w top_1px_line bottom_1px_line">
                            <div className="ipt_line">
                                <label>最近编辑</label>
                                <span>{pthis.state.detail.keeperName + (pthis.state.detail.keeperDept ? '-' + pthis.state.detail.keeperDept : '')}</span>
                            </div>
                        </div>
                        : null
                }
                {
                    (pthis.state.detail.status == 0 && pthis.state.detail.isOwner == 'Y') ?
                        <div className="footer">
                            <div className="main btn_3">
                                <button onClick={pthis.delIt.bind(pthis)}>
                                    <span>删除</span>
                                </button>
                                {/* 如果当前参数没传leardId。在编辑的时候不穿leaderid */}
                                <button onClick={() => { window.location.replace('#/editSchedule/' + pthis.props.match.params.id + '/' + this.props.match.params.leaderId); }}>
                                    <span>编辑</span>
                                </button>
                                <button className="deep" onClick={pthis.doneIt.bind(pthis)}>
                                    <span>完成</span>
                                </button>
                            </div>
                        </div>
                        : (<div className='task-btn-wrapper'>
                            <div onClick={pthis.delIt.bind(pthis)} className='task-btn bottom-iphonex top_1px_line'>
                                <div className='btn-message'>删除</div>
                            </div>
                        </div>)
                }
            </div >
        );
    }
}

export default Page;
