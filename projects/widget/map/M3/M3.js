var $ = require('jquery');
var base = require('base');
if (base.getType() !== "Mobile") {
	var bdmap = require('bdmap');
	bdmap('D1DX6yGc5HGh28jtaAwNzcBi', function() {
		// 在回调中创建地图
		var map = new BMap.Map("containerM3");
		var point = new BMap.Point(116.404, 39.915);
		map.centerAndZoom(point, 15);
	});
}
require('scroll-bar');
$('.map-M3-list').scrollBar();
