// JavaScript Document
	$(function(){
			$("#focus").hover(function(){$("#focus-prev,#focus-next").show();},function(){$("#focus-prev,#focus-next").hide();});
			$("#focus").slide({ 
				mainCell:"#focus-bar-box ul",
				targetCell:"#focus-title a",
				titCell:"#focus-num a",
				prevCell:"#focus-prev",
				nextCell:"#focus-next",
				effect:"left",
				easing:"easeInOutCirc",
				autoPlay:true,
				delayTime:400
			})
		})