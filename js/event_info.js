var id;

requirejs(['main'], function (main) {
     require(['avalon','showDialog','paihang','join','gotop','domReady!'], function(avalon,dialog) {

	 		id = $.getUrlParam('id');
	 		
	 		var vm  = avalon.define({		
	 			
                    $id: "eventInfoVC",		
					id: "",
					title: "",
					view: "",
					comment: "",
					update_time: "",
					content: "",
					headimage: '',
				  	nickname: "",
				  	price: "",
				  	s_time: "",
				  	e_time: "",
				  	
				  	s_time_str: "",
				  	e_time_str: "",
				  	
				  	a_number: "",
				  	url: "",
				  	
				  	editComment: '',
				  	
				  	joinUser: [],
				  	
				  	commentList: [],
				  	
				  	postComment: function()
				  	{
					  	if(!User.loginClick())
					  	{
						  	return;
					  	}
					  	
					  	if($.trim(vm.editComment).length>0)
					  	{
						  	
						  	var url = BaseUrl+"Public/Found/?service=Plans.addComment&id="+id+"&content="+vm.editComment+"&uid="+User.id+"&username="+User.username;

						  	XHttpGet( url, function(data) 
						  	{		
						  		var code = data.data.code;
		
						  		if(code == '0')
						  		{	
							  		getComment();
							  		return;
								}
		
								var msg = data.data.msg ? data.data.msg : '登录失败,请重试';
								
								alert(msg);
								
							});
	
					  	}
					  	
				  	},
				  	
				  	joinClick: function()
				  	{
					  	if(!User.loginClick())
					  	{
						  	return;
					  	}
					  	
					  	showDialog.show({id:'joinBar',bgcolor:'#000',opacity:60});
	        
        			}
				  	
                                      
            });
            
            avalon.scan(document.getElementById('eventInfoVC'));
            
            getInfo();
            getJoinUser();
            getComment();
            
            
            function getInfo()
			{	
				var url = BaseUrl+"Public/Found/?service=Plans.getArticle&id="+id;   
				XHttpGet( url, function(data) 
				{
					if(data.data.info.length > 0)
					{
						vm.id = data.data.info[0].id;
						vm.title = data.data.info[0].title;
						vm.view = data.data.info[0].view;
						vm.comment = data.data.info[0].comment;
						vm.update_time = data.data.info[0].update_time;
						vm.content = data.data.info[0].content;
						vm.nickname = data.data.info[0].nickname;
						vm.price = data.data.info[0].price;
						vm.s_time = data.data.info[0].s_time;
						vm.e_time = data.data.info[0].e_time;
						vm.a_number = data.data.info[0].a_number;
						vm.url = data.data.info[0].url;
						vm.headimage = data.data.info[0].headimage;
						
						vm.s_time_str = $.myTime.UnixToDateFormat(vm.s_time, "yyyy-MM-dd mm:ss");
						vm.e_time_str = $.myTime.UnixToDateFormat(vm.e_time, "yyyy-MM-dd mm:ss");
						
						
						$(document).attr("title",vm.title+"活动-河洛泡泡");//修改title值
					}
				});
			}
			
			function getJoinUser()
			{	
				var url = BaseUrl+"Public/Found/?service=Plans.getJoinList&id="+id;   
				XHttpGet( url, function(data) 
				{
					if(data.data.info.length > 0)
					{
						vm.joinUser = data.data.info;
					}
				});
			}
			
			function getComment()
			{	
				var url = BaseUrl+"Public/Found/?service=Plans.getCommentList&id="+id;   
				XHttpGet( url, function(data) 
				{
					if(data.data.info.length > 0)
					{
						
						$(data.data.info).each(function(index,item)
						{
							item.time = $.myTime.DateDiff(item.create_time);							
						});
						
						vm.commentList = data.data.info;
					}

				});
			}

            


	     
})})




function code_show(obj, sType) 
{ 
var oDiv = document.getElementById(obj); 
if (sType == 'show') { oDiv.style.display = 'block';} 
if (sType == 'hide') { oDiv.style.display = 'none';} 

}