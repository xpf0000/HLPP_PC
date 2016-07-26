
function XHttpGet(url,callBack)
{
	$.support.cors = true;
	
				$.ajax
				({
            
            		type: "GET",
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					url: url,  //这里是网址
					timeout:15000, //超时时间
					success:function(data)
					{
	          	  		callBack(data);	                
            		}, 
					error: function (err) 
					{
						callBack(err);
            		}
        		});
}