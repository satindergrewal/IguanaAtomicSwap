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

        $.each([ 'basilisk', 'full', 'virtual' ], function( index, value ) {

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:7778/api/InstantDEX/allcoins',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var AllcoinsDataOutput = JSON.parse(data);
                    //console.log('== Data OutPut ==');
                    //console.log(value);
                    //console.log(AllcoinsDataOutput[value]);

                    $.each(AllcoinsDataOutput[value], function(index) {

                        var coinlogo = '';
                        var coinname = '';
                        var modecode = '';
                        var modetip = '';
                        var modecolor = '';

                        if ( value == 'basilisk' ) { modecode = 'B'; modetip = 'Basilisk'; modecolor = 'info'; }
                        if ( value == 'full' ) { modecode = 'F'; modetip = 'Full'; modecolor = 'success'; }
                        if ( value == 'virtual' ) { modecode = 'V'; modetip = 'Virtual'; modecolor = 'danger'; }

                        if ( AllcoinsDataOutput[value][index] == 'BTC' ) { coinlogo = 'bitcoin'; coinname = 'Bitcoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'BTCD' ) { coinlogo = 'bitcoindark'; coinname = 'BitcoinDark'; }
                        if ( AllcoinsDataOutput[value][index] == 'LTC' ) { coinlogo = 'litecoin'; coinname = 'Litecoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'VPN' ) { coinlogo = 'vpncoin'; coinname = 'VPNcoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'SYS' ) { coinlogo = 'syscoin'; coinname = 'Syscoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'ZEC' ) { coinlogo = 'zcash'; coinname = 'Zcash'; }
                        if ( AllcoinsDataOutput[value][index] == 'NMC' ) { coinlogo = 'namecoin'; coinname = 'Namecoin'; }


                        //console.log(AllcoinsDataOutput[value][index]);
                        walletDivContent += '<!-- Begin' + AllcoinsDataOutput[value][index] + 'wallet widget -->';
                        walletDivContent += '<div class="col-md-6 col-xs-12 masonry-item">';
                          walletDivContent += '<div class="widget widget-shadow">';
                            walletDivContent += '<div class="widget-header wallet-widget-header padding-15 clearfix">';
                              walletDivContent += '<div class="row no-space">';
                                  walletDivContent += '<div class="col-xs-7">';
                                    walletDivContent += '<a class="avatar avatar-lg pull-left margin-right-20 img-bordered" href="javascript:void(0)" data-currency="' + AllcoinsDataOutput[value][index] + '">';
                                      walletDivContent += '<img src="assets/images/cryptologo/' + coinlogo + '.png" alt="">';
                                      walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-currency="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
                                    walletDivContent += '</a>';
                                    walletDivContent += '<div>';
                                      walletDivContent += '<div class="font-size-20 hidden-xs" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-name">' + coinname + '</div>';
                                      walletDivContent += '<div class="form-material hidden-md hidden-xs">';
                                        walletDivContent += '<select class="form-control font-size-12" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-addr" style="width: 235px;">';
                                        walletDivContent += '</select>';
                                      walletDivContent += '</div>';
                                      walletDivContent += '<div class="font-size-12 hidden-xs"></div>';
                                    walletDivContent += '</div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="col-xs-5">';
                                    walletDivContent += '<div class="row no-space text-center">';
                                      walletDivContent += '<div class="col-md-4 col-xs-6">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Balance">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon">' + AllcoinsDataOutput[value][index] + '</i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-balance">6.584</span>';
                                        walletDivContent += '</div>';
                                      walletDivContent += '</div>';
                                      walletDivContent += '<div class="col-md-4 col-xs-6">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Unconfirmed">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon fa-spinner"></i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-unconfirmed">3</span>';
                                        walletDivContent += '</div>';
                                      walletDivContent += '</div>';
                                      walletDivContent += '<div class="col-md-4 hidden-xs hidden-sm">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="No. of Transactions">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon fa-book"></i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-nooftransactions">325</span>';
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
                                    walletDivContent += '<table class="table font-size-12" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-tbl">';
                                      walletDivContent += '<tbody>';
                                      walletDivContent += '</tbody>';
                                    walletDivContent += '</table>';
                                  walletDivContent += '</div>';
                                walletDivContent += '</div>';
                              walletDivContent += '</div>';
                            walletDivContent += '</div>';
                          walletDivContent += '</div>';
                        walletDivContent += '</div>';
                        walletDivContent += '<!-- End' + AllcoinsDataOutput[value][index] + 'wallet widget -->';

                        $('#wallet-widgets').html(walletDivContent);
                        $('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
                        $('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
                        //console.log(walletDivContent);
                        
                        //console.log('http://127.0.0.1:7778/api/bitcoinrpc/getaddressesbyaccount?coin=' + AllcoinsDataOutput[value][index] + '&account=*');
                        //List coin addresses as drop down menu
                        var getaddrlist = {"coin":AllcoinsDataOutput[value][index],"agent":"bitcoinrpc","method":"getaddressesbyaccount","account":"*"};
                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify(getaddrlist),
                            url: 'http://127.0.0.1:7778',
                            //dataType: 'text',
                            success: function(data, textStatus, jqXHR) {
                                var addrlistData = JSON.parse(data);
                                //console.log('== Data OutPut ==');
                                //console.log(addrlistData);
                                $.each(addrlistData.result, function(coin_index){
                                    //console.log(coin_index);
                                    //console.log(addrlistData.result[index]);
                                    //console.log(AllcoinsDataOutput[value][index]);
                                    CoinAddrList = '<option value="' + addrlistData.result[coin_index] + '" data-select-options="' + AllcoinsDataOutput[value][index] + '">' + addrlistData.result[coin_index] + '</option>';

                                    //console.log(CoinAddrList);
                                    // Inject the whole content string into our existing HTML table
                                    $('select[data-currency="' + AllcoinsDataOutput[value][index] + '"]').append(CoinAddrList);

                                });
                                //console.log(data);
                                //console.log(data[0]);*/
                            },
                            error: function(xhr, textStatus, error) {
                                console.log('failed getting Coin History.');
                                console.log(xhr.statusText);
                                console.log(textStatus);
                                console.log(error);
                            }
                        });

                        //Get coin history and pupulate balance and other info to wallet widget
                        var historyvalues = {"timeout":20000,"agent":"basilisk","method":"history","vals":{"coin":"" + AllcoinsDataOutput[value][index] + ""}};
                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify(historyvalues),
                            url: 'http://127.0.0.1:7778',
                            //dataType: 'text',
                            success: function(data, textStatus, jqXHR) {
                                var CoinHistoryData = JSON.parse(data);
                                var label_color = '';
                                var label_icon = '';
                                var wallettblContent = '';
                                //console.log('== Data OutPut ==');
                                //console.log(CoinHistoryData);
                                $('span[data-currency="' + AllcoinsDataOutput[value][index] + '"][id="currency-balance"]').text(CoinHistoryData.balance);

                                var testhistory = {"result":"success","received":[{"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":9.94390000,"numseconds":1410727,"details":{"txid":"e0330be4ec6f2fd27bc26c559524ccd808a589a0752e18618b358d288d62be3a","vout":1,"height":1195141,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.89000000,"numseconds":1340168,"details":{"txid":"46b210cd0d505e88b738d1ca09595e33dc435f11d53e0516566deb0a9e0de5ba","vout":1,"height":1196389,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.94590000,"numseconds":1340168,"details":{"txid":"67499f6ccefadf046e7e26b9a650f32b6dd472046356d79f35714f37482692d8","vout":1,"height":1196382,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.87900000,"numseconds":1319872,"details":{"txid":"2426d9e0d3643706c0709af8e5342106633030b59ef738cb75d3c19aebe51a40","vout":1,"height":1196766,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.97890000,"numseconds":1319871,"details":{"txid":"820b553726e055de46ee40652b86692be2c52fd561edf8a927ab012be46b4ed4","vout":1,"height":1196748,"relays":1}}],"sent":[],"coin":"BTCD","balance":13.63770000,"tag":"10703025980307863381"};
                                console.log(testhistory.received[0]);
                                
                                $.each(testhistory.received, function(coin_history_index){
                                    //console.log(coin_history_index);

                                    wallettblContent += '<tr>';
                                        wallettblContent += '<td><span class="label label-xs label-danger"><i class="icon fa-arrow-right"></i></span></td>';
                                        wallettblContent += '<td class="hidden-xs">' + testhistory.received[coin_history_index].address + '</td>';
                                        wallettblContent += '<td>' + testhistory.received[coin_history_index].numseconds + ' ' + coin_history_index + '</td>';
                                        wallettblContent += '<td><span style="color: #f44336;">' + testhistory.received[coin_history_index].amount + '</span></td>';
                                    wallettblContent += '</tr>';
                                    $('#currency-tbl tbody').html(wallettblContent);
                                });
                                
                                /*<tr>
                                    <td><span class="label label-xs label-success"><i class="icon fa-arrow-left"></i></span></td>
                                    <td class="hidden-xs">1LkTfkQLXg2v86oc1MoLz68nKoshh5ARTC</td>
                                    <td>24 mins</td>
                                    <td><span style="color: #4caf50;">1.9456783</span></td>
                                </tr>*/
                                

                            },
                            error: function(xhr, textStatus, error) {
                                console.log('failed getting Coin History.');
                                console.log(xhr.statusText);
                                console.log(textStatus);
                                console.log(error);
                            }
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