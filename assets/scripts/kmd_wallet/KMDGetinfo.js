function getKMDWalletInfo() {
	var coincli_agent = SelectCoinCli();

	if (coincli_agent == 'acpax') {
		var cli_params = {
					'cli': 'kmd',
					'command': '-ac_name='+$('[data-extcoin]').attr('data-extcoin')+' getwalletinfo'
				};
	} else {
		var cli_params = {
					'cli': coincli_agent,
					'command': 'getwalletinfo'
				};
	}

	//console.log(cli_params)
	//console.log(cli_params.cli)
	//console.log(cli_params.command)
	ipc.send('InvokeCoinCliAction', {"cli":cli_params.cli,"command":cli_params.command});
	ipc.once('coincliReply', function(event, response){
		//console.log(response);
		response = JSON.parse(response)
		$('#kmd_walletversion').text(response.walletversion);
		$('#kmd_balance').text(response.balance);
		$('#kmd_unconfirmed_balance').text(response.unconfirmed_balance);
		$('#kmd_immature_balance').text(response.immature_balance);
		$('#KMDTotalTransactionsCount').text(response.txcount);
	});
}

function getKMDInfo() {
	var coincli_agent = SelectCoinCli();

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

	console.log(cli_params)
	console.log(cli_params.cli)
	console.log(cli_params.command)
	ipc.send('InvokeCoinCliAction', {"cli":cli_params.cli,"command":cli_params.command});
	ipc.once('coincliReply', function(event, response){
		console.log(response);
		response = JSON.parse(response)
		$('#kmd_version').text(response.version);
		$('#kmd_protocolversion').text(response.protocolversion);
		$('#kmd_notarized').text(response.notarized);
		$('#kmd_notarizedhash').text(response.notarizedhash);
		$('#kmd_notarizedbtc').text(response.notarizedbtc);
		$('#kmd_blocks').text(response.blocks);
		$('#kmd_connections').text(response.connections);
		$('#kmd_difficulty').text(response.difficulty);
		$('#kmd_testnet').text(response.testnet);
		$('#kmd_paytxfee').text(response.paytxfee);
		$('#kmd_relayfee').text(response.relayfee);
		$('#kmd_errors').text(response.errors);
	});
}