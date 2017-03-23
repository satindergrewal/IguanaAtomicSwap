/*var Iguana_activehandle_output = ''; //Storing activehandle output this variable. accessible globally.
function Iguana_activehandle() {

		//comment
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
		var ajax_data = {'userpass':tmpIguanaRPCAuth,"agent":"SuperNET","method":"activehandle"};
		//console.log(ajax_data);
		$.ajax({
				type: 'POST',
				data: JSON.stringify(ajax_data),
				url: 'http://127.0.0.1:' + config.iguanaPort,
				//dataType: 'text',
				success: function(data, textStatus, jqXHR) {
						var AjaxOutputData = JSON.parse(data);
						//console.log('== ActiveHandle Data OutPut ==');
						//console.log(AjaxOutputData);
						Iguana_activehandle_output = AjaxOutputData;
						return true;
				},
				error: function(xhr, textStatus, error) {
						console.log(xhr.statusText);
						if ( xhr.readyState == 0 ) {
								Iguana_ServiceUnavailable();
						}
						console.log(textStatus);
						console.log(error);
						return false;
				}
		});
		return 'Executed Iguana_activehandle. Check Iguana_activehandle_output var value.';
}*/