(function($, $$) {
    $$.common = (function() {
        var _alert = {
                temporary: {},
                html: function(setting) {
                    var html = '';
                    html += '<div id="alert" style="display :none" class="TA alert">';
                    html += '	<div class="alert-background"></div>';
                    html += '	<div class="alert-main TA ' + setting.className + '">';
                    html += '		<div class="alert-title">';
                    html += '			<p>' + setting.title + '</p>';
                    html += '			<div class="alert-close">×</div>';
                    html += '		</div>';
                    html += '		<div class="alert-body">';
                    html += '			<p>' + setting.text + '</p>';
                    html += '		</div>';
                    html += '		<div class="alert-footer">';
                    html += '			<div class="confirm">' + setting.buttonText + '</div>';
                    html += '		</div>';
                    html += '	</div>';
                    html += '</div>';
                    return html;
                },
                // 显示方法
                show: function(settingByUser, confirmCallback, cancelCallback) {
                    _alert.temporary = '';
                    if ($('#alert')) {
                        $('#alert').remove();
                    }
                    var setting = {
                        className: '',
                        title: '提示',
                        text: 'text',
                        buttonText: '确定',
                    };
                    var option = $.extend({}, setting, settingByUser);
                    _alert.temporary = $(_alert.html(option));
                    _alert.temporary.find('.alert-background').bind('click', function() {
                        if (cancelCallback) {
                            cancelCallback();
                        }
                        _alert.hide();
                    });
                    _alert.temporary.find('.alert-close').bind('click', function() {
                        if (cancelCallback) {
                            cancelCallback();
                        }
                        _alert.hide();
                    });
                    _alert.temporary.css('display', 'block');
                    setTimeout(function() {
                        _alert.temporary.css('opacity', '1');
                        _alert.temporary.find('.alert-main').css({
                            'margin-top': '-100px'
                        });
                    }, 10);
                    _alert.temporary.find('.confirm').bind('click', function() {
                        if (confirmCallback) {
                            confirmCallback();
                        }
                        _alert.hide();
                    });
                    $('body').append(_alert.temporary);
                },
                // 隐藏方法
                hide: function() {
                    _alert.temporary.remove();
                    _alert.temporary = {};
                    /*	_alert.temporary.css({
                    	'opacity': 0
                    });
                    _alert.temporary.find('.alert-main').css({
                    	'margin-top': '-150px'
                    });
                    setTimeout(function() {
                    	_alert.temporary.css('display', 'none');
                    	_alert.temporary.remove();
                    	_alert.temporary = {};
                    }, 500);*/
                },
            },
            _confirm = {
                temporary: {},
                html: function(setting) {
                    var html = '';
                    html += '<div id="alert" style="display :none" class="TA alert">';
                    html += '	<div class="alert-background"></div>';
                    html += '	<div class="alert-main TA ' + setting.className + '">';
                    html += '		<div class="alert-title">';
                    html += '			<p>' + setting.title + '</p>';
                    html += '			<div class="alert-close">×</div>';
                    html += '		</div>';
                    html += '		<div class="alert-body">';
                    html += '			<p>' + setting.text + '</p>';
                    html += '		</div>';
                    html += '		<div class="alert-footer">';
                    html += '			<div class="confirm">' + setting.confirm.text + '</div>';
                    html += '			<div class="cancel">' + setting.cancel.text + '</div>';
                    html += '		</div>';
                    html += '	</div>';
                    html += '</div>';
                    return html;
                },
                // 显示方法
                show: function(settingByUser) {
                    _confirm.temporary = '';
                    if ($('#alert')) {
                        $('#alert').remove();
                    }
                    var setting = {
                        className: '',
                        title: '提示',
                        text: '',
                        confirm: {
                            text: '确定',
                            event: false,
                        },
                        cancel: {
                            text: '取消',
                            event: false,
                        }
                    };
                    var option = $.extend({}, setting, settingByUser);
                    _confirm.temporary = $(_confirm.html(option));
                    _confirm.temporary.find('.alert-background').bind('click', function() {
                        if (option.cancel.event) {
                            option.cancel.event();
                        }
                        _confirm.hide();
                    });
                    _confirm.temporary.find('.alert-close').bind('click', function() {
                        if (option.cancel.event) {
                            option.cancel.event();
                        }
                        _confirm.hide();
                    });
                    _confirm.temporary.find('.cancel').bind('click', function() {
                        if (option.cancel.event) {
                            option.cancel.event();
                        }
                        _confirm.hide();
                    });
                    _confirm.temporary.css('display', 'block');
                    setTimeout(function() {
                        _confirm.temporary.css('opacity', '1');
                        _confirm.temporary.find('.alert-main').css({
                            'margin-top': '-100px'
                        });
                    }, 10);
                    _confirm.temporary.find('.confirm').bind('click', function() {
                        if (option.confirm.event) {
                            option.confirm.event();
                        }
                        _confirm.hide();
                    });
                    $('body').append(_confirm.temporary);
                },
                // 隐藏方法
                hide: function() {
                    _confirm.temporary.remove();
                    _confirm.temporary = {};
                    /*_confirm.temporary.css({
                    	'opacity': 0
                    });
                    _confirm.temporary.find('.alert-main').css({
                    	'margin-top': '-150px'
                    });
                    setTimeout(function() {
                    	_confirm.temporary.css('display', 'none');
                    	_confirm.temporary.remove();
                    	_confirm.temporary = {};
                    }, 500);*/
                },
            },
            _getDayTime = {
                init: function(isNow) {
                    if (isNow) {
                        return $.now();
                    } else {
                        var today = new Date(),
                            y = today.getFullYear(),
                            m = today.getMonth(),
                            d = today.getDate();
                        var dt = new Date(y + '/' + (m + 1) + '/' + d).getTime();
                        return dt;
                    }
                },
                byType: function(_option) {
                    var setting = {
                        haveTime: false,
                        haveSeconds: false,
                        type: '/'
                    };
                    var option = $.extend({}, setting, _option);

                    var time = new Date();
                    if (option.type == '中') {
                        var _date = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
                    } else {
                        var connectorText = option.type;
                        var _date = time.getFullYear() + connectorText + (time.getMonth() + 1) + connectorText + time.getDate();
                    }
                    if (option.haveTime) {
                        if (option.type == '中') {
                            var $date = time.getHours() + '时' + (time.getMinutes() + 1) + '分';
                        } else {
                            var $date = time.getHours() + ':' + (time.getMinutes() + 1) + ':' + (option.haveSeconds ? time.getSeconds() : '');
                        }
                        var DateStr = _date + ' ' + $date;
                    } else {
                        var DateStr = _date;
                    }
                    return DateStr;
                },
            },
            _jude = (function() {
                var phone = /^[1][0-9]{10}$/;
                var bankNum = /^\d{16}|\d{19}$/;
                var allChinese = /^([\u4E00-\u9FA5]+，?)+$/;
                var idCardNum1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
                var idCardNum2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
                var special = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
                special.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
                special.push("administrators", "administrator", "管理员", "系统管理员", "admin");
                special.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
                var _url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
                var emall = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;

                var haveChinese = "[\\u4E00-\\u9FFF]+";
                var _isNull = "^[ ]+$";
                var _isNumber = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
                var _isInteger = /^[0-9]*$/;
                var _telephone = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
                return {
                    isNumber: function(str) {
                        var re = new RegExp(_isNumber);
                        return re.test(str) ? true : false;
                    },
                    isTelephone: function(str) {
                        var re = new RegExp(_telephone);
                        return re.test(str) ? true : false;
                    },
                    isInteger: function(str) {
                        var re = new RegExp(_isInteger);
                        return re.test(str) ? true : false;
                    },
                    isNull: function(str) {
                        // 如果全是空返回false
                        if (str == "" || str == undefined || str == null) return false;
                        var regu = "^[ ]+$";
                        var re = new RegExp(regu);
                        return !re.test(str);
                    },
                    isPhone: function(str) {
                        // 手机号格式正确返回 true;
                        var re = new RegExp(phone);
                        return re.test(str) ? true : false;
                    },
                    isAllChinese: function(str) {
                        // 全部为中文返回 true;
                        var re = new RegExp(allChinese);
                        return re.test(str) ? true : false;
                    },
                    isHaveChinese: function(str) {
                        // 含有中文返回 true;
                        var re = new RegExp(haveChinese);
                        return re.test(str) ? true : false;
                    },
                    isIdCard: function(str) {
                        // 身份证号正确 返回 true;
                        var re1 = new RegExp(idCardNum1);
                        var re2 = new RegExp(idCardNum2);
                        return re1.test(str) || re2.test(str) ? true : false;
                    },
                    isSpecial: function(str) {
                        // 含有特殊字符返回 true;
                        str = str.toLowerCase();
                        for (var i = 0; i < special.length; i++) {
                            if (str.indexOf(special[i]) >= 0) {
                                return false;
                            }
                        }
                        return true;
                    },
                    isUrl: function(str) {
                        // URL 格式正确返回 true;
                        var re = new RegExp(_url);
                        return re.test(str) ? true : false;
                    },
                    isEmail: function(str) {
                        // Email 格式正确返回 true;
                        var re = new RegExp(emall);
                        return re.test(str) ? true : false;
                    },
                    isDate: function(str) {
                        if (str == "") return false;
                        str = str.replace(/-/g, "/").replace(/日/g, "/").replace(/月/g, "/").replace(/年/g, "/");
                        var d = new Date(str);
                        if (isNaN(d)) return false;
                        var arr = str.split("/");
                        return ((parseInt(arr[0], 10) == d.getFullYear()) && (parseInt(arr[1], 10) == (d.getMonth() + 1)) && (parseInt(arr[2], 10) == d.getDate()));
                    },
                }
            })(),
            _Storage = {
                set: function(key, data) {
                    return $$.localStorage.setItem(key, window.JSON.stringify(data));
                },
                get: function(key) {
                    return eval('(' + $$.localStorage.getItem(key) + ')');
                },
                remove: function(key) {
                    return $$.localStorage.removeItem(key);
                }
            },
            _formatting = {
                CRMList: function(value) {
                    var data = [];
                    for (var i = 0; i < value.length; i++) {
                        var itemValue = value[i];
                        var itemData = {};
                        itemData.id = itemValue.id;
                        for (var d = 0; d < itemValue.attributes.length; d++) {
                            var item = itemValue.attributes[d];
                            itemData[item.name] = item.value;
                        }
                        data.push(itemData);
                    };
                    return data;
                },
                CRMValue: function(value) {
                    var data = {};
                    data.id = value[0].id;
                    for (var i = 0; i < value[0].attributes.length; i++) {
                        var item = value[0].attributes[i];
                        data[item.name] = item.value;
                    }
                    return data;
                },
                CRMOptions: function(value) {
                    var data = [];
                    for (var i = 0; i < value.options.length; i++) {
                        var item = value.options[i];
                        item = {
                                "name": item.split(':')[1],
                                "value": item.split(':')[0],
                            },
                            data.push(item);
                    };
                    return data;
                },
                DateTime: function(_option) {
                    var setting = {
                        str: '',
                        type: '/',
                        haveTime: false,
                    }
                    var option = $.extend({}, setting, _option);

                    function errorEvent() {
                        console.error('DateTime Error : This is not time string');
                        return 'error';
                    }
                    if (!option.str) {
                        errorEvent();
                        return;
                    }
                    var time = new Date(option.str);
                    if (time) {
                        if (option.type == '中') {
                            var _date = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
                        } else {
                            var connectorText = option.type;
                            var _date = time.getFullYear() + connectorText + (time.getMonth() + 1) + connectorText + time.getDate();
                        }
                        if (option.haveTime) {
                            if (option.type == '中') {
                                var $date = time.getHours() + '时' + (time.getMonth() + 1) + '分';
                            } else {
                                var $date = time.getHours() + ':' + (time.getMonth() + 1);
                            }
                            var DateStr = _date + ' ' + $date;
                        } else {
                            var DateStr = _date;
                        }
                        return DateStr;
                    } else {
                        errorEvent();
                        return;
                    }
                },
                UrlValue: function() {
                    var url = window.location.search;
                    var data = {};
                    if (url.indexOf("?") != -1) {
                        var str = url.substr(1)
                        strs = str.split("&");
                        for (i = 0; i < strs.length; i++) {
                            data[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                        };
                        return data;
                    } else {
                        console.error('Error From common.formatting.UrlValue : There is no information in the url');
                        return {};
                    };
                },
                ExDate: function(format, str) {
                    var errorEvent = function() {
                        console.error('ExDate : The string is not a valid time');
                        return 'error';
                    };
                    var formatStr = format || 'yyyy-MM-DD';
                    if (format == '中' || format == 'zh') {
                        formatStr = 'yyyy年M月D日';
                    } else if (format == 'ZH') {
                        formatStr = 'yyyy年MM月DD日';
                    } else if (format == 'ZH:') {
                        formatStr = 'yyyy年MM月DD日 HH时mm分ss秒';
                    } else if (format == 'zh:') {
                        formatStr = 'yyyy年M月D日 H时m分s秒';
                    } else if (format == '-') {
                        formatStr = 'yyyy-MM-DD';
                    } else if (format == '/') {
                        formatStr = 'yyyy/MM/DD';
                    };
                    if (str instanceof Date) {
                        var date = str;
                    } else {
                        if (str) {
                            if (!isNaN(str)) {
                                var date = new Date(str);
                            } else {
                                str = str.replace(/年/g, '/').replace(/月/g, '/').replace(/日/g, '').replace(/时/g, ':').replace(/分/g, ':').replace(/秒/g, '');
                                str = str.replace(/-/g, '/');
                                var date = new Date(str);
                            }

                        } else {
                            if (formatStr == 'z') {
                                var cancelData = new Date();
                                var date = new Date(cancelData.getFullYear() + '/' + (cancelData.getMonth() + 1) + '/' + cancelData.getDate());
                                formatStr = 'Z';
                            } else {
                                var date = new Date();
                            }
                        };
                    };
                    if (date == 'Invalid Date') {
                        errorEvent();
                        return 'error';
                    };
                    var zeroize = function(value, length) {
                        if (!length) length = 2;
                        value = String(value);
                        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                            zeros += '0';
                        }
                        return zeros + value;
                    };
                    return formatStr.replace(/d{1,2}|D{1,2}|m{1,2}|yy(?:yy)|YY(?:YY)|([hHMstTZ]){1,2}/g, function($0) {
                        switch ($0) {
                            case 'd':
                                return date.getDate();
                            case 'dd':
                                return zeroize(date.getDate());
                            case 'D':
                                return date.getDate();
                            case 'DD':
                                return zeroize(date.getDate());
                            case 'M':
                                return date.getMonth() + 1;
                            case 'MM':
                                return zeroize(date.getMonth() + 1);
                            case 'yy':
                                return String(date.getFullYear()).substr(2);
                            case 'yyyy':
                                return date.getFullYear();
                            case 'YY':
                                return String(date.getFullYear()).substr(2);
                            case 'YYYY':
                                return date.getFullYear();
                            case 'h':
                                return date.getHours() % 12 || 12;
                            case 'hh':
                                return zeroize(date.getHours() % 12 || 12);
                            case 'H':
                                return date.getHours();
                            case 'HH':
                                return zeroize(date.getHours());
                            case 'm':
                                return date.getMinutes();
                            case 'mm':
                                return zeroize(date.getMinutes());
                            case 's':
                                return date.getSeconds();
                            case 'ss':
                                return zeroize(date.getSeconds());
                            case 'tt':
                                return date.getHours() < 12 ? 'am' : 'pm';
                            case 'TT':
                                return date.getHours() < 12 ? 'AM' : 'PM';
                            case 'T':
                                return date.getHours() < 12 ? '上午' : '下午';
                            case 'Z':
                                return date.getTime();
                            default:
                                return $0.substr(1, $0.length - 2);
                        }
                    })
                }
            },
            _request = (function() {
                var _v = {
                    useLoading: true,
                    temporary: 'none',
                };
                var _f = {
                    Ajax: function(data, _type) {
                        if (_f.validation()) {
                            if (!data.unLoading && _v.useLoading) {
                                _f.loading.show();
                            };
                            $.ajax({
                                // url: "http://192.168.1.102:8090" + data.url,
                                url: data.url,
                                data: data.data,
                                type: _type,
                                success: function(result) {
                                    if (!data.unLoading && _v.useLoading) {
                                        _f.loading.hide();
                                    }
                                    data.success(result);
                                },
                                error: function(xhr, status, error) {
                                    if (!data.unLoading && _v.useLoading) {
                                        _f.loading.hide();
                                    }
                                    if (data.error) {
                                        data.error(xhr, status, error);
                                    } else {
                                        _alert.show({
                                            'text': '网络不给力,请刷新页面重试'
                                        });
                                        console.error(xhr, status, error);
                                    }
                                }
                            });
                        };
                    },
                    GET: function(data) {
                        _f.Ajax(data, 'GET');
                    },
                    POST: function(data) {
                        _f.Ajax(data, 'POST');
                    },
                    DELETE: function(data) {
                        _f.Ajax(data, 'DELETE');
                    },
                    PUT: function(data) {
                        _f.Ajax(data, 'PUT');
                    },
                    validation: function() {
                        return true;
                        if ($$.isChecked) {
                            // 验证登录是否过期
                            if ($$.permissions.checkDayTime()) {
                                return true;
                            } else {
                                $$.common.alert({
                                    text: '登录已过期,请重新登录'
                                }, $$.permissions.logout, $$.permissions.logout);
                                return false;
                            }
                        } else {
                            // 不验证
                            return true;
                        };
                    },
                    loading: {
                        show: function() {
                            if (_v.useLoading && _v.temporary == 'none') {
                                _v.temporary = $('<div id="loading" class="TA"></div>');
                                $('body').append(_v.temporary);
                                if (_v.temporary != 'none') {
                                    _v.temporary.css('opacity', '1');
                                }
                            }
                        },
                        hide: function() {
                            if (_v.useLoading) {
                                if (_v.temporary != 'none') {
                                    _v.temporary.remove();
                                    _v.temporary = 'none';
                                }
                            }
                        },
                        usedShow: function() {
                            _f.loading.show();
                            _v.useLoading = false;
                        },
                        usedHide: function() {
                            _v.useLoading = true;
                            _f.loading.hide();
                        },
                    },
                };
                return {
                    GET: _f.GET,
                    POST: _f.POST,
                    DELETE: _f.DELETE,
                    PUT: _f.PUT,
                    loading: _f.loading,
                }
            })(),
            _dialog = (function() {
                var html = function(data) {
                        var html = '';
                        html += '<div id="dialog" class="dialog TA">';
                        html += '	<div class="dialog-bg"></div>';
                        html += '	<div class="dialog-main TA">';
                        html += '		<div class="dialog-title cl">';
                        html += '			<div class="dialog-title-text"></div>';
                        html += '			<div class="dialog-close"><img src="/libs/img/close2.png" alt="" /></div>';
                        html += '		</div>';
                        html += '		<div class="dialog-body">';
                        html += '		</div>';
                        html += '		<div class="dialog-footer">';
                        html += '			<div class="btn btn-blue confirm">提交</div>';
                        html += '			<div class="btn btn-gray cancel">取消</div>';
                        html += '		</div>';
                        html += '		<div class="dialog-footer-text">严禁储存、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息</div>';
                        html += '	</div>';
                        html += '</div>';
                        return html;
                    },
                    temporary = 'none',
                    init = function(data) {
                        if (temporary == 'none') {
                            temporary = $(html());
                            temporary.find('.dialog-main').addClass(data.className);
                            temporary.find('.dialog-title-text').text(data.title);
                            temporary.find('.confirm').addClass(data.confirm.className).text(data.confirm.text);
                            temporary.find('.cancel').addClass(data.cancel.className).text(data.cancel.text);
                            temporary.find('.dialog-body').append(data.template);
                            if (data.cancel.hide) {
                                temporary.find('.cancel').css('display', 'none');
                            };
                            if (data.confirm.hide) {
                                temporary.find('.confirm').css('display', 'none');
                            };
                            if (data.cancel.hide && data.confirm.hide) {
                                temporary.find('.dialog-footer-text').css('display', 'none');
                            };
                            temporary.find('.dialog-bg').click(function() {
                                if (data.cancel.event) {
                                    data.cancel.event();
                                }
                                hide();
                            });
                            temporary.find('.dialog-close').click(function() {
                                if (data.cancel.event) {
                                    data.cancel.event();
                                }
                                hide();
                            });
                            temporary.find('.cancel').click(function() {
                                if (data.cancel.event) {
                                    data.cancel.event();
                                }
                                hide();
                            });
                            temporary.find('.confirm').click(function() {
                                if (data.confirm.event) {
                                    data.confirm.event(temporary, hide);
                                } else {
                                    hide();
                                }
                            });
                            $('body').append(temporary);
                            show();
                            return true;
                        } else {
                            console.error('dialog error : 对象已存在');
                            return false;
                        }
                    },
                    hide = function() {
                        if (temporary != 'none') {
                            temporary.css({
                                'opacity': 0
                            });
                            setTimeout(function() {
                                temporary.remove();
                                temporary = 'none';
                            }, 500);
                        } else {
                            console.error('dialog error : 对象不存在');
                        }
                    },
                    show = function(data) {
                        setTimeout(function() {
                            temporary.css({
                                'opacity': 1
                            });
                        }, 10);
                    };
                return {
                    init: function(data) {
                        var setting = {
                            className: '',
                            title: '标题',
                            template: 'test : <input type="text" class="test" value="" style="border : 1px solid #ccc" />',
                            confirm: {
                                event: function(template, hide) {
                                    var testText = template.find('.test').val();
                                    if (testText == '') {
                                        _alert.show({
                                            text: 'Must be input line of text'
                                        });
                                    } else {
                                        _alert.show({
                                            text: 'this is a test :' + testText
                                        }, function() {
                                            hide();
                                        });
                                    }
                                },
                                text: '确定',
                                className: '',
                                hide: false,
                            },
                            cancel: {
                                event: false,
                                text: '取消',
                                className: '',
                                hide: false,
                            },
                        }
                        var option = $.extend({}, setting, data);
                        if (init(option)) {
                            return 'init success'
                        } else {
                            return 'init error'
                        };

                    },
                    hide: hide,
                }
            })(),
            _pagingLink = (function() {
                var template = function(element, allPages, count, index, _event, data) {
                        element = $(element).empty('');
                        index = parseInt(index);
                        var pages = Math.ceil(parseInt(allPages) / parseInt(count));
                        if (pages <= 1 && index == 1) {
                            return;
                        }
                        //  上一页
                        var prev = '';
                        if (index > 1) {
                            prev = $('<span class="prev" >上一页</span>');
                            prev.click(function() {
                                var newData = $.extend(true, {}, data);
                                newData.data.index = parseInt(newData.data.index) - 1;
                                init(newData);
                            });
                        } else {
                            element.remove('.prev');
                            prev = $('<span class="disabled">上一页</span>');
                        };
                        element.append(prev);
                        // 中间页
                        if (index != 1 && index >= 4 && pages != 4) {
                            var first = $('<span class="tcdNumber">' + 1 + '</span>');
                            first.click(function() {
                                var newData = $.extend(true, {}, data);
                                newData.data.index = 1;
                                init(newData);
                            });
                            element.append(first);
                        };
                        if (index - 2 > 2 && index <= pages && pages > 5) {
                            element.append('<span class="disabled">...</span>');
                        };
                        var start = index - 2,
                            end = index + 2;
                        if ((start > 1 && index < 4) || index == 1) {
                            end++;
                        };
                        if (index > pages - 4 && index >= pages) {
                            start--;
                        };

                        function middleButton(index, element) {
                            element.bind('click', function() {
                                var newData = $.extend(true, {}, data);
                                newData.data.index = parseInt(index);
                                init(newData);
                            });
                        };
                        for (; start <= end; start++) {
                            if (start <= pages && start >= 1) {
                                if (start != index) {
                                    var middle = $('<span class="tcdNumber">' + start + '</span>');
                                    middleButton(start, middle);
                                    element.append(middle);
                                } else {
                                    element.append('<span class="current">' + start + '</span>');
                                }
                            }
                        };
                        if (index + 2 < pages - 1 && index >= 1 && pages > 5) {
                            element.append('<span class="disabled">...</span>');
                        };
                        if (index != pages && index < pages - 2 && pages != 4) {
                            var last = $('<span class="tcdNumber">' + pages + '</span>');
                            last.click(function() {
                                var newData = $.extend(true, {}, data);
                                newData.data.index = parseInt(pages);
                                init(newData);
                            });
                            element.append(last);
                        };
                        // 下一页
                        var next = '';
                        if (index < pages) {
                            next = $('<span class="next">下一页</span>');
                            next.click(function() {
                                var newData = $.extend(true, {}, data);
                                newData.data.index = parseInt(newData.data.index) + 1;
                                init(newData);
                            });
                        } else {
                            element.remove('.next');
                            next = $('<span class="disabled">下一页</span>');
                        }
                        element.append(next);
                    },
                    init = function(option) {
                        option.event(option.data, function(result) {
                            option.success(result);
                            template(option.element, result[option.allPageKey], option.data.count, option.data.index, option.event, option);
                        });
                    };
                return {
                    init: function(option) {
                        // option = {
                        // 	element: '#paging',
                        // 	data: {
                        // 		count: '10',
                        // 		index: '1',
                        // 	},
                        // 	allPageKey: 'allPages',
                        // 	event: function(data, success) {
                        // 		success({
                        // 			allPages: '100',
                        // 		});
                        // 	},
                        // 	success: function(result) {
                        // 		console.log(result);
                        // 	}
                        // };
                        init(option);
                    }
                }
            })(),
            _pagingLinkForWap = (function() {
                var pageOption = function(data, index) {
                        var html = '';
                        html += '<option value="' + data + '" ' + (data == index ? 'selected="selected"' : '') + '>' + data + '</option>';
                        return html;
                    },
                    hasPaging = function(totalCount, data) {
                        var pages = Math.ceil(parseInt(totalCount) / parseInt(data.count));
                        if (pages <= 1 && data.index == 1) {
                            return false;
                        } else {
                            return pages;
                        };
                    },
                    template = function(option, pages) {
                        var passingData = $.extend(true, {}, option);
                        var element = $(passingData.element).empty('');
                        var index = parseInt(passingData.data.index);

                        if (!pages) {
                            return;
                        };
                        // 上一页
                        var prev = '';
                        if (index > 1) {
                            prev = $('<span class="prev current" >上一页</span>');
                            prev.unbind().bind('click', function() {
                                var newData = $.extend(true, {}, option);
                                newData.data.index = parseInt(newData.data.index) - 1;
                                init(newData);
                            });
                        } else {
                            prev = $('<span class="disabled">上一页</span>');
                        };
                        element.append(prev);
                        // select
                        var html = $('<div class="select">当前第<span><select></select></span>页</div>');

                        for (var i = 0; i < pages; i++) {
                            html.find('select').append(pageOption(i + 1, index));
                        };

                        html.find('select').change(function() {
                            var newData = $.extend(true, {}, option);
                            newData.data.index = $(this).find('option:selected').val();
                            init(newData);
                        });
                        element.append(html);
                        // 下一页
                        var next = '';
                        if (index < pages) {
                            next = $('<span class="next current">下一页</span>');
                            next.click(function() {
                                var newData = $.extend(true, {}, option);
                                newData.data.index = parseInt(newData.data.index) + 1;
                                init(newData);
                            });
                        } else {
                            next = $('<span class="disabled">下一页</span>');
                        }
                        element.append(next);
                    },
                    init = function(option) {
                        // option = {
                        // 	// 分页加载的DIV
                        // 	element: '#paging',

                        // 	data: {
                        // 		count: '10',
                        // 		index: '1',
                        // 	},
                        // 	// 返回页面总数,result为AJAX成功返回后的结果
                        // 	// 此参数需要自行定义
                        // 	totalCountEvent: function(result){
                        // 		var allpage = 1;
                        // 		if(result.value.length != 0){
                        // 			allpage = result.value[0].totalCount;
                        // 		}
                        // 		return allpage;
                        // 	},

                        // 	ajaxEvent: function(data, success) {
                        // 		success({
                        // 			allPages: '100',
                        // 		});
                        // 	},
                        // 	success: function(result) {
                        // 		console.log(result);
                        // 	}
                        // };
                        option.ajaxEvent(option.data, function(result) {
                            var totalCount = option.totalCountEvent(result);
                            var pages = hasPaging(totalCount, option.data)
                            option.success(result, pages);
                            template(option, pages);
                        })
                    };
                return {
                    init: init
                }
            })(),
            _downFile = function(fileUrl) {
                var arrUrl = fileUrl.split("/");
                var strPage = arrUrl[arrUrl.length - 1];
                var fileType = strPage.split('.')[strPage.split('.').length - 1];
                var fileTypeArray = ['doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
                var imagesTypeArray = ['jpg', 'jpeg', 'png', 'gif'];
                var docTypeArray = ['doc', 'docx'];
                if ($.inArray(fileType, fileTypeArray) == -1) {
                    console.error('downFile : file type error');
                    return;
                };
                if ($.inArray(fileType, imagesTypeArray) != -1) {
                    window.open(fileUrl);
                };
                if ($.inArray(fileType, fileTypeArray) != -1) {
                    $iframe = $("<iframe>").hide().prop("src", fileUrl).appendTo("body");
                };
            },
            _readIdCard = (function() {
                var _v = {
                    tpl: false,
                };
                var _t = function() {
                    var html = '';
                    html += '<form id="form1" runat="server">';
                    html += '	<object classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7" id="CVR_IDCard" name="CVR_IDCard" width="0" height="0"></object>';
                    html += '</form>';
                    return html;
                };
                var _f = {
                    init: function() {
                        if (!_v.tpl) {
                            _v.tpl = _t();
                            console.log(_v.tpl);
                            $('body').append(_v.tpl);
                        };
                    },
                    readIdCard: function(success) {
                        _request.loading.show();
                        _f.init();
                        try {
                            var CVR_IDCard = document.getElementById("CVR_IDCard");
                            var strReadResult = CVR_IDCard.ReadCard();

                            if (strReadResult == '0') {
                                success({
                                    name: CVR_IDCard.Name,
                                    id: CVR_IDCard.CardNo,
                                    nation: CVR_IDCard.Nation,
                                });
                                _request.loading.hide();
                            } else {
                                _alert.show({
                                    'text': '读卡失败,请重试'
                                });
                                _request.loading.hide();
                            }
                        } catch (e) {
                            _alert.show({
                                'text': '浏览器不支持设备'
                            });
                            _request.loading.hide();
                        }
                    }
                };
                return {
                    read: _f.readIdCard
                }
            })();
        return {
            alert: _alert.show,
            getDayTime: _getDayTime.init,
            jude: _jude,
            storage: _Storage,
            formatting: _formatting,
            formatDate: _formatting.DateTime,
            dialog: _dialog.init,
            dialogHide: _dialog.hide,
            GET: _request.GET,
            POST: _request.POST,
            DELETE: _request.DELETE,
            PUT: _request.PUT,
            loading: _request.loading,
            readIdCard: _readIdCard.read,
            paging: _pagingLink.init,
            wapPaging: _pagingLinkForWap.init,
            creatTime: _getDayTime.byType,
            download: _downFile,
            confirm: _confirm.show,
        }
    })();
})(jQuery, window);



function banBackSpace(e) {
    var ev = e || window.event; //获取event对象 
    var obj = ev.target || ev.srcElement; //获取事件源 

    var t = obj.type || obj.getAttribute('type'); //获取事件源类型 

    //获取作为判断条件的事件类型 
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况 
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;

    if (vReadOnly == 'readonly') {
        vReadOnly = true;
    };

    vEnabled = (vEnabled == null) ? true : vEnabled;

    //当敲Backspace键时，事件源类型为密码或单行、多行文本的， 
    //并且readonly属性为true或enabled属性为false的，则退格键失效 
    var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true : false;

    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
    var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;

    //判断 
    if (flag2) {
        return false;
    }
    if (flag1) {
        return false;
    }
};

//禁止后退键 作用于Firefox、Opera 
document.onkeypress = banBackSpace;
//禁止后退键 作用于IE、Chrome 
document.onkeydown = banBackSpace;