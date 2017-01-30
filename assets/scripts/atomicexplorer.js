var AtomicExplorer = function() {


    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "showDuration": "5000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    
    var handleExplorer = function() {

        $('#atomic_explorer_getcoinpeers_btn').click(function() {
            NProgress.done(true);
            NProgress.configure({
                template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            });
            NProgress.start();
            console.log("button pushed in atomic explorer");

            var atomic_explorer_select_coin_val = $("select[id='atomic_explorer_select_coin_options']").val();
            var atomic_explorer_select_command_val = $("select[id='atomic_explorer_select_command_options']").val();
            var atomic_explorer_input_data_val = $("#atomic_explorer_input_data").val();
            console.log(atomic_explorer_select_coin_val);
            console.log(atomic_explorer_select_command_val);
            console.log(atomic_explorer_input_data_val);
            var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');

            if (atomic_explorer_select_command_val === 'history') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"timeout":20000,"agent":"basilisk","method":"history","vals":{"coin":atomic_explorer_select_coin_val,"addresses":[atomic_explorer_input_data_val]}}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'getbalance') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"method":"getbalance","params":[atomic_explorer_input_data_val]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'listunspent') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"method":"listunspent","params":[1, 9999999, [atomic_explorer_input_data_val]]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'txid') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"method":"getrawtransaction","params":[atomic_explorer_input_data_val]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'blockash') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"getblockhash","height":atomic_explorer_input_data_val}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'chaintip') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"getbestblockhash"}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'gettransaction') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"gettransaction","txid":atomic_explorer_input_data_val}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_getinfo') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"getinfo","symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_getnotaries') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"getnotaries","symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_alladdresses') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"alladdresses","symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_checkaddress') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"checkaddress","address":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_validateaddress') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"validateaddress","address":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_getbestblockhash') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"getbestblockhash","symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_listtransactions') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":atomic_explorer_input_data_val,"count":100,"skip":0,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_listunspent') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listunspent","address":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_getblockhash') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"getblockhash","height":100,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_getblock') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"getblock","hash":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_gettxout') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"gettxout","vout":0,"txid":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'dex_gettransaction') {
                ExplorerInputData = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"gettransaction","txid":atomic_explorer_input_data_val,"symbol":atomic_explorer_select_coin_val};
                console.log(ExplorerInputData);
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(ExplorerInputData),
                url: 'http://127.0.0.1:7778',
                //dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    if (atomic_explorer_select_command_val === 'txid' || atomic_explorer_select_command_val === 'dex_getbestblockhash' || atomic_explorer_select_command_val === 'dex_getblockhash') {
                        $("#atomic-explorer-commands-output").html(data);
                    } else {
                        var ExplorerOutputData = JSON.parse(data);
                        console.log(ExplorerOutputData);
                        $("#atomic-explorer-commands-output").html(JSON.stringify(ExplorerOutputData, null, '\t'));
                    }
                    if (ExplorerOutputData.error === 'less than required responses') {
                            toastr.error("Less than required responses. Please try again.", "Basilisk Notification")
                        }
                    NProgress.done();
                },
                error: function(xhr, textStatus, error) {
                    console.log('failed getting Coin History.');
                    console.log(xhr.statusText);
                    if ( xhr.readyState == 0 ) {
                        Iguana_ServiceUnavailable();
                    }
                    console.log(textStatus);
                    console.log(error);
                    NProgress.done();
                }
            });


            /*$.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:7778/api/bitcoinrpc/walletlock',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var LogoutOutput = JSON.parse(data);
                    sessionStorage.clear();
                    console.log('== Logout Data OutPut ==');
                    console.log(LogoutOutput);

                    
                },
                error: function(xhr, textStatus, error) {
                    console.log('failure');
                    console.log(xhr.statusText);
                    if ( xhr.readyState == 0 ) {
                        Iguana_ServiceUnavailable();
                    }
                    console.log(textStatus);
                    console.log(error);
                    //swal("Oops...", "Something went wrong!", "error");
                    toastr.warning("Opps... Something went wrong!", "Account Notification")
                    
                }
            });*/
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            handleExplorer();
        }

    };

}();

jQuery(document).ready(function() {
    AtomicExplorer.init();
});