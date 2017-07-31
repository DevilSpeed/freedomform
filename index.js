var Api = common;
var data = {
    events: [{
        type: 'api',
        name: 'get',
        setting: {
            url: 'index.json',
            AjaxType: 'GET',
            data: {},
        },
        auto: true,
    }, {
        type: 'api',
        name: 'put',
        setting: {
            url: 'index.json',
            AjaxType: 'GET',
            data: {},
            useData: false
        },
        beforeEvent: function(data) {
            console.log(data);
        }
    }],
    files: [{
        ajaxName: 'name',
        mustBe: true,
        label: '姓名 :',
        displayName: '姓名',
    }, {
        ajaxName: 'age',
        mustBe: true,
        filter: ['isInteger'],
        label: '年龄 :',
        displayName: '年龄',
        layout: 'block1',
    }, {
        ajaxName: 'phone',
        mustBe: true,
        filter: ['isPhone'],
        label: '电话 :',
        displayName: '电话',
        layout: 'block2',
    }],
    buttons: [{
        eventName: 'update',
        type: 'button',
        label: 'OK',
        clickEvent: 'put',
        disableEvent: function(files) {

        },
        layout: 'block1',
    }],
    layouts: [{
        type: 'block',
        name: 'block1',
        default: 'show'
    }, {
        type: 'block',
        name: 'block2',
        default: 'hide'
    }],
};
(function($, win, doc, undefined) {
    // 默认的调用事件
    var defaultEvent = function(result, success) {
        if (success) {
            success(result);
        };
    };
    // 定义错误提示信息
    var judeText = {
        isNumber: '只能为数字',
        isTelephone: '固定电话格式错误',
        isInteger: '只能为正整数',
        isNull: '不能为空',
        isPhone: '手机号格式错误',
        isAllChinese: '只能为中文',
        isHaveChinese: '不能含有汉字',
        isIdCard: '身份证号输入错误',
        isSpecial: '不能包含特殊字符',
        isUrl: 'URL格式错误',
        isEmail: 'EMAIL格式错误',
    };
    // 根据类型判断输出HTML
    var template = function(opt) {
        var html = '';
        switch (opt.type) {
            case 'input':
                html += '	<div class="files-item">';
                html += '		<label class="label"></label>';
                html += '		<input type="text">';
                html += '		<div class="error" style="display:none"></div>';
                html += '	</div>';
                this.HTML = $(html);
                this.HTML.find('label').text(opt.label);
                break;
            case 'select':
                this.HTML = $('<div class="files-item"><input type="text" value="" /></div>');
                break;
            case 'button':
                this.HTML = $('<div class="files-item"><button></button></div>');
                this.HTML.find('button').text(opt.label);
                break;
        };
        this.option = opt;
    };
    template.prototype = {
        // 渲染html
        render: function() {
            return this.HTML;
        },
        // 获取
        get: function() {
            return this.HTML.find('input').val()
        },
        // 赋值
        set: function(data) {
            this.HTML.find('input').val(data);
        },
        // 显示ERROR提示框
        showError: function(data) {
            this.HTML.find('.error').css('display', 'inline-block').text(data);
        },
        // 隐藏ERROR提示框
        hideError: function() {
            this.HTML.find('.error').css('display', 'none');
        }
    };
    // 将字段转换为表单
    var formatFiles = function(opt) {
        this.defaults = {
            type: 'input', // 表单类型  input select textarea file checkbox button tables
            ajaxName: null, // 表单字段
            judes: [], // 验证条件
            mustBe: false, // 是否为必填项
            label: null, // 标签名
            displayName: null, // 提示名
            filter: null, // 过滤条件
            readonly: false, // 只读
            clickEvent: null,
        };
        this.options = $.extend({}, this.defaults, opt);
        this.ele = new template(this.options);
    };
    formatFiles.prototype = {
        // 初始化表单条目
        init: function() {
            var _this = this;
            var HTML = _this.ele.render();
            // 绑定change事件,
            HTML.bind('input propertychange', function() {
                _this.change(_this);
            });
            return HTML;
        },
        change: function(event) {
            var _this = this;
            // 获取字段内容
            var value = event.get();
            if (_this.options.mustBe && !Api.jude.isNull(value)) {
                // 内容为空且为必填项时
                _this.ele.showError((_this.options.displayName || '') + '不能为空');
            } else if (!_this.options.mustBe && !Api.jude.isNull(value)) {
                // 内容为空且部位必填项时
                _this.ele.hideError();
            } else {
                // 进行验证
                _this.jude(value);
            };
        },
        set: function(data) {
            // 给表单元素赋值
            this.ele.set(data);
        },
        get: function() {
            // 获取表单元素内容
            return this.ele.get();
        },
        jude: function(value) {
            var _this = this;
            // 建立提示信息文字
            var status = null;
            if (_this.options.filter) {
                // 获取每一项验证顺序
                for (var i = 0; i < _this.options.filter.length; i++) {
                    var item = _this.options.filter[i];
                    // 进行验证
                    if (!Api.jude[item](value)) {
                        // 输出错误信息
                        status = (_this.options.displayName || '') + judeText[item];
                        break;
                    };
                }
            };
            // 显示错误信息
            if (status) {
                _this.ele.showError(status);
            } else {
                _this.ele.hideError();
            }
        }
    };
    var layout = function(opt) {
        this.defaults = {
            type: null,
            name: null,
            className: null,
            conditionEvent: null,
            parent: null,
            template: null,
            default: 'show',
        };
        this.options = $.extend({}, this.defaults, opt);
        this.HTML = $(this.template(this.options.template));
        this[this.options.default]();
    };
    layout.prototype = {
        render: function() {
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
        condition: function() {
            var _this = this;
            var event = this.options.conditionEvent || function() {
                return _this.HTML.css('display') == 'block';
            }
            this.HTML.css('display', (event() ? 'block' : 'none'));
        },
        template: function(data) {
            data = data || '<div class="layout' + (' ' + this.options.className || '') + '"></div>';
            return data;
        },
    };
    // 接口调用事件
    var AJAX = function(opt, files) {
        this.defaults = {
            type: 'api',
            setting: {
                url: 'index.json',
                AjaxType: 'GET',
                data: {},
                useData: true,
            },
            beforeEvent: defaultEvent,
            afterEvent: {
                success: defaultEvent,
                error: false,
            }
        };
        this.result = '';
        this.files = files;
        this.options = $.extend({}, this.defaults, opt);
    };
    AJAX.prototype = {
        perform: function() {
            var _this = this;
            var data = _this.options.setting.useData ? _this.options.setting.data : _this.files;
            _this.options.beforeEvent(data, function(result) {
                Api.GET({
                    url: _this.setting().url,
                    success: function(result) {
                        _this.options.afterEvent.success(result, function(result) {
                            _this.set(result);
                        });
                        _this.render();
                    }
                });
            });
        },
        // 给结果集赋值
        set: function(data) {
            this.result = data;
        },
        // 获取ajax设置
        setting: function() {
            return this.options.setting
        },
        // 给HTML元素赋值
        render: function() {
            for (var item in this.result) {
                if (this.result.hasOwnProperty(item)) {
                    this.files[item].event.set(this.result[item]);
                }
            }
        },
        getFilesData: function() {
            console.log(this.files);
        },
        setSetting: function(data) {
            this.options.setting = data;
            this.perform();
        },
    };
    var formatButtons = function(opt, expose) {
        this.defaults = {
            type: 'button', // 类型 button
            label: 'OK',
            clickEvent: 'put',
            disableEvent: function(files) {

            }
        };
        this.expose = expose;
        this.options = $.extend({}, this.defaults, opt);
    };
    formatButtons.prototype = {
        // 初始化表单条目
        init: function() {
            var _this = this;
            _this.ele = new template(_this.options);
            var HTML = _this.ele.render();
            HTML.bind('click', function() {
                _this.expose[_this.options.clickEvent].init();
            });
            return HTML;
        }
    };
    $.fn.autoForm = function(options) {
        // 获取表单元素列表
        var files = options.files;
        var element = {};
        for (var i = 0; i < files.length; i++) {
            var _data = element[files[i].ajaxName] = {};
            _data.option = files[i];
            _data.event = new formatFiles(files[i]);
            // 输出到页面
            // this.append(_data.event.init());
        };

        // 缓存事件类型		
        var _events = {};
        var autoInit = null;
        for (var d = 0; d < options.events.length; d++) {
            var item = options.events[d];
            _events[item.name] = {
                options: item,
                event: new AJAX(item, element),
            };
            // 判断自动调用接口方法
            if (item.auto) {
                autoInit = item.name;
            };
        };
        // 暴露接口对象
        var expose = {};
        for (var item in _events) {
            if (_events.hasOwnProperty(item)) {
                expose[item] = (function(item, _events) {
                    return {
                        init: function() {
                            _events[item].event.perform();
                        },
                        set: function(data) {
                            _events[item].event.setSetting(data);
                        }
                    }
                })(item, _events);
            }
        };

        // 为每个按钮绑定事件
        var buttons = options.buttons;
        var elementButtons = {};
        for (var y = 0; y < buttons.length; y++) {
            var _button = elementButtons[buttons[y].eventName] = {};
            _button.option = buttons[y];
            _button.event = new formatButtons(buttons[y], expose);
            // this.append(_button.event.init());
        };

        // 输出layout
        var layoutOption = options.layouts;
        var layouts = {};
        for (var r = 0; r < layoutOption.length; r++) {
            var _layout = layouts[layoutOption[r].name] = {};
            _layout.option = layoutOption[r];
            _layout.event = new layout(_layout.option);
            this.append(_layout.event.render());
        };

        console.log(layouts);


        for (var items in element) {
            if (element.hasOwnProperty(items)) {
                if (layouts[element[items].option.layout]) {
                    layouts[element[items].option.layout].event.append(element[items].event.init());
                } else {
                    this.before(element[items].event.init());
                }
            }
        };

        for (var items in elementButtons) {
            if (elementButtons.hasOwnProperty(items)) {
                if (layouts[elementButtons[items].option.layout]) {
                    layouts[elementButtons[items].option.layout].event.append(elementButtons[items].event.init());
                } else {
                    this.before(elementButtons[items].event.init());
                }
            }
        }



        // for (var x = 0; x < element.length; x++) {

        // }




        // 调用自动调用接口
        if (autoInit) {
            expose[autoInit].init();
        };
        return expose;
    };
})(jQuery, window, document);
var _data = $('#CRM').autoForm(data);