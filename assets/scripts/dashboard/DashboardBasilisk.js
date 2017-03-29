function ShowBasiliskFetchDataProgress(coin) {
	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

	Shepherd_GetBasiliskCache()
  .then(function(result) {
    var _data = JSON.parse(result),
        NOT_FOUND = 'NOT FOUND',
    		query = _data.result.basilisk,
        coin_exists = true,
        addresses_exists = true,
        getbalance_exists = true,
        listtransactions_exists = true,
        listunspent_exists = true,
        refresh_exists = true,
        getbalance_status = NOT_FOUND,
        listtransactions_status = NOT_FOUND,
        listunspent_status = NOT_FOUND,
        refresh_status = NOT_FOUND,
        res_data;

    res_data = {
      'addresses': false,
      'getbalance': false,
      'listtransactions': false,
      'listunspent': false,
      'refresh': false
    }

    if (!query) {
      res_data.coin = false;
    } else if (!query[coin]) {
      coin_exists = false;
      res_data.coin = coin_exists;
    } else if (!('addresses' in query[coin])) {
      addresses_exists = false;
      res_data.coin = coin_exists;
    } else {
      Promise.all(query[coin].addresses.map((coinaddr_value,coinaddr_index) => {
        return new Promise((resolve, reject) => {
          var data = query[coin][coinaddr_value].getbalance;

          if (!('getbalance' in query[coin][coinaddr_value])) {
            getbalance_exists = false;
          } else {
            getbalance_status = query[coin][coinaddr_value].getbalance.status;
          }

          if (!('listtransactions' in query[coin][coinaddr_value])) {
            listtransactions_exists = false;
          } else {
            listtransactions_status = query[coin][coinaddr_value].listtransactions.status;
          }

          if (!('listunspent' in query[coin][coinaddr_value])) {
            listunspent_exists = false;
          } else {
            listunspent_status = query[coin][coinaddr_value].listunspent.status;
          }

          if (!('refresh' in query[coin][coinaddr_value])) {
            refresh_exists = false;
          } else {
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
				var BasiliskFetchData = '';

        $.each(result, function(result_index, result_val) {
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
            case NOT_FOUND:
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
            case NOT_FOUND:
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
            case NOT_FOUND:
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
            case NOT_FOUND:
              tmp_refresh_lable_color = 'danger';
              break;
          }

          BasiliskFetchData += 
            '<tr>';
              '<td>' + result_val.addr_value.substring(0,5) + '...</td>' +
              '<td>' +
          		  '<span class="label label-' + tmp_listunspent_lable_color + ' text-uppercase">' + result_val.listunspent_status + '</span>' +
          		'</td>' +
              '<td>' +
          		  '<span class="label label-' + tmp_listtransactions_lable_color + ' text-uppercase">' + result_val.listtransactions_status + '</span>' +
          		'</td>' +
              '<td>' +
          		  '<span class="label label-' + tmp_getbalance_lable_color + ' text-uppercase">' + result_val.getbalance_status + '</span>' +
          		'</td>' +
              '<td>' +
          			'<span class="label label-' + tmp_refresh_lable_color + ' text-uppercase">' + result_val.refresh_status + '</span>' +
          		'</td>' +
            '</tr>';
          $('.tbl_edexcoin_dashboard_basilisk_refresh_status tbody').html(BasiliskFetchData);
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
		url: 'http://127.0.0.1:' + config.iguanaPort + '/api/iguana/addcoin',
		dataType: 'text',
		success: function(data, textStatus, jqXHR) {
			var SwitchCoinDataOutput = JSON.parse(data);

			if (SwitchCoinDataOutput.result === 'coin added') {
				console.log('coin added');
				toastr.success(switch_data.currency + ' ' + _lang[defaultLang].TOASTR.SWITCHED_TO + ' ' + mode_value + ' ' + _lang[defaultLang].TOASTR.MODE, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
			} else if (SwitchCoinDataOutput.result === 'coin already there') {
				console.log('coin already there');
			} else if (SwitchCoinDataOutput.result === null) {
				console.log('coin already there');
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
	EDEXMainAddr(coin)
  .then(function(result){
		console.log(result);

		EDEX_DEXlistunspent(coin, result)
    .then(function(result_listunspent) {
			console.log(result_listunspent[0].amount);
			$('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text(result_listunspent[0].amount);
		});
	})
}