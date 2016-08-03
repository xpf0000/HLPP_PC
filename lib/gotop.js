
function b(){
	h = $(window).height();
	t = $(document).scrollTop();
	if(t > h){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
}

b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})

/*
$(document).ready(function(e) {
	
});
*/

$(window).scroll(function(e){
	b();		
})