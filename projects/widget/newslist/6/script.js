require('img-loaded');
require('masonry');

var ${id}_container = $('#${id} ul');
var ${id}_cellMargin = ${cellMargin.value};
var ${id}_cellWidth = parseInt(($('#${id}').width()-${cols.value}*${cellMargin.value})/${cols.value});

$('#${id} ._item').css({
	marginRight: ${id}_cellMargin,
	marginBottom: ${id}_cellMargin,
	width: ${id}_cellWidth
});
if (base.getType() != 'Mobile'){
	${id}_container.imagesLoaded(function() {
		${id}_container.masonry({
			itemSelector: '._item'
		});
	});
}