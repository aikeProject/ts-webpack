///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
//Modules
//Less
import './index.less';
import '../../../third/PageContacts/index.less';
import '../../../third/ActionSheet/index.less';
class Action extends React.Component<{}> {
    reft: any;
    refActionSheet: any;
    state = {
        isShowHwContacts: false,
    }
    sureSelectHwMCallBack() { }
    showActionSheets() {
        let actionsConnects: any = [];
        let l = [{ id: 1, t: 'aaa' }, { id: 2, t: 'bbbb' }];
        $.each(l, function (idx, one) {
            actionsConnects.push({
                text: one.t, info: { color: '', id: one.id }, cb: (idx: any, text: any, info: any) => {
                    // console.log(idx, text, info);
                }
            });
        });
        this.refActionSheet.show(actionsConnects, () => {
            // console.log('cancel');
        });
    }
}

export default Action;
