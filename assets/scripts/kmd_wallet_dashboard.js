jQuery(document).ready(function() {
	// KMDWalletDashboard.init();
	// TODO: refactor
	var RunNativeProgressBar = setInterval(function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
				 sessionStorage.getItem('NativeWalletActions') === null ||
				 sessionStorage.getItem('NativeWalletActions') === 'stop' ) {

		} else if ( sessionStorage.getItem('NativeWalletActions') !== null || sessionStorage.getItem('NativeWalletActions') === 'start') {
			KMD_ProgressBar();
		}
	}, 5000);

	var RefreshEdexWalletDashboard = setInterval(function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ||
				 sessionStorage.getItem('NativeWalletActions') === null ||
				 sessionStorage.getItem('NativeWalletActions') === 'stop' ) {
			clearInterval(RefreshEdexWalletDashboard);
		} else if ( sessionStorage.getItem('NativeWalletActions') === null || sessionStorage.getItem('NativeWalletActions') === 'start') {
			if ( $('[data-data-extcoin]').attr('data-data-extcoin') !== 'COIN' ) {
				if ( sessionStorage.getItem('edexTmpMode') !== null || sessionStorage.getItem('edexTmpMode') === 'Native') {
					if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === 'start') {
						var action_btn_code = getHeaderActionMenuButtonCoinCode();
						$( '#btn_' + action_btn_code + '_wallet_dashboard' ).trigger( 'click' );
					}
				}
			}
		}
	}, 30000);
});

function getHeaderActionMenuButtonCoinCode() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin'),
			action_menu_button_code = '';

	if ( extcoin == 'KMD') { action_menu_button_code = 'kmd'; };
	if ( extcoin == 'ZEC') { action_menu_button_code = 'zec'; };

	if (checkAC(extcoin)) { action_menu_button_code = 'acpax'; };

	return action_menu_button_code;
}

function getPassthruAgent() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin');
			passthru_agent = '';

	console.log(extcoin);

	if ( extcoin == 'KMD') { passthru_agent = 'komodo'; };
	if ( extcoin == 'ZEC') { passthru_agent = 'zcash'; };

	if (checkAC(extcoin)) { passthru_agent = 'iguana'; };

	return passthru_agent;
}

function SelectCoinCli() {
	var extcoin = $('[data-extcoin]').attr('data-extcoin');
			passthru_agent = '';

	console.log(extcoin);

	if ( extcoin == 'KMD') { passthru_agent = 'kmd'; };
	if ( extcoin == 'ZEC') { passthru_agent = 'zec'; };

	if (checkAC(extcoin)) { passthru_agent = 'acpax'; };

	return passthru_agent;
}

function CheckIfConnected(cb) {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin'),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'getinfo',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'getinfo',
					'hex': ''
				};
	}

	console.log(ajax_data);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);

			if ( AjaxOutputData.errors != undefined ) {
				result.push('connected');
			} else if ( AjaxOutputData['error'].message = 'Activating best chain...' ) {
				result.push('activating');
			} else if ( AjaxOutputData.errors == undefined) {
				result.push('not active');
			} else {
				result.push(AjaxOutputData.errors);
			}

			cb.call(this, result);			
		},
		error: function(xhr, textStatus, error) {
			console.log('failed getting Coin History.');
			console.log(xhr.statusText);
			if ( xhr.readyState == 0 ) {
				Iguana_ServiceUnavailable();
			}
			console.log(textStatus);
			console.log(error);

			cb.call(this, result);
		}
	});

	return result;
}

// TODO: this func is not used anywhere
function CheckIfWalletEncrypted() {
	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'walletlock',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'walletlock',
					'hex': ''
				};
	}

	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
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

function KMD_getInfo_rtrn(cb) {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin'),
			coincli_agent = SelectCoinCli(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (coincli_agent == 'acpax') {
		var cli_params = {
					'cli': 'kmd',
					'command': '-ac_name='+$('[data-extcoin]').attr('data-extcoin')+' getinfo'
				};
	} else {
		var cli_params = {
					'cli': coincli_agent,
					'command': 'getinfo'
				};
	}

	//console.log(cli_params)
	//console.log(cli_params.cli)
	//console.log(cli_params.command)
	ipc.send('InvokeCoinCliAction', {"cli":cli_params.cli,"command":cli_params.command});
	ipc.once('coincliReply', function(event, response){
		//console.log(response);
		response = JSON.parse(response)
		if ( response.errors != undefined ) {
			result.push(response);
		} else if ( response['error'].message = 'Activating best chain...' ) {
			result.push('activating');
		} else if ( response.errors == undefined) {
			result.push('not active');
		} else {
			result.push(response.errors);
		}

		cb.call(this, result[0]);
	});

	return result[0];
}

function KMD_ProgressBar() {
	var result = [],
			extcoin = $('[data-extcoin]').attr('data-extcoin');

	KMD_getInfo_rtrn(_KMD_ProgressBar);

	function _KMD_ProgressBar(getinfotmp) {
		if (extcoin !== 'ZEC') {
			if ( getinfotmp == 'activating') {
				$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text(_lang[defaultLang].INDEX.ACTIVATING + '...');
			} else {
				if (getinfotmp.blocks === 0) {
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text('No blocks');
					$('#extcoin-progressbars .progress-bar').css({ 'width': '100%' });
				} else if (getinfotmp.blocks > 0 && getinfotmp.longestchain === 0) {
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text('No longestchain');
					$('#extcoin-progressbars .progress-bar').css({ 'width': '100%' });
				} else {
					var sync_percent = parseFloat(parseInt(getinfotmp.blocks, 10) * 100) / parseInt(getinfotmp.longestchain, 10);
					console.log('getinfotmp', getinfotmp);
					$('div[data-extcoin="' + extcoin + '"][id="extcoin-sync"]').width(parseFloat(sync_percent).toFixed(2) + '%');
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-sync-percent"]').text(parseFloat(sync_percent).toFixed(2) + '%');
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-synced-blocks"]').text(getinfotmp.blocks);
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-longestchain"]').text(getinfotmp.longestchain);
					$('span[data-extcoin="' + extcoin + '"][id="extcoin-connections"]').text(getinfotmp.connections);
				}
				$('#extcoin-wallet-activating-alert').hide();
			}
		}
	}
}