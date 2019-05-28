'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['./actions', './store'], function (Actions, Store) {
    return function (_Reflux$Component) {
        _inherits(Component, _Reflux$Component);

        _createClass(Component, [{
            key: 'getData',
            value: function getData() {
                this.callbacks = [];
                this.infos = [];
                this.cancelCallback = null;
            }
        }]);

        function Component(props) {
            _classCallCheck(this, Component);

            var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

            _this.store = Store;
            _this.show.bind(_this);
            _this.selectThisSheet.bind(_this);

            _this.getData();
            //
            _this.state = { list: [] };
            return _this;
        }

        _createClass(Component, [{
            key: 'hide',
            value: function hide() {
                if (typeof this.cancelCallback == 'function') {
                    this.cancelCallback();
                    this.cancelCallback = null;
                }
                this.callbacks = [];
                this.infos = [];
                this.emptyState();
                $(this.refs.main).hide();
            }

            //list = >[{text,info:{},callback(idx,)},...]

        }, {
            key: 'show',
            value: function show(list, cancelCallback) {
                var textList = [];
                var pthis = this;
                this.cancelCallback = cancelCallback;
                if (list) {
                    list.map(function (one, idx) {
                        pthis.callbacks.push(one.cb);
                        textList.push(one.text);
                        pthis.infos.push(one.info);
                    });
                }
                this.state.list = textList;
                this.setState(this.state);
                $(this.refs.main).show();
            }
        }, {
            key: 'selectThisSheet',
            value: function selectThisSheet(idx) {
                if (this.callbacks[idx]) {
                    this.callbacks[idx](idx, this.state.list[idx], this.infos[idx]);
                }
                this.callbacks = [];
                this.infos = [];
                this.emptyState();
                $(this.refs.main).hide();
            }
        }, {
            key: 'emptyState',
            value: function emptyState() {
                this.setState({
                    list: []
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var pthis = this;
                return React.createElement("div", { className: "_ActionSheet", ref: "main" }, React.createElement("div", { className: "bg", onClick: this.hide.bind(this) }), React.createElement("div", { className: "main animated05 slideInUp" }, React.createElement("div", { className: "listmain" }, this.state && this.state.list ? this.state.list.map(function (one, idx) {
                    return React.createElement("div", { key: idx,
                        style: { color: pthis.infos[idx] && pthis.infos[idx].color ? pthis.infos[idx].color : '' },
                        onClick: pthis.selectThisSheet.bind(pthis, idx) }, one);
                }) : ''), React.createElement("div", { className: "cancel", onClick: this.hide.bind(this) }, "取消")));
            }
        }]);

        return Component;
    }(Reflux.Component);
});