function getKMDWalletInfo() {
	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'getwalletinfo',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'getwalletinfo',
					'hex': ''
				};
	}

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			$('#kmd_walletversion').text(AjaxOutputData.walletversion);
			$('#kmd_balance').text(AjaxOutputData.balance);
			$('#kmd_unconfirmed_balance').text(AjaxOutputData.unconfirmed_balance);
			$('#kmd_immature_balance').text(AjaxOutputData.immature_balance);
			$('#KMDTotalTransactionsCount').text(AjaxOutputData.txcount);
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

function getKMDInfo() {
	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'getinfo',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'getinfo',
					'hex': ''
				};
	}

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			$('#kmd_version').text(AjaxOutputData.version);
			$('#kmd_protocolversion').text(AjaxOutputData.protocolversion);
			$('#kmd_notarized').text(AjaxOutputData.notarized);
			$('#kmd_notarizedhash').text(AjaxOutputData.notarizedhash);
			$('#kmd_notarizedbtc').text(AjaxOutputData.notarizedbtc);
			$('#kmd_blocks').text(AjaxOutputData.blocks);
			$('#kmd_connections').text(AjaxOutputData.connections);
			$('#kmd_difficulty').text(AjaxOutputData.difficulty);
			$('#kmd_testnet').text(AjaxOutputData.testnet);
			$('#kmd_paytxfee').text(AjaxOutputData.paytxfee);
			$('#kmd_relayfee').text(AjaxOutputData.relayfee);
			$('#kmd_errors').text(AjaxOutputData.errors);
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