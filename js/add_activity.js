requirejs(['main'], function (main) {
     require(['jquery','avalon','wangEditor','datepicker','domReady!'], function(jquery,avalon,wangEditor,datepicker) {
	     
	     
	     var editor = new wangEditor('info');	     
	     // 上传图片（举例）

		 //editor.config.uploadImgUrl = 'http://192.168.2.113/uploadTest.php';
		 editor.config.uploadImgFileName = 'file';
 		 editor.config.uploadImgUrl = 'http://182.92.70.85/hlppapi/Public/Found/?service=Plans.addpicedit&uid=1&username=hlpp';

		 editor.create();
		 
		 var vm  = avalon.define({		
	 			
                    $id: "add_activityVC",	
                    
					title: '',
					
					s_time: '',
					
					e_time: '',
					
					price: '',
					
					a_number: '',
					
					category_id: '',
					
					content: '',
					
					pic: '../images/photo.jpg',
					
					cover_id: '',
					
					category: [],
					
					submitType: 0,
					
					msg: '',
					
              
              addvalidate: {
	        
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
                    
                    if (vm.pic == "../images/photo.jpg")
                    {
	                    vm.msg = "请上传封面图片";
	                    alert(vm.msg);
	                    
	                    return;
                    }
                    
                    if(vm.category_id == "")
                    {
	                    vm.msg = "请选择一个分类";
	                    alert(vm.msg);
	                    
	                    return;
                    }
                    
					if(submitType == 0)
					{
						doAdd();
					}
					else
					{
						doReview();
					}
                    
                    
                }
            },
            
        },
        
                
        review: function()
        {
	        console.log("点击预览")
	        
	        submitType = 1
	               
        },
                  
        uploadPic: function()
        {
	        console.log("点击上传图片!!!");
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
						
						vm.pic = imgURL;

					}


				},
              
                    
                    
        });
        
        function doReview()
        {
	        console.log("进入预览页面!!!")
	        	   
	        if (localStorage)
	        {
		        var details = {id:"0","title":vm.title,"view":"0","comment":"0","content":vm.content,"headimage":User.headimage,"nickname":User.nickname,"price":vm.price,"s_time_str":vm.s_time,"e_time_str":vm.e_time,"a_number":vm.a_number,"url":vm.pic};
		        var str = JSON.stringify(details);
		        
		        localStorage["hlpp_review"] = str;
		        
		        console.log(str);
		        
		        location.href = "event_info.html?id=0";
 
	        }
	        else
	        {
		        alert("当前浏览器版本过低,暂不支持预览功能");
	        }
	        
	        
	        
	        
        }
            
        function doAdd()
        {
	     
	     	vm.s_time = vm.s_time.replace("/", "-")
	     	vm.e_time = vm.e_time.replace("/", "-")
	     	   
	        url = BaseUrl+"Public/Found/?service=Plans.addpic";
	 
			var form = new FormData();
			form.append('file',$("#file")[0].files[0],"upload.jpg");
			form.append('uid',User.id);
			form.append('username',User.username);

			XHttpUpload(url,form,function(data)
			{
	        	console.log(data);
		
				var code = data.data.code;
		
				if(code == '0')
				{	
			
					//alert("上传成功!!!!"+data.data.info[0].url);
					vm.cover_id = data.data.info[0].id;


					var addForm = new FormData($("#addvalidate")[0]);
					addForm.delete("file");
					addForm.append('uid',User.id);
					addForm.append('username',User.username);
					addForm.append('category_id',vm.category_id);
					addForm.append('cover_id',vm.cover_id);
					
					//console.log(addForm)
					
					var url = BaseUrl+"Public/Found/?service=Plans.addPlan";
					
					XHttpUpload( url, addForm , function(data) 
					{
		
						var code = data.data.code;
		
						if(code == '0')
						{			
							alert("发布成功!");
			
							return;
						}
		
						msg = data.data.msg ? data.data.msg : '发布失败,请重试';
		
						alert(msg);


					});
					
					
					

						
			
					return;
				}

	        
        	})	

	        
	        
	        
        }
        
        
        function getCategory()
        {
	        var url = BaseUrl+"Public/Found/?service=Plans.getCategory";
					
					XHttpGet( url, function(data) 
					{		
						var code = data.data.code;
		
						if(code == '0')
						{	
							vm.category = data.data.info;
						}
		
					});

        }
        
        
        initDatePicker();
        
		 getCategory();
		 
		 
		 
		 avalon.scan(document.getElementById('add_activityVC'));
	     
})})

var submitType = 0

function doSubmit()
{
	             
	        if(!User.loginClick())
	        {
		        return false
	        }
	        console.log("点击提交")
	        
	        submitType = 0
	        
	        return true
 }

