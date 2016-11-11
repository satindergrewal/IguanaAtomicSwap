var KMDWalletDashboard = function() {

	var handle_KMD_Dashboard = function() {

		$('#btn_kmd_wallet_dashboard').click(function() {
            console.log('kmd wallet dashbaord button clicked...');
            console.log($(this).data());
            $('#kmd_wallet_dashoard_section').show();
            $('#kmd_wallet_dashboardinfo').show();
			$('#kmd_wallet_send').hide();
            $('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').hide();
            getTotalKMDBalance();
            KMDfillTxHistoryT();

        });
	}

	var handle_KMD_Send = function() {

		$('#btn_kmd_wallet_send').click(function() {
			
			//console.log('kmd wallet send button clicked...');
			var tmpoptions = '';

			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_send').show();
            $('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').hide();
			
			var kmd_addr_list_with_balance = KMDlistunspentT();
			//console.log(kmd_addr_list_with_balance);

			tmpoptions += '<option> - Select Transparent or Private KMD Address - </option>';
			$.each(kmd_addr_list_with_balance, function(index) {
				tmpoptions += '<option value="' + kmd_addr_list_with_balance[index].addr + '" data-total="' + kmd_addr_list_with_balance[index].total.toFixed(8) + '">[ ' + kmd_addr_list_with_balance[index].total.toFixed(8) + ' KMD ] &emsp;' + kmd_addr_list_with_balance[index].addr + '</option>';
				$('#kmd_wallet_send_from').html(tmpoptions);
			});

			var kmd_z_addr_list_with_balance = KMDListaddrZ();
			//console.log(kmd_z_addr_list_with_balance);
			$.each(kmd_z_addr_list_with_balance, function(index) {
				tmpoptions += '<option value="' + kmd_z_addr_list_with_balance[index].addr + '" data-total="' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + '">[ ' + kmd_z_addr_list_with_balance[index].total.toFixed(8) + ' KMD ] &emsp;' + kmd_z_addr_list_with_balance[index].addr + '</option>';
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

	var KMDGetTXIDdetails = function() {
		
		$('#kmd-txid-details-btn').click(function() {
			//console.log('kmd-txid-details-btn button clicked!..');
			console.log($(this).data('txid-type'));
			console.log($(this).data('txid'));

			var kmd_addr_txid_info = KMDGetTransactionIDInfo($(this).data('txid'));
			console.log(kmd_addr_txid_info);
			$('#kmd_txid_info_amount').text(kmd_addr_txid_info[0].amount);
			$('#kmd_txid_info_fee').text(kmd_addr_txid_info[0].fee);
			$('#kmd_txid_info_confirmations').text(kmd_addr_txid_info[0].confirmations);
			$('#kmd_txid_info_blockhash').text(kmd_addr_txid_info[0].blockhash);
			$('#kmd_txid_info_blockindex').text(kmd_addr_txid_info[0].blockindex);
			$('#kmd_txid_info_blocktime').text(kmd_addr_txid_info[0].blocktime);
			$('#kmd_txid_info_txid').text(kmd_addr_txid_info[0].txid);
			$('#kmd_txid_info_walletconflicts').text(kmd_addr_txid_info[0].walletconflicts);
			$('#kmd_txid_info_time').text(kmd_addr_txid_info[0].time);
			$('#kmd_txid_info_timereceived').text(kmd_addr_txid_info[0].timereceived);
			$('#kmd_txid_info_vjoinsplit').text(kmd_addr_txid_info[0].vjoinsplit);
			$('#kmd_txid_info_details').text(kmd_addr_txid_info[0].details);
			$('#kmd_txid_info_hex').val(kmd_addr_txid_info[0].hex);
		});
	};

	var KMDWalletSettings = function() {
		$('#btn_kmd_wallet_settings').click(function() {
			console.log('wallet settings button clicked...');
			$('#kmd_wallet_dashboardinfo').hide();
			$('#kmd_wallet_dashoard_section').hide();
			$('#kmd_wallet_send').hide();
            $('#kmd_wallet_recieve_section').hide();
			$('#kmd_wallet_settings').show();
			getKMDWalletInfo();
    		getKMDInfo();
		});
	};


    var KMDWalletRecieve = function() {
        $('#btn_kmd_wallet_recieve').click(function() {
            //console.log('wallet recieve button clicked...');
            $('#kmd_wallet_dashboardinfo').hide();
            $('#kmd_wallet_dashoard_section').hide();
            $('#kmd_wallet_send').hide();
            $('#kmd_wallet_recieve_section').show();
            $('#kmd_wallet_settings').hide();
            KMDListAllAddr();
        });

        $('#kmd_get_new_taddr').click(function() {
            console.log('get new T address button clicked...');
            KMDGetNewAddresses('public');
            KMDListAllAddr();
            toastr.info("Recieving Address list updated", "Wallet Notification");
        });
        
        $('#kmd_get_new_zaddr').click(function() {
            console.log('get new Z address button clicked...');
            KMDGetNewAddresses('private');
            KMDListAllAddr();
            toastr.info("Recieving Address list updated", "Wallet Notification");
        });
    };

	return {
        //main function to initiate the module
        init: function() {
            handle_KMD_Dashboard();
            KMDfillTxHistoryT();
            KMDGetTXIDdetails();
            handle_KMD_Send();
            KMDWalletRecieve();
            KMDWalletSettings();
            RunInitFunctions();
        }
    };

}();

jQuery(document).ready(function() {
    //KMDWalletDashboard.init();
});


function RunInitFunctions() {
	getTotalKMDBalance();
    KMDfillTxHistoryT();
    $('#kmd_wallet_recieve_section').hide();
}

function getTotalKMDBalance() {
    console.log($('#extcoin-wallet').data('extcoin'));
    var extcoin = $('#extcoin-wallet').data('extcoin');
    var passthru_agent = '';
    if ( extcoin == 'KMD') { passthru_agent = 'komodo'; };
    if ( extcoin == 'ZEC') { passthru_agent = 'zcash'; };

	var ajax_data = {"agent":passthru_agent,"method":"passthru","function":"z_gettotalbalance","hex":"3000"}
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
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
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
    NProgress.done();
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
				var ajax_data_to_hex = '["'+ value +'",0]';
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


function KMDGetPublicTransactions() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
	var result = [];

	var ajax_data = {"agent":"komodo","method":"passthru","function":"listtransactions","hex":""}
    //console.log(ajax_data);
    $.ajax({
    	async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data); //Ajax output gets the whole list of unspent coin with addresses
            //console.log('== Data OutPut of listtransactions ==');
            //console.log(AjaxOutputData);

            $.each(AjaxOutputData, function(index, value) {
				//console.log(value);

				var tmp_category = '';
                var tmp_addr = AjaxOutputData[index].address;
                if(!("address" in AjaxOutputData[index])) {
                    tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
                }
                var tmp_secondsToString = secondsToString(AjaxOutputData[index].time)

                if ( AjaxOutputData[index].category == 'send' ) {
                	tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
                }
                if ( AjaxOutputData[index].category == 'receive' ) {
                	tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
                }
                if ( AjaxOutputData[index].category == 'generate' ) {
                	tmp_category = '<i class="icon fa-cogs"></i> Mined';
                }if ( AjaxOutputData[index].category == 'immature' ) {
                	tmp_category = '<i class="icon fa-clock-o"></i> Immature';
                }
                //console.log(tmp_addr);
				//tmplisttransactions = {"type":"public","category": AjaxOutputData[index].category,"confirmations": AjaxOutputData[index].confirmations,"amount": AjaxOutputData[index].amount,"time": AjaxOutputData[index].time,"address": AjaxOutputData[index].address,"txid": AjaxOutputData[index].txid}
                tmplisttransactions = ['<span class="label label-default"><i class="icon fa-eye"></i> public</span>',tmp_category,AjaxOutputData[index].confirmations,AjaxOutputData[index].amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light" data-toggle="modal" data-target="#kmd_txid_info_mdl" id="kmd-txid-details-btn" data-txid-type="public" data-txid="'+AjaxOutputData[index].txid+'"><i class="icon fa-search"></i></button>']
				//console.log(tmplisttransactions);
				result.push(tmplisttransactions);
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
    NProgress.done();
    return result;
}

function KMDGetProtectedTransactions() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
	var result = [];

	var get_zaddr_list = KMDListaddrZ();
	//console.log(get_zaddr_list);

	$.each(get_zaddr_list, function(index, value) {
		//console.log(value.addr);
		
		var ajax_data_to_hex = '["'+ value.addr +'",0]'
		var tmpzaddr_hex_input = Iguana_HashHex(ajax_data_to_hex)
		//console.log(tmpzaddr_hex_input);
		
		var ajax_data = {"agent":"komodo","method":"passthru","function":"z_listreceivedbyaddress","hex":tmpzaddr_hex_input}
	    //console.log(ajax_data);
	    $.ajax({
	    	async: false,
	        type: 'POST',
	        data: JSON.stringify(ajax_data),
	        url: 'http://127.0.0.1:7778',
	        //dataType: 'text',
	        success: function(data, textStatus, jqXHR) {
	            var AjaxOutputData = JSON.parse(data); //Ajax output gets the whole list of unspent coin with addresses
	            //console.log('== Data OutPut of z_listreceivedbyaddress ==');
	            //console.log(AjaxOutputData);

	            $.each(AjaxOutputData, function(index, txidvalue) {
					//console.log(txidvalue);

					var tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
	                var tmp_addr = value.addr.slice(0, 30)+'...';
	                var tmp_amount = txidvalue.amount;
	                var tmp_addr_txid_info = KMDGetTransactionIDInfo(AjaxOutputData[index].txid);
	                //console.log(tmp_addr_txid_info);
	                var tmp_confirmations = tmp_addr_txid_info[0].confirmations;
	                var tmp_secondsToString = secondsToString(tmp_addr_txid_info[0].time)

	                /*if(!("address" in AjaxOutputData[index])) {
	                    tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
	                }*/

	                
	                
	                tmplistZtransactions = ['<span class="label label-dark"><i class="icon fa-eye-slash"></i> private</span>',tmp_category,tmp_confirmations,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light" data-toggle="modal" data-target="#kmd_txid_info_mdl" id="kmd-txid-details-btn" data-txid-type="private" data-txid="'+txidvalue.txid+'"><i class="icon fa-search"></i></button>']
					//console.log(tmplistZtransactions);
					result.push(tmplistZtransactions);
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
	});
    //console.log(result);
    NProgress.done();
    return result;
}

function KMDfillTxHistoryT() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
    var txhistorydataT = KMDGetPublicTransactions();
    var txhistorydataZ = KMDGetProtectedTransactions();
    var txhistorydata = $.merge( txhistorydataT, txhistorydataZ );
    //console.log(txhistorydata);

    var kmd_txhistory_table = '';
    kmd_txhistory_table = $('#kmd-tx-history-tbl').DataTable( { data: txhistorydata,
        "order": [[ 4, "desc" ]],
        select: true,
        retrieve: true
    });

    kmd_txhistory_table.destroy();
    kmd_txhistory_table = $('#kmd-tx-history-tbl').DataTable( { data: txhistorydata,
        "order": [[ 4, "desc" ]],
        select: true,
        retrieve: true
    });
    
    NProgress.done();
}


function KMDListAddresses(pubpriv) {
    NProgress.done(true);
    NProgress.configure({
        template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    });
    NProgress.start();
    var result = [];

    var ajax_data_to_hex = '""'
    var ajax_function_input = '';
    var tmplistaddr_hex_input = '';
    if ( pubpriv === 'public' ) {
        ajax_function_input = 'getaddressesbyaccount';
        tmplistaddr_hex_input = Iguana_HashHex(ajax_data_to_hex)
    }
    if ( pubpriv === 'private' ) {
        ajax_function_input = 'z_listaddresses';
        tmplistaddr_hex_input = "";
    }
    
    //console.log(tmpzaddr_hex_input);
    
    var ajax_data = {"agent":"komodo","method":"passthru","function":ajax_function_input,"hex":tmplistaddr_hex_input}
    //console.log(ajax_data);
    $.ajax({
        async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data); //Ajax output gets the whole list of unspent coin with addresses
            //console.log('== Data OutPut of getaddressesbyaccount ==');
            //console.log(AjaxOutputData);
            result = AjaxOutputData;
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
    NProgress.done();
    return result;
}


function KMDGetNewAddresses(pubpriv) {
    NProgress.done(true);
    NProgress.configure({
        template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    });
    NProgress.start();
    var result = [];

    var ajax_function_input = '';
    if ( pubpriv === 'public' ) {
        ajax_function_input = 'getnewaddress';
    }
    if ( pubpriv === 'private' ) {
        ajax_function_input = 'z_getnewaddress';
    }
    
    var ajax_data = {"agent":"komodo","method":"passthru","function":ajax_function_input,"hex":""}
    //console.log(ajax_data);
    $.ajax({
        async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            //console.log('== Data OutPut of get new address ==');
            //console.log(data);
            result = data;
            toastr.success("New address generated successfully", "Wallet Notification");
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
    NProgress.done();
    return result;
}


function KMDListAllAddr() {
    NProgress.done(true);
    NProgress.configure({
        template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    });
    NProgress.start();
    var only_reciving_addr_data = [];
    var listTaddr = KMDListAddresses('public');
    var listZaddr = KMDListAddresses('private');
    var listAlladdr = $.merge( listTaddr, listZaddr );
    console.log(listAlladdr[5].slice(0, 2));

    $.each(listAlladdr, function(index, value) {
        tmp_addr_label = '<span class="label label-default"><i class="icon fa-eye"></i> public</span>';
        if ( listAlladdr[index].slice(0, 2) == 'zc' ) { tmp_addr_label = '<span class="label label-dark"><i class="icon fa-eye-slash"></i> private</span>'; }
        //var tmp_addr_action_button = '<button></button>';
        only_reciving_addr_data.push([tmp_addr_label, listAlladdr[index]]);
    });
    //console.log(only_reciving_addr_data);

    var kmd_recieve_table = '';

    kmd_recieve_table = $('#kmd-recieve-addr-tbl').DataTable( { data: only_reciving_addr_data,
        select: false,
        retrieve: true
    });
    
    kmd_recieve_table.destroy();

    kmd_recieve_table = $('#kmd-recieve-addr-tbl').DataTable( { data: only_reciving_addr_data,
        select: false,
        retrieve: true
    });
    
    NProgress.done();
    return only_reciving_addr_data;
}

function KMDGetTransactionIDInfo(txid) {
	var result = [];

	var ajax_data_to_hex = '["'+ txid +'"]'
	var tmptxid_output = Iguana_HashHex(ajax_data_to_hex)
	//console.log(tmptxid_output);

	var ajax_data_txid_input = {"agent":"komodo","method":"passthru","function":"gettransaction","hex":tmptxid_output}
    //console.log(ajax_data_txid_input);
    $.ajax({
    	async: false,
        type: 'POST',
        data: JSON.stringify(ajax_data_txid_input),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut of z_getbalance ==');
            //console.log(value);
            //console.log(AjaxOutputData);
			result.push(AjaxOutputData);
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