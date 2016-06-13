/**
 * form
 */
define(function(require) {
	var $ = require('jquery');
	var base=require('base');
	var com=require('./common');
	require('validform');

	//日期选择
	var datepicker=require('My97DatePicker/WdatePicker');
	$('#zd_birthday').on('click',function(){
		datepicker()
		});
		
	//验证码刷新
	$("#changeImage").click(function(){
		$("#rand").attr("src","img/temp/yzm.gif?method=auth_code&d="+new Date());
	});

	/*表单提交
	* (以注册表单为例)
		<form action="/resource/test/ajax_rand.htm" id="reg_form">
			<p>
				<label for="reg_user">用户名：</label>
				<input type="text" class="inp" id="reg_user" >
			</p>
			<p>
				<label for="reg_password">密 码：</label>
				<input type="password" class="inp" id="reg_password" name="reg_password" plugin="passwordStrength" >
				<span class="passwordStrength" style=""><b>密码强度：</b> <span>弱</span><span>中</span><span class="last">强</span></span>
			</p>
			<p>
				<label for="reg_confirm">确认密码：</label>
				<input type="password" class="inp" id="reg_confirm">
			</p>
			<p class="valid">
				<label for="reg_vali">验证码：</label>
				<input type="text" class="inp" id="reg_vali">
				<img src="/resources/member/img/temp/valid.gif" id="rand" >看不清？<a href="###" id="">换一张</a>
			</p>
			<p>
				<button type="submit" class="btn" id="dosubmit">同意协议并注册</button>
			</p>
		</form>
	*/

	var loginForm = $('#reg_form').Validform({
		tiptype:3,
		usePlugin:{          //密码强度插件，不需要就删掉
			passwordstrength:{
				minLen:6,	//设置密码长度最小值，默认为0;
				maxLen:16,	//设置密码长度最大值，默认为30;
				trigger:function(obj,error){						
					if(error){
						obj.parent().find(".Validform_checktip").show();
						obj.parent().find(".passwordStrength").hide();
					}else{
						obj.parent().find(".Validform_checktip").hide();
						obj.parent().find(".passwordStrength").show();	
					}
				}
			}
		},
		callback:function(form){
			
		}
	});
	
		
	
	//添加规则
	loginForm.addRule([
		 {
			  ele:"#reg_user",
			  datatype:"s2-18",
			  nullmsg:"请输入用户名！",
			  errormsg:"用户名至少2个字符,最多18个字符！"
		 },
		 {
			  ele:"#reg_password",
			  datatype:"*6-15",
			  errormsg:"密码范围在6~15位之间！"
		 },
		 {
			  ele:"#reg_confirm",
			  datatype:"*",
			  errormsg:"两次输入密码不一致！"
		 },
		 {
			  ele:"#reg_vali",
			  datatype:"*",
			  nullmsg:"请输入验证码！"
		 }
	]);
		
})

