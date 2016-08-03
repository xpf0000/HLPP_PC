requirejs(['main'], function (main) {
     require(['jquery','avalon','wangEditor','domReady!'], function(jquery,avalon,wangEditor) {
	     
	     
	     var editor = new wangEditor('textarea1');	     
	     // 上传图片（举例）
		 //editor.config.uploadImgUrl = 'http://192.168.2.113/uploadTest.php';
		 editor.config.uploadImgFileName = 'file';
		 editor.config.uploadImgUrl = 'http://182.92.70.85/hlppapi/Public/Found/?service=Plans.addpic&uid=1&username=hlpp';

		 editor.create();
	     
})})