
var page = 1;
var indexModel;

requirejs(['main'], function (main) {
    
    
     require(['avalon','jquery','paihang','gotop','domReady!'], function(avalon) {
	    
  
	      	    indexModel = avalon.define({
	    
		  		$id: "indexVC",
        
		  		banner : [],
		  		
		  		tj: [],
		  		
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
    getTj();
 
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












