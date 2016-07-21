requirejs(['./main'], function (main) {
    
    
    require(['avalon'], function() {
	    
	
    var vm = avalon.define({
        $id: "test",
        name:"images/banner001.jpg",
        arr : ['images/banner001.jpg','images/banner001.jpg','images/banner001.jpg']
        //pageUrl:"mine.html"  //默认为mine.html
    });
    
    test();
    
});

    
    
    
});





function test()
{
	//alert("!!!");
}