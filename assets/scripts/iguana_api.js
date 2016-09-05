
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
    $.ajax({
        type: 'POST',
        data: JSON.stringify(addcoinValues),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var addcoinData = JSON.parse(data);
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}