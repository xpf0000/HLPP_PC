
var page = 1;
var indexModel;

requirejs(['main'], function (main) {
    
    
     require(['avalon','jquery','domReady!'], function(avalon) {
	    
  
	      	    indexModel = avalon.define({
	    
		  		$id: "indexVC",
        
		  		banner : [],
		  		
		  		tj: [],
		  		
		  		paihang: [],
		  		
		  		rbanner: {
			  		
			  		id : '',
			  		picurl : '',
			  		url : '',
			  		title : ''
			  		
		  		},
		  		
		  		nextPageClick: function() {

		  			getTj();
		
				},
				
				end: false,
				
				msg: '点击加载更多',
				

    			});  
	      	    

				console.log('333333');

				avalon.scan(document.getElementById('indexVC'));
    
				console.log('444444');
    
    getBanner();
    getRBanner();
    getTj();
    getPaihang();
    
    
  });      
});



function getBanner()
{
	
	var url = BaseUrl+"Public/Found/?service=common.getguanggao&typeid=7";
	
	XHttpGet(url,function(data) 
	{
		indexModel.banner = data.data.info;
	});
	
}

function getRBanner()
{
	
	var url = BaseUrl+"Public/Found/?service=common.getguanggao&typeid=8";
   

	XHttpGet( url, function(data) 
	{
		if(data.data.info.length > 0)
		{
			indexModel.rbanner.id = data.data.info[0].id;
			indexModel.rbanner.picurl = data.data.info[0].picurl;
			indexModel.rbanner.url = data.data.info[0].url;
			indexModel.rbanner.title = data.data.info[0].title;
		}
		

	});
	
}


function getTj()
{
	var url = BaseUrl+"Public/Found/?service=plans.getlisttj&page="+page+"&perNumber=20";
   
	
	
	XHttpGet( url, function(data) 
	{
		var info = data.data.info;
		
		if(info)
		{
			
			
			$(info).each(function(index,item)
			{
				item.s_time_str = $.myTime.UnixToDate(item.s_time);
			});
			
			
			indexModel.tj = indexModel.tj.concat(data.data.info);
			
			page = page + 1;
			
			if(info.length<20)
			{
				indexModel.end = true;
				indexModel.msg = '已无更多!';
			}
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
			
			indexModel.paihang = info;
		}
		
		

	});
}











