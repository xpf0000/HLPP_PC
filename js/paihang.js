requirejs(['main'], function (main) {
	//require(['avalon','net','domReady!'], function(avalon) {
		
		var vm  = avalon.define({		
	 			
                    $id: "rightPHView",		
                    
                    paihang: [],
		  		
					rbanner: {
			  		
			  		id : '',
			  		picurl : '',
			  		url : '',
			  		title : ''
			  		
		  			},
                      
            });
            
            
			$("#paihang").load("./common/paihang.html",function(){
				
				avalon.scan(document.getElementById('rightPHView'));
 		
			})
            
            
            
            getRBanner();
            getPaihang();
            
            function getRBanner()
			{	
				var url = BaseUrl+"Public/Found/?service=common.getguanggao&typeid=8";   
				XHttpGet( url, function(data) 
				{
					if(data.data.info.length > 0)
					{
						vm.rbanner.id = data.data.info[0].id;
						vm.rbanner.picurl = data.data.info[0].picurl;
						vm.rbanner.url = data.data.info[0].url;
						vm.rbanner.title = data.data.info[0].title;
					}
				});
			}
			
			
			function getPaihang()
			{
				var url = BaseUrl+"Public/Found/?service=Plans.getListRM";
				XHttpGet( url, function(data) 
				{
					var info = data.data.info;
		
					if(info)
					{
						$(info).each(function(index,item)
						{
							item.s_time_str = $.myTime.UnixToDateFormat(item.s_time, "MM月dd日 mm:ss");
						});
			
						vm.paihang = info;
					}

				});
			}
	
		
//})
})