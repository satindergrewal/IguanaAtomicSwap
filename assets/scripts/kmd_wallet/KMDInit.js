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
		toastr.error(_lang[defaultLang].TOASTR.KMD_NATIVE_CON_ERROR, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
		$('#extcoin-wallet').hide();
		$('#extcoin-wallet-connection-alert').show();
	}
	if ( check1[0] == 'null return' ) {
		console.log('Could not connect to external wallet. Is iguana connected to external wallet?');
		toastr.error(_lang[defaultLang].TOASTR.KMD_IGUANA_CON_ERROR, _lang[defaultLang].TOASTR.WALLET_NOTIFICATION);
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
				url: 'http://127.0.0.1:' + config.iguanaPort,
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
				url: 'http://localhost:' + config.iguanaPort + '/api/dex/getinfo?userpass=tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth') + '&symbol=KMD',
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
			}, 2000);
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