///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
import Footer from '../../Components/Footer/index';
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
            <div className="_PageMore">
                <div className="ma30 bottom_1px_line top_1px_line"></div>
                <div className="linew">
                    <div className="line bg_01" onClick={() => { window.location.href = '#/publicList'; }}>
                        <span className="ls">公开日程名单</span>
                        <i className="drop"></i>
                    </div>
                </div>
                {
                    pthis.state.currUserIsAdmin ?
                        <>
                            <div className="ma20 bottom_1px_line top_1px_line"></div>
                            <div className="linew">
                                <div className="line bg_04" onClick={() => { window.location.href = '#/leaderMapping'; }}>
                                    <span className="ls">领导日程代管</span>
                                    <i className="drop"></i>
                                </div>
                            </div>
                        </>
                        : null
                }
                {
                    pthis.state.currUserIsAdmin ?
                        <>
                            <div className="ma20 bottom_1px_line top_1px_line"></div>
                            <div className="linew">
                                <div className="line bg_04" onClick={() => { window.location.href = '#/managers'; }}>
                                    <span className="ls">权限管理</span>
                                    <i className="drop"></i>
                                </div>
                            </div>
                        </>
                        : null
                }
                <div className="ma20 bottom_1px_line top_1px_line"></div>
                <div className="linew">
                    <div className="line bg_03"
                        onClick={() => { window.location.href = 'help.html?_' + (new Date()).getTime(); }}>
                        <span className="ls">帮助中心</span>
                        <i className="drop"></i>
                    </div>
                </div>
                <div className="ma20 top_1px_line"></div>
                <Footer whichTab={2} />
            </div>
        );
    }
}

export default Page;
