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
                        if ( AllcoinsDataOutput[value][index] == 'DEX' ) { coinlogo = 'dex'; coinname = 'DEX'; }


                        //console.log(AllcoinsDataOutput[value][index]);
                        walletDivContent += '<!-- Begin' + AllcoinsDataOutput[value][index] + 'wallet widget -->';
                        walletDivContent += '<div class="col-md-6 col-xs-12 masonry-item">';
                          walletDivContent += '<div class="widget widget-shadow">';
                            walletDivContent += '<div class="widget-header wallet-widget-header padding-15 clearfix">';
                              walletDivContent += '<div class="row no-space">';
                                  walletDivContent += '<div class="col-xs-7">';
                                    walletDivContent += '<a class="avatar avatar-lg pull-left margin-right-20 img-bordered" href="javascript:void(0)" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-logo">';
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
                                walletDivContent += '<div class="btn-group btn-group-justified">';
                                    walletDivContent += '<div class="btn-group" role="group">';
                                      walletDivContent += '<button type="button" class="btn btn-xs bg-blue-grey-200 grey-800 waves-effect waves-light" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-send" onclick="sendCurrency($(this).data())" data-target="#exampleMultipleOne" data-toggle="modal">';
                                        walletDivContent += '<i class="icon wb-upload" aria-hidden="true"></i>';
                                        walletDivContent += '<br>';
                                        walletDivContent += '<span class="text-uppercase hidden-xs">Send</span>';
                                      walletDivContent += '</button>';
                                    walletDivContent += '</div>';
                                    walletDivContent += '<div class="btn-group" role="group">';
                                      walletDivContent += '<button type="button" class="btn btn-xs bg-blue-grey-100 grey-800 waves-effect waves-light" data-currency="' + AllcoinsDataOutput[value][index] + '" id="currency-receive">';
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
                                console.log('== Data OutPut ==');
                                console.log(CoinHistoryData);


                                //var testhistory = {"result":"success","received":[{"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":9.94390000,"numseconds":1410727,"details":{"txid":"e0330be4ec6f2fd27bc26c559524ccd808a589a0752e18618b358d288d62be3a","vout":1,"height":1195141,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.89000000,"numseconds":1340168,"details":{"txid":"46b210cd0d505e88b738d1ca09595e33dc435f11d53e0516566deb0a9e0de5ba","vout":1,"height":1196389,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.94590000,"numseconds":1340168,"details":{"txid":"67499f6ccefadf046e7e26b9a650f32b6dd472046356d79f35714f37482692d8","vout":1,"height":1196382,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.87900000,"numseconds":1319872,"details":{"txid":"2426d9e0d3643706c0709af8e5342106633030b59ef738cb75d3c19aebe51a40","vout":1,"height":1196766,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.97890000,"numseconds":1319871,"details":{"txid":"820b553726e055de46ee40652b86692be2c52fd561edf8a927ab012be46b4ed4","vout":1,"height":1196748,"relays":1}}],"sent":[{"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":9.94390000,"numseconds":1410727,"details":{"txid":"e0330be4ec6f2fd27bc26c559524ccd808a589a0752e18618b358d288d62be3a","vout":1,"height":1195141,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.89000000,"numseconds":1340168,"details":{"txid":"46b210cd0d505e88b738d1ca09595e33dc435f11d53e0516566deb0a9e0de5ba","vout":1,"height":1196389,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.94590000,"numseconds":1340168,"details":{"txid":"67499f6ccefadf046e7e26b9a650f32b6dd472046356d79f35714f37482692d8","vout":1,"height":1196382,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.87900000,"numseconds":1319872,"details":{"txid":"2426d9e0d3643706c0709af8e5342106633030b59ef738cb75d3c19aebe51a40","vout":1,"height":1196766,"relays":1}}, {"address":"RCNL1GJuTVt88dgnuiwS7i51ztjYHpPKF2","amount":0.97890000,"numseconds":1319871,"details":{"txid":"820b553726e055de46ee40652b86692be2c52fd561edf8a927ab012be46b4ed4","vout":1,"height":1196748,"relays":1}}],"coin":"BTCD","balance":13.63770000,"tag":"10703025980307863381"};
                                var testhistory = {"result":"success","history":[{"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":0.02376752,"numseconds":5103473,"details":{"txid":"2a70dca9f0ba2bf77c9fe59cdc8538c7bf87eee077af687f3271a5461b087baa","vout":56,"height":1138822,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":0.01810419,"numseconds":5104375,"details":{"txid":"b66f4c51ca2ae08695171c7d9cbeca10b85d321a721895de3804aa7e204606b7","vout":56,"height":1138810,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":0.10304500,"numseconds":3900995,"details":{"txid":"9a85ec8b3d34eed29af054783120801f81d18aee2e596d3118dfc02d8ada77a4","vout":66,"height":1159828,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":0.02244710,"numseconds":3901699,"details":{"txid":"241c353c6e0b7dc43960d6b4a4fb9cc527e797335a5d6a8f0b03888f74081d03","vout":62,"height":1159817,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":256.85168445,"numseconds":3284547,"details":{"txid":"0a97fceed78efb91fc0cdbb14f7757ded296cd0bdc4d437303a4d56aa79a68c8","vout":2,"height":1170454,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":270.76000000,"numseconds":3288542,"details":{"txid":"0f09288c22a87e15e646f6b8bd6c486f0f3c07bce94fe98321b9e01faf369811","vout":1,"height":1170388,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":274.16000000,"numseconds":3298564,"details":{"txid":"f832780904d01445c7f28b82a1adffa4f0435c202b8a77a8be5bb3f5367e83d8","vout":1,"height":1170218,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":272.40878698,"numseconds":3299728,"details":{"txid":"7d45235130db08fdb3bcd3aec695a958749e8ada75087f98ce0dd7d2e3c8838f","vout":2,"height":1170203,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":137.10996017,"numseconds":3238596,"details":{"txid":"b2321bd1b472fe2cab5d3063e46ed630157a4a796c026e03b7ee82f5f641bf9c","vout":2,"height":1171264,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":137.09000000,"numseconds":3238596,"details":{"txid":"b2321bd1b472fe2cab5d3063e46ed630157a4a796c026e03b7ee82f5f641bf9c","vout":1,"height":1171264,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":135.39260510,"numseconds":3240926,"details":{"txid":"82fb07354dcde25d16d590a61374f18724b3393f79dae2c759f86540b87ca2b2","vout":2,"height":1171232,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":135.39000000,"numseconds":3240926,"details":{"txid":"82fb07354dcde25d16d590a61374f18724b3393f79dae2c759f86540b87ca2b2","vout":1,"height":1171232,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":274.19000000,"numseconds":3241822,"details":{"txid":"6102ac2775dec4dcf4775a6d0b195cd5fd8aec4b4c02a15072389ae4f5568740","vout":1,"height":1171211,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":128.42000000,"numseconds":3242717,"details":{"txid":"c08820095320f87e8e44079d7e192d3eac9db0bbd6deb5427fc44b7203482e2c","vout":1,"height":1171188,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.22436074,"numseconds":3195488,"details":{"txid":"9fb4af083d6a44d0fec4371c386ea6941b79c92aab9a49234bb417cf05d3a95f","vout":2,"height":1171992,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.21000000,"numseconds":3195488,"details":{"txid":"9fb4af083d6a44d0fec4371c386ea6941b79c92aab9a49234bb417cf05d3a95f","vout":1,"height":1171992,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.22394341,"numseconds":3197886,"details":{"txid":"a704433666022059b1c1cbff0dbb056b1ebbf50f4835a28c40cf2f2a43406f65","vout":2,"height":1171950,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.22000000,"numseconds":3197886,"details":{"txid":"a704433666022059b1c1cbff0dbb056b1ebbf50f4835a28c40cf2f2a43406f65","vout":1,"height":1171950,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":64.22669459,"numseconds":3199611,"details":{"txid":"edf827ab8aef2b62b2b7d72866bf8271407bf051ed799af52ce8429fae8e5bde","vout":2,"height":1171922,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":64.21000000,"numseconds":3199611,"details":{"txid":"edf827ab8aef2b62b2b7d72866bf8271407bf051ed799af52ce8429fae8e5bde","vout":1,"height":1171922,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":128.44353936,"numseconds":3201806,"details":{"txid":"89ce935417e49ce28bf7d5d31df166f576d97be4cb0ef72b409c2d570dc70147","vout":2,"height":1171880,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":128.43000000,"numseconds":3201806,"details":{"txid":"89ce935417e49ce28bf7d5d31df166f576d97be4cb0ef72b409c2d570dc70147","vout":1,"height":1171880,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":137.11374459,"numseconds":3206060,"details":{"txid":"a32ba7ca22fbb01b226dc21ffe3071a3ed11434e059a763b5a5dacb3e8000051","vout":2,"height":1171808,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":137.10000000,"numseconds":3206060,"details":{"txid":"a32ba7ca22fbb01b226dc21ffe3071a3ed11434e059a763b5a5dacb3e8000051","vout":1,"height":1171808,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":128.44940595,"numseconds":3210714,"details":{"txid":"edb8cf0079bcc41e7cca590ced45979fe2de72c97340d8fa140570f76aebdbb7","vout":2,"height":1171732,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":128.43000000,"numseconds":3210714,"details":{"txid":"edb8cf0079bcc41e7cca590ced45979fe2de72c97340d8fa140570f76aebdbb7","vout":1,"height":1171732,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.22036421,"numseconds":3219390,"details":{"txid":"8a101b692ff233d528d01f36ebfa7004beba02f98a157d2e55e2914df9bc87de","vout":2,"height":1171591,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":136.22000000,"numseconds":3219390,"details":{"txid":"8a101b692ff233d528d01f36ebfa7004beba02f98a157d2e55e2914df9bc87de","vout":1,"height":1171591,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":815.20263247,"numseconds":1984057,"details":{"txid":"be429824bb4d3c67956d7d7458d8485b8b6a529275f7b37221afc69ae9fbddfe","vout":1,"height":1193330,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":340.71761164,"numseconds":464110,"details":{"txid":"9cce9b4b570622fe03b521b4c798c7704fd457bbd4f36ac85ab8a2f74798e2fe","vout":1,"height":1221983,"relays":1}}, {"address":"REzqSJ7qonDbMVWfPEJKfRPduvfPyumkPR","amount":155.41088201,"numseconds":387136,"details":{"txid":"92b671a5381ba536357923859baa155a2cd1297a6f3afc7b904cd7ca26cff582","vout":1,"height":1223337,"relays":1}}],"coin":"BTCD","balance":5066.99357948,"tag":"15046830879277684209"};
                                //console.log(testhistory.history.reverse());
                                //console.log(testhistory.sent);

                                $('span[data-currency="' + AllcoinsDataOutput[value][index] + '"][id="currency-balance"]').text(CoinHistoryData.balance);
                                
                                //var show_coin_history = CoinHistoryData; //Enable to get history from each coins's wallet address.
                                var show_coin_history = testhistory; //Enable to get history from just test variable.
                                $.each(show_coin_history.history.reverse(), function(coin_history_index){
                                    //console.log(coin_history_index);
                                    //console.log(show_coin_history.history[coin_history_index].details.vout);

                                    var label_class = '';
                                    var icon_arrow_direction = '';
                                    var balance_text_color = '';

                                    if ('vin' in show_coin_history.history[coin_history_index].details) { label_class = 'label-danger'; icon_arrow_direction = 'fa-arrow-left'; balance_text_color = '#f44336'; }
                                    if ('vout' in show_coin_history.history[coin_history_index].details) { label_class = 'label-success'; icon_arrow_direction = 'fa-arrow-right'; balance_text_color = '#4caf50'; }


                                    wallettblContent += '<tr>';
                                        wallettblContent += '<td><span class="label label-xs ' + label_class + '"><i class="icon ' + icon_arrow_direction + '"></i></span></td>';
                                        wallettblContent += '<td class="hidden-xs">' + show_coin_history.history[coin_history_index].address + '</td>';
                                        wallettblContent += '<td>' + show_coin_history.history[coin_history_index].numseconds + '</td>';
                                        wallettblContent += '<td><span style="color: ' + balance_text_color + ';">' + show_coin_history.history[coin_history_index].amount + '</span></td>';
                                    wallettblContent += '</tr>';
                                    $('#currency-tbl tbody').html(wallettblContent);
                                });
                                
                                //console.log(show_coin_history.history.length);
                                $('span[data-currency="' + AllcoinsDataOutput[value][index] + '"][id="currency-nooftransactions"]').text(show_coin_history.history.length);
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

    var handleWalletSendRec = function() {
        
        $('#currency-logo').click(function() {
            console.log('hello!');
        });

        
    }


    return {
        //main function to initiate the module
        init: function() {

            handleWalletWidgets();
            handleWalletSendRec();

        }

    };

}();

jQuery(document).ready(function() {
    Dashboard.init();
});