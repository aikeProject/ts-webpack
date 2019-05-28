///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as classNames from 'classnames';
import * as util from '../../Common/util';
//Components
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
        let txt = '';
        if (this.props.txt) {
            if (!this.state.enabled && !this.state.stop) {
                txt = '没有更多了';
            } else {
                txt = '加载中';
            }
        }
        return (
            <div className="_ComponentPullUpLoading" ref={dom => this.data.pullUpElement = dom}>
                {txt}
            </div>
        );
    }
}

export default Page;
