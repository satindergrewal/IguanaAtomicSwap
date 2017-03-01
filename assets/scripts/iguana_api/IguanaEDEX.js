function EDEXlistunspent(coin, addr) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if (addr == undefined) {
			addr = '';

			var ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'coin': coin,
				'method': 'listunspent',
				'params': [
					1,
					9999999,
					[]
				]
			};
		} else {
			var ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'coin': coin,
				'method': 'listunspent',
				'params': [
					1,
					9999999,
					[addr]
				]
			};
		}
		var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		var ajaxCall = $.ajax({
			data: JSON.stringify(ajax_data),
			url: 'http://127.0.0.1:7778',
			type: 'POST',
			dataType: 'json'
		});

		ajaxCall.done(function(data) {
			var result = [];

			// This code using undscore.js takes only the address into an array which are unique in that list
			var unique_addresses  = _.keys(_.countBy(data, function(data) { return data.address; }));

			// This function calls each unique address and calculates the total amount of coins in it.
			$.each(unique_addresses, function(index) {
				var unique_addr_tmp_array = _.where(data, { address: unique_addresses[index] }),
						tmpcalcnum = 0,
						tmpcalcinterest = 0,
						interest_enable = false,
						tmptotalbalance = 0;

				$.each(data, function(index) {
					if ( data[index].interest !== undefined ) {
						// console.log('interest is available for this currency. Adding to total balance.');
						tmpcalcnum = tmpcalcnum + data[index].amount;
						tmpcalcinterest = tmpcalcinterest + data[index].interest;
						interest_enable = true;
					}
					if ( data[index].interest === undefined ) {
						tmpcalcnum = tmpcalcnum + data[index].amount;
					}
				});

				if ( coin == 'KMD' ) {
					tmptotalbalance = parseFloat(tmpcalcnum) + parseFloat(tmpcalcinterest);
					var tmp_addr_total_balance_output = {
						'addr': unique_addr_tmp_array[0].address,
						'total': tmpcalcnum.toFixed(8),
						'interest': tmpcalcinterest.toFixed(8),
						'totalbalance': tmptotalbalance.toFixed(8)
					};
				}
				if ( coin !== 'KMD' ) {
					var tmp_addr_total_balance_output = {
						'addr': unique_addr_tmp_array[0].address,
						'total': tmpcalcnum.toFixed(8)
					};
				}

				/*var tmpcalcnum = 0;
				$.each(unique_addr_tmp_array, function(index, value) {
						//console.log(value.amount);
						if ( value.interest !== undefined ) {
								tmpcalcnum = tmpcalcnum + value.amount + value.interest;
						}
						if ( value.interest === undefined ) {
								tmpcalcnum = tmpcalcnum + value.amount;
						}
				});
				//console.log(tmpcalcnum);
				var tmp_addr_total_balance_output = {"addr": unique_addr_tmp_array[0].address, "total": tmpcalcnum};*/
				//console.log(tmp_addr_total_balance_output);

				result.push(tmp_addr_total_balance_output);
			});

			resolve(result);
		}).fail(function(xhr, textStatus, error) {
			// handle request failures
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
		});
	});

	NProgress.done();
}

function clearEdexSendFieldData() {
	$('.showedexcoinaddrs').selectpicker('refresh');
	$('#edexcoin_sendto').val('');
	$('#edexcoin_total_value').text('');
	$('#edexcoin_amount').val('');
}

function EDEXMainAddr(coin) {
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
					'agent': 'SuperNET',
					'method': 'activehandle'
				};

		var ajaxCall = $.ajax({
			data: JSON.stringify(ajax_data),
			url: 'http://127.0.0.1:7778',
			type: 'POST',
			dataType: 'json'
		});

		ajaxCall.done(function(data) {
			tmp_coin_addr = data[coin];
			resolve(tmp_coin_addr);
			NProgress.done();
		}).fail(function(xhr, textStatus, error) {
			// handle request failures
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
			NProgress.done();
		});
	});
}

function EDEXgetBalance(coin) {
	// comment
	var result = [],
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'bitcoinrpc',
				'method': 'getbalance',
				'coin': coin
			};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			result.push(AjaxOutputData['result']);
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

function EDEXSendToAddr(data) {
	var result = [],
			confirm_coinname_to_send = data.coin,
			confirm_send_amount = data.amount,
			confirm_sendto_address = data.sendtoaddr;

	// Get parameters values from confirm dialog and send currency
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			sendtoaddrvalues = {
				'userpass': tmpIguanaRPCAuth,
				'coin': confirm_coinname_to_send,
				'method': 'sendtoaddress',
				'params': [
					confirm_sendto_address,
					confirm_send_amount,
					'EasyDEX',
					'EasyDEXTransaction'
				]};

	console.log(sendtoaddrvalues);
	console.log(sendtoaddrvalues.params);

	$.ajax({
		type: 'POST',
		data: JSON.stringify(sendtoaddrvalues),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var SendToAddrData = JSON.parse(data),
					edexcoin_sendto_result_tbl = '';

			result.push(SendToAddrData);

			if ( SendToAddrData.error !== undefined ) {
				toastr.error('Sent Transaction failed. Please check send Transaction page for details.', 'Wallet Notification');
				edexcoin_sendto_result_tbl += '<tr class="active">' +
																				'<td>error</td>' +
																				'<td>' +
																					'<span class="label label-danger">' + SendToAddrData.error + '</span>' +
																				'</td>' +
																			'</tr>';
				$('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
				$('#edexcoin_send_coins_anothertx_btn').show();
			}

			if ( SendToAddrData.complete !== undefined ) {
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
				toastr.success('Transaction sent successfully. Check send section for details.', 'Wallet Notification');
				edexcoin_sendto_result_tbl += '<tr class="">' +
																				'<td>complete</td>' +
																				'<td>' +
																					'<span class="label label-info">' + SendToAddrData.complete + '</span>' +
																				'</td>' +
																			'</tr>';
				edexcoin_sendto_result_tbl += '<tr>' +
																				'<td>result</td>' +
																				'<td>' +
																					'<a href="javascript:void(0)" data-edexcoin="' + active_edexcoin + '" data-sendtotxresult="' + SendToAddrData.result + '" class="edexcoin_sendto_output_result">' + SendToAddrData.result + '</a>' +
																				'</td>' +
																			'</tr>';
				edexcoin_sendto_result_tbl += '<tr class="">' +
																				'<td>sendrawtransaction</td>' +
																				'<td>' +
																					'<span class="label label-primary">' + SendToAddrData.sendrawtransaction + '</span>' +
																				'</td>' +
																			'</tr>';
				edexcoin_sendto_result_tbl += '<tr class="">' +
																				'<td>signedtx</td>' +
																				'<td>' +
																					'<span style="display: block; width: 400px;word-wrap: break-word;">' + SendToAddrData.signedtx + '</span>' +
																				'</td>' +
																			'</tr>';
				$('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
				$('#edexcoin_send_coins_anothertx_btn').show();
			}

			var selected_coinmode = sessionStorage.getItem('edexTmpMode');
			if ( selected_coinmode == 'Basilisk' ) {
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
				getDEXGetBalance(active_edexcoin).then(function(result){
					$('#edex_total_balance').text(result.total);
				});
			} else {
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin'),
						tmp_get_coin_balance = EDEXlistunspent(active_edexcoin);

				if (tmp_get_coin_balance[0] != undefined) {
					$('#edex_total_balance').text(tmp_get_coin_balance[0].total.toFixed(8));
				} else {
					$('#edex_total_balance').text('0');
				}
			}

			$('#edexcoin_send_coins_btn').prop('disabled', false);
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

function EDEXgetinfo(coin) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'coin': coin,
					'agent': 'bitcoinrpc',
					'method': 'getinfo',
					'immediate': 100,
					'timeout': 4000
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778',ajax_data).done(function(data) {
					AjaxOutputData = JSON.parse(AjaxOutputData.responseText)
					resolve(AjaxOutputData);
				}).fail(function(xhr, textStatus, error) {
					// handle request failures
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
					}
					console.log(textStatus);
					console.log(error);
				});
	})
}

function EDEXgetaddrbyaccount(coin) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'coin': coin,
					'agent': 'bitcoinrpc',
					'method': 'getaddressesbyaccount',
					'account': '*'
				},
				tmp_addr_label = '<span class="label label-default">' +
												   '<i class="icon fa-eye"></i> public' +
												 '</span>';
				active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		var AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
				data = JSON.parse(AjaxOutputData.responseText);
				console.log(data);

				if (active_edexcoinmodecode == 'Basilisk' &&
						coin !== 'BTC' &&
						coin !== 'BTCD' &&
						coin !== 'LTC' &&
						coin !== 'DOGE' &&
						coin !== 'DGB' &&
						coin !== 'SYS' &&
						coin !== 'MZC' &&
						coin !== 'UNO' &&
						coin !== 'ZET' &&
						coin !== 'BTM' &&
						coin !== 'CARB' &&
						coin !== 'ANC' &&
						coin !== 'FRK' ) {
							Promise.all(data.result.map((coinaddr_value, coinaddr_index) => {
								let params = {
									'userpass': tmpIguanaRPCAuth,
									'agent': 'dex',
									'method': 'getbalance',
									'address': coinaddr_value,
									'symbol': coin
								};

								console.log(params);
								return new Promise((resolve, reject) => {
									$.ajax({
										data: JSON.stringify(params),
										url: 'http://127.0.0.1:7778',
										type: 'POST',
										dataType: 'json'
									}).then(data => {
										if (data.interest !== undefined) {
											var pass_data = {
														'label': tmp_addr_label,
														'addr': coinaddr_value,
														'total': data.balance.toFixed(8),
														'interest': data.interest.toFixed(8)
													};
										}
										if (data.interest == undefined) {
											var pass_data = {
												'label': tmp_addr_label,
												'addr': coinaddr_value,
												'total': data.balance.toFixed(8)
											};
										}

										resolve(pass_data);
									});
								});

							})).then(result => {
								resolve(result);
								NProgress.done();
							});
				} else if (active_edexcoinmodecode == 'Basilisk' ) {
					Promise.all(data.result.map((coinaddr_value, coinaddr_index) => {
						let params = {
							'userpass': tmpIguanaRPCAuth,
							'agent': 'dex',
							'method': 'listunspent',
							'address': coinaddr_value,
							'symbol': coin
						};

						console.log(params)
						return new Promise((resolve, reject) => {
							$.ajax({
								data: JSON.stringify(params),
								url: 'http://127.0.0.1:7778',
								type: 'POST',
								dataType: 'json'
							})
							.then(data => {
								console.log(coinaddr_value);
								console.log(data);

								if (data.error === 'less than required responses') {
									toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
								}

								var tmpcalcnum = 0;
								$.each(data, function(index) {
									tmpcalcnum = tmpcalcnum + data[index].amount;
								});

								var tmp_addr_total_balance_output = {
									'label': tmp_addr_label,
									'addr': coinaddr_value,
									'total': tmpcalcnum.toFixed(8)
								};
								console.log(tmp_addr_total_balance_output);

								if (data == '' ) {
									tmp_addr_total_balance_output = {
										'label': tmp_addr_label,
										'addr': coinaddr_value,
										'total': 0
									};
								}

								resolve(tmp_addr_total_balance_output);
							});
						});

					})).then(result => {
						resolve(result);
						NProgress.done();
					});
				}

				if (active_edexcoinmodecode == 'Full' &&
						coin !== 'BTC' &&
						coin !== 'BTCD' &&
						coin !== 'LTC' &&
						coin !== 'DOGE' &&
						coin !== 'DGB' &&
						coin !== 'SYS' &&
						coin !== 'MZC' &&
						coin !== 'UNO' &&
						coin !== 'ZET' &&
						coin !== 'BTM' &&
						coin !== 'CARB' &&
						coin !== 'ANC' &&
						coin !== 'FRK' ) {
							Promise.all(data.result.map((coinaddr_value, coinaddr_index) => {
								return new Promise((resolve, reject) => {
									EDEXlistunspent(coin, coinaddr_value).then(function(data) {
										var pass_data;
										console.log(data);

										if (data.length !== 0) {
											if (data[0].interest !== undefined) {
												pass_data = {
													'label': tmp_addr_label,
													'addr': coinaddr_value,
													'total': data[0].total,
													'interest': data[0].interest
												};
											}
											if (data[0].interest == undefined) {
												pass_data = {
													'label': tmp_addr_label,
													'addr': coinaddr_value,
													'total': data[0].total
												};
											}
										} else {
											pass_data = {
												'label': tmp_addr_label,
												'addr': coinaddr_value,
												'total': 0.00000000
											};
										}

										console.log(pass_data);
										resolve(pass_data);
									});
								});
							})).then(result => {
								console.log(result);
								resolve(result);
								NProgress.done();
							});
				}
		}).fail(function(xhr, textStatus, error) {
			// handle request failures
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
			}
			console.log(textStatus);
			console.log(error);
		})
	});
}

function EDEXgetnewaddress(coin) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'coin': coin,
					'agent': 'bitcoinrpc',
					'method': 'getnewaddress',
					'account': ''
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
					AjaxOutputData = JSON.parse(AjaxOutputData.responseText);
					resolve(AjaxOutputData.result);
				}).fail(function(xhr, textStatus, error) {
					// handle request failures
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
					}
					console.log(textStatus);
					console.log(error);
				});
	});
}

function EDEXimportprivkey(params_data) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'method': 'importprivkey',
					'params': [
						params_data,
						'imported'
					]
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
					AjaxOutputData = JSON.parse(AjaxOutputData.responseText);
					resolve(AjaxOutputData);
				}).fail(function(xhr, textStatus, error) {
					// handle request failures
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
					}
					console.log(textStatus);
					console.log(error);
				});
	})
}