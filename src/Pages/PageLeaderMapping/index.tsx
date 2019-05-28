///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
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
        return (
            <div className="_PageLeaderMapping">
                <div className="ma30"></div>
                <ul>
                    {
                        pthis.state.list.map((one, idx) => {
                            return (
                                <li className="top_1px_line" key={one.uid}>
                                    <div className="info">
                                        <img className="fl" src={G.fixAvatar(one.avatar)} />
                                        <p className="fl bottom_1px_line">
                                            <span className="a">{one.name}</span>
                                            <span className="b">{one.position}</span>
                                        </p>
                                        <div className="clear"></div>
                                    </div>
                                    <p className="desc top_1px_line">{_.pluck(one.keepers || [], 'name').join('; ')}</p>
                                    <div className="ma20 top_1px_line"></div>
                                </li>
                            );
                        })
                    }
                </ul>
                {
                    pthis.state.list.length == 0 && this.state.isLoad ?
                        <div className="no_data">
                            <img src={require('./images/no_list.png')} />
                            <p className="t1">暂无领导日程代管</p>
                            <p className="t2">领导和秘书的匹配需管理员登录PC端操作</p>
                        </div>
                        : null
                }
                {
                    pthis.state.list.length > 0 && this.state.isLoad ?
                        <div className="btm_txt">领导和秘书的匹配需管理员登录PC端操作</div>
                        : null
                }
            </div>
        );
    }
}

export default Page;
