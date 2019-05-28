///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Constant from '../../Common/Constans';
//Components
const ActionSheet = require('../../../third/ActionSheet/index.js');
import Footer from '../../Components/Footer/index';
import PullUpLoading from '../../Components/ComponentPullUpLoading';
//Modules
//Less
import './index.less';
//interface
import {} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
//Main
import Action from './action';

const dayjs = require('dayjs');

class Page extends Action {
    constructor(props: Props) {
        super(props);
    }

    /*
    * 日程
    * */
    renderSchedule() {
        const pthis = this;
        let isPartner = this.props.match.params.userId * 1 > 0 && this.props.match.params.userIsLeader == 0;
        return (
            <>
                <div className={pthis.state.showAllCalendar ? 'hide' : 'topTimeBox'}>
                    <div className="monthItem fl" onClick={pthis.showCompileTimeBox.bind(pthis, pthis.state.newDate)}>
                        <span>{pthis.state.newDate.getMonth() + 1}月</span>
                        <i><img src={require('./images/pickerDown.png')}/></i>
                    </div>
                    <div className="dayBox fl">
                        {
                            pthis.state.topTimeList.map(function (result, key) {
                                return (
                                    <div
                                        className={G.parseDate(pthis.state.newDate, 1) == result ? (G.dayInWeek(result) == "日" || G.dayInWeek(result) == "六" ? 'dayItem weekend active' : 'dayItem active') : (G.dayInWeek(result) == "日" || G.dayInWeek(result) == "六" ? 'dayItem weekend' : 'dayItem')}
                                        key={result} onClick={pthis.setNewTopTime.bind(pthis, result)}>
                                        <div
                                            className="day">{G.parseDate(new Date().getTime(), 1) == result ? '今天' : G.dayInWeek(result)}</div>
                                        <div className="date">{result.split("-")[2]}</div>
                                        <div
                                            className={pthis.state.calendarScheduleMap[result] ? 'icon' : 'hide'}></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="clear"></div>
                </div>
                <div className={pthis.state.showAllCalendar ? 'topCompileTimeBox showSlideMove' : 'hide'}>
                    <div className="leftCont fl">
                        <div className="month">{pthis.state.defaultDate.getMonth() + 1}月</div>
                        {
                            pthis.state.weekList.map(function (result, key) {
                                return (
                                    <div className="weekNum" key={result}>{result}周</div>
                                );
                            })
                        }
                    </div>
                    <div className="rightCont fl">
                        <div className="lineBox min">
                            <div className="dayItem weekend">日</div>
                            <div className="dayItem">一</div>
                            <div className="dayItem">二</div>
                            <div className="dayItem">三</div>
                            <div className="dayItem">四</div>
                            <div className="dayItem">五</div>
                            <div className="dayItem weekend">六</div>
                            <div className="clear"></div>
                        </div>
                        <div className="lineBox">
                            {
                                pthis.state.allTimeList.map(function (result, key) {
                                    return (
                                        <div
                                            className={result ? (G.parseDate(pthis.state.newDate, 1) == result ? (G.dayInWeek(result) == "日" || G.dayInWeek(result) == "六" ? 'dayItem weekend active' : 'dayItem active') : (G.dayInWeek(result) == "日" || G.dayInWeek(result) == "六" ? 'dayItem weekend' : 'dayItem')) : 'dayItem'}
                                            key={key}><span className={result ? '' : 'opacity'}
                                                onClick={pthis.setNewTopTime.bind(pthis, result)}>{result ? (result.split("-")[2]) : '0'}</span><i
                                                className={pthis.state.calendarScheduleMap[result] ? '' : 'hide'}></i></div>
                                    );
                                })
                            }
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="leftJT" onClick={pthis.prevMonth.bind(pthis)}></div>
                    <div className="rightJT" onClick={pthis.nextMonth.bind(pthis)}></div>
                    <div className="bottomJT" onClick={pthis.hideCompileTimeBox.bind(pthis)}></div>
                </div>
                {
                    pthis.state.staffBabyCard && pthis.props.match.params.userId == 0 ?
                        <div className="advertisement">
                            <div className="imgBox">
                                <div className="close" onClick={pthis.removeCard.bind(pthis)}></div>
                                <img src={pthis.state.staffBabyCard.imageUrl}
                                    alt={pthis.state.staffBabyCard.holidayName}/>
                            </div>
                        </div>
                        : null
                }
                {
                    pthis.state.renderTodoList.length > 0 ?
                        <div className="item_list">
                            {
                                pthis.state.renderTodoList.map(function (one, idx) {
                                    //是否显示可操作的方框 必须是自建日程 (如果是自己的应用  true) (如果是领导的 true)
                                    let isShowClickRect = false;
                                    if (one.type == Constant.SCHEDULE_TYPE.SELF) {
                                        if (pthis.props.match.params.userId * 1 == 0) {
                                            isShowClickRect = true;
                                        }
                                        if (pthis.props.match.params.userId * 1 > 0 && pthis.props.match.params.userIsLeader * 1) {
                                            isShowClickRect = true;
                                        }
                                    }
                                    //判断操作方框的状态
                                    let checkBoxType = one.level;
                                    // if (isShowClickRect) {
                                    //如果是自己的应用.判断是否是自建应用
                                    // if (pthis.props.match.params.userId * 1 == 0) {
                                    if (one.type != Constant.SCHEDULE_TYPE.SELF || !isShowClickRect) {
                                        checkBoxType = 'disable';
                                    }
                                    if (one.type == Constant.SCHEDULE_TYPE.SUMMARY) {
                                        checkBoxType = 'flag';
                                    }
                                    // }
                                    //如果是领导的应用,判断
                                    // }
                                    return (
                                        <div key={one.tempId}>
                                            <div className="ma20"></div>
                                            <div className="item top_1px_line">
                                                <div className="check_w"
                                                    onClick={one.type != Constant.SCHEDULE_TYPE.SELF || !isShowClickRect ? () => {
                                                    } : pthis.clickDoneIt.bind(pthis, one, idx)}>
                                                    <div className={"check " + checkBoxType}></div>
                                                </div>
                                                {/* 同事不可查看详情，晓双和测试的讨论结果 */}
                                                <div className="context" onClick={() => {
                                                    isPartner ? '' : window.location.href = one.url;
                                                }}>
                                                    {
                                                        one.time ?
                                                            <p className="time">{one.time}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.title ?
                                                            <p className={"title " + checkBoxType}>{one.title}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.descript && (typeof one.descript == 'string') ?
                                                            <p className="desc">{one.descript}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.descript && (typeof one.descript == 'object') ?
                                                            one.descript.map((one) => {
                                                                if (!one) {
                                                                    return null;
                                                                }
                                                                return (
                                                                    <p className="desc" key={one}>{one}</p>
                                                                );
                                                            })
                                                            : null
                                                    }
                                                </div>
                                                {
                                                    one.tip ?
                                                        <span className="tip">{one.tip}</span>
                                                        : null
                                                }
                                                <div className="clear"></div>
                                            </div>
                                            <div className="split top_1px_line"></div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        : null
                }
                {
                    pthis.state.renderDoneList.length > 0 ?
                        <div className="item_list">
                            <div className="sp_title">
                                <span>已完成</span>
                            </div>
                            {
                                pthis.state.renderDoneList.map(function (one, idx) {
                                    //是否显示可操作的方框 (如果是自己的应用  true) (如果是领导的 true)
                                    let isShowClickRect = false;
                                    if (one.type == Constant.SCHEDULE_TYPE.SELF) {
                                        if (pthis.props.match.params.userId * 1 == 0) {
                                            isShowClickRect = true;
                                        }
                                        if (pthis.props.match.params.userId * 1 > 0 && pthis.props.match.params.userIsLeader * 1) {
                                            isShowClickRect = true;
                                        }
                                    }
                                    let checkBoxType = 'done';
                                    if (one.type != Constant.SCHEDULE_TYPE.SELF || !isShowClickRect) {
                                        checkBoxType = 'disable';
                                    }
                                    if (one.type == Constant.SCHEDULE_TYPE.SUMMARY) {
                                        checkBoxType = 'flagDisable';
                                    }
                                    return (
                                        <div key={one.tempId}>
                                            {
                                                idx > 0 ? <div className="ma20"></div> : null
                                            }
                                            <div className="item top_1px_line">
                                                <div className="check_w"
                                                    onClick={one.type != Constant.SCHEDULE_TYPE.SELF || !isShowClickRect ? () => {
                                                    } : pthis.clickTodoIt.bind(pthis, one, idx)}>
                                                    <div className={"check " + checkBoxType}></div>
                                                </div>
                                                <div className="context" onClick={() => {
                                                    isPartner ? '' : window.location.href = one.url;
                                                }}>
                                                    {
                                                        one.time ?
                                                            <p className="time done">{one.time}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.title ?
                                                            <p className="title done">{one.title}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.descript && (typeof one.descript == 'string') ?
                                                            <p className="desc done">{one.descript}</p>
                                                            : null
                                                    }
                                                    {
                                                        one.descript && (typeof one.descript == 'object') ?
                                                            one.descript.map((one) => {
                                                                if (!one) {
                                                                    return null;
                                                                }
                                                                return (
                                                                    <p className="desc done" key={one}>{one}</p>
                                                                );
                                                            })
                                                            : null
                                                    }
                                                </div>
                                                {
                                                    one.tip ?
                                                        <span className="tip">{one.tip}</span>
                                                        : null
                                                }
                                                <div className="clear"></div>
                                            </div>
                                            <div className="split top_1px_line"></div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        : null
                }
                {
                    pthis.state.isLoad && pthis.state.renderDoneList.length == 0 && pthis.state.renderTodoList.length == 0 && pthis.props.match.params.userId == 0 ?
                        (() => {
                            let t = (new Date()).getDay();
                            let s = G.parseDate(new Date().getTime(), 2).substr(5) + ' 周' + ('日一二三四五六'.charAt(t));
                            if (this.props.match.params.chooseDate) {
                                t = G.fixDate(this.props.match.params.chooseDate).getDay();
                                s = G.parseDate(G.fixDate(this.props.match.params.chooseDate).getTime(), 2).substr(5) + ' 周' + ('日一二三四五六'.charAt(t));
                            }
                            return (
                                <>
                                    <div className="no_data_title top_1px_line">{s}</div>
                                    <div className="no_data top_1px_line bottom_1px_line">
                                        <img src={require('./images/0' + (t + 1) + '@2x.png')}/>
                                        <p className="t1">{pthis.data.nodataList[t]}</p>
                                        <p className="t2" onClick={() => {
                                            window.location.href = '#/editSchedule/0/0/' + G.parseDate(pthis.state.newDate.getTime(), 1);
                                        }}>创建日程</p>
                                    </div>
                                </>
                            );
                        })()
                        : null
                }
                {
                    pthis.state.isLoad && pthis.state.renderDoneList.length == 0 && pthis.state.renderTodoList.length == 0 && pthis.props.match.params.userId * 1 > 0 && pthis.props.match.params.userIsLeader == 0 ?
                        <div className="no_data2">
                            <img src={require('./images/no_data.png')}/>
                            <p className="t1">亲，今天暂无公开日程哦</p>
                            <p className="t2">谢谢你对我的关注</p>
                        </div>
                        : null
                }
                {
                    pthis.state.isLoad && pthis.state.renderDoneList.length == 0 && pthis.state.renderTodoList.length == 0 && pthis.props.match.params.userId * 1 > 0 && pthis.props.match.params.userIsLeader == 1 ?
                        <div className="no_data2">
                            <img src={require('./images/no_data.png')}/>
                            <p className="t1">亲，Leader今日暂无日程</p>
                        </div>
                        : null
                }
            </>
        );
    }

    /**
     * 任务
     * */
    renderTask() {
        const {
            isShowSelectFlag, curTask, taskListState,
            enabled, stop
        } = this.state;
        const {taskList} = this.data;
        return (
            <div className='task'>
                <div className='task-select-swapper'>
                    <div className='task-select bottom_1px_line' onClick={this.showTask}>
                        <div className='txt'>
                            <span style={{marginRight: '.1rem'}}>{taskList[curTask]}</span>
                            {
                                isShowSelectFlag ? <i className='icon icon-up'/> :
                                    <i className='icon icon-down'/>
                            }
                        </div>
                    </div>
                </div>
                {
                    (() => {
                        if ((taskListState || []).length !== 0) {
                            return (
                                <>
                                    <div className='task-list'>
                                        {
                                            taskListState.map((item, index) => {
                                                const priorityStyle = Constant.PRIORITY.NORMAL === item.priority ?
                                                    <i className='icon icon-grey-flag'/>
                                                    : Constant.PRIORITY.LOW === item.priority ?
                                                        <i className='icon icon-yellow-flag'/>
                                                        : Constant.PRIORITY.MIDDLE === item.priority ?
                                                            <i className='icon icon-yellow-flag'/>
                                                            : Constant.PRIORITY.HIGH === item.priority ?
                                                                <i className='icon icon-red-flag'/> :
                                                                <i className='icon icon-grey-flag'/>;
                                                switch (item.assignStatus.toString()) {
                                                // 未完成
                                                case '0':
                                                    return (
                                                        <div key={index} className='item bottom_1px_line'
                                                            onClick={this.gotoDetail.bind(this, item.recordId)}>
                                                            <div className='left'>
                                                                {priorityStyle}
                                                            </div>
                                                            <div className='center'>
                                                                <div
                                                                    className='title'>{item.endTime && dayjs(item.endTime).format('MM月DD日 ddd HH:mm')} 截止
                                                                </div>
                                                                <div className='con ellipsis'>{item.subject}</div>
                                                                <div
                                                                    className='title'>{item.assignTime && dayjs(item.assignTime).format('MM月DD日 ddd HH:mm')} {item.ownerUser} 分派
                                                                </div>
                                                                <div className='comment'>
                                                                    <i className='icon icon-comment'/>
                                                                    <span>{item.replyCnt}条留言</span>
                                                                </div>
                                                            </div>
                                                            <div className='right'>
                                                                <div className='status blur'>
                                                                    {
                                                                        item.finishCnt === 0
                                                                            ? '未完成' : item.finishCnt < item.executorCnt
                                                                                ? `已完成${item.finishCnt}/${item.executorCnt}` : '未完成'
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                    // 已完成
                                                case '10':
                                                    return (
                                                        <div key={index} className='item bottom_1px_line'
                                                            onClick={this.gotoDetail.bind(this, item.recordId)}>
                                                            <div className='left'>
                                                                {priorityStyle}
                                                            </div>
                                                            <div className='center'>
                                                                <div
                                                                    className='title'>{item.endTime && dayjs(item.endTime).format('MM月DD日 ddd HH:mm')} 截止
                                                                </div>
                                                                <div className='con ellipsis'>{item.subject}</div>
                                                                <div
                                                                    className='title'>{item.assignTime && dayjs(item.assignTime).format('MM月DD日 ddd HH:mm')} {item.ownerUser} 分派
                                                                </div>
                                                                <div className='comment'>
                                                                    <i className='icon icon-comment'/>
                                                                    <span>{item.replyCnt}条留言</span>
                                                                </div>
                                                            </div>
                                                            <div className='right'>
                                                                <div className='status grey'>已完成</div>
                                                            </div>
                                                        </div>
                                                    );
                                                    // 已逾期
                                                case '20':
                                                    return (
                                                        <div key={index} className='item bottom_1px_line'
                                                            onClick={this.gotoDetail.bind(this, item.recordId)}>
                                                            <div className='left'>
                                                                {priorityStyle}
                                                            </div>
                                                            <div className='center'>
                                                                <div
                                                                    className='title'>{item.endTime && dayjs(item.endTime).format('MM月DD日 ddd HH:mm')} 截止
                                                                </div>
                                                                <div className='con ellipsis'>{item.subject}</div>
                                                                <div
                                                                    className='title'>{item.assignTime && dayjs(item.assignTime).format('MM月DD日 ddd HH:mm')} {item.ownerUser} 分派
                                                                </div>
                                                                <div className='comment'>
                                                                    <i className='icon icon-comment'/>
                                                                    <span>{item.replyCnt}条留言</span>
                                                                </div>
                                                            </div>
                                                            <div className='right'>
                                                                <div className='status grey'>已逾期</div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </>
                            );
                        }
                        // 空页面
                        return (
                            <>
                                <div className='task-none'>
                                    <img src={require('../../images/task-none.png')} alt=""/>
                                    <div className='txt'>亲，暂时没有任务哦~</div>
                                </div>
                            </>
                        );
                    })()
                }
                {/* 任务分类查询列表 */}
                <div className='task-select-list' style={{display: isShowSelectFlag ? 'block' : 'none'}}>
                    <ul>
                        {
                            _.map(taskList, (item: string, key: string) => {
                                return (
                                    <li key={key} onClick={this.clickSelectTask(key)} className='item bottom_1px_line'>
                                        <span>{item}</span>
                                        {
                                            curTask === key ? <i className='icon icon-ok'/> : null
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <PullUpLoading enabled={enabled} stop={stop} txt={false} loadMore={this.getTaskList.bind(this)}/>
            </div>
        );
    }

    render() {
        let pthis = this;
        const {page, isShowAdd} = this.state;
        const {userId, userIsLeader} = this.props.match.params;
        const activeClassL = page === '0' ? ' active' : '';
        const activeClassR = page === '1' ? ' active' : '';
        return (
            <div className="_PageIndex">
                {(() => {
                    if (userId == 0) {
                        return (
                            <div className='tab_btns_wrapper'>
                                <div className="tab_btns">
                                    <div style={{height: '100%'}}>
                                        <div className={'one_btn' + activeClassL} onClick={this.navLinkClick('0')}>
                                            <span>日程</span>
                                        </div>
                                        <div className={'one_btn' + activeClassR} onClick={this.navLinkClick('1')}>
                                            <span>任务</span>
                                        </div>
                                    </div>
                                    <div className="top_1px_line" style={{position: 'relative'}}/>
                                </div>
                            </div>
                        );
                    }
                })()}
                {
                    page === '0' ? (this.renderSchedule()) : null
                }
                {
                    page === '1' ? (this.renderTask()) : null
                }
                {
                    (() => {
                        // 自己进
                        if (userId == 0 && !isShowAdd) {
                            return <div className='new_btn' onClick={this.showAdd}/>;
                        }
                        /* 如果是自己的领导. 有新增按钮 */
                        if (userId > 0 && (userIsLeader * 1)) {
                            return <div className='new_btn' onClick={this.clickAdd('schedule_2')}/>;
                        }
                    })()
                }
                {
                    pthis.props.match.params.userId == 0 ?
                        <Footer whichTab={0}/>
                        : null
                }
                {
                    pthis.props.match.params.userId > 0 && pthis.state.relationForOther ?
                        <div className="footer_1">
                            <div className="main top_1px_line">
                                <div
                                    className={"btn b_a" + (pthis.state.relationForOther.isTop == 'Y' ? '' : ' active')}
                                    onClick={pthis.actionTop.bind(pthis)}>
                                    <span>{pthis.state.relationForOther.isTop == 'Y' ? '取消置顶' : '置顶'}</span>
                                </div>
                                <div className="btn b_b" onClick={pthis.showActionPublic.bind(pthis)}>
                                    <span>
                                        {
                                            pthis.state.relationForOther.publicRelationType == Constant.RelationType.EACH ? '互相公开'
                                                : pthis.state.relationForOther.publicRelationType == Constant.RelationType.VIEW_ME ? '我对Ta公开'
                                                    : pthis.state.relationForOther.publicRelationType == Constant.RelationType.VIEW_IT ? 'Ta对我公开'
                                                        : ''
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div className='function-list' style={{display: isShowAdd ? 'block' : 'none'}}>
                    <ul className='function-item'>
                        <li onClick={this.clickAdd('task')}>
                            <span>任务</span>
                            <i className='icon icon-task add'/>
                        </li>
                        {/* 如果是自己 有新增按钮 */}
                        <li onClick={this.clickAdd('schedule_1')}>
                            <span>日程</span>
                            <i className='icon icon-schedule add'/>
                        </li>
                    </ul>
                </div>
                <ActionSheet ref={(o: any) => {
                    this.refActionSheet = o;
                }}/>
            </div>
        );
    }
}

export default Page;
