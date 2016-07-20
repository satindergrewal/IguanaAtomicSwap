var Dashboard = function() {


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

    var handleWalletWidgets = function() {

        
    }


    return {
        //main function to initiate the module
        init: function() {

            handleWalletWidgets();

        }

    };

}();

jQuery(document).ready(function() {
    Dashboard.init();
});