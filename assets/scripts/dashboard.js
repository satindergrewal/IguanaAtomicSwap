var RunTotalFiatValue = '',
		ExecuteShowCoinHistory = '',
		active_edexcoin = '',
		tmp_send_to_addr = '',
		tmp_send_total_amount = '',
		edexcoin_send_form_validator = '';

var Dashboard = function() {
	toastr.options = {
		'closeButton': true,
		'debug': false,
		'positionClass': 'toast-bottom-right',
		'showDuration': '15000',
		'hideDuration': '1000',
		'timeOut': '15000',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	}

	var handle_edex_wallet = function() {
		$('#btn_edexcoin_wallet_dashboard').click(function() {
			console.log('edex wallet dashbaord button clicked...');
			console.log($(this).data());
		});
	}

	var handle_edex_dashboard = function() {
		$('.btn_refresh_edexcoin_dashboard').click(function() {
			$( '#btn_edexcoin_dashboard' ).trigger( 'click' );
		});

		$('#btn_edexcoin_dashboard').click(function() {
			$('#btn_edexcoin_dashboard').hide();
			$('#btn_edexcoin_send').show();
			$('#btn_edexcoin_recieve').show();

			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');

			$('#edexcoin_getbalance_interest').hide();
			$('#edexcoin_getbalance_total_interest').hide();
			$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
			$('#edex_interest_balance').text('-');
			$('#edex_total_balance_interest').text('-');
			$('#edex_total_balance').text('-');
			$('#edex_total_balance_coincode').text(active_edexcoin);

			if ( sessionStorage.getItem('edexTmpMode') === 'Full') {
				sessionStorage.setItem('edexTmpRefresh', 'start');
			}
			if ( /*sessionStorage.getItem('edexTmpMode') === 'Basilisk' ||*/ sessionStorage.getItem('edexTmpMode') === 'Native' ) {
				sessionStorage.setItem('edexTmpRefresh', 'stop');
			}
			$('#edexcoin_dashoard_section').show();
			$('#edexcoin_dashboardinfo').show();
			$('#edexcoin_send').hide();
			$('#edexcoin_recieve').hide();
			$('#edexcoin_recieve_section').hide();
			$('#edexcoin_settings').hide();

			var selected_coinmode = sessionStorage.getItem('edexTmpMode');
			if ( selected_coinmode == 'Basilisk' ) {
				getDEXGetBalance_cache(active_edexcoin).then(function(result) {
					//console.log(result)
					if ( result.interest !== undefined && active_edexcoin == 'KMD') {
						$('#edexcoin_getbalance_interest').show();
						$('#edexcoin_getbalance_total_interest').show();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(active_edexcoin);
						$('#edex_total_balance_interest_coincode').text(active_edexcoin);
					}

					if ( result.interest === undefined ) {
						$('#edexcoin_getbalance_interest').hide();
						$('#edexcoin_getbalance_total_interest').hide();
						$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
						$('#edex_interest_balance').text('-');
						$('#edex_total_balance_interest').text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(active_edexcoin);
				});
			} else {
				EDEXlistunspent(active_edexcoin).then(function(result) {
					//console.log(result)
					if (result[0] != undefined) {
						//console.log(result[0])
						if ( result[0].interest !== undefined ) {
							$('#edexcoin_getbalance_interest').show();
							$('#edexcoin_getbalance_total_interest').show();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
							$('#edex_interest_balance').text(result[0].interest);
							$('#edex_total_balance_interest').text(result[0].totalbalance);
							$('#edex_total_interest_coincode').text(active_edexcoin);
							$('#edex_total_balance_interest_coincode').text(active_edexcoin);
						}

						if ( result[0].interest === undefined ) {
							$('#edexcoin_getbalance_interest').hide();
							$('#edexcoin_getbalance_total_interest').hide();
							$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
							$('#edex_interest_balance').text('-');
							$('#edex_total_balance_interest').text('-');
						}

						$('#edex_total_balance').text(result[0].total);
						$('#edex_total_balance_coincode').text(active_edexcoin);
					} else {
						$('#edex_total_balance').text('0');
					}
				});
			}

			EdexfillTxHistory(active_edexcoin);
			$('.edexcoin-send-form')[0].reset();
		});
	}

	var handle_edex_send = function() {
		$('#btn_edexcoin_send').click(function() {
			$('#btn_edexcoin_dashboard').show();
			$('#btn_edexcoin_send').hide();
			$('#btn_edexcoin_recieve').show();
			$('#edexcoin_dashboardinfo').hide();
			$('#edexcoin_send').show();
			$('#edexcoin_recieve').hide();
			$('#edexcoin_recieve_section').hide();
			$('#edexcoin_settings').hide();
			sessionStorage.setItem('edexTmpRefresh', 'stop');

			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
			var selected_coinmode = sessionStorage.getItem('edexTmpMode')

			// This send from part is only enabled now for Basilisk coins except BTC and SYS.
			if (selected_coinmode == 'Basilisk' && active_edexcoin !== 'BTC' && active_edexcoin !== 'SYS' ) {
				$('.edexcoin_send_from_for_basilisk').show()
				EDEXgetaddrbyaccount_cache(active_edexcoin).then(function(result){
					//console.log(result)
					edexcoin_addr_list_with_balance = result
					console.log(edexcoin_addr_list_with_balance);
					var tmpoptions = '';
					tmpoptions += '<option> - Select Address - </option>';
					$.each(edexcoin_addr_list_with_balance, function(index) {
						tmpoptions += '<option value="' + edexcoin_addr_list_with_balance[index].addr + '" data-total="' + edexcoin_addr_list_with_balance[index].total + '">[ ' + edexcoin_addr_list_with_balance[index].total + ' KMD ] &emsp;' + edexcoin_addr_list_with_balance[index].addr + '</option>';
						$('#edexcoin_send_from').html(tmpoptions);
					});

					$('.showedexcoinaddrs').selectpicker({ style: 'btn-info' });
					$('.showedexcoinaddrs').selectpicker('refresh');
					
					$('.edexcoin_send_coins_btn_step1').addClass('disabled');
					$('.edexcoin_send_coins_btn_step1').attr('disabled','disabled');
				})
			} else {
				$('.edexcoin_send_from_for_basilisk').hide()
				$('.edexcoin_send_coins_btn_step1').removeClass('disabled');
				$('.edexcoin_send_coins_btn_step1').removeAttr('disabled');
			}

			//clearEdexSendFieldData();
			$('.edexcoin-send-form')[0].reset();
			if ( selected_coinmode == 'Full' ) {
				EDEXgetinfo(active_edexcoin).then(function(result) {
					$('#edexcoin_fee').val(result.kbfee);
				});
			}
		});

		$('.showedexcoinaddrs').on('change', function() {
			var selected = $(this).find('option:selected').val();
			//console.log(selected)
		});

		$('#edexcoin_send_from').change(function() {
			if ($('#edexcoin_send_from').val() !== '' || $('#edexcoin_send_from').val() !== '- Select Address -') {
				$('.edexcoin_send_coins_btn_step1').removeClass('disabled');
				$('.edexcoin_send_coins_btn_step1').prop('disabled', false);
				
				Shepherd_GetBasiliskCache().then(function(result){
					var _data = JSON.parse(result)
						query = _data.result.basilisk
						active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
						coin_addr = $('#edexcoin_send_from').val()

					if (!('refresh' in query[active_edexcoin][coin_addr])) {
						console.log(active_edexcoin + '>>>' + coin_addr + ' => refresh not found.')

						var call_data = {"allcoins": false,"coin":active_edexcoin,"calls":"refresh"}
						Shepherd_FetchBasiliskData(call_data).then(function(result){
							console.log(result)
						})
					} else {
						console.log(query[active_edexcoin][coin_addr].refresh.status)
					}
				})
			}
			if ($('#edexcoin_send_from').val() === '' || $('#edexcoin_send_from').val() === '- Select Address -') {
				$('.edexcoin_send_coins_btn_step1').addClass(' disabled');
				$('.edexcoin_send_coins_btn_step1').prop('disabled', true);
			}
		})

		$('#edexcoin_amount').keyup(function() {
			var sum_val1 = parseFloat($('#edexcoin_amount').val()),
					sum_val2 = parseFloat($('#edexcoin_fee').val()),
					total_minus_currency_fee = sum_val1 - sum_val2,
					mdl_send_btn = $('#edexcoin_send_coins_btn');

			$('#edexcoin_total_value').text(total_minus_currency_fee.toFixed(8));
		});

		$('#edexcoin_fee').keyup(function() {
			var sum_val1 = parseFloat($('#edexcoin_amount').val()),
					sum_val2 = parseFloat($('#edexcoin_fee').val()),
					total_minus_currency_fee = sum_val1 - sum_val2,
					mdl_send_btn = $('#edexcoin_send_coins_btn');

			//console.log($('#edexcoin_amount').val());
			$('#edexcoin_total_value').text(total_minus_currency_fee.toFixed(8));

			
		});

		edexcoin_send_form_validator = $('.edexcoin-send-form').validate({
			// errorElement: 'span', //default input error message container
			// errorClass: 'help-block', // default input error message class
			// focusInvalid: false, // do not focus the last invalid input
			rules: {
				edexcoin_send_from: {
					required: true
				},
				edexcoin_sendto: {
					required: true
				},
				edexcoin_amount: {
					required: true
				},
				edexcoin_fee: {
					required: true
				},
				edexcoin_total_value: {
					required: true
				}
			},

			messages: {
				edexcoin_send_from: {
					required: 'From Address is required.'
				},
				edexcoin_sendto: {
					required: 'To Address is required.'
				},
				edexcoin_amount: {
					required: 'Please enter amount to send.'
				},
				edexcoin_fee: {
					required: 'Make sure you have fee entered. Default value is 0.0001.'
				},
				edexcoin_total_value: {
					required: 'Make sure you have both amount and fee entered to calculate final total.'
				}
			},

			submitHandler: function(form) {
				NProgress.done(true);
				NProgress.configure({
						template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
											'<div class="spinner" role="spinner">' +
												'<div class="spinner-icon"></div>' +
											'</div>'
				});
				NProgress.start();
				
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
				var selected_coinmode = sessionStorage.getItem('edexTmpMode')

				console.log('Sent control here after clicked in form...');
				
				if (selected_coinmode == 'Basilisk' && active_edexcoin !== 'BTC' && active_edexcoin !== 'SYS' ) {
					$('#mdl_confirm_currency_sendfrom_addr').text($('#edexcoin_send_from').val());
				} else {
					EDEXMainAddr($('[data-edexcoin]').attr('data-edexcoin')).then(function(result) {
						$('#mdl_confirm_currency_sendfrom_addr').text(result);
					});
				}
				
				$('#mdl_confirm_currency_sendto_addr').text($('#edexcoin_sendto').val());
				$('#mdl_confirm_currency_send_amount').text($('#edexcoin_amount').val());
				$('#mdl_confirm_currency_coinname').text($('[data-edexcoin]').attr('data-edexcoin'));
				$('#mdl_confirm_currency_send_fee').text($('#edexcoin_fee').val());
				$('#mdl_confirm_currency_coinname_fee').text($('[data-edexcoin]').attr('data-edexcoin'));
				$('#mdl_confirm_currency_sendfrom_total_dedcut').text($('#edexcoin_total_value').text());
				$('#mdl_confirm_currency_coinname_total').text($('[data-edexcoin]').attr('data-edexcoin'));

				console.log('==> Before confirming tx to send');
				console.log($('[data-edexcoin]').attr('data-edexcoin'));
				console.log($('#edexcoin_sendto').val());
				console.log($('#mdl_confirm_currency_sendfrom_addr').text());
				console.log($('#edexcoin_total_value').text());

				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin'),
						tmp_send_from_addr = $('#edexcoin_send_from').val()
						tmp_send_to_addr = $('#edexcoin_sendto').val(),
						tmp_send_total_amount = $('#edexcoin_total_value').text();
				$('#edexcoin-send-screen').hide();
				$('#edexcoin-send-confirm-screen').show();
				$('#edexcoin_send_step_1').removeClass( 'current' ).addClass( '' );
				$('#edexcoin_send_step_2').removeClass( '' ).addClass( 'current' );
				$('#edexcoin_send_step_3').removeClass( 'current' ).addClass( '' );

				NProgress.done();
			}
		});

		$('#edexcoin_send_coins_btn').click(function() {
			//$('#edexcoin_send_coins_btn').prop('disabled', true);
			console.log('==> After confirming tx to send')
			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin'),
					tmp_send_from_addr = $('#edexcoin_send_from').val()
					tmp_send_to_addr = $('#edexcoin_sendto').val(),
					tmp_send_total_amount = $('#edexcoin_total_value').text();
					tmp_send_fee = $('#edexcoin_fee').val()
					tmp_sendflag = $('#edexcoin_send_sig').is(":checked")
			console.log(active_edexcoin);
			console.log(tmp_send_from_addr);
			console.log(tmp_send_to_addr);
			console.log(tmp_send_total_amount);
			console.log(tmp_send_fee);
			console.log(tmp_sendflag);

			var edexcoin_sendto_result_tbl = '';
			edexcoin_sendto_result_tbl += '<tr class="info">' +
																			'<td>Info</td>' +
																			'<td>The transaction submitted is processing. Once processed the transaction details will be displayed here.</td>' +
																		'</tr>';
			$('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
			$('#edexcoin_send_coins_anothertx_btn').hide();

			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
			var selected_coinmode = sessionStorage.getItem('edexTmpMode')

			if (selected_coinmode == 'Basilisk' && active_edexcoin !== 'BTC' && active_edexcoin !== 'SYS' ) {
				var tmp_json_data = {
					'coin': active_edexcoin,
					'sendfrom': tmp_send_from_addr,
					'sendtoaddr': tmp_send_to_addr,
					'amount': tmp_send_total_amount,
					'txfee': tmp_send_fee,
					'sendsig': tmp_sendflag
				};
				console.log(tmp_json_data);
				EDEXSendutxoRawTx(tmp_json_data)
			} else {
				var tmp_json_data = {
					'coin': active_edexcoin,
					'sendtoaddr': tmp_send_to_addr,
					'amount': tmp_send_total_amount
				};
				console.log(tmp_json_data);
				EDEXSendToAddr(tmp_json_data);
			}
			$('.edexcoin-send-form')[0].reset();
			$('#edexcoin_total_value').text('0.000');
			$('#edexcoin-send-confirm-screen').hide();
			$('#edexcoin-send-txdetails-screen').show();
			$('#edexcoin-send-txdetails-screen').data('panel-api').load();
			edexcoin_send_form_validator.resetForm();
			$('#edexcoin_send_step_1').removeClass( 'current' ).addClass( '' );
			$('#edexcoin_send_step_2').removeClass( 'current' ).addClass( '' );
			$('#edexcoin_send_step_3').removeClass( '' ).addClass( 'current' );
		});

		$('#edexcoin_send_coins_back_btn').click(function() {
			$('#edexcoin-send-confirm-screen').hide();
			$('#edexcoin-send-txdetails-screen').hide();
			$('#edexcoin-send-screen').show();
			var active_edexcoin = '',
					tmp_send_to_addr = '',
					tmp_send_total_amount = '';
			edexcoin_send_form_validator.resetForm();
			$('#edexcoin_send_step_1').removeClass( '' ).addClass( 'current' );
			$('#edexcoin_send_step_2').removeClass( 'current' ).addClass( '' );
			$('#edexcoin_send_step_3').removeClass( 'current' ).addClass( '' );
		});

		$('#edexcoin_send_coins_anothertx_btn').click(function() {
			$( '#edexcoin_send_coins_back_btn' ).trigger( 'click' );
			var active_edexcoin = '',
					tmp_send_to_addr = '',
					tmp_send_total_amount = '';
			$('#edexcoin_send_coins_btn').prop('disabled', false);
			edexcoin_send_form_validator.resetForm();
		});

		$('.edexcoin_sendto_result').on('click', '.edexcoin_sendto_output_result', function(e) {
			var selected_coin = $(this).data('edexcoin'),
					selected_coin_mode = sessionStorage.getItem('edexTmpMode');
			$( '#nav-iguana-atomic-explorer' ).trigger( 'click' );
			$('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected', 'selected');
			if ( selected_coin_mode == 'Full') {
				$('#atomic_explorer_select_command_options option[value=gettransaction]').attr('selected', 'selected');
			}
			if ( selected_coin_mode == 'Basilisk') {
				$('#atomic_explorer_select_command_options option[value=dex_gettransaction]').attr('selected', 'selected');
			}
			$('#atomic_explorer_input_data').val($(this).data('sendtotxresult'));
			$( '#atomic_explorer_getcoinpeers_btn' ).trigger( 'click' );
		});
	}

	var handle_edex_recieve = function() {
		$('#btn_edexcoin_recieve').click(function() {
			$('#btn_edexcoin_dashboard').show();
			$('#btn_edexcoin_send').show();
			$('#btn_edexcoin_recieve').hide();
			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
			sessionStorage.setItem('edexTmpRefresh', 'stop');
			$('#edexcoin_dashboardinfo').hide();
			$('#edexcoin_dashoard_section').hide();
			$('#edexcoin_send').hide();
			$('#edexcoin_recieve').show();
			$('#edexcoin_recieve_section').show();
			$('#edexcoin_settings').hide();
			EdexListAllAddr(active_edexcoin);
			$('.edexcoin-send-form')[0].reset();
		});

		$('#edexcoin_get_new_addr').click(function() {
			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
			console.log('get new T address button clicked...');
			EdexListAllAddr(active_edexcoin);
			toastr.info('Receiving Address list updated', 'Wallet Notification');
		});
	};

	var handleWalletWidgets = function() {
		var walletDivContent = '',
				AddColumnDiv = 0;

		$.each([
			'native',
			'basilisk',
			'full'
			], function( index, value ) {
				var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
						ajax_data = {
							'userpass': tmpIguanaRPCAuth,
							'agent': 'InstantDEX',
							'method': 'allcoins'
						};

				$.ajax({
					type: 'POST',
					data: JSON.stringify(ajax_data),
					url: 'http://127.0.0.1:7778',
					success: function(data, textStatus, jqXHR) {
						var AllcoinsDataOutput = JSON.parse(data);
						$.each(AllcoinsDataOutput[value], function(index) {
							var coinlogo = '',
									coinname = '',
									modecode = '',
									modetip = '',
									modecolor = '';

              switch (value) {
                case 'native':
                  modecode = 'Native';
                  modetip = 'Native';
                  modecolor = 'primary';
                  break;
                case 'basilisk':
                  modecode = 'Basilisk';
                  modetip = 'Basilisk';
                  modecolor = 'info';
                  break;
                case 'full':
                  modecode = 'Full';
                  modetip = 'Full';
                  modecolor = 'success';
                  break;
                case 'virtual':
                  modecode = 'Virtual';
                  modetip = 'Virtual';
                  modecolor = 'danger';
                  break;
                case 'notarychains':
                  modecode = 'Notarychains';
                  modetip = 'Notarychains';
                  modecolor = 'dark';
                  break;
              }

              switch (AllcoinsDataOutput[value][index]) {
                case 'BTC':
                  coinlogo = 'bitcoin';
                  coinname = 'Bitcoin';
                  break;
                case 'BTCD':
                  coinlogo = 'bitcoindark';
                  coinname = 'BitcoinDark';
                  break;
                case 'LTC':
                  coinlogo = 'litecoin';
                  coinname = 'Litecoin';
                  break;
                case 'VPN':
                  coinlogo = 'vpncoin';
                  coinname = 'VPNcoin';
                  break;
                case 'SYS':
                  coinlogo = 'syscoin';
                  coinname = 'Syscoin';
                  break;
                case 'ZEC':
                  coinlogo = 'zcash';
                  coinname = 'Zcash';
                  break;
                case 'NMC':
                  coinlogo = 'namecoin';
                  coinname = 'Namecoin';
                  break;
                case 'DEX':
                  coinlogo = 'dex';
                  coinname = 'DEX';
                  break;
                case 'DOGE':
                  coinlogo = 'dogecoin';
                  coinname = 'Dogecoin';
                  break;
                case 'DGB':
                  coinlogo = 'digibyte';
                  coinname = 'Digibyte';
                  break;
                case 'MZC':
                  coinlogo = 'mazacoin';
                  coinname = 'Mazacoin';
                  break;
                case 'UNO':
                  coinlogo = 'unobtanium';
                  coinname = 'Unobtanium';
                  break;
                case 'ZET':
                  coinlogo = 'zetacoin';
                  coinname = 'Zetacoin';
                  break;
                case 'KMD':
                  coinlogo = 'komodo';
                  coinname = 'Komodo';
                  break;
                case 'BTM':
                  coinlogo = 'bitmark';
                  coinname = 'Bitmark';
                  break;
                case 'CARB':
                  coinlogo = 'carboncoin';
                  coinname = 'Carboncoin';
                  break;
                case 'ANC':
                  coinlogo = 'anoncoin';
                  coinname = 'AnonCoin';
                  break;
                case 'FRK':
                  coinlogo = 'franko';
                  coinname = 'Franko';
                  break;
                case 'SUPERNET':
                  coinlogo = 'SUPERNET';
                  coinname = 'SUPERNET';
                  break;
                case 'REVS':
                  coinlogo = 'REVS';
                  coinname = 'REVS';
                  break;
                case 'WIRELESS':
                  coinlogo = 'WIRELESS';
                  coinname = 'WIRELESS';
                  break;
                case 'USD':
                  coinlogo = 'USD';
                  coinname = 'USD';
                  break;
              }

							walletDivContent += '<!-- Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';
							walletDivContent += '<div class="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '">';
								walletDivContent += '<div class="widget widget-shadow">';
									walletDivContent += '<div class="widget-content text-center bg-white padding-20 edexcoin-logo" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-edexcoinmodecode="' + modecode + '" data-edexcoinname="' + coinname + '">';
										walletDivContent += '<a class="avatar margin-bottom-5" href="javascript:void(0)" id="edexcoin-logo">';
											walletDivContent += '<img class="img-responsive" src="assets/images/cryptologo/' + coinlogo + '.png" alt="' + coinname + '"/>';
											walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
										walletDivContent += '</a>';
										walletDivContent += '<div class="coin-name">' + coinname + '</div>';
									walletDivContent += '</div>';
								walletDivContent += '</div>';
							walletDivContent += '</div>';
							walletDivContent += '<!-- End Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';

							$('.wallet-widgets-row').html(walletDivContent);
							$('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
							$('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
							edexCoinBtnAction();
						});
					},
					error: function(xhr, textStatus, error) {
						console.log('failed starting BitcoinDark.');
						console.log(xhr.statusText);
						if ( xhr.readyState == 0 ) {
							Iguana_ServiceUnavailable();
						}
						console.log(textStatus);
						console.log(error);
						if (xhr.readyState == '0' ) {
							toastr.error('Unable to connect to Iguana', 'Account Notification');
						}
					}
				});
		});
	}

	var handleWalletWidgetBtns = function() {
		$('#addcoin_mdl_native_mode').prop('disabled', true);
		$('#addcoin_mdl_basilisk_mode').prop('disabled', true);
		$('#addcoin_mdl_full_mode').prop('disabled', true);
		$('#addcoin_mdl_full_mode').prop('checked', false);

		$('.mdl_addcoin_done_btn').click(function(){
			ExecuteAddCoinFn();
		});

		$( '#addcoin_select_coin_mdl_options' ).change(function() {
			var tmp_coin_val = $('#addcoin_select_coin_mdl_options').val();

			if (tmp_coin_val !== 'KMD' || tmp_coin_val !== 'KMD' ) {
				$('#addcoin_mdl_native_mode').prop('disabled', true);
				$('#addcoin_mdl_basilisk_mode').prop('disabled', true);
				$('#addcoin_mdl_full_mode').prop('disabled', false);
				$('#addcoin_mdl_full_mode').prop('checked', true);
			}
			if (tmp_coin_val == 'KMD') {
				$('#addcoin_mdl_native_mode').prop('disabled', false);
				$('#addcoin_mdl_basilisk_mode').prop('disabled', false);
				$('#addcoin_mdl_full_mode').prop('disabled', false);
				$('#addcoin_mdl_basilisk_mode').prop('checked', true);
			}
			if (tmp_coin_val == 'SUPERNET' ||
					tmp_coin_val == 'REVS' ||
					tmp_coin_val == 'WIRELESS' ||
					tmp_coin_val == 'USD') {
					$('#addcoin_mdl_native_mode').prop('disabled', true);
					$('#addcoin_mdl_basilisk_mode').prop('disabled', false);
					$('#addcoin_mdl_full_mode').prop('disabled', true);
					$('#addcoin_mdl_basilisk_mode').prop('checked', true);
			}
			if (tmp_coin_val == 'BTC') {
				$('#addcoin_mdl_basilisk_mode').prop('disabled', false);
				$('#addcoin_mdl_native_mode').prop('disabled', true);
				$('#addcoin_mdl_full_mode').prop('disabled', false);
				$('#addcoin_mdl_basilisk_mode').prop('checked', true);
			}
		});
	}

	var handleBasiliskWalletActions = function() {
		$('.btn_edexcoin_dashboard_getnotaries').click(function() {
			var selected_coin = $(this).data('edexcoin');
			$( '#nav-iguana-atomic-explorer' ).trigger( 'click' );
			$('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected', 'selected');
			$('#atomic_explorer_select_command_options option[value=dex_getnotaries]').attr('selected', 'selected');
			$( '#atomic_explorer_getcoinpeers_btn' ).trigger( 'click' );
		});

		$('.btn_edexcoin_dashboard_register').click(function() {
			var selected_coin = $(this).data('edexcoin');
			EDEXMainAddr(selected_coin).then(function(result){
				Iguana_DEXImportAllWalletAddr(selected_coin);
			});
		});

		$('.btn_edexcoin_dashboard_fetchdata').click(function() {
			var selected_coin = $(this).data('edexcoin');
			Shepherd_CheckBasiliskCacheData(selected_coin).then(function(result){
				console.log(result)
				console.log(result.coin)
				var call_data = {"allcoins": false,"coin":selected_coin,"calls":"listtransactions:getbalance"}
				console.log(call_data)

				Shepherd_FetchBasiliskData(call_data).then(function(result){
					console.log(result)
					toastr.info('Fetching Data. Please wait for a minute to complete this task.', 'Basilisk Notification');
				})
			})
		});

		$('.btn_edexcoin_dashboard_refresh_basilisk_conn').click(function() {
			var show_mdl = setTimeout(function() {
											var selected_coin = $(this).data('edexcoin');
											$('#RefreshBasiliskConnectionsMdl').modal('show');
										 }, 0)
			var start_refresh = setTimeout(function() {
														EDEX_DEXgetinfoAll();
													}, 3000)

			Promise.all([show_mdl, start_refresh]).then(function() {
				console.log('all promises executed!!!');
			});
		});

		$('.btn_edexcoin_dashboard_validate').click(function() {
			var selected_coin = $(this).data('edexcoin');
			EDEXMainAddr(selected_coin).then(function(result) {
				Iguana_DEXValidateAddr(selected_coin, result);
			});
		});
	}

	var handleWalletToAtomicExplorer = function() {
		$('#edex-tx-history-tbl').on('click', '.kmd-txid-details-btn', function(e) {
			var selected_coin = $(this).data('edexcoin'),
					selected_coin_mode = sessionStorage.getItem('edexTmpMode'),
					selected_txid = $(this).data('txid');

			$( '#nav-iguana-atomic-explorer' ).trigger( 'click' );
			$('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected', 'selected');
			if ( selected_coin_mode == 'Full') {
				$('#atomic_explorer_select_command_options option[value=gettransaction]').attr('selected', 'selected');
			}
			if ( selected_coin_mode == 'Basilisk') {
				$('#atomic_explorer_select_command_options option[value=dex_gettransaction]').attr('selected', 'selected');
			}
			$('#atomic_explorer_input_data').val(selected_txid);
			$( '#atomic_explorer_getcoinpeers_btn' ).trigger( 'click' );
		})
	}

	var handleEdexWalletInfo = function() {
		// Get coin history and pupulate balance and other info to wallet widget
		var ExecuteShowCoinHistory = setInterval(function() {
			if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
					 sessionStorage.getItem('DashboardActions') === null ||
					 sessionStorage.getItem('DashboardActions') === 'stop' ) {
				clearInterval(ExecuteShowCoinHistory);
				console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
			} else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === 'start') {
				var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin'),
						active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

				// TODO: refactor
				
				if ( active_edexcoinmodecode == 'Basilisk' || active_edexcoinmodecode == 'Native' ) {
					//console.log(active_edexcoinmodecode)
					//console.log('No need to show Progress bar for Native or Basilisk mode.')
				} else {
					ShowCoinProgressBar(active_edexcoin);
				}
			}
		}, 1000);

		var CheckIfIguanaRunning = setInterval(function() {
			// TODO: refactor
			var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin'),
						active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');
			if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
				//clearInterval(CheckIfIguanaRunning);
				//console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
			} else {
				Iguana_activehandle().then(function(result){
					//console.log(result)
					//console.log("Iguana is running");
				});
			}
		}, 1000);


		var FetchBasiliskData = setInterval(function() {
			// TODO: refactor
			if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
				//clearInterval(FetchBasiliskData);
				//console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
			} else {
				if ( active_edexcoinmodecode == 'Basilisk') {
					var call_data = {"allcoins": false,"coin":active_edexcoin,"calls":"listtransactions:getbalance"}
					if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === 'start') {
						Shepherd_FetchBasiliskData(call_data).then(function(result){
							console.log(result)
						})
					}
				}
			}
		}, 300000);

		var RefreshEdexWalletDashboard = setInterval(function() {
			if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
					 sessionStorage.getItem('DashboardActions') === null ||
					 sessionStorage.getItem('DashboardActions') === 'stop' ) {
				clearInterval(RefreshEdexWalletDashboard);
			} else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === 'start') {
				if ( $('[data-edexcoin]').attr('data-edexcoin') !== 'COIN' ) {
					if ( sessionStorage.getItem('edexTmpMode') !== null || sessionStorage.getItem('edexTmpMode') === 'Full') {
						if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === 'start') {
							$( '#btn_edexcoin_dashboard' ).trigger( 'click' );
						}
					}
				}
			}
		}, 30000);

		var RefreshBasiliskTable = setInterval(function() {
			if ( sessionStorage.getItem('IguanaActiveAccount') === null || sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === 'stop' ) {
				clearInterval(RefreshBasiliskTable);
			} else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === 'start') {
				if ( $('[data-edexcoin]').attr('data-edexcoin') !== 'COIN' ) {
					if ( sessionStorage.getItem('edexTmpMode') !== null || sessionStorage.getItem('edexTmpMode') === 'Basilisk') {
						if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === 'start') {
							var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin')
							ShowBasiliskFetchDataProgress(active_edexcoin);
						}
					}
				}
			}
		}, 1000);
	}

	return {
		// main function to initiate the module
		init: function() {
			resizeDashboardWindow();
			handle_edex_wallet();
			handle_edex_dashboard();
			handle_edex_send();
			handle_edex_recieve();

			window.onresize = function(event) {
				resizeDashboardWindow();
			};

			if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
				console.log('=> No wallet logged in. No need to run Dashboard JS.');
			} else {
				handleWalletWidgets();
				handleWalletWidgetBtns();
				handleEdexWalletInfo();
				handleBasiliskWalletActions();
				handleWalletToAtomicExplorer();
				//TotalFiatValue();
			}

			/*setInterval(function() {
					handleWalletWidgets();
					console.log('wallet widget refereshed (every 15 seconds)');
			}, 15000);*/

			/*RunTotalFiatValue = setInterval(function() {
					if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
					//console.log('=> No wallet logged in. No need to get Rates.');
					//StopTotalFiatValue();
					} else {
							//TotalFiatValue();
							//console.log('Get Rates (every 60 seconds)');
					}
			}, 60000);*/
		}
	};
}();

jQuery(document).ready(function() {
	Dashboard.init();
});


function resizeDashboardWindow() {
	/* set default map height */
	var navbarH = $('.site-navbar').outerHeight(),
			edexDashH = $('.edexcoin_dashoard_section_main_div').outerHeight(),
			mapH = $(window).height() - navbarH;

	$('.page-main').outerHeight(mapH);
	$('.scrollable-container').outerHeight(mapH);
}

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

/*function hideExtCoinsinEdexDashboard(coin) {
	var tmp_getinfo = EDEXgetinfo(coin);
	console.log(tmp_getinfo);
}*/

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
				'calls': 'listtransactions:getbalance:refresh'
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

function getCoinBalance(coin) {
	var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');

	EDEXlistunspent(active_edexcoin).then(function(result) {
		console.log(result)
		if (result[0] != undefined) {
			if ( result[0].interest !== undefined ) {
				$('#edexcoin_getbalance_interest').show();
				$('#edexcoin_getbalance_total_interest').show();
				$('#edexcoin_getbalance_t').removeClass( 'col-lg-12' ).addClass( 'col-lg-4' );
				$('#edex_interest_balance').text(result[0].interest);
				$('#edex_total_balance_interest').text(result[0].totalbalance);
				$('#edex_total_interest_coincode').text(active_edexcoin);
				$('#edex_total_balance_interest_coincode').text(active_edexcoin);
			}

			if ( result[0].interest === undefined ) {
				$('#edexcoin_getbalance_interest').hide();
				$('#edexcoin_getbalance_total_interest').hide();
				$('#edexcoin_getbalance_t').removeClass( 'col-lg-4' ).addClass( 'col-lg-12' );
				$('#edex_interest_balance').text('-');
				$('#edex_total_balance_interest').text('-');
			}

			$('#edex_total_balance').text(result[0].total);
			$('#edex_total_balance_coincode').text(active_edexcoin);
		} else {
			$('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text('0');
		}
	});
}

function getBasiliskCoinBalance(coin) {
	EDEXMainAddr(coin).then(function(result){
		console.log(result)
		EDEX_DEXlistunspent(coin, result).then(function(result_listunspent) {
			console.log(result_listunspent[0].amount);
			$('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text(result_listunspent[0].amount);
		});
	})
}

function StopShowCoinHistory() {
	clearInterval(ExecuteShowCoinHistory);
	console.log('Stopped executing History and ProgressBar API.');
}

function refreshEDEXCoinWalletList() {
	var walletDivContent = '',
			AddColumnDiv = 0;

	$.each([
		'native',
		'basilisk',
		'full'
		], function( index, value ) {
			var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
					ajax_data = {
						'userpass': tmpIguanaRPCAuth,
						'agent': 'InstantDEX',
						'method': 'allcoins'
					};

			$.ajax({
				type: 'POST',
				data: JSON.stringify(ajax_data),
				url: 'http://127.0.0.1:7778',
				success: function(data, textStatus, jqXHR) {
					var AllcoinsDataOutput = JSON.parse(data);

					$.each(AllcoinsDataOutput[value], function(index) {
						var coinlogo = '',
								coinname = '',
								modecode = '',
								modetip = '',
								modecolor = '';

            switch (value) {
              case 'native':
                modecode = 'Native';
                modetip = 'Native';
                modecolor = 'primary';
                break;
              case 'basilisk':
                modecode = 'Basilisk';
                modetip = 'Basilisk';
                modecolor = 'info';
                break;
              case 'full':
                modecode = 'Full';
                modetip = 'Full';
                modecolor = 'success';
                break;
              case 'virtual':
                modecode = 'Virtual';
                modetip = 'Virtual';
                modecolor = 'danger';
                break;
              case 'notarychains':
                modecode = 'Notarychains';
                modetip = 'Notarychains';
                modecolor = 'dark';
                break;
            }

            switch (AllcoinsDataOutput[value][index]) {
              case 'BTC':
                coinlogo = 'bitcoin';
                coinname = 'Bitcoin';
                break;
              case 'BTCD':
                coinlogo = 'bitcoindark';
                coinname = 'BitcoinDark';
                break;
              case 'LTC':
                coinlogo = 'litecoin';
                coinname = 'Litecoin';
                break;
              case 'VPN':
                coinlogo = 'vpncoin';
                coinname = 'VPNcoin';
                break;
              case 'SYS':
                coinlogo = 'syscoin';
                coinname = 'Syscoin';
                break;
              case 'ZEC':
                coinlogo = 'zcash';
                coinname = 'Zcash';
                break;
              case 'NMC':
                coinlogo = 'namecoin';
                coinname = 'Namecoin';
                break;
              case 'DEX':
                coinlogo = 'dex';
                coinname = 'DEX';
                break;
              case 'DOGE':
                coinlogo = 'dogecoin';
                coinname = 'Dogecoin';
                break;
              case 'DGB':
                coinlogo = 'digibyte';
                coinname = 'Digibyte';
                break;
              case 'MZC':
                coinlogo = 'mazacoin';
                coinname = 'Mazacoin';
                break;
              case 'UNO':
                coinlogo = 'unobtanium';
                coinname = 'Unobtanium';
                break;
              case 'ZET':
                coinlogo = 'zetacoin';
                coinname = 'Zetacoin';
                break;
              case 'KMD':
                coinlogo = 'komodo';
                coinname = 'Komodo';
                break;
              case 'BTM':
                coinlogo = 'bitmark';
                coinname = 'Bitmark';
                break;
              case 'CARB':
                coinlogo = 'carboncoin';
                coinname = 'Carboncoin';
                break;
              case 'ANC':
                coinlogo = 'anoncoin';
                coinname = 'AnonCoin';
                break;
              case 'FRK':
                coinlogo = 'franko';
                coinname = 'Franko';
                break;
              case 'SUPERNET':
                coinlogo = 'SUPERNET';
                coinname = 'SUPERNET';
                break;
              case 'REVS':
                coinlogo = 'REVS';
                coinname = 'REVS';
                break;
              case 'WIRELESS':
                  coinlogo = 'WIRELESS';
                  coinname = 'WIRELESS';
                  break;
              case 'USD':
                coinlogo = 'USD';
                coinname = 'USD';
                break;
            }

						walletDivContent += '<!-- Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';
						walletDivContent += '<div class="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '">';
							walletDivContent += '<div class="widget widget-shadow">';
								walletDivContent += '<div class="widget-content text-center bg-white padding-20">';
									walletDivContent += '<a class="avatar margin-bottom-5 edexcoin-logo" href="javascript:void(0)" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-edexcoinmodecode="' + modecode + '" data-edexcoinname="' + coinname + '" id="edexcoin-logo">';
										walletDivContent += '<img class="img-responsive" src="assets/images/cryptologo/' + coinlogo + '.png" alt="' + coinname + '"/>';
										walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
									walletDivContent += '</a>';
									walletDivContent += '<div class="coin-name">' + coinname + '</div>';
								walletDivContent += '</div>';
							walletDivContent += '</div>';
						walletDivContent += '</div>';
						walletDivContent += '<!-- End Wallet Widget ' + AllcoinsDataOutput[value][index] + ' -->';

						$('.wallet-widgets-row').html(walletDivContent);
						//getCoinBalance(AllcoinsDataOutput[value][index]);
						//getCoinBalance_altfn('KMD');
						//getCoinBalance('KMD');
						/*if ( modecode == 'Basilisk' ) {
							$('span[data-edexcoincode="' + AllcoinsDataOutput[value][index] + '"][id="edexcoin-balance"]').parent().hide();
							//getBasiliskCoinBalance(AllcoinsDataOutput[value][index])
						}*/

						$('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
						$('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
						edexCoinBtnAction();
					});
				},
				error: function(xhr, textStatus, error) {
					console.log('failed starting BitcoinDark.');
					console.log(xhr.statusText);
					if ( xhr.readyState == 0 ) {
						Iguana_ServiceUnavailable();
					}
					console.log(textStatus);
					console.log(error);

					if (xhr.readyState == '0' ) {
						toastr.error('Unable to connect to Iguana', 'Account Notification');
					}
				}
			});
	});
}

function SwitchBasicliskFull(switch_data) {
	var relay_value = '',
			validate_value = '',
			mode_value = '';

	if ( switch_data.modecode == 'B' ) {
		relay_value = 1;
		validate_value = 1;
		mode_value = 'Basilisk';
	}
	if ( switch_data.modecode == 'F' ) {
		relay_value = 0;
		validate_value = 0;
		mode_value = 'Full';
	}

	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			SwitchCoinModeData = {
				'userpass': tmpIguanaRPCAuth,
				'poll': 100,
				'immediate':100,
				'active': 1,
				'newcoin': switch_data.currency,
				'startpend': 1,
				'endpend': 1,
				'services': 128,
				'maxpeers': 16,
				'RELAY': relay_value,
				'VALIDATE': validate_value,
				'portp2p': 14631
			};

	// Switch selected coins' mode
	$.ajax({
		type: 'GET',
		data: SwitchCoinModeData,
		url: 'http://127.0.0.1:7778/api/iguana/addcoin',
		dataType: 'text',
		success: function(data, textStatus, jqXHR) {
			var SwitchCoinDataOutput = JSON.parse(data);

			if (SwitchCoinDataOutput.result === 'coin added') {
				console.log('coin added');
				toastr.success(switch_data.currency + ' switched to ' + mode_value + ' Mode', 'Coin Notification');
			} else if (SwitchCoinDataOutput.result === 'coin already there') {
				console.log('coin already there');
				//toastr.info("Looks like" + switch_data.currency + "already running.", "Coin Notification");
			} else if (SwitchCoinDataOutput.result === null) {
				console.log('coin already there');
				//toastr.info("Looks like" + switch_data.currency + "already running.", "Coin Notification");
			}
		},
		error: function(xhr, textStatus, error) {
			console.log('failed starting BitcoinDark.');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);
			if (xhr.readyState == '0' ) {
				toastr.error('Unable to connect to Iguana', 'Account Notification');
			}
		}
	});
}

function TotalFiatValue() {
	var BTC_balance = $('span[data-currency="BTC"][id="currency-balance"]').text(),
			BTCD_balance = $('span[data-currency="BTCD"][id="currency-balance"]').text(),
			Fiat_Currency = localStorage.getItem('EasyDEX_FiatCurrency'),
			BTC_Fiat_pair_value = '',
			Conversion_Fiat_Pair = '',
			BTCD_Fiat_pair_value = '';

	$('span[data-currency="BTC"][id="header_coinname_balance"]').text(BTC_balance + ' BTC');
	$('span[data-currency="BTCD"][id="header_coinname_balance"]').text(BTCD_balance + ' BTCD');

	if ( Fiat_Currency == 'USD' ) {
		BTC_Fiat_pair_value = 'BTC/' + Fiat_Currency;
		Conversion_Fiat_Pair = 'EUR/USD';
	} else {
		BTC_Fiat_pair_value = 'BTC/USD';
		Conversion_Fiat_Pair = Fiat_Currency + '/USD';
	}

	var TotalFiatValueData = {
				'agent': 'iguana',
				'method': 'rates',
				'quotes': [
					'BTCD/BTC',
					BTC_Fiat_pair_value,
					Conversion_Fiat_Pair
				],
				'immediate': 100,
				'timeout': 5000
			};

	if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
		console.log('=> No wallet logged in. No need to get Rates.');
	} else {
		// Get Rates
		$.ajax({
			type: 'POST',
			data: JSON.stringify(TotalFiatValueData),
			url: 'http://127.0.0.1:7778',
			success: function(data, textStatus, jqXHR) {
				var RatesData = JSON.parse(data),
						label_color = '',
						label_icon = '',
						wallettblContent = '';

				localStorage.setItem('EasyDEX_BTCD_BTC_pair_value', RatesData.rates[0]['BTCD/BTC']); // e.g BTCD/BTC
				localStorage.setItem('EasyDEX_BTC_Fiat_pair_value', RatesData.rates[1][BTC_Fiat_pair_value]); // e.g BTC/USD
				localStorage.setItem('EasyDEX_Conversion_Fiat_Pair', Conversion_Fiat_Pair); // e.g EUR/USD
				localStorage.setItem('EasyDEX_Conversion_Fiat_Pair_value', RatesData.rates[2][Conversion_Fiat_Pair]); // e.g EUR/USD: 1.11830926

				var tmp_btcd_btc = RatesData.rates[0],
						tmp_btc_fiat = RatesData.rates[1];

				BTCD_Fiat_pair_value = parseFloat(tmp_btcd_btc['BTCD/BTC']) * parseFloat(tmp_btc_fiat[BTC_Fiat_pair_value]);
				localStorage.setItem('EasyDEX_BTCD_Fiat_pair_value', BTCD_Fiat_pair_value); // e.g BTCD/USD: 2.0873619962

				var tmp_btcd_fiat_toal = parseFloat(BTCD_balance) * parseFloat(BTCD_Fiat_pair_value),
						tmp_btc_fiat_toal = parseFloat(BTC_balance) * parseFloat(tmp_btc_fiat[BTC_Fiat_pair_value]);

				$('span[data-currency="BTC"][id="header_coinfiatbalance"]').text(tmp_btc_fiat_toal.toFixed(2) + ' ' + Fiat_Currency);
				$('span[data-currency="BTCD"][id="header_coinfiatbalance"]').text(tmp_btcd_fiat_toal.toFixed(2) + ' ' + Fiat_Currency);
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
}

function StopTotalFiatValue() {
	clearInterval(RunTotalFiatValue);
	console.log('Stopped executing Total Fiat Value API with Rates');
}

function ShowCoinProgressBar(coin) {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
			getinfoValues = {
				'userpass': tmpIguanaRPCAuth,
				'coin': coin,
				'agent': 'bitcoinrpc',
				'method': 'getinfo',
				'immediate': 100,
				'timeout': 4000
			};

	$.ajax({
		type: 'POST',
		data: JSON.stringify(getinfoValues),
		url: 'http://127.0.0.1:7778',
		success: function(data, textStatus, jqXHR) {
			var CoinInfoData = JSON.parse(data);

			// TODO: refactor
			if (typeof CoinInfoData.bundles == 'undefined') {
				//console.log(coin+' is undefined');
			} else {
				if ( parseInt(CoinInfoData.RTheight) != 0 ) {
					var coin_blocks = parseInt(CoinInfoData.blocks),
							coin_blocks_plus1 = coin_blocks + 1;

					sessionStorage.setItem('Activate' + coin + 'History', 'Yes');
					$('div[data-edexcoin="'+coin+'"][id="currency-progressbars"]').show();
					$('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2) + '%');
					$('span[data-edexcoin="'+coin+'"][id="currency-bundles-percent"]').text('(' + coin + ') ' + parseFloat(CoinInfoData.bundles).toFixed(2) + '% - ( ' + coin_blocks_plus1 + ' / '+ CoinInfoData.longestchain + ' ) ==>> RT' + CoinInfoData.RTheight);
					$('div[data-edexcoin="'+coin+'"][id="additional-progress-bars"]').hide();
					$('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').removeClass( 'progress-bar-info' ).addClass( 'progress-bar-indicating progress-bar-success' );
					$('#edex-footer').css('height', '11px');
					resizeDashboardWindow();
					$('#edexcoin-wallet-waitingrt-alert').hide();
				}
				if ( parseInt(CoinInfoData.RTheight) == 0 ) {
					var coin_blocks = parseInt(CoinInfoData.blocks),
							coin_blocks_plus1 = coin_blocks + 1;

					sessionStorage.setItem('Activate' + coin + 'History', 'No');
					console.log(coin + ': ' + CoinInfoData.bundles);
					$('div[data-edexcoin="' + coin + '"][id="additional-progress-bars"]').show();
					$('div[data-edexcoin="' + coin + '"][id="currency-progressbars"]').show();
					$('div[data-edexcoin="' + coin + '"][id="currency-bundles"]').removeClass( 'progress-bar-indicating progress-bar-success' ).addClass( 'progress-bar-info' );
					$('div[data-edexcoin="' + coin + '"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2) + '%');
					$('span[data-edexcoin="' + coin + '"][id="currency-bundles-percent"]').text('(' + coin + ') ' + parseFloat(CoinInfoData.bundles).toFixed(2) + '% - ( ' + coin_blocks_plus1 + ' / ' + CoinInfoData.longestchain + ' )');
					$('div[data-edexcoin="' + coin + '"][id="currency-utxo"]').width(parseFloat(CoinInfoData.utxo).toFixed(2) + '%');
					$('span[data-edexcoin="' + coin + '"][id="currency-utxo-percent"]').text('(' + coin + ') ' + parseFloat(CoinInfoData.utxo).toFixed(2) + '%');
					$('div[data-edexcoin="' + coin + '"][id="currency-balances"]').width(parseFloat(CoinInfoData.balances).toFixed(2) + '%');
					$('span[data-edexcoin="' + coin + '"][id="currency-balances-percent"]').text('(' + coin + ') '+parseFloat(CoinInfoData.balances).toFixed(2) + '%');
					$('div[data-edexcoin="' + coin + '"][id="currency-validated"]').width(parseFloat(CoinInfoData.validated).toFixed(2) + '%');
					$('span[data-edexcoin="' + coin + '"][id="currency-validated-percent"]').text('(' + coin + ') '+parseFloat(CoinInfoData.validated).toFixed(2) + '%');
					$('#edex-footer').css('height', '44px');
					resizeDashboardWindow();
					$('#edexcoin-wallet-waitingrt-alert').show();
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

function EdexGetTxList(coin) {
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
				},
				active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		$.ajax({
			data: JSON.stringify(ajax_data_2),
			url: 'http://127.0.0.1:7778',
			type: 'POST',
			dataType: 'json'
		}).then(data => {
			var total_utxos = [];
			let params = '';

			Promise.all(data.result.map((coinaddr_value,coinaddr_index) => {
			if ( active_edexcoinmodecode == 'Basilisk' ) {
				if ( coin == 'BTC' ||
						 coin == 'BTCD' ||
						 coin == 'LTC' ||
						 coin == 'DOGE' ||
						 coin == 'DGB' ||
						 coin == 'SYS' ||
						 coin == 'MZC' ||
						 coin == 'UNO' ||
						 coin == 'ZET' ||
						 coin == 'BTM' ||
						 coin == 'CARB' ||
						 coin == 'ANC' ||
						 coin == 'FRK') {
							params = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'listtransactions',
								'address': coinaddr_value,
								'count': 100,
								'skip': 0,
								'symbol': coin
							};
						} else {
							params = {
								'userpass': tmpIguanaRPCAuth,
								'agent': 'dex',
								'method': 'listtransactions',
								'address': coinaddr_value,
								'count': 100,
								'skip': 0,
								'symbol': coin
							};
						}
				} else {
						params = {
							'userpass': tmpIguanaRPCAuth,
							'coin': coin,
							'method': 'listtransactions',
							'params': [
								0,
								9999999,
								[]
							]
						};
				}

				return new Promise((resolve, reject) => {
					$.ajax({
						data: JSON.stringify(params),
						url: 'http://127.0.0.1:7778',
						type: 'POST',
						dataType: 'json'
					}).then(data => {
						if ( active_edexcoinmodecode == 'Full' ) {
							data = data.result;
						}
						//console.log(data)
						total_utxos = $.merge(total_utxos, data);
						resolve(total_utxos);
					});
				});
			})).then(result => {
				let result_data = result[result.length - 1];
				let compiled_result = [];

				$.each(result_data, function(index, value) {
					if ( active_edexcoinmodecode == 'Full' ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTC') ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTCD' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'LTC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'DOGE' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'DGB' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'SYS' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'MZC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'UNO' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'ZET' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'BTM' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'CARB' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'ANC' ) ||
							( active_edexcoinmodecode == 'Basilisk' && coin == 'FRK' ) ) {

						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">Unknown</span>';
						}

						var tmp_addr = result_data[index].address;
						if (!('address' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>';
						}

						var tmp_secondsToString = secondsToString(result_data[index].blocktime);

						if ( result_data[index].category == 'send' ) {
							tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
						}
						if ( result_data[index].category == 'receive' ) {
							tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
						}
						if ( result_data[index].category == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> Mined';
						}if ( result_data[index].category == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> Immature';
						}
						if ( result_data[index].category == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
						}

						tmplisttransactions = [
							tmp_category,
							result_data[index].confirmations,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}

					if ( active_edexcoinmodecode == 'Basilisk' &&
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
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">Unknown</span>';
						}

						var tmp_addr = null
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger"><i class="icon fa-arrow-circle-left"></i> OUT</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success"><i class="icon fa-arrow-circle-right"></i> IN</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> Mined';
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> Immature';
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> Unknown';
						}
						if (('confirmations' in result_data[index])) {
							tmp_confirms = result_data[index].confirmations;
						}

						tmplisttransactions = [
							tmp_category,
							tmp_confirms,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+result_data[index].txid+'">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}
				});

				resolve(compiled_result);
				NProgress.done();
			});
		});
	});
}

function EdexGetTxList_cache(coin) {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();

	return new Promise((resolve) => {
		Shepherd_GetBasiliskCache().then(function(result) {
			var _data = JSON.parse(result)
					query = _data.result.basilisk,
					active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode'),
					total_utxos = [];

			Promise.all(query[coin].addresses.map((coinaddr_value, coinaddr_index) => {
				return new Promise((resolve, reject) => {
					var data = query[coin][coinaddr_value].listtransactions.data;

					total_utxos = $.merge(total_utxos, data);
					resolve(total_utxos);
				});
			})).then(result => {
				let result_data = result[result.length - 1];
				let compiled_result = [];

				$.each(result_data, function(index, value) {
					if ( active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">Unknown</span>';
						}

						var tmp_addr = null
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger"><i class="icon fa-arrow-circle-left"></i> OUT</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success"><i class="icon fa-arrow-circle-right"></i> IN</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> Mined';
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> Immature';
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> Unknown';
						}
						if (('confirmations' in result_data[index])) {
							tmp_confirms = result_data[index].confirmations;
						}

						tmplisttransactions = [
							tmp_category,
							tmp_confirms,
							tmp_amount,
							tmp_secondsToString,
							tmp_addr,
							'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
								'<i class="icon fa-search"></i>' +
							'</button>'
						];
						compiled_result.push(tmplisttransactions);
					}
				})

				resolve(compiled_result);
				NProgress.done();
			});
		});
	});
}

/*function EdexGetTxList(coin) {
	return new Promise((resolve) =>{

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
		var ajax_data_1 = {'userpass':tmpIguanaRPCAuth,"agent":"SuperNET","method":"activehandle"}
		var tmp_coin_addr = null
		var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

		var ajax_call_1 = $.ajax({
								data: JSON.stringify(ajax_data_1),
					url: 'http://127.0.0.1:7778',
					type: 'POST',
					dataType: 'json',
				}),
			ajax_call_2 = ajax_call_1.then(function(data) {
					// .then() returns a new promise
					tmp_coin_addr = data[coin]
					//console.log(tmp_coin_addr);
					if ( active_edexcoinmodecode == 'Basilisk' ) {
						if ( coin == 'BTC'
									|| coin == 'BTCD'
									|| coin == 'LTC'
									|| coin == 'DOGE'
									|| coin == 'DGB'
									|| coin == 'SYS'
									|| coin == 'MZC'
									|| coin == 'UNO'
									|| coin == 'ZET'
									|| coin == 'BTM'
									|| coin == 'CARB'
									|| coin == 'ANC'
									|| coin == 'FRK') {
							var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":data[coin],"count":100,"skip":0,"symbol":coin}
						} else {
							var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":data[coin],"count":100,"skip":0,"symbol":coin}
						}
					} else {
						var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"coin":coin,"method":"listtransactions","params":[0, 9999999, []]}
					}
					console.log(ajax_data_2)
					return $.ajax({
						data: JSON.stringify(ajax_data_2),
						url: 'http://127.0.0.1:7778',
						type: 'POST',
						dataType: 'json',
					});
				});

		ajax_call_2.done(function(data) {
			//console.log(tmp_coin_addr);
			//console.log(data);
			if ( active_edexcoinmodecode == 'Full' ) {
				data = data.result;
			}
			var result = [];
			$.each(data, function(index, value) {
				//console.log(value);

				if ( active_edexcoinmodecode == 'Full'
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTC')
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTCD' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'LTC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'DOGE' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'DGB' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'SYS' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'MZC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'UNO' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'ZET' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTM' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'CARB' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'ANC' )
					|| ( active_edexcoinmodecode == 'Basilisk' && coin == 'FRK' ) ) {
					var tmp_category = '';
					var tmp_amount = data[index].amount;
					if(!("amount" in data[index])) {
						tmp_amount = '<span class="label label-dark">Unknown</span>'
					}
					var tmp_addr = data[index].address;
					if(!("address" in data[index])) {
						tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
					}

					//tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
					//if(("blocktime" in data[index])) {
						//console.log('blocktime FOUND');
						//var tmp_secondsToString = secondsToString(data[index].blocktime)
					//}

					var tmp_secondsToString = secondsToString(data[index].blocktime)

					if (isNaN(tmp_secondsToString)) {
						//tmp_secondsToString = 'Unknown';
					}
					if ( data[index].category == 'send' ) {
						tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
					}
					if ( data[index].category == 'receive' ) {
						tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
					}
					if ( data[index].category == 'generate' ) {
						tmp_category = '<i class="icon fa-cogs"></i> Mined';
					}if ( data[index].category == 'immature' ) {
						tmp_category = '<i class="icon fa-clock-o"></i> Immature';
					}
					if ( data[index].category == 'unknown' ) {
						tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
					}
					//console.log(tmp_addr);
					//tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
					tmplisttransactions = [tmp_category,data[index].confirmations,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
					//console.log(tmplisttransactions);
					result.push(tmplisttransactions);
				}

				if ( active_edexcoinmodecode == 'Basilisk'
					&& coin !== 'BTC'
					&& coin !== 'BTCD'
					&& coin !== 'LTC'
					&& coin !== 'DOGE'
					&& coin !== 'DGB'
					&& coin !== 'SYS'
					&& coin !== 'MZC'
					&& coin !== 'UNO'
					&& coin !== 'ZET'
					&& coin !== 'BTM'
					&& coin !== 'CARB'
					&& coin !== 'ANC'
					&& coin !== 'FRK' ) {
					var tmp_category = '';
					var tmp_amount = data[index].amount;
					if(!("amount" in data[index])) {
						tmp_amount = '<span class="label label-dark">Unknown</span>'
					}
					var tmp_addr = null
					if(!("paid" in data[index])) {
						tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
					}
					if(("paid" in data[index])) {
						var first_addr = Object.keys(data[index].paid['vouts'][0]);
						var tmp_addr = first_addr[0];
						//console.log(data[index].paid['vouts'][0])

					}

					//tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
					//if(("blocktime" in data[index])) {
						//console.log('blocktime FOUND');
						//var tmp_secondsToString = secondsToString(data[index].blocktime)
					//}

					var tmp_secondsToString = secondsToString(data[index].timestamp)

					if (isNaN(tmp_secondsToString)) {
						//tmp_secondsToString = 'Unknown';
					}

					console.log(data[index].type)
					if ( data[index].type == 'sent' ) {
						tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
					}
					if ( data[index].type == 'received' ) {
						tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
					}
					if ( data[index].type == 'generate' ) {
						tmp_category = '<i class="icon fa-cogs"></i> Mined';
					}if ( data[index].type == 'immature' ) {
						tmp_category = '<i class="icon fa-clock-o"></i> Immature';
					}
					if ( data[index].type == 'unknown' ) {
						tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
					}


					if(!("confirmations" in data[index])) {
						tmp_confirms = '<i class="icon fa-meh-o"></i> Unknown';
					}
					if(("confirmations" in data[index])) {
						tmp_confirms = data[index].confirmations
					}

					//console.log(tmp_addr);
					//tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
					tmplisttransactions = [tmp_category,tmp_confirms,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
					//console.log(tmplisttransactions);
					result.push(tmplisttransactions);
				}

			});
			//console.log(result)
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
}*/

function clearEdexSendFieldData() {
	//$('.showedexcoinaddrs').selectpicker('refresh');
	//$('#edexcoin_sendto').val('');
	//$('#edexcoin_total_value').text('');
	//$('#edexcoin_amount').val('');
}

function EdexListAllAddr(coin) {
	NProgress.done(true);
	NProgress.configure({
			template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
								'<div class="spinner" role="spinner">' +
									'<div class="spinner-icon"></div>' +
								'</div>'
	});
	NProgress.start();

	active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if (active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
		EDEXgetaddrbyaccount_cache(coin).then(function(result) {
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	} else if (active_edexcoinmodecode == 'Basilisk' ) {
		EDEXgetaddrbyaccount(coin).then(function(result){
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	}

	if (active_edexcoinmodecode == 'Full') {
		EDEXgetaddrbyaccount(coin).then(function(result) {
			console.log(result);
			var only_reciving_addr_data = [];

			$.each(result, function(index, value) {
				if (value.interest == undefined || coin !== 'KMD') {
					console.log('interest is undefined');
					tmp_interest = 'NA';
				} else {
					tmp_interest = value.interest;
				}
				only_reciving_addr_data.push([
					value.label,
					value.addr,
					value.total,
					tmp_interest
				]);
			});
			console.log(only_reciving_addr_data);

			var edexcoin_recieve_table = '';

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			edexcoin_recieve_table.destroy();

			edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable({
				data: only_reciving_addr_data,
				select: false,
				retrieve: true
			});

			NProgress.done();
		});
	}
	
}


function ShowBasiliskFetchDataProgress(coin) {
	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode')

	Shepherd_GetBasiliskCache().then(function(result){
	    var _data = JSON.parse(result)
	    var query = _data.result.basilisk
	        coin_exists = true
	        addresses_exists = true
	        getbalance_exists = true
	        listtransactions_exists = true
	        listunspent_exists = true
	        refresh_exists = true
	        getbalance_status = 'NOT FOUND'
	        listtransactions_status = 'NOT FOUND'
	        listunspent_status = 'NOT FOUND'
	        refresh_status = 'NOT FOUND'
	    //console.log(query)

	    if (!query) {
	        //console.log('data not found.')
	        res_data = {"coin":false, "addresses":false, "getbalance": false,"listtransactions": false,"listunspent": false,"refresh": false}
	        //console.log(res_data)
	    } else if (!query[coin]) {
	        //console.log(coin + ' not found.')
	        coin_exists = false
	        res_data = {"coin":coin_exists, "addresses":false, "getbalance": false,"listtransactions": false,"listunspent": false,"refresh": false}
	        //console.log(res_data)
	    } else if (!('addresses' in query[coin])) {
	        //console.log(coin + ' addresses not found.')
	        addresses_exists = false
	        res_data = {"coin":coin_exists, "addresses":false, "getbalance": false,"listtransactions": false,"listunspent": false,"refresh": false}
	        //console.log(res_data)
	    } else {
	        Promise.all(query[coin].addresses.map((coinaddr_value,coinaddr_index) => {
	            return new Promise((resolve, reject) => {
	                //console.log(coinaddr_index)
	                //console.log(coinaddr_value)
	                var data = query[coin][coinaddr_value].getbalance
	                //console.log(data)

	                if (!('getbalance' in query[coin][coinaddr_value])) {
	                    //console.log(coin + '>>>' + coinaddr_value + ' => getbalance not found.')
	                    getbalance_exists = false
	                } else {
	                    //console.log(query[coin][coinaddr_value].getbalance.status)
	                    getbalance_status = query[coin][coinaddr_value].getbalance.status
	                }

	                if (!('listtransactions' in query[coin][coinaddr_value])) {
	                    //console.log(coin + '>>>' + coinaddr_value + ' => listtransactions not found.')
	                    listtransactions_exists = false
	                } else {
	                    //console.log(query[coin][coinaddr_value].listtransactions.status)
	                    listtransactions_status = query[coin][coinaddr_value].listtransactions.status
	                }

	                if (!('listunspent' in query[coin][coinaddr_value])) {
	                    //console.log(coin + '>>>' + coinaddr_value + ' => listunspent not found.')
	                    listunspent_exists = false
	                } else {
	                    //console.log(query[coin][coinaddr_value].listunspent.status)
	                    listunspent_status = query[coin][coinaddr_value].listunspent.status
	                }

	                if (!('refresh' in query[coin][coinaddr_value])) {
	                    //console.log(coin + '>>>' + coinaddr_value + ' => refresh not found.')
	                    refresh_exists = false
	                } else {
	                    //console.log(query[coin][coinaddr_value].refresh.status)
	                    refresh_status = query[coin][coinaddr_value].refresh.status
	                }

	                pass_data = {
	                                "addr_index":coinaddr_index,
	                                "addr_value":coinaddr_value,
	                                "getbalance": getbalance_exists,
	                                "getbalance_status": getbalance_status,
	                                "listtransactions": listtransactions_exists,
	                                "listtransactions_status": listtransactions_status,
	                                "listunspent": listunspent_exists,
	                                "listunspent_status": listunspent_status,
	                                "refresh": refresh_exists,
	                                "refresh_status": refresh_status
	                            }
	                resolve(pass_data)
	            })
	        })).then(result => {
	            //console.log(result)
	            //res_data.coin = coin_exists
	            //res_data.addresses = addresses_exists
	            BasiliskFetchData = ''
	            
	            $.each(result, function(result_index, result_val) {
	                //console.log(result_index)
	                //console.log(result_val)

	                var tmp_listunspent_lable_color = ''
	                var tmp_listtransactions_lable_color = ''
	                var tmp_getbalance_lable_color = ''
	                var tmp_refresh_lable_color = ''

	                switch (result_val.listunspent_status) {
	                    case 'waiting':
	                        tmp_listunspent_lable_color = 'dark'
	                        break;
	                    case 'in progress':
	                        tmp_listunspent_lable_color = 'primary'
	                        break;
	                    case 'done':
	                        tmp_listunspent_lable_color = 'success'
	                        break;
	                    case 'NOT FOUND':
	                        tmp_listunspent_lable_color = 'danger'
	                        break;
	                }

	                switch (result_val.listtransactions_status) {
	                    case 'waiting':
	                        tmp_listtransactions_lable_color = 'dark'
	                        break;
	                    case 'in progress':
	                        tmp_listtransactions_lable_color = 'primary'
	                        break;
	                    case 'done':
	                        tmp_listtransactions_lable_color = 'success'
	                        break;
	                    case 'NOT FOUND':
	                        tmp_listtransactions_lable_color = 'danger'
	                        break;
	                }

	                switch (result_val.getbalance_status) {
	                    case 'waiting':
	                        tmp_getbalance_lable_color = 'dark'
	                        break;
	                    case 'in progress':
	                        tmp_getbalance_lable_color = 'primary'
	                        break;
	                    case 'done':
	                        tmp_getbalance_lable_color = 'success'
	                        break;
	                    case 'NOT FOUND':
	                        tmp_getbalance_lable_color = 'danger'
	                        break;
	                }

	                switch (result_val.refresh_status) {
	                    case 'waiting':
	                        tmp_refresh_lable_color = 'dark'
	                        break;
	                    case 'in progress':
	                        tmp_refresh_lable_color = 'primary'
	                        break;
	                    case 'done':
	                        tmp_refresh_lable_color = 'success'
	                        break;
	                    case 'NOT FOUND':
	                        tmp_refresh_lable_color = 'danger'
	                        break;
	                }

	                
	                BasiliskFetchData += '<tr>';
	                BasiliskFetchData += '<td>'+ result_val.addr_value.substring(0,5) +'...</td>';
	                BasiliskFetchData += '<td><span class="label label-'+tmp_listunspent_lable_color+' text-uppercase">'+result_val.listunspent_status+'</span></td>';
	                BasiliskFetchData += '<td><span class="label label-'+tmp_listtransactions_lable_color+' text-uppercase">'+result_val.listtransactions_status+'</span></td>';
	                BasiliskFetchData += '<td><span class="label label-'+tmp_getbalance_lable_color+' text-uppercase">'+result_val.getbalance_status+'</span></td>';
	                BasiliskFetchData += '<td><span class="label label-'+tmp_refresh_lable_color+' text-uppercase">'+result_val.refresh_status+'</span></td>';
	                BasiliskFetchData += '</tr>';
	                $('.tbl_edexcoin_dashboard_basilisk_refresh_status tbody').html(BasiliskFetchData);

	                if (result[result.length-1] == result_val && result_val.listtransactions_status !== 'done' && result_val.getbalance_status !== 'done' && result_val.refresh_status !== 'done' ) {
	                    $('#edexcoin_dashboard_basilisk_refresh_status').show()
	                } else {
	                    $('#edexcoin_dashboard_basilisk_refresh_status').hide()
	                }
	            })
	        })
	    }
	    
	})
}