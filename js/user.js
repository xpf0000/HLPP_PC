
var selectedItem;
var userVCModel

requirejs(['main'], function (main) {
     require(['mmRouter','jquery','datepicker','domReady!'], function(avalon) {
	     
	     require(['edituser'], function() {  
	     });
	    			
	    			
	     	
	     	selectedItem = $("#nowSelect");
	     	
 			userVCModel = avalon.define({		
	 			
                    $id: "userVC",	
                    id : '0',	
                    nickname: '',
                    username: '',
				    headimage: '../images/face02.jpg',
                                         	
                 });
                 
                 
                 
                 avalon.scan(document.getElementById('userVC'));
                 
                 avalon.router.get("/logout", function()
                 {
	                 
	                 deleteUser();
	                 
	                 location.href = "index.html";
	                                     	    				
                 })	
	
                 		
	
                 avalon.router.get("/user_edit_info.html", function()
                 {
	                 
	                 changeClass(this.target);
	                 
	                 $("#right_main").html("");
   
				 
					 $("#right_main").load("user_edit_info.html",function(){

					 avalon.vmodels['editUserVC'].$element = null;
					  
					 	require(['edituser'], function() {   
						 	
						 	avalon.scan(document.getElementById('editUserVC'));
						 	
						 	console.log(User);
		                 
		              });
		              
		              
		    	     
	    			});


	                                  	    				
                 })	
                 
                 avalon.router.get("/activity_list.html", function()
                 {
	                 
	                 changeClass(this.target);
	                 

	                 $("#right_main").html("");

					 $("#right_main").load("activity_list.html",function(){
			                    
			           require(['activity_list'], function() {
				         
				           initDatePicker();
				           
			          })})
 
	    			
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


