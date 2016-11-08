var KMDWalletDashboard = function() {

	var handle_KMD_Dashboard = function() {

		$('#btn_kmd_wallet_dashboard').click(function() {
            //console.log('kmd wallet dashbaord button clicked...');
            $('#kmd_wallet_dashoard_section').show();
            $('#kmd_wallet_dashboardinfo').show();
			$('#kmd_wallet_send').hide();
            getTotalKMDBalance();
            getKMDWalletInfo();
            getKMDInfo();

        });
	}

	var handle_KMD_Send = function() {

		$('#btn_kmd_wallet_send').click(function() {
			//console.log('kmd wallet send button clicked...');
			var tmpoptions = '';

			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_send').show();
			
			var kmd_addr_list_with_balance = KMDlistunspentT();
			//console.log(kmd_addr_list_with_balance);

			tmpoptions += '<option> - Select Transparent or Private KMD Address - </option>';
			$.each(kmd_addr_list_with_balance, function(index) {
				tmpoptions += '<option value="' + kmd_addr_list_with_balance[index].addr + '" data-total="' + kmd_addr_list_with_balance[index].total.toFixed(8) + '">' + kmd_addr_list_with_balance[index].addr + ' &emsp;[ ' + kmd_addr_list_with_balance[index].total.toFixed(8) + ' KMD ]</option>';
				$('#kmd_wallet_send_from').html(tmpoptions);
			});

			var kmd_z_addr_list_with_balance = KMDListaddrZ();
			//console.log(kmd_z_addr_list_with_balance);
			$.each(kmd_z_addr_list_with_balance, function(index) {
				tmpoptions += '<option value="' + kmd_z_addr_list_with_balance[index].addr + '" data-total="' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + '">' + kmd_z_addr_list_with_balance[index].addr + ' &emsp;[ ' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + ' KMD ]</option>';
				$('#kmd_wallet_send_from').html(tmpoptions);
			});

			$('.showkmdwalletaddrs').selectpicker({ style: 'btn-info' });
		});

		$('.showkmdwalletaddrs').on('change', function(){
			var selected = $(this).find("option:selected").val();
			//console.log(selected);
			//console.log($(this).find("option:selected").data('total'));
		});

		$('#kmd_wallet_amount').keyup(function() {
			var sum_val1 = parseFloat($('#kmd_wallet_amount').val())
			var sum_val2 = parseFloat($('#kmd_wallet_fee').val())
			var total_minus_currency_fee = sum_val1 - sum_val2;			
			var mdl_send_btn = $('#kmd_wallet_send_btn');

			//console.log($('#kmd_wallet_amount').val());
			$('#kmd_wallet_total_value').text(total_minus_currency_fee.toFixed(8));

			if ($('#kmd_wallet_amount').val() != '' && $('#kmd_wallet_sendto') != '' && $('#kmd_wallet_fee') != '' ) {
				mdl_send_btn.removeClass('disabled');
				mdl_send_btn.attr('data-dismiss','modal');
				mdl_send_btn.attr('data-target','#SendCoinModelStep2');
				mdl_send_btn.attr('onclick','ConfirmsendCurrency($(this).data())')
			} else {
				mdl_send_btn.addClass('disabled');
				mdl_send_btn.removeAttr('data-dismiss');
				mdl_send_btn.removeAttr('data-target');
				mdl_send_btn.removeAttr('onclick');
			}
		});

		$('#kmd_wallet_send_coins_btn').click(function() {
			console.log('send button clicked in form...')
		});

		/*$('.md-refresh-alt').click(function() {
			if ( $(this).data('load-callback') === 'KMDSendScreenRefreshCallback' ) {
				//handle_KMD_Send();
			}
		});*/
	}

	return {
        //main function to initiate the module
        init: function() {
            handle_KMD_Dashboard();
            handle_KMD_Send();
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





function KMDListaddrZ() {
	var result = [];

	var ajax_data = {"agent":"komodo","method":"passthru","function":"z_listaddresses","hex":""}
    //console.log(ajax_data);
    $.ajax({
    	async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data); //Ajax output gets the whole list of unspent coin with addresses
            //console.log('== Data OutPut of z_listaddresses ==');
            //console.log(AjaxOutputData);
            //This code gets list of all z_addresses into an array
            
            // This function calls each address and then gets the total amount of coins in it.
            $.each(AjaxOutputData, function(index, value) {
				//console.log(value);
				var ajax_data_to_hex = '["'+ value +'",1]';
				var tmpZaddrs_output = Iguana_HashHex(ajax_data_to_hex);
				//console.log(tmpZaddrs_output);

				var ajax_data_zaddrbalance = {"agent":"komodo","method":"passthru","function":"z_getbalance","hex":tmpZaddrs_output}
			    //console.log(ajax_data_zaddrbalance);
			    $.ajax({
			    	async: false,
			        type: 'POST',
			        data: JSON.stringify(ajax_data_zaddrbalance),
			        url: 'http://127.0.0.1:7778',
			        //dataType: 'text',
			        success: function(data, textStatus, jqXHR) {
			            var AjaxOutputData = JSON.parse(data);
			            //console.log('== Data OutPut of z_getbalance ==');
			            //console.log(value);
			            //console.log(AjaxOutputData);
			            if(AjaxOutputData.hasOwnProperty('error')){
			            	AjaxOutputData = 0;
			            }
			            var tmp_Zaddr_total_balance_output = {"addr": value, "total": AjaxOutputData};
						//console.log(tmp_Zaddr_total_balance_output);
						result.push(tmp_Zaddr_total_balance_output);
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