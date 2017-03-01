function edexCoinBtnAction() {
	$('.edexcoin-logo').click(function() {
		$( '#edexcoin_send_coins_back_btn' ).trigger( 'click' );
		$('#btn_edexcoin_dashboard').hide();
		$('#btn_edexcoin_send').show();
		$('#btn_edexcoin_recieve').show();

		var selected_coin = $(this).data('edexcoincode'),
				selected_coinmode = $(this).data('edexcoinmodecode'),
				selected_coinname = $(this).data('edexcoinname');

		$('#edexcoin_getbalance_interest').hide();
		$('#edexcoin_getbalance_total_interest').hide();
		$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
		$('#edex_interest_balance').text('-');
		$('#edex_total_balance_interest').text('-');
		$('#edex_total_balance').text('-');
		$('#edex_total_balance_coincode').text(selected_coin);

		sessionStorage.setItem('edexTmpMode', selected_coinmode);
		resizeDashboardWindow();

		if ( selected_coinmode == 'Basilisk' ) {
			$('#edex-footer').hide();
			$('#btn_edexcoin_basilisk').show();
			$('#edexcoin-wallet-waitingrt-alert').hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode == 'Full' ) {
			$('#edex-footer').show();
			$('#btn_edexcoin_basilisk').hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode !== 'Native' ) {
			$('#edexcoin_dashoard_section').show();
			$('#header-dashboard').show();
			$('#wallet-widgets').show();
			$('#edexcoin_dashboardinfo').show();
			$('#no_wallet_selected').hide();
			$('#edexcoin_send').hide();
			$('#edexcoin_recieve_section').hide();
			$('#edexcoin_settings').hide();
			$('#currency-progressbars').show();

			// get selected coin's code and populate in easydex wallet widget's html elements
			var coincode = $(this).data('edexcoincode');
			$.each($('[data-edexcoin]'), function(index, value) {
				$('[data-edexcoin]').attr('data-edexcoin', coincode);
				$('[data-edexcoin="' + coincode + '"]');
			});
			$.each($('[data-edexcoinmenu]'), function(index, value) {
				$('[data-edexcoinmenu]').attr('data-edexcoinmenu', coincode);
				$('[data-edexcoinmenu="' + coincode + '"]');
			});

			$('#edexcoin-active').text(selected_coinname);
			$('#edex_total_balance_coincode').text(coincode);
			// populate selected coin's address
			EDEXMainAddr(selected_coin).then(function(result) {
				$('#edexcoin_active_addr').text(result);
				$('#edexcoin_active_addr_clipboard').attr('data-clipboard-text', result);
			})

			$('#edexcoin_active_addr_clipboard').click(function() {
				alertify.success('Address Copied.');
			});

			var clipboard = new Clipboard('.clipboard-edexaddr');
			clipboard.destroy();

			var clipboard = null;
			if ( clipboard != null ) {
				clipboard.destroy();
			}

			var clipboard = new Clipboard('.clipboard-edexaddr');
			clipboard.on('success', function(e) {
				console.info('Action: ', e.action);
				console.info('Text: ', e.text);
				console.info('Trigger: ', e.trigger);

				e.clearSelection();
			});

			clipboard.on('error', function(e) {
				console.error('Action: ', e.action);
				console.error('Trigger: ', e.trigger);
			});

			// populate selected coin's balance
			if ( selected_coinmode == 'Basilisk' &&
					 selected_coin !== 'BTC' &&
					 selected_coin !== 'BTCD' &&
					 selected_coin !== 'LTC' &&
					 selected_coin !== 'DOGE' &&
					 selected_coin !== 'DGB' &&
					 selected_coin !== 'SYS' &&
					 selected_coin !== 'MZC' &&
					 selected_coin !== 'UNO' &&
					 selected_coin !== 'ZET' &&
					 selected_coin !== 'BTM' &&
					 selected_coin !== 'CARB' &&
					 selected_coin !== 'ANC' &&
					 selected_coin !== 'FRK') {
				getDEXGetBalance_cache(selected_coin).then(function(result) {
					if ( result.interest !== undefined && selected_coin == 'KMD') {
						$('#edexcoin_getbalance_interest').show();
						$('#edexcoin_getbalance_total_interest').show();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$('#edexcoin_getbalance_interest').hide();
						$('#edexcoin_getbalance_total_interest').hide();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
						$('#edex_interest_balance').text('-');
						$('#edex_total_balance_interest').text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else if (selected_coinmode == 'Basilisk') {
				getDEXGetBalance2(selected_coin).then(function(result) {
					if ( result.interest !== undefined ) {
						$('#edexcoin_getbalance_interest').show();
						$('#edexcoin_getbalance_total_interest').show();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$('#edexcoin_getbalance_interest').hide();
						$('#edexcoin_getbalance_total_interest').hide();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
						$('#edex_interest_balance').text('-');
						$('#edex_total_balance_interest').text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else {
				EDEXlistunspent(selected_coin).then(function(result) {
					if (result[0] != undefined) {
						if ( result[0].interest !== undefined ) {
							$('#edexcoin_getbalance_interest').show();
							$('#edexcoin_getbalance_total_interest').show();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
							$('#edex_interest_balance').text(result[0].interest);
							$('#edex_total_balance_interest').text(result[0].totalbalance);
							$('#edex_total_interest_coincode').text(selected_coin);
							$('#edex_total_balance_interest_coincode').text(selected_coin);
						}

						if ( result[0].interest === undefined ) {
							$('#edexcoin_getbalance_interest').hide();
							$('#edexcoin_getbalance_total_interest').hide();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
							$('#edex_interest_balance').text('-');
							$('#edex_total_balance_interest').text('-');
						}

						$('#edex_total_balance').text(result[0].total);
						$('#edex_total_balance_coincode').text(selected_coin);
					} else {
						$('#edex_total_balance').text('0');
					}
				});
			}

			EdexfillTxHistory(coincode);
		} else {
			$('#currency-progressbars').hide();
			if ( selected_coin == 'KMD' ) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				$( '#nav-komodo-wallet' ).trigger( 'click' );
			}
			if ( selected_coin == 'ZEC' ) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				$( '#nav-zcash-wallet' ).trigger( 'click' );
			}
		}
	});
}

function getActiveEdexcoin() {
	var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
	return active_edexcoin;
}

function EdexfillTxHistory(coin) {
	$('#edexcoin_txhistory').data('panel-api').load();
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if ( active_edexcoinmodecode === 'Basilisk' ) {
		EdexGetTxList_cache(coin).then(function(result) {
			var edex_txhistory_table = '';
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});

			edex_txhistory_table.destroy();
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});
			$('#edexcoin_txhistory').data('panel-api').done();
			$('.panel-loading').remove();
		});
	}

	if ( active_edexcoinmodecode === 'Full' ) {
		EdexGetTxList(coin).then(function(result){
			var edex_txhistory_table = '';
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});

			edex_txhistory_table.destroy();
			edex_txhistory_table = $('#edex-tx-history-tbl').DataTable({
				data: result,
				'order': [
					[ 3, 'desc' ]
				],
				select: true,
				retrieve: true
			});
			$('#edexcoin_txhistory').data('panel-api').done();
			$('.panel-loading').remove();
		});
	}
}

function getDEXCoinBalance(coin) {
	getDEXGetBalance_cache(coin).then(function(result) {
		console.log(result)
	});
}

function getDEXGetBalance(coin) {
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
				ajax_data_2 = {
					'userpass': tmpIguanaRPCAuth,
					'coin': coin,
					'agent': 'bitcoinrpc',
					'method': 'getaddressesbyaccount',
					'account': '*'
				};

		$.ajax({
			data: JSON.stringify(ajax_data_2),
			url: 'http://127.0.0.1:7778',
			type: 'POST',
			dataType: 'json'
		}).then(data => {
			var total_balance = 0,
					total_interest = 0;

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
						console.log(data);
						total_balance = total_balance + data.balance;

						if (data.interest !== undefined) {
							total_interest = total_interest + data.interest;
							pass_data = {
								'total': total_balance.toFixed(8),
								'interest': total_interest.toFixed(8)
							}
						}

						if (data.interest == undefined) {
							pass_data = { 'total': total_balance };
						}

						console.log(pass_data);
						resolve(pass_data);
					});
				});
			})).then(result => {
				resolve(result[result.length-1]);
				NProgress.done();
			});
		});
	});
}

function getDEXGetBalance_cache(coin) {
  NProgress.done(true);
  NProgress.configure({
    template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
    					'<div class="spinner" role="spinner">' +
    						'<div class="spinner-icon"></div>' +
    					'</div>'
  });
  NProgress.start();

  return new Promise((resolve) => {
	Shepherd_CheckBasiliskCacheData(coin).then(function(result) {
		//console.log(result);
		//console.log(result.coin);

		if (result.coin == false || result.addresses == false) {
			var call_data = {
				'allcoins': false,
				'coin': coin,
				'calls': 'listtransactions:getbalance'
			};
			//console.log(call_data)
			Shepherd_FetchBasiliskData(call_data).then(function(result) {
				console.log(result);
			});
		} else if (result.getbalance == false) {
			var call_data = {
				'allcoins': false,
				'coin': coin,
				'calls': 'getbalance:listtransactions'
			};
			//console.log(call_data);
			Shepherd_FetchBasiliskData(call_data).then(function(result) {
				console.log(result);
			});
		}
	})

    Shepherd_GetBasiliskCache().then(function(result) {
	    var _data = JSON.parse(result),
	    		query = _data.result.basilisk,
					total_balance = 0,
	    		total_interest = 0;

	    Promise.all(query[coin].addresses.map((coinaddr_value, coinaddr_index) => {
        return new Promise((resolve, reject) => {
          if ( query[coin][coinaddr_value].getbalance.data !== undefined ) {
            var data = query[coin][coinaddr_value].getbalance.data;

            total_balance = parseFloat(total_balance) + parseFloat(data.balance);
            if (data.interest !== undefined) {
              total_interest = parseFloat(total_interest) + parseFloat(data.interest);
              total_final = parseFloat(total_balance) + parseFloat(total_interest);
              pass_data = {
              	'total': total_balance.toFixed(8),
              	'interest': total_interest.toFixed(8),
              	'totalbalance': total_final.toFixed(8)
              };
            }
            if (data.interest == undefined) {
              if (isNaN(total_balance)) {
                total_balance = parseFloat(0);
              }
              pass_data = { 'total': total_balance.toFixed(8) };
            }
          } else {
            pass_data = { 'total': 0.00000000 };
          }

          resolve(pass_data)
        })
       })).then(result => {
        if ( result[result.length - 1].total == 0 ) {
          resolve(result[result.length - 2]);
        } else {
          resolve(result[result.length - 1]);
        }

        NProgress.done();
    	});
    });
  });
}

function getDEXGetBalance2(coin) {
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
				ajax_data_1 = {
					'userpass': tmpIguanaRPCAuth,
					'agent': 'SuperNET',
					'method': 'activehandle'
				},
				tmp_coin_addr = null
				ajax_call_1 = $.ajax({
					data: JSON.stringify(ajax_data_1),
					url: 'http://127.0.0.1:7778',
					type: 'POST',
					dataType: 'json'
				}),
				ajax_call_2 = ajax_call_1.then(function(data) {
					// .then() returns a new promise
					tmp_coin_addr = data[coin];

					var ajax_data_2 = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'dex',
						'method': 'listunspent',
						'address': data[coin],
						'symbol': coin
					};

					return $.ajax({
						data: JSON.stringify(ajax_data_2),
						url: 'http://127.0.0.1:7778',
						type: 'POST',
						dataType: 'json'
					});
				});

		ajax_call_2.done(function(data) {
			console.log(data);
			if (data.error === 'less than required responses') {
				toastr.error('Less than required responses. Please try again.', 'Basilisk Notification');
			}

			var tmpcalcnum = 0,
					tmpcalcinterest = 0,
					interest_enable = false,
					tmptotalbalance = 0;

			$.each(data, function(index) {
				if ( data[index].interest !== undefined ) {
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
					'addr': tmp_coin_addr,
					'total': tmpcalcnum.toFixed(8),
					'interest': tmpcalcinterest.toFixed(8),
					'totalbalance': tmptotalbalance.toFixed(8)
				};
			}
			if ( coin !== 'KMD' ) {
				var tmp_addr_total_balance_output = {
					'addr': tmp_coin_addr,
					'total': tmpcalcnum.toFixed(8)
				};
			}
			console.log(tmp_addr_total_balance_output);

			if (data == '' ) {
				tmp_addr_total_balance_output = {
					'addr': tmp_coin_addr,
					'total': 0
				};
			}

			resolve(tmp_addr_total_balance_output)
			NProgress.done();
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
}