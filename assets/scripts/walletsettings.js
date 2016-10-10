// DOM Ready =============================================================
$(document).ready(function() {

});

// Functions =============================================================

function Settings_ShowWalletInfo() {
	var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));
	console.log(JSON.parse(CheckLoginData));
	$("#winfo_pubkey_value").text(JSON.parse(CheckLoginData).pubkey);
	$("#winfo_btcpubkey_value").text(JSON.parse(CheckLoginData).btcpubkey);
	$("#winfo_rmd160_value").text(JSON.parse(CheckLoginData).rmd160);
	$("#winfo_NXT_value").text(JSON.parse(CheckLoginData).NXT);
	$("#winfo_notary_value").text(JSON.parse(CheckLoginData).notary);
	$("#winfo_status_value").text(JSON.parse(CheckLoginData).status);
	//$("#winfo_duration_value").text(JSON.parse(CheckLoginData).duration);
}

function Settings_ShowCoinPeers() {
	console.log('waiting getpeers api to complete...');
	$("#coin_supernetpeers_h").text('');
	$("#coin_supernetpeers").text('');
	$("#coin_rawpeers_h").text('');
	$("#coin_rawpeers").text('');
	var settings_selected_coinname_code_val = $("option:selected","#settings_select_coin_options").val();
	var ajax_data = {"agent":"SuperNET","method":"getpeers","activecoin": settings_selected_coinname_code_val};
	$.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var getCoinPeers = JSON.parse(data);
            console.log(getCoinPeers);
            
            if (getCoinPeers.supernet[0].peers !== undefined ) {
            	var supernet_peers_list = getCoinPeers.supernet[0].peers;
	            if (supernet_peers_list != 0 ) {
	            	$("#coin_supernetpeers_h").text(getCoinPeers.supernet[0].coin);
	            	$.each(supernet_peers_list, function( index, value ) {
		            	var br_val = "";
		            	if ( index != 0 ) { br_val = "<br>" }
		            	$("#coin_supernetpeers").append(br_val+value);
		            });
	            }
            }

            if (getCoinPeers.rawpeers[0].peers !== undefined ) {
            	var raw_peers_list = getCoinPeers.rawpeers[0].peers;
	            if (raw_peers_list != 0 ) {
	            	$("#coin_rawpeers_h").text(getCoinPeers.supernet[0].coin);
	            	$.each(raw_peers_list, function( index, value ) {
		            	var br_val = "";
		            	if ( index != 0 ) { br_val = "<br>" }
		            	$("#coin_rawpeers").append(br_val+value);
		            });
	            }
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