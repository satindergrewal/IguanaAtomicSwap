var RunTotalFiatValue = '';
var ExecuteShowCoinHistory = '';

var active_edexcoin = '';
var tmp_send_to_addr = '';
var tmp_send_total_amount = '';
var edexcoin_send_form_validator = '';

var Dashboard = function() {


    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "showDuration": "15000",
        "hideDuration": "1000",
        "timeOut": "15000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    var handle_edex_wallet = function() {
      //var action_btn_code = getActiveEdexcoin();
      $('#btn_edexcoin_wallet_dashboard').click(function() {
          console.log('edex wallet dashbaord button clicked...');
          console.log($(this).data());
      });
    }

    var handle_edex_dashboard = function() {
        $('.btn_refresh_edexcoin_dashboard').click(function() {
          $( "#btn_edexcoin_dashboard" ).trigger( "click" );
        });

        $('#btn_edexcoin_dashboard').click(function() {
          var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
          //console.log('EasyDEX dashbaord button clicked...');
          //console.log($(this).data());
          if ( sessionStorage.getItem('edexTmpMode') === "Full") {
            sessionStorage.setItem('edexTmpRefresh', "start");
          }
          if ( sessionStorage.getItem('edexTmpMode') === "Basilisk" || sessionStorage.getItem('edexTmpMode') === "Native" ) {
            sessionStorage.setItem('edexTmpRefresh', "stop");
          }
          $('#edexcoin_dashoard_section').show();
          $('#edexcoin_dashboardinfo').show();
          $('#edexcoin_send').hide();
          $('#edexcoin_recieve').hide();
          $('#edexcoin_recieve_section').hide();
          $('#edexcoin_settings').hide();
          
          var selected_coinmode = sessionStorage.getItem('edexTmpMode')
          if ( selected_coinmode == 'Basilisk' ) {
            getDEXGetBalance(active_edexcoin).then(function(result){
              console.log(result)
              $('#edex_total_balance').text(result.total);
            });
          } else {
            EDEXlistunspent(active_edexcoin).then(function(result){
              //console.log(result)
              if (result[0] != undefined) {
                //console.log(result[0])
                $('#edex_total_balance').text(result[0].total.toFixed(8));
                //console.log(result[0].total)
              } else {
                $('#edex_total_balance').text('0');
              }
            });
          }
          EdexfillTxHistory(active_edexcoin);
          //getCoinBalance(active_edexcoin);
          //EdexfillTxHistory(active_edexcoin);
          //clearEdexSendFieldData();
          $('.edexcoin-send-form')[0].reset();
        });
    }

    var handle_edex_send = function() {
      $('#btn_edexcoin_send').click(function() {
        //console.log(active_edexcoin);
        sessionStorage.setItem('edexTmpRefresh', "stop");


        $('#edexcoin_dashboardinfo').hide();
        $('#edexcoin_send').show();
        $('#edexcoin_recieve').hide();
        $('#edexcoin_recieve_section').hide();
        $('#edexcoin_settings').hide();

        //Disabled dropdown list address in EasyDEX's main send option, as it's using sendtoaddress at the moment.
        //This option can be enabled later for other section where user can select particular address to send funds from.
        /*var edexcoin_addr_list_with_balance = EDEXlistunspent(active_edexcoin);
        console.log(edexcoin_addr_list_with_balance);
        var tmpoptions = '';
        tmpoptions += '<option> - Select Address - </option>';
        $.each(edexcoin_addr_list_with_balance, function(index) {
          tmpoptions += '<option value="' + edexcoin_addr_list_with_balance[index].addr + '" data-total="' + edexcoin_addr_list_with_balance[index].total.toFixed(8) + '">[ ' + edexcoin_addr_list_with_balance[index].total.toFixed(8) + ' KMD ] &emsp;' + edexcoin_addr_list_with_balance[index].addr + '</option>';
          $('#edexcoin_send_from').html(tmpoptions);
        });

        $('.showedexcoinaddrs').selectpicker({ style: 'btn-info' });
        $('.showedexcoinaddrs').selectpicker('refresh');*/
        //clearEdexSendFieldData();
        $('.edexcoin-send-form')[0].reset();
        var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
        var selected_coinmode = sessionStorage.getItem('edexTmpMode')
          if ( selected_coinmode == 'Full' ) {
            EDEXgetinfo(active_edexcoin).then(function(result){
              //console.log(result)
              $('#edexcoin_fee').val(result.kbfee)
            })
          }

      });

      $('.showedexcoinaddrs').on('change', function(){
        var selected = $(this).find("option:selected").val();
        //console.log(selected);
        //console.log($(this).find("option:selected").data('total'));
      });

      $('#edexcoin_amount').keyup(function() {
        var sum_val1 = parseFloat($('#edexcoin_amount').val())
        var sum_val2 = parseFloat($('#edexcoin_fee').val())
        var total_minus_currency_fee = sum_val1 - sum_val2;
        var mdl_send_btn = $('#edexcoin_send_coins_btn');

        //console.log($('#edexcoin_amount').val());
        $('#edexcoin_total_value').text(total_minus_currency_fee.toFixed(8));

        if ($('#edexcoin_send_from').val() != '- Select Transparent or Private KMD Address -' && $('#edexcoin_amount').val() != '' && $('#edexcoin_sendto') != '' && $('#edexcoin_fee') != '' ) {
          mdl_send_btn.removeClass('disabled');
          //mdl_send_btn.attr('data-dismiss','modal');
          //mdl_send_btn.attr('data-target','#SendCoinModelStep2');
        } else {
          mdl_send_btn.addClass('disabled');
          mdl_send_btn.removeAttr('data-dismiss');
          mdl_send_btn.removeAttr('data-target');
        }
      });

      $('#edexcoin_fee').keyup(function() {
        var sum_val1 = parseFloat($('#edexcoin_amount').val())
        var sum_val2 = parseFloat($('#edexcoin_fee').val())
        var total_minus_currency_fee = sum_val1 - sum_val2;
        var mdl_send_btn = $('#edexcoin_send_coins_btn');

        //console.log($('#edexcoin_amount').val());
        $('#edexcoin_total_value').text(total_minus_currency_fee.toFixed(8));

        if ($('#edexcoin_send_from').val() != '- Select Transparent or Private KMD Address -' && $('#edexcoin_amount').val() != '' && $('#edexcoin_sendto') != '' && $('#edexcoin_fee') != '' ) {
          mdl_send_btn.removeClass('disabled');
          //mdl_send_btn.attr('data-dismiss','modal');
          //mdl_send_btn.attr('data-target','#SendCoinModelStep2');
        } else {
          mdl_send_btn.addClass('disabled');
          mdl_send_btn.removeAttr('data-dismiss');
          mdl_send_btn.removeAttr('data-target');
        }
      });

      edexcoin_send_form_validator = $('.edexcoin-send-form').validate({
        //errorElement: 'span', //default input error message container
        //errorClass: 'help-block', // default input error message class
        //focusInvalid: false, // do not focus the last invalid input
        rules: {
            edexcoin_send_from: {
                required: true
            },
            edexcoin_sendto: {
                required: true
            },
            edexcoin_amount: {
                required: true
            },
            edexcoin_fee: {
                required: true
            },
            edexcoin_total_value: {
                required: true
            }
        },

        messages: {
            edexcoin_send_from: {
                required: "From Address is required."
            },
            edexcoin_sendto: {
                required: "To Address is required."
            },
            edexcoin_amount: {
                required: "Please enter amount to send."
            },
            edexcoin_fee: {
                required: "Make sure you have fee entered. Default value is 0.0001."
            },
            edexcoin_total_value: {
                required: "Make sure you have both amount and fee entered to calculate final total."
            }
        },

        submitHandler: function(form) {
          NProgress.done(true);
          NProgress.configure({
              template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          });
          NProgress.start();

          console.log('Sent control here after clicked in form...');
          EDEXMainAddr($('[data-edexcoin]').attr("data-edexcoin")).then(function(result){
            //console.log(result)
            $('#mdl_confirm_currency_sendfrom_addr').text(result);
          })
          $('#mdl_confirm_currency_sendto_addr').text($('#edexcoin_sendto').val());
          $('#mdl_confirm_currency_send_amount').text($('#edexcoin_amount').val());
          $('#mdl_confirm_currency_coinname').text($('[data-edexcoin]').attr("data-edexcoin"));
          $('#mdl_confirm_currency_send_fee').text($('#edexcoin_fee').val());
          $('#mdl_confirm_currency_coinname_fee').text($('[data-edexcoin]').attr("data-edexcoin"));
          $('#mdl_confirm_currency_sendfrom_total_dedcut').text($('#edexcoin_total_value').text());
          $('#mdl_confirm_currency_coinname_total').text($('[data-edexcoin]').attr("data-edexcoin"));
          
          //$('#SendCoinModelStep2').modal('show')

          console.log('==> Before confirming tx to send')
          console.log($('[data-edexcoin]').attr("data-edexcoin"))
          //console.log($('#edexcoin_send_from').val())
          console.log($('#edexcoin_sendto').val())
          console.log($('#edexcoin_total_value').text())

          var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
          //var tmp_send_from_addr = $('#edexcoin_send_from').val();
          var tmp_send_to_addr = $('#edexcoin_sendto').val();
          var tmp_send_total_amount = $('#edexcoin_total_value').text();
          $('#edexcoin-send-screen').hide();
          $('#edexcoin-send-confirm-screen').show();
          $('#edexcoin_send_step_1').removeClass( " current" ).addClass( "" );
          $('#edexcoin_send_step_2').removeClass( "" ).addClass( " current" );
          $('#edexcoin_send_step_3').removeClass( " current" ).addClass( "" );


          NProgress.done();
        }
      });

      $('#edexcoin_send_coins_btn').click(function() {
        $('#edexcoin_send_coins_btn').prop('disabled', true);
        console.log('==> After confirming tx to send')
        var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
        //var tmp_send_from_addr = $('#edexcoin_send_from').val();
        var tmp_send_to_addr = $('#edexcoin_sendto').val();
        var tmp_send_total_amount = $('#edexcoin_total_value').text();
        console.log(active_edexcoin)
        console.log(tmp_send_to_addr)
        console.log(tmp_send_total_amount)
        
        var edexcoin_sendto_result_tbl = '';
        edexcoin_sendto_result_tbl += '<tr class="info"><td>Info</td><td>The transaction submitted is processing. Once processed the transaction details will be displayed here.</td></tr>';
        $('#edexcoin_sendto_result tbody').html(edexcoin_sendto_result_tbl);
        $('#edexcoin_send_coins_anothertx_btn').hide();

        var tmp_json_data = {'coin':active_edexcoin,'sendtoaddr':tmp_send_to_addr,'amount':tmp_send_total_amount};
        console.log(tmp_json_data);
        EDEXSendToAddr(tmp_json_data);
        //console.log(tmp_sendtoaddr_output);
        //console.log(tmp_sendtoaddr_output[0]);
        //$('#SendCoinModelStep2').modal('hide')
        $('.edexcoin-send-form')[0].reset();
        $('#edexcoin_total_value').text('0.000');

        $('#edexcoin-send-confirm-screen').hide();
        $('#edexcoin-send-txdetails-screen').show();
        edexcoin_send_form_validator.resetForm();
        $('#edexcoin_send_step_1').removeClass( " current" ).addClass( "" );
        $('#edexcoin_send_step_2').removeClass( " current" ).addClass( "" );
        $('#edexcoin_send_step_3').removeClass( "" ).addClass( " current" );
      });

      $('#edexcoin_send_coins_back_btn').click(function() {
        $('#edexcoin-send-confirm-screen').hide();
        $('#edexcoin-send-txdetails-screen').hide();
        $('#edexcoin-send-screen').show();
        var active_edexcoin = '';
        var tmp_send_to_addr = '';
        var tmp_send_total_amount = '';
        edexcoin_send_form_validator.resetForm();
        $('#edexcoin_send_step_1').removeClass( "" ).addClass( " current" );
        $('#edexcoin_send_step_2').removeClass( " current" ).addClass( "" );
        $('#edexcoin_send_step_3').removeClass( " current" ).addClass( "" );
      });
      $('#edexcoin_send_coins_anothertx_btn').click(function() {
        $( "#edexcoin_send_coins_back_btn" ).trigger( "click" );
        var active_edexcoin = '';
        var tmp_send_to_addr = '';
        var tmp_send_total_amount = '';
        $('#edexcoin_send_coins_btn').prop('disabled', false);
        edexcoin_send_form_validator.resetForm();
      });

      $('.edexcoin_sendto_result').on('click', '.edexcoin_sendto_output_result', function(e){
        var selected_coin = $(this).data('edexcoin')
        var selected_coin_mode = sessionStorage.getItem('edexTmpMode');
        $( "#nav-iguana-atomic-explorer" ).trigger( "click" );
        $('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected','selected');
        if ( selected_coin_mode == 'Full') {
          $('#atomic_explorer_select_command_options option[value=gettransaction]').attr('selected','selected');
        }
        if ( selected_coin_mode == 'Basilisk') {
          $('#atomic_explorer_select_command_options option[value=dex_gettransaction]').attr('selected','selected');
        }
        $('#atomic_explorer_input_data').val($(this).data('sendtotxresult'))
        $( "#atomic_explorer_getcoinpeers_btn" ).trigger( "click" );
      });
      //$('.edexcoin_sendto_output_result').click(function() {
        
      //});
    }

    var handle_edex_recieve = function() {
        $('#btn_edexcoin_recieve').click(function() {
            var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
            //console.log('wallet receive button clicked...');
            sessionStorage.setItem('edexTmpRefresh', "stop");
            $('#edexcoin_dashboardinfo').hide();
            $('#edexcoin_dashoard_section').hide();
            $('#edexcoin_send').hide();
            $('#edexcoin_recieve').show();
            $('#edexcoin_recieve_section').show();
            $('#edexcoin_settings').hide();
            EdexListAllAddr(active_edexcoin);
            //clearEdexSendFieldData();
            $('.edexcoin-send-form')[0].reset();
        });

        $('#edexcoin_get_new_addr').click(function() {
            var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
            console.log('get new T address button clicked...');
            EDEXgetnewaddress(active_edexcoin).then(function(result){
                //console.log(result)
            })
            EdexListAllAddr(active_edexcoin);
            toastr.info("Receiving Address list updated", "Wallet Notification");
        });
    };

    var handleWalletWidgets = function() {

        var walletDivContent = '';
        var AddColumnDiv = 0
        $.each([ 'native','basilisk', 'full' ], function( index, value ) {

            var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
            var ajax_data = {'userpass':tmpIguanaRPCAuth,"agent":"InstantDEX","method":"allcoins"};
            //console.log(ajax_data);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(ajax_data),
                url: 'http://127.0.0.1:7778',
                //dataType: 'JSON',
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

                        if ( value == 'native' ) { modecode = 'Native'; modetip = 'Native'; modecolor = 'primary'; }
                        if ( value == 'basilisk' ) { modecode = 'Basilisk'; modetip = 'Basilisk'; modecolor = 'info'; }
                        if ( value == 'full' ) { modecode = 'Full'; modetip = 'Full'; modecolor = 'success'; }
                        if ( value == 'virtual' ) { modecode = 'Virtual'; modetip = 'Virtual'; modecolor = 'danger'; }
                        if ( value == 'notarychains' ) { modecode = 'Notarychains'; modetip = 'Notarychains'; modecolor = 'dark'; }

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
                        if ( AllcoinsDataOutput[value][index] == 'KMD' ) { coinlogo = 'komodo'; coinname = 'Komodo'; }
                        if ( AllcoinsDataOutput[value][index] == 'BTM' ) { coinlogo = 'bitmark'; coinname = 'Bitmark'; }
                        if ( AllcoinsDataOutput[value][index] == 'CARB' ) { coinlogo = 'carboncoin'; coinname = 'Carboncoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'ANC' ) { coinlogo = 'anoncoin'; coinname = 'AnonCoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'FRK' ) { coinlogo = 'franko'; coinname = 'Franko'; }
                        if ( AllcoinsDataOutput[value][index] == 'SUPERNET' ) { coinlogo = 'SUPERNET'; coinname = 'SUPERNET'; }
                        if ( AllcoinsDataOutput[value][index] == 'REVS' ) { coinlogo = 'REVS'; coinname = 'REVS'; }
                        if ( AllcoinsDataOutput[value][index] == 'USD' ) { coinlogo = 'USD'; coinname = 'USD'; }

                        //console.log(AllcoinsDataOutput[value][index]);

                        walletDivContent += '<!-- Wallet Widget '+AllcoinsDataOutput[value][index]+' -->';
                        walletDivContent += '<div class="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="'+AllcoinsDataOutput[value][index]+'">';
                          walletDivContent += '<div class="widget widget-shadow">';
                            walletDivContent += '<div class="widget-content text-center bg-white padding-20 edexcoin-logo" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-edexcoinmodecode="' + modecode + '" data-edexcoinname="' + coinname + '">';
                              //walletDivContent += '<a href="#" class="avatar margin-bottom-5">';
                              walletDivContent += '<a class="avatar margin-bottom-5" href="javascript:void(0)" id="edexcoin-logo">';
                                walletDivContent += '<img class="img-responsive" src="assets/images/cryptologo/' + coinlogo + '.png" alt="'+coinname+'"/>';
                                walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
                              walletDivContent += '</a>';
                              walletDivContent += '<div class="coin-name">'+coinname+'</div>';
                              //walletDivContent += '<div class="coin-title margin-bottom-20 blue-grey-400"><span data-edexcoincode="'+AllcoinsDataOutput[value][index]+'" id="edexcoin-balance">-</span> '+AllcoinsDataOutput[value][index]+'</div>';
                            walletDivContent += '</div>';
                          walletDivContent += '</div>';
                        walletDivContent += '</div>';
                        walletDivContent += '<!-- End Wallet Widget '+AllcoinsDataOutput[value][index]+' -->';

                        $('.wallet-widgets-row').html(walletDivContent);
                        //getCoinBalance_altfn(AllcoinsDataOutput[value][index]);
                        $('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
                        $('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
                        //console.log(walletDivContent);
                        edexCoinBtnAction();
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

    var handleWalletWidgetBtns = function() {
      $('#addcoin_mdl_native_mode').prop('disabled', true);
      $('#addcoin_mdl_basilisk_mode').prop('disabled', true);
      $('#addcoin_mdl_full_mode').prop('disabled', true);
      $('#addcoin_mdl_full_mode').prop("checked", false);

      $('.mdl_addcoin_done_btn').click(function(){
        ExecuteAddCoinFn();
      });

      $( "#addcoin_select_coin_mdl_options" ).change(function() {
        var tmp_coin_val = $('#addcoin_select_coin_mdl_options').val()
        
        if (tmp_coin_val !== 'KMD' || tmp_coin_val !== 'KMD' ) {
            $('#addcoin_mdl_native_mode').prop('disabled', true);
            $('#addcoin_mdl_basilisk_mode').prop('disabled', true);
            $('#addcoin_mdl_full_mode').prop('disabled', false);
            $('#addcoin_mdl_full_mode').prop("checked", true);
        }
        if (tmp_coin_val == 'KMD') {
            $('#addcoin_mdl_native_mode').prop('disabled', false);
            $('#addcoin_mdl_basilisk_mode').prop('disabled', false);
            $('#addcoin_mdl_full_mode').prop('disabled', false);
            $('#addcoin_mdl_basilisk_mode').prop("checked", true);
        }
        if (tmp_coin_val == 'SUPERNET'
          || tmp_coin_val == 'REVS'
          || tmp_coin_val == 'USD') {
            $('#addcoin_mdl_native_mode').prop('disabled', true);
            $('#addcoin_mdl_basilisk_mode').prop('disabled', false);
            $('#addcoin_mdl_full_mode').prop('disabled', true);
            $('#addcoin_mdl_basilisk_mode').prop("checked", true);
        }
        if (tmp_coin_val == 'BTC') {
            $('#addcoin_mdl_basilisk_mode').prop('disabled', false);
            $('#addcoin_mdl_native_mode').prop('disabled', true);
            $('#addcoin_mdl_full_mode').prop('disabled', false);
            $('#addcoin_mdl_basilisk_mode').prop("checked", true);
        }
      });
    }

    var handleBasiliskWalletActions = function() {
      $(".btn_edexcoin_dashboard_getnotaries").click(function() {
        var selected_coin = $(this).data('edexcoin')
        $( "#nav-iguana-atomic-explorer" ).trigger( "click" );
        $('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected','selected');
        $('#atomic_explorer_select_command_options option[value=dex_getnotaries]').attr('selected','selected');
        $( "#atomic_explorer_getcoinpeers_btn" ).trigger( "click" );
      })
      
      $(".btn_edexcoin_dashboard_register").click(function() {
        var selected_coin = $(this).data('edexcoin')
        EDEXMainAddr(selected_coin).then(function(result){
          //console.log(result)
          Iguana_DEXImportAllWalletAddr(selected_coin);
          //Iguana_DEXImportAddr(selected_coin,result);
        })
      })

      $(".btn_edexcoin_dashboard_refresh_basilisk_conn").click(function() {
        var show_mdl = setTimeout(function() {
            var selected_coin = $(this).data('edexcoin')
            $('#RefreshBasiliskConnectionsMdl').modal('show')
            }, 0)
        var start_refresh = setTimeout(function() {
            EDEX_DEXgetinfoAll()
            }, 3000)

        Promise.all([show_mdl, start_refresh]).then(function() {
            console.log('all promises executed!!!');
        });
      })

      $(".btn_edexcoin_dashboard_validate").click(function() {
        var selected_coin = $(this).data('edexcoin')
        EDEXMainAddr(selected_coin).then(function(result){
          //console.log(result)
          Iguana_DEXValidateAddr(selected_coin,result);
        })
      })
    }

    var handleWalletToAtomicExplorer = function() {
      $('#edex-tx-history-tbl').on('click', '.kmd-txid-details-btn', function(e){
        var selected_coin = $(this).data('edexcoin')
        var selected_coin_mode = sessionStorage.getItem('edexTmpMode');
        var selected_txid = $(this).data('txid')
        $( "#nav-iguana-atomic-explorer" ).trigger( "click" );
        $('#atomic_explorer_select_coin_options option[value=' + selected_coin + ']').attr('selected','selected');
        if ( selected_coin_mode == 'Full') {
          $('#atomic_explorer_select_command_options option[value=gettransaction]').attr('selected','selected');
        }
        if ( selected_coin_mode == 'Basilisk') {
          $('#atomic_explorer_select_command_options option[value=dex_gettransaction]').attr('selected','selected');
        }
        $('#atomic_explorer_input_data').val(selected_txid)
        $( "#atomic_explorer_getcoinpeers_btn" ).trigger( "click" );
      })
    }


    var handleEdexWalletInfo = function() {
      //Get coin history and pupulate balance and other info to wallet widget
      var ExecuteShowCoinHistory = setInterval(function() {
          if ( sessionStorage.getItem('IguanaActiveAccount') === null || sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "stop" ) {
              clearInterval(ExecuteShowCoinHistory);
              console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
          } else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "start") {
              //if ( value == "basilisk") {
                //console.log("ShowCoinHistory and ShowCoinProgressBar not executing for basilisk...");
              //} else {
                //console.log('wallet widget refereshed (every 1 seconds)');
                //Show Coin Progress Bars
                var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
                var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

                if ( active_edexcoinmodecode == 'Basilisk' || active_edexcoinmodecode == 'Native' ) {
                  //console.log(active_edexcoinmodecode)
                  //console.log('No need to show Progress bar for Native or Basilisk mode.')
                } else {
                  ShowCoinProgressBar(active_edexcoin);
                }
                if ( sessionStorage.getItem('Activate'+active_edexcoin+'History') === 'Yes' ) {
                  //console.log('Show coin history');
                  //var historyvalues = {"timeout":20000,"immediate":100,"agent":"basilisk","method":"history","vals":{"coin":"" + active_edexcoin + ""}};
                  //ShowCoinHistory(historyvalues);
                //}
              }
          }
      }, 1000);

      /*var RefreshEdexWalletList = setInterval(function() {
          if ( sessionStorage.getItem('IguanaActiveAccount') === null || sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "stop" ) {
              clearInterval(RefreshEdexWalletList);
              //console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
          } else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "start") {
              refreshEDEXCoinWalletList()
          }
      }, 30000);*/

      var RefreshEdexWalletDashboard = setInterval(function() {
          if ( sessionStorage.getItem('IguanaActiveAccount') === null || sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "stop" ) {
              clearInterval(RefreshEdexWalletDashboard);
              //console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
          } else if ( sessionStorage.getItem('DashboardActions') === null || sessionStorage.getItem('DashboardActions') === "start") {
              if ( $('[data-edexcoin]').attr("data-edexcoin") !== "COIN" ) {
                if ( sessionStorage.getItem('edexTmpMode') !== null || sessionStorage.getItem('edexTmpMode') === "Full") {
                  if ( sessionStorage.getItem('edexTmpRefresh') === null || sessionStorage.getItem('edexTmpRefresh') === "start") {
                    //console.log('it is not COIN. '+'It is: ' + $('[data-edexcoin]').attr("data-edexcoin"));
                    $( "#btn_edexcoin_dashboard" ).trigger( "click" );
                  }
                }
              }
          }
      }, 30000);
    }


    return {
        //main function to initiate the module
        init: function() {

          resizeDashboardWindow();
          handle_edex_wallet();
          handle_edex_dashboard();
          handle_edex_send();
          handle_edex_recieve();



          window.onresize = function(event) { resizeDashboardWindow(); };

            if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                console.log('=> No wallet logged in. No need to run Dashboard JS.');
            } else {
                handleWalletWidgets();
                handleWalletWidgetBtns();
                handleEdexWalletInfo();
                handleBasiliskWalletActions();
                handleWalletToAtomicExplorer();
                //TotalFiatValue();
            }

            /*setInterval(function() {
                handleWalletWidgets();
                console.log('wallet widget refereshed (every 15 seconds)');
            }, 15000);*/

            /*RunTotalFiatValue = setInterval(function() {
                if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
                //console.log('=> No wallet logged in. No need to get Rates.');
                //StopTotalFiatValue();
                } else {
                    //TotalFiatValue();
                    //console.log('Get Rates (every 60 seconds)');
                }
            }, 60000);*/

        }

    };

}();

jQuery(document).ready(function() {
    Dashboard.init();

});


function resizeDashboardWindow() {
  /* set default map height */
  var navbarH = $(".site-navbar").outerHeight();
  //var footerH = $(".site-footer").outerHeight();
  var edexDashH = $(".edexcoin_dashoard_section_main_div").outerHeight();
  
  var mapH = $(window).height() - navbarH;

  $(".page-main").outerHeight(mapH);
  $(".scrollable-container").outerHeight(mapH);
}

function edexCoinBtnAction() {
  $('.edexcoin-logo').click(function() {
    $( "#edexcoin_send_coins_back_btn" ).trigger( "click" );
    //console.log($(this).data('edexcoincode'));
    //console.log($(this).data('edexcoinmodecode'))
    var selected_coin = $(this).data('edexcoincode')
    var selected_coinmode = $(this).data('edexcoinmodecode')
    var selected_coinname = $(this).data('edexcoinname')
    sessionStorage.setItem('edexTmpMode', selected_coinmode);
    resizeDashboardWindow()
    if ( selected_coinmode == 'Basilisk' ) {
      $('#edex-footer').hide();
      $('#btn_edexcoin_basilisk').show();
      $('#edexcoin-wallet-waitingrt-alert').hide()
      StopShowCoinHistory();
      sessionStorage.setItem('edexTmpRefresh', "stop");
    }
    if ( selected_coinmode == 'Full' ) {
      $('#edex-footer').show();
      $('#btn_edexcoin_basilisk').hide();
      sessionStorage.setItem('edexTmpRefresh', "start");
    }
    if ( selected_coinmode !== 'Native' ) {
      $('#edexcoin_dashoard_section').show();
      $('#header-dashboard').show();
      $('#wallet-widgets').show();
      $('#edexcoin_dashboardinfo').show();
      $('#no_wallet_selected').hide();
      $('#edexcoin_send').hide();
      $('#edexcoin_recieve_section').hide();
      $('#edexcoin_settings').hide();
      $('#currency-progressbars').show();

      //get selected coin's code and populate in easydex wallet widget's html elements
      var coincode = $(this).data('edexcoincode');
      $.each($('[data-edexcoin]'), function(index, value) {$('[data-edexcoin]').attr("data-edexcoin",coincode); $('[data-edexcoin="'+coincode+'"]')});
      $.each($('[data-edexcoinmenu]'), function(index, value) {$('[data-edexcoinmenu]').attr("data-edexcoinmenu",coincode); $('[data-edexcoinmenu="'+coincode+'"]')});

      $('#edexcoin-active').text(selected_coinname);
      $('#edex_total_balance_coincode').text(coincode);
      //populate selected coin's address
      EDEXMainAddr(selected_coin).then(function(result){
        //console.log(result)
        $('#edexcoin_active_addr').text(result);
        $('#edexcoin_active_addr_clipboard').attr("data-clipboard-text",result)
      })
      
      $('#edexcoin_active_addr_clipboard').click(function(){alertify.success("Address Copied.");})
      
      var clipboard = new Clipboard('.clipboard-edexaddr');
      clipboard.destroy();

      var clipboard = null;      
      if( clipboard != null ) {
        clipboard.destroy();
      }

      var clipboard = new Clipboard('.clipboard-edexaddr');
      clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
      });

      clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
      //populate selected coin's balance

      if ( selected_coinmode == 'Basilisk' ) {
        getDEXGetBalance(selected_coin).then(function(result){
          console.log(result)
          console.log(result.total)
          $('#edex_total_balance').text(result.total);
        });
      } else {
        EDEXlistunspent(selected_coin).then(function(result){
          //console.log(result)
          if (result[0] != undefined) {
            //console.log(result[0])
            $('#edex_total_balance').text(result[0].total.toFixed(8));
            //console.log(result[0].total)
          } else {
            $('#edex_total_balance').text('0');
          }
        });
      }

      //getCoinBalance(active_edexcoin);
      EdexfillTxHistory(coincode);
    } else {
      $('#currency-progressbars').hide();
      if ( selected_coin == 'KMD' ) {
        sessionStorage.setItem('edexTmpMode', selected_coinmode);
        sessionStorage.setItem('edexTmpRefresh', "start");
        $( "#nav-komodo-wallet" ).trigger( "click" );
      }
      if ( selected_coin == 'ZEC' ) {
        sessionStorage.setItem('edexTmpMode', selected_coinmode);
        sessionStorage.setItem('edexTmpRefresh', "start");
        $( "#nav-zcash-wallet" ).trigger( "click" );
      }
    }
    

  });
}

function getActiveEdexcoin() {
    var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
    return active_edexcoin;
}

function hideExtCoinsinEdexDashboard(coin) {
  //var tmp_getinfo = EDEXgetinfo(coin)
  //console.log(tmp_getinfo);
}

function EdexfillTxHistory(coin) {
  NProgress.done(true);
  NProgress.configure({
    template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  });
  NProgress.start();
    EdexGetTxList(coin).then(function(result){
      //console.log(result)

      var edex_txhistory_table = '';
      edex_txhistory_table = $('#edex-tx-history-tbl').DataTable( { data: result,
          "order": [[ 3, "desc" ]],
          select: true,
          retrieve: true
      });

      edex_txhistory_table.destroy();
      edex_txhistory_table = $('#edex-tx-history-tbl').DataTable( { data: result,
          "order": [[ 3, "desc" ]],
          select: true,
          retrieve: true
      });
    });

  NProgress.done();
}

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
            //ClearOnLogout(true, true);
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

                    //$('span[data-currency="' + getData.vals['coin'] + '"][id="currency-balance"]').text(CoinHistoryData.balance);
                    getCoinBalance(getData.vals['coin']);

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
                    //console.log(show_coin_history_unspents.length+show_coin_history_spends.length+show_coin_history_spends.length)


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

function getDEXCoinBalance(coin) {
  getDEXGetBalance(coin).then(function(result){
      console.log(result)
  });
}

function getDEXGetBalance(coin) {
  NProgress.done(true);
  NProgress.configure({
      template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  });
  NProgress.start();
    return new Promise((resolve) =>{ 
        var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
        var ajax_data_1 = {'userpass':tmpIguanaRPCAuth,"agent":"SuperNET","method":"activehandle"}
        var tmp_coin_addr = null

        var ajax_call_1 = $.ajax({
              data: JSON.stringify(ajax_data_1),
              url: 'http://127.0.0.1:7778',
              type: 'POST',
              dataType: 'json',
            }),
          ajax_call_2 = ajax_call_1.then(function(data) {
              // .then() returns a new promise
              tmp_coin_addr = data[coin]
              //console.log(tmp_coin_addr);
              var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listunspent","address":data[coin],"symbol":coin}
              return $.ajax({
                data: JSON.stringify(ajax_data_2),
                url: 'http://127.0.0.1:7778',
                type: 'POST',
                dataType: 'json',
              });
            });

        ajax_call_2.done(function(data) {
          //console.log(tmp_coin_addr);
            //console.log(data);
            if (data.error === 'less than required responses') {
            toastr.error("Less than required responses. Please try again.", "Basilisk Notification")
          }

          var tmpcalcnum = 0;
          $.each(data, function(index) {
            if ( data[index].interest !== undefined ) {
              //console.log('interest is available for this currency. Adding to total balance.');
              tmpcalcnum = tmpcalcnum + data[index].amount + data[index].interest;
            }
            if ( data[index].interest === undefined ) {
              tmpcalcnum = tmpcalcnum + data[index].amount;
            }
          });

          var tmp_addr_total_balance_output = {"addr": tmp_coin_addr, "total": tmpcalcnum.toFixed(8)};
            //console.log(tmp_addr_total_balance_output);

          if (data == '' ) {
            tmp_addr_total_balance_output = {"addr": tmp_coin_addr, "total":0};
          }

          //console.log(tmp_addr_total_balance_output)
          resolve(tmp_addr_total_balance_output)
          NProgress.done();
        }).fail(function(xhr, textStatus, error) {
            // handle request failures
            console.log(xhr.statusText);
            if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(error);
        });
    })
}

function getCoinBalance(coin) {
  var active_edexcoin = $('[data-edexcoin]').attr("data-edexcoin");
  EDEXlistunspent(active_edexcoin).then(function(result){
    console.log(result)
    if (result[0] != undefined) {
      //console.log(result[0])
      $('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text(result[0].total);
      //console.log(result[0].total)
    } else {
      $('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text('0');
    }
  });
}

function getBasiliskCoinBalance(coin) {
  EDEXMainAddr(coin).then(function(result){
    console.log(result)
    EDEX_DEXlistunspent(coin, result).then(function(result_listunspent){
      console.log(result_listunspent[0].amount);
      $('span[data-edexcoincode="' + coin + '"][id="edexcoin-balance"]').text(result_listunspent[0].amount);
    });
  })
}

function StopShowCoinHistory() {
    clearInterval(ExecuteShowCoinHistory);
    console.log('Stopped executing History and ProgressBar API.');
}


function refreshEDEXCoinWalletList() {
  var walletDivContent = '';
        var AddColumnDiv = 0
        $.each([ 'native', 'basilisk', 'full' ], function( index, value ) {

            var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
            var ajax_data = {'userpass':tmpIguanaRPCAuth,"agent":"InstantDEX","method":"allcoins"};
            //console.log(ajax_data);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(ajax_data),
                url: 'http://127.0.0.1:7778',
                //dataType: 'JSON',
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

                        if ( value == 'native' ) { modecode = 'Native'; modetip = 'Native'; modecolor = 'primary'; }
                        if ( value == 'basilisk' ) { modecode = 'Basilisk'; modetip = 'Basilisk'; modecolor = 'info'; }
                        if ( value == 'full' ) { modecode = 'Full'; modetip = 'Full'; modecolor = 'success'; }
                        if ( value == 'virtual' ) { modecode = 'Virtual'; modetip = 'Virtual'; modecolor = 'danger'; }
                        if ( value == 'notarychains' ) { modecode = 'Notarychains'; modetip = 'Notarychains'; modecolor = 'dark'; }

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
                        if ( AllcoinsDataOutput[value][index] == 'KMD' ) { coinlogo = 'komodo'; coinname = 'Komodo'; }
                        if ( AllcoinsDataOutput[value][index] == 'BTM' ) { coinlogo = 'bitmark'; coinname = 'Bitmark'; }
                        if ( AllcoinsDataOutput[value][index] == 'CARB' ) { coinlogo = 'carboncoin'; coinname = 'Carboncoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'ANC' ) { coinlogo = 'anoncoin'; coinname = 'AnonCoin'; }
                        if ( AllcoinsDataOutput[value][index] == 'FRK' ) { coinlogo = 'franko'; coinname = 'Franko'; }
                        if ( AllcoinsDataOutput[value][index] == 'SUPERNET' ) { coinlogo = 'SUPERNET'; coinname = 'SUPERNET'; }
                        if ( AllcoinsDataOutput[value][index] == 'REVS' ) { coinlogo = 'REVS'; coinname = 'REVS'; }
                        if ( AllcoinsDataOutput[value][index] == 'USD' ) { coinlogo = 'USD'; coinname = 'USD'; }

                        //console.log(AllcoinsDataOutput[value][index]);

                        walletDivContent += '<!-- Wallet Widget '+AllcoinsDataOutput[value][index]+' -->';
                        walletDivContent += '<div class="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="'+AllcoinsDataOutput[value][index]+'">';
                          walletDivContent += '<div class="widget widget-shadow">';
                            walletDivContent += '<div class="widget-content text-center bg-white padding-20">';
                              //walletDivContent += '<a href="#" class="avatar margin-bottom-5">';
                              walletDivContent += '<a class="avatar margin-bottom-5 edexcoin-logo" href="javascript:void(0)" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-edexcoinmodecode="' + modecode + '" data-edexcoinname="' + coinname + '" id="edexcoin-logo">';
                                walletDivContent += '<img class="img-responsive" src="assets/images/cryptologo/' + coinlogo + '.png" alt="'+coinname+'"/>';
                                walletDivContent += '<span class="badge up badge-' + modecolor + '" id="basfull" data-edexcoincode="' + AllcoinsDataOutput[value][index] + '" data-toggle="tooltip" data-placement="top" data-original-title="' + modetip + '">' + modecode + '</span>';
                              walletDivContent += '</a>';
                              walletDivContent += '<div class="coin-name">'+coinname+'</div>';
                              //walletDivContent += '<div class="coin-title margin-bottom-20 blue-grey-400"><span data-edexcoincode="'+AllcoinsDataOutput[value][index]+'" id="edexcoin-balance">-</span> '+AllcoinsDataOutput[value][index]+'</div>';
                            walletDivContent += '</div>';
                          walletDivContent += '</div>';
                        walletDivContent += '</div>';
                        walletDivContent += '<!-- End Wallet Widget '+AllcoinsDataOutput[value][index]+' -->';

                        $('.wallet-widgets-row').html(walletDivContent);
                        //getCoinBalance(AllcoinsDataOutput[value][index]);
                        //getCoinBalance_altfn('KMD');
                        //getCoinBalance('KMD');
                        /*if ( modecode == 'Basilisk' ) {
                          $('span[data-edexcoincode="' + AllcoinsDataOutput[value][index] + '"][id="edexcoin-balance"]').parent().hide();
                          //getBasiliskCoinBalance(AllcoinsDataOutput[value][index])
                        }*/
                        
                        $('.scrollbar-dynamic').scrollbar(); //Make sure widget-body has scrollbar for transactions history
                        $('[data-toggle="tooltip"]').tooltip(); //Make sure tooltips are working for wallet widgets and anywhere else in wallet.
                        //console.log(walletDivContent);
                        edexCoinBtnAction();
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


function SwitchBasicliskFull(switch_data) {
  //console.log(switch_data.currency);
  //console.log(switch_data.modecode);
  var relay_value = '';
  var validate_value = '';
  var mode_value = '';

  if ( switch_data.modecode == 'B' ) { relay_value = 1; validate_value = 1; mode_value = 'Basilisk'; }
  if ( switch_data.modecode == 'F' ) { relay_value = 0; validate_value = 0; mode_value = 'Full'; }

  var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
  var SwitchCoinModeData = {
      'userpass':tmpIguanaRPCAuth,
      "poll": 100,
      "immediate":100,
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

  var TotalFiatValueData = {"agent":"iguana","method":"rates","quotes":["BTCD/BTC", BTC_Fiat_pair_value, Conversion_Fiat_Pair],"immediate":100,"timeout":5000};
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

function ShowCoinProgressBar(coin) {
  //console.log('Showing Prgoress bar of '+coin);
  var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
  var getinfoValues = {'userpass':tmpIguanaRPCAuth,"coin":coin,"agent":"bitcoinrpc","method":"getinfo","immediate":100,"timeout":4000};
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
              sessionStorage.setItem('Activate'+coin+'History', 'Yes');
              var coin_blocks = parseInt(CoinInfoData.blocks);
              var coin_blocks_plus1 = coin_blocks + 1;
              //console.log(coin+' is less than 99.98% complete.');
              $('div[data-edexcoin="'+coin+'"][id="currency-progressbars"]').show();
              $('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2)+'%');
              $('span[data-edexcoin="'+coin+'"][id="currency-bundles-percent"]').text('('+coin+') '+parseFloat(CoinInfoData.bundles).toFixed(2)+'% - ( '+coin_blocks_plus1+' / '+CoinInfoData.longestchain+' ) ==>> RT'+CoinInfoData.RTheight);
              $('div[data-edexcoin="'+coin+'"][id="additional-progress-bars"]').hide();
              $('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').removeClass( "progress-bar-info" ).addClass( "progress-bar-indicating progress-bar-success" );
              $('#edex-footer').css("height", "11px");
              resizeDashboardWindow();
              $('#edexcoin-wallet-waitingrt-alert').hide()
              //getCoinBalance(coin);
              //EdexfillTxHistory(coin);
            }
            if ( parseInt(CoinInfoData.RTheight) == 0 ) {
              sessionStorage.setItem('Activate'+coin+'History', 'No');
              console.log(coin+': '+CoinInfoData.bundles);
              var coin_blocks = parseInt(CoinInfoData.blocks);
              var coin_blocks_plus1 = coin_blocks + 1;
              $('div[data-edexcoin="'+coin+'"][id="additional-progress-bars"]').show();
              $('div[data-edexcoin="'+coin+'"][id="currency-progressbars"]').show();
              $('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').removeClass( "progress-bar-indicating progress-bar-success" ).addClass( "progress-bar-info" );
              $('div[data-edexcoin="'+coin+'"][id="currency-bundles"]').width(parseFloat(CoinInfoData.bundles).toFixed(2)+'%');
              $('span[data-edexcoin="'+coin+'"][id="currency-bundles-percent"]').text('('+coin+') '+parseFloat(CoinInfoData.bundles).toFixed(2)+'% - ( '+coin_blocks_plus1+' / '+CoinInfoData.longestchain+' )');
              $('div[data-edexcoin="'+coin+'"][id="currency-utxo"]').width(parseFloat(CoinInfoData.utxo).toFixed(2)+'%');
              $('span[data-edexcoin="'+coin+'"][id="currency-utxo-percent"]').text('('+coin+') '+parseFloat(CoinInfoData.utxo).toFixed(2)+'%');
              $('div[data-edexcoin="'+coin+'"][id="currency-balances"]').width(parseFloat(CoinInfoData.balances).toFixed(2)+'%');
              $('span[data-edexcoin="'+coin+'"][id="currency-balances-percent"]').text('('+coin+') '+parseFloat(CoinInfoData.balances).toFixed(2)+'%');
              $('div[data-edexcoin="'+coin+'"][id="currency-validated"]').width(parseFloat(CoinInfoData.validated).toFixed(2)+'%');
              $('span[data-edexcoin="'+coin+'"][id="currency-validated-percent"]').text('('+coin+') '+parseFloat(CoinInfoData.validated).toFixed(2)+'%');
              $('#edex-footer').css("height", "44px");
              resizeDashboardWindow();
              $('#edexcoin-wallet-waitingrt-alert').show()
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



function EdexGetTxList(coin) {
  return new Promise((resolve) =>{

    var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth');
    var ajax_data_1 = {'userpass':tmpIguanaRPCAuth,"agent":"SuperNET","method":"activehandle"}
    var tmp_coin_addr = null
    var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');

    var ajax_call_1 = $.ajax({
                data: JSON.stringify(ajax_data_1),
          url: 'http://127.0.0.1:7778',
          type: 'POST',
          dataType: 'json',
        }),
      ajax_call_2 = ajax_call_1.then(function(data) {
          // .then() returns a new promise
          tmp_coin_addr = data[coin]
          //console.log(tmp_coin_addr);
          if ( active_edexcoinmodecode == 'Basilisk' ) {
            if ( coin == 'BTC'
                  || coin == 'BTCD'
                  || coin == 'LTC'
                  || coin == 'DOGE'
                  || coin == 'DGB'
                  || coin == 'SYS'
                  || coin == 'MZC'
                  || coin == 'UNO'
                  || coin == 'ZET'
                  || coin == 'BTM'
                  || coin == 'CARB'
                  || coin == 'ANC'
                  || coin == 'FRK') {
              console.log(coin)
              var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions","address":data[coin],"count":100,"skip":0,"symbol":coin}
            } else {
              console.log(coin)
              var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"agent":"dex","method":"listtransactions2","address":data[coin],"count":100,"skip":0,"symbol":coin}
            }
          } else {
            var ajax_data_2 = {'userpass':tmpIguanaRPCAuth,"coin":coin,"method":"listtransactions","params":[0, 9999999, []]}
          }
          console.log(ajax_data_2)
          return $.ajax({
            data: JSON.stringify(ajax_data_2),
            url: 'http://127.0.0.1:7778',
            type: 'POST',
            dataType: 'json',
          });
        });

    ajax_call_2.done(function(data) {
      //console.log(tmp_coin_addr);
      //console.log(data);
      if ( active_edexcoinmodecode == 'Full' ) {
        data = data.result;
      }
      var result = [];
      $.each(data, function(index, value) {
        //console.log(value);

        if ( active_edexcoinmodecode == 'Full' 
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTC')
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTCD' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'LTC' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'DOGE' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'DGB' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'SYS' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'MZC' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'UNO' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'ZET' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'BTM' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'CARB' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'ANC' )
          || ( active_edexcoinmodecode == 'Basilisk' && coin == 'FRK' ) ) {
          var tmp_category = '';
          var tmp_amount = data[index].amount;
          if(!("amount" in data[index])) {
            tmp_amount = '<span class="label label-dark">Unknown</span>'
          }
          var tmp_addr = data[index].address;
          if(!("address" in data[index])) {
            tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
          }

          //tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
          //if(("blocktime" in data[index])) {
            //console.log('blocktime FOUND');
            //var tmp_secondsToString = secondsToString(data[index].blocktime)
          //}

          var tmp_secondsToString = secondsToString(data[index].blocktime)

          if (isNaN(tmp_secondsToString)) {
            //tmp_secondsToString = 'Unknown';
          }
          if ( data[index].category == 'send' ) {
            tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
          }
          if ( data[index].category == 'receive' ) {
            tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
          }
          if ( data[index].category == 'generate' ) {
            tmp_category = '<i class="icon fa-cogs"></i> Mined';
          }if ( data[index].category == 'immature' ) {
            tmp_category = '<i class="icon fa-clock-o"></i> Immature';
          }
          if ( data[index].category == 'unknown' ) {
            tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
          }
          //console.log(tmp_addr);
          //tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
          tmplisttransactions = [tmp_category,data[index].confirmations,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
          //console.log(tmplisttransactions);
          result.push(tmplisttransactions);
        }

        if ( active_edexcoinmodecode == 'Basilisk' 
          && coin !== 'BTC' 
          && coin !== 'BTCD'
          && coin !== 'LTC'
          && coin !== 'DOGE'
          && coin !== 'DGB'
          && coin !== 'SYS'
          && coin !== 'MZC'
          && coin !== 'UNO'
          && coin !== 'ZET'
          && coin !== 'BTM'
          && coin !== 'CARB'
          && coin !== 'ANC'
          && coin !== 'FRK' ) {
          var tmp_category = '';
          var tmp_amount = data[index].amount;
          if(!("amount" in data[index])) {
            tmp_amount = '<span class="label label-dark">Unknown</span>'
          }
          var tmp_addr = null
          if(!("paid" in data[index])) {
            tmp_addr = '<i class="icon fa-bullseye"></i> <span class="label label-dark">Z Address not listed by wallet!</span>'
          }
          if(("paid" in data[index])) {
            var first_addr = Object.keys(data[index].paid['vouts'][0]);
            var tmp_addr = first_addr[0];
            //console.log(data[index].paid['vouts'][0])

          }

          //tmp_secondsToString = '<i class="icon fa-meh-o"></i> Unknown'
          //if(("blocktime" in data[index])) {
            //console.log('blocktime FOUND');
            //var tmp_secondsToString = secondsToString(data[index].blocktime)
          //}

          var tmp_secondsToString = secondsToString(data[index].timestamp)

          if (isNaN(tmp_secondsToString)) {
            //tmp_secondsToString = 'Unknown';
          }

          console.log(data[index].type)
          if ( data[index].type == 'sent' ) {
            tmp_category = '<i class="icon fa-arrow-circle-left"></i> OUT';
          }
          if ( data[index].type == 'received' ) {
            tmp_category = '<i class="icon fa-arrow-circle-right"></i> IN';
          }
          if ( data[index].type == 'generate' ) {
            tmp_category = '<i class="icon fa-cogs"></i> Mined';
          }if ( data[index].type == 'immature' ) {
            tmp_category = '<i class="icon fa-clock-o"></i> Immature';
          }
          if ( data[index].type == 'unknown' ) {
            tmp_category = '<i class="icon fa-meh-o"></i> Unknown';
          }


          if(!("confirmations" in data[index])) {
            tmp_confirms = '<i class="icon fa-meh-o"></i> Unknown';
          }
          if(("confirmations" in data[index])) {
            tmp_confirms = data[index].confirmations
          }

          //console.log(tmp_addr);
          //tmplisttransactions = {"category": data[index].category,"confirmations": data[index].confirmations,"amount": data[index].amount,"time": data[index].time,"address": data[index].address,"txid": data[index].txid}
          tmplisttransactions = [tmp_category,tmp_confirms,tmp_amount,tmp_secondsToString,tmp_addr,'<button  type="button" class="btn btn-xs white btn-info waves-effect waves-light kmd-txid-details-btn" data-edexcoin="' + coin + '" data-txidtype="public" data-txid="'+data[index].txid+'"><i class="icon fa-search"></i></button>']
          //console.log(tmplisttransactions);
          result.push(tmplisttransactions);
        }
        
      });
      //console.log(result)
      resolve(result);
    }).fail(function(xhr, textStatus, error) {
        // handle request failures
        console.log(xhr.statusText);
        if ( xhr.readyState == 0 ) {
            Iguana_ServiceUnavailable();
        }
        console.log(textStatus);
        console.log(error);
    });
  });
}

function clearEdexSendFieldData() {
    //$('.showedexcoinaddrs').selectpicker('refresh');
    //$('#edexcoin_sendto').val('');
    //$('#edexcoin_total_value').text('');
    //$('#edexcoin_amount').val('');
}

function EdexListAllAddr(coin) {
    NProgress.done(true);
    NProgress.configure({
        template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    });
    NProgress.start();

    EDEXgetaddrbyaccount(coin).then(function(result){
      //console.log(result)
      var only_reciving_addr_data = [];

      $.each(result, function(index, value) {
          tmp_addr_label = '<span class="label label-default"><i class="icon fa-eye"></i> public</span>';
          //var tmp_addr_action_button = '<button></button>';
          only_reciving_addr_data.push([tmp_addr_label, result[index]]);
      });
      //console.log(only_reciving_addr_data);

      var edexcoin_recieve_table = '';

      edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable( { data: only_reciving_addr_data,
          select: false,
          retrieve: true
      });

      edexcoin_recieve_table.destroy();

      edexcoin_recieve_table = $('#edexcoin-recieve-addr-tbl').DataTable( { data: only_reciving_addr_data,
          select: false,
          retrieve: true
      });
    })

    NProgress.done();
}
