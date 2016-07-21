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

        var walletDivContent = '';

        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:7778/api/InstantDEX/allcoins',
            dataType: 'text',
            success: function(data, textStatus, jqXHR) {
                var AllcoinsDataOutput = JSON.parse(data);
                //console.log('== Data OutPut ==');
                //console.log(AllcoinsDataOutput.basilisk);

                $.each(AllcoinsDataOutput.basilisk, function(index) {

                    var coinlogo = '';
                    var coinname = '';

                    if ( AllcoinsDataOutput.basilisk[index] == 'BTC' ) {
                        coinlogo = 'bitcoin';
                        coinname = 'Bitcoin';
                    }
                    if ( AllcoinsDataOutput.basilisk[index] == 'BTCD' ) {
                        coinlogo = 'bitcoindark';
                        coinname = 'BitcoinDark';
                    }
                    if ( AllcoinsDataOutput.basilisk[index] == 'LTC' ) {
                        coinlogo = 'litecoin';
                        coinname = 'Litecoin';
                    }

                    //console.log(AllcoinsDataOutput.basilisk[index]);
                    walletDivContent += '<!-- Begin' + AllcoinsDataOutput.basilisk[index] + 'wallet widget -->';
                    walletDivContent += '<div class="col-md-6 col-xs-12 masonry-item">';
                      walletDivContent += '<div class="widget widget-shadow">';
                        walletDivContent += '<div class="widget-header wallet-widget-header padding-15 clearfix">';
                          walletDivContent += '<div class="row no-space">';
                              walletDivContent += '<div class="col-xs-7">';
                                walletDivContent += '<a class="avatar avatar-lg pull-left margin-right-20 img-bordered" href="javascript:void(0)" data-currency="' + AllcoinsDataOutput.basilisk[index] + '">';
                                  walletDivContent += '<img src="assets/images/cryptologo/' + coinlogo + '.png" alt="">';
                                  walletDivContent += '<span class="badge up badge-info" id="basfull" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" data-toggle="tooltip" data-placement="top" data-original-title="Basilisk">B</span>';
                                walletDivContent += '</a>';
                                walletDivContent += '<div>';
                                  walletDivContent += '<div class="font-size-20 hidden-xs" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-name">' + coinname + '</div>';
                                  walletDivContent += '<div class="form-material hidden-md hidden-xs">';
                                    walletDivContent += '<select class="form-control font-size-12" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-addr" style="width: 235px;">';
                                      //walletDivContent += '<option>1LkTfkQLXg2v86oc1MoLz68nKoshh5ARTC</option>';
                                      //walletDivContent += '<option>1LkTfkQLXg2v86oc1MoLz68nKoshh5ARTC</option>';
                                    walletDivContent += '</select>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="font-size-12 hidden-xs"></div>';
                                walletDivContent += '</div>';
                              walletDivContent += '</div>';
                              walletDivContent += '<div class="col-xs-5">';
                                walletDivContent += '<div class="row no-space text-center">';
                                  walletDivContent += '<div class="col-md-4 col-xs-6">';
                                    walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Balance">';
                                      walletDivContent += '<div class="counter-icon"><i class="icon">' + AllcoinsDataOutput.basilisk[index] + '</i></div>';
                                      walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-balance">6.584</span>';
                                    walletDivContent += '</div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="col-md-4 col-xs-6">';
                                    walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Unconfirmed">';
                                      walletDivContent += '<div class="counter-icon"><i class="icon fa-spinner"></i></div>';
                                      walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-unconfirmed">3</span>';
                                    walletDivContent += '</div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="col-md-4 hidden-xs hidden-sm">';
                                    walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="No. of Transactions">';
                                      walletDivContent += '<div class="counter-icon"><i class="icon fa-book"></i></div>';
                                      walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-nooftransactions">325</span>';
                                    walletDivContent += '</div>';
                                  walletDivContent += '</div>';
                                walletDivContent += '</div>';
                              walletDivContent += '</div>';
                            walletDivContent += '</div>';
                        walletDivContent += '</div>';
                        walletDivContent += '<div class="widget-content history-body hidden-sm hidden-xs">';
                          walletDivContent += '<div class="height-200 scrollbar-dynamic" id="tblscroll">';
                            walletDivContent += '<div data-role="container">';
                              walletDivContent += '<div data-role="content">';
                                walletDivContent += '<table class="table font-size-12" data-currency="' + AllcoinsDataOutput.basilisk[index] + '" id="currency-tbl">';
                                  walletDivContent += '<tbody>';
                                  walletDivContent += '</tbody>';
                                walletDivContent += '</table>';
                              walletDivContent += '</div>';
                            walletDivContent += '</div>';
                          walletDivContent += '</div>';
                        walletDivContent += '</div>';
                      walletDivContent += '</div>';
                    walletDivContent += '</div>';
                    walletDivContent += '<!-- End' + AllcoinsDataOutput.basilisk[index] + 'wallet widget -->';

                    $('#wallet-widgets').html(walletDivContent);
                    $('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
                    $('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
                    //console.log(walletDivContent);

                    //console.log('http://127.0.0.1:7778/api/bitcoinrpc/getaddressesbyaccount?coin=' + AllcoinsDataOutput.basilisk[index] + '&account=*');
                    //$('select[data-currency="' + AllcoinsDataOutput.basilisk[index] + '"]').empty();
                    $.getJSON( 'http://127.0.0.1:7778/api/bitcoinrpc/getaddressesbyaccount?coin=' + AllcoinsDataOutput.basilisk[index] + '&account=*', function( data ) {
                        var CoinAddrList = '';
                        //console.log(data.result);
                        $.each(data.result, function(coin_index){
                            //console.log(coin_index);
                            //console.log(data.result[index]);
                            //console.log(AllcoinsDataOutput.basilisk[index]);
                            CoinAddrList = '<option value="' + data.result[coin_index] + '" data-select-options="' + AllcoinsDataOutput.basilisk[index] + '">' + data.result[coin_index] + '</option>';

                            //console.log(CoinAddrList);
                            // Inject the whole content string into our existing HTML table
                            $('select[data-currency="' + AllcoinsDataOutput.basilisk[index] + '"]').append(CoinAddrList);

                        });
                        //console.log(data);
                        //console.log(data[0]);*/
                    });
                });
            },
            error: function(xhr, textStatus, error) {
                console.log('failed starting BitcoinDark.');
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                //swal("Oops...", "Something went wrong!", "error");
                if (xhr.readyState == '0' ) {
                    toastr.error("Unable to connect to Iguana", "Account Notification")
                }
            }
        });
        
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