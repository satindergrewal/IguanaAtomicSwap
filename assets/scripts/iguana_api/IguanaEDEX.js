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

		var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode'),
				ajaxCall = $.ajax({
					data: JSON.stringify(ajax_data),
					url: 'http://127.0.0.1:' + config.iguanaPort,
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
			url: 'http://127.0.0.1:' + config.iguanaPort,
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
		url: 'http://127.0.0.1:' + config.iguanaPort,
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

function EDEXSendutxoRawTx(data) {
  Shepherd_GetBasiliskCache().then(function(result) {
		var _data = JSON.parse(result),
	    	query = _data.result.basilisk,
	    	utxos_set = query[data.coin][data.sendfrom].refresh.data,
		    send_data = {
          'coin': data.coin,
          'sendfrom': data.sendfrom,
          'sendtoaddr': data.sendtoaddr,
          'amount': data.amount,
          'txfee': data.txfee,
          'sendsig': (data.sendsig == true ? 0 : 1 ),
          'utxos': utxos_set
	      };

    // console.log(send_data)
    Iguana_utxorawtx(send_data).then(function(result) {
      console.log(result);
      var edexcoin_sendto_result_tbl = '';

      if (result.result == 'success') {
        console.log(send_data)
        toastr.success(_lang[defaultLang].TOASTR.SIGNED_TX_GENERATED + '.', _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
      }
      if (send_data.sendsig == 1) {
        console.log(send_data)
        toastr.info(_lang[defaultLang].TOASTR.SENDING_TX + '.', _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
        ajax_data_dexrawtx = {
          'signedtx': result.signedtx,
          'coin': send_data.coin
        };
        Iguana_DEXsendrawtx(ajax_data_dexrawtx).then(function(dexrwatx_result) {
          console.log(dexrwatx_result);
          if (dexrwatx_result.error == undefined) {
            var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');

            toastr.success(_lang[defaultLang].TOASTR.SIGNED_TX_SENT, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>result</td>' +
                                            '<td>' +
                                              '<span class="label label-success">' + result.result + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>completed</td>' +
                                            '<td>' +
                                              '<span class="label label-primary">' + result.completed + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>rawtx</td>' +
                                            '<td>' +
                                              '<span style="display: block; width: 400px;word-wrap: break-word;">' + result.rawtx + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr>' +
                                            '<td>txid</td>' +
                                            '<td>' +
                                              '<a href="javascript:void(0)" data-edexcoin="' + active_edexcoin + '" data-sendtotxresult="' + dexrwatx_result + '" class="edexcoin_sendto_output_result">' + dexrwatx_result + '</a>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>signedtx</td>' +
                                            '<td>' +
                                              '<span style="display: block; width: 400px;word-wrap: break-word;">' + result.signedtx + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            $('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
            $('#edexcoin_send_coins_anothertx_btn').show();
            $('#edexcoin-send-txdetails-screen').data('panel-api').done();

            var gettxiddata = function() {
              return new Promise(function(resolve, reject) {
                toastr.info(_lang[defaultLang].TOASTR.GETTING_TXID_INFO + '.', _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
                EDEXgettransaction(ajax_data_dexrawtx.coin,dexrwatx_result).then(function(result) {
                  //console.log(result);
                  resolve(result);
                });
              });
            }

            var process_refresh_utxos = function(gettxdata) {
              return new Promise(function(resolve, reject) {
                //console.log(gettxdata)
                //console.log(utxos_set)
                EDEX_ProcessRefreshData(gettxdata,utxos_set).then(function(new_utxos_set) {
                  console.log(new_utxos_set);
                  resolve(new_utxos_set);
                });
              });
            }

            var get_data_cache_contents = function(new_utxos_set) {
              return new Promise(function(resolve, reject) {
                console.log(new_utxos_set)
                console.log(send_data)
                console.log(send_data.sendfrom)
                Shepherd_GroomData_Get().then(function(result) {
                  console.log(result);
                  console.log(result.basilisk.KMD[send_data.sendfrom].refresh);
                  delete result.basilisk.KMD[send_data.sendfrom].refresh.data;
                  console.log(result.basilisk.KMD[send_data.sendfrom].refresh);
                  result.basilisk.KMD[send_data.sendfrom].refresh.data = new_utxos_set;
                  console.log(result.basilisk.KMD[send_data.sendfrom].refresh);
                  var save_this_data = result;
                  resolve(result);
                });
              });
            }

            var save_new_cache_data = function(save_this_data) {
              return new Promise(function(resolve, reject) {
                console.log(save_this_data);
                Shepherd_GroomData_Post(save_this_data).then(function(result) {
                  console.log(result);
                  resolve(result);
                });
              });
            }

            gettxiddata()
	            .then(function(gettxdata) {
	              return process_refresh_utxos(gettxdata);
	            })
	            .then(function(new_utxos_set) {
	              return get_data_cache_contents(new_utxos_set);
	            })
	            .then(function(save_this_data) {
	              return save_new_cache_data(save_this_data);
	            });

            //var call_data = {"allcoins": false,"coin":ajax_data_dexrawtx.coin,"calls":"refresh"}
            //console.log(call_data)
            /*Shepherd_FetchBasiliskData(call_data).then(function(result){
                console.log(result)
                toastr.info('Refreshing Wallet Funds.', 'Wallet Notification');
            })*/
          } else {
            var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');

            toastr.success(_lang[defaultLang].TOASTR.SIGNED_TX_SENT, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>result</td>' +
                                            '<td>' +
                                              '<span class="label label-dark">' + dexrwatx_result.result + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>error</td>' +
                                            '<td>' +
                                              '<span class="label label-danger">' + dexrwatx_result.error + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            edexcoin_sendto_result_tbl += '<tr class="">' +
                                            '<td>signedtx</td>' +
                                            '<td>' +
                                              '<span style="display: block; width: 400px;word-wrap: break-word;">' + ajax_data_dexrawtx.signedtx + '</span>' +
                                            '</td>' +
                                        	'</tr>';
            $('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
            $('#edexcoin_send_coins_anothertx_btn').show();
            $('#edexcoin-send-txdetails-screen').data('panel-api').done();

            var call_data = {
            	'allcoins': false,
            	'coin': 'KMD',
            	'calls': 'refresh'
            };
            console.log(call_data);
            Shepherd_FetchBasiliskData(call_data).then(function(result) {
              console.log(result);
              toastr.info(_lang[defaultLang].TOASTR.REFRESHING_FUNDS + '.', _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
            });
          }
        });
      }
      if (send_data.sendsig == 0) {
        console.log(send_data);
        var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');

        //toastr.success('Signed Transaction Generated.', 'Wallet Notification');
        edexcoin_sendto_result_tbl += '<tr class="">' +
                                        '<td>result</td>' +
                                        '<td>' +
                                          '<span class="label label-success">' + result.result + '</span>' +
                                        '</td>' +
                                    	'</tr>';
        edexcoin_sendto_result_tbl += '<tr class="">' +
                                        '<td>completed</td>' +
                                        '<td>' +
                                          '<span class="label label-primary">' + result.completed + '</span>' +
                                        '</td>' +
                                    	'</tr>';
        edexcoin_sendto_result_tbl += '<tr class="">' +
                                        '<td>rawtx</td>' +
                                        '<td>' +
                                          '<span style="display: block; width: 400px;word-wrap: break-word;">' + result.rawtx + '</span>' +
                                        '</td>' +
                                    	'</tr>';
        edexcoin_sendto_result_tbl += '<tr>' +
                                        '<td>txid</td>' +
                                        '<td>' +
                                          '<a href="javascript:void(0)" data-edexcoin="' + active_edexcoin + '" data-sendtotxresult="' + result.txid + '" class="edexcoin_sendto_output_result">' + result.txid + '</a>' +
                                        '</td>' +
                                    	'</tr>';
        edexcoin_sendto_result_tbl += '<tr class="">' +
                                        '<td>signedtx</td>' +
                                        '<td>' +
                                          '<span style="display: block; width: 400px;word-wrap: break-word;">' + result.signedtx + '</span>' +
                                        '</td>' +
                                    	'</tr>';
        $('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
        $('#edexcoin_send_coins_anothertx_btn').show();
        $('#edexcoin-send-txdetails-screen').data('panel-api').done();

        var call_data = {
        	'allcoins': false,
        	'coin': 'KMD',
        	'calls': 'refresh'
        };
        console.log(call_data)
        Shepherd_FetchBasiliskData(call_data).then(function(result) {
          console.log(result);
          toastr.info(_lang[defaultLang].TOASTR.REFRESHING_FUNDS, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
        });
      }
    });
  });
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
				]
			};

	console.log(sendtoaddrvalues);
	console.log(sendtoaddrvalues.params);

	$.ajax({
		type: 'POST',
		data: JSON.stringify(sendtoaddrvalues),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var SendToAddrData = JSON.parse(data),
					edexcoin_sendto_result_tbl = '';

			result.push(SendToAddrData);

			if ( SendToAddrData.error !== undefined ) {
				toastr.error(_lang[defaultLang].TOASTR.TX_FAILED, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
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

				toastr.success(_lang[defaultLang].TOASTR.TX_SENT_ALT, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
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
        $('#edexcoin-send-txdetails-screen').data('panel-api').done();
			}

			var selected_coinmode = sessionStorage.getItem('edexTmpMode');
			if ( selected_coinmode == 'Basilisk' ) {
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
				getDEXGetBalance(active_edexcoin).then(function(result) {
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
      $('#edexcoin-send-txdetails-screen').data('panel-api').done();
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
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
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

function EDEXgettransaction(coin,txid) {
  return new Promise((resolve) => {
    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        ajax_data = {
            'userpass': tmpIguanaRPCAuth,
            'symbol': coin,
            'agent': 'dex',
            'method': 'gettransaction',
            'vout':1,
            'txid': txid
        };

    //console.log(ajax_data)
    $.ajax({
      type: 'POST',
      data: JSON.stringify(ajax_data),
      url: 'http://127.0.0.1:' + config.iguanaPort
    }).then(function(data) {
      //console.log(data);
      res_data = JSON.parse(data);
      //console.log(res_data);
      resolve(res_data);
    }).fail(function(xhr, textStatus, error) {
      // handle request failures
      console.log(xhr.statusText);
      if ( xhr.readyState == 0 ) {
      }
      console.log(textStatus);
      console.log(error);
    });

    /*var AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
        AjaxOutputData = JSON.parse(AjaxOutputData.responseText)
        resolve(AjaxOutputData);
    }).fail(function(xhr, textStatus, error) {
        // handle request failures
        console.log(xhr.statusText);
        if ( xhr.readyState == 0 ) {
        }
        console.log(textStatus);
        console.log(error);
    });*/
  });
}

function EDEXgetaddrbyaccount_cache(coin) {
  return new Promise((resolve) => {
    Shepherd_GetBasiliskCache().then(function(result) {
      var _data = JSON.parse(result),
          query = _data.result.basilisk,
          tmp_addr_label = '<span class="label label-default">' +
                           	 '<i class="icon fa-eye"></i> ' + _lang[defaultLang].IAPP.PUBLIC_SM +
                           '</span>',
          active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

      //console.log(query[coin].addresses)

      Promise.all(query[coin].addresses.map((coinaddr_value, coinaddr_index) => {
        return new Promise((resolve, reject) => {
          //console.log(coinaddr_index);
          //console.log(coinaddr_value);
          coinaddr_balances = query[coin][coinaddr_value].getbalance.data;

          if (coinaddr_balances.interest !== undefined) {
              var pass_data = {
                    'label': tmp_addr_label,
                    'addr': coinaddr_value,
                    'total': coinaddr_balances.balance.toFixed(8),
                    'interest': coinaddr_balances.interest.toFixed(8)
                	};
          }
          if (coinaddr_balances.interest == undefined) {
            var pass_data = {
	                'label': tmp_addr_label,
	                'addr': coinaddr_value,
	                'total': coinaddr_balances.balance.toFixed(8)
            		};
          }

          //console.log(pass_data);
          resolve(pass_data);
        });
      }))
      .then(result => {
        //console.log(result);
        resolve(result);
      })
    });
  });
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
												   '<i class="icon fa-eye"></i> ' + _lang[defaultLang].IAPP.PUBLIC_SM +
												 '</span>';
				active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		var AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
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
										url: 'http://127.0.0.1:' + config.iguanaPort,
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
								url: 'http://127.0.0.1:' + config.iguanaPort,
								type: 'POST',
								dataType: 'json'
							})
							.then(data => {
								console.log(coinaddr_value);
								console.log(data);

								if (data.error === 'less than required responses') {
									toastr.error(_lang[defaultLang].TOASTR.LESS_RESPONSES_REQ, _lang[defaultLang].TOASTR.BASILISK_NOTIFICATION);
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
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
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
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
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

function EDEX_ProcessRefreshData(gettxdata,refreshdata){
  console.log(gettxdata);
  console.log(refreshdata);

  return new Promise((resolve, reject) => {
    Promise.all(gettxdata.vin.map((vin_value,vin_index) => {
      console.log(vin_index);
      console.log(vin_value);

      return new Promise((resolve, reject) => {
        Promise.all(refreshdata.map((refresh_value,refresh_index) => {
          console.log(refresh_index);
          console.log(refresh_value);

          if (refreshdata[refresh_index] !== undefined && refresh_value.txid == vin_value.txid) {
            delete refreshdata[refresh_index];
            refreshdata = refreshdata;
            resolve(refreshdata);
          }
        }));
      });
    }))
    .then(result=>{
      var res_data = result[result.length - 1],
      		refresh_final = [];
      console.log(res_data);

      $.each(res_data,function(index){
        if(res_data[index] !== undefined) {
          refresh_final.push(res_data[index]);
        }
      })
      //console.log(refresh_final)
      resolve(refresh_final);
    });
  })
}