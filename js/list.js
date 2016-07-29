
var page = 1;

requirejs(['main'], function (main) {
     
    require(['avalon','paihang','gotop','domReady!'], function(avalon) {	        

    var vm = avalon.define({
	    
        $id: "listVC",
        
        info : [],
        
        msg : '点击加载更多',
        
        end : false,
        
        nextPageClick: function() {

		getTj();
		
		},
		
		

    }); 
    
    avalon.scan(document.getElementById('listVC'));
        
    getTj();
    
    
    function getTj()
	{
		var url = BaseUrl+"Public/Found/?service=plans.getlist&page="+page+"&perNumber=20";

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
			
				page = page + 1;
			
				if(info.length<20)
				{
					vm.end = true;
					vm.msg = '已无更多!';
				}
			}

		});
	}
    

  });      
});
















