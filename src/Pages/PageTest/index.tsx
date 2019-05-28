///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
// import PageContacts from '../../../third/PageContacts/index';
const PageContacts = require('../../../third/PageContacts/index.js');
const ActionSheet = require('../../../third/ActionSheet/index.js');
//Modules
//Less
import './index.less';
//
import Action from './action';
class Page extends Action {
    render() {
        return <div className="_PageTest">
            <button onClick={this.showActionSheets.bind(this)}>显示ActionSheet</button>
            <div className="aaaa" style={{ display: (this.state.isShowHwContacts ? 'block' : 'none') }}>
                <div className="cover"></div>
                <PageContacts ref={(o: any) => { this.reft = o; }} phoneNotExitAndAlarmCb={() => { return true; }}
                    sureFn={this.sureSelectHwMCallBack.bind(this)}
                    component={true}
                    clearAll={true}
                    onlyMember={true}
                    noOther={1} />
            </div>
            <ActionSheet ref={(o: any) => { this.refActionSheet = o; }} />
        </div>;
    }
}

export default Page;
