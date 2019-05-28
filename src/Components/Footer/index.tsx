///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
import Paaaa from '../../Pages/PageIndex';
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
            <div className="_Footer">
                <div className="body_ma"></div>
                <div className="main top_1px_line">
                    <div className={"item " + (this.props.whichTab == 0 ? 'active' : '')} onClick={() => { pthis.props.whichTab != 0 ? window.location.replace('#/index/0/0') : ''; }}>
                        {
                            this.props.whichTab == 0 ?
                                <img src={require('./images/my_y.png')} />
                                :
                                <img src={require('./images/my_n.png')} />
                        }
                        <span>我的日程</span>
                    </div>
                    <div className={"item " + (this.props.whichTab == 1 ? 'active' : '')} onClick={() => { pthis.props.whichTab != 1 ? window.location.replace('#/colleageList') : ''; }}>
                        {
                            this.props.whichTab == 1 ?
                                <img src={require('./images/other_y.png')} />
                                :
                                <img src={require('./images/other_n.png')} />
                        }
                        <span>同事日程</span>
                    </div>
                    <div className={"item " + (this.props.whichTab == 2 ? 'active' : '')} onClick={() => { pthis.props.whichTab != 2 ? window.location.replace('#/more') : ''; }}>
                        {
                            this.props.whichTab == 2 ?
                                <img src={require('./images/setting_y.png')} />
                                :
                                <img src={require('./images/setting_n.png')} />
                        }
                        <span>设置</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
