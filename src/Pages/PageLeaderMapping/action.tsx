///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
//Modules
//Less
import './index.less';
//interface
import {
    ScheduleV3KeeperList
} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';
//Main
class Action extends React.Component<Props, State> {
    state: State = {
        list: [],
        isLoad: false,
    };
    constructor(props: Props) {
        super(props);
    }
    componentDidMount() {
        let pthis = this;
        G.setTitle('领导日程代管');
        G.ajax({
            url: '/oa/api/schedule/v2/keeper/list',
            cache: false,
            success: function (data: Array<ScheduleV3KeeperList>) {
                pthis.setState({
                    list: data || [],
                    isLoad: true
                });
            }
        });
    }
}

export default Action;
