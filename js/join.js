requirejs(['../main'], function (main) {

	var vm = avalon.define({
	    
        $id: "joinView",
        name: '',
        sex: '0',
        mob: '',
        code: '',
        
        msg: 'dfsdsd' ,
        
        joinvalidate: {
	        
	        onSuccess : function (item,event) {
		        
		        
		        if($(this).attr("data-required-message") == LoginModel.msg || $(this).attr("data-message") == LoginModel.msg)
		        {
			        LoginModel.msg = '';
		        }

		    },
	        
	        
            onError: function (reasons) {
	            
	            LoginModel.msg = '';
	            
                reasons.forEach(function (reason) {
	                	                
	               LoginModel.msg = reason.getMessage();
  
                    console.log(reason.getMessage())
                    
                   return;
                })
                
            },
            
            onValidateAll: function (reasons) {
	            
	            console.log('%%%%%%%%%%%');
	            	            
                if (reasons.length) {
                    console.log('有表单没有通过')
                    
                    LoginModel.msg = reasons[0].getMessage();
                     
                } else {
	                
	                LoginModel.msg = "";
	                
                    console.log('全部通过');
     
                    doLogin();
                    
                }
            }
  
        },
        
        

    }); 


	$("#join").load("./common/join.html",function(){
		    
		    
		    avalon.scan(document.getElementById('joinView'));
		    		     
	});	
	
	
})