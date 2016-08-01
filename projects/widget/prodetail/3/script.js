var widget = $('#${id}'),
	widgetShare = widget.find('._tip');
base.topush(widgetShare);
//多组分享js         
require.async('bdshare',function(bdshare){
   bdshare(
	[{
		tag : 'share_B',  
		bdSize : 16,      //图标尺寸, 16｜24｜32
		bdStyle : '0'     //图标类型, 0｜1｜2

	 }]
	 )
});