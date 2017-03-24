function EdexfillTxHistory(coin) {
	$('#edexcoin_txhistory').data('panel-api').load();
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
	});
	NProgress.start();

	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if ( active_edexcoinmodecode === 'Basilisk' ) {
		EdexGetTxList_cache(coin)
    .then(function(result) {
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
		EdexGetTxList(coin)
    .then(function(result){
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

function refreshEDEXCoinWalletList() {
	Dashboard.handleWalletWidgets();
}

function EdexGetTxList(coin) {
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
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
			url: 'http://127.0.0.1:' + config.iguanaPort,
			type: 'POST',
			dataType: 'json'
		})
    .then(data => {
			var total_utxos = [];
			let params = '';

			Promise.all(data.result.map((coinaddr_value,coinaddr_index) => {
				if ( active_edexcoinmodecode == 'Basilisk' ) {
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
						url: 'http://127.0.0.1:' + config.iguanaPort,
						type: 'POST',
						dataType: 'json'
					})
					.then(data => {
						if ( active_edexcoinmodecode == 'Full' ) {
							data = data.result;
						}
						//console.log(data)
						total_utxos = $.merge(total_utxos, data);
						resolve(total_utxos);
					});
				});
			}))
      .then(result => {
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
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = result_data[index].address;
						if (!('address' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}

						var tmp_secondsToString = secondsToString(result_data[index].blocktime);

						if ( result_data[index].category == 'send' ) {
							tmp_category = '<i class="icon fa-arrow-circle-left"></i> ' + _lang[defaultLang].DASHBOARD.OUT;
						}
						if ( result_data[index].category == 'receive' ) {
							tmp_category = '<i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN;
						}
						if ( result_data[index].category == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
						}if ( result_data[index].category == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.OUT;
						}
						if ( result_data[index].category == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
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
							 coin !== 'FRK' &&
							 coin !== 'GMC' ) {
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = null;
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger">' +
                               '<i class="icon fa-arrow-circle-left"></i> ' + _lang[defaultLang].DASHBOARD.OUT +
                             '</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success">' +
                               '<i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN +
                             '</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.MINED;
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
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
							'<button type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="' + result_data[index].txid + '">' +
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
		template: templates.nprogressBar
	});
	NProgress.start();

	return new Promise((resolve) => {
		Shepherd_GetBasiliskCache()
    .then(function(result) {
			var _data = JSON.parse(result),
					query = _data.result.basilisk,
					active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode'),
					total_utxos = [];

			Promise.all(query[coin].addresses.map((coinaddr_value, coinaddr_index) => {
				return new Promise((resolve, reject) => {
					var data = query[coin][coinaddr_value].listtransactions.data;

					total_utxos = $.merge(total_utxos, data);
					resolve(total_utxos);
				});
			}))
      .then(result => {
				let result_data = result[result.length - 1],
						compiled_result = [];

				$.each(result_data, function(index, value) {
					if ( active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
						var tmp_category = '',
								tmp_amount = result_data[index].amount;

						if (!('amount' in result_data[index])) {
							tmp_amount = '<span class="label label-dark">' + _lang[defaultLang].DASHBOARD.UNKNOWN + '</span>';
						}

						var tmp_addr = null;
						if (!('paid' in result_data[index])) {
							tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">' + _lang[defaultLang].DASHBOARD.ZADDR_NOT_LISTED + '!</span>';
						}
						if (('paid' in result_data[index])) {
							var first_addr = Object.keys(result_data[index].paid['vouts'][0]),
									tmp_addr = first_addr[0];
						}

						var tmp_secondsToString = secondsToString(result_data[index].timestamp);

						if ( result_data[index].type == 'sent' ) {
							tmp_category = '<span class="label label-danger">' +
                               '<i class="icon fa-arrow-circle-left"></i> ' + _lang[defaultLang].DASHBOARD.OUT +
                             '</span>';
						}
						if ( result_data[index].type == 'received' ) {
							tmp_category = '<span class="label label-success">' +
                               '<i class="icon fa-arrow-circle-right"></i> ' + _lang[defaultLang].DASHBOARD.IN +
                             '</span>';
						}
						if ( result_data[index].type == 'generate' ) {
							tmp_category = '<i class="icon fa-cogs"></i> ' + _lang[defaultLang].DASHBOARD.MINED;
						}
						if ( result_data[index].type == 'immature' ) {
							tmp_category = '<i class="icon fa-clock-o"></i> ' + _lang[defaultLang].DASHBOARD.IMMATURE;
						}
						if ( result_data[index].type == 'unknown' ) {
							tmp_category = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
						}

						if (!('confirmations' in result_data[index])) {
							tmp_confirms = '<i class="icon fa-meh-o"></i> ' + _lang[defaultLang].DASHBOARD.UNKNOWN;
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


function clearEdexSendFieldData() {
}

function EdexListAllAddr(coin) {
	NProgress.done(true);
	NProgress.configure({
		template: templates.nprogressBar
	});
	NProgress.start();

	active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	if (active_edexcoinmodecode == 'Basilisk' && coin !== 'BTC' && coin !== 'SYS') {
		EDEXgetaddrbyaccount_cache(coin)
    .then(function(result) {
			var only_reciving_addr_data = [];

			console.log(result);
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
		EDEXgetaddrbyaccount(coin)
    .then(function(result) {
			var only_reciving_addr_data = [];

			console.log(result);
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
		EDEXgetaddrbyaccount(coin)
    .then(function(result) {
			var only_reciving_addr_data = [];

			console.log(result);
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

function edexCoinBtnAction() {
	$('.edexcoin-logo').click(function() {
		$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
		$( '#edexcoin_send_coins_back_btn' ).trigger( 'click' );
		$('#btn_edexcoin_dashboard').hide();
		$(
      '#btn_edexcoin_send,' +
      '#btn_edexcoin_recieve'
    )
    .show();

		var selected_coin = $(this).data('edexcoincode'),
				selected_coinmode = $(this).data('edexcoinmodecode'),
				selected_coinname = $(this).data('edexcoinname');

		$(
      '#edexcoin_getbalance_interest,' +
      '#edexcoin_getbalance_total_interest'
    )
    .hide();
		$('#edexcoin_getbalance_t')
      .removeClass( 'col-lg-4' )
      .addClass( 'col-lg-12' );
		$(
      '#edex_interest_balance,' +
      '#edex_total_balance_interest,' +
      '#edex_total_balance'
    )
    .text('-');
		$('#edex_total_balance_coincode').text(selected_coin);

		sessionStorage.setItem('edexTmpMode', selected_coinmode); // set edex mode
		resizeDashboardWindow();

		if ( selected_coinmode == 'Basilisk' ) {
      $('#btn_edexcoin_basilisk').show();
			$(
        '#edex-footer,' +
        '#edexcoin-wallet-waitingrt-alert'
      )
      .hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode == 'Full' ) {
			$('#edex-footer').show();
			$('#btn_edexcoin_basilisk').hide();
			sessionStorage.setItem('edexTmpRefresh', 'start');
		}
		if ( selected_coinmode !== 'Native' ) {
			$(
        '#edexcoin_dashoard_section,' +
        '#header-dashboard,' +
        '#wallet-widgets,' +
        '#edexcoin_dashboardinfo,' +
        '#currency-progressbars'
      )
      .show();
			$(
        '#no_wallet_selected,' +
        '#edexcoin_send,' +
        '#edexcoin_recieve_section,' +
        '#edexcoin_settings'
      )
      .hide();

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
			EDEXMainAddr(selected_coin)
      .then(function(result) {
				$('#edexcoin_active_addr').text(result);
				$('#edexcoin_active_addr_clipboard').attr('data-clipboard-text', result);
			});

			$('#edexcoin_active_addr_clipboard').click(function() {
				alertify.success(_lang[defaultLang].DASHBOARD.ADDR_COPIED + '.');
			});

			if (clipboard && clipboard != null ) {
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
					 selected_coin !== 'FRK' &&
					 selected_coin !== 'GMC') {
				getDEXGetBalance_cache(selected_coin)
        .then(function(result) {
					if ( result.interest !== undefined && selected_coin == 'KMD') {
						$(
              '#edexcoin_getbalance_interest,' +
              '#edexcoin_getbalance_total_interest'
            )
            .show();
						$('#edexcoin_getbalance_t')
              .removeClass( 'col-lg-12' )
              .addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$(
              '#edexcoin_getbalance_interest,' +
              '#edexcoin_getbalance_total_interest'
            )
            .hide();
						$('#edexcoin_getbalance_t')
              .removeClass( 'col-lg-4' )
              .addClass( 'col-lg-12' );
						$(
              '#edex_interest_balance,' +
              '#edex_total_balance_interest'
            )
            .text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else if (selected_coinmode == 'Basilisk') {
				getDEXGetBalance2(selected_coin)
        .then(function(result) {
					if ( result.interest !== undefined ) {
						$(
              '#edexcoin_getbalance_interest,' +
              '#edexcoin_getbalance_total_interest'
            )
            .show();
						$('#edexcoin_getbalance_t')
              .removeClass( 'col-lg-12' )
              .addClass( 'col-lg-4' );
						$('#edex_interest_balance').text(result.interest);
						$('#edex_total_balance_interest').text(result.totalbalance);
						$('#edex_total_interest_coincode').text(selected_coin);
						$('#edex_total_balance_interest_coincode').text(selected_coin);
					}

					if ( result.interest === undefined || selected_coin !== 'KMD') {
						$(
              '#edexcoin_getbalance_interest,' +
              '#edexcoin_getbalance_total_interest'
            )
            .hide();
						$('#edexcoin_getbalance_t')
              .removeClass( 'col-lg-4' )
              .addClass( 'col-lg-12' );
						$(
              '#edex_interest_balance,' +
              '#edex_total_balance_interest'
            )
            .text('-');
					}

					$('#edex_total_balance').text(result.total);
					$('#edex_total_balance_coincode').text(selected_coin);
				});
			} else {
				EDEXlistunspent(selected_coin)
        .then(function(result) {
					if (result[0] != undefined) {
						if ( result[0].interest !== undefined ) {
							$(
                '#edexcoin_getbalance_interest,' +
                '#edexcoin_getbalance_total_interest'
              )
              .show();
							$('#edexcoin_getbalance_t')
                .removeClass( 'col-lg-12' )
                .addClass( 'col-lg-4' );
							$('#edex_interest_balance').text(result[0].interest);
							$('#edex_total_balance_interest').text(result[0].totalbalance);
							$('#edex_total_interest_coincode').text(selected_coin);
							$('#edex_total_balance_interest_coincode').text(selected_coin);
						}

						if ( result[0].interest === undefined ) {
							$(
                '#edexcoin_getbalance_interest,' +
                '#edexcoin_getbalance_total_interest'
              )
              .hide();
							$('#edexcoin_getbalance_t')
                .removeClass( 'col-lg-4' )
                .addClass( 'col-lg-12' );
							$(
                '#edex_interest_balance,' +
                '#edex_total_balance_interest'
              )
              .text('-');
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
			if (checkAC(selected_coin)) {
				sessionStorage.setItem('edexTmpMode', selected_coinmode);
				sessionStorage.setItem('edexTmpRefresh', 'start');
				assetchain_pax_menu_actions(selected_coin);
			}
		}
	});
}