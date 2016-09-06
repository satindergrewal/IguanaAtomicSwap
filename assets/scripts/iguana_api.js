
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
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
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
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(error);
            return false;
        }
    });
    return 'Executed Iguana_activehandle. Check Iguana_activehandle_output var value.';
}

function Iguana_Setactivehandle() {    

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
            var AjaxOutputDataToStore = JSON.stringify(data);
            sessionStorage.setItem('IguanaActiveAccount', AjaxOutputDataToStore);
            console.log('== SetActiveHandle Data OutPut ==');
            console.log(AjaxOutputData);
            
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(error);
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
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
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
    if ( addcoin_data.coin == 'DOGE' ) {
        var logincoinfullname = 'Dogecoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"startpend":8,"endpend":4,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DOGE","name":"Dogecoin","netmagic":"C0C0C0C0","p2p":22556,"rpc":22555,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"100000000","minconfirms":2,"genesishash":"1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691","genesis":{"hashalgo": "scrypt","version":1,"timestamp":1386325540,"nBits":"1e0ffff0","nonce":99943,"merkle_root":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69"},"alertpubkey":"04d4da7a5dae4db797d9b0644d57a5cd50e05a70f36091cd62e2fc41c98ded06340be5a43a35e185690cd9cde5d72da8f6d065b499b06f51dcfba14aad859f443a"}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'DGB' ) {
        var logincoinfullname = 'Digibyte';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"startpend":16,"endpend":8,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DGB","name":"Digibyte","netmagic":"FAC3B6DA","p2p":12024,"rpc":14022,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"7497ea1b465eb39f1c8f507bc877078fe016d6fcb6dfad3a64c98dcc6e1e8496","genesis":{"version":1,"timestamp":1389388394,"nBits":"1e0ffff0","nonce":2447652,"merkle_root":"72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad"},"alertpubkey":"04F04441C4757F356290A37C313C3772C5BC5003E898EB2E0CF365795543A7BF690C8BBBFA32EE3A3325477CE2000B7D0453EFBB203329D0F9DF34D5927D022BC9"}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'MZC' ) {
        var logincoinfullname = 'MazaCoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"MZC","name":"MazaCoin","netmagic":"f8b503df","p2p":12835,"rpc":12832,"pubval":50,"p2shval":9,"wifval":224,"txfee_satoshis":"0","minconfirms":2,"genesishash":"00000c7c73d8ce604178dae13f0fc6ec0be3275614366d44b1b4b5c6e238c60c","genesis":{"version":1,"timestamp":1390747675,"nBits":"1e0ffff0","nonce":2091390249,"merkle_root":"62d496378e5834989dd9594cfc168dbb76f84a39bbda18286cddc7d1d1589f4f"},"alertpubkey":"04f09702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284"}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'SYS' ) {
        var logincoinfullname = 'SysCoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":18,"endpend":18,"services":129,"maxpeers":256,"newcoin":"SYS","name":"SysCoin","hasheaders":0,"useaddmultisig":0,"netmagic":"f9beb4d9","p2p":8369,"rpc":8370,"pubval":0,"p2shval":5,"wifval":128,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"0000072d66e51ab87de265765cc8bdd2d229a4307c672a1b3d5af692519cf765","genesis":{"version":1,"timestamp":1450473723,"nBits":"1e0ffff0","nonce":5258726,"merkle_root":"5215c5a2af9b63f2550b635eb2b354bb13645fd8fa31275394eb161944303065"},"protover":70012,"auxpow":1}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'UNO' ) {
        var logincoinfullname = 'Unobtanium';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"UNO","name":"Unobtanium","netmagic":"03d5b503","p2p":65534,"rpc":65535,"pubval":130,"p2shval":30,"wifval":224,"txfee_satoshis":"1000000","minconfirms":2,"genesishash":"000004c2fc5fffb810dccc197d603690099a68305232e552d96ccbe8e2c52b75","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":1211565,"merkle_root":"36a192e90f70131a884fe541a1e8a5643a28ba4cb24cbb2924bd0ee483f7f484"},"alertpubkey":"04fd68acb6a895f3462d91b43eef0da845f0d531958a858554feab3ac330562bf76910700b3f7c29ee273ddc4da2bb5b953858f6958a50e8831eb43ee30c32f21d"}
        console.log(AddCoinData);
        console.log(logincoinfullname);
        console.log(logincoinmodeinfo);
    }
    if ( addcoin_data.coin == 'ZET' ) {
        var logincoinfullname = 'Zetacoin';
        var logincoinmodeinfo = '';
        if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; } else { logincoinmodeinfo = 'Basilisk'; }
        var AddCoinData = {"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"ZET","name":"Zetacoin","netmagic":"fab503df","p2p":17333,"rpc":17335,"pubval":80,"p2shval":9,"wifval":224,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"000006cab7aa2be2da91015902aa4458dd5fbb8778d175c36d429dc986f2bff4","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":2089928209,"merkle_root":"d0227b8c3e3d07bce9656b3d9e474f050d23458aaead93357dcfdac9ab9b79f9"},"alertpubkey":"045337216002ca6a71d63edf062895417610a723d453e722bf4728996c58661cdac3d4dec5cecd449b9086e9602b35cc726a9e0163e1a4d40f521fbdaebb674658"}
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
                Iguana_Setactivehandle();
                console.log('coin added');
                toastr.success(logincoinfullname+" started in "+ logincoinmodeinfo +" Mode", "Coin Notification");
                //if ( typeof addcoin_data.reload == 'undefined' || addcoin_data.reload != false ) {
                    $(document).ready(function() { Dashboard.init(); });
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
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(error);
        }
    });
}

function ExecuteAddCoinFn() {
    var addcoin_selected_mode_val = $("input[name='addcoin_select_mode_mdl']:checked").val();
    var addcoin_selected_coinname_code_val = $("option:selected","#addcoin_select_coin_mdl_options").val();
    var ExecAddCoinData = {"coin": addcoin_selected_coinname_code_val, "mode": addcoin_selected_mode_val}
    Iguana_addcoin(ExecAddCoinData);
}

function Iguana_ServiceUnavailable() {
    console.log('Network Error with history api');
    toastr.error("Unable to connect with iguana service. 127.0.0.1:7778", "Service Notification")
    toastr.info("Are you sure Iguana is running?", "Account Notification")
}