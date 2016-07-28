
var selectedItem;

requirejs(['main'], function (main) {
     require(['mmRouter','jquery','datepicker','domReady!'], function(avalon) {
	     
	     	$("#right_main").load("user_edit_info.html");
	     	
	     	selectedItem = $("#nowSelect");
	     	
 			var model = avalon.define({		
	 			
                    $id: "userVC",		
                    currPath: "",		
                    params: {},		
                    query: {},		
                     args: "[]"	,
                                         	
                 });		
                 		
	
                 avalon.router.get("/user_edit_info.html", function()
                 {
	                 
	                 changeClass(this.target);
	                 
	                 $("#right_main").html("");
   
   
					 console.log('点击用户资料 !!!!!!!!!');
					 
					 console.log(this.target);
					 
					 $("#right_main").load("user_edit_info.html",function(){

					 console.log('loaded user_edit_info !!!!!!!!!');
					 
					 require(['edituser'], function() {   
		                 
		              })
		    	     
	    			});


	                                  	    				
                 })	
                 
                 avalon.router.get("/activity_list.html", function()
                 {
	                 
	                 changeClass(this.target);
	                 
	                 $('#datetimepicker_dark').datetimepicker({theme:'dark'})
	                 
	                 $("#right_main").html("");
	                 
	                 console.log('点击我的活动 !!!!!!!!!');
	                 
	                 console.log(this.target);
	                 
					 $("#right_main").load("activity_list.html",function(){
			                    
			           require(['activity_list'], function() {});
		                 
		              })

	                 
	                 
	                
	    			
                 })	;
                 		
                 		
                 avalon.history.start({		
                     basepath: "/"		
                 });
                 

	     
})})


				function changeClass(item)
                 {
				 	$(".xdsoft_datetimepicker").remove();
	                 selectedItem.removeClass("u_menu_sc_c");
	                 $(item).addClass( "u_menu_sc_c" );
	                 selectedItem = $(item);
   
                 }

				 function aClick(item) {

				 console.log('点击左侧菜单 !!!!!!!!!');

					changeClass(item);
		  			return true;
		  			}


