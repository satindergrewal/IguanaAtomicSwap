var WalletSettings = function() {

    var handleWalletExportKeys = function() {
        $('.wifkeys-form').validate({
            //errorElement: 'span', //default input error message container
            //errorClass: 'help-block', // default input error message class
            //focusInvalid: false, // do not focus the last invalid input
            rules: {
                wifkeys_passphrase: {
                    required: true
                }
            },

            messages: {
                wifkeys_passphrase: {
                    required: "Passphrase is required."
                }
            },

            submitHandler: function(form) {
                console.log("wait till peer ip added to selected coin...")

                var Getwifkeys_passphrase = $("#wifkeys_passphrase").val();
    
                var WifKeyDivContent = '';

                //First check which coins are active. Execute API for each mode of wallet
                $.each([ 'basilisk', 'full', 'virtual' ], function( index, value ) {
                    var allcoins_ajax_data = {"agent":"InstantDEX","method":"allcoins"};
                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(allcoins_ajax_data),
                        url: 'http://127.0.0.1:7778',
                        //dataType: 'text',
                        success: function(data, textStatus, jqXHR) {
                            var AllcoinsDataOutput = JSON.parse(data);
                            //Only execute further code if that mode has any coins active it. if none, skill checking on them.
                            if (AllcoinsDataOutput[value].length !== 0 ) {
                                console.log('== AllCoins Data OutPut ==');
                                console.log(value);
                                console.log(AllcoinsDataOutput[value]);

                                //First Run Encryptwallet API to get wif keys for each active coin
                                $.each(AllcoinsDataOutput[value], function(index) {

                                    var wifkey_coin_handle = AllcoinsDataOutput[value][index];

                                    console.log(AllcoinsDataOutput[value][index]);
                                    var EncryptWallet_ajax_data = {"agent":"bitcoinrpc","method":"encryptwallet","passphrase":Getwifkeys_passphrase}
                                    $.ajax({
                                        type: 'POST',
                                        data: JSON.stringify(EncryptWallet_ajax_data),
                                        url: 'http://127.0.0.1:7778',
                                        //dataType: 'text',
                                        success: function(data, textStatus, jqXHR) {
                                            var EncryptWalletDataOutput = JSON.parse(data);
                                            console.log(EncryptWalletDataOutput[wifkey_coin_handle+'wif']);
                                            WifKeyDivContent += '<table class="table">';
                                                WifKeyDivContent += '<tr><td style="width: 5%;"><b>'+wifkey_coin_handle+'</b></td><td>'+EncryptWalletDataOutput[wifkey_coin_handle]+'</td></tr>';
                                                WifKeyDivContent += '<tr><td><b>'+wifkey_coin_handle+'Wif</b></td><td>'+EncryptWalletDataOutput[wifkey_coin_handle+'wif']+'</td></tr>';
                                            WifKeyDivContent += '</table>';
                                            $('#wif-priv-keys').html(WifKeyDivContent);
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

                                //Second run walletpassphrase again to make sure wallet is unlocked as before login.
                                var WalletPassphrase_ajax_data = {"agent":"bitcoinrpc","method":"walletpassphrase","password":Getwifkeys_passphrase,'timeout': '2592000'}
                                $.ajax({
                                    type: 'POST',
                                    data: JSON.stringify(WalletPassphrase_ajax_data),
                                    url: 'http://127.0.0.1:7778',
                                    //dataType: 'text',
                                    success: function(data, textStatus, jqXHR) {
                                        var WalletPassphraseDataOutput = JSON.parse(data);
                                        console.log(WalletPassphraseDataOutput);
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
            }
        });

        $('.wifkeys-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.wifkeys-form').validate().form()) {
                    $('.wifkeys-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });


    };

    return {
        //main function to initiate the module
        init: function() {

            handleWalletExportKeys();
        }

    };
}();

jQuery(document).ready(function() {
    WalletSettings.init();
});


// DOM Ready =============================================================
$(document).ready(function() {
    
    /*$('#settings_getcoinpeers_btn').click(function() { Settings_ExportActiveCoinKeys(); });
    $('.wifkeys-form input').keypress(function(e) {
        console.log('something happened with wifkeys...');
        if (e.which == 13) {
            if ($('.wifkeys-form').validate().form()) {
                $('.wifkeys-form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });*/
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



function Settings_AddCoinPeers() {
	console.log("wait till peer ip added to selected coin...")
	var settings_selected_coinname_code_val = $("option:selected","#settings_select_coin_addpeer_options").val();
	var settings_add_peer_ip_val = $("#settings_add_peer_ip").val();
	var ajax_data = {"agent":"iguana","method":"addnode","activecoin": settings_selected_coinname_code_val,"ipaddr": settings_add_peer_ip_val};
	$.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var getAddCoinPeers = JSON.parse(data);
            console.log(getAddCoinPeers);
            if ( getAddCoinPeers.result == 'addnode submitted' ) {
            	toastr.success(settings_add_peer_ip_val + " added to " + settings_selected_coinname_code_val + " Successfully", "Coin Notification");
            	$("#settings_add_peer_ip").val('');
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

function Settings_ExportActiveCoinKeys() {
    
}