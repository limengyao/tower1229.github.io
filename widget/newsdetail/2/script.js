//扫描按需加载
base.scanpush();
//百度分享
require.async('bdshare', function(bs) {
	bs([{
		tag: 'share_${id}'
	}]);
})