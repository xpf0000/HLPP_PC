
var editUserModel;

requirejs(['../main'], function (main) {

	require(['avalon','domReady!'], function(avalon) {
		
		 editUserModel  = avalon.define({		
	 			
                    $id: "editUserVC",		
                   
                   aaa: '999999999',
                                         	
                 });	
                 
		avalon.scan(document.getElementById('editUserVC'));
		
		console.log('loaded edit_user !!!!!!!!!');
})})
