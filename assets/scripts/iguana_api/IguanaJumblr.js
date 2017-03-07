function Iguana_Jumblr_SetPassphrase(data) {
  return new Promise((resolve) => {
    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        ajax_data = {
            'userpass': tmpIguanaRPCAuth,
            'agent': 'jumblr',
            'method': 'setpassphrase',
            'passphrase': data.passphrase
        };

    $.ajax({
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:' + config.iguanaPort,
        type: 'POST',
        dataType: 'json'
    }).done(function(data) {
        resolve(data);
    });
  });
}

function Iguana_Jumblr_Status() {
  return new Promise((resolve) => {
    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        ajax_data = {
            'userpass': tmpIguanaRPCAuth,
            'agent': 'jumblr',
            'method': 'status'
        };

    $.ajax({
      data: JSON.stringify(ajax_data),
      url: 'http://127.0.0.1:' + config.iguanaPort,
      type: 'POST',
      dataType: 'json'
    }).done(function(data) {
      resolve(data);
    });
  });
}