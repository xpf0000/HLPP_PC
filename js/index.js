
var bannerModel;
var tjModel;
var clickModel;
var pahangModel;
var vmodel;
var page = 1;

requirejs(['main'], function (main) {
    
    
    require(['jquery','avalon','domReady!'], function(jquery,avalon) {
	    
	    
/*
		路由   单页应用比较适用
		var model = avalon.define({
                    $id: "test",
                    currPath: "",
                    params: {},
                    query: {},
                    args: "[]"
                });
                
                
                function callback() {
	                
	                alert("#############");
	                
                    model.currPath = this.path
                    var params = this.params
                    if ("time" in params) {
                        params.time = avalon.filters.date(params.time, "yyyy年M月dd日")
                    }
                    model.params = params
                    model.args = "[" + [].slice.call(arguments).join(",") + "]"
                    model.query = this.query
                };
                
                
                avalon.router.get("/list.html", callback)
                
                
                avalon.history.start({
                    basepath: "/"
                });
                
                
                avalon.scan()  ;
*/
	    
	    avalon.define({  
            $id: "test",  
            xxx: "引入内部模板",
            render: function(tmpl) {
			
			alert("$$$$$$$$$$$$$$$");
			
			},
        }); 
	    
	bannerModel = avalon.define({
	    
        $id: "banner",
        
        info : [],

    });  
	    

    pahangModel = avalon.define({
	    
        $id: "paihang",
        
        id : '',
        picurl : '',
        url : '',
        title : '',
        
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
    
    getBanner();
    getRBanner();
    getTj();
    getPaihang();
    
    
  });      
});



function getBanner()
{
	
	var url = BaseUrl+"Public/Found/?service=common.getguanggao&typeid=7";
   
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		bannerModel.info = data.data.info;

	});
	
}

function getRBanner()
{
	
	var url = BaseUrl+"Public/Found/?service=common.getguanggao&typeid=8";
   
	$.support.cors = true;
	
	$.getJSON( url, function(data) 
	{
		if(data.data.info.length > 0)
		{
			pahangModel.id = data.data.info[0].id;
			pahangModel.picurl = data.data.info[0].picurl;
			pahangModel.url = data.data.info[0].url;
			pahangModel.title = data.data.info[0].title;
		}
		

	});
	
}


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
	var url = BaseUrl+"Public/Found/?service=Plans.getListRM";
   
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











