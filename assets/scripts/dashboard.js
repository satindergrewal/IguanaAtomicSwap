var RunTotalFiatValue = '';
var ExecuteShowCoinHistory = '';

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
                    //console.log('== AllCoins Data OutPut ==');
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
                        if ( AllcoinsDataOutput[value][index] == 'DEX' ) { coinlogo = 'dex'; coinname = 'DEX'; }
                        if ( AllcoinsDataOutput[value][index] == 'DOGE' ) { coinlogo = 'dogecoin'; coinname = 'Dogecoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'DGB' ) { coinlogo = 'digibyte'; coinname = 'Digibyte'; }
                        if ( AllcoinsDataOutput[value][index] == 'MZC' ) { coinlogo = 'mazacoin'; coinname = 'Mazacoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'UNO' ) { coinlogo = 'unobtanium'; coinname = 'Unobtanium'; }
                        if ( AllcoinsDataOutput[value][index] == 'ZET' ) { coinlogo = 'zetacoin'; coinname = 'Zetacoin'; }


                        //console.log(AllcoinsDataOutput[value][index]);
                        walletDivContent += '<!-- Begin' + AllcoinsDataOutput[value][index] + 'wallet widget -->';
                        walletDivContent += '<div class="col-md-6 col-xs-12 masonry-item">';
                          walletDivContent += '<div class="widget widget-shadow">';
                            walletDivContent += '<div class="widget-header wallet-widget-header padding-15 clearfix">';
                              walletDivContent += '<div class="row no-space">';
                                  walletDivContent += '<div class="col-xs-7">';
                                    walletDivContent += '<a class="avatar avatar-lg pull-left margin-right-20 img-bordered" href="javascript:void(0)" data-currency="' + AllcoinsDataOutput[value][index] + '" data-modecode="' + modecode + '" id="currency-logo" onclick="SwitchBasicliskFull($(this).data())">';
                                      walletDivContent += '<img src="assets/images/cryptologo/' + coinlogo + '.png" alt="">';
                                      walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-currency="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
                                    walletDivContent += '</a>';
                                    walletDivContent += '<div>';
                                      walletDivContent += '<div class="font-size-20 hidden-xs" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-name">' + coinname + '</div>';
                                      walletDivContent += '<div class="form-material hidden-md hidden-xs">';
                                        /*walletDivContent += '<select class="form-control font-size-12" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-addr" style="width: 235px;">';
                                        walletDivContent += '</select>';*/
                                        walletDivContent += '<div class="font-size-12" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-addr"></div>';
                                      walletDivContent += '</div>';
                                      walletDivContent += '<div class="font-size-12 hidden-xs"></div>';
                                    walletDivContent += '</div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="col-xs-5">';
                                    walletDivContent += '<div class="row no-space text-center">';
                                      walletDivContent += '<div class="col-md-6 col-xs-12">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Balance">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon">' + AllcoinsDataOutput[value][index] + '</i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-balance">0</span>';
                                        walletDivContent += '</div>';
                                      walletDivContent += '</div>';
                                      /*walletDivContent += '<div class="col-md-4 col-xs-6">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="Unconfirmed">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon fa-spinner"></i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-unconfirmed">0</span>';
                                        walletDivContent += '</div>';
                                      walletDivContent += '</div>';*/
                                      walletDivContent += '<div class="col-md-6 hidden-xs hidden-sm">';
                                        walletDivContent += '<div class="counter" data-toggle="tooltip" data-placement="top" data-original-title="No. of Transactions">';
                                          walletDivContent += '<div class="counter-icon"><i class="icon fa-book"></i></div>';
                                          walletDivContent += '<span class="counter-number" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-nooftransactions">0</span>';
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
                            walletDivContent += '<div class="widget-footer text-center">';
                              walletDivContent += '<div class="row no-space ">';
                                walletDivContent += '<div data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-progressbars" style="display: none;">';
                                  walletDivContent += '<div class="progress progress-sm">';
                                  walletDivContent += '<div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 0%; font-size: 80%;" role="progressbar" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-bundles">Bundles <span data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-bundles-percent">0%</span></div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div data-currency="' + AllcoinsDataOutput[value][index] + '" id="additional-progress-bars">';
                                  walletDivContent += '<div class="progress progress-sm">';
                                  walletDivContent += '<div class="progress-bar progress-bar-warning progress-bar-striped active" style="width: 0%; font-size: 80%;" role="progressbar" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-utxo">utxo <span data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-utxo-percent">0%</span></div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="progress progress-sm">';
                                  walletDivContent += '<div class="progress-bar progress-bar-danger progress-bar-striped active" style="width: 0%; font-size: 80%;" role="progressbar" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-balances">Balances <span data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-balances-percent">0%</span></div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '<div class="progress progress-sm">';
                                  walletDivContent += '<div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 0%; font-size: 80%;" role="progressbar" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-validated">Validated <span data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-validated-percent">0%</span></div>';
                                  walletDivContent += '</div>';
                                  walletDivContent += '</div><!-- END additional-progress-bars -->';
                                walletDivContent += '</div>';
                              walletDivContent += '</div>';
                                walletDivContent += '<div class="btn-group btn-group-justified">';
                                    walletDivContent += '<div class="btn-group" role="group">';
                                      walletDivContent += '<button type="button" class="btn btn-xs bg-blue-grey-200 grey-800 waves-effect waves-light" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-send" onclick="sendCurrency($(this).data())" data-target="#SendCoinModelStep1" data-toggle="modal">';
                                        walletDivContent += '<i class="icon wb-upload" aria-hidden="true"></i>';
                                        walletDivContent += '<br>';
                                        walletDivContent += '<span class="text-uppercase hidden-xs">Send</span>';
                                      walletDivContent += '</button>';
                                    walletDivContent += '</div>';
                                    walletDivContent += '<div class="btn-group" role="group">';
                                      walletDivContent += '<button type="button" class="btn btn-xs bg-blue-grey-100 grey-800 waves-effect waves-light" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-receive" onclick="ReceiveCurrency($(this).data())" data-target="#ReceiveCoinModel" data-toggle="modal">';
                                        walletDivContent += '<i class="icon wb-download " aria-hidden="true"></i>';
                                        walletDivContent += '<br>';
                                        walletDivContent += '<span class="text-uppercase hidden-xs">Receive</span>';
                                      walletDivContent += '</button>';
                                    walletDivContent += '</div>';
                                    walletDivContent += '<div class="btn-group" role="group">';
                                      walletDivContent += '<button type="button" class="btn btn-xs bg-blue-grey-300 grey-800 waves-effect waves-light" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-trade">';
                                        walletDivContent += '<i class="icon wb-graph-up" aria-hidden="true"></i>';
                                        walletDivContent += '<br>';
                                        walletDivContent += '<span class="text-uppercase hidden-xs">Trade</span>';
                                      walletDivContent += '</button>';
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
                        var getaddrlist = {"agent":"SuperNET","method":"activehandle"};
                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify(getaddrlist),
                            url: 'http://127.0.0.1:7778',
                            //dataType: 'text',
                            success: function(data, textStatus, jqXHR) {
                                var addrlistData = JSON.parse(data);
                                //console.log('== Address List Data OutPut ==');
                                //console.log(addrlistData);
                                $('div[data-currency="' + AllcoinsDataOutput[value][index] + '"][id="currency-addr"]').text(addrlistData[AllcoinsDataOutput[value][index]])
                                
                                //console.log(data);
                                //console.log(data[0]);
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

                        //Get coin history and pupulate balance and other info to wallet widget
                        var historyvalues = {"timeout":20000,"agent":"basilisk","method":"history","vals":{"coin":"" + AllcoinsDataOutput[value][index] + ""}};
                        var ExecuteShowCoinHistory = setInterval(function() {
                            if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                                clearInterval(ExecuteShowCoinHistory);
                                console.log('=> No wallet logged in. No need to Run History.');
                            } else {
                                ShowCoinHistory(historyvalues);
                                //console.log('wallet widget refereshed (every 1 seconds)');
                                //Show Coin Progress Bars
                                ShowCoinProgressBar(AllcoinsDataOutput[value][index]);
                            }
                        }, 1000);
                       
                    });
                },
                error: function(xhr, textStatus, error) {
                    console.log('failed starting BitcoinDark.');
                    console.log(xhr.statusText);
                    if ( xhr.readyState == 0 ) {
                        Iguana_ServiceUnavailable();
                    }
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

    var handleWalletSendRec = function() {
        
        $('#currency-logo').click(function() {
            console.log('hello!');
        });

        
    }


    return {
        //main function to initiate the module
        init: function() {

            if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                console.log('=> No wallet logged in. No need to run Dashboard JS.');
            } else {
                handleWalletWidgets();
                handleWalletSendRec();
                TotalFiatValue();
            }

            /*setInterval(function() {
                handleWalletWidgets();
                console.log('wallet widget refereshed (every 15 seconds)');
            }, 15000);*/

            RunTotalFiatValue = setInterval(function() {
                if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                console.log('=> No wallet logged in. No need to get Rates.');
                StopTotalFiatValue();
                } else {
                    TotalFiatValue();
                    //console.log('Get Rates (every 60 seconds)');
                }
            }, 1000);

        }

    };

}();

jQuery(document).ready(function() {
    Dashboard.init();
});


function ShowCoinHistory(getData) {
    Iguana_activehandle();
    if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
        console.log('There\'s no active wallet logged in. Please Login.');
        $('#logint-another-wallet').hide();
    } else {
        var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));
        if ( JSON.parse(CheckLoginData).pubkey != Iguana_activehandle_output.pubkey ) {
            console.log("ShowCoinHistory: sessionStorage data and activehandle data doesn't match");
            console.log(Iguana_activehandle_output.pubkey);
            console.log(JSON.parse(CheckLoginData).pubkey);
            ClearOnLogout(true, true);
        }
        if ( JSON.parse(CheckLoginData).status === 'unlocked' ) {
            //console.log(getData.vals['coin']);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(getData),
                url: 'http://127.0.0.1:7778',
                //dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var CoinHistoryData = JSON.parse(data);
                    var label_color = '';
                    var label_icon = '';
                    var wallettblContent = '';
                    //console.log('== Coin History Data OutPut ==');
                    //console.log('Coin History API Executed');
                    //console.log(getData.vals['coin']+': '+CoinHistoryData.balance);

                    //var testhistory = '';
                    //console.log(testhistory.history.reverse());
                    //console.log(testhistory.sent);

                    $('span[data-currency="' + getData.vals['coin'] + '"][id="currency-balance"]').text(CoinHistoryData.balance);

                    //Update Dashboard Header values as well
                    if ( getData.vals['coin'] == 'BTC' || getData.vals['coin'] == 'BTCD' ) {
                      $('span[data-currency="' + getData.vals['coin'] + '"][id="header_coinbalance"]').text(CoinHistoryData.balance);
                    }

                    //Calculate Total Fiat Value of BTC/BTCD in Fiat and disaply on Dashboard
                    //TotalFiatValue();
                    
                    var show_coin_history_unspents = CoinHistoryData.unspents[0]; //Store unspents array output in variable.
                    var show_coin_history_spends = CoinHistoryData.spends[0]; //Store spends array output in variable.
                    //var show_coin_history = testhistory; //Enable to get history from just test variable.
                    //console.log(show_coin_history_unspents);
                    //console.log(show_coin_history_spends);

                    
                    //if ( sessionStorage.getItem('PrevHistoryLength_'+getData.vals['coin']) != CoinHistoryData.history.length ) {
                      $.each(show_coin_history_unspents, function(coin_history_index){
                          //console.log(coin_history_index);
                          //console.log(show_coin_history_unspents);

                          var label_class = '';
                          var icon_arrow_direction = '';
                          var balance_text_color = '';

                          //if ('vin' in show_coin_history_unspents[coin_history_index].details) { label_class = 'label-danger'; icon_arrow_direction = 'fa-arrow-right'; balance_text_color = '#f44336'; }
                          //if ('vout' in show_coin_history_unspents[coin_history_index].unspent) { label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#4caf50'; }
                          label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#4caf50';

                          wallettblContent += '<tr>';
                              wallettblContent += '<td><span class="label label-xs ' + label_class + '"><i class="icon ' + icon_arrow_direction + '"></i></span></td>';
                              wallettblContent += '<td class="hidden-xs">' + show_coin_history_unspents[coin_history_index].address + '</td>';
                              wallettblContent += '<td>' + secondsToString(show_coin_history_unspents[coin_history_index].timestamp) + '</td>';
                              wallettblContent += '<td><span style="color: ' + balance_text_color + ';"><a data-txid="'+show_coin_history_unspents[coin_history_index].txid+'" href="#">' + show_coin_history_unspents[coin_history_index].amount + '</a></span></td>';
                          wallettblContent += '</tr>';
                          $('table[data-currency="' + getData.vals['coin'] + '"][id="currency-tbl"] tbody').html(wallettblContent);
                          //$('#currency-tbl tbody').html(wallettblContent);
                          //sessionStorage.setItem('PrevHistoryLength_'+getData.vals['coin'], CoinHistoryData.history.length);
                      });

                      $.each(show_coin_history_spends, function(coin_history_index){
                          //console.log(coin_history_index);
                          //console.log(show_coin_history_spends);

                          var label_class = '';
                          var icon_arrow_direction = '';
                          var balance_text_color = '';

                          //if ('vin' in show_coin_history_spends[coin_history_index].details) { label_class = 'label-danger'; icon_arrow_direction = 'fa-arrow-right'; balance_text_color = '#f44336'; }
                          //if ('vout' in show_coin_history_spends[coin_history_index].unspent) { label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#4caf50'; }
                          label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#4caf50';

                          wallettblContent += '<tr>';
                              wallettblContent += '<td><span class="label label-xs ' + label_class + '"><i class="icon ' + icon_arrow_direction + '"></i></span></td>';
                              wallettblContent += '<td class="hidden-xs">' + show_coin_history_spends[coin_history_index].address + '</td>';
                              wallettblContent += '<td>' + secondsToString(show_coin_history_spends[coin_history_index].timestamp) + '</td>';
                              wallettblContent += '<td><span style="color: ' + balance_text_color + ';"><a href="#">' + show_coin_history_spends[coin_history_index].amount + '</a></span></td>';
                          wallettblContent += '</tr>';
                          $('table[data-currency="' + getData.vals['coin'] + '"][id="currency-tbl"] tbody').html(wallettblContent);
                          //$('#currency-tbl tbody').html(wallettblContent);
                          //sessionStorage.setItem('PrevHistoryLength_'+getData.vals['coin'], CoinHistoryData.history.length);
                      });

                      $.each(show_coin_history_spends, function(coin_history_index){
                          //console.log(coin_history_index);
                          //console.log(show_coin_history_spends[coin_history_index].dest.vouts);

                          var label_class = '';
                          var icon_arrow_direction = '';
                          var balance_text_color = '';

                          //if ('vin' in show_coin_history_spends[coin_history_index].details) { label_class = 'label-danger'; icon_arrow_direction = 'fa-arrow-right'; balance_text_color = '#f44336'; }
                          //if ('vout' in show_coin_history_spends[coin_history_index].unspent) { label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#4caf50'; }
                          label_class = 'label-danger'; icon_arrow_direction = 'fa-arrow-right'; balance_text_color = '#f44336';

                          wallettblContent += '<tr>';
                              wallettblContent += '<td><span class="label label-xs ' + label_class + '"><i class="icon ' + icon_arrow_direction + '"></i></span></td>';
                              wallettblContent += '<td class="hidden-xs">' + Object.keys(show_coin_history_spends[coin_history_index].dest.vouts[0]) + '</td>';
                              wallettblContent += '<td>' + secondsToString(show_coin_history_spends[coin_history_index].dest.timestamp) + '</td>';
                              wallettblContent += '<td><span style="color: ' + balance_text_color + ';"><a href="#">' + show_coin_history_spends[coin_history_index].dest.vouts[0][Object.keys(show_coin_history_spends[coin_history_index].dest.vouts[0])] + '</a></span></td>';
                          wallettblContent += '</tr>';
                          $('table[data-currency="' + getData.vals['coin'] + '"][id="currency-tbl"] tbody').html(wallettblContent);
                          //$('#currency-tbl tbody').html(wallettblContent);
                          //sessionStorage.setItem('PrevHistoryLength_'+getData.vals['coin'], CoinHistoryData.history.length);
                      });
                    //}
                   
                    //console.log(show_coin_history_spends.length);
                    //$('span[data-currency="' + getData.vals['coin'] + '"][id="currency-nooftransactions"]').text(show_coin_history_spends.length);
                },
                error: function(xhr, textStatus, error) {
                    console.log('failed getting Coin History.');
                    console.log(xhr.statusText);
                    if ( xhr.readyState == 0 ) {
                        Iguana_ServiceUnavailable();
                        ClearOnLogout(true, true);
                    }
                    console.log(textStatus);
                    console.log(error);
                }
            });
        } else if ( JSON.parse(CheckLoginData).status === 'locked' ) {
            console.log('Wallet is Locked.');
            $('#login-welcome').text('Wallet Locked. Please login');
            $('#register-btn').hide();
            $("#loginbtn").text('Unlock');
        }
    }
    
}

function StopShowCoinHistory() {
    clearInterval(ExecuteShowCoinHistory);
    console.log('Stopped executing History API.');
}


function SwitchBasicliskFull(switch_data) {
  //console.log(switch_data.currency);
  //console.log(switch_data.modecode);
  var relay_value = '';
  var validate_value = '';
  var mode_value = '';

  if ( switch_data.modecode == 'B' ) { relay_value = 1; validate_value = 1; mode_value = 'Basilisk'; }
  if ( switch_data.modecode == 'F' ) { relay_value = 0; validate_value = 0; mode_value = 'Full'; }

  var SwitchCoinModeData = {
      "poll": 100,
      "active": 1,
      "newcoin": switch_data.currency,
      "startpend": 1,
      "endpend": 1,
      "services": 128,
      "maxpeers": 16,
      "RELAY": relay_value,
      "VALIDATE": validate_value,
      "portp2p": 14631
  }
  //console.log(SwitchCoinModeData);
  //Switch selected coins' mode
  $.ajax({
      type: 'GET',
      data: SwitchCoinModeData,
      url: 'http://127.0.0.1:7778/api/iguana/addcoin',
      dataType: 'text',
      success: function(data, textStatus, jqXHR) {
          var SwitchCoinDataOutput = JSON.parse(data);
          //console.log('== Data OutPut ==');
          //console.log(SwitchCoinDataOutput);

          if (SwitchCoinDataOutput.result === 'coin added') {
              console.log('coin added');
              toastr.success(switch_data.currency + " switched to " + mode_value + " Mode", "Coin Notification");
          } else if (SwitchCoinDataOutput.result === 'coin already there') {
              console.log('coin already there');
              //toastr.info("Looks like" + switch_data.currency + "already running.", "Coin Notification");
          } else if (SwitchCoinDataOutput.result === null) {
              console.log('coin already there');
              //toastr.info("Looks like" + switch_data.currency + "already running.", "Coin Notification");
          }
      },
      error: function(xhr, textStatus, error) {
          console.log('failed starting BitcoinDark.');
          console.log(xhr.statusText);
          if ( xhr.readyState == 0 ) {
              Iguana_ServiceUnavailable();
          }
          console.log(textStatus);
          console.log(error);
          //swal("Oops...", "Something went wrong!", "error");
          if (xhr.readyState == '0' ) {
              toastr.error("Unable to connect to Iguana", "Account Notification")
          }
      }
  });
}

function TotalFiatValue() {
  var BTC_balance = $('span[data-currency="BTC"][id="currency-balance"]').text();
  var BTCD_balance = $('span[data-currency="BTCD"][id="currency-balance"]').text();
  var Fiat_Currency = localStorage.getItem('EasyDEX_FiatCurrency');
  var BTC_Fiat_pair_value = '';
  var Conversion_Fiat_Pair = '';
  var BTCD_Fiat_pair_value = '';

  $('span[data-currency="BTC"][id="header_coinname_balance"]').text(BTC_balance + ' BTC');
  $('span[data-currency="BTCD"][id="header_coinname_balance"]').text(BTCD_balance + ' BTCD' );
  
  if ( Fiat_Currency == 'USD' ) {
    BTC_Fiat_pair_value = 'BTC/'+Fiat_Currency;
    Conversion_Fiat_Pair = 'EUR/USD';
  } else {
    BTC_Fiat_pair_value = 'BTC/USD';
    Conversion_Fiat_Pair = Fiat_Currency+'/USD';
  }

  //console.log(BTC_balance); console.log(BTCD_balance);

  var TotalFiatValueData = {"agent":"iguana","method":"rates","quotes":["BTCD/BTC", BTC_Fiat_pair_value, Conversion_Fiat_Pair]};
  //console.log(TotalFiatValueData);

  if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
    console.log('=> No wallet logged in. No need to get Rates.');
  } else {
    //Get Rates
    $.ajax({
      type: 'POST',
      data: JSON.stringify(TotalFiatValueData),
      url: 'http://127.0.0.1:7778',
      //dataType: 'text',
      success: function(data, textStatus, jqXHR) {
            var RatesData = JSON.parse(data);
            var label_color = '';
            var label_icon = '';
            var wallettblContent = '';
            //console.log('== Rates Data OutPut ==');
            //console.log(RatesData.rates[2]);
            localStorage.setItem('EasyDEX_BTCD_BTC_pair_value', RatesData.rates[0]['BTCD/BTC']); //e.g BTCD/BTC
            localStorage.setItem('EasyDEX_BTC_Fiat_pair_value', RatesData.rates[1][BTC_Fiat_pair_value]); //e.g BTC/USD
            localStorage.setItem('EasyDEX_Conversion_Fiat_Pair', Conversion_Fiat_Pair); //e.g EUR/USD
            localStorage.setItem('EasyDEX_Conversion_Fiat_Pair_value', RatesData.rates[2][Conversion_Fiat_Pair]); //e.g EUR/USD: 1.11830926

            var tmp_btcd_btc = RatesData.rates[0];
            var tmp_btc_fiat = RatesData.rates[1];
            //console.log(tmp_btcd_btc['BTCD/BTC']); console.log(tmp_btc_fiat[BTC_Fiat_pair_value]);

            BTCD_Fiat_pair_value = parseFloat(tmp_btcd_btc['BTCD/BTC']) * parseFloat(tmp_btc_fiat[BTC_Fiat_pair_value]);
            //console.log(BTCD_Fiat_pair_value);
            localStorage.setItem('EasyDEX_BTCD_Fiat_pair_value', BTCD_Fiat_pair_value); //e.g BTCD/USD: 2.0873619962

            var tmp_btcd_fiat_toal = parseFloat(BTCD_balance) * parseFloat(BTCD_Fiat_pair_value);
            var tmp_btc_fiat_toal = parseFloat(BTC_balance) * parseFloat(tmp_btc_fiat[BTC_Fiat_pair_value]);
            //console.log('total btc btcd usd value')
            //console.log(tmp_btcd_fiat_toal); console.log(tmp_btc_fiat_toal);

            $('span[data-currency="BTC"][id="header_coinfiatbalance"]').text(tmp_btc_fiat_toal.toFixed(2) + ' ' + Fiat_Currency);
            $('span[data-currency="BTCD"][id="header_coinfiatbalance"]').text(tmp_btcd_fiat_toal.toFixed(2) + ' ' + Fiat_Currency);

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
}

function StopTotalFiatValue() {
    clearInterval(RunTotalFiatValue);
    console.log('Stopped executing Total Fiat Value API with Rates');
}

function secondsToString(seconds) {
  var a = new Date(seconds * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


function ShowCoinProgressBar(coin) {
  //console.log('Showing Prgoress bar of '+coin);
  var getinfoValues = {"coin":coin,"agent":"bitcoinrpc","method":"getinfo"};
  $.ajax({
      type: 'POST',
      data: JSON.stringify(getinfoValues),
      url: 'http://127.0.0.1:7778',
      //dataType: 'text',
      success: function(data, textStatus, jqXHR) {
          var CoinInfoData = JSON.parse(data);
          //console.log('== Coin Info Data OutPut ==');

          if (typeof CoinInfoData.bundles == 'undefined') {
            //console.log(coin+' is undefined');
          } else {
            if ( parseInt(CoinInfoData.RTheight) != 0 ) {
              //console.log(coin+' is less than 99.98% complete.');
              $('div[data-currency="'+coin+'"][id="currency-progressbars"]').show();
              $('div[data-currency="'+coin+'"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2)+'%');
              $('span[data-currency="'+coin+'"][id="currency-bundles-percent"]').text(parseFloat(CoinInfoData.bundles).toFixed(2)+'% - ( '+parseInt(CoinInfoData.blocks)+1+' / '+CoinInfoData.longestchain+' ) ==>> RT'+CoinInfoData.RTheight);
              $('div[data-currency="'+coin+'"][id="additional-progress-bars"]').hide();
              $('div[data-currency="'+coin+'"][id="currency-bundles"]').removeClass( "progress-bar-info" ).addClass( "progress-bar-indicating progress-bar-success" );
            }
            if ( parseInt(CoinInfoData.RTheight) == 0 ) {
              console.log(coin+': '+CoinInfoData.bundles);
              $('div[data-currency="'+coin+'"][id="currency-progressbars"]').show();
              $('div[data-currency="'+coin+'"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2)+'%');
              $('span[data-currency="'+coin+'"][id="currency-bundles-percent"]').text(parseFloat(CoinInfoData.bundles).toFixed(2)+'% - ( '+parseInt(CoinInfoData.blocks)+1+' / '+CoinInfoData.longestchain+' )');
              $('div[data-currency="'+coin+'"][id="currency-utxo"]').width(parseFloat(CoinInfoData.utxo).toFixed(2)+'%');
              $('span[data-currency="'+coin+'"][id="currency-utxo-percent"]').text(parseFloat(CoinInfoData.utxo).toFixed(2)+'%');
              $('div[data-currency="'+coin+'"][id="currency-balances"]').width(parseFloat(CoinInfoData.balances).toFixed(2)+'%');
              $('span[data-currency="'+coin+'"][id="currency-balances-percent"]').text(parseFloat(CoinInfoData.balances).toFixed(2)+'%');
              $('div[data-currency="'+coin+'"][id="currency-validated"]').width(parseFloat(CoinInfoData.validated).toFixed(2)+'%');
              $('span[data-currency="'+coin+'"][id="currency-validated-percent"]').text(parseFloat(CoinInfoData.validated).toFixed(2)+'%');
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