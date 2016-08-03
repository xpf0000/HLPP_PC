requirejs(['main'], function (main) {

	var vm = avalon.define({
	    
        $id: "joinView",
        name: '',
        sex: '0',
        mob: '',
        code: '',
        
        msg: '' ,
        
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
     
                    doJoin();
                    
                }
            },
            
        },
         

    }); 
    
    
    
    function doJoin()
        {      
	        var url = BaseUrl+"Public/Found/?service=Plans.addJoin&id="+id+"&uid="+User.id+"&username="+User.username;
 
			XHttpGet( url, function(data) 
			{
				var code = data.data.code;
		
				if(code == '0')
				{	
					
					showDialog.hide();
					getJoinUser();
					alert("参加活动成功");

					return;
				}
		
				vm.msg = data.data.msg ? data.data.msg : '参加失败,请重试';

			});
 
        }   



	$("#join").load("./common/join.html",function(){

		    avalon.scan(document.getElementById('joinBar'));
		    		     
	});	
	
	
})