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
	events: [{
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
	}],
	files: [{
		type: 'input',
		ajaxName: null,
		judes: [],
		mustBe: false,
		label: null,
		displayName: null,
		filter: null,
		readonly: false,
		clickEvent: null,
	}],
	buttons: [{
		eventName: 'update',
		type: 'button',
		label: 'OK',
		clickEvent: 'put',
		disableEvent: function(files) {

		}
	}]
}
