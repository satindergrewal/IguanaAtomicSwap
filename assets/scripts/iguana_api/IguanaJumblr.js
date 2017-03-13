function Generic_Iguana_Jumblr(ajax_data, resolve) {
  var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

  ajax_data.userpass = tmpIguanaRPCAuth;
  $.ajax({
    data: JSON.stringify(ajax_data),
    url: 'http://127.0.0.1:' + config.iguanaPort,
    type: 'POST',
    dataType: 'json'
  })
  .done(function(data) {
    resolve(data);
  });
}

function Iguana_Jumblr_SetPassphrase(data) {
  var ajax_data = {
        'agent': 'jumblr',
        'method': 'setpassphrase',
        'passphrase': data.passphrase
      };

  return new Promise((resolve) => {
    Generic_Iguana_Jumblr(ajax_data, resolve);
  });
}

function Iguana_Jumblr_Status() {
  var ajax_data = {
        'agent': 'jumblr',
        'method': 'status'
      };

  return new Promise((resolve) => {
    Generic_Iguana_Jumblr(ajax_data, resolve);
  });
}