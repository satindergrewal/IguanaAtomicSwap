function Iguana_DEXgetNotaries(coin) {
	var result = [];

	// Get parameters values from confirm dialog and send currency
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dex',
				'method': 'getnotaries',
				'symbol': coin
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);

			result.push(AjaxOutputData);
			if (AjaxOutputData.error === 'less than required responses') {
				toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
			}
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

	return result[0];
}

function Iguana_DEXImportAddr(coin,addr) {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_1 = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dex',
				'method': 'checkaddress',
				'address': addr,
				'symbol': coin
			};

	ajax_call_1 = $.ajax({
		data: JSON.stringify(ajax_data_1),
		url: 'http://127.0.0.1:7778',
		type: 'POST',
		dataType: 'json'
	});

	var ajax_call_2 = ajax_call_1.then(function(data) {
		if (('error' in data)) {
			var ajax_data_2 = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dex',
				'method': 'importaddress',
				'address': addr,
				'symbol': coin
			};

			return $.ajax({
				data: JSON.stringify(ajax_data_2),
				url: 'http://127.0.0.1:7778',
				type: 'POST',
				dataType: 'json'
			});
		} else {
			var tmp_result = 'already in list';
			return tmp_result;
		}
	});

	ajax_call_2.done(function(data) {
		console.log(data);

		if (data == 'already in list') {
			toastr.info(coin + ' address already registered on network.', 'Basilisk Notification');
		} else {
			if (data.iswatchonly == true) {
				toastr.success('Registered ' + coin + ' address  on network.', 'Basilisk Notification');
			}
			if (data.iswatchonly == false) {
				toastr.success(coin + ' address Registeration failed. Please try again.', 'Basilisk Notification');
			}
			if (data.iswatchonly == undefined) {
				toastr.error('Invalid query sent for ' + coin + '. Please try again.', 'Basilisk Notification');
			}
			if (data.error === 'less than required responses') {
				toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
			}
		}
	});
}

function Iguana_DEXImportAllWalletAddr(coin) {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_2 = {
				'userpass': tmpIguanaRPCAuth,
				'coin': coin,
				'agent': 'bitcoinrpc',
				'method': 'getaddressesbyaccount',
				'account': '*'
			},
			tmp_coin_addr = null,
			ajax_call_2 = $.ajax({
				data: JSON.stringify(ajax_data_2),
				url: 'http://127.0.0.1:7778',
				type: 'POST',
				dataType: 'json'
			}),
			ajax_call_3 = ajax_call_2.then(function(data) {
				$.each(data.result, function(coinaddr_index, coinaddr_value) {
					console.log(coinaddr_index)
					console.log(coinaddr_value)

					var ajax_data_4 = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'checkaddress',
								'address': coinaddr_value,
								'symbol': coin
							};
					ajax_call_4 = $.ajax({
							data: JSON.stringify(ajax_data_4),
							url: 'http://127.0.0.1:7778',
							type: 'POST',
							dataType: 'json',
					});
					var ajax_call_5 = ajax_call_4.then(function(data) {
						console.log(data)
						console.log(coinaddr_value);

						if (('error' in data) || !('address' in data)) {
							var ajax_data_4 = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'importaddress',
								'address': coinaddr_value,
								'symbol': coin
							};

							return $.ajax({
								data: JSON.stringify(ajax_data_4),
								url: 'http://127.0.0.1:7778',
								type: 'POST',
								dataType: 'json'
							});
						} else {
							var tmp_result = 'already in list';
							return tmp_result;
						}
					});

					ajax_call_5.done(function(data) {
						console.log(coin)
						console.log(data);

						if (data == 'already in list') {
							toastr.info(coinaddr_value + ' already registered on network.', 'Basilisk Notification - ' + coin);
						} else {
							if (data.iswatchonly == true) {
								toastr.success('Registered ' + coinaddr_value + ' on network.', 'Basilisk Notification - ' + coin);
							}
							if (data.iswatchonly == false) {
								toastr.success(coinaddr_value + ' Registeration failed. Please try again.', 'Basilisk Notification - ' + coin);
							}
							if (data.iswatchonly == undefined) {
								toastr.error('Invalid query sent for ' + coinaddr_value + '. Please try again.', 'Basilisk Notification - ' + coin);
							}
							if (data.error === 'less than required responses') {
								toastr.error('Less than required responses. Please try again.', 'Basilisk Notification - ' + coin);
							}
						}
					});
				});
			});
}

function Iguana_DEXImportAll() {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_1 = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'InstantDEX',
				'method': 'allcoins'
			},
			ajax_call_1 = $.ajax({
				data: JSON.stringify(ajax_data_1),
				url: 'http://127.0.0.1:7778',
				type: 'POST',
				dataType: 'json'
			});

	ajax_call_1.done(function(data) {
		$.each([ 'basilisk','full' ], function(data_index,data_value) {
			$.each(data[data_value], function(mode_index,mode_value) {
				var ajax_data_2 = {
							'userpass': tmpIguanaRPCAuth,
							'coin': mode_value,
							'agent': 'bitcoinrpc',
							'method': 'getaddressesbyaccount',
							'account': '*'
						},
						tmp_coin_addr = null,
						ajax_call_2 = $.ajax({
							data: JSON.stringify(ajax_data_2),
							url: 'http://127.0.0.1:7778',
							type: 'POST',
							dataType: 'json'
						}),
						ajax_call_3 = ajax_call_2.then(function(data) {
							$.each(data.result, function(coinaddr_index, coinaddr_value) {
								console.log(coinaddr_index)
								console.log(coinaddr_value)

								var ajax_data_4 = {
											'userpass': tmpIguanaRPCAuth,
											'agent': 'dex',
											'method': 'checkaddress',
											'address': coinaddr_value,
											'symbol': mode_value
										},
										ajax_call_4 = $.ajax({
											data: JSON.stringify(ajax_data_4),
											url: 'http://127.0.0.1:7778',
											type: 'POST',
											dataType: 'json'
										}),
										ajax_call_5 = ajax_call_4.then(function(data) {
											console.log(data)
											console.log(coinaddr_value);

											if (('error' in data) || !('address' in data)) {
												var ajax_data_4 = {
													'userpass': tmpIguanaRPCAuth,
													'agent': 'dex',
													'method': 'importaddress',
													'address': coinaddr_value,
													'symbol': mode_value
												};

												return $.ajax({
													data: JSON.stringify(ajax_data_4),
													url: 'http://127.0.0.1:7778',
													type: 'POST',
													dataType: 'json',
												});
											} else {
												var tmp_result = 'already in list';
												return tmp_result;
											}
										});

								ajax_call_5.done(function(data) {
									console.log(mode_value)
									console.log(data);

									if (data == 'already in list') {
										toastr.info(coinaddr_value + ' already registered on network.', 'Basilisk Notification - ' + mode_value);
									} else {
										if (data.iswatchonly == true) {
											toastr.success('Registered ' + coinaddr_value + ' on network.', 'Basilisk Notification - ' + mode_value);
										}
										if (data.iswatchonly == false) {
											toastr.success(coinaddr_value + ' Registeration failed. Please try again.', 'Basilisk Notification - ' + mode_value);
										}
										if (data.iswatchonly == undefined) {
											toastr.error('Invalid query sent for ' + coinaddr_value + '. Please try again.', 'Basilisk Notification - ' + mode_value);
										}
										if (data.error === 'less than required responses') {
											toastr.error('Less than required responses. Please try again.', 'Basilisk Notification - ' + mode_value);
										}
									}
								});
							});
						});

				ajax_call_3.done(function() {
					console.log('Registered addresses from all active coin wallets.');
				});
			});
		});
	});
}

function Iguana_DEXCheckAddr(coin,addr) {
	var result = [];

	// Get parameters values from confirm dialog and send currency
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dex',
				'method': 'checkaddress',
				'address': addr,
				'symbol': coin
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			result.push(AjaxOutputData);

			if (AjaxOutputData.error === 'less than required responses') {
				toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
			}
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

	return result;
}

function Iguana_DEXValidateAddr(coin, addr) {
	var result = [];

	// Get parameters values from confirm dialog and send currency
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dex',
				'method': 'validateaddress',
				'address': addr,
				'symbol': coin
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);

			if (AjaxOutputData.iswatchonly == true) {
				toastr.success('Validation Success on Network', 'Basilisk Notification');
			}
			if (AjaxOutputData.iswatchonly == false) {
				toastr.info('Address isn\'t Registered on Network. Please Register', 'Basilisk Notification');
			}
			if (AjaxOutputData.iswatchonly == undefined) {
				toastr.error('Invalid query sent. Please try again.', 'Basilisk Notification');
			}
			result.push(AjaxOutputData);
			if (AjaxOutputData.error === 'less than required responses') {
				toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
			}
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

	return result;
}

function Iguana_DEXsendrawtx(data) {
    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        ajax_data = {
                        'userpass': tmpIguanaRPCAuth,
                        'agent': 'dex',
                        'method': 'sendrawtransaction',
                        'signedtx': data.signedtx,
                        'symbol': data.coin
                    }
    return new Promise((resolve) => {
        console.log(ajax_data);
        $.ajax({
            data: JSON.stringify(ajax_data),
            url: 'http://127.0.0.1:7778',
            type: 'POST',
            dataType: 'json'
        }).then(result => {
            console.log(result);
            resolve(result);
        });
    })

}

function EDEX_DEXlistunspent(coin, addr) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': 'dex',
					'method': 'listunspent',
					'address': addr,
					'symbol': coin
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778',ajax_data).done(function(data) {
					AjaxOutputData = JSON.parse(AjaxOutputData.responseText)

					if (AjaxOutputData == '' ) {
						result.push([{ 'amount': 0 }]);
					}
					if (AjaxOutputData.error === 'less than required responses') {
						toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
					}
					resolve(AjaxOutputData);
				}).fail(function(xhr, textStatus, error) {
					// handle request failures
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
					}
					console.log(textStatus);
					console.log(error);
				});

		NProgress.done();
	});
}

function EDEX_DEXnotarychains() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dpow',
				'method': 'notarychains'
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses
			console.log('== EDEX_DEXnotarychains Data OutPut ==');
			result.push(AjaxOutputData);
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

	NProgress.done();
	return result[0];
}

function EDEX_DEXgetinfoAll() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'dpow',
				'method': 'notarychains'
			},
			get_dex_notarychains = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
				get_dex_notarychains = JSON.parse(get_dex_notarychains.responseText);

				var refresh_percent = '';

				$.each(get_dex_notarychains, function( coin_index, coin_value ) {
						console.log(coin_index + ': ' + coin_value);
						var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
								ajax_data = {
									'userpass': tmpIguanaRPCAuth,
									'agent': 'dex',
									'method': 'getinfo',
									'symbol': coin_value
								};
						console.log(ajax_data);

						if (coin_value !== 'MESH') {
							var getinfo_each_chain = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
								getinfo_each_chain = JSON.parse(getinfo_each_chain.responseText);
								console.log('== EDEX_DEXgetinfoAll Data OutPut ==');
								console.log(getinfo_each_chain);

								var tmp_index = parseInt(coin_index) + 1,
										refresh_percent = parseFloat(parseInt(coin_index, 10) * 100) / parseInt(get_dex_notarychains.length, 10);
								console.log(refresh_percent)
								$('#basilisk-connections-refresh-title').text('Connection status... ' + tmp_index + '/' + get_dex_notarychains.length + ': ' + coin_value);
								$('#basilisk-connections-refresh-percent').text(refresh_percent + '%');
								$('#basilisk-connections-refresh-progress-bar').width(refresh_percent + '%')

								if (getinfo_each_chain == '' ) {
									result.push([{ 'amount': 0 }]);
								}
								result.push(getinfo_each_chain);
								if (getinfo_each_chain.error === 'less than required responses') {
									toastr.info('Less than required responses for ' + coin_value + '.', 'Basilisk Notification');
									$('#basilisk-connections-refresh-status-output').text('Output: ' + getinfo_each_chain.error);
								} else {
									$('#basilisk-connections-refresh-status-output').text('Output: Connected');
								}
								if ( tmp_index == get_dex_notarychains.length-1 ) {
									$('#basilisk-connections-refresh-progress-bar').width('100%');
									$('#RefreshBasiliskConnectionsMdl').modal('hide');
									toastr.success('Basilsk nodes connections refreshed.', 'Basilisk Notification');
								}
							});
						}
				});
			});

	NProgress.done();
	return result[0];
}