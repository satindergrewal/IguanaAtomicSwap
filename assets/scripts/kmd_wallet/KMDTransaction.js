function KMDGetPublicTransactions() {
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
	});
	NProgress.start();

	var result = [],
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'asset': $('[data-extcoin]').attr('data-extcoin'),
					'function': 'listtransactions',
					'hex': ''
				};
	} else {
		var ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': passthru_agent,
					'method': 'passthru',
					'function': 'listtransactions',
					'hex': ''
				};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses

			$.each(AjaxOutputData, function(index, value) {
				var tmp_category = '',
						tmp_addr = AjaxOutputData[index] ? AjaxOutputData[index].address : '';

				if (AjaxOutputData[index] && !('address' in AjaxOutputData[index])) {
					tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
				}
				var tmp_secondsToString = secondsToString(AjaxOutputData[index].time);

				if ( AjaxOutputData[index].category == 'send' ) {
					tmp_category = '<i class="icon fa-arrow-circle-left"></i> ' +_lang[defaultLang].DASHBOARD.OUT;
				}
				if ( AjaxOutputData[index].category == 'receive' ) {
					tmp_category = '<i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN;
				}
				if ( AjaxOutputData[index].category == 'generate' ) {
					tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.MINED;
				}
				if ( AjaxOutputData[index].category == 'immature' ) {
					tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
				}

				tmplisttransactions = [
					'<span class="label label-default">' +
						'<i class="icon fa-eye"></i> ' + _lang[defaultLang].IAPI.PUBLIC_SM +
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
		template: templates.nprogressBar
	});
	NProgress.start();

	var result = [],
			get_zaddr_list = KMDListaddrZ();

	$.each(get_zaddr_list, function(index, value) {
		var ajax_data_to_hex = '["' + value.addr + '",0]',
				tmpzaddr_hex_input = Iguana_HashHex(ajax_data_to_hex),
				passthru_agent = getPassthruAgent(),
				tmpIguanaRPCAuth = 'tmpIgRPCUser@ '+ sessionStorage.getItem('IguanaRPCAuth');

		if (passthru_agent == 'iguana') {
			var ajax_data = {
						'userpass': tmpIguanaRPCAuth,
						'agent': passthru_agent,
						'method': 'passthru',
						'asset': $('[data-extcoin]').attr('data-extcoin'),
						'function': 'z_listreceivedbyaddress',
						'hex': tmpzaddr_hex_input
					};
		} else {
			var ajax_data = {
						'userpass': tmpIguanaRPCAuth,
						'agent': passthru_agent,
						'method': 'passthru',
						'function': 'z_listreceivedbyaddress',
						'hex': tmpzaddr_hex_input
					};
		}

		$.ajax({
			async: false,
			type: 'POST',
			data: JSON.stringify(ajax_data),
			url: 'http://127.0.0.1:' + config.iguanaPort,
			success: function(data, textStatus, jqXHR) {
				var AjaxOutputData = JSON.parse(data); // Ajax output gets the whole list of unspent coin with addresses

				$.each(AjaxOutputData, function(index, txidvalue) {
					var tmp_category = '<i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].TOASTR.IN,
							tmp_addr = value.addr.slice(0, 30) + '...';
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
									'<i class="icon fa-eye-slash"></i> ' + _lang[defaultLang].KMD_NATIVE.PRIVATE +
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

	var txhistorydataT = KMDGetPublicTransactions(),
			txhistorydata = txhistorydataT,
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