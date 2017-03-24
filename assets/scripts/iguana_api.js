function IguanaAJAX(url, ajax_data) {
	return $.ajax({
		data: JSON.stringify(ajax_data),
		url: url,
		type: 'POST',
		dataType: 'json'
	})
	.fail(function(xhr, textStatus, error) {
		// handle request failures
		console.log(xhr.statusText);
		if ( xhr.readyState == 0 ) {
			Iguana_ServiceUnavailable();
		}
		console.log(textStatus);
		console.log(error);
	});
}

function Iguana_dumpwallet() {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'bitcoinrpc',
				'method': 'dumpwallet',
				'filename': ''
			};

	return_result = function () {
		var tmp = null;
		$.ajax({
			'async': false,
			'type': 'POST',
			'global': false,
			'url': 'http://127.0.0.1:' + config.iguanaPort,
			'data': JSON.stringify(ajax_data),
			'success': function (data) {
				tmp = data;
			}
		});

		return tmp;
	}();
}

function Iguana_ServiceUnavailable() {
	console.log('Network Error api');_lang[defaultLang]
	toastr.error(_lang[defaultLang].TOASTR.IGUANA_CONN_ERR_ALT, _lang[defaultLang].TOASTR.SERVICE_NOTIFICATION);
	toastr.info(_lang[defaultLang].TOASTR.IGUANA_ARE_YOU_SURE, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
	ClearOnLogout(true, true);
}

function secondsToString(seconds) {
	var a = new Date(seconds * 1000),
			months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			],
			year = a.getFullYear(),
			month = months[a.getMonth()],
			date = a.getDate(),
			hour = a.getHours(),
			min = a.getMinutes(),
			sec = a.getSeconds(),
			time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

	return time;
}

function Iguana_HashHex(data) {
	var result = '',
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': 'hash',
				'method': 'hex',
				'message': data
			};

	$.ajax({
    async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:' + config.iguanaPort,
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			result = AjaxOutputData.hex;
		},
		error: function(xhr, textStatus, error) {
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

function Iguana_SetRPCAuth() {
	var tmpPass = md5(PassPhraseGenerator.generatePassPhrase(128));
	sessionStorage.setItem('IguanaRPCAuth', tmpPass);
}

function Iguana_CheckActiveCoins() {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': 'InstantDEX',
					'method': 'allcoins'
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:' + config.iguanaPort, ajax_data).done(function(data) {
					console.log(data);
					var result = [];

					AjaxOutputData = JSON.parse(AjaxOutputData.responseText);
					$.each(AjaxOutputData, function( index, value ) {
						if ( index === 'tag' ) {

						} else {
							if (AjaxOutputData[index].length !== 0 ) {
								result.push({ 'active': AjaxOutputData[index].length });
							}
						}
					});

					resolve(result);
				})
				.fail(function(xhr, textStatus, error) {
				// handle request failures
				console.log(xhr.statusText);
				if ( xhr.readyState == 0 ) {
				}
				console.log(textStatus);
				console.log(error);
		})
	});
}

function Iguana_utxorawtx(data) {
  var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      ajax_data = {
        'userpass': tmpIguanaRPCAuth,
        'symbol': data.coin,
        'agent': 'basilisk',
        'method': 'utxorawtx',
        'vals': {
          'timelock': 0,
          'changeaddr': data.sendfrom,
          'destaddr': data.sendtoaddr,
          'txfee': data.txfee,
          'amount': data.amount,
          'sendflag': data.sendsig
        },
        'utxos': data.utxos
      };

  return new Promise((resolve) => {
    console.log(ajax_data);
    $.ajax({
      data: JSON.stringify(ajax_data),
      url: 'http://127.0.0.1:' + config.iguanaPort,
      type: 'POST',
      dataType: 'json'
    })
    .then(result => {
      console.log(result);
      resolve(result);
    });
  });
}

function checkAC(coinVal) {
	if (coinVal == 'SUPERNET' ||
			coinVal == 'REVS' ||
			coinVal == 'WIRELESS' ||
			coinVal == 'DEX' ||
			coinVal == 'PANGEA' ||
			coinVal == 'JUMBLR' ||
			coinVal == 'BET' ||
			coinVal == 'CRYPTO' ||
			coinVal == 'HODL' ||
			coinVal == 'SHARK' ||
			coinVal == 'BOTS' ||
			coinVal == 'MGW' ||
			coinVal == 'MVP' ||
			coinVal == 'KV' ||
			coinVal == 'CEAL' ||
			coinVal == 'MESH' ||
			coinVal == 'USD' ||
			coinVal == 'RON' ||
			coinVal == 'EUR' ||
			coinVal == 'JPY' ||
			coinVal == 'GBP' ||
			coinVal == 'AUD' ||
			coinVal == 'CAD' ||
			coinVal == 'CHF' ||
			coinVal == 'NZD' ||
			coinVal == 'CNY' ||
			coinVal == 'RUB' ||
			coinVal == 'MXN' ||
			coinVal == 'BRL' ||
			coinVal == 'INR' ||
			coinVal == 'HKD' ||
			coinVal == 'TRY' ||
			coinVal == 'ZAR' ||
			coinVal == 'PLN' ||
			coinVal == 'NOK' ||
			coinVal == 'SEK' ||
			coinVal == 'DKK' ||
			coinVal == 'CZK' ||
			coinVal == 'HUF' ||
			coinVal == 'ILS' ||
			coinVal == 'KRW' ||
			coinVal == 'MYR' ||
			coinVal == 'PHP' ||
			coinVal == 'SGD' ||
			coinVal == 'THB' ||
			coinVal == 'BGN' ||
			coinVal == 'IDR' ||
			coinVal == 'HRK')	{
		return true;
	} else {
		return false;
	}
}

function formatBytes(bytes, decimals) {
  if (bytes == 0)
   	return '0 Bytes';

  var k = 1000,
      dm = decimals + 1 || 3,
      sizes = [
      	'Bytes',
       	'KB',
       	'MB',
       	'GB',
       	'TB',
       	'PB',
       	'EB',
       	'ZB',
       	'YB'
      ],
      i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
  	'ramsize': parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
   	'size': sizes[i]
  };
}