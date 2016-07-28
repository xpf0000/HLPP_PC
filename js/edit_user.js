
requirejs(['../main'], function (main) {

	require(['avalon','domReady!'], function(avalon) {
		
		 var editUserModel  = avalon.define({		
	 			
                    $id: "editUserVC",		
                   
                   aaa: '999999999',
                   nick: 'asdfkasjdfkjk',
                                         	
                 });	

		avalon.scan(document.getElementById('editUserVC'));
		

		
})})
