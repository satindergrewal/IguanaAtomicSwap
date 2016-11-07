var KMDWalletDashboard = function() {

	var handle_KMD_Dashboard = function() {

		$('#btn_kmd_wallet_dashboard').click(function() {
            //console.log('kmd wallet dashbaord button clicked...');
            $('#kmd_wallet_dashoard_section').show();
            getTotalKMDBalance();
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
	getTotalKMDBalance();
    getKMDWalletInfo();
    getKMDInfo();
}

function getTotalKMDBalance() {
	var ajax_data = {"agent":"komodo","method":"passthru","function":"z_gettotalbalance","hex":"3100"}
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
            $('#kmd_transparent_balance').text(AjaxOutputData.transparent);
            $('#kmd_private_balance').text(AjaxOutputData.private);
            $('#kmd_total_tz_balance').text(AjaxOutputData.total);
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
            //$('#kmd_transparent_balance').text(AjaxOutputData);
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
            //$('#kmd_private_balance').text(AjaxOutputData);
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


function KMDlistunspentT() {
	var result = [];

	var ajax_data = {"agent":"komodo","method":"passthru","function":"listunspent","hex":""}
    //console.log(ajax_data);
    $.ajax({
    	async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data); //Ajax output gets the whole list of unspent coin with addresses
            //console.log('== Data OutPut ==');
            //console.log(AjaxOutputData);
            var unique_addresses  = _.keys(_.countBy(AjaxOutputData, function(data) { return data.address; })); //This code using undscore.js takes only the address into an array which are unique in that list
            
            // This function calls each unique address and calculates the total amount of coins in it.
            $.each(unique_addresses, function(index) {
				//console.log(unique_addresses[index]);
				var unique_addr_tmp_array = _.where(AjaxOutputData, {address: unique_addresses[index]});
				//console.log(unique_addr_tmp_array);

				var tmpcalcnum = 0;
				$.each(unique_addr_tmp_array, function(index, value) {
					//console.log(value.amount);
					tmpcalcnum = tmpcalcnum + value.amount;
				});
				//console.log(tmpcalcnum);
				var tmp_addr_total_balance_output = {"addr": unique_addr_tmp_array[0].address, "total": tmpcalcnum};
				//console.log(tmp_addr_total_balance_output);
				result.push(tmp_addr_total_balance_output);

			});
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
    //console.log(result);
    return result;
}