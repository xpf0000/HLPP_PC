
var LoginModel;
var User;

requirejs(['../main'], function (main) {

	require(['jquery','avalon','showDialog','domReady!'], function(jquery,avalon,dialog) {
	
	
	User = avalon.define({
	    
        $id: "User",
        
        id : '',
        nickname: '',
        username: '',
        headimage: '../images/face03.png',
        openid: '',
        mobile: '',
        
        isLogin: false,
        
        loginClick: function()
        {
	        if(User.id != "" && User.isLogin)
	        {
		        return true;
	        }
	        else
	        {
		        showDialog.show({id:'loginBar',bgcolor:'#000',opacity:60});
		        return false;
	        }
	        
        }

    }); 

	
	
	 LoginModel = avalon.define({
	    
        $id: "LoginMSC",
        account: '',
        password: '',
        
        msg: '' ,
        
        loginvalidate: {
	        
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
    
    
    if($("#header").html() == "")
	    {
		    $("#header").load("./common/header.html",function(){
		    
		    $("#login").load("./common/login.html",function()
		    {
				avalon.scan(document.getElementById('loginBar'));
				avalon.scan(document.getElementById('User'));
				
		    });
		     
	    });
	}
	
	getUserFromCookie();
	
	
    
	function doLogin()
	{		
		var url = BaseUrl+"Public/Found/?service=User.login&mobile="+LoginModel.account+"&password="+LoginModel.password;
 
	
	
	XHttpGet( url, function(data) 
	{
		
		console.log(data);
		
		var code = data.data.code;
		
		if(code == '0')
		{	
			User.isLogin = true;
			
			User.id = data.data.info[0].id;
			User.nickname = data.data.info[0].nickname;
			User.username = data.data.info[0].username;
			User.headimage = data.data.info[0].headimage;
			User.openid = data.data.info[0].openid;
			User.mobile = data.data.info[0].mobile;
			
			console.log(User.nickname);
			
			saveUser();
			
			showDialog.hide();
			
			return;
		}
		
		LoginModel.msg = data.data.msg ? data.data.msg : '登录失败,请重试';

	});
		
	
	}
	

	
});
});



function saveUser()
	{
		if(User.isLogin)
		{
			addCookie("id",User.id,60*60*24*7);//添加cookie记录,有效时间60s
			addCookie("nickname",User.nickname,60*60*24*7);//添加cookie记录,有效时间60s
			addCookie("username",User.username,60*60*24*7);//添加cookie记录,有效时间60s
			addCookie("headimage",User.headimage,60*60*24*7);//添加cookie记录,有效时间60s
			addCookie("openid",User.openid,60*60*24*7);//添加cookie记录,有效时间60s
			addCookie("mobile",User.mobile,60*60*24*7);//添加cookie记录,有效时间60s
			
			
			console.log(User.nickname);
			console.log(getCookieValue("nickname"));
		}
		
	}
	
	function deleteUser()
	{
		editCookie("id","",0);
		editCookie("nickname","",0);
		editCookie("username","",0);
		editCookie("headimage","",0);
		editCookie("openid","",0);
		editCookie("mobile","",0);
	}
	
	function getUserFromCookie()
	{
		User.id = getCookieValue("id");
		User.nickname = getCookieValue("nickname");
		User.username = getCookieValue("username");
		User.headimage = getCookieValue("headimage");
		User.openid = getCookieValue("openid");
		User.mobile = getCookieValue("mobile");
		
		User.isLogin = User.id != "";
		
		
		console.log(User.nickname);
		
	}