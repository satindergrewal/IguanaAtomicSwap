var KMDWalletDashboard = function() {
	var handle_KMD_Dashboard = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();
		$('#btn_' + action_btn_code + '_wallet_dashboard').click(function() {
			if ( sessionStorage.getItem('edexTmpMode') === 'Native') {
				sessionStorage.setItem('edexTmpRefresh', 'start');
			}
			if ( sessionStorage.getItem('edexTmpMode') === 'Basilisk' || sessionStorage.getItem('edexTmpMode') === 'Full' ) {
				sessionStorage.setItem('edexTmpRefresh', 'stop');
			}
			$(
				'#kmd_wallet_dashoard_section,' +
				'#kmd_wallet_dashboardinfo'
			)
			.show();
			$(
				'#kmd_wallet_send,' +
				'#kmd_wallet_recieve_section,' +
				'#kmd_wallet_settings'
			)
			.hide();
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

			$('#kmd_wallet_send').show();
			$(
				'#kmd_wallet_dashboardinfo,' +
				'#kmd_wallet_recieve_section,' +
				'#kmd_wallet_settings'
			)
			.hide();

			var kmd_addr_list_with_balance = KMDlistunspentT();

			tmpoptions += '<option> - ' + _lang[defaultLang].KMD_NATIVE.SELECT_ADDRESS + ' - </option>';
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
			var selected = $(this).find('option:selected').val();
		});

		$('#kmd_wallet_amount').keyup(function() {
			var sum_val1 = parseFloat($('#kmd_wallet_amount').val()),
					sum_val2 = parseFloat($('#kmd_wallet_fee').val()),
					total_minus_currency_fee = sum_val1 - sum_val2,
					mdl_send_btn = $('#kmd_wallet_send_coins_btn');

			$('#kmd_wallet_total_value').text(total_minus_currency_fee.toFixed(8));

			if ($('#kmd_wallet_send_from').val() != '- ' + _lang[defaultLang].KMD_NATIVE.SELECT_ADDRESS_ALT + ' -' &&
					$('#kmd_wallet_amount').val() != '' &&
					$('#kmd_wallet_sendto') != '' &&
					$('#kmd_wallet_fee') != '' ) {
				mdl_send_btn.removeClass('disabled');
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

			if ($('#kmd_wallet_send_from').val() != '- ' + _lang[defaultLang].KMD_NATIVE.SELECT_ADDRESS_ALT + ' -' &&
					$('#kmd_wallet_amount').val() != '' &&
					$('#kmd_wallet_sendto') != '' &&
					$('#kmd_wallet_fee') != '' ) {
				mdl_send_btn.removeClass('disabled');
			} else {
				mdl_send_btn.addClass('disabled');
				mdl_send_btn.removeAttr('data-dismiss');
				mdl_send_btn.removeAttr('data-target');
			}
		});

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
					required: _lang[defaultLang].DASHBOARD.SEND_FROMADDR_REQ
				},
				kmd_wallet_sendto: {
					required: _lang[defaultLang].DASHBOARD.SEND_TOADDR_REQ
				},
				kmd_wallet_amount: {
					required: _lang[defaultLang].DASHBOARD.SEND_AMOUNT_REQ
				},
				kmd_wallet_fee: {
					required: _lang[defaultLang].DASHBOARD.SEND_FEE_REQ + ' 0.0001 KMD.'
				},
				kmd_wallet_total_value: {
					required: _lang[defaultLang].DASHBOARD.SEND_TOTAL_REQ
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
			$(
				'#kmd_wallet_dashboardinfo,' +
				'#kmd_wallet_dashoard_section,' +
				'#kmd_wallet_send,' +
				'#kmd_wallet_recieve_section'
			)
			.hide();
			$('#kmd_wallet_settings').show();
			getKMDInfo();
			getKMDWalletInfo();
			clearSendManyFieldData();
		});
	};

	var KMDWalletRecieve = function() {
		var action_btn_code = getHeaderActionMenuButtonCoinCode();

		$('#btn_' + action_btn_code + '_wallet_recieve').click(function() {
			sessionStorage.setItem('edexTmpRefresh', 'stop');
			$(
				'#kmd_wallet_dashboardinfo,' +
				'#kmd_wallet_dashoard_section,' +
				'#kmd_wallet_send,' +
				'#kmd_wallet_settings'
			)
			.hide();
			$('#kmd_wallet_recieve_section').show();
			KMDListAllAddr();
			clearSendManyFieldData();
		});

		$('#kmd_get_new_taddr').click(function() {
			console.log('get new T address button clicked...');
			KMDGetNewAddresses('public');
			KMDListAllAddr();
			toastr.info(_lang[defaultLang].TOASTR.RECADDR_UPDATED, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
		});

		$('#kmd_get_new_zaddr').click(function() {
			console.log('get new Z address button clicked...');
			KMDGetNewAddresses('private');
			KMDListAllAddr();
			toastr.info(_lang[defaultLang].TOASTR.RECADDR_UPDATED, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
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
			handle_KMD_Send();
			KMDWalletRecieve();
			KMDWalletSettings();
			handleWalletDashboardAlet();
		}
	};
}();