var BaseUrl = "http://182.92.70.85/hlppapi/";

require.config({
    baseUrl: '../js/lib',  //相对于index.html页面文件的地址
    paths:{   //这里配置的地址，都是相对于上方的baseUrl的
        avalon: 'avalon',
        domReady:'domReady',
        mmHistory: 'mmHistory',
        mmRouter: 'mmRouter',
        mmPromise: 'mmPromise',
        css: 'css',  //加上css.js
        jquery : 'jquery-1.8.0.min',
        SuperSlide : 'jquery.SuperSlide.2.1.1',
        gotop : 'gotop',
        foucs : 'foucs',
        mmAnimate : 'mmAnimate',
        validate : "jquery.validate.min",
        net: 'XRequest',
        spin: 'spin.min',
        header: '../header',
        edituser: '../edit_user',
        paihang: '../paihang',
		activity_list: '../activity_list',
        showDialog: 'showDialog.min',
        datepicker: 'jquery.datetimepicker.full',
        jmousewheel: 'jquery.mousewheel',
    },
    shim:{
        avalon: { exports: "avalon" },
        header: { exports: "header" },
        mmAnimate:{ deps: ['avalon']},    
    }
});


require(['jquery','net','header'], function() {	    

})


//只能输入数字
function onlyNumber(event){
	

   var keyCode = event.keyCode;   
  
     if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 8)    
    {   
	    
	    
         event.returnValue = true;    
     } else {    
	     
	      event.preventDefault();  
          event.returnValue = false;    
    }       
    
    
}


//发送验证码时添加cookie
function addCookie(name,value,expiresHours){ 
  var cookieString=name+"="+escape(value); 
  
  console.log(cookieString);
  
  //判断是否设置过期时间,0代表关闭浏览器时失效
  if(expiresHours>0){ 
    var date=new Date(); 
    date.setTime(date.getTime()+expiresHours*1000); 
    cookieString=cookieString+";expires=" + date.toUTCString(); 
  } 
  
   console.log(cookieString);
  
    document.cookie=cookieString; 
} 

//修改cookie的值
function editCookie(name,value,expiresHours){ 
  var cookieString=name+"="+escape(value); 
  if(expiresHours>0){ 
   var date=new Date(); 
   date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
   cookieString=cookieString+";expires=" + date.toGMTString(); 
  } 
   document.cookie=cookieString; 
} 

//根据名字获取cookie的值
function getCookieValue(name)
{ 
   var strCookie=document.cookie; 
   
   var arrCookie=strCookie.split("; "); 
   
   for(var i=0;i<arrCookie.length;i++){ 
	   
    var arr=arrCookie[i].split("="); 
    
    if(arr[0]==name)
    {
     return unescape(arr[1]);
    }
         
   } 
   
   return "";
     
}




