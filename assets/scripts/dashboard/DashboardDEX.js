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
				toastr.error(_lang[defaultLang].TOASTR.LESS_RESPONSES_REQ, _lang[defaultLang].BASILISK_NOTIFICATION);
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