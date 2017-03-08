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

function StopShowCoinHistory() {
	clearInterval(ExecuteShowCoinHistory);
	console.log('Stopped executing History and ProgressBar API.');
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
			url: 'http://127.0.0.1:' + config.iguanaPort,
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
		url: 'http://127.0.0.1:' + config.iguanaPort,
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