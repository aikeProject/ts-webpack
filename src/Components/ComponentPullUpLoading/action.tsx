///<reference path="../../Common/global.d.ts"/>
import * as React from 'react';
import * as util from '../../Common/util';
//Components
//Modules
//interface
import {} from '../../Interface/interface';

import {
    State,
    Props,
    Data,
} from './interface';

//Main
class Action extends React.Component<Props, State> {
    $more: any;
    scrollListenFn: any;
    state: State = {
        enabled: false,
        stop: false,
        dom: this.props.dom || window
    };
    data: Data = {
        pullUpElement: null
    };

    constructor(props: Props) {
        super(props);
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (this.props.enabled != nextProps.enabled && !_.isUndefined(this.props.enabled)) {
            this.setState({
                enabled: nextProps.enabled,
            });
            if (nextProps.enabled) {
                this.bindScrollListen();
            } else {
                this.removeScrollListen();
            }
        }
        if (!_.isUndefined(this.props.stop)) {
            this.setState({
                stop: nextProps.stop,
            });
        }
    }

    componentDidMount() {
        let pthis = this;
        this.$more = $(this.data.pullUpElement);
        setTimeout(() => {
            $(window).trigger('scroll');
        }, 1000);
        if (this.props.enabled) {
            this.bindScrollListen();
        }
    }

    componentWillUnmount(): void {
        this.removeScrollListen();
    }

    scrollListen($this: JQuery) {
        if (this.props.stop || !this.props.enabled) {
            return false;
        }
        let scrollTop = $this.scrollTop();
        let height = $this.height();
        if (this.$more.offset().top - scrollTop - height < 0) {
            if (_.isFunction(this.props.loadMore)) {
                this.props.loadMore();
            }
        }
    }

    removeScrollListen() {
        $(this.state.dom).off('scroll', this.scrollListenFn);
    }

    bindScrollListen() {
        this.scrollListenFn = this.scrollListen.bind(this, $(window));
        $(this.state.dom).on('scroll', this.scrollListenFn);
    }
}

export default Action;
