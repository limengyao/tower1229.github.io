

	$(".widget-job-2").on('click','._jt',function() {
		$(this).addClass("_jt_act").siblings("._jt_act").removeClass("_jt_act").end().
		next("._jc").slideDown('128').siblings("._jc:visible").slideUp('128');
	}).find('._jt:first').trigger('click');
        