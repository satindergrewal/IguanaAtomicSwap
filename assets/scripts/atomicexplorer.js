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
            console.log("button pushed in atomic explorer");

            var atomic_explorer_select_coin_val = $("select[id='atomic_explorer_select_coin_options']").val();
            var atomic_explorer_select_command_val = $("select[id='atomic_explorer_select_command_options']").val();
            var atomic_explorer_input_data_val = $("#atomic_explorer_input_data").val();
            console.log(atomic_explorer_select_coin_val);
            console.log(atomic_explorer_select_command_val);
            console.log(atomic_explorer_input_data_val);

            if (atomic_explorer_select_command_val === 'getbalance') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"method":"getbalance","params":[atomic_explorer_input_data_val]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'listunspent') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"method":"listunspent","params":[1, 9999999, [atomic_explorer_input_data_val]]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'txid') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"method":"getrawtransaction","params":[atomic_explorer_input_data_val]}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'blockash') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"getblockhash","height":atomic_explorer_input_data_val}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'chaintip') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"getbestblockhash"}
                console.log(ExplorerInputData);
            }
            if (atomic_explorer_select_command_val === 'gettransaction') {
                ExplorerInputData = {"coin":atomic_explorer_select_coin_val,"agent":"bitcoinrpc","method":"gettransaction","txid":atomic_explorer_input_data_val}
                console.log(ExplorerInputData);
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(ExplorerInputData),
                url: 'http://127.0.0.1:7778',
                //dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    if (atomic_explorer_select_command_val === 'txid') {
                        $("#atomic-explorer-commands-output").html(data);
                    } else {
                        var ExplorerOutputData = JSON.parse(data);
                        console.log(ExplorerOutputData);
                        $("#atomic-explorer-commands-output").html(JSON.stringify(ExplorerOutputData, null, '\t'));
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