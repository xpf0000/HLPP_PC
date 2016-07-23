var BaseUrl = "http://182.92.70.85/hlppapi/";
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
    },
    shim:{
        avalon: { exports: "avalon" },
        mmAnimate:{ deps: ['avalon']},    
    }
});
