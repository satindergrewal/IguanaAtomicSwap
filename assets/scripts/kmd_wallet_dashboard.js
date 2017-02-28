var KMDWalletDashboard = function() {
	var handle_KMD_Dashboard = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();
		$('#btn_' + action_btn_code + '_wallet_dashboard').click(function() {
			console.log('kmd wallet dashbaord button clicked...');
			console.log($(this).data());
			if ( sessionStorage.getItem('edexTmpMode') === 'Native') {
				sessionStorage.setItem('edexTmpRefresh', 'start');
			}
			if ( sessionStorage.getItem('edexTmpMode') === 'Basilisk' || sessionStorage.getItem('edexTmpMode') === 'Full' ) {
				sessionStorage.setItem('edexTmpRefresh', 'stop');
			}
			$('#kmd_wallet_dashoard_section').show();
			$('#kmd_wallet_dashboardinfo').show();
			$('#kmd_wallet_send').hide();
			$('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').hide();
			getTotalKMDBalance();
			KMDfillTxHistoryT();
			clearSendManyFieldData();
		});

		$('.btn-kmdtxid').click(function() {
			console.log('kmd-txid-details-btn button clicked!..');
			console.log($(this).data('txid-type'));
			console.log($(this).data('txid'));

			var kmd_addr_txid_info = KMDGetTransactionIDInfo($(this).data('txid'));
			console.log(kmd_addr_txid_info);
			$('#kmd_txid_info_amount').text(kmd_addr_txid_info[0].amount);
			$('#kmd_txid_info_fee').text(kmd_addr_txid_info[0].fee);
			$('#kmd_txid_info_confirmations').text(kmd_addr_txid_info[0].confirmations);
			$('#kmd_txid_info_blockhash').text(kmd_addr_txid_info[0].blockhash);
			$('#kmd_txid_info_blockindex').text(kmd_addr_txid_info[0].blockindex);
			$('#kmd_txid_info_blocktime').text(kmd_addr_txid_info[0].blocktime);
			$('#kmd_txid_info_txid').text(kmd_addr_txid_info[0].txid);
			$('#kmd_txid_info_walletconflicts').text(kmd_addr_txid_info[0].walletconflicts);
			$('#kmd_txid_info_time').text(kmd_addr_txid_info[0].time);
			$('#kmd_txid_info_timereceived').text(kmd_addr_txid_info[0].timereceived);
			$('#kmd_txid_info_vjoinsplit').text(kmd_addr_txid_info[0].vjoinsplit);
			$('#kmd_txid_info_details').text(kmd_addr_txid_info[0].details);
			$('#kmd_txid_info_hex').val(kmd_addr_txid_info[0].hex);
			clearSendManyFieldData();
		});

	}

	var handle_KMD_Send = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();

		$('#btn_' + action_btn_code + '_wallet_send').click(function() {
			var tmpoptions = '';

			KMDListAllOPIDs();
			sessionStorage.setItem('edexTmpRefresh', 'stop');

			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_send').show();
			$('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').hide();

			var kmd_addr_list_with_balance = KMDlistunspentT();

			tmpoptions += '<option> - Select Transparent or Private Address - </option>';
			$.each(kmd_addr_list_with_balance, function(index) {
				tmpoptions += '<option value="' + kmd_addr_list_with_balance[index].addr + '" data-total="' + kmd_addr_list_with_balance[index].total.toFixed(8) + '">[ ' + kmd_addr_list_with_balance[index].total.toFixed(8) + ' KMD ] &emsp;' + kmd_addr_list_with_balance[index].addr + '</option>';
				$('#kmd_wallet_send_from').html(tmpoptions);
			});

			var kmd_z_addr_list_with_balance = KMDListaddrZ();
			$.each(kmd_z_addr_list_with_balance, function(index) {
				if (kmd_z_addr_list_with_balance[index].total !== 0) {
					tmpoptions += '<option value="' + kmd_z_addr_list_with_balance[index].addr + '" data-total="' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + '">[ ' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + ' KMD ] &emsp;' + kmd_z_addr_list_with_balance[index].addr + '</option>';
					$('#kmd_wallet_send_from').html(tmpoptions);
				}
			});

			$('.showkmdwalletaddrs').selectpicker({ style: 'btn-info' });
			$('.showkmdwalletaddrs').selectpicker('refresh');
			clearSendManyFieldData();
		});

		$('.showkmdwalletaddrs').on('change', function(){
			var selected = $(this).find("option:selected").val();
		});

		$('#kmd_wallet_amount').keyup(function() {
			var sum_val1 = parseFloat($('#kmd_wallet_amount').val()),
					sum_val2 = parseFloat($('#kmd_wallet_fee').val()),
					total_minus_currency_fee = sum_val1 - sum_val2,
					mdl_send_btn = $('#kmd_wallet_send_coins_btn');

			$('#kmd_wallet_total_value').text(total_minus_currency_fee.toFixed(8));

			if ($('#kmd_wallet_send_from').val() != '- Select Transparent or Private KMD Address -' &&
					$('#kmd_wallet_amount').val() != '' &&
					$('#kmd_wallet_sendto') != '' &&
					$('#kmd_wallet_fee') != '' ) {
				mdl_send_btn.removeClass('disabled');
				//mdl_send_btn.attr('data-dismiss','modal');
				//mdl_send_btn.attr('data-target','#SendCoinModelStep2');
			} else {
				mdl_send_btn.addClass('disabled');
				mdl_send_btn.removeAttr('data-dismiss');
				mdl_send_btn.removeAttr('data-target');
			}
		});

		$('#kmd_wallet_fee').keyup(function() {
			var sum_val1 = parseFloat($('#kmd_wallet_amount').val()),
					sum_val2 = parseFloat($('#kmd_wallet_fee').val()),
					total_minus_currency_fee = sum_val1 - sum_val2,
					mdl_send_btn = $('#kmd_wallet_send_coins_btn');

			$('#kmd_wallet_total_value').text(total_minus_currency_fee.toFixed(8));

			if ($('#kmd_wallet_send_from').val() != '- Select Transparent or Private KMD Address -' &&
					$('#kmd_wallet_amount').val() != '' &&
					$('#kmd_wallet_sendto') != '' &&
					$('#kmd_wallet_fee') != '' ) {
				mdl_send_btn.removeClass('disabled');
				//mdl_send_btn.attr('data-dismiss','modal');
				//mdl_send_btn.attr('data-target','#SendCoinModelStep2');
			} else {
				mdl_send_btn.addClass('disabled');
				mdl_send_btn.removeAttr('data-dismiss');
				mdl_send_btn.removeAttr('data-target');
			}
		});

		/*$('#kmd_wallet_send_coins_btn').click(function() {
			console.log('send button clicked in form...')
		});*/

		$('.extcoin-send-form').validate({
			// errorElement: 'span', //default input error message container
			// errorClass: 'help-block', // default input error message class
			// focusInvalid: false, // do not focus the last invalid input
			rules: {
				kmd_wallet_send_from: {
					required: true
				},
				kmd_wallet_sendto: {
					required: true
				},
				kmd_wallet_amount: {
					required: true
				},
				kmd_wallet_fee: {
					required: true
				},
				kmd_wallet_total_value: {
					required: true
				}
			},

			messages: {
				kmd_wallet_send_from: {
					required: 'From Address is required.'
				},
				kmd_wallet_sendto: {
					required: 'To Address is required.'
				},
				kmd_wallet_amount: {
					required: 'Please enter KMD amount to send.'
				},
				kmd_wallet_fee: {
					required: 'Make sure you have fee entered. Default value is 0.0001 KMD.'
				},
				kmd_wallet_total_value: {
					required: 'Make sure you have both amount and fee entered to calculate final total.'
				}
			},

			submitHandler: function(form) {
				console.log('Sent control here after clicked in form...');
				KMDZSendManyTransaction();
				clearSendManyFieldData();
			}
		});

		$('.extcoin-send-form #kmd_wallet_send_coins_btn').keypress(function(e) {
			if (e.which == 13) {
				if ($('.extcoin-send-form').validate().form()) {
					$('.extcoin-send-form').submit(); // form validation success, call ajax form submit
				}

				return false;
			}
		});

		$('#kmd_opids_status_btn').click(function(){
			KMDListAllOPIDs();
		});
	}

	var KMDWalletSettings = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();

		$('#btn_' + action_btn_code + '_wallet_settings').click(function() {
			console.log('wallet settings button clicked...');
			sessionStorage.setItem('edexTmpRefresh', 'stop');
			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_dashoard_section').hide();
			$('#kmd_wallet_send').hide();
			$('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').show();
			getKMDWalletInfo();
			getKMDInfo();
			clearSendManyFieldData();
		});
	};

	var KMDWalletRecieve = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();

		$('#btn_' + action_btn_code + '_wallet_recieve').click(function() {
			sessionStorage.setItem('edexTmpRefresh', 'stop');
			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_dashoard_section').hide();
			$('#kmd_wallet_send').hide();
			$('#kmd_wallet_recieve_section').show();
			$('#kmd_wallet_settings').hide();
			KMDListAllAddr();
			clearSendManyFieldData();
		});

		$('#kmd_get_new_taddr').click(function() {
			console.log('get new T address button clicked...');
			KMDGetNewAddresses('public');
			KMDListAllAddr();
			toastr.info('Receiving Address list updated', 'Wallet Notification');
		});

		$('#kmd_get_new_zaddr').click(function() {
			console.log('get new Z address button clicked...');
			KMDGetNewAddresses('private');
			KMDListAllAddr();
			toastr.info('Receiving Address list updated', 'Wallet Notification');
		});
	};

	var handleWalletDashboardAlet = function() {
		$('#extcoin-wallet-connection-alert-btn').click(function() {
			RunKMDInitFunctions();
		});
	}

	return {
		// main function to initiate the module
		init: function() {
			handle_KMD_Dashboard();
			//KMDfillTxHistoryT();
			handle_KMD_Send();
			KMDWalletRecieve();
			KMDWalletSettings();
			//RunKMDInitFunctions();
			handleWalletDashboardAlet();
		}
	};
}();

jQuery(document).ready(function() {
	// KMDWalletDashboard.init();
	// TODO: refactor
	var RunNativeProgressBar = setInterval(function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
				 sessionStorage.getItem('NativeWalletActions') === null ||
				 sessionStorage.getItem('NativeWalletActions') === 'stop' ) {
			//clearInterval(RunNativeProgressBar);
			//console.log('=> No wallet logged in, or Native Wallet not ative. No need to Run Progress Bar code.');
		} else if ( sessionStorage.getItem('NativeWalletActions') !== null || sessionStorage.getItem('NativeWalletActions') === 'start') {
			KMD_ProgressBar();
		}
	}, 5000);

	var RefreshEdexWalletDashboard = setInterval(function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
				 sessionStorage.getItem('NativeWalletActions') === null ||
				 sessionStorage.getItem('NativeWalletActions') === 'stop' ) {
			clearInterval(RefreshEdexWalletDashboard);
			//console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
		} else if ( sessionStorage.getItem('NativeWalletActions') === null || sessionStorage.getItem('NativeWalletActions') === 'start') {
			if ( $('[data-data-extcoin]').attr("data-data-extcoin") !== 'COIN' ) {
				if ( sessionStorage.getItem('edexTmpMode') !== null || sessionStorage.getItem('edexTmpMode') === 'Native') {
					if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === 'start') {
						//console.log('it is not COIN. '+'It is: ' + $('[data-data-extcoin]').attr("data-data-extcoin"));
						var action_btn_code = getHeaderActionMenuButtonCoinCode();
						$( '#btn_' + action_btn_code + '_wallet_dashboard' ).trigger( 'click' );
					}
				}
			}
		}
	}, 30000);
});

function RunKMDInitFunctions() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var check1 = CheckIfConnected();
	console.log(check1[0]);
	if ( check1[0] == 'not active' ) {
		console.log('Could not connect to external wallet. Is external wallet running?');
		toastr.error('Connection Error. Is external wallet running?', 'Wallet Notification');
		$('#extcoin-wallet').hide();
		$('#extcoin-wallet-connection-alert').show();
	}
	if ( check1[0] == 'null return' ) {
		console.log('Could not connect to external wallet. Is iguana connected to external wallet?');
		toastr.error('Connection Error. Is iguana connected to external wallet?', 'Wallet Notification');
		$('#extcoin-wallet').hide();
		$('#extcoin-wallet-connection-alert').show();
	}
	if ( check1[0] == 'activating' ) {
		$('#extcoin-wallet-activating-alert').show();
		$('#extcoin-wallet').show();
		$('#extcoin-wallet-connection-alert').hide();

		function _getKMDInfo() {
			var passthru_agent = getPassthruAgent(),
					tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
					ajax_data = {
						'userpass': tmpIguanaRPCAuth,
						'agent': passthru_agent,
						'method': 'passthru',
						'function': 'getinfo',
						'hex': ''
					};

			console.log(ajax_data);
			$.ajax({
				type: 'POST',
				data: JSON.stringify(ajax_data),
				url: 'http://127.0.0.1:7778',
				success: function(data, textStatus, jqXHR) {
					var AjaxOutputData = JSON.parse(data);

					if (AjaxOutputData && !AjaxOutputData.blocks) {
						startBestBlockInterval();
					} else {
						clearInterval(currentBestBlockInterval);
					}
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

		function getRemoteCurrentHeight() {
			$.ajax({
				type: 'GET',
				url: 'http://localhost:7778/api/dex/getinfo?userpass=tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth') + '&symbol=KMD',
				success: function(data, textStatus, jqXHR) {
					data = JSON.parse(data);

					if (data && data.blocks) {
						totalBlocksInExplorer = data.blocks;
					}
				},
				error: function(xhr, textStatus, error) {
					console.log('failed getinfo from dex api');
					console.log(xhr.statusText);
					console.log(textStatus);
					console.log(error);
				}
			});
		}

		var currentBestBlockInterval;
		function startBestBlockInterval() {
			currentBestBlockInterval = setInterval(function() {
				$.ajax({
					type: 'POST',
					data: {
						'herdname': 'komodo',
						'lastLines': 1
					},
					url: 'http://127.0.0.1:17777/shepherd/debuglog',
					success: function(data, textStatus, jqXHR) {
						if (data.indexOf('UpdateTip') > -1) {
							var temp = data.split(' ');

							for (var i = 0; i < temp.length; i++) {
								if (temp[i].indexOf('height=') > -1) {
									var currentBestChain = temp[i].replace('height=', '');
									$('#activating-komodod-tridot').hide();
									$('#activating-komodod-progress').html(': ' + Math.floor(currentBestChain * 100 / totalBlocksInExplorer) + '% (blocks ' + currentBestChain + ' / ' + totalBlocksInExplorer + ')');

									if (currentBestChain === totalBlocksInExplorer) {
										//clearInterval(totalBlocksInExplorerInterval);
										clearInterval(currentBestBlockInterval);
									}
								}
							}
						}
					},
					error: function(xhr, textStatus, error) {
						console.log('failed getting debug.log');
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});
			}, 30000);
		}

		getRemoteCurrentHeight();

		var totalBlocksInExplorer = 0,
				totalBlocksInExplorerInterval = setInterval(function() {
			getRemoteCurrentHeight();
			_getKMDInfo();
		}, 60000);

		$('#kmd_wallet_dashoard_section').show();
		$('#kmd_wallet_dashboardinfo').show();
		$('#kmd_wallet_send').hide();
		$('#kmd_wallet_recieve_section').hide();
		$('#kmd_wallet_settings').hide();
	}
	if ( check1[0] == 'connected') {
		getTotalKMDBalance();
		KMDfillTxHistoryT();
		$('#extcoin-wallet').show();
		$('#extcoin-wallet-connection-alert').hide();

		$('#kmd_wallet_dashoard_section').show();
		$('#kmd_wallet_dashboardinfo').show();
		$('#kmd_wallet_send').hide();
		$('#kmd_wallet_recieve_section').hide();
		$('#kmd_wallet_settings').hide();
	}

	// KMDWalletDashboard.init()
	$('#kmd_wallet_recieve_section').hide();
	NProgress.done();
}

function getHeaderActionMenuButtonCoinCode() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin'),
			action_menu_button_code = '';

	if ( extcoin == 'KMD') { action_menu_button_code = 'kmd'; };
	if ( extcoin == 'ZEC') { action_menu_button_code = 'zec'; };

	return action_menu_button_code;
}

function getPassthruAgent() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin');
			passthru_agent = '';

	if ( extcoin == 'KMD') { passthru_agent = 'komodo'; };
	if ( extcoin == 'ZEC') { passthru_agent = 'zcash'; };

	return passthru_agent;
}

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

	console.log(ajax_data);
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

function getKMDWalletInfo() {
	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getwalletinfo',
				'hex': ''
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
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
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getinfo',
				'hex': ''
			};

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
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

function KMDlistunspentT() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'listunspent',
				'hex': ''
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		//dataType: 'text',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data), // Ajax output gets the whole list of unspent coin with addresses
					unique_addresses  = _.keys(_.countBy(AjaxOutputData, function(data) { return data.address; })); // This code using underscore.js takes only the address into an array which are unique in that list

			// This function calls each unique address and calculates the total amount of coins in it.
			$.each(unique_addresses, function(index) {
				var unique_addr_tmp_array = _.where(AjaxOutputData, { address: unique_addresses[index] }),
						tmpcalcnum = 0;

				$.each(unique_addr_tmp_array, function(index, value) {
					tmpcalcnum = tmpcalcnum + value.amount;
				});

				var tmp_addr_total_balance_output = {
					'addr': unique_addr_tmp_array[0].address,
					'total': tmpcalcnum
				};
				result.push(tmp_addr_total_balance_output);
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

	NProgress.done();
	return result;
}

function KMDListaddrZ() {
	var result = [];

	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_listaddresses',
				'hex': ''
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses
			// This code gets list of all z_addresses into an array
			// This function calls each address and then gets the total amount of coins in it.
			$.each(AjaxOutputData, function(index, value) {
				var ajax_data_to_hex = '["' + value + '",0]',
						tmpZaddrs_output = Iguana_HashHex(ajax_data_to_hex),
						passthru_agent = getPassthruAgent(),
						tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
						ajax_data_zaddrbalance = {
							'userpass': tmpIguanaRPCAuth,
							'agent': passthru_agent,
							'method': 'passthru',
							'function': 'z_getbalance',
							'hex': tmpZaddrs_output
						};

				$.ajax({
					async: false,
					type: 'POST',
					data: JSON.stringify(ajax_data_zaddrbalance),
					url: 'http://127.0.0.1:7778',
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


function KMDGetPublicTransactions() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'listtransactions',
				'hex': ''
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses
			console.log(AjaxOutputData);

			$.each(AjaxOutputData, function(index, value) {
				var tmp_category = '',
						tmp_addr = AjaxOutputData[index].address;

				if (!('address' in AjaxOutputData[index])) {
					tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>';
				}
				var tmp_secondsToString = secondsToString(AjaxOutputData[index].time);

				if ( AjaxOutputData[index].category == 'send' ) {
					tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
				}
				if ( AjaxOutputData[index].category == 'receive' ) {
					tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
				}
				if ( AjaxOutputData[index].category == 'generate' ) {
					tmp_category = '<i class="icon fa-cogs"></i> Mined';
				}
				if ( AjaxOutputData[index].category == 'immature' ) {
					tmp_category = '<i class="icon fa-clock-o"></i> Immature';
				}

				tmplisttransactions = [
					'<span class="label label-default">' +
						'<i class="icon fa-eye"></i> public' +
					'</span>',
					tmp_category,
					AjaxOutputData[index].confirmations,
					AjaxOutputData[index].amount,
					tmp_secondsToString,
					tmp_addr,
					'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light btn-kmdtxid" data-toggle="modal" data-target="#kmd_txid_info_mdl" id="kmd-txid-details-btn" data-txid-type="public" data-txid="' + AjaxOutputData[index].txid + '"><i class="icon fa-search"></i></button>'
				];
				result.push(tmplisttransactions);
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

	NProgress.done();
	return result;
}

function KMDGetProtectedTransactions() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			get_zaddr_list = KMDListaddrZ();

	$.each(get_zaddr_list, function(index, value) {
		var ajax_data_to_hex = '["' + value.addr + '",0]',
				tmpzaddr_hex_input = Iguana_HashHex(ajax_data_to_hex),
				passthru_agent = getPassthruAgent(),
				tmpIguanaRPCAuth = 'tmpIgRPCUser@ '+ sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					"agent": passthru_agent,
					"method": "passthru",
					"function": "z_listreceivedbyaddress",
					"hex": tmpzaddr_hex_input
				};

		$.ajax({
			async: false,
			type: 'POST',
			data: JSON.stringify(ajax_data),
			url: 'http://127.0.0.1:7778',
			success: function(data, textStatus, jqXHR) {
				var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses

				$.each(AjaxOutputData, function(index, txidvalue) {
					var tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
					var tmp_addr = value.addr.slice(0, 30) + '...';
					if (!('amount' in txidvalue)) {
						var tmp_amount = 0;
					} else {
						var tmp_amount = txidvalue.amount;
					}

					var tmp_addr_txid_info = KMDGetTransactionIDInfo(AjaxOutputData[index].txid),
							tmp_confirmations = tmp_addr_txid_info[0].confirmations,
							tmp_secondsToString = secondsToString(tmp_addr_txid_info[0].time),
							tmplistZtransactions = [
								'<span class="label label-dark">' +
									'<i class="icon fa-eye-slash"></i> private' +
								'</span>',
								tmp_category,
								tmp_confirmations,
								tmp_amount,
								tmp_secondsToString,
								tmp_addr,
								'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light" data-toggle="modal" data-target="#kmd_txid_info_mdl" id="kmd-txid-details-btn" data-txid-type="private" data-txid="' + txidvalue.txid + '"><i class="icon fa-search"></i></button>'
							];
					result.push(tmplistZtransactions);
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
	});

	NProgress.done();
	return result;
}

function KMDfillTxHistoryT() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var txhistorydataT = KMDGetPublicTransactions();
	//var txhistorydataZ = KMDGetProtectedTransactions();
	//var txhistorydata = $.merge( txhistorydataT, txhistorydataZ );
	var txhistorydata = txhistorydataT,
			kmd_txhistory_table = '';

	kmd_txhistory_table = $('#kmd-tx-history-tbl').DataTable({
		data: txhistorydata,
		'order': [
			[
				4,
				'desc'
			]
		],
		select: true,
		retrieve: true
	});

	kmd_txhistory_table.destroy();
	kmd_txhistory_table = $('#kmd-tx-history-tbl').DataTable({
		data: txhistorydata,
		'order': [
			[
				4,
				'desc'
				]
			],
		select: true,
		retrieve: true
	});

	NProgress.done();
}

function KMDListAddresses(pubpriv) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var result = [],
			ajax_data_to_hex = '""',
			ajax_function_input = '',
			tmplistaddr_hex_input = '';
	
	if ( pubpriv === 'public' ) {
		ajax_function_input = 'getaddressesbyaccount';
		tmplistaddr_hex_input = Iguana_HashHex(ajax_data_to_hex);
	}
	if ( pubpriv === 'private' ) {
		ajax_function_input = 'z_listaddresses';
		tmplistaddr_hex_input = '';
	}

	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': ajax_function_input,
				'hex': tmplistaddr_hex_input
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
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
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
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
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': ajax_function_input,
				'hex': ''
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			result = data;
			toastr.success('New address generated successfully', 'Wallet Notification');
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
			template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();

	var only_reciving_addr_data = [],
			listTaddr = KMDListAddresses('public'),
			listZaddr = KMDListAddresses('private'),
			listAlladdr = $.merge( listTaddr, listZaddr );

	$.each(listAlladdr, function(index, value) {
		tmp_addr_label = '<span class="label label-default">' +
										 	 '<i class="icon fa-eye"></i> public' +
										 '</span>';
		if ( listAlladdr[index].slice(0, 2) == 'zc' || listAlladdr[index].slice(0, 2) == 'zt' ) {
			tmp_addr_label = '<span class="label label-dark">' +
											   '<i class="icon fa-eye-slash"></i> private' +
											 '</span>';
		}
		//var tmp_addr_action_button = '<button></button>';
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

function KMDGetTransactionIDInfo(txid) {
	var result = [],
			ajax_data_to_hex = '["' + txid + '"]',
			tmptxid_output = Iguana_HashHex(ajax_data_to_hex),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'gettransaction',
				'hex': tmptxid_output
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			result.push(AjaxOutputData);
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

function KMDGetOPIDInfo(opid) {
	var result = [],
			tmpopid_output = '';

	if ( opid === undefined ) {
		tmpopid_output = '';
	} else {
		var ajax_data_to_hex = '["' + opid + '"]',
				tmpopid_output = Iguana_HashHex(ajax_data_to_hex);
	}

	var passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_getoperationstatus',
				'hex': tmpopid_output
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			result.push(AjaxOutputData);
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

function KMDListAllOPIDs() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	var opids_statuses_data = [],
			listOPIDs = KMDGetOPIDInfo(),
			tmp_results = 'Waiting...',
			tmp_status_label = '',
			tmp_creation_time = '',
			tmp_id = '';

	console.log(listOPIDs);
	$.each(listOPIDs[0], function(index, value) {
		tmp_id = listOPIDs[0][index].id;
		tmp_creation_time = secondsToString(listOPIDs[0][index].creation_time);

		if (listOPIDs[0][index].status === 'queued') {
			tmp_status_label = '<span class="label label-warning">' +
												 	 '<i class="icon fa-eye"></i> Queued' +
												 '</span>';
			tmp_results = '<i>Please press refresh button in a minute or so to see updated status...</i>';
		}
		if (listOPIDs[0][index].status === 'executing') {
			tmp_status_label = '<span class="label label-info">' +
												   '<i class="icon fa-eye"></i> Executing' +
												 '</span>';
			tmp_results = '<i>Please press refresh button in a minute or so to see updated status...</i>';
		}
		if (listOPIDs[0][index].status === 'failed') {
			tmp_status_label = '<span class="label label-danger">' +
												   '<i class="icon fa-eye"></i> Failed' +
												 '</span>';
			tmp_results = '<b>Error Code:</b> ' + listOPIDs[0][index].error.code + '<br> <b>Message:</b> ' + listOPIDs[0][index].error.message;
		}
		if (listOPIDs[0][index].status === 'success') {
			tmp_status_label = '<span class="label label-success">' +
												   '<i class="icon fa-eye"></i> Success' +
												 '</span>';
			tmp_results = '<b>txid:</b> ' + listOPIDs[0][index].result.txid + '<br> <b>Execution Seconds:</b> ' + listOPIDs[0][index].execution_secs;
		}

		opids_statuses_data.push([
			tmp_status_label,
			tmp_id,
			tmp_creation_time,
			tmp_results
		]);
	});

	var kmd_opids_statuses_table = '';

	kmd_opids_statuses_table = $('#kmd-opid-status-tbl').DataTable({
		data: opids_statuses_data,
		'order': [
			[
				2,
				'desc'
			]
		],
		select: false,
		retrieve: true
	});

	kmd_opids_statuses_table.destroy();

	kmd_opids_statuses_table = $('#kmd-opid-status-tbl').DataTable({
		data: opids_statuses_data,
		'order': [
			[
				2,
				'desc'
			]
		],
		select: false,
		retrieve: true
	});

	NProgress.done();
	return opids_statuses_data;
}

function KMDZSendManyTransaction() {
	var result = [],
			zsendmoney_output = '',
			tmp_zsendmany_from_addr = $('#kmd_wallet_send_from').val(),
			tmp_zsendmany_to_addr = $('#kmd_wallet_sendto').val(),
			tmp_zsendmany_total_amount = $('#kmd_wallet_total_value').text(),
			ajax_data_to_hex = '["' + tmp_zsendmany_from_addr + '",[{"address":"' + tmp_zsendmany_to_addr + '","amount":' + tmp_zsendmany_total_amount + '}]]',
			zsendmoney_output = Iguana_HashHex(ajax_data_to_hex),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_sendmany',
				'hex': zsendmoney_output
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:7778',
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

function CheckIfConnected() {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin'),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getinfo',
				'hex': ''
			};
	
	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log('== Data OutPut ==');
			console.log(AjaxOutputData);
			console.log(AjaxOutputData.error);

			if ( AjaxOutputData.errors != undefined ) {
				result.push('connected');
			} else if ( AjaxOutputData['error'].message = 'Activating best chain...' ) {
				result.push('activating');
			} else if ( AjaxOutputData.errors == undefined) {
				result.push('not active');
			} else {
				result.push(AjaxOutputData.errors);
			}
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

function CheckIfWalletEncrypted() {
	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'walletlock',
				'hex': ''
			};
	
	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log('== Data OutPut ==');
			console.log(AjaxOutputData.error);
			
			if ( AjaxOutputData.errors != undefined ) {
				result.push('encrypted');
			} else {
				result.push(AjaxOutputData.error);
			}
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

function KMD_getInfo_rtrn() {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin'),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getinfo',
				'hex': ''
			};

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);

			if ( AjaxOutputData.errors != undefined ) {
				result.push(AjaxOutputData);
			} else if ( AjaxOutputData['error'].message = 'Activating best chain...' ) {
				result.push('activating');
			} else if ( AjaxOutputData.errors == undefined) {
				result.push('not active');
			} else {
				result.push(AjaxOutputData.errors);
			}
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

	return result[0];
}

function KMD_ProgressBar() {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin'),
			getinfotmp = KMD_getInfo_rtrn();

	if ( getinfotmp == 'activating') {
		$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text('Activating...');
	} else {
		var sync_percent = parseFloat(parseInt(getinfotmp.blocks, 10) * 100) / parseInt(getinfotmp.longestchain, 10);

		$('div[data-extcoin="' + extcoin + '"][id="extcoin-sync"]').width(parseFloat(sync_percent).toFixed(2) + '%');
		$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text(parseFloat(sync_percent).toFixed(2) + '%');
		$('span[data-extcoin="' + extcoin + '"][id="extcoin-synced-blocks"]').text(getinfotmp.blocks);
		$('span[data-extcoin="' + extcoin + '"][id="extcoin-longestchain"]').text(getinfotmp.longestchain);
		$('span[data-extcoin="' + extcoin + '"][id="extcoin-connections"]').text(getinfotmp.connections);
	}
}