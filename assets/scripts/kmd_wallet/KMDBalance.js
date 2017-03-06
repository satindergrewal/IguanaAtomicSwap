function getTotalKMDBalance() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin'),
			passthru_agent = '';

	console.log($('[data-extcoin]').attr('data-extcoin'));

	if ( extcoin == 'KMD') { passthru_agent = 'komodo'; };
	if ( extcoin == 'ZEC') { passthru_agent = 'zcash'; };

	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_gettotalbalance',
				'hex': '3000'
			};

	//console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		//dataType: 'text',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);

			if (AjaxOutputData.interest != undefined) {
				console.log('show interest..');
				$('#kmd_total_interest_balance').text(parseFloat(AjaxOutputData.interest).toFixed(8) + ' ' + extcoin);
				$('#kmd_widget_get_total_balance_i').show();
				$('#kmd_widget_get_total_balance_t').addClass(' col-lg-3');
				$('#kmd_widget_get_total_balance_t').removeClass('col-lg-4');
				$('#kmd_widget_get_total_balance_z').addClass(' col-lg-3');
				$('#kmd_widget_get_total_balance_z').removeClass(' col-lg-4');
				$('#kmd_widget_get_total_balance_tzi').addClass(' col-lg-3');
				$('#kmd_widget_get_total_balance_tzi').removeClass(' col-lg-4');
			} else {
				console.log('do not show interest...');
				$('#kmd_widget_get_total_balance_i').hide();
				$('#kmd_widget_get_total_balance_t').addClass(' col-lg-4');
				$('#kmd_widget_get_total_balance_t').removeClass(' col-lg-3');
				$('#kmd_widget_get_total_balance_z').addClass(' col-lg-4');
				$('#kmd_widget_get_total_balance_z').removeClass(' col-lg-3');
				$('#kmd_widget_get_total_balance_tzi').addClass(' col-lg-4');
				$('#kmd_widget_get_total_balance_tzi').removeClass(' col-lg-3');
			}
			$('#kmd_transparent_balance').text((AjaxOutputData.transparent ? parseFloat(AjaxOutputData.transparent).toFixed(8) : 0) + ' ' + extcoin);
			$('#kmd_private_balance').text((AjaxOutputData.private ? parseFloat(AjaxOutputData.private).toFixed(8) : 0) + ' ' + extcoin);
			$('#kmd_total_tz_balance').text((AjaxOutputData.total ? parseFloat(AjaxOutputData.total).toFixed(8) : 0) + ' ' + extcoin);
		},
		error: function(xhr, textStatus, error) {
			console.log('failed getting Coin History.');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		}
	});
}

function getKMDBalanceT() {
	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getbalance',
				'hex': ''
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
		},
		error: function(xhr, textStatus, error) {
			console.log('failed getting Coin History.');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		}
	});
}

function getKMDBalanceZ() {
	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_getbalance',
				'hex': ''
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
		},
		error: function(xhr, textStatus, error) {
			console.log('failed getting Coin History.');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		}
	});
}