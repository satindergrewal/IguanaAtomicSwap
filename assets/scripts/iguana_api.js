
function Iguana_dumpwallet() {

	var ajax_data = {"agent":"bitcoinrpc","method":"dumpwallet","filename": ""};
	var return_result = function () {
		var tmp = null;
		$.ajax({
			'async': false,
			'type': 'POST',
			'global': false,
			//'dataType': 'html',
			'url': 'http://127.0.0.1:7778',
			'data': JSON.stringify(ajax_data),
			'success': function (data) {
				tmp = data;
			}
		});
		return tmp;
	}();

	//console.log(return_result);

	//comment
    /*var ajax_data = {"agent":"bitcoinrpc","method":"dumpwallet","filename": ""};
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            console.log(AjaxOutputData);
            //return AjaxOutputData;
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
    //console.log(datareturn)
    //return datareturn;*/
}


function Iguana_rmd160conv(rmd160conv_data) {
	//console.log(rmd160conv_data);
	//return rmd160conv_data;

	//comment
    var ajax_data = {"agent":"SuperNET","method":"rmd160conv","rmd160": rmd160conv_data.rmd160,"coin": rmd160conv_data.coin};
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            console.log('== Data OutPut ==');
            console.log(AjaxOutputData);
            return AjaxOutputData;
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

var Iguana_activehandle_output = ''; //Storing activehandle output this variable. accessible globally.
function Iguana_activehandle() {    

    //comment
    var ajax_data = {"agent":"SuperNET","method":"activehandle"};
    //console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== ActiveHandle Data OutPut ==');
            //console.log(AjaxOutputData);
            Iguana_activehandle_output = AjaxOutputData;
            return true;
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            return false;
        }
    });
    return 'Executed Iguana_activehandle. Check Iguana_activehandle_output var value.';
}

function Iguana_addcoinLogin(addcoin_data) {
    //var addcoinValues = {"poll":100,"active":1,"agent":"iguana","method":"addcoin","newcoin":addcoin_data.coin,"startpend":1,"endpend":1,"services":128,"maxpeers":16,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":addcoin_data.portp2p};
    console.log(addcoin_data);
    if ( addcoin_data.coin == 'BTC' ) {
        var logincoinfullname = 'Bitcoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"prefetchlag":5,"poll":1,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTC","startpend":64,"endpend":2,"services":128,"maxpeers":512,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":8333}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'BTCD' ) {
        var logincoinfullname = 'BitcoinDark';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"prefetchlag":-1,"poll":50,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTCD","startpend":8,"endpend":4,"services":129,"maxpeers":64,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":14631,"rpc":14632}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    $.ajax({
        type: 'POST',
        data: JSON.stringify(AddCoinData),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var addcoinData = JSON.parse(data);

            if (addcoinData.result === 'coin added') {
                console.log('coin added');
                toastr.success(logincoinfullname+" started in "+ logincoinmodeinfo +" Mode", "Coin Notification");
                //if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                    $( ".login-form" ).submit();
                    console.log("There was no wallet logged in. Logged in now.");
                //}
            } else if (addcoinData.result === 'coin already there') {
                console.log('coin already there');
                toastr.info("Looks like "+ logincoinfullname +" already running.", "Coin Notification");
            } else if (addcoinData.result === null) {
                console.log('coin already there');
                toastr.info("Looks like "+ logincoinfullname +" already running.", "Coin Notification");
            }
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

function Iguana_addcoin(addcoin_data) {
    //var addcoinValues = {"poll":100,"active":1,"agent":"iguana","method":"addcoin","newcoin":addcoin_data.coin,"startpend":1,"endpend":1,"services":128,"maxpeers":16,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":addcoin_data.portp2p};
    console.log(addcoin_data);
    if ( addcoin_data.coin == 'BTC' ) {
        var logincoinfullname = 'Bitcoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"prefetchlag":5,"poll":1,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTC","startpend":64,"endpend":2,"services":128,"maxpeers":512,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":8333}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'BTCD' ) {
        var logincoinfullname = 'BitcoinDark';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"prefetchlag":-1,"poll":50,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTCD","startpend":8,"endpend":4,"services":129,"maxpeers":64,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":14631,"rpc":14632}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'LTC' ) {
        var logincoinfullname = 'Litecoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":129,"maxpeers":256,"newcoin":"LTC","name":"Litecoin","hasheaders":1,"useaddmultisig":0,"netmagic":"fbc0b6db","p2p":9333,"rpc":9332,"pubval":48,"p2shval":5,"wifval":176,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1317972665,"nBits":"1e0ffff0","nonce":2084524493,"merkle_root":"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9"},"alertpubkey":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9","protover":70002}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    $.ajax({
        type: 'POST',
        data: JSON.stringify(AddCoinData),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var addcoinData = JSON.parse(data);

            if (addcoinData.result === 'coin added') {
                console.log('coin added');
                toastr.success(logincoinfullname+" started in "+ logincoinmodeinfo +" Mode", "Coin Notification");
                location.reload();
            } else if (addcoinData.result === 'coin already there') {
                console.log('coin already there');
                toastr.info("Looks like "+ logincoinfullname +" already running.", "Coin Notification");
            } else if (addcoinData.result === null) {
                console.log('coin already there');
                toastr.info("Looks like "+ logincoinfullname +" already running.", "Coin Notification");
            }
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}