
var vm;

var spinner;

requirejs(['main'], function (main) {
    
    require(['jquery','avalon','domReady!'], function(jquery,avalon) {
	    
    $("#mob").keydown(onlyNumber);
    
    vm = avalon.define({
        $id: "re_passwordVC",
        mob: "",
        pw: '',
        cpw: '',
        paddword: '',
        code: '获取验证码',
        time: 60,
        message: '',
		
		mobDisabled: true,
        
        validate: {
	        
	        onSuccess : function (item,event) {
		        
		        
		        console.log($(this).attr("data-message"));
		        
		        if(this.id == 'mob')
		        {
			     	vm.mobDisabled = false;  
		        }
		        
		        if($(this).attr("data-required-message") == vm.message || $(this).attr("data-message") == vm.message)
		        {
			        vm.message = '';
		        }

		    },
	        
	        
            onError: function (reasons) {
	            
	            vm.message = '';
	            
                reasons.forEach(function (reason) {
	                
	                if(reason.element.id == 'mob')
	                {
		                vm.mobDisabled = true;
	                }
	                
	                vm.message = reason.getMessage();
	                
	                //alert(vm.message);
	                
                    console.log(reason.getMessage())
                    
                })
                
            },
            
            onValidateAll: function (reasons) {
	            
                if (reasons.length) 
                {
                    console.log('有表单没有通过')
  
                    vm.message = reasons[0].getMessage();

                } else {
	                
	                vm.message = "";
	                
                    console.log('全部通过');
     
                    doChange();
                    
                }
            }
  
        },
        
        sendCodeClick: function() {
		
			sendCode();
		
		},
	        
        
    })
    
    
    avalon.scan(document.getElementById('re_passwordVC'));
    
    initTime();
    
    

  });      
});


function doChange()
{
	
	var url = BaseUrl+"Public/Found/?service=User.updatePass&mobile="+vm.mob+"&password="+vm.pw+"&code="+vm.paddword;
 
	
	
	XHttpGet( url, function(data) 
	{
		
		var code = data.data.code;
		
		if(code == '0')
		{	
			alert("密码重置成功");
			
			return;
		}
		
		vm.message = data.data.msg ? data.data.msg : '重置密码失败,请重试';
		
		//alert(vm.message);

	});
	

}



function sendCode()
{
	
	var url = BaseUrl+"Public/Found/?service=User.getUserM&mobile="+vm.mob; 
	
	
	XHttpGet( url, function(data) 
	{
		var code = data.data.code;
		
		if(code == '1')
		{
			vm.message = '该手机号码尚未注册,请确认手机号';
			return;
		}
		

		var url = BaseUrl+"Public/Found/?service=User.smsSend&mobile="+vm.mob+"&type=2";
   
		
	
		XHttpGet( url, function(data) 
		{
			var info = data.data.info;
		
			if(info)
			{
				if(info.result.err_code == '0')
				{
					addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
					settime();//开始倒计时
				
					return;
				}
			}
		
			vm.message = '短信发送失败,请重试';

		});
		

	});
	
	
}


//进入页面时初始化时间
function initTime()
{
	v = getCookieValue("secondsremained");//获取cookie值
  
  if(v>0){
	  
    settime();//开始倒计时
    
  }

}


function settime() { 
	
  vm.time = getCookieValue("secondsremained");
  
  if (vm.time == 0) { 
    
    vm.code = '获取验证码';
    
    
    var reg=/0?(13|15|18|17)[0-9]{9}/;
    
    if(reg.test(vm.mob))    
    {
	    vm.mobDisabled = false;
    }
    else
    {
	    vm.mobDisabled = true;
    }
    
    return;
    
  } 
  else 
  { 
	  vm.mobDisabled = true;
	  vm.code = "重新发送(" + vm.time + ")";
	  vm.time--;
	  
	  editCookie("secondsremained",vm.time,vm.time+1);
  } 
  
  setTimeout(function() { settime() },1000) //每1000毫秒执行一次
  
} 












