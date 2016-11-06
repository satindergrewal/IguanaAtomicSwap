var KMDWalletDashboard = function() {

	var handle_KMD_Dashboard = function() {

		$('#btn_kmd_wallet_dashboard').click(function() {
            //console.log('kmd wallet dashbaord button clicked...');
            $('#kmd_wallet_dashoard_section').show();
            getKMDBalanceT();
            getKMDBalanceTotal();
            getKMDWalletInfo();
            getKMDInfo();

        });
	}

	return {
        //main function to initiate the module
        init: function() {
            handle_KMD_Dashboard();
            RunInitFunctions();
        }
    };

}();

jQuery(document).ready(function() {
    //KMDWalletDashboard.init();
});


function RunInitFunctions() {
	getKMDBalanceT();
    getKMDBalanceTotal();
    getKMDWalletInfo();
    getKMDInfo();
}

function getKMDBalanceT() {
	var ajax_data = {"agent":"komodo","method":"passthru","function":"getbalance","hex":""}
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            //console.log(AjaxOutputData);
            $('#kmd_transparent_balance').text(AjaxOutputData);
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


function getKMDBalanceZ() {
	var ajax_data = {"agent":"komodo","method":"passthru","function":"z_getbalance","hex":""}
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            //console.log(AjaxOutputData);
            $('#kmd_private_balance').text(AjaxOutputData);
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

function getKMDBalanceTotal() {
	var kmd_T_balance = parseFloat($('#kmd_transparent_balance').text());
	var kmd_Z_balance = parseFloat($('#kmd_private_balance').text());
	var kmd_total_balance = kmd_T_balance + kmd_Z_balance;
	$('#kmd_total_tz_balance').text(kmd_total_balance.toFixed(4));
}


function getKMDWalletInfo() {
	var ajax_data = {"agent":"komodo","method":"passthru","function":"getwalletinfo","hex":""}
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            //console.log(AjaxOutputData);
            $('#kmd_walletversion').text(AjaxOutputData.walletversion);
            $('#kmd_balance').text(AjaxOutputData.balance);
            $('#kmd_unconfirmed_balance').text(AjaxOutputData.unconfirmed_balance);
            $('#kmd_immature_balance').text(AjaxOutputData.immature_balance);
            $('#KMDTotalTransactionsCount').text(AjaxOutputData.txcount);
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


function getKMDInfo() {
	var ajax_data = {"agent":"komodo","method":"passthru","function":"getinfo","hex":""}
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            //console.log(AjaxOutputData);
            $('#kmd_version').text(AjaxOutputData.version);
            $('#kmd_protocolversion').text(AjaxOutputData.protocolversion);
            $('#kmd_notarized').text(AjaxOutputData.notarized);
            $('#kmd_notarizedhash').text(AjaxOutputData.notarizedhash);
            $('#kmd_notarizedbtc').text(AjaxOutputData.notarizedbtc);
            $('#kmd_blocks').text(AjaxOutputData.blocks);
            $('#kmd_connections').text(AjaxOutputData.connections);
            $('#kmd_difficulty').text(AjaxOutputData.difficulty);
            $('#kmd_testnet').text(AjaxOutputData.testnet);
            $('#kmd_paytxfee').text(AjaxOutputData.paytxfee);
            $('#kmd_relayfee').text(AjaxOutputData.relayfee);
            $('#kmd_errors').text(AjaxOutputData.errors);
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