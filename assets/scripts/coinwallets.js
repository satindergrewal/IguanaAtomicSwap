// DOM Ready =============================================================
$(document).ready(function() {

    // button click
    //console.log('EhLoe!');
    //$('button[id="currency-send"]').on('click', function(){console.log($(this).data('currency'));});

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
	console.log($('#mdl_currency_amount').val());
	$('#mdl_currency_total_value').text(total_of_currency_fee);
});

$('#mdl_currency_fee').keyup(function() {
	var sum_val1 = parseFloat($('#mdl_currency_amount').val())
	var sum_val2 = parseFloat($('#mdl_currency_fee').val())
	var total_of_currency_fee = sum_val1 + sum_val2;
	console.log($('#mdl_currency_amount').val());
	$('#mdl_currency_total_value').text(total_of_currency_fee);
});