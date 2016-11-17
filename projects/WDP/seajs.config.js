/*
* seajs.config.pc
*/
// 网站根路径
seajs.root = '/projects'; 
// 插件设置
seajs.set = {
	util: {
		timeout: 1.5e4
	}
};

seajs.config({
	base: seajs.root + "/static/modules",
	paths: {
		"js" : seajs.root + "/WDP/app"
	},
	alias: {
		"audio"		     : "audio/audio",
		"copy"		     : "copy/ZeroClipboard",
		"flv"		     : "flv/flv",
		"hook"	 	     : "hook/hook",
		"jquery" 	     : "jquery/1/jquery.js",
		"validform"      : "validform/validform",
		"My97DatePicker" : "My97DatePicker/WdatePicker",
		"raty"		     : "raty/raty",
		"upload"         : "upload/upload",
		"makethumb"      : "upload/makethumb",
		"localResizeIMG" : "upload/localResizeIMG",
		"video"		     : "video/video",
		"webuploader"    : "webuploader/webuploader",
		// localstorage缓存
		"seajs-localcache" : "seajs/seajs-localcache",
		// debug
		"seajs-debug" : "seajs/seajs-debug"
	},
	preload:['manifest','seajs-localcache'],
    localcache:{
        timeout: 30000
    },
    comboExcludes: /jquery\.js/ 	// 从 combo 中排除掉 jquery.js 
});