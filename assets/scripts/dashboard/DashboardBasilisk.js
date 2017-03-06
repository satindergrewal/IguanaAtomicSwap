function ShowBasiliskFetchDataProgress(coin) {
	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	Shepherd_GetBasiliskCache().then(function(result) {
    var _data = JSON.parse(result),
    		query = _data.result.basilisk,
        coin_exists = true,
        addresses_exists = true,
        getbalance_exists = true,
        listtransactions_exists = true,
        listunspent_exists = true,
        refresh_exists = true,
        getbalance_status = 'NOT FOUND',
        listtransactions_status = 'NOT FOUND',
        listunspent_status = 'NOT FOUND',
        refresh_status = 'NOT FOUND',
        res_data;
    //console.log(query)

    if (!query) {
      //console.log('data not found.')
      res_data = {
      	'coin': false,
      	'addresses': false,
      	'getbalance': false,
      	'listtransactions': false,
      	'listunspent': false,
      	'refresh': false
      };
      //console.log(res_data)
    } else if (!query[coin]) {
      //console.log(coin + ' not found.')
      coin_exists = false;
      res_data = {
    		'coin': coin_exists,
    		'addresses': false,
    		'getbalance': false,
    		'listtransactions': false,
    		'listunspent': false,
    		'refresh': false
    	};
      //console.log(res_data)
    } else if (!('addresses' in query[coin])) {
      //console.log(coin + ' addresses not found.')
      addresses_exists = false;
      res_data = {
      	'coin': coin_exists,
      	'addresses': false,
      	'getbalance': false,
      	'listtransactions': false,
      	'listunspent': false,
      	'refresh': false
      };
      //console.log(res_data)
    } else {
      Promise.all(query[coin].addresses.map((coinaddr_value,coinaddr_index) => {
        return new Promise((resolve, reject) => {
          //console.log(coinaddr_index)
          //console.log(coinaddr_value)
          var data = query[coin][coinaddr_value].getbalance;
          //console.log(data)

          if (!('getbalance' in query[coin][coinaddr_value])) {
            //console.log(coin + '>>>' + coinaddr_value + ' => getbalance not found.')
            getbalance_exists = false;
          } else {
            //console.log(query[coin][coinaddr_value].getbalance.status)
            getbalance_status = query[coin][coinaddr_value].getbalance.status;
          }

          if (!('listtransactions' in query[coin][coinaddr_value])) {
            //console.log(coin + '>>>' + coinaddr_value + ' => listtransactions not found.')
            listtransactions_exists = false;
          } else {
            //console.log(query[coin][coinaddr_value].listtransactions.status)
            listtransactions_status = query[coin][coinaddr_value].listtransactions.status;
          }

          if (!('listunspent' in query[coin][coinaddr_value])) {
            //console.log(coin + '>>>' + coinaddr_value + ' => listunspent not found.')
            listunspent_exists = false;
          } else {
            //console.log(query[coin][coinaddr_value].listunspent.status)
            listunspent_status = query[coin][coinaddr_value].listunspent.status;
          }

          if (!('refresh' in query[coin][coinaddr_value])) {
            //console.log(coin + '>>>' + coinaddr_value + ' => refresh not found.')
            refresh_exists = false;
          } else {
            //console.log(query[coin][coinaddr_value].refresh.status)
            refresh_status = query[coin][coinaddr_value].refresh.status;
          }

          pass_data = {
            'addr_index': coinaddr_index,
            'addr_value': coinaddr_value,
            'getbalance': getbalance_exists,
            'getbalance_status': getbalance_status,
            'listtransactions': listtransactions_exists,
            'listtransactions_status': listtransactions_status,
            'listunspent': listunspent_exists,
            'listunspent_status': listunspent_status,
            'refresh': refresh_exists,
            'refresh_status': refresh_status
          };

          resolve(pass_data);
        });
      }))
      .then(result => {
         //console.log(result);
				//var res_data.coin = coin_exists;
				//var res_data.addresses = addresses_exists;
				var BasiliskFetchData = '';
          
        $.each(result, function(result_index, result_val) {
          //console.log(result_index);
          //console.log(result_val);

          var tmp_listunspent_lable_color = '',
         			tmp_listtransactions_lable_color = '',
          		tmp_getbalance_lable_color = '',
          		tmp_refresh_lable_color = '';

          switch (result_val.listunspent_status) {
            case 'waiting':
              tmp_listunspent_lable_color = 'dark';
              break;
            case 'in progress':
              tmp_listunspent_lable_color = 'primary';
              break;
            case 'done':
              tmp_listunspent_lable_color = 'success';
              break;
            case 'NOT FOUND':
              tmp_listunspent_lable_color = 'danger';
              break;
          }

          switch (result_val.listtransactions_status) {
            case 'waiting':
              tmp_listtransactions_lable_color = 'dark';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'in progress':
              tmp_listtransactions_lable_color = 'primary';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'done':
              tmp_listtransactions_lable_color = 'success';
              $('#edexcoin_dashboard_basilisk_refresh_status').hide();
              break;
            case 'NOT FOUND':
              tmp_listtransactions_lable_color = 'danger';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
          }

          switch (result_val.getbalance_status) {
            case 'waiting':
              tmp_getbalance_lable_color = 'dark';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'in progress':
              tmp_getbalance_lable_color = 'primary';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'done':
              tmp_getbalance_lable_color = 'success';
              $('#edexcoin_dashboard_basilisk_refresh_status').hide();
              break;
            case 'NOT FOUND':
              tmp_getbalance_lable_color = 'danger';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
          }

          switch (result_val.refresh_status) {
            case 'waiting':
              tmp_refresh_lable_color = 'dark';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'in progress':
              tmp_refresh_lable_color = 'primary';
              $('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
            case 'done':
              tmp_refresh_lable_color = 'success';
              $('#edexcoin_dashboard_basilisk_refresh_status').hide();
              break;
            case 'NOT FOUND':
              tmp_refresh_lable_color = 'danger';
              //$('#edexcoin_dashboard_basilisk_refresh_status').show();
              break;
          }

          BasiliskFetchData += '<tr>';
          BasiliskFetchData += '<td>' + result_val.addr_value.substring(0,5) + '...</td>';
          BasiliskFetchData += '<td>' +
          												'<span class="label label-' + tmp_listunspent_lable_color + ' text-uppercase">' + result_val.listunspent_status + '</span>' +
          										 '</td>';
          BasiliskFetchData += '<td>' +
          												'<span class="label label-' + tmp_listtransactions_lable_color + ' text-uppercase">' + result_val.listtransactions_status + '</span>' +
          										 '</td>';
          BasiliskFetchData += '<td>' +
          												'<span class="label label-' + tmp_getbalance_lable_color + ' text-uppercase">' + result_val.getbalance_status + '</span>' +
          										 '</td>';
          BasiliskFetchData += '<td>' +
          												'<span class="label label-' + tmp_refresh_lable_color + ' text-uppercase">' + result_val.refresh_status + '</span>' +
          										 '</td>';
          BasiliskFetchData += '</tr>';
          $('.tbl_edexcoin_dashboard_basilisk_refresh_status tbody').html(BasiliskFetchData);
          //console.log(result_val.refresh_status)

          /*if (result[result.length-1] == result_val && result_val.listtransactions_status !== 'done' && result_val.getbalance_status !== 'done' && result_val.refresh_status !== 'done' ) {
              $('#edexcoin_dashboard_basilisk_refresh_status').show()
          } else {
              $('#edexcoin_dashboard_basilisk_refresh_status').hide()
          }*/
        });
      });
    } 
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
				toastr.success(switch_data.currency + ' ' + _lang[defaultLang].TOASTR.SWITCHED_TO + ' ' + mode_value + ' ' + _lang[defaultLang].TOASTR.MODE, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
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
				toastr.error(_lang[defaultLang].TOASTR.IGUANA_CONN_ERR, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
			}
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