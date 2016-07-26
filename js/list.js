
var tjModel;
var clickModel;
var pahangModel;
var vmodel;
var page = 1;

requirejs(['main'], function (main) {
    
    
    require(['jquery','mmRouter','domReady!'], function(jquery,avalon) {
	    
	        
    pahangModel = avalon.define({
	    
        $id: "paihang",
        
        info : [],

    }); 
    
    
    tjModel = avalon.define({
	    
        $id: "huodong",
        
        info : [],
        
        nextPageClick: function() {

		getTj();
		
		}

    }); 
    
    
    clickModel = avalon.define({
	    
        $id: "pageClick",
        
        msg : '点击加载更多',
        
        end : false,
        
        nextPageClick: function() {
		
		getTj();
		
		}

    });
    
    getTj();
    getPaihang();
    
  });      
});


function getTj()
{
	var url = BaseUrl+"Public/Found/?service=plans.getlisttj&page="+page+"&perNumber=20";
   
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		var info = data.data.info;
		
		if(info)
		{
			
			
			$(info).each(function(index,item)
			{
				item.s_time_str = $.myTime.UnixToDate(item.s_time);
			});
			
			
			tjModel.info = tjModel.info.concat(data.data.info);
			
			page = page + 1;
			
			if(info.length<20)
			{
				clickModel.end = true;
				clickModel.msg = '已无更多!';
			}
		}
		
		

	});
}



function getPaihang()
{
	var url = BaseUrl+"Public/Found/?service=plans.getlisttj&page=1&perNumber=10";
   
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		var info = data.data.info;
		
		if(info)
		{
			$(info).each(function(index,item)
			{
				item.s_time_str = $.myTime.UnixToDateFormat(item.s_time, "MM月dd日 mm:ss");
			});
			
			pahangModel.info = info;
		}
		
		

	});
}










