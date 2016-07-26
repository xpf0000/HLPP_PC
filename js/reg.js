
var vm;

requirejs(['main'], function (main) {
    
    
    require(['jquery','avalon','domReady!'], function(jquery,avalon) {
	    
    $("#mob").keydown(onlyNumber);
    
    vm = avalon.define({
        $id: "validate1",
        mob: "",
        pw: '',
        cpw: '',
        paddword: '',
        agree: false,
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
                    
                   return;
                })
                
            },
            
            onValidateAll: function (reasons) {
                if (reasons.length) {
                    console.log('有表单没有通过')
                    
                    
                    vm.message = reasons[0].getMessage();
                    
                    reasons.forEach(function (reason) {
	                
					switch(reason.element.id)
					{
						case 'mob' :
						console.log('手机号验证未通过!!!')
						vm.mobMsg = reason.getMessage();
						break;
						
						case 'pw' :
						console.log('密码验证未通过!!!')
						vm.pwMsg = reason.getMessage();
						break;
						
						case 'cpw' :
						console.log('确认密码验证未通过!!!')
						vm.cpwMsg = reason.getMessage();
						break;
						
						case 'checkbox-2-1' :
						console.log('同意协议验证未通过!!!')
						vm.agreeMsg = reason.getMessage();
						break;
						
						default :
						break;
					}
					
                    console.log(reason.element.id);
                    
                })

                    
                    
                } else {
	                
	                vm.message = "";
	                
                    console.log('全部通过');
     
                    doRegist();
                    
                }
            }
  
        },
        
        sendCodeClick: function() {
		
			sendCode();
		
		},
		
		wxLogin: function() {
		
			alert("点击微信登录");
		
		},

        qqLogin: function() {
		
			alert("点击QQ登录");
		
		},
        
        
        
        
    })
    
    
    avalon.validators.checked = {
	   	    
        get: function (value, field, next) {
            next(value)
            
            vm.message = '请同意网站注册协议';
            
            return value
        }
    }
    
    
    
    initTime();
    
    

  });      
});


function doRegist()
{
	
	var url = BaseUrl+"Public/Found/?service=User.register&mobile="+vm.mob+"&password="+vm.pw+"&code="+vm.paddword+"&nickname=";
   
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		
		console.log(data);
		
		var code = data.data.code;
		
		if(code == '0')
		{	
			location.href = "user_info.html";
			
			return;
		}
		
		vm.message = data.data.msg ? data.data.msg : '注册失败,请重试';

	});
	

}



function sendCode()
{
	
	var url = BaseUrl+"Public/Found/?service=User.getUserM&mobile="+vm.mob; 
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		var code = data.data.code;
		
		if(code == '0')
		{
			vm.message = '该手机号码已注册,请更换手机号';
			return;
		}
		

		var url = BaseUrl+"Public/Found/?service=User.smsSend&mobile="+vm.mob+"&type=1";
   
		$.support.cors = true;
	
		$.getJSON( url, function(data) 
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












