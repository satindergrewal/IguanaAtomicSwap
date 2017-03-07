var WalletSettings = function() {
	var handleWalletExportKeys = function() {
		$('.wifkeys-form').validate({
			// errorElement: 'span', //default input error message container
			// errorClass: 'help-block', // default input error message class
			// focusInvalid: false, // do not focus the last invalid input
			rules: {
				wifkeys_passphrase: {
					required: true
				}
			},
			messages: {
				wifkeys_passphrase: {
					required: _lang[defaultLang].SETTINGS.PASSPHRASE_REQ
				}
			},
			submitHandler: function(form) {
				console.log('wait till peer ip added to selected coin...')

				var Getwifkeys_passphrase = $('#wifkeys_passphrase').val(),
						WifKeyDivContent = '';

				// First check which coins are active. Execute API for each mode of wallet
				$.each([
					'native',
					'basilisk',
					'full'], function( index, value ) {
						var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
								allcoins_ajax_data = {
									'userpass': tmpIguanaRPCAuth,
									'agent': 'InstantDEX',
									'method': 'allcoins'
								};

						$.ajax({
							type: 'POST',
							data: JSON.stringify(allcoins_ajax_data),
							url: 'http://127.0.0.1:' + config.iguanaPort,
							success: function(data, textStatus, jqXHR) {
								var AllcoinsDataOutput = JSON.parse(data);
								// Only execute further code if that mode has any coins active it. if none, skill checking on them.
								if (AllcoinsDataOutput[value].length !== 0 ) {
									console.log('== AllCoins Data OutPut ==');
									console.log(value);
									console.log(AllcoinsDataOutput[value]);

									// First Run Encryptwallet API to get wif keys for each active coin
									$.each(AllcoinsDataOutput[value], function(index) {
										console.log(AllcoinsDataOutput[value][index]);

										var wifkey_coin_handle = AllcoinsDataOutput[value][index],
												tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
												EncryptWallet_ajax_data = {
													'userpass': tmpIguanaRPCAuth,
													'agent': 'bitcoinrpc',
													'method': 'encryptwallet',
													'passphrase': Getwifkeys_passphrase
												};

										$.ajax({
											type: 'POST',
											data: JSON.stringify(EncryptWallet_ajax_data),
											url: 'http://127.0.0.1:' + config.iguanaPort,
											success: function(data, textStatus, jqXHR) {
												var EncryptWalletDataOutput = JSON.parse(data);
												console.log(EncryptWalletDataOutput[wifkey_coin_handle + 'wif']);
												WifKeyDivContent += '<table class="table">';
												WifKeyDivContent += '<tr>' +
																							'<td style="width: 5%;">' +
																								'<b>' + wifkey_coin_handle + '</b>' +
																							'</td>' +
																							'<td>' + EncryptWalletDataOutput[wifkey_coin_handle] + '</td>' +
																						'</tr>';
												WifKeyDivContent += '<tr>' +
																							'<td>' +
																								'<b>' + wifkey_coin_handle + 'Wif</b>' +
																							'</td>' +
																							'<td>' + EncryptWalletDataOutput[wifkey_coin_handle + 'wif'] + '</td>' +
																						'</tr>';
												WifKeyDivContent += '</table>';
												$('#wif-priv-keys').html(WifKeyDivContent);
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

									//Second run walletpassphrase again to make sure wallet is unlocked as before login.
									var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
											WalletPassphrase_ajax_data = {
												'userpass': tmpIguanaRPCAuth,
												'agent': 'bitcoinrpc',
												'method': 'walletpassphrase',
												'password': Getwifkeys_passphrase,
												'timeout': '2592000'
											};

									$.ajax({
										type: 'POST',
										data: JSON.stringify(WalletPassphrase_ajax_data),
										url: 'http://127.0.0.1:' + config.iguanaPort,
										success: function(data, textStatus, jqXHR) {
											var WalletPassphraseDataOutput = JSON.parse(data);
											console.log(WalletPassphraseDataOutput);
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
			}
		});

		$('.wifkeys-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('.wifkeys-form').validate().form()) {
					$('.wifkeys-form').submit(); // form validation success, call ajax form submit
				}

				return false;
			}
		});
	};

	var handleWalletImportKeys = function() {
		$('.wifkeys-import-form').validate({
			// errorElement: 'span', //default input error message container
			// errorClass: 'help-block', // default input error message class
			// focusInvalid: false, // do not focus the last invalid input
			rules: {
				import_wifkey: {
					required: true
				}
			},
			messages: {
				import_wifkey: {
					required: 'Private Key is required.'
				}
			},
			submitHandler: function(form) {
				var Getimport_wifkey = $('#import_wifkey').val();
				// console.log(Getimport_wifkey);
				EDEXimportprivkey(Getimport_wifkey).then(function(result){
					console.log(result)
					if ( result.result !== undefined && result.result == 'success' ) {
						toastr.success(_lang[defaultLang].TOASTR.PRIV_KEY_IMPORTED, _lang[defaultLang].TOASTR.SETTINGS_NOTIFICATION);
						$('#import_wifkey').val('');
					}
					if ( result.error !== undefined && result.error == 'null return from iguana_bitcoinRPC' ) {
						toastr.info(_lang[defaultLang].TOASTR.PRIV_KEY_NOT_IMPORTED, _lang[defaultLang].TOASTR.SETTINGS_NOTIFICATION);
						toastr.error(_lang[defaultLang].TOASTR.NULL_RETURN, _lang[defaultLang].TOASTR.SETTINGS_NOTIFICATION);
					}
				});
			}
		});

		$('.wifkeys-import-form input').keypress(function(e) {
			if (e.which == 13) {
				if ($('.wifkeys-import-form').validate().form()) {
					$('.wifkeys-import-form').submit(); // form validation success, call ajax form submit
				}

				return false;
			}
		});
	};

	return {
		// main function to initiate the module
		init: function() {
			handleWalletExportKeys();
			handleWalletImportKeys();
		}
	};
}();

// DOM Ready =============================================================
$(document).ready(function() {
	WalletSettings.init();
});

// Functions =============================================================
function Settings_ShowWalletInfo() {
	var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));
	console.log(JSON.parse(CheckLoginData));
	$('#winfo_pubkey_value').text(JSON.parse(CheckLoginData).pubkey);
	$('#winfo_btcpubkey_value').text(JSON.parse(CheckLoginData).btcpubkey);
	$('#winfo_rmd160_value').text(JSON.parse(CheckLoginData).rmd160);
	$('#winfo_NXT_value').text(JSON.parse(CheckLoginData).NXT);
	$('#winfo_notary_value').text(JSON.parse(CheckLoginData).notary);
	$('#winfo_status_value').text(JSON.parse(CheckLoginData).status);
}

function Settings_ShowCoinPeers() {
	console.log('waiting getpeers api to complete...');
	$('#coin_supernetpeers_h').text('');
	$('#coin_supernetpeers').text('');
	$('#coin_rawpeers_h').text('');
	$('#coin_rawpeers').text('');
	var settings_selected_coinname_code_val = $('option:selected', '#settings_select_coin_options').val(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'SuperNET',
				'method': 'getpeers',
				'activecoin': settings_selected_coinname_code_val
			};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var getCoinPeers = JSON.parse(data);
			console.log(getCoinPeers);

			if (getCoinPeers.supernet[0].peers !== undefined ) {
				var supernet_peers_list = getCoinPeers.supernet[0].peers;
				if (supernet_peers_list != 0 ) {
					$('#coin_supernetpeers_h').text(getCoinPeers.supernet[0].coin);
					$.each(supernet_peers_list, function( index, value ) {
						var br_val = '';

						if ( index != 0 ) {
							br_val = '<br>';
						}

						$('#coin_supernetpeers').append(br_val + value);
					});
				}
			}

			if (getCoinPeers.rawpeers[0].peers !== undefined ) {
				var raw_peers_list = getCoinPeers.rawpeers[0].peers;
				if (raw_peers_list != 0 ) {
					$('#coin_rawpeers_h').text(getCoinPeers.supernet[0].coin);
					$.each(raw_peers_list, function( index, value ) {
						var br_val = '';

						if ( index != 0 ) {
							br_val = '<br>';
						}

						$('#coin_rawpeers').append(br_val + value);
					});
				}
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

function Settings_AddCoinPeers() {
	console.log('wait till peer ip added to selected coin...')
	var settings_selected_coinname_code_val = $('option:selected', '#settings_select_coin_addpeer_options').val(),
			settings_add_peer_ip_val = $('#settings_add_peer_ip').val(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'iguana',
				'method': 'addnode',
				'activecoin': settings_selected_coinname_code_val,
				'ipaddr': settings_add_peer_ip_val
			};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var getAddCoinPeers = JSON.parse(data);
			console.log(getAddCoinPeers);
			if ( getAddCoinPeers.result == 'addnode submitted' ) {
				toastr.success(settings_add_peer_ip_val + ' ' + _lang[defaultLang].TOASTR.ADDED_TO + ' ' + settings_selected_coinname_code_val + ' ' + _lang[defaultLang].TOASTR.SUCCESSFULLY, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
				$('#settings_add_peer_ip').val('');
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

function Settings_LoadDebugLog() {
	var settings_selected_targed_val = $('option:selected', '#settings_select_debuglog_options').val(),
			numLinesToRead = $('#read_debug_log_lines').val(),
			ajax_data = {
				'herdname': settings_selected_targed_val,
				'lastLines': numLinesToRead
			};

	$.ajax({
		type: 'POST',
		data: ajax_data,
		url: 'http://127.0.0.1:17777/shepherd/debuglog',
		success: function(data, textStatus, jqXHR) {
			$('#read_debug_log_textarea').text(JSON.parse(data).result.replace('\n', '\r\n'));
			console.log(data);
		},
		error: function(xhr, textStatus, error) {
			console.log('failed getting debug.log');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
			$('#read_debug_log_textarea').text(error);
		}
	});
}