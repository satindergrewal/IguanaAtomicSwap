function Shepherd_getConf(coin) {
	var result = [],
			ajax_data = { 'chain': coin };

	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:17777/shepherd/getconf',
		contentType: 'application/json', // send as JSON
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log(AjaxOutputData['result']);
			result.push({ 'path': AjaxOutputData['result'] });
		},
		error: function(xhr, textStatus, error) {
			//console.log(xhr.statusText);
			//if ( xhr.readyState == 0 ) {
			//}
			//console.log(textStatus);
			//console.log(error);
		}
	});

	return result;
}

function Shepherd_setConf(coin) {
	var result = [],
			ajax_data = { 'chain': coin };

	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:17777/shepherd/setconf',
		contentType: 'application/json', // send as JSON
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log(AjaxOutputData);
			result.push({ 'result': AjaxOutputData['msg'] });
		},
		error: function(xhr, textStatus, error) {
			//console.log(xhr.statusText);
			//if ( xhr.readyState == 0 ) {
			//}
			//console.log(textStatus);
			//console.log(error);
		}
	});

	return result;
}

function Shepherd_herd(coin,herd_data) {
	var result = [];
			ajax_data = {
				'herd': coin,
				'options': herd_data
			};

	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:17777/shepherd/herd',
		contentType: 'application/json', // send as JSON
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log(AjaxOutputData);
			result.push({ 'result': AjaxOutputData['msg'] });
		},
		error: function(xhr, textStatus, error) {
			//console.log(xhr.statusText);
			//if ( xhr.readyState == 0 ) {
			//}
			//console.log(textStatus);
			//console.log(error);
		}
	});

	return result;
}

function Shepherd_herdlist(data) {
	return new Promise((resolve) => {
		var ajax_data_1 = { 'herdname': data },
				ajax_call_1 = $.ajax({
					data: JSON.stringify(ajax_data_1),
					url: 'http://127.0.0.1:17777/shepherd/herdlist',
					type: 'POST',
					contentType: 'application/json'
				});

		ajax_call_1.done(function(data) {
			resolve(data);
		});
	});
}

function Shepherd_FetchBasiliskData(req_data) {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				parse_session_data = sessionStorage.getItem('IguanaActiveAccount');

		parse_session_data = JSON.parse(JSON.parse(parse_session_data));

		var session_pubkey = parse_session_data.pubkey,
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'pubkey': session_pubkey
				};

    console.log(req_data)
    if (req_data.allcoins !== false ) {
      var req_url = 'http://127.0.0.1:17777/shepherd/cache-all';
    } else {
      var req_url = 'http://127.0.0.1:17777/shepherd/cache-one';
      ajax_data.coin = req_data.coin;
      ajax_data.calls = req_data.calls;
    }

    console.log(ajax_data)

		$.ajax({
			type: 'GET',
			data: ajax_data,
			url: req_url,
			contentType: 'application/json', // send as JSON
		}).done(function(data) {
			resolve(data);
		});
	});
}

function Shepherd_GroomData_Get() {
  return new Promise((resolve) => {
    var parse_session_data = sessionStorage.getItem('IguanaActiveAccount');
    parse_session_data = JSON.parse(JSON.parse(parse_session_data));
    var request_method = '',
    		session_pubkey = parse_session_data.pubkey,
    		ajax_data = { 'filename': session_pubkey },
      	req_url = 'http://127.0.0.1:17777/shepherd/groom';

    console.log(ajax_data);
    $.ajax({
      type: 'GET',
      data: ajax_data,
      url: req_url,
      contentType: 'application/json', // send as JSON
    }).done(function(data) {
      var res_data = JSON.parse(data);
      resolve(res_data.result);
    });
  });
}

function Shepherd_GroomData_Post(req_data) {
  return new Promise((resolve) => {
    var parse_session_data = sessionStorage.getItem('IguanaActiveAccount');
    parse_session_data = JSON.parse(JSON.parse(parse_session_data));
    var request_method = '',
    		session_pubkey = parse_session_data.pubkey,
    		ajax_data = {
    			'filename': session_pubkey,
    			'payload': JSON.stringify(req_data)
    		},
    		req_url = 'http://127.0.0.1:17777/shepherd/groom';

    console.log(req_data);
    console.log(ajax_data);

    $.ajax({
      type: 'POST',
      data: ajax_data,
      url: req_url,
      dataType: 'json'
    }).done(function(data) {
      var res_data = JSON.parse(data);
      resolve(res_data);
    });
  });
}

function Shepherd_GroomData_Delete() {
  return new Promise((resolve) => {
    var parse_session_data = sessionStorage.getItem('IguanaActiveAccount');
    parse_session_data = JSON.parse(JSON.parse(parse_session_data));
    var request_method = '',
        session_pubkey = parse_session_data.pubkey,
        ajax_data = {
          'filename': session_pubkey
        },
        req_url = 'http://127.0.0.1:17777/shepherd/groom';

    $.ajax({
      type: 'DELETE',
      data: ajax_data,
      url: req_url,
      dataType: 'json'
    })
    .done(function(data) {
      resolve(data);
    });
  });
}

function Shepherd_GetBasiliskCache() {
	return new Promise((resolve) => {
		var parse_session_data = sessionStorage.getItem('IguanaActiveAccount');
		parse_session_data = JSON.parse(JSON.parse(parse_session_data));
		var session_pubkey = parse_session_data.pubkey,
				ajax_data = { 'pubkey': session_pubkey };

		$.ajax({
			type: 'GET',
			data: ajax_data,
			url: 'http://127.0.0.1:17777/shepherd/cache',
			contentType: 'application/json' // send as JSON
		}).done(function(data) {
			resolve(data);
		});
	});
}

function Shepherd_CheckBasiliskCacheData(coin) {
  return new Promise((resolve) => {
    Shepherd_GetBasiliskCache().then(function(result) {
      var _data = JSON.parse(result),
      		query = _data.result.basilisk,
          coin_exists = true,
          addresses_exists = true,
          getbalance_exists = true,
          listtransactions_exists = true,
          listunspent_exists = true,
          refresh_exists = true;

      if (!query) {
        console.log('data not found.');
        var res_data = {
		        	'coin': false,
		        	'addresses': false,
		        	'getbalance': false,
		        	'listtransactions': false,
		        	'listunspent': false,
		        	'refresh': false
		        };
        resolve(res_data);
      } else if (!query[coin]) {
          console.log(coin + ' not found.');
          coin_exists = false;
          var res_data = {
          			'coin': coin_exists,
          			'addresses': false,
          			'getbalance': false,
          			'listtransactions': false,
          			'listunspent': false,
          			'refresh': false
          		};
          resolve(res_data);
      } else if (!('addresses' in query[coin])) {
          console.log(coin + ' addresses not found.');
          addresses_exists = false;
          res_data = {
          	'coin': coin_exists,
          	'getbalance': false,
          	'listtransactions': false,
          	'listunspent': false,
          	'refresh': false
          };
          resolve(res_data)
      } else {
        Promise.all(query[coin].addresses.map((coinaddr_value,coinaddr_index) => {
          return new Promise((resolve, reject) => {
            var data = query[coin][coinaddr_value].getbalance;

            if (!('getbalance' in query[coin][coinaddr_value])) {
              //console.log(coin + '>>>' + coinaddr_value + ' => getbalance not found.')
              getbalance_exists = false;
            }

            if (!('listtransactions' in query[coin][coinaddr_value])) {
              //console.log(coin + '>>>' + coinaddr_value + ' => listtransactions not found.')
              listtransactions_exists = false;
            }

            if (!('listunspent' in query[coin][coinaddr_value])) {
              //console.log(coin + '>>>' + coinaddr_value + ' => listunspent not found.')
              listunspent_exists = false;
            }

            if (!('refresh' in query[coin][coinaddr_value])) {
              //console.log(coin + '>>>' + coinaddr_value + ' => refresh not found.')
              refresh_exists = false;
            }

            pass_data = {
            	'getbalance': getbalance_exists,
            	'listtransactions': listtransactions_exists,
            	'listunspent': listunspent_exists,
            	'refresh': refresh_exists
            };
            resolve(pass_data);
          });
        })).then(result => {
          var res_data = result[result.length - 1];
          res_data.coin = coin_exists;
          res_data.addresses = addresses_exists;
          resolve(res_data);
        });
      }
    });
  });
}