var activityType = 0;

requirejs(['main'], function (main) {
     require(['avalon','domReady!'], function(avalon) {
	     
	  	 
	     var vm  = avalon.define({		
	 			
                    $id: "myhuodongView",	                
                    
                    info: [],
                    page: 1,
                    end: false,               
                    msg: '' ,
                    
                    getData: function()
                    {

	                    console.log("type is "+ activityType)
	                    
	                    var url;
	                    
	                    if(activityType == 0)
	                    {
		                    
	                    }
	                    else if(activityType == 1)
	                    {
		                    url =  BaseUrl+"Public/Found/?service=Users.getJoinList&uid="+User.id;
	                    }
	                    else
	                    {
		                    url =  BaseUrl+"Public/Found/?service=Users.getCollectList&uid="+User.id;
	                    }
	                    
	                    vm.info = [];
	                    
	                    XHttpGet( url, function(data) 
						{
							var info = data.data.info;
		
							if(info)
							{
								$(info).each(function(index,item)
								{
									item.s_time_str = $.myTime.UnixToDate(item.s_time);
								});
			
			
								vm.info = vm.info.concat(data.data.info);
			
								vm.page = vm.page + 1;
			
								if(info.length<20)
								{
									vm.end = true;
									vm.msg = '已无更多!';
								}
							}
		
		

						});

	                    
	                    
	                    
                    },
                    
                                        
                    })
	     
	     
	     avalon.scan(document.getElementById('myhuodongView'));
	     
	     
	     console.log('loaded activity_list !!!!!!!!!');
	     
	     vm.getData();
	     
	     
	     
})})




