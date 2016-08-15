// DOM Ready =============================================================
$(document).ready(function() {

    // button click
    //console.log('EhLoe!');
    //$('button[id="currency-send"]').on('click', function(){console.log($(this).data('currency'));});

    //By default set USD as Fiat Currency if there's none selected already.
    if ( localStorage.getItem('EasyDEX_FiatCurrency') == null ) {
		var FiatCurrency = '';
		FiatCurrency = 'USD';
		localStorage.setItem('EasyDEX_FiatCurrency', FiatCurrency);
	}
});

// Functions =============================================================

function sendCurrency(val) {
	console.log(val);
	$('#mdl_currency_coin').text(val.currency);
	$('#mdl_currency_balance').text($('span[data-currency="' + val.currency + '"][id="currency-balance"]').text());
	//console.log($('span[data-currency="' + val.currency + '"][id="currency-balance"]').text());
	$('#mdl_currency_sendto').attr("placeholder", "Enter " + val.currency + " address");
	$('#mdl_currency_amount_label').text(val.currency);
	$('#mdl_currency_total_coinname').text(val.currency);

	var getinfoValues = {"coin":val.currency,"agent":"bitcoinrpc","method":"getinfo"};
	$.ajax({
	    type: 'POST',
	    data: JSON.stringify(getinfoValues),
	    url: 'http://127.0.0.1:7778',
	    //dataType: 'text',
	    success: function(data, textStatus, jqXHR) {
	        var CoinInfoData = JSON.parse(data);
	        var label_color = '';
	        var label_icon = '';
	        var wallettblContent = '';
	        //console.log('== Coin Info Data OutPut ==');
	        //console.log(CoinInfoData.txfee);
	        
	        $('#mdl_currency_fee').val(CoinInfoData.txfee);
	    },
	    error: function(xhr, textStatus, error) {
	        console.log('failed getting Coin History.');
	        console.log(xhr.statusText);
	        console.log(textStatus);
	        console.log(error);
	    }
	});
	
}

$('#mdl_currency_amount').keyup(function() {
	var sum_val1 = parseFloat($('#mdl_currency_amount').val())
	var sum_val2 = parseFloat($('#mdl_currency_fee').val())
	var total_of_currency_fee = sum_val1 + sum_val2;
	var currency_fiat_value = '';
	if ( $('#mdl_currency_total_coinname').text() == 'BTCD' ) {
		currency_fiat_value = localStorage.getItem('EasyDEX_BTCD_Fiat_pair_value');
	}
	if ( $('#mdl_currency_total_coinname').text() == 'BTC' ) {
		currency_fiat_value = localStorage.getItem('EasyDEX_BTC_Fiat_pair_value');
	}
	var total_of_currency_fiat = total_of_currency_fee * currency_fiat_value;
	//console.log($('#mdl_currency_amount').val());
	//console.log(total_of_currency_fiat);
	$('#mdl_currency_total_value').text(total_of_currency_fee);
	$('#mdl_currency_total_fiat_value').text(total_of_currency_fiat.toFixed(5)+' '+localStorage.getItem('EasyDEX_FiatCurrency'));
});

$('#mdl_currency_fee').keyup(function() {
	var sum_val1 = parseFloat($('#mdl_currency_amount').val())
	var sum_val2 = parseFloat($('#mdl_currency_fee').val())
	var total_of_currency_fee = sum_val1 + sum_val2;
	var currency_fiat_value = '';
	if ( $('#mdl_currency_total_coinname').text() == 'BTCD' ) {
		currency_fiat_value = localStorage.getItem('EasyDEX_BTCD_Fiat_pair_value');
	}
	if ( $('#mdl_currency_total_coinname').text() == 'BTC' ) {
		currency_fiat_value = localStorage.getItem('EasyDEX_BTC_Fiat_pair_value');
	}
	var total_of_currency_fiat = total_of_currency_fee * currency_fiat_value;
	//console.log($('#mdl_currency_amount').val());
	//console.log(total_of_currency_fiat);
	$('#mdl_currency_total_value').text(total_of_currency_fee);
	$('#mdl_currency_total_fiat_value').text(total_of_currency_fiat.toFixed(5)+' '+localStorage.getItem('EasyDEX_FiatCurrency'));
});

function CurrencyMdlBtnClose() {
	$('#mdl_currency_sendto').val('');
	$('#mdl_currency_amount').val('');
	$('#mdl_currency_total_value').text('0.00');
	$('#mdl_currency_total_fiat_value').text('0.00 '+localStorage.getItem('EasyDEX_FiatCurrency'));
}

function ConfirmsendCurrency(confirm_val) {
	var confirm_coinname = $('#mdl_currency_total_coinname').text();
	var confirm_selected_from_addr = $('select[data-currency="' + confirm_coinname + '"][id="currency-addr"] option:selected').text();

	$('#mdl_confirm_currency_sendto_addr').text($('#mdl_currency_sendto').val());
	$('#mdl_confirm_currency_send_amount').text($('#mdl_currency_amount').val());
	$('#mdl_confirm_currency_coinname').text(confirm_coinname);
	//$('#mdl_confirm_currency_send_amount_fiat').text($('') );
	$('#mdl_confirm_currency_send_fee').text($('#mdl_currency_fee').val());
	$('#mdl_confirm_currency_coinname_fee').text(confirm_coinname);
	//$('#mdl_confirm_currency_send_fee_fiat').text($('') );
	$('#mdl_confirm_currency_sendfrom_addr').text(confirm_selected_from_addr);
	$('#mdl_confirm_currency_sendfrom_total_dedcut').text($('#mdl_currency_total_value').text());
	$('#mdl_confirm_currency_coinname_total').text(confirm_coinname);
	//$('#mdl_confirm_currency_sendfrom_total_deduct_fiat').text($('') );
}

function ExecuteSendCurrencyAPI() {
	console.log('==> SendToAddress API Executed <==');

	var confirm_send_amount = $('#mdl_confirm_currency_sendfrom_total_dedcut').text();
	var confirm_sendto_address = $('#mdl_confirm_currency_sendto_addr').text();

	//Get parameters values from confirm dialog and send currency
    var sendtoaddrvalues = {"method":"sendtoaddress","params":[confirm_sendto_address,0.001,"EasyDEX","EasyDEXTransaction"]};
    console.log(sendtoaddrvalues);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(sendtoaddrvalues),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var SendToAddrData = JSON.parse(data);
            console.log('== Data OutPut ==');
            console.log(SendToAddrData);
            if ( SendToAddrData.sendrawtransaction == 'success' ) {
				toastr.success("Transaction Sent", "Transaction Notification")
            }
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            toastr.error("Unable to complete transaction", "Transaction Notification")
        }
    });

    //Clear Send Dialog values and set them to blank
    $('#mdl_currency_coin').text('');
	$('#mdl_currency_balance').text('');
	$('#mdl_currency_amount_label').text('');
	$('#mdl_currency_total_coinname').text('');

	//Clear Confirm Dialog values and set them to blank
    $('#mdl_confirm_currency_sendto_addr').text('');
	$('#mdl_confirm_currency_send_amount').text('');
	$('#mdl_confirm_currency_coinname').text('');
	$('#mdl_confirm_currency_send_amount_fiat').text('');
	$('#mdl_confirm_currency_send_fee').text('');
	$('#mdl_confirm_currency_coinname_fee').text('');
	$('#mdl_confirm_currency_send_fee_fiat').text('');
	$('#mdl_confirm_currency_sendfrom_addr').text('');
	$('#mdl_confirm_currency_sendfrom_total_dedcut').text('');
	$('#mdl_confirm_currency_coinname_total').text('');
	$('#mdl_confirm_currency_sendfrom_total_deduct_fiat').text('');
}



//Used this function to set desired Fiat Currency, selected from top menu bar of EasyDEX UI
function WalletFiatCurrency(fiat_currency_value) {
	//console.log(fiat_currency_value);
	var FiatCurrency = fiat_currency_value.fiatcurrency;
	localStorage.setItem('EasyDEX_FiatCurrency', FiatCurrency);
	//console.log(localStorage.getItem('EasyDEX_FiatCurrency'));
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