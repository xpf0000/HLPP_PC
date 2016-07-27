requirejs(['main'], function (main) {
     require(['mmRouter','jquery','datepicker','domReady!'], function(avalon) {
	     
	     	$("#right_main").load("user_edit_info.html");
	     	
 			var model = avalon.define({		
                    $id: "userVC",		
                    currPath: "",		
                    params: {},		
                    query: {},		
                     args: "[]"		
                 });		
                 		
                 		
                 function callback() {		
 	                		
 	                alert("#############");		
 	                		
                     model.currPath = this.path		
                     var params = this.params		
                     if ("time" in params) {		
                         params.time = avalon.filters.date(params.time, "yyyy年M月dd日")		
                     }		
                     model.params = params		
                     model.args = "[" + [].slice.call(arguments).join(",") + "]"		
                     model.query = this.query	
                     
                     console.log(model.currPath);	
                     console.log(model.params);
                     console.log(model.args);
                     console.log(model.query);
                     
                     
                     
           
                 };		
                 		
                 		
                 avalon.router.get("/user_edit_info.html", function()
                 {
	                 $("#right_main").load("user_edit_info.html",function(){
		    
							     
	    			});

                 })	
                 
                 avalon.router.get("/activity_list.html", function()
                 {
	                 $("#right_main").load("activity_list.html",function(){
		    
							     
	    			});

                 })	
                 		
                 		
                 avalon.history.start({		
                     basepath: "/"		
                 });		
                 		
                 		
	     
	     
})})