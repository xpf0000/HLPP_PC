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
		        
		        
		        if($(this).attr("data-required-message") == vm.msg || $(this).attr("data-message") == vm.msg)
		        {
			        vm.msg = '';
		        }

		    },
	        
	        
            onError: function (reasons) {
	            
	            vm.msg = '';
	            
                reasons.forEach(function (reason) {
	                	                
	               vm.msg = reason.getMessage();
  
                   return;
                })
                
            },
            
            onValidateAll: function (reasons) {
	            
                if (reasons.length) {
                    console.log('有表单没有通过')
                    
                    vm.msg = reasons[0].getMessage();
                     
                } else {
	                
	                vm.msg = "";
	                
                    console.log('全部通过');
     
                    doLogin();
                    
                }
            }
  
        },
        
        
        
        
        

    }); 


	$("#join").load("./common/join.html",function(){

		    avalon.scan(document.getElementById('joinBar'));
		    		     
	});	
	
	
})