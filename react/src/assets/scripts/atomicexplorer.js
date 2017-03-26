var AtomicExplorer = function() {
	toastr.options = toastrConfig;

	var handleExplorer = function() {
		$('#atomic_explorer_getcoinpeers_btn').click(function() {
			NProgress.done(true);
			NProgress.configure({
				template: templates.nprogressBar
			});
			NProgress.start();
			console.log('button pushed in atomic explorer');

			var atomic_explorer_select_coin_val = $('select[id=\'atomic_explorer_select_coin_options\']').val(),
					atomic_explorer_select_command_val = $('select[id=\'atomic_explorer_select_command_options\']').val(),
					atomic_explorer_input_data_val = $('#atomic_explorer_input_data').val(),
					tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
					ExplorerInputData;

			console.log(atomic_explorer_select_coin_val);
			console.log(atomic_explorer_select_command_val);
			console.log(atomic_explorer_input_data_val);

			switch (atomic_explorer_select_command_val) {
				case 'history':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'timeout': 20000,
						'agent': 'basilisk',
						'method': 'history',
						'vals': {
							'coin': atomic_explorer_select_coin_val,
							'addresses': [ atomic_explorer_input_data_val ]
						}
					};
					break;
				case 'getbalance':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'method': 'getbalance',
						'params': [ atomic_explorer_input_data_val ]
					};
					break;
				case 'listunspent':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'method': 'listunspent',
						'params': [
							1,
							9999999,
							[ atomic_explorer_input_data_val ]
						]
					};
					break;
				case 'txid':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'method': 'getrawtransaction',
						'params': [ atomic_explorer_input_data_val ]
					};
					break;
				case 'blockash':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'agent': 'bitcoinrpc',
						'method': 'getblockhash',
						'height': atomic_explorer_input_data_val
					};
					break;
				case 'chaintip':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'agent': 'bitcoinrpc',
						'method': 'getbestblockhash'
					};
					break;
				case 'activehandle':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'SuperNET',
						'method': 'activehandle'
					};
					break;
				case 'gettransaction':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'coin': atomic_explorer_select_coin_val,
						'agent': 'bitcoinrpc',
						'method': 'gettransaction',
						'txid': atomic_explorer_input_data_val
					};
					break;
				case 'dex_getinfo':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getinfo',
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getnotaries':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getnotaries',
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_alladdresses':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'alladdresses',
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_importaddress':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'importaddress',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_checkaddress':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'checkaddress',
						'ddress': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_validateaddress':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'validateaddress',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getbestblockhash':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getbestblockhash',
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_listtransactions':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listtransactions',
						'address': atomic_explorer_input_data_val,
						'count': 100,
						'skip': 0,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_listtransactions2':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listtransactions2',
						'address': atomic_explorer_input_data_val,
						'count': 100,
						'skip': 0,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_listunspent':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listunspent',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_listspent':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listspent',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_listunspent2':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listunspent2',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getblockhash':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getblockhash',
						'height': 100,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getblock':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getblock',
						'hash': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_gettxin':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'gettxin',
						'vout': 0,
						'txid': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_gettxout':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'gettxout',
						'vout': 0,
						'txid': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_gettransaction':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'gettransaction',
						'txid': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getbalance':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getbalance',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'dex_getsupply':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'getbalance',
						'address': '*',
						'symbol': atomic_explorer_select_coin_val,
						'timeout': 600000
					};
					break;
				case 'dex_sendrawtransaction':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'sendrawtransaction',
						'signedtx': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val
					};
					break;
				case 'basilisk_refresh':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'basilisk',
						'method': 'refresh',
						'address': atomic_explorer_input_data_val,
						'symbol': atomic_explorer_select_coin_val,
						'timeout': 600000
					};
					break;
				case 'jumblr_status':
					ExplorerInputData = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'jumblr',
						'method': 'status'
					};
					break;
			}
			console.log(ExplorerInputData);

			$.ajax({
				type: 'POST',
				data: JSON.stringify(ExplorerInputData),
				url: 'http://127.0.0.1:' + config.iguanaPort,
				success: function(data, textStatus, jqXHR) {
					console.log(data);
					if (atomic_explorer_select_command_val === 'txid' ||
							atomic_explorer_select_command_val === 'dex_getbestblockhash' ||
							atomic_explorer_select_command_val === 'dex_sendrawtransaction' ||
							atomic_explorer_select_command_val === 'dex_getblockhash') {
						$('#atomic-explorer-commands-output').html(data);
					} else {
						var ExplorerOutputData = JSON.parse(data);
						console.log(ExplorerOutputData);
						$('#atomic-explorer-commands-output').html(JSON.stringify(ExplorerOutputData, null, '\t'));
					}

					if (ExplorerOutputData.error === 'less than required responses') {
						toastr.error(_lang[defaultLang].DASHBOARD.LESS_RESPONSES_REQ, _lang[defaultLang].DASHBOARD.BASILISC_NOTIFICATION)
					}

					NProgress.done();
				},
				error: function(xhr, textStatus, error) {
					console.log('failed getting Coin History.');
					console.log(xhr.statusText);

					if ( xhr.readyState == 0 ) {
						Iguana_ServiceUnavailable();
					}

					console.log(textStatus);
					console.log(error);
					NProgress.done();
				}
			});
		});
	};

	return {
		//main function to initiate the module
		init: function() {
			handleExplorer();
		}
	};
}();

jQuery(document).ready(function() {
	AtomicExplorer.init();
});