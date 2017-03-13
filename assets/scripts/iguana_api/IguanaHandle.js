function Iguana_rmd160conv(rmd160conv_data) {
	// comment
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'SuperNET',
				'method': 'rmd160conv',
				'rmd160': rmd160conv_data.rmd160,
				'coin': rmd160conv_data.coin
			};
	console.log(ajax_data);

	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log('== Data OutPut ==');
			console.log(AjaxOutputData);
			return AjaxOutputData;
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		}
	});
}

function Iguana_activehandle(callback) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': 'SuperNET',
					'method': 'activehandle'
				};

    $.ajax({
      data: JSON.stringify(ajax_data),
      url: 'http://127.0.0.1:' + config.iguanaPort,
      type: 'POST',
      dataType: 'json'
    })
    .then(result => {
      //console.log(result);
      resolve(result);
    })
    .fail(function(xhr, textStatus, error) {
      // handle request failures
      console.log(xhr.statusText);
      if ( xhr.readyState == 0 ) {
        Iguana_ServiceUnavailable();
      }
      console.log(textStatus);
      console.log(error);
    });
	});
}

function Iguana_Setactivehandle() {
	//comment
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'SuperNET',
				'method': 'activehandle'
			};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data),
					AjaxOutputDataToStore = JSON.stringify(data);
			sessionStorage.setItem('IguanaActiveAccount', AjaxOutputDataToStore);
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		}
	});

	return 'Executed Iguana_activehandle. Check Iguana_activehandle_output var value.';
}