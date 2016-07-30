requirejs(['main'], function (main) {
	require(['avalon','net','domReady!'], function(avalon) {
		
		var vm  = avalon.define({		
	 			
                    $id: "changePassView",	
                    
                    pw: '',
                    pw1: '',
                    pw2: '',
                    
                    msg: '' ,
        
					cpdvalidate: {
	        
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
     
                    doChangePass();
                    
                }
            },
            
        },
 
 	});
 	
 	function doChangePass()
 	{
	 	var url = BaseUrl+"Public/Found/?service=User.updatePass2&mobile="+User.mobile+"&oldpass="+vm.pw+"&newpass="+vm.pw2;
 
			XHttpGet( url, function(data) 
			{

				var code = data.data.code;
		
				if(code == '0')
				{	
					
					alert("密码修改成功");

					return;
				}
		
				vm.msg = data.data.msg ? data.data.msg : '密码修改失败,请重试';

			});

 	}
                
                
        avalon.scan(document.getElementById('changePassView'));
	
		
		console.log("changePass js loaded !!!!!")
		
		
})})