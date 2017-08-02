var Api = common;
var data = {
    event: [{
        type: 'ajax',
        name: 'get',
        setting: {
            url: 'index.json',
            type: 'GET',
            data: {},
            auto: true,
            useData: true,
            beforeEvent: function(data, callback) { // ajax 执行前进行回调
                callback(data); // 回调函数
            },
            afterEvent: {
                success: function(data, callback) { // ajax 执行后成功回调
                    callback(data); // 回调函数
                },
                error: function(data, callback) { // ajax 执行后失败回调
                    callback(data); // 回调函数
                },
            }
        }
    }, {
        type: 'ajax',
        name: 'updata',
        setting: {
            url: 'index2.json',
            type: 'GET',
            data: {},
            auto: false,
            useData: true,
            beforeEvent: function(data, callback) { // ajax 执行前进行回调
                callback(data); // 回调函数
            },
            afterEvent: {
                success: function(data, callback) { // ajax 执行后成功回调
                    callback(data); // 回调函数
                },
                error: function(data, callback) { // ajax 执行后失败回调
                    callback(data); // 回调函数
                },
            }
        }
    }],
    file: [{
        type: 'input',
        name: 'name',
        setting: {
            mustBe: true, // 是否必填
            filter: [], // 过滤方法 (set value 时进行操作)
            label: '姓名 :', // 表单标签名称
            displayName: '姓名', // 提示信息名称
            readonly: true, // 是否只读
            judes: ['notNull'], // 验证条件 (change value 时进行操作)
        },
    }, {
        type: 'input',
        name: 'phone',
        setting: {
            mustBe: true, // 是否必填
            filter: [], // 过滤方法 (set value 时进行操作)
            label: '电话 :', // 表单标签名称
            displayName: '电话', // 提示信息名称
            readonly: false, // 是否只读
            judes: ['notNull', 'isPhone'], // 验证条件 (change value 时进行操作)
        },
    }, {
        type: 'input',
        name: 'age',
        setting: {
            mustBe: true, // 是否必填
            filter: [], // 过滤方法 (set value 时进行操作)
            label: '年龄 :', // 表单标签名称
            displayName: '年龄', // 提示信息名称
            readonly: false, // 是否只读
            judes: ['notNull', 'isInteger'], // 验证条件 (change value 时进行操作)
        },
    }, {
        name: 'update',
        type: 'button',
        setting: {
            label: 'OK',
            clickEvent: 'updata',
        },
    }],
    layout: [{
        type: 'block',
        name: 'box',
        setting: {
            className: null,
            state: 'show',
            event: function() {
                return true;
            },
            subset: ['name', 'box1', 'box2', 'update'],
            parent: 'parent',
        },
    }, {
        type: 'block',
        name: 'box1',
        setting: {
            className: null,
            template: null,
            state: 'show',
            event: 'select : choose : 1',
            subset: ['age'],
            parent: 'box',
        },
    }, {
        type: 'block',
        name: 'box2',
        setting: {
            className: null,
            template: null,
            state: 'hide',
            event: 'select : choose : 2',
            subset: ['phone'],
            parent: 'box',
        },
    }]
};

// , {
//         type: 'select',
//         name: 'choose',
//         setting: {
//             mustBe: true, // 是否必填
//             label: '电话 :', // 表单标签名称
//             displayName: '电话', // 提示信息名称
//             readonly: false, // 是否只读
//             data: [{
//                 name: 'age',
//                 value: '1'
//             }, {
//                 name: 'phone',
//                 value: '2'
//             }],
//         },
//     }

(function($, win, doc, undefined) {
    // 定义错误提示信息
    var _j = {
            isNumber: {
                expression: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                text: '只能为数字',
                perform: function(str) {
                    var re = new RegExp(_j.isNumber.expression);
                    return re.test(str) ? true : false;
                }
            },
            isBankNum: {
                expression: /^\d{16}|\d{19}$/,
                text: '格式错误',
                perform: function(str) {
                    var re = new RegExp(_j.isBankNum.expression);
                    return re.test(str) ? true : false;
                }
            },
            isTelephone: {
                expression: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/,
                text: '格式错误',
                perform: function(str) {
                    var re = new RegExp(_j.isTelephone.expression);
                    return re.test(str) ? true : false;
                }
            },
            isInteger: {
                expression: /^[0-9]*$/,
                text: '只能为正整数',
                perform: function(str) {
                    var re = new RegExp(_j.isInteger.expression);
                    return re.test(str) ? true : false;
                }
            },
            notNull: {
                expression: "^[ ]+$",
                text: '不能为空',
                perform: function(str) {
                    if (str == "" || str == undefined || str == null || str == NaN) return false;
                    var re = new RegExp(_j.notNull.expression);
                    return !re.test(str);
                }
            },
            isPhone: {
                expression: /^[1][0-9]{10}$/,
                text: '格式错误',
                perform: function(str) {
                    var re = new RegExp(_j.isPhone.expression);
                    return re.test(str) ? true : false;
                }
            },
            isAllChinese: {
                expression: /^([\u4E00-\u9FA5]+，?)+$/,
                text: '只能为中文',
                perform: function(str) {
                    var re = new RegExp(_j.isAllChinese.expression);
                    return re.test(str) ? true : false;
                }
            },
            isHaveChinese: {
                expression: "[\\u4E00-\\u9FFF]+",
                text: '中含有汉字',
                perform: function(str) {
                    var re = new RegExp(_j.isHaveChinese.expression);
                    return re.test(str) ? true : false;
                }
            },
            isIdCard: {
                expression: [/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/, /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/],
                text: '输入错误',
                perform: function(str) {
                    var re1 = new RegExp(_j.isIdCard.expression[0]);
                    var re2 = new RegExp(_j.isIdCard.expression[1]);
                    return re1.test(str) || re2.test(str) ? true : false;
                }
            },
            isSpecial: {
                expression: ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")", ":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//", "administrators", "administrator", "管理员", "系统管理员", "admin", "select", "delete", "update", "insert", "create", "drop", "alter", "trancate"],
                text: '不能包含特殊字符',
                perform: function(str) {
                    str = str.toLowerCase();
                    for (var i = 0; i < _j.isSpecial.expression.length; i++) {
                        if (str.indexOf(_j.isSpecial.expression[i]) >= 0) {
                            return false;
                        }
                    }
                    return true;
                }
            },
            isUrl: {
                expression: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
                text: '格式错误',
                perform: function(str) {
                    var re = new RegExp(_j.isUrl.expression);
                    return re.test(str) ? true : false;
                }
            },
            isEmail: {
                expression: /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
                text: '格式错误',
                perform: function(str) {
                    var re = new RegExp(_j.isEmail.expression);
                    return re.test(str) ? true : false;
                }
            },
            type: function(obj, type) {
                var result = null;
                switch (type) {
                    case "string":
                        result = (typeof obj == 'string') && obj.constructor == String;
                        break;
                    case "function":
                        result = (typeof obj == 'function') && obj.constructor == Function;
                        break;
                    case "array":
                        result = (typeof obj == 'object') && obj.constructor == Array;
                        break;
                    case "number":
                        result = (typeof obj == 'number') && obj.constructor == Number;
                        break;
                    case "date":
                        result = (typeof obj == 'object') && obj.constructor == Date;
                        break;
                    case "object":
                        result = (typeof obj == 'object') && obj.constructor == Object;
                        break;
                    default:
                        result = (typeof obj == 'string') && obj.constructor == String;
                        break;
                };
                return result;
            },
        },
        _f = {
            checkNamespace: function(str, namespace) {
                if ($.inArray(str, namespace) == -1) {
                    namespace.push(str);
                    return true
                } else {
                    console.error('警告 : 元素重名 [' + str + ']');
                    return false
                }
            },
            initFile: function(data, namespace, events) {
                var files = {};
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    _f.checkNamespace(item.name, namespace);
                    files[item.name] = new _t[item.type](item.setting, events);
                };
                return files;
            },
            initEvent: function(data, namespace) {
                var events = {};
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    _f.checkNamespace(item.name, namespace);
                    events[item.name] = new _e[item.type](item.setting);
                };
                return events;
            },
            initLayout: function(data, namespace) {
                var layouts = {};
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    _f.checkNamespace(item.name, namespace);
                    layouts[item.name] = new _t[item.type](item.setting);
                };
                return layouts;
            },
            renderHtml: function($files, $layouts, layoutArray, $this) {
                // 合并元素
                for (var item in $layouts) {
                    if ($layouts.hasOwnProperty(item)) {
                        var element = $layouts[item];
                        $files[item] = element;
                    }
                };
                var parent = null;
                for (var i = 0; i < layoutArray.length; i++) {
                    var element = layoutArray[i];
                    if (element.setting.parent == 'parent') {
                        parent = element.name;

                        break;
                    };
                };
                var form = $files[parent];
                _f.renderLayout(form, $files);
                $this.append($files[parent].render());
            },
            renderLayout: function(data, $files) {
                for (var i = 0; i < data.options.subset.length; i++) {
                    var element = data.options.subset[i];
                    if ($files[element].constructor() == 'block') {
                        _f.renderLayout($files[element], $files);
                    };
                    data.append($files[element].render());
                }
            },
            autoEvent: function(event, eventArray) {
                var eventName = null;
                for (var i = 0; i < eventArray.length; i++) {
                    var element = eventArray[i];
                    if (element.setting.auto) {
                        eventName = element.name;
                        break
                    };
                };
                if (eventName) {
                    event[eventName].perform();
                };
            },
            bindEventToFile: function(event, file) {
                for (var item in event) {
                    if (event.hasOwnProperty(item)) {
                        var element = event[item];
                        element.setFiles(file);
                    }
                }
            }
        },
        _t = {
            input: function(opt, events) {
                var html = '';
                html += '	<div class="files-item">';
                html += '		<label class="label"></label>';
                html += '		<input type="text">';
                html += '		<div class="error" style="display:none"></div>';
                html += '	</div>';
                html = $(html);
                html.find('label').text(opt.label);
                this.HTML = html;
                this.options = opt;
            },
            button: function(opt, events) {
                this.HTML = $('<div class="files-item"><button></button></div>');
                this.HTML.find('button').text(opt.label);
                this.options = opt;
                this.events = events;
            },
            block: function(opt, files) {
                this.HTML = $('<div class="block' + (opt.className ? ' ' + opt.className : '') + '"></div>');
                this.options = opt;
            },
            select: function(opt, events) {
                this.HTML = $('<div class="files-item"><select></select></div>');
                this.options = opt;
            },
        };
    _t.input.prototype = {
        // 渲染html
        render: function() {
            var $this = this;
            $this.HTML.unbind().bind('input propertychange', function() {
                $this.change($this);
            });
            $this.changeReadonly($this.options.readonly);
            return $this.HTML;
        },
        // 获取
        get: function() {
            return this.HTML.find('input').val()
        },
        // 赋值
        set: function(data) {
            this.HTML.find('input').val(data);
        },
        // 只读条件 (暂无调用接口,一次性属性)
        changeReadonly: function(isReadonly) {
            if (_j.type(isReadonly, 'function')) {
                this.HTML.find('input').attr("readonly", isReadonly());
            } else {
                this.HTML.find('input').attr("readonly", !!isReadonly);
            }
        },
        // 显示ERROR提示框
        showError: function(data) {
            this.HTML.find('.error').css('display', 'inline-block').text(data);
        },
        // 隐藏ERROR提示框
        hideError: function() {
            this.HTML.find('.error').css('display', 'none');
        },
        // 当内容改变时,执行事件(元素验证)
        change: function() {
            var value = this.get();
            var $this = this;
            // 建立提示信息文字
            var status = null;
            if ($this.options.judes) {
                // 获取每一项验证顺序
                for (var i = 0; i < $this.options.judes.length; i++) {
                    var item = $this.options.judes[i];
                    // 进行验证
                    if (!_j[item].perform(value)) {
                        // 输出错误信息
                        status = ($this.options.displayName || '') + _j[item].text;
                        break;
                    };
                }
            };
            // 显示错误信息
            if (status) {
                $this.showError(status);
            } else {
                $this.hideError();
            }
        },
        constructor: function() {
            return 'input'
        }
    };
    _t.select.prototype = {
        get: function() {
            return this.HTML.find('select').val()
        },
        // 赋值
        set: function(data) {
            // this.HTML.find('select').val(data);
        },
    };
    _t.button.prototype = {
        // 初始化表单条目
        render: function() {
            var $this = this;
            $this.HTML.unbind().bind('click', function() {
                $this.events[$this.options.clickEvent].perform();
            });
            return $this.HTML;
        },
        constructor: function() {
            return 'button'
        }
    };
    _t.block.prototype = {
        render: function() {
            if (this.options.state == 'show') {
                this.show();
            } else {
                this.hide();
            };
            return this.HTML;
        },
        append: function(data) {
            this.HTML.append(data);
        },
        show: function() {
            this.HTML.css('display', 'block');
        },
        hide: function() {
            this.HTML.css('display', 'none');
        },
        constructor: function() {
            return 'block'
        }
    };
    var _e = {
        default: function(data, callback) { // ajax 执行前进行回调
            callback(data); // 回调函数
        },
        ajax: function(opt) {
            this.defaults = {
                url: 'index.json',
                type: 'GET',
                data: {},
                auto: false,
                useData: true,
                beforeEvent: _e.default,
                afterEvent: {
                    success: _e.default,
                    error: _e.default,
                }
            };
            this.files = {};
            this.result = null;
            this.options = $.extend({}, this.defaults, opt);
        },
    };
    _e.ajax.prototype = {
        perform: function() {
            var $this = this;
            var data = $this.options.useData ? $this.options.data : $this.files;
            $this.options.beforeEvent(data, function(result) {
                Api.GET({
                    url: $this.options.url,
                    success: function(result) {
                        $this.options.afterEvent.success(result, function(result) {
                            $this.result = result;
                            $this.render();
                        });
                    },
                    error: function() {
                        $this.options.afterEvent.error(result, function(result) {
                            console.error('service error');
                        });
                    }
                });
            });
        },
        // 给表单元素赋值
        render: function() {
            for (var item in this.result) {
                if (this.result.hasOwnProperty(item)) {
                    this.files[item].set(this.result[item]);
                }
            }
        },
        getFilesData: function() {
            console.log(this.files);
        },
        setSetting: function(data) {
            this.options = data;
            this.perform();
        },
        setFiles: function(data) {
            this.files = data;
        }
    };

    $.fn.freedomForm = function(options) {
        var $this = this;
        var namespace = [],
            $events = _f.initEvent(options.event, namespace),
            $files = _f.initFile(options.file, namespace, $events),
            $layouts = _f.initLayout(options.layout, namespace);
        _f.bindEventToFile($events, $files);
        _f.renderHtml($files, $layouts, options.layout, $this);
        _f.autoEvent($events, options.event);
        return $events;
    };
})(jQuery, window, document);
var _data = $('#CRM').freedomForm(data);