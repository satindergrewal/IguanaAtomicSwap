function KMDListaddrZ() {
	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'z_listaddresses',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'z_listaddresses',
					'hex': ''
				};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses
			// This code gets list of all z_addresses into an array
			// This function calls each address and then gets the total amount of coins in it.
			$.each(AjaxOutputData, function(index, value) {
				var ajax_data_to_hex = '["' + value + '",0]',
						tmpZaddrs_output = Iguana_HashHex(ajax_data_to_hex),
						passthru_agent = getPassthruAgent(),
						tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

				if (passthru_agent == 'iguana') {
					var ajax_data_zaddrbalance = {
								'userpass': tmpIguanaRPCAuth,
								'agent': passthru_agent,
								'method': 'passthru',
								'asset': $('[data-extcoin]').attr('data-extcoin'),
								'function': 'z_getbalance',
								'hex': tmpZaddrs_output
							};
				} else {
					var ajax_data_zaddrbalance = {
								'userpass': tmpIguanaRPCAuth,
								'agent': passthru_agent,
								'method': 'passthru',
								'function': 'z_getbalance',
								'hex': tmpZaddrs_output
							};
				}

				$.ajax({
					async: false,
					type: 'POST',
					data: JSON.stringify(ajax_data_zaddrbalance),
					url: 'http://127.0.0.1:' + config.iguanaPort,
					success: function(data, textStatus, jqXHR) {
						var AjaxOutputData = JSON.parse(data);

						if (AjaxOutputData.hasOwnProperty('error')) {
							AjaxOutputData = 0;
						}
						var tmp_Zaddr_total_balance_output = {
									'addr': value,
									'total': AjaxOutputData
								};

						result.push(tmp_Zaddr_total_balance_output);
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
			});
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

	return result;
}

function KMDListAddresses(pubpriv) {
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
	});
	NProgress.start();

	var result = [],
			ajax_data_to_hex = '',
			ajax_function_input = '',
			tmplistaddr_hex_input = '';

	if ( pubpriv === 'public' ) {
		ajax_function_input = 'getaddressesbyaccount';
		tmplistaddr_hex_input = '222200';
	}
	if ( pubpriv === 'private' ) {
		ajax_function_input = 'z_listaddresses';
		tmplistaddr_hex_input = '';
	}

	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': ajax_function_input,
					'hex': tmplistaddr_hex_input
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': ajax_function_input,
					'hex': tmplistaddr_hex_input
				};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses
			result = AjaxOutputData;
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

	NProgress.done();
	return result;
}

function KMDGetNewAddresses(pubpriv) {
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
	});
	NProgress.start();

	var result = [],
			ajax_function_input = '';

	if ( pubpriv === 'public' ) {
		ajax_function_input = 'getnewaddress';
	}
	if ( pubpriv === 'private' ) {
		ajax_function_input = 'z_getnewaddress';
	}

	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': ajax_function_input,
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': ajax_function_input,
					'hex': ''
				};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			result = data;
			toastr.success(_lang[defaultLang].KMD_NATIVE.NEW_ADDR_GENERATED, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
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

	NProgress.done();
	return result;
}

function KMDListAllAddr() {
	NProgress.done(true);
	NProgress.configure({
			template: templates.nprogressBar
	});
	NProgress.start();

	var only_reciving_addr_data = [],
			listTaddr = KMDListAddresses('public'),
			listZaddr = KMDListAddresses('private'),
			listAlladdr = $.merge( listTaddr, listZaddr );

	$.each(listAlladdr, function(index, value) {
		tmp_addr_label = '<span class="label label-default">' +
										 	 '<i class="icon fa-eye"></i> ' + _lang[defaultLang].IAPI.PUBLIC_SM +
										 '</span>';
		if ( listAlladdr[index].slice(0, 2) == 'zc' || listAlladdr[index].slice(0, 2) == 'zt' ) {
			tmp_addr_label = '<span class="label label-dark">' +
											   '<i class="icon fa-eye-slash"></i> ' + _lang[defaultLang].KMD_NATIVE.PRIVATE +
											 '</span>';
		}
		only_reciving_addr_data.push([
			tmp_addr_label,
			listAlladdr[index]
		]);
	});

	var kmd_recieve_table = '';

	kmd_recieve_table = $('#kmd-recieve-addr-tbl').DataTable({
		data: only_reciving_addr_data,
		select: false,
		retrieve: true
	});

	kmd_recieve_table.destroy();

	kmd_recieve_table = $('#kmd-recieve-addr-tbl').DataTable({
		data: only_reciving_addr_data,
		select: false,
		retrieve: true
	});

	NProgress.done();
	return only_reciving_addr_data;
}