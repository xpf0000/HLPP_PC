
requirejs(['../main'], function (main) {

	require(['avalon','net','domReady!'], function(avalon) {
		
		 var editUserModel  = avalon.define({		
	 			
                    $id: "editUserVC",		
                   
                   id : '0',
                   
				   nickname: '',
				   username: '',
				   headimage: '',
				   openid: '',
				   mobile: '',
                   address: '',
                   birthday: '',
                   truename: '',
                   sex: '0',
                   address0: '',
                   address1: '',
                   message: '',
                   
                submit: function()
				{
				  	 console.log(editUserModel);

				  	 var url = BaseUrl+"Public/Found/?service=User.userEdit&username="+User.username+"&nickname="+editUserModel.nickname+"&truename=&sex=&birthday=&address=";
				  	 
				  	 console.log(url);
				  	 
	XHttpGet( url, function(data) 
	{
		
		console.log(data);
		
		var code = data.data.code;
		
		if(code == '0')
		{	
			
			User.nickname = editUserModel.nickname;
	
			saveUser();
			
			alert("更新成功!");
			
			return;
		}
		
		msg = data.data.msg ? data.data.msg : '更新失败,请重试';
		
		alert(msg);


	});
	
	//console.log($("#file").files.length);

		if($("#file")[0].files.length > 0)
		{
			url = BaseUrl+"Public/Found/?service=User.headEdit";
	 
	 var form = new FormData($( "#uploadHead" )[0]);
	 form.append('username',User.username);

        XHttpUpload(url,form,function(data)
        {
	        console.log(data);
		
		var code = data.data.code;
		
		if(code == '0')
		{	
			
			User.headimage = editUserModel.headimage;
	
			saveUser();
			
			return;
		}

	        
        })	
		}
				  	   		
    },
        		
        		
        		upload: function()
        		{
	        		$("#file").click();
	        		

        		},
        		
        		fileChange: function(event)
        		{
	        		
	        		console.log(event.target);
	        		
	        		console.log(document.getElementById('file'));
	        		
	        		
	        		
	        		console.log($("#file")[0]);
	        		
	        		
	        		var files = event.target.files, file; 
					if (files && files.length > 0) { 

						file = files[0]; 


						if(file.size > 1024 * 1024 * 2) { 
							alert('图片大小不能超过 2MB!'); 
							return false; 
						} 

						var URL = window.URL || window.webkitURL; 

						var imgURL = URL.createObjectURL(file); 
						
						editUserModel.headimage = imgURL;

						$("#head1").attr("src", imgURL);
						$("#head2").attr("src", imgURL);
						$("#head3").attr("src", imgURL);
						
						}


				},
        			
        			
        		
        			
                   
                   
        });


		avalon.scan(document.getElementById('editUserVC'));
		
		
		
/*
$('#file').change(function(event) { 

console.log(event); 

var files = event.target.files, file; 
if (files && files.length > 0) { 

file = files[0]; 


if(file.size > 1024 * 1024 * 2) { 
alert('图片大小不能超过 2MB!'); 
return false; 
} 

var URL = window.URL || window.webkitURL; 

var imgURL = URL.createObjectURL(file); 

$("#head1").attr("src", imgURL);
$("#head2").attr("src", imgURL);
$("#head3").attr("src", imgURL);


} 
}); 
	
*/	

		
})})





