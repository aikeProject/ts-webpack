/**
 * Created by chenkai on 2015/8/27.
 */

var G = {
    BASE_URL: function () {
        var surl = window.location.href;
        if (surl.indexOf('/localhost') > -1 || surl.indexOf('/192.') > -1) {
            // return '/proxy';
            // return '/remote';
            return 'https://www.jianjian.work';
            // return '';
            // return 'http://121.196.220.194:3000/proxy';
            // return '';
        } else {
            return '';
        }
        return '';
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    ajax2: function (ob) {
        var that = this;
        if (typeof (ob) == 'object') {
            if (ob.concat) { //[]
                var promise = $.Deferred();
                that.addWaitDom();
                for (var i = 0; i < ob.length; i++) {
                    ob[i].url = that.BASE_URL() + ob[i].url;
                    promise = promise.then($.ajax(ob[i])).done(function () {
                        that.removeWaitDom();
                    }).fail(function () {
                        that.addWaitDom();
                    });
                }
            } else {  //{}
                ob.url = that.BASE_URL() + ob.url;
                ob.success_t = ob.success;
                ob.success = function (data) {
                    if (typeof (data) == 'string') {
                        data = JSON.parse(data);
                    }
                    if (!data.success) {
                        ob.error(data);
                        return;
                    }
                    that.removeWaitDom();
                    try {
                        ob.success_t(data.model, data);
                    } catch (e) {
                    }

                };
                ob.error_t = ob.error;
                ob.error = function (data) {
                    if (data.errorMsg) {
                        G.toast.show(data.errorMsg);
                    }
                    that.removeWaitDom();
                    if (ob.error_t) {
                        ob.error_t(data);
                    } else if (!data.errorMsg) {
                        G.toast.show('服务器开小差啦. 请稍候再试试.');
                    }

                }
                ob.cache = false;
                that.addWaitDom();
                $.ajax(ob);
            }
        }
    },
    ajax: function (ob) {
        var that = this;
        if (typeof (ob) == 'object') {
            var turl = ob.url;
            ob.url = that.BASE_URL() + ob.url;
            ob.success_t = ob.success;
            ob.success = function (data) {
                if (typeof (data) == 'string') {
                    data = JSON.parse(data);
                }
                if (!data.success) {
                    ob.error(data);
                    return;
                }
                that.removeWaitDom();
                ob.success_t(ajaxMapping(turl, data.model));//.replace('/proxy/', '/')
            };
            ob.error_t = ob.error;
            ob.error = function (data) {
                if (data.errorMsg) {
                    G.toast.show(data.errorMsg);
                }
                that.removeWaitDom();
                if (ob.error_t) {
                    ob.error_t(data);
                } else if (!data.errorMsg) {
                    G.toast.show('服务器开小差啦. 请稍候再试试.');
                }

            }
            ob.cache = false;
            if (ob.isLoading === false) {
                that.addWaitDom();
            }
            // ob.contentType = "application/json;charset=UTF-8";
            // ob.data = JSON.stringify(ob.data);
            return $.ajax(ob);
        }
    },
    ajax3: function (ob) {
        var that = this;
        if (typeof (ob) == 'object') {
            var turl = ob.url;
            ob.url = that.BASE_URL() + ob.url;
            ob.success_t = ob.success;
            ob.success = function (data) {
                if (typeof (data) == 'string') {
                    data = JSON.parse(data);
                }
                if (!data.success) {
                    ob.error(data);
                    return;
                }
                that.removeWaitDom();
                ob.success_t(ajaxMapping(turl, data.model));//.replace('/proxy/', '/')
            };
            ob.error_t = ob.error;
            ob.error = function (data) {
                if (data.errorMsg) {
                    G.toast.show(data.errorMsg);
                }
                that.removeWaitDom();
                if (ob.error_t) {
                    ob.error_t(data);
                } else if (!data.errorMsg) {
                    G.toast.show('服务器开小差啦. 请稍候再试试.');
                }

            }
            ob.cache = false;
            if (ob.isLoading === false) {
                that.addWaitDom();
            }
            ob.contentType = "application/json;charset=UTF-8";
            ob.data = JSON.stringify(ob.data);
            return $.ajax(ob);
        }
    },
    waittingFlag: 0,
    waittingTimer: null,
    addWaitDom: function () {
        if (this.waittingFlag == 0) {
            this.waittingTimer = setTimeout(function () {
                $('body').append('<div class="G-waitting" id="G-waitting"><div class="G-waitting-bg"></div><div class="G-waitting-main"><img src="./plugins/waitting.gif"/> <span class="span">加载中...</span></div></div>');
            }, 400);
        }
        this.waittingFlag++;
    },
    removeWaitDom: function () {
        this.waittingFlag--;
        if (this.waittingFlag <= 0) {
            this.waittingFlag = 0;
            $('#G-waitting').remove();
            clearTimeout(this.waittingTimer);
        }
    },
    log: function (data, tag) {
        tag && console.log(tag);
        console.log(data);
    },
    setTitle: function (titleName) {
        var $body = $('body');
        document.title = titleName;
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
    },
    alert: {
        callback: null,
        hide: function () {
            if (typeof (this.callback) == 'function') {
                this.callback($('#G-alert')[0]);
            }
            $('#G-alert').hide();
            $('#G-alert-sure-btn').unbind('click');
            this.callback = null;
        },
        show: function (msg, callback, btnText) {
            if (btnText) {
                $('#G-alert-sure-btn').html(btnText);
            } else {
                $('#G-alert-sure-btn').html('确定');
            }
            if (msg.push) {
                var sHtml = '<div class="title">' + msg[0] + '</div>';
                if (msg.length > 1) {
                    sHtml += '<div class="label">' + msg[1] + '</div>';
                }
                if (msg.length > 2) {
                    sHtml += '<div>' + msg[2] + '</div>'
                }
                $('#G-alert-content').html(sHtml);
            } else {
                $('#G-alert-content').html('<div class="title_only">' + msg + '</div>');
            }
            if (typeof (callback) == 'function') {
                this.callback = callback;
            }
            $('#G-alert').show();

            //bind
            var that = this;
            $('#G-alert-sure-btn').click(function () {
                that.hide();
                that = null;
            });
        }
    },
    confirm: {
        cancelCallback: null,
        sureCallback: null,
        hide: function () {
            $('#G-confirm').hide();
            $('#G-confirm-sure-btn').unbind('click');
            $('#G-confirm-cancel-btn').unbind('click');
            this.callback = null;
        },
        show: function (msg, callback, btnTexts) {
            if (btnTexts && btnTexts.length == 2) {
                $('#G-confirm-sure-btn').html(btnTexts[1]);
                $('#G-confirm-cancel-btn').html(btnTexts[0]);
            } else {
                $('#G-confirm-sure-btn').html('确定');
                $('#G-confirm-cancel-btn').html('取消');
            }
            if (msg.push) {
                var sHtml = '<div class="title">' + msg[0] + '</div>';
                if (msg.length > 1) {
                    sHtml += '<div class="label">' + msg[1] + '</div>';
                }
                if (msg.length > 2) {
                    sHtml += '<div>' + msg[2] + '</div>'
                }
                $('#G-confirm-content').html(sHtml);
            } else {
                $('#G-confirm-content').html('<div class="title_only">' + msg + '</div>');
            }
            if (callback && typeof (callback[0]) == 'function') {
                this.cancelCallback = callback[0];
            } else {
                this.cancelCallback = function () {
                }
            }
            if (callback && typeof (callback[1]) == 'function') {
                this.sureCallback = callback[1];
            } else {
                this.sureCallback = function () {
                }
            }
            $('#G-confirm').show();

            //bind
            var that = this;
            $('#G-confirm-sure-btn').click(function () {
                if (that.sureCallback() === false) {
                    return;
                }
                that.hide();
                that = null;
            });
            $('#G-confirm-cancel-btn').click(function () {
                if (false === that.cancelCallback()) {
                    return;
                }
                that.hide();
                that = null;
            });
        }
    },
    toast: {
        show: function (msg, delay, callbackFn) {
            $('#G-toast-text').html(msg);
            $('#G-toast').show();
            var delayObject = {'fast': 500, 'slow': 1000, 'middle': 800};
            var time = delayObject[delay];
            if (!time) {
                time = delay;
            }
            if (!delay) {
                time = delayObject.slow;
            }
            setTimeout(function () {
                $('#G-toast').hide();
                if (typeof callbackFn == 'function') {
                    callbackFn();
                }
            }, time)
        }
    },
    toast2: {
        show: function (img, msg, delay, callbackFn) {
            $('#G-toast2-img').attr('src', img);
            $('#G-toast2-text').html(msg);
            $('#G-toast2').show();
            var delayObject = {'fast': 500, 'slow': 1000, 'middle': 800};
            var time = delayObject[delay];
            if (!time) {
                time = delay;
            }
            if (!delay) {
                time = delayObject.slow;
            }
            setTimeout(function () {
                $('#G-toast2').hide();
                if (typeof callbackFn == 'function') {
                    callbackFn();
                }
            }, time)
        }
    },
    selectYHS: {
        //divs
        _h: 50,
        show: function (divsll, divsl, divsr, curll, curl, curr, h) {
            //this._h = 1 * parseInt($('html').css('font-size'));
            this.showll(divsll, curll);
            this.showl(divsl, curl);
            this.showr(divsr, curr);
            $('#G-selectYHSwp-list-ll')[0].scrollTop = curll * this._h;
            $('#G-selectYHSwp-list-l')[0].scrollTop = curl * this._h;
            $('#G-selectYHSwp-list-r')[0].scrollTop = curr * this._h;
            return this;
        },
        showll: function (divs) {
            var sHtml = '<div>&nbsp;</div><div>&nbsp;</div>';
            $.each(divs, function (idx, div) {
                sHtml += div;
            });
            sHtml += '<div>&nbsp;</div><div>&nbsp;</div>';
            $('#G-selectYHSwp-list-ll').html(sHtml);
            var _H = this._h;
            //绑定滚钉
            $('#G-selectYHSwp-list-ll').off('scrollstop').on('scrollstop', function () {
                var top = this.scrollTop;
                var ttop = top % _H;
                if (ttop > _H * 1.0 / 2) {
                    this.scrollTop += _H - ttop;
                } else {
                    this.scrollTop -= ttop;
                }
                if (G.selectYHS.scrollCallBack && G.selectYHS.scrollCallBack[0] && typeof G.selectYHS.scrollCallBack[0] == 'function') {
                    var lltop = $('#G-selectYHSwp-list-ll')[0].scrollTop;
                    var nll = Math.ceil(lltop / _H);
                    var nllDom = $('#G-selectYHSwp-list-ll > div')[nll + 2];
                    G.selectYHS.scrollCallBack[0]($(nllDom).text(), $(nllDom).data('value'), nll);
                }
            });
        },
        showl: function (divs) {
            var sHtml = '<div>&nbsp;</div><div>&nbsp;</div>';
            $.each(divs, function (idx, div) {
                sHtml += div;
            });
            sHtml += '<div>&nbsp;</div><div>&nbsp;</div>';
            $('#G-selectYHSwp-list-l').html(sHtml);
            var _H = this._h;
            //绑定滚钉
            $('#G-selectYHSwp-list-l').off('scrollstop').on('scrollstop', function () {
                var top = this.scrollTop;
                var ttop = top % _H;
                if (ttop > _H * 1.0 / 2) {
                    this.scrollTop += _H - ttop;
                } else {
                    this.scrollTop -= ttop;
                }
                if (G.selectYHS.scrollCallBack && G.selectYHS.scrollCallBack[1] && typeof G.selectYHS.scrollCallBack[1] == 'function') {
                    var ltop = $('#G-selectYHSwp-list-l')[0].scrollTop;
                    var nl = Math.ceil(ltop / _H);
                    var nlDom = $('#G-selectYHSwp-list-l > div')[nl + 2];
                    G.selectYHS.scrollCallBack[1]($(nlDom).text(), $(nlDom).data('value'), nl);
                }
            });
        },
        showr: function (divs) {
            var sHtml = '<div>&nbsp;</div><div>&nbsp;</div>';
            $.each(divs, function (idx, div) {
                sHtml += div;
            });
            sHtml += '<div>&nbsp;</div><div>&nbsp;</div>';
            $('#G-selectYHSwp-list-r').html(sHtml);
            $('#G-selectYHS').show();
            var _H = this._h;
            //绑定滚钉
            $('#G-selectYHSwp-list-r').off('scrollstop').on('scrollstop', function () {
                var top = this.scrollTop;
                var ttop = top % _H;
                if (ttop > _H * 1.0 / 2) {
                    this.scrollTop += _H - ttop;
                } else {
                    this.scrollTop -= ttop;
                }
                if (G.selectYHS.scrollCallBack && G.selectYHS.scrollCallBack[2] && typeof G.selectYHS.scrollCallBack[2] == 'function') {
                    var ltop = $('#G-selectYHSwp-list-l')[0].scrollTop;
                    var rtop = $('#G-selectYHSwp-list-r')[0].scrollTop;
                    var nl = Math.ceil(ltop / _H);
                    var nr = Math.ceil(rtop / _H);
                    var nlDom = $('#G-selectYHSwp-list-l > div')[nl + 2];
                    var nrDom = $('#G-selectYHSwp-list-r > div')[nr + 2];
                    G.selectYHS.scrollCallBack[2]($(nlDom).text(), $(nlDom).data('value'), $(nrDom).text(), $(nrDom).data('value'), nl, nr);
                }
            });
        },
        hide: function (isFromSure) {
            $('#G-selectYHS-main').addClass('slideOutDown');
            setTimeout(function () {
                $('#G-selectYHS').hide();
                $('#G-selectYHS-main').removeClass('slideOutDown');
                $('#G-selectYHSwp-list-ll')[0].scrollTop = 0;
                $('#G-selectYHSwp-list-l')[0].scrollTop = 0;
                $('#G-selectYHSwp-list-r')[0].scrollTop = 0;
                if (!(isFromSure === true)) {
                    if (typeof G.selectYHS.hideCallBack == 'function') {
                        G.selectYHS.hideCallBack(isFromSure);
                    }
                }
            }, 400);
            return this;
        },
        sure: function () {
            var _H = this._h;
            if (typeof G.selectYHS.sureCallBack == 'function') {
                var lltop = $('#G-selectYHSwp-list-ll')[0].scrollTop;
                var ltop = $('#G-selectYHSwp-list-l')[0].scrollTop;
                var rtop = $('#G-selectYHSwp-list-r')[0].scrollTop;
                var nll = Math.ceil(lltop / _H);
                var nl = Math.ceil(ltop / _H);
                var nr = Math.ceil(rtop / _H);
                var nllDom = $('#G-selectYHSwp-list-ll > div')[nll + 2];
                var nlDom = $('#G-selectYHSwp-list-l > div')[nl + 2];
                var nrDom = $('#G-selectYHSwp-list-r > div')[nr + 2];
                var flag = G.selectYHS.sureCallBack($(nllDom).text(), $(nllDom).data('value'), $(nlDom).text(), $(nlDom).data('value'), $(nrDom).text(), $(nrDom).data('value'), nll, nl, nr);
                if (flag === false) {
                    return;
                }
            }
            G.selectYHS.hide(true);
            return this;
        },
    },
    calendar: {
        year: 2016,
        month: 1,
        date: 1,
        hour: 0,
        minutes: 0,
        second: 0,
        setYear: 2016,
        setMonth: 1,
        setDate: 1,
        isShowOver: false,
        urlCancel: function () {
            $('#G-calendar').hide();
            document.removeEventListener('hashchange', this.urlCancel);
        },
        init: function () {
            var t = new Date();
            this.year = t.getFullYear();
            this.month = t.getMonth();
            this.date = t.getDate();
            this.hour = t.getHours();
            this.minutes = t.getMinutes();
            this.second = t.getSeconds();
            this.isShowOVer = false;
            return this;
        },
        setData: function (y, m, d, h, i, s) {
            this.year = y;
            this.month = m;
            this.date = d;
            this.hour = h;
            this.minutes = i;
            this.second = s;
            return this;
        },
        showCalendar: function (isOverDay) {
            console.log(isOverDay);
            if (isOverDay === true) {
                this.isShowOver = true;
            } else {
                this.isShowOver = false;
            }
            //获取当月天数
            var monthDays = new Date(this.year, this.month + 1, 0).getDate();
            var day = new Date(this.year, this.month, 1).getDay();
            var sHtml = '<tr>';
            for (var i = 0; i < day; i++) {
                sHtml += '<td>&nbsp;</td>';
            }
            for (var i = 0, j = day; i < monthDays; i++) {
                j++;
                //判断是否是过去时间.Y:灰色不可点击
                var _isToday = (this._isToday(this.year, this.month, i + 1));
                var _isSetDay = (this._isSetday(this.year, this.month, i + 1));
                var _isOverDay = (this._isOverday(this.year, this.month, i + 1)) && this.isShowOver;
                sHtml += '<td onclick="G.calendar.setCurTime(' + (new Date(this.year, this.month, i + 1).getTime()) + ')" class="_d' + (_isToday ? ' _today' : (_isSetDay ? ' active' : (_isOverDay ? ' _over' : ''))) + '"><span class="day">' + (i + 1) + '</span></td>';
                if (j == 7) {
                    sHtml += '</tr><tr>';
                    j = 0;
                }
            }
            for (var i = j; i <= 6 && i > 0; i++) {
                sHtml += '<td>&nbsp;</td>';
            }
            sHtml += '</tr>';
            $('#G-calendar .calendar-days').html(sHtml);
            $('#G-calendar-y-m').text(this.year + '-' + (this.month < 9 ? '0' : '') + (this.month + 1));
            if ($('#G-calendar').css('opacity') == 1) {
                $('#G-calendar').show();
            } else {
                $('#G-calendar').css({opacity: 0}).show().animate({opacity: 1}, 200);
            }
            this.bindTd();

            return this;
        },
        nextMonth: function () {
            this.month += 1;
            if (this.month > 12) {
                this.month = 1;
                this.year += 1;
            }
            var t = new Date(this.year, this.month, 1, this.hour, this.minutes, this.second);
            this.year = t.getFullYear();
            this.month = t.getMonth();
            this.date = t.getDate();
            this.hour = t.getHours();
            this.minutes = t.getMinutes();
            this.second = t.getSeconds();
            this.showCalendar();
            return this;
        },
        prevMonth: function () {
            this.month -= 1;
            if (this.month < 0) {
                this.month = 11;
                this.year -= 1;
            }
            var t = new Date(this.year, this.month, 1, this.hour, this.minutes, this.second);
            this.year = t.getFullYear();
            this.month = t.getMonth();
            this.date = t.getDate();
            this.hour = t.getHours();
            this.minutes = t.getMinutes();
            this.second = t.getSeconds();
            this.showCalendar();
            return this;
        },
        bindTd: function () {
            var fun = function () {
                $('#G-calendar td').removeClass('active');
                if ($(this).attr('class').indexOf('_today') == -1) {
                    $(this).addClass('active');
                }
                window.G.calendar.sure()
            };
            $('#G-calendar ._d').unbind('click', fun).click(fun);


            $('G-calendar-y-m').click(function () {
                $('#G-calendar-years').css('top', $(this).css('top') + $(this).height());
            });
            //增加返回后取消控件
            document.addEventListener('hashchange', this.urlCancel);
            return this;
        },
        _isToday: function (y, m, d) {
            var t = new Date();
            if (t.getFullYear() == y && t.getMonth() == m && t.getDate() == d) {
                return true;
            }
            return false;
        },
        _isSetday: function (y, m, d) {
            var t = new Date(this.setYear, this.setMonth, this.setDate, this.hour, this.minutes, this.second);
            if (t.getFullYear() == y && t.getMonth() == m && t.getDate() == d) {
                return true;
            }
            return false;
        },
        _isOverday: function (y, m, d) {
            var t = new Date(y, m, d, 0, 0, 0);
            if (t.getTime() < new Date() * 1) {
                return true;
            }
            return false;
        },
        sure: function () {
            if (typeof window.G.calendar.sureCallBack == 'function') {
                if (window.G.calendar.sureCallBack(G.parseDate(new Date(this.year, this.month, this.date, this.hour, this.minutes, this.second).getTime(), 1)) !== false) {
                    window.G.calendar.cancel(true);
                }
            } else {
                console.log('sureCallBack is not function', 'warn');
            }
            return this;
        },
        cancel: function (flag) {
            if (window.G.calendar.animate === false) {
                $('#G-calendar').hide();
            } else {
                $('#G-calendar-main').addClass('slideOutDown');
                setTimeout(function () {
                    $('#G-calendar').hide();
                    $('#G-calendar-main').removeClass('slideOutDown');
                }, 500);
            }
            if (!flag) {
                if (typeof window.G.calendar.cancelCallBack == 'function') {
                    window.G.calendar.cancelCallBack();
                }
            }
            return this;
        },
        setCurTime: function (longTime) {
            var t = new Date(longTime);
            this.setYear = this.year = t.getFullYear();
            this.setMonth = this.month = t.getMonth();
            this.setDate = this.date = t.getDate();
            this.hour = t.getHours();
            this.minutes = t.getMinutes();
            this.second = t.getSeconds();
            return this;
        }
    },
    select: {
        //divs
        _h: 50,
        show: function (divsl, divsr, curl, curr, h) {
            //this._h = 1 * parseInt($('html').css('font-size'));
            this.showl(divsl, curl);
            this.showr(divsr, curr);
            $('#G-selectwp-list-l')[0].scrollTop = curl * this._h;
            $('#G-selectwp-list-r')[0].scrollTop = curr * this._h;
            return this;
        },
        showl: function (divs) {
            var sHtml = '<div>&nbsp;</div><div>&nbsp;</div>';
            $.each(divs, function (idx, div) {
                sHtml += div;
            });
            sHtml += '<div>&nbsp;</div><div>&nbsp;</div>';
            $('#G-selectwp-list-l').html(sHtml);
            var _H = this._h;
            //绑定滚钉
            $('#G-selectwp-list-l').off('scrollstop').on('scrollstop', function () {
                var top = this.scrollTop;
                var ttop = top % _H;
                if (ttop > _H * 1.0 / 2) {
                    this.scrollTop += _H - ttop;
                } else {
                    this.scrollTop -= ttop;
                }
                if (G.select.scrollCallBack && G.select.scrollCallBack[0] && typeof G.select.scrollCallBack[0] == 'function') {
                    var ltop = $('#G-selectwp-list-l')[0].scrollTop;
                    var nl = Math.ceil(ltop / _H);
                    var nlDom = $('#G-selectwp-list-l > div')[nl + 2];
                    G.select.scrollCallBack[0]($(nlDom).text(), $(nlDom).data('value'), nl);
                }
            });
        },
        showr: function (divs) {
            var sHtml = '<div>&nbsp;</div><div>&nbsp;</div>';
            $.each(divs, function (idx, div) {
                sHtml += div;
            });
            sHtml += '<div>&nbsp;</div><div>&nbsp;</div>';
            $('#G-selectwp-list-r').html(sHtml);
            $('#G-select').show();
            var _H = this._h;
            //绑定滚钉
            $('#G-selectwp-list-r').off('scrollstop').on('scrollstop', function () {
                var top = this.scrollTop;
                var ttop = top % _H;
                if (ttop > _H * 1.0 / 2) {
                    this.scrollTop += _H - ttop;
                } else {
                    this.scrollTop -= ttop;
                }
                if (G.select.scrollCallBack && G.select.scrollCallBack[1] && typeof G.select.scrollCallBack[1] == 'function') {
                    var ltop = $('#G-selectwp-list-l')[0].scrollTop;
                    var rtop = $('#G-selectwp-list-r')[0].scrollTop;
                    var nl = Math.ceil(ltop / _H);
                    var nr = Math.ceil(rtop / _H);
                    var nlDom = $('#G-selectwp-list-l > div')[nl + 2];
                    var nrDom = $('#G-selectwp-list-r > div')[nr + 2];
                    G.select.scrollCallBack[1]($(nlDom).text(), $(nlDom).data('value'), $(nrDom).text(), $(nrDom).data('value'), nl, nr);
                }
            });
        },
        hide: function (isFromSure) {
            $('#G-select-main').addClass('slideOutDown');
            setTimeout(function () {
                $('#G-select').hide();
                $('#G-select-main').removeClass('slideOutDown');
                $('#G-selectwp-list-l')[0].scrollTop = 0;
                $('#G-selectwp-list-r')[0].scrollTop = 0;
                if (!(isFromSure === true)) {
                    if (typeof G.select.hideCallBack == 'function') {
                        G.select.hideCallBack(isFromSure);
                    }
                }

            }, 400);
            return this;
        },
        sure: function () {
            var _H = this._h;
            if (typeof G.select.sureCallBack == 'function') {
                var ltop = $('#G-selectwp-list-l')[0].scrollTop;
                var rtop = $('#G-selectwp-list-r')[0].scrollTop;
                var nl = Math.ceil(ltop / _H);
                var nr = Math.ceil(rtop / _H);
                var nlDom = $('#G-selectwp-list-l > div')[nl + 2];
                var nrDom = $('#G-selectwp-list-r > div')[nr + 2];
                G.select.sureCallBack($(nlDom).text(), $(nlDom).data('value'), $(nrDom).text(), $(nrDom).data('value'), nl, nr);
            }
            G.select.hide(true);
            return this;
        },
    },
    share: {
        show: function () {
            $('#shaerbg').show();
        },
        hide: function () {
            $('#shaerbg').hide();
        }
    },
    multiselect: {
        cancelCb: null,
        curList: {},
        oneClickCb: null,
        sureCb: null,
        ifSingle: false,
        show: function (divs, oneClickCb, sureCb, cancelCb, ifSingle) {
            this.sureCb = sureCb;
            this.oneClickCb = oneClickCb;
            this.cancelCb = cancelCb;
            this.ifSingle = ifSingle;
            this.curList = JSON.parse(JSON.stringify(divs));
            var sHtml = '';
            $.each(divs || [], function (idx, one) {
                sHtml += '<div class="selectone bottom_1px_line _selectone" onclick="G.multiselect.oneclick(this,' + idx + ')">' +
                    '<div class="selectlabel"><span class="' + (one.select ? ' active' : '') + '"></span></div>' +
                    '<div class="selecttxt"><div>' + one.html + '</div></div></div>'
            });
            $('#G-selectoption').html(sHtml);
            $('#G-multiselect').show();
        },
        hide: function (flag) {
            if (flag < 1) {
                if (typeof this.cancelCb == 'function') {
                    this.cancelCb();
                }
            }
            $('#G-multiselect').hide();
        },
        oneclick: function (that, idx) {
            var flag = false;
            if (this.ifSingle) {
                if ($(that).find('.selectlabel span').hasClass('active')) {
                    flag = false;
                    $(that).find('.selectlabel span').removeClass('active');
                } else {
                    flag = true;
                    $(that).parent().find('._selectone').find('.selectlabel span').removeClass('active');
                    $(that).find('.selectlabel span').addClass('active');
                }
            } else {
                if ($(that).find('.selectlabel span').hasClass('active')) {
                    flag = false;
                    $(that).find('.selectlabel span').removeClass('active');
                } else {
                    flag = true;
                    $(that).find('.selectlabel span').addClass('active');
                }
            }
            if (typeof this.oneClickCb == 'function') {
                this.oneClickCb(flag, idx, this.curList[idx]);
            }
        },
        sure: function () {
            var list = [];
            var allDom = $('#G-selectoption ._selectone');
            var that = this;
            $.each(allDom || [], function (idx, dom) {
                if ($(dom).find('.active').length > 0) {
                    list.push(that.curList[idx]);
                }
            });
            if (typeof this.sureCb == 'function') {
                if (this.sureCb(list) === false) {
                    return;
                }
            }
            this.hide(1);
        },
    },
    parseDate: function (longtime, f) {
        if (!longtime) {
            return "";
        }
        var dd = new Date(longtime);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        var h = dd.getHours();
        var i = dd.getMinutes();
        var s = dd.getSeconds();
        if (m < 10) m = "0" + m;
        if (d < 10) d = "0" + d;
        if (h < 10) h = "0" + h;
        if (i < 10) i = "0" + i;
        if (s < 10) s = "0" + s;
        if (f == 1) {
            return y + "-" + m + "-" + d;
        }
        if (f == 2) {
            return y + "年" + m + "月" + d + '日';
        }
        return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
    },
    fixDate: function (str) {
        var arr = str.split(' ');
        var arr1 = arr[0].split('-');
        if (arr.length == 2) {
            var arr2 = arr[1].split(':');
        } else {
            arr2 = [0, 0, 0];
        }
        return new Date(arr1[0] * 1, arr1[1] * 1 - 1, arr1[2] * 1, arr2[0], arr2[1], arr2[2]);
    },
    dayInWeek: function (ymd) {
        var date = this.fixDate(ymd);
        var s = "日一二三四五六";
        return s.charAt(date.getDay());
    },
    fixAvatar: function (avatar) {
        if (avatar) {
            if (avatar.substr(avatar.length - 1, 1) == '/') {
                return avatar + '100';
            }
            if (avatar.substr(avatar.length - 2, 2) == '/0') {
                return (avatar.substr(0, avatar.length - 1) + '100')
            }
            return avatar;
        }
        return 'plugins/default.png';
    },
    fixFixed: function () {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
            var w = $(window).height();
            var b = $(document.body).height()
            $('body').css('height', b > w ? b : w + 44);
            window.scrollTo(0, 0);
        }
    },
    wxConfig: function () {
        if (G.isWeiXin()) {
            var INIT_WX = function (apis) {
                var url = window.location.href.split('#')[0];
                G.ajax2({
                    url: '/wechat/jssdk/config',
                    data: {url: url, apis: apis, appCode: "meeting"},
                    success: function (data) {
                        if (wx && data.hanbin != "hanbin") {
                            data.beta = true;
                            // data.debug = true;
                            wx.config(data);
                        }
                    }
                });
            };
            INIT_WX('onMenuShareTimeline,onMenuShareAppMessage,openEnterpriseChat,chooseImage,uploadImage,previewImage,selectEnterpriseContact,invoke,onMenuShareWechat,onHistoryBack');
        }
    },
    weekOfYear: function (year, month, day) {
        //   year       年
        //   month     月
        //   day         日
        //   每周从周日开始
        var date1 = new Date(year, 0, 1);
        var date2 = new Date(year, month - 1, day, 1);
        var dayMS = 24 * 60 * 60 * 1000;
        var firstDay = (7 - date1.getDay()) * dayMS;
        var weekMS = 7 * dayMS;
        date1 = date1.getTime();
        date2 = date2.getTime();
        return Math.ceil((date2 - date1 - firstDay) / weekMS) + 1;
    }
};