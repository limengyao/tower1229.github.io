//扫描按需加载
base.scanpush();
require('base');


require('select');
$('#year').select();
$('#mon').select();

var slide_effect;
if(base.getType()!=='Mobile'){
	slide_effect = '${slideEffect.value}';
}else{
	slide_effect = 'slide';
}
require('slide');
$('.topnews').slide({
	effect:slide_effect,
	wrap:'.tn_wrap',
	cell:'.tn_cell',
	prevHtml:'<i class="ion">&#xe6c3;</i>',
	nextHtml:'<i class="ion">&#xe6c4;</i>'
})