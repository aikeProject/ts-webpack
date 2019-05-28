///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
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
        const {txt} = this.state;
        return (
            <div className='component-send'>
                <div className='_send' onClick={this.sendHide}/>
                <div>
                    <div className='pos_top'/>
                    <div id='in_top' className='send-input iphonex'>
                        <div className='edit-wrapper'>
                            {
                                !txt ? <div className='placeholder-txt'>请输入，500字数以内</div> : null
                            }
                            <div ref={(o) => this.refInput = o} contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={this.editInput}
                                className='input-text needsclick' onFocus={this.editFocus}
                                onBlur={this.editBlur}>
                            </div>
                        </div>
                        <div className='send-btn' onClick={this.send}>发送</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
