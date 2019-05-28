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
class Action extends React.Component<Props, State> {
    state: State = {
        currUserIsAdmin: false,
    };
    constructor(props: Props) {
        super(props);
    }
    componentDidMount() {
        let pthis = this;
        G.setTitle('设置');
        G.fixFixed();
        G.ajax2({
            url: '/user/isAdmin?appFunctionCode=schedule',
            async: false,
            success: function (data: boolean) {
                pthis.setState({
                    currUserIsAdmin: data
                });
            }
        });
    }
}

export default Action;
