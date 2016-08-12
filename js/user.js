
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
				    
				    section: 1,
                                         	
                 });
                 
                 
                 
                 avalon.scan(document.getElementById('userVC'));
                 
                 avalon.router.get("/logout", function()
                 {
	                 
	                 deleteUser();
	                 
	                 location.href = "index.html";
	                                     	    				
                 })	
                 
                 
                 avalon.router.get("/changePass", function()
                 {  
	                 userVCModel.section = 1;
	                 
	                 changeClass(this.target);
	                 
	                 $("#right_main").html("");
   
				 
					 $("#right_main").load("changePass.html",function(){

					 	if(avalon.vmodels['changePassView'])
					 	{
						 	avalon.vmodels['changePassView'].$element = null;
					 	}
					 					  
					 	require(['changePass'], function() {   
						 	
						 	avalon.scan(document.getElementById('changePassView'));						 			                 
		              });
 
	    			});

	                                     	    				
                 })	

	
                 		
	
                 avalon.router.get("/user_edit_info.html", function()
                 {
	                 
	                 changeClass(this.target);
	                 
	                 userVCModel.section = 1;
	                 
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
	                 
	                 
	                 	                 
	                 if(userVCModel.section == 0)
	                 {
		                 selectedItem.removeClass("u_menu_sc_c");
						 $(this.target).addClass( "u_menu_sc_c" );
						 selectedItem = $(this.target);
	                 
		                 activityType = this.query.type;		                 
		                 avalon.vmodels['myhuodongView'].getData();
		                 
	                 }
	                 else
	                 {
		                 changeClass(this.target);
		                 
		                 userVCModel.section = 0;
	                 
						 var type = this.query.type;	
						 
						 $("#right_main").html("");
						 
						 if(avalon.vmodels['myhuodongView'])
					 	{				
						 	avalon.vmodels['myhuodongView'].$element = null;
					 	}

						 $("#right_main").load("activity_list.html",function(){
			                    
						 require(['activity_list'], function() {
				         
				           	activityType = type;
				           	
						   	avalon.scan(document.getElementById('myhuodongView'));
						   	
						   	//console.log(avalon.vmodels['myhuodongView'])
				           
				           initDatePicker();
				           
			          	})})
	                 }
	                 
	    			
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


