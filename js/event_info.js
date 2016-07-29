var id;

requirejs(['main'], function (main) {
     require(['jquery','showDialog','avalon','gotop','paihang','domReady!'], function(jquery,dialog,avalon) {

	 		id = $.getUrlParam('id');
	 		
	 		var vm  = avalon.define({		
	 			
                    $id: "eventInfoVC",		
					id: "",
					title: "",
					view: "",
					comment: "",
					update_time: "",
					content: "",
				  	nickname: "",
				  	price: "",
				  	s_time: "",
				  	e_time: "",
				  	
				  	s_time_str: "",
				  	e_time_str: "",
				  	
				  	a_number: "",
				  	url: "",
				  	
				  	joinUser: [],
				  	
				  	commentList: [],
                                      
            });
            
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
						vm.commentList = data.data.info;
					}
					
					console.log(vm.commentList);
					
				});
			}

            


	     
})})




function code_show(obj, sType) 
{ 
var oDiv = document.getElementById(obj); 
if (sType == 'show') { oDiv.style.display = 'block';} 
if (sType == 'hide') { oDiv.style.display = 'none';} 

}