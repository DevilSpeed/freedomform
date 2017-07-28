# freedomform
以json为基准输出HTML页面并绑定ajax接口,实现表单自动构建

预计支持表单元素类型  
input
select
tab
checkBox
textarea
file

{
  // 事件类型
	events: [{
			type: 'api',  // 支持格式  webApi 格式(传统格式)  CRM格式 (待定)
			setting: {   // ajax的调用参数
				url: 'index.json',  // URL
				AjaxType: 'GET',  // 类型
				data: {}, // 参数
				useData: true, // 使用DATA来传递参数
			},
			beforeEvent: defaultEvent, // 在AJAX执行前执行方法
			afterEvent: { // 在AJAX执行后执行方法
				success: defaultEvent, // ajax 执行成功
				error: false, // ajax执行失败
			}
	}],
	files: [{
			type: 'input', // 表单类型
			ajaxName: null, // 表单字段
			judes: [], // 验证条件
			mustBe: false, // 是否为必填项
			label: null, // 标签名
			displayName: null, // 提示名
			filter: null, // 过滤条件
			readonly: false, // 只读
			clickEvent: null,
	}],
	buttons: [{
		eventName: 'update', // 按钮的数据名称
		type: 'button', // 按钮类型
		label: 'OK', // 按钮文字
		clickEvent: 'put', // 按钮绑定方法
		disableEvent: function(files) {  // 验证是否禁用的方法

		}
	}],
