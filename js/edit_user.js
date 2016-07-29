
requirejs(['main'], function (main) {

	require(['avalon','net','domReady!'], function(avalon) {
		
		 var editUserModel  = avalon.define({		
	 			
                    $id: "editUserVC",		
                   
                   id : '0',
                   
				   nickname: '',
				   username: '',
				   headimage: '../images/face01.jpg',
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
        
        $("#right_main").load("user_edit_info.html",function(){
 		
 			avalon.scan(document.getElementById('editUserVC'));
 			
 			
 			console.log(User);
 			
 			userVCModel.id = User.id;
 			userVCModel.nickname = User.nickname;
 			userVCModel.headimage = User.headimage;
 			
 			
 			editUserModel.id = User.id;
 			editUserModel.nickname = User.nickname;
 			editUserModel.headimage = User.headimage;
 			editUserModel.truename = User.truename;
 			editUserModel.headimage = User.headimage;
 			editUserModel.headimage = User.headimage;
 			
 		
		});

	

		
})})





