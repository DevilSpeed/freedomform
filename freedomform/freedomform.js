var Api = common;



(function($, win, doc, undefined) {
    // 定义错误提示信息
    var _j = {
        // 验证是否为数字
        isNumber: {
            // 验证正则表达式
            expression: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            // 验证错误提示信息
            text: '只能为数字',
            // 验证方法回调
            perform: function(str) {
                var re = new RegExp(_j.isNumber.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否为银行卡号码
        isBankNum: {
            expression: /^\d{16}|\d{19}$/,
            text: '格式错误',
            perform: function(str) {
                var re = new RegExp(_j.isBankNum.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否为固定电话号码
        isTelephone: {
            expression: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/,
            text: '格式错误',
            perform: function(str) {
                var re = new RegExp(_j.isTelephone.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否非正整数
        isInteger: {
            expression: /^[0-9]*$/,
            text: '只能为正整数',
            perform: function(str) {
                var re = new RegExp(_j.isInteger.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否为正整数
        notNull: {
            expression: "^[ ]+$",
            text: '不能为空',
            perform: function(str) {
                if (str == "" || str == undefined || str == null || str == NaN) return false;
                var re = new RegExp(_j.notNull.expression);
                return !re.test(str);
            }
        },
        // 是否为手机号
        isPhone: {
            expression: /^[1][0-9]{10}$/,
            text: '格式错误',
            perform: function(str) {
                var re = new RegExp(_j.isPhone.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否全部为中文
        isAllChinese: {
            expression: /^([\u4E00-\u9FA5]+，?)+$/,
            text: '只能为中文',
            perform: function(str) {
                var re = new RegExp(_j.isAllChinese.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否含有中文
        isHaveChinese: {
            expression: "[\\u4E00-\\u9FFF]+",
            text: '中含有汉字',
            perform: function(str) {
                var re = new RegExp(_j.isHaveChinese.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否为身份证号码
        isIdCard: {
            expression: [/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/, /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/],
            text: '输入错误',
            perform: function(str) {
                var re1 = new RegExp(_j.isIdCard.expression[0]);
                var re2 = new RegExp(_j.isIdCard.expression[1]);
                return re1.test(str) || re2.test(str) ? true : false;
            }
        },
        // 是否含有特殊字符
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
        // 是否为URL
        isUrl: {
            expression: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
            text: '格式错误',
            perform: function(str) {
                var re = new RegExp(_j.isUrl.expression);
                return re.test(str) ? true : false;
            }
        },
        // 是否为EMAIL
        isEmail: {
            expression: /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
            text: '格式错误',
            perform: function(str) {
                var re = new RegExp(_j.isEmail.expression);
                return re.test(str) ? true : false;
            }
        },
        // 判断是否为某一类型
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
        // 数组中是否含有某一字符串
        inArray: function(str, _array) {
            if ($.inArray(str, _array) == -1) {
                return false
            } else {
                return true
            }
        },
        isEqual: function(a, b) {
            //如果a和b本来就全等
            if (a === b) {
                //判断是否为0和-0
                return a !== 0 || 1 / a === 1 / b;
            }
            //判断是否为null和undefined
            if (a == null || b == null) {
                return a === b;
            }
            //接下来判断a和b的数据类型
            var A = toString.call(a),
                B = toString.call(b);
            //如果数据类型不相等，则返回false
            if (A !== B) {
                return false;
            }
            //如果数据类型相等，再根据不同数据类型分别判断
            switch (A) {
                case '[object RegExp]':
                case '[object String]':
                    //进行字符串转换比较
                    return '' + a === '' + b;
                case '[object Number]':
                    //进行数字转换比较,判断是否为NaN
                    if (+a !== +a) {
                        return +b !== +b;
                    }
                    //判断是否为0或-0
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                case '[object Date]':
                case '[object Boolean]':
                    return +a === +b;
            }
            //如果是对象类型
            if (A == '[object Object]') {
                //获取a和b的属性长度
                var propsA = Object.getOwnPropertyNames(a),
                    propsB = Object.getOwnPropertyNames(b);
                if (propsA.length != propsB.length) {
                    return false;
                }
                for (var i = 0; i < propsA.length; i++) {
                    var propName = propsA[i];
                    //如果对应属性对应值不相等，则返回false
                    if (a[propName] !== b[propName]) {
                        return false;
                    }
                }
                return true;
            }
            //如果是数组类型
            if (A == '[object Array]') {
                if (a.toString() == b.toString()) {
                    return true;
                }
                return false;
            }
        },
    };
    var _f = {
        // 检查命名空间 (检查元素是否重名,在空间内,所属元素不能重名)
        checkNamespace: function(str, namespace) {
            // 以传入参数的形式验证命名空间
            // 防止一个页面中存在多个表单时命名空间冲突
            // 传入参数     str : 需要验证的字符串
            //             namespace : 命名空间 (注 : 表单元素不能重名)
            if (_j.inArray(str, namespace)) {
                // 元素存在是,输出警告,元素已经存在
                console.error('警告 : 元素重名 [' + str + ']');
            } else {
                // 不存在时,添加到命名空间中
                namespace.push(str);
            };
        },
        // 初始化表单元素
        initFile: function(data, namespace, events) {
            // 初始化所有表单元素
            // 包含 input(字符串类型) select (选择框类型) checkBox (多选框) radio (单选框) textarea (多行文本列表) button (按钮) tabs (选项卡) file (input 文件上传) date (时间选择器)
            // 各个元素详细设定 在相关元素中查看\
            //
            // 创建files对象 用来保存所有的表单元素
            var files = {};
            // 遍历data.files中的数组,通过数组中元素的setting属性创建表单元素
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // 验证元素名称是否在命名空间中
                _f.checkNamespace(item.name, namespace);
                // 创建表单元素, 并赋值给files对象
                files[item.name] = new _t[item.type](item.setting, events, item.name);
            };
            return files;
        },
        // 初始化事件方法
        initEvent: function(data, namespace) {
            // 初始化AJAX事件,
            // 
            // 创建events对象 用来保存所有的AJAX方法
            var events = {};
            // 遍历data.events中的数组,通过数组中元素的setting属性创建表单AJAX对象
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // 验证元素名称是否在命名空间中
                _f.checkNamespace(item.name, namespace);
                // 创建AJAX对象, 并赋值给events对象
                events[item.name] = new _e[item.type](item.setting);
            };
            return events;
        },
        // 初始化模板格式
        initLayout: function(data, namespace) {
            // 初始化模板元素,
            // 
            // 创建layouts对象 用来保存所有的模板元素
            var layouts = {};
            // 遍历data.layouts中的数组,通过数组中元素的setting属性创建表单AJAX对象
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // 验证元素名称是否在命名空间中
                _f.checkNamespace(item.name, namespace);
                // 创建模板元素, 并赋值给layouts对象
                layouts[item.name] = new _t[item.type](item.setting);
            };
            return layouts;
        },
        // 输出HTML
        renderHtml: function($files, $layouts, layoutArray, $this) {
            // 将模板元素与表单元素合并
            for (var item in $layouts) {
                if ($layouts.hasOwnProperty(item)) {
                    var element = $layouts[item];
                    // 将元素中的所有属性浅拷贝到files类型
                    $files[item] = element;
                }
            };
            var parent = null;
            // 重新遍历模板数组,找到模板的父级元素
            for (var i = 0; i < layoutArray.length; i++) {
                var element = layoutArray[i];
                if (element.setting.parent == 'parent') {
                    // 检查是否为父级模板
                    parent = element.name;
                    break;
                };
            };
            // 找到父级模板元素
            var form = $files[parent];
            // 准备表单元素元素(将所有元素插入到父级模板中)
            _f.renderLayout(form, $files);
            // 加载元素到html页面
            $this.append($files[parent].render());
        },
        // 渲染页面
        renderLayout: function(data, $files) {
            // 遍历元素,插入到模板中
            for (var i = 0; i < data.options.subset.length; i++) {
                var element = data.options.subset[i];
                if ($files[element].constructor == 'block') {
                    // 判断如果所选对象为一个模板,递归程序,重新插入
                    _f.renderLayout($files[element], $files);
                };
                // 将元素插入到模板中
                data.append($files[element].render());
            }
        },
        // 自动调用
        autoEvent: function(event, eventArray) {
            var eventName = null;
            // 遍历event对象
            for (var i = 0; i < eventArray.length; i++) {
                var element = eventArray[i];
                if (element.setting.auto) {
                    // 如果字段 auto 为 true 证明该事件为需要立即执行的事件,缓存名称,准备调用
                    eventName = element.name;
                    break
                };
            };
            // 找到缓存的对象,立即进行执行 (相关内容,查看AJAX对象)
            if (eventName) {
                event[eventName].perform();
            };
        },
        // 给表单按钮绑定事件
        bindEventToFile: function(event, file) {
            // 遍历所有表单元素，为事件绑定表单元素 (只有button元素可以绑定事件)
            for (var item in event) {
                if (event.hasOwnProperty(item)) {
                    var element = event[item];
                    // 进行事件绑定, 把表单元素绑定给表单事件
                    element.setFiles(file);
                }
            }
        },
        // 给模板绑定前台事件 (表单元素控制模板现隐) 
        bindEventtoLayout: function($layouts, $files) {
            // 遍历模板
            for (var layoutItem in $layouts) {
                if ($layouts.hasOwnProperty(layoutItem)) {
                    // 缓存模板
                    var layout = $layouts[layoutItem];
                    // 如果模板event字段有值,则查找files中是否包含该元素
                    if (layout.options.event) {
                        // 格式化出event字段中代表file的字段
                        var eventName = layout.options.event.split('?')[0];
                        if ($files.hasOwnProperty(eventName)) {
                            var file = $files[eventName];
                            file.setLayoutData(layout);
                        };
                    };
                }
            }
        },
        bindFileRelevancy: function($files) {
            for (var fileItem in $files) {
                if ($files.hasOwnProperty(fileItem)) {
                    // 缓存模板
                    var file = $files[fileItem];
                    // 如果模板event字段有值,则查找files中是否包含该元素
                    if (file.options.relevancyEvent) {
                        // 格式化出event字段中代表file的字段
                        var eventName = file.options.relevancyEvent.split('=>')[0];
                        if ($files.hasOwnProperty(eventName)) {
                            var relevancyFile = $files[eventName];
                            file.setRelevancy(relevancyFile);
                        };
                    };
                }
            }
        },
        newGuid: function() {
            var guid = '';
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    guid += '-';
            }
            return guid;
        },
    };
    var _t = {
        // input 类型表单元素
        input: function(opt, events, objectName) {
            // 初始化 html
            var html = '';
            html += '	<div class="files-item">';
            html += '		<label class="label"></label>';
            html += '		<input type="text">';
            html += '		<div class="error" style="display:none"></div>';
            html += '	</div>';
            html = $(html);
            // 如果出现表单的标注名,则显示标注,否则隐藏标注标签
            if (opt.label) {
                html.find('label').text(opt.label);
            } else {
                html.find('label').css('display', 'none');
            };
            // 缓存html
            this.HTML = html;
            // 缓存属性值
            this.options = opt;
            this.objectName = objectName;
            this.constructor = 'input';
        },
        // 多行文本框类型
        textarea: function(opt, events, objectName) {
            // 初始化 html
            var html = '';
            html += '	<div class="files-item">';
            html += '		<label class="label"></label>';
            html += '		<textarea style="border:1px solid #ccc;"></textarea>';
            html += '		<div class="error" style="display:none"></div>';
            html += '	</div>';
            html = $(html);
            // 如果出现表单的标注名,则显示标注,否则隐藏标注标签
            if (opt.label) {
                html.find('label').text(opt.label);
            } else {
                html.find('label').css('display', 'none');
            };
            // 缓存html
            this.HTML = html;
            // 缓存属性值
            this.options = opt;
            this.objectName = objectName;
            this.constructor = 'textarea';
        },
        // button类型表单元素
        button: function(opt, events, objectName) {
            // 初始化 html
            this.HTML = $('<div class="files-item"><button></button></div>');
            // 绑定按钮文字
            this.HTML.find('button').text(opt.label);
            // 缓存属性值
            this.options = opt;
            // 缓存事件对象
            this.events = events;
            this.constructor = 'button';
            this.objectName = objectName;
        },
        // 模板类型
        block: function(opt, files) {
            // 初始化模板类型
            this.HTML = $('<div class="block' + (opt.className || '') + '"></div>');
            if (opt.title) {
                this.TITLE = $('<div class="' + opt.title.className + '">' + opt.title.text + '</div>');
                this.append(this.TITLE);
            };
            // 缓存属性值
            this.options = opt;
            this.constructor = 'block';
        },
        // select 中 option 内容
        selectOption: function(opt, value, nameKey) {
            // 初始化 html
            this.HTML = $('<option></option>');
            // 输出显示名称
            this.HTML.text(opt[nameKey]);
            // 给定的value赋值
            this.HTML.attr('value', value);
            // 缓存属性值
            this.data = opt;
            this.constructor = 'selectOption';
        },
        // select 类型
        select: function(opt, events, objectName) {
            // 初始化 html
            this.HTML = $('<div class="files-item"><select></select></div>');
            // 缓存属性值
            this.options = opt;
            // 缓存模板数据
            this.layouts = [];
            // 缓存select对应元素名称
            this.objectName = objectName;
            this.constructor = 'select';
            this.relevancyElement = [];

        },
        // 多选框类型
        checkBox: function(opt, events, objectName) {
            // 初始化 html
            this.HTML = $('<div class="files-item"><input name="' + _f.newGuid() + '" type="checkBox"><span></span></div>');
            // 缓存属性值
            if (opt.label) {
                this.HTML.find('span').text(opt.label);
            };
            this.options = opt;
            this.objectName = objectName;
            this.constructor = 'checkBox';
            this.layouts = [];
        },
        // 单选框元素
        inputRadio: function(opt, value, nameKey, objectName, parent) {
            this.HTML = $('<div><input type="radio"  name="' + objectName + '" /><span></span></div>');
            // 缓存属性值

            if (opt[nameKey]) {
                this.HTML.find('span').text(opt[nameKey]);
            };
            this.data = opt;
            this.parent = parent;
            this.constructor = 'inputRadio';
        },
        // 单选框
        radio: function(opt, events, objectName) {
            // 初始化 html
            this.HTML = $('<div class="files-item"></div>');
            // 缓存属性值
            this.options = opt;
            // 建立option列表数组
            this.items = [];
            for (var i = 0; i < this.options.data.length; i++) {
                var item = this.options.data[i];
                // 为每一行数据生成optionSide
                this.items[i] = new _t.inputRadio(item, i, this.options.showItemKey, objectName, this);
                // 输出到Select
                this.HTML.append(this.items[i].render());
            };
            // 缓存对象结果类型
            this.valueData = {};
            // 找到默认值,为所选默认值添加属性
            for (var d = 0; d < this.items.length; d++) {
                var element = this.items[d];
                if (this.options.defaultValue == d) {
                    element.setChecked();
                    this.valueData = this.options.data[d];
                    break;
                };
            };
            // 缓存模板数据
            this.layouts = [];
            // 缓存select对应元素名称
            this.objectName = objectName;
            this.constructor = 'radio';

        },
        hide: function(opt, events, objectName) {
            this.options = opt;
            this.objectName = objectName;
            this.constructor = 'hide';
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
            if (status) {
                // 显示错误信息
                $this.showError(status);
            } else {
                // 隐藏错误信息
                $this.hideError();
            }
        }
    };
    _t.textarea.prototype = {
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
            return this.HTML.find('textarea').val()
        },
        // 赋值
        set: function(data) {
            this.HTML.find('textarea').val(data);
        },
        // 只读条件 (暂无调用接口,一次性属性)
        changeReadonly: function(isReadonly) {
            if (_j.type(isReadonly, 'function')) {
                this.HTML.find('textarea').attr("readonly", isReadonly());
            } else {
                this.HTML.find('textarea').attr("readonly", !!isReadonly);
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
        }
    };
    _t.button.prototype = {
        // 初始化表单条目
        render: function() {
            var $this = this;
            // 为按钮绑定事件
            $this.HTML.unbind().bind('click', function() {
                $this.events[$this.options.clickEvent].perform();
            });
            return $this.HTML;
        }
    };
    _t.block.prototype = {
        // 输出模板类型
        render: function() {
            // 检查默认值中设置的显示隐藏
            if (this.options.state == 'show') {
                this.show();
            } else {
                this.hide();
            };
            return this.HTML;
        },
        // 封装添加事件,为元素插入做准备
        append: function(data) {
            this.HTML.append(data);
        },
        // 显示调用事件
        show: function() {
            this.HTML.css('display', 'block');
        },
        // 隐藏调用事件
        hide: function() {
            this.HTML.css('display', 'none');
        }
    };
    _t.select.prototype = {
        init: function() {
            // 建立option列表数组
            this.items = [];
            this.HTML.find('select').empty();
            for (var i = 0; i < this.options.data.length; i++) {
                var item = this.options.data[i];
                // 为每一行数据生成optionSide
                this.items[i] = new _t.selectOption(item, i, this.options.showItemKey);
                // 输出到Select
                this.HTML.find('select').append(this.items[i].render());
            };
            // 缓存对象结果类型
            this.valueData = {};
            // 找到默认值,为所选默认值添加属性
            for (var d = 0; d < this.items.length; d++) {
                var element = this.items[d];
                if (this.options.defaultValue == d) {
                    element.setSelected();
                    this.valueData = this.options.data[d];
                    break;
                };
            };
        },
        // 渲染输出方法
        render: function() {
            this.init();
            this.relevancy();
            var $this = this;
            // 为模板绑定change事件,实现数据关联
            $this.HTML.find('select').change(function() {
                var index = $this.HTML.find('select').get(0).selectedIndex;
                $this.change(index);
            });
            return $this.HTML;
        },
        // change 时,改变数据的默认值
        change: function(index) {
            this.valueData = this.options.data[index];
            this.changeLayout();
            this.relevancy();
        },
        // 获取所选对象,以对象形式呈现,完整反馈select所选对象,
        get: function() {
            return this.valueData;
        },
        // 赋值 根据设置中的 setItemKey 属性 关联类型变换
        set: function(value) {
            var key = this.options.setItemKey;
            var isComplete = false;
            for (var i = 0; i < this.options.data.length; i++) {
                var element = this.options.data[i];
                if (element[key] == value) {
                    this.items[i].setSelected();
                    this.valueData = this.items[i].data;
                    this.changeLayout();
                    this.relevancy();
                    isComplete = true;
                    break;
                };
            }
            return isComplete;
        },
        changeLayout: function() {
            var $this = this;
            // $this.layouts
            for (var i = 0; i < this.layouts.length; i++) {
                var layout = this.layouts[i];
                var condition = layout.options.event.split('?')[1].split('=');
                if (this.valueData[condition[0]] == condition[1]) {
                    layout.show();
                } else {
                    layout.hide();
                }
            };
        },
        setLayoutData: function(data) {
            this.layouts.push(data);
        },
        setRelevancy: function(data) {
            this.relevancyElement.push(data);
        },
        relevancy: function() {
            for (var i = 0; i < this.relevancyElement.length; i++) {
                var element = this.relevancyElement[i];
                var relevancyObjectName = this.options.relevancyEvent.split('=>')[1];
                try {
                    element.setData(this.valueData[relevancyObjectName]);
                } catch (error) {
                    element.setData([]);
                };
            }
        },
        setData: function(data) {
            this.options.data = data;
            this.init();
        }
    };
    _t.selectOption.prototype = {
        render: function() {
            return this.HTML;
        },
        get: function() {
            return this.data;
        },
        setSelected: function() {
            this.HTML.attr("selected", true);
        }
    };
    _t.checkBox.prototype = {
        render: function() {
            var $this = this;
            $this.HTML.find('input').change(function() {

                $this.change();
            });
            return this.HTML;
        },
        get: function() {
            return this.HTML.find('input').attr("checked") == 'checked';
        },
        set: function(data) {
            console.log(data);
            if (data === 'false' || data === false) {
                this.HTML.find('input').removeAttr("checked");
                this.changeLayout();
            } else if (data === 'true' || data === true) {
                this.HTML.find('input').attr("checked", 'true');
                this.changeLayout();
            } else {
                console.log(this.objectName + ': 遇到了一个未知类型 (checkBox 仅支持 布尔值 或 "true"/"false" )');
            }
        },
        change: function() {
            var checked = this.HTML.find('input').attr("checked") == 'checked';
            if (checked) {
                this.HTML.find('input').removeAttr("checked");
            } else {
                this.HTML.find('input').attr("checked", 'true');
            };
            this.changeLayout();
            // 更改模板
        },
        setLayoutData: function(data) {
            this.layouts.push(data);
        },
        changeLayout: function() {
            var $this = this;
            // $this.layouts
            for (var i = 0; i < this.layouts.length; i++) {
                var layout = $this.layouts[i];
                var condition = layout.options.event.split('?')[1];
                var value = $this.get().toString();
                if (condition == value) {
                    layout.show();
                } else {
                    layout.hide();
                };
            };
        },
    };
    _t.inputRadio.prototype = {
        render: function() {
            var $this = this;
            this.HTML.click(function() {
                $this.parent.change($this);
            });
            return this.HTML;
        },
        get: function() {
            return this.data;
        },
        setChecked: function() {
            this.HTML.find('input').attr("checked", true);
        },
        removeChecked: function() {
            this.HTML.find('input').attr("checked", false);
        },
    };
    _t.radio.prototype = {
        // 渲染输出方法
        render: function() {
            var $this = this;
            // 为模板绑定change事件,实现数据关联
            return $this.HTML;
        },
        get: function() {
            return this.valueData;
        },
        set: function(value) {
            var key = this.options.setItemKey;
            for (var i = 0; i < this.options.data.length; i++) {
                var element = this.options.data[i];
                if (element[key] == value) {
                    this.items[i].setChecked();
                    this.valueData = this.items[i].data;
                    // 改变模板
                    break;
                };
            }
        },
        setLayoutData: function(data) {
            this.layouts.push(data);
        },
        change: function(subset) {
            this.valueData = subset.data;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (_j.isEqual(item.data, this.valueData)) {
                    item.setChecked();
                } else {
                    item.removeChecked();
                }
            };
        },
    };
    var _e = {
        defaultEvent: function(data, callback) { // ajax 执行前进行回调
            callback(data); // 回调函数
        },
        ajax: function(opt) {
            this.defaults = {
                url: 'index.json',
                type: 'GET',
                data: {},
                auto: false,
                useData: true,
                beforeEvent: _e.defaultEvent,
                afterEvent: {
                    success: _e.defaultEvent,
                    error: _e.defaultEvent,
                }
            };
            this.files = {};
            this.result = null;
            this.options = $.extend({}, this.defaults, opt);
        },
        fun: function(opt) {
            this.event = opt.event;
        },
    };
    _e.ajax.prototype = {
        perform: function() {
            var $this = this;
            if ($this.options.useData) {
                var data = $this.options.data;
            } else {
                var data = $this.getFielsValue();
            };
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
            // 给select 关联事件创建队列
            var selectData = [];

            for (var item in this.result) {
                if (this.result.hasOwnProperty(item)) {
                    if (this.files[item].constructor == 'select') {
                        var data = {
                            element: this.files[item],
                            data: this.result[item]
                        };
                        selectData.push(data);
                    } else {
                        this.files[item].set(this.result[item]);
                    }
                }
            };
            console.log(selectData);

            function selectSetDataByRelevancy() {
                if (selectData.length == 0) {
                    return;
                };
                var item = selectData.shift();
                if (item.element.options.data.length == 0) {
                    selectData.push(item);
                    selectSetDataByRelevancy();
                } else {
                    if (!item.element.set(item.data)) {
                        selectData.push(item)
                    };
                    selectSetDataByRelevancy();
                };
            };

            selectSetDataByRelevancy();


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
        },
        getFielsValue: function() {
            var data = {};
            for (var item in this.files) {
                if (this.files.hasOwnProperty(item)) {
                    var element = this.files[item];

                    try {
                        data[item] = element.get();
                    } catch (error) {
                        if (element.constructor != 'button' && element.constructor != 'block') {
                            console.log(element + ':改对象没有取值方法');
                        } else {
                            // 忽略模板类型及按钮类型的取值方法
                        }
                    }
                }
            };
            return data;
        }
    };
    _e.fun.prototype = {
        perform: function() {
            var $this = this;
            this.event($this.getFielsValue());
        },
        setFiles: function(data) {
            this.files = data;
        },
        getFielsValue: function() {
            var data = {};
            for (var item in this.files) {
                if (this.files.hasOwnProperty(item)) {
                    var element = this.files[item];
                    try {
                        data[item] = element.get();
                    } catch (error) {
                        if (element.constructor != 'button' && element.constructor != 'block') {
                            console.log(element);
                            console.log(element.constructor + ':' + element.objectName + ' --> 该对象没有取值方法');
                        } else {
                            // 忽略模板类型及按钮类型的取值方法
                        }
                    }
                }
            };
            return data;
        }
    };
    $.fn.freedomForm = function(options) {
        var $this = this;
        var namespace = [],
            $events = _f.initEvent(options.event, namespace),
            $layouts = _f.initLayout(options.layout, namespace),
            $files = _f.initFile(options.file, namespace, $events);
        console.log(namespace);
        _f.bindEventToFile($events, $files);
        _f.bindEventtoLayout($layouts, $files);
        _f.bindFileRelevancy($files);
        _f.renderHtml($files, $layouts, options.layout, $this);
        _f.autoEvent($events, options.event);
        return $events;
    };
})(jQuery, window, document);




Api.GET({
    url: 'province.json',
    success: function(result) {
        var province = result;






        var data = {
            event: [{
                type: 'ajax',
                name: 'get',
                setting: {
                    url: 'index.json', // ajax 的路径
                    type: 'GET', // 支持 GET POST DELETE PUT
                    data: {}, // 传入对象
                    auto: true, // 是否自动
                    useData: true, // 是否使用DATA中对象(待改进)
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
                type: 'fun',
                name: 'showValue',
                setting: {
                    event: function(data) { // ajax 执行前进行回调
                        console.log(data);
                    }
                }
            }],
            file: [{
                type: 'input',
                name: 'name',
                setting: {
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
                    filter: [], // 过滤方法 (set value 时进行操作)
                    label: '年龄 :', // 表单标签名称
                    displayName: '年龄', // 提示信息名称
                    readonly: false, // 是否只读
                    judes: ['notNull', 'isInteger'], // 验证条件 (change value 时进行操作)
                },
            }, {
                name: 'updateButton',
                type: 'button',
                setting: {
                    label: '获取全部表单值',
                    clickEvent: 'showValue',
                },
            }, {
                name: 'type',
                type: 'select',
                setting: {
                    label: '类别 :', // 表单标签名称
                    displayName: '类别', // 提示信息名称
                    setItemKey: 'value', // 要赋值的字段对象KEY值
                    showItemKey: 'name', // 要显示的字段对象KEY值
                    // defaultValue: null,
                    defaultValue: 0,
                    // 赋予默认值,可直接复制数组下标或 根据 setItemKey 的对象名称赋值; 区别方法, 字符串 / 数字
                    data: [{
                        name: '类别1',
                        value: '1',
                    }, {
                        name: '类别2',
                        value: '2',
                    }],
                    readonly: false,
                }
            }, {
                type: 'textarea',
                name: 'remark',
                setting: {
                    filter: [], // 过滤方法 (set value 时进行操作)
                    label: '详情 :', // 表单标签名称
                    displayName: '详情', // 提示信息名称
                    readonly: false, // 是否只读
                    judes: ['notNull'], // 验证条件 (change value 时进行操作)
                },
            }, {
                type: 'checkBox',
                name: 'isCheck',
                setting: {
                    label: '显示模板',
                    defaultValue: false, // 可选值为 true 或 false
                    readonly: false,
                }
            }, {
                type: 'textarea',
                name: 'declare',
                setting: {
                    filter: [], // 过滤方法 (set value 时进行操作)
                    label: '简介 :', // 表单标签名称
                    displayName: '简介', // 提示信息名称
                    readonly: true, // 是否只读
                    judes: ['notNull'], // 验证条件 (change value 时进行操作)
                }
            }, {
                type: 'radio',
                name: 'sex',
                setting: {
                    label: '性别 :', // 表单标签名称
                    displayName: '性别', // 提示信息名称
                    setItemKey: 'value', // 要赋值的字段对象KEY值
                    showItemKey: 'name', // 要显示的字段对象KEY值
                    // defaultValue: null,
                    defaultValue: 0,
                    // 赋予默认值,可直接复制数组下标或 根据 setItemKey 的对象名称赋值; 区别方法, 字符串 / 数字
                    data: [{
                        name: '男',
                        value: '1',
                    }, {
                        name: '女',
                        value: '2',
                    }],
                    readonly: false,
                }
            }, {
                type: 'select',
                name: 'province1',
                setting: {
                    label: '省 : ',
                    displayName: '省',
                    setItemKey: 'value',
                    showItemKey: 'name',
                    defaultValue: 0,
                    data: province,
                    relevancyEvent: 'province2=>list',
                }
            }, {
                type: 'select',
                name: 'province2',
                setting: {
                    label: '省 : ',
                    displayName: '省',
                    setItemKey: 'value',
                    showItemKey: 'name',
                    defaultValue: 0,
                    data: [],
                    relevancyEvent: 'province3=>list',
                }
            }, {
                type: 'select',
                name: 'province3',
                setting: {
                    label: '省 : ',
                    displayName: '省',
                    setItemKey: 'value',
                    showItemKey: 'name',
                    defaultValue: 0,
                    data: [],
                }
            }],
            layout: [{
                type: 'block',
                name: 'box',
                setting: {
                    className: null,
                    state: 'show',
                    event: null,
                    subset: ['name', 'type', 'box1', 'box2', 'isCheck', 'box3', 'declare', 'sex', 'box4', 'updateButton'],
                    parent: 'parent',
                    title: {
                        text: '标题',
                        className: 'titleClass'
                    }
                },
            }, {
                type: 'block',
                name: 'box1',
                setting: {
                    className: null,
                    template: null,
                    state: 'show',
                    event: 'type?value=1', // 模板展示方法
                    subset: ['age'],
                    parent: 'box',
                    title: {
                        text: 'select 控制表单现隐 : 表单1',
                        className: 'titleClass',
                    }
                },
            }, {
                type: 'block',
                name: 'box2',
                setting: {
                    className: null,
                    template: null,
                    state: 'hide',
                    event: 'type?value=2', // 模板展示方法
                    subset: ['phone'],
                    parent: 'box',
                    title: {
                        text: 'select 控制表单现隐 : 表单2',
                        className: 'titleClass',
                    }
                },
            }, {
                type: 'block',
                name: 'box3',
                setting: {
                    className: null,
                    state: 'show',
                    event: 'isCheck?true',
                    subset: [],
                    parent: 'parent',
                    title: {
                        text: 'CheckBox控制模板显示隐藏',
                        className: 'titleClass',
                    }
                },
            }, {
                type: 'block',
                name: 'box4',
                setting: {
                    className: null,
                    state: 'show',
                    event: 'isCheck?true',
                    subset: ['province1', 'province2', 'province3'],
                    parent: 'parent',
                    title: {
                        text: '省市区3级联动',
                        className: 'titleClass',
                    }
                },
            }]
        };
        var _data = $('#CRM').freedomForm(data);
        console.log(_data);
    }
});





// 问题
// select的默认值支持两种形式
// 目前只完成了 下标形式的默认值赋值,
// 待完成的是以字段方式判断默认值的方法


// 问题
// url 方法需要在before中回调并显示出来

// 问题
// 初始获取值时,应寻找空间,缓存默认值


// 问题
// 增加所有方法属性默认值

// 问题
// file 类型文件上传

// 问题
// date事件,方法,及设置

// 新建模板类型,为 list 或 form; 支持原有的layout方法
// list 类型,默认带统一增加按钮和某一元素的删除按钮
// list --> item --> element --> deleteButton
//                   addButton
// setValue
// getValue
//
// form 类型,每次调用自动生成子集表单,不与父级表单元素关联,
// form 元素返回值类型,只有setValue 与 getValue (不返回EVENT对象,但向父级中插入该元素的取值方法);
// 其他方法与父级统一