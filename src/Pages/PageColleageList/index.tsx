///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import * as Constant from '../../Common/Constans';
//Components
const ActionSheet = require('../../../third/ActionSheet/index.js');
import Footer from '../../Components/Footer/index';
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

class Page extends Action {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let pthis = this;
        const {page, isKeeper, datas} = this.state;
        const activeClassL = page === '0' ? ' active' : '';
        const activeClassR = page === '1' ? ' active' : '';
        const isKeeperShow = (isKeeper === 'Y') ? true : false;
        return (
            <div className="_PageColleageList">
                {/* 只有在领导和同事同事存在才显示 tab */}
                {
                    isKeeperShow ? (
                        <div className='tab_btns_wrapper'>
                            <div className="tab_btns">
                                <div style={{height: '100%'}}>
                                    <div className={'one_btn' + activeClassL} onClick={this.navLinkClick('0')}>
                                        <span>领导的</span>
                                    </div>
                                    <div className={'one_btn' + activeClassR} onClick={this.navLinkClick('1')}>
                                        <span>同事的</span>
                                    </div>
                                </div>
                                <div className="top_1px_line" style={{position: 'relative'}}/>
                            </div>
                        </div>
                    ) : null
                }
                {
                    !isKeeperShow && this.state.datas.leaders.length == 0 && pthis.state.datas.partners.length == 0 && pthis.state.isLoad ?
                        <div className="no_data">
                            <img src={require('./images/no_list.png')}/>
                            <p className="t1">暂无领导/同事公开日程</p>
                            <p className="t2">你可以先向Ta公开日程哦！</p>
                        </div>
                        : null
                }
                {
                    isKeeperShow && page === '0' && this.state.datas.leaders.length == 0 && pthis.state.isLoad ?
                        <div className="no_data">
                            <img src={require('./images/no_list.png')}/>
                            <p className="t1">暂无领导公开日程</p>
                            <p className="t2">你可以先向Ta公开日程哦！</p>
                        </div>
                        : null
                }
                {
                    isKeeperShow && page === '1' && pthis.state.datas.partners.length == 0 && pthis.state.isLoad ?
                        <div className="no_data">
                            <img src={require('./images/no_list.png')}/>
                            <p className="t1">暂无同事公开日程</p>
                            <p className="t2">你可以先向Ta公开日程哦！</p>
                        </div>
                        : null
                }
                <div className="all_people">
                    {
                        page === '0' || !isKeeperShow ? this.state.datas.leaders.map((one, idx) => {
                            return (
                                <div key={one.userId} className="one top_1px_line">
                                    <div className="title bottom_1px_line"
                                        onClick={this.showColleageIndex.bind(this, one.userId, true)}>
                                        <img className="avatar" src={G.fixAvatar(one.avatar)}/>
                                        <p className="desc">
                                            <span className="a">{one.userName}</span>
                                            {one.deptName}
                                        </p>
                                        <img className="top_btn" src={require('./images/leader_top_y.png')}/>
                                    </div>
                                    <ul>
                                        {
                                            (this.changeSchedule(one.schedules || [], false, one.userId)).map((tone, idx) => {
                                                let isShowAll = this.state.showMoreMap[one.userId];
                                                //如果没有点击全部显示,那么最多显示两个
                                                if (!this.state.showMoreMap[one.userId]) {
                                                    //做多显示两个
                                                    if (idx > 1) {
                                                        return null;
                                                    }
                                                }
                                                let isShowLastBottomLine = true;
                                                //判断是否显示底部横线
                                                //如果小于等于2条数据。不显示
                                                if ((one.schedules || []).length <= 2) {
                                                    if (idx == 1) {
                                                        isShowLastBottomLine = false;
                                                    }
                                                }
                                                //else 如果点击了其他都显示，最后一个不显示
                                                else {
                                                    if (isShowAll) {
                                                        if ((one.schedules || []).length - 1 == idx) {
                                                            isShowLastBottomLine = false;
                                                        }
                                                    } else {
                                                        //如果没显示其他的，第二个不显示
                                                        if (idx == 1) {
                                                            isShowLastBottomLine = false;
                                                        }
                                                    }
                                                }

                                                return (
                                                    <li className={"item" + (isShowLastBottomLine ? ' bottom_1px_line' : '')}
                                                        key={tone.refId} onClick={() => {
                                                            window.location.href = tone.url;
                                                        }}>
                                                        <p className="a">{tone.time}</p>
                                                        <p className="b">{tone.title}</p>
                                                        <p className="c">{tone.descript}</p>
                                                    </li>

                                                );
                                            })
                                        }
                                        {/*如果条数大于2条,并且没有点击过显示更多,则显示这个提示 */}
                                        {
                                            (one.schedules || []).length > 2 && !this.state.showMoreMap[one.userId] ?
                                                <li className="more top_1px_line bottom_1px_line"
                                                    onClick={this.showMore.bind(this, one.userId)}>
                                                    <span>其他{one.schedules.length - 2}个日程</span>
                                                    <i></i>
                                                </li>
                                                : null
                                        }
                                        {/*如果一条都没有，显示空 */}
                                        {
                                            (one.schedules || []).length == 0 ?
                                                <>
                                                    <div className="empty_list">该领导暂无日程~</div>
                                                </>
                                                : null
                                        }
                                    </ul>
                                    {/* 这里这么多条件完全是为了判断 ma20这个间隔的显示 麻烦呀.... */}
                                    {
                                        (datas.leaders || []).length > 1
                                        && ((!isKeeperShow && (datas.partners || []).length) || (datas.leaders || []).length - 1 !== idx) ?
                                            <div className="ma20 bottom_1px_line top_1px_line"/> : null
                                    }
                                </div>
                            );
                        }) : null
                    }
                    {
                        page === '1' || !isKeeperShow ? this.state.datas.partners.map((one, idx) => {
                            return (
                                <div key={one.userId} className="one top_1px_line">
                                    <div className="title bottom_1px_line"
                                        onClick={this.showColleageIndex.bind(this, one.userId, false)}>
                                        <img className="avatar" src={G.fixAvatar(one.avatar)}/>
                                        <p className="desc">
                                            <span className="a">{one.userName}</span>
                                            {one.deptName}
                                        </p>
                                        {
                                            one.isTop == 'Y' ?
                                                <img className="top_btn _action_top"
                                                    src={require('./images/partner_top_y.png')}
                                                    onClick={this.makeTop.bind(this, one.userId, one.isTop)}/>
                                                : null
                                        }

                                    </div>
                                    <ul>
                                        {
                                            (this.changeSchedule(one.schedules || [], true, one.userId)).map((tone, idx) => {
                                                //如果没有点击全部显示,那么最多显示两个
                                                let isShowAll = this.state.showMoreMap[one.userId];
                                                if (!this.state.showMoreMap[one.userId]) {
                                                    //做多显示两个
                                                    if (idx > 1) {
                                                        return null;
                                                    }
                                                }
                                                let isShowLastBottomLine = true;
                                                //判断是否显示底部横线
                                                //如果小于等于2条数据。不显示
                                                if ((one.schedules || []).length <= 2) {
                                                    if (idx == 1) {
                                                        isShowLastBottomLine = false;
                                                    }
                                                }
                                                //else 如果点击了其他都显示，最后一个不显示
                                                else {
                                                    if (isShowAll) {
                                                        if ((one.schedules || []).length - 1 == idx) {
                                                            isShowLastBottomLine = false;
                                                        }
                                                    } else {
                                                        //如果没显示其他的，第二个不显示
                                                        if (idx == 1) {
                                                            isShowLastBottomLine = false;
                                                        }
                                                    }
                                                }
                                                return (
                                                    //onClick={() => { window.location.href = tone.url; }}
                                                    <li className={"item" + (isShowLastBottomLine ? ' bottom_1px_line' : '')}
                                                        key={tone.refId}>
                                                        <p className="a">{tone.time}</p>
                                                        <p className="b">{tone.title}</p>
                                                        <p className="c">{tone.descript}</p>
                                                    </li>
                                                );
                                            })
                                        }
                                        {/*如果条数大于2条,并且没有点击过显示更多,则显示这个提示 */}
                                        {
                                            (one.schedules || []).length > 2 && !this.state.showMoreMap[one.userId] ?
                                                <li className="more top_1px_line bottom_1px_line"
                                                    onClick={this.showMore.bind(this, one.userId)}>
                                                    <span>其他{one.schedules.length - 2}个日程</span>
                                                    <i></i>
                                                </li>
                                                : null
                                        }
                                        {/*如果一条都没有，显示空 */}
                                        {
                                            (one.schedules || []).length == 0 ?
                                                <>
                                                    <div className="empty_list">该同事暂无日程~</div>
                                                </>
                                                : null
                                        }
                                    </ul>
                                    {
                                        (datas.partners || []).length > 1
                                        && ((datas.partners || []).length - 1 !== idx) ?
                                            <div className="ma20 bottom_1px_line top_1px_line"/> : null
                                    }
                                </div>
                            );
                        }) : null
                    }
                </div>
                <Footer whichTab={1}/>
            </div>
        );
    }
}

export default Page;
