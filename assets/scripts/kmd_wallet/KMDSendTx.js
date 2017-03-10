function KMDZSendManyTransaction() {
	var result = [],
			zsendmoney_output = '',
			tmp_zsendmany_from_addr = $('#kmd_wallet_send_from').val(),
			tmp_zsendmany_to_addr = $('#kmd_wallet_sendto').val(),
			tmp_zsendmany_total_amount = $('#kmd_wallet_total_value').text(),
			ajax_data_to_hex = '["' + tmp_zsendmany_from_addr + '",[{"address":"' + tmp_zsendmany_to_addr + '","amount":' + tmp_zsendmany_total_amount + '}]]',
			zsendmoney_output = Iguana_HashHex(ajax_data_to_hex),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'asset': $('[data-extcoin]').attr('data-extcoin'),
				'function': 'z_sendmany',
				'hex': zsendmoney_output
			};
	} else {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_sendmany',
				'hex': zsendmoney_output
			};
	}

	console.log(ajax_data_txid_input)
	
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			console.log('== Data OutPut of z_sendmany ==');
			console.log(data);
			result.push(data);
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

	KMDListAllOPIDs();
	return result;
}

function clearSendManyFieldData() {
	$('.showkmdwalletaddrs').selectpicker('refresh');
	$('#kmd_wallet_sendto').val('');
	$('#kmd_wallet_total_value').text('');
	$('#kmd_wallet_amount').val('');
}