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
class Action extends React.Component<Props, State> {
    refInput: HTMLElement;
    state: State = {
        txt: ''
    };

    constructor(props: Props) {
        super(props);
    }

    static defaultProps: Props = {};

    componentDidMount() {
        $('body').addClass('position-fixed');
    }

    componentWillUnmount(): void {
        $('body').removeClass('position-fixed');
    }

    editFocus = () => {
        // 针对苹果手机的设置
        this.hackInputShow();
    };

    editInput = (e: any) => {
        this.setState({
            txt: e.target.innerText
        });
    };

    editBlur = () => {
        this.hide();
    };

    send = () => {
        const {txt} = this.state;
        this.props.onChange && this.props.onChange(txt);
    };

    sendHide = (e: React.MouseEvent<HTMLDivElement>) => {
        this.props.onHide && this.props.onHide();
    };

    hide() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i))) {
            $(".pos_top").css({"height": 0 + 'px'});
            $('#in_top').css({'bottom': 0 + 'px'});
        }
    }

    hackInputShow() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i))) {
            $(".pos_top").css({"height": $(window).height() * 0.63 + 'px'});
            $('#in_top').css({'bottom': $(window).height() * 0.57 + 'px'});
            setTimeout(function () {
                $(document).scrollTop(1);
            }, 100);
        }
        this.refInput.focus();
    }
}

export default Action;
