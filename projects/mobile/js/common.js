/**
 * name: common for phone
 * varsion: v0.2.1
 * update: 高屏body添加highScreen
 * date: 2016-01-6
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');
	var phoneProp = window.screen.width/window.screen.height;
	if (phoneProp < .57) {
		document.getElementsByTagName("body")[0].className += " highScreen";
	}
	$(function(){
		//textarea扩展max-length
		$('textarea[max-length]').on('change blur',function(){
			var _val=$(this).val(),_max=$(this).attr('max-length');
			if(_val.length>_max){
				$(this).val(_val.substr(0,_max));
			};
		});
		//延时显示
		$('.opc0').css({'opacity':'1'});

	});

	/*
	* 输出
	*/
	module.exports = {
		demo:function(){
			var directHash = {
				"0":"重定向",
				"1":"刷新",
				"2":"历史记录"
			};
			console.log('页面来自'+directHash[window.performance.navigation.type])
		}
	}


	/*
	* 站内公用
	*/
 
	

	
	
});