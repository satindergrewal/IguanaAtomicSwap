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
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'asset': $('[data-extcoin]').attr('data-extcoin'),
				'function': 'listunspent',
				'hex': ''
			};
	} else {
		var ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'listunspent',
				'hex': ''
			};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
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

function KMDGetTransactionIDInfo(txid) {
	var result = [],
			ajax_data_to_hex = '["' + txid + '"]',
			tmptxid_output = Iguana_HashHex(ajax_data_to_hex),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'asset': $('[data-extcoin]').attr('data-extcoin'),
				'function': 'gettransaction',
				'hex': tmptxid_output
			};
	} else {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'gettransaction',
				'hex': tmptxid_output
			};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:' + config.iguanaPort,
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
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (passthru_agent == 'iguana') {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'asset': $('[data-extcoin]').attr('data-extcoin'),
				'function': 'z_getoperationstatus',
				'hex': tmpopid_output
			};
	} else {
		var ajax_data_txid_input = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'z_getoperationstatus',
				'hex': tmpopid_output
			};
	}

	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data_txid_input),
		url: 'http://127.0.0.1:' + config.iguanaPort,
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
												 	 '<i class="icon fa-eye"></i> ' + _lang[defaultLang].KMD_NATIVE.QUEUED +
												 '</span>';
			tmp_results = '<i>' + _lang[defaultLang].KMD_NATIVE.PLEASE_REFRESH + '...</i>';
		}
		if (listOPIDs[0][index].status === 'executing') {
			tmp_status_label = '<span class="label label-info">' +
												   '<i class="icon fa-eye"></i> ' + _lang[defaultLang].KMD_NATIVE.EXECUTING +
												 '</span>';
			tmp_results = '<i>' + _lang[defaultLang].KMD_NATIVE.PLEASE_REFRESH + '...</i>';
		}
		if (listOPIDs[0][index].status === 'failed') {
			tmp_status_label = '<span class="label label-danger">' +
												   '<i class="icon fa-eye"></i> ' + _lang[defaultLang].KMD_NATIVE.FAILED +
												 '</span>';
			tmp_results = '<b>Error Code:</b> ' + listOPIDs[0][index].error.code + '<br> <b>' + _lang[defaultLang].KMD_NATIVE.MESSAGE + ':</b> ' + listOPIDs[0][index].error.message;
		}
		if (listOPIDs[0][index].status === 'success') {
			tmp_status_label = '<span class="label label-success">' +
												   '<i class="icon fa-eye"></i> ' + _lang[defaultLang].KMD_NATIVE.SUCCESS +
												 '</span>';
			tmp_results = '<b>txid:</b> ' + listOPIDs[0][index].result.txid + '<br> <b>' + _lang[defaultLang].KMD_NATIVE.EXECUTION_SECONDS + ':</b> ' + listOPIDs[0][index].execution_secs;
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