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
            console.log("button pushed in atomic explorer")

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