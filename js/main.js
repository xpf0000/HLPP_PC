/*
require.config({
	
	baseUrl : "js",
	
    paths : {
        "jquery" : "jquery-1.8.0.min",
        "avalon" : "avalon",
        "SuperSlide" : "jquery.SuperSlide.2.1.1",
        "gotop" : "gotop",
        "foucs" : "foucs"   
    }
})
*/




require.config({
    baseUrl: 'js',  //相对于index.html页面文件的地址
    paths:{   //这里配置的地址，都是相对于上方的baseUrl的
        avalon: 'avalon',
        domReady:'domReady',
        mmHistory: 'mmHistory',
        mmRouter: 'mmRouter',
        css: 'css',  //加上css.js
        jquery : 'jquery-1.8.0.min',
        SuperSlide : 'jquery.SuperSlide.2.1.1',
        gotop : 'gotop',
        foucs : 'foucs',
        mmAnimate : 'mmAnimate',
        mmRequest : 'mmRequest',
        index : 'index'
    },
    shim:{
        avalon: { exports: "avalon" },
        mmHistory:{ deps: ['avalon']},
        mmRouter:{ deps: ['avalon']},
    }
});

/*
require(['avalon'], function() {
	
    var vm = avalon.define({
        $id: "test",
        name:"fasdfkasdkf"
        //pageUrl:"mine.html"  //默认为mine.html
    });
    
});
*/





/*
var vm = avalon.define({
                $id: "test",
                name: "司徒正美",
                array: [11,22,33]
        });
*/
  

        
       


/*
requirejs(['avalon'],function(avalon){
	
		var vm = avalon.define({
                $id: "test",
                name: "司徒正美",
                array: [11,22,33]
        })
        
        
        
	
	
	
})
*/