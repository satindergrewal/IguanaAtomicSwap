const toastrConfig = {
  'closeButton': true,
  'debug': false,
  'positionClass': 'toast-bottom-right',
  'showDuration': '5000',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

var Login = function() {
  toastr.options = toastrConfig;

  var handleLogin = function() {
    $('.login-form').validate({
      // errorElement: 'span', //default input error message container
      // errorClass: 'help-block', // default input error message class
      // focusInvalid: false, // do not focus the last invalid input
      rules: {
        password: {
          required: true
        }
      },

      messages: {
        password: {
          required: _lang[defaultLang].LOGIN.PWD_REQ
        }
      },

      invalidHandler: function(event, validator) { // display error alert on form submit
        $('.alert-danger', $('.login-form')).show();
      },

      highlight: function(element) { // hightlight error inputs
        $(element)
          .closest('.form-group')
          .addClass('has-error'); // set error class to the control group
      },

      success: function(label) {
        label
         .closest('.form-group')
         .removeClass('has-error');
        label.remove();
      },

      errorPlacement: function(error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },

      submitHandler: function(form) {
        var jumblr_setpassphrase_val = 'jumblr ' + $('#password').val();
        //console.log(jumblr_setpassphrase_val);
        Iguana_Jumblr_SetPassphrase({ 'passphrase': jumblr_setpassphrase_val })
        .then(function(result) {
          //console.log(result);
        })
        .then(function() {
          var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
              ajax_data = {
                'userpass': tmpIguanaRPCAuth,
                'handle': $('#wallet-handle').val(),
                'password': $('#password').val(),
                'timeout': '2592000',
                'agent': 'bitcoinrpc',
                'method': 'walletpassphrase'
              };

          $.ajax({
            type: 'POST',
            data: ajax_data,
            data: JSON.stringify(ajax_data),
            url: 'http://127.0.0.1:' + config.iguanaPort,
            success: function(data, textStatus, jqXHR) {
              var LoginOutput = JSON.parse(data);
                  LoginDataToStore = JSON.stringify(data),
              sessionStorage.setItem('IguanaActiveAccount', LoginDataToStore);
              if (LoginOutput.result === 'success') {
                console.log('Success');
                toastr.success(_lang[defaultLang].TOASTR.LOGIN_SUCCESSFULL, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);

                $('#password').val('')
                $('#wallet-login').hide();
                $('#wallet-core').fadeIn();
                $('body')
                  .removeClass( 'page-login layout-full page-dark' )
                  .addClass( '' );
                $('link[id=loginStyle]')[0].disabled = true;

                location.reload();
              } else {
                // If something goes wrong, alert the error message that our service returned
                if (LoginOutput.error === 'bitcoinrpc needs coin that is active') {
                  toastr.info(_lang[defaultLang].TOASTR.NO_COIN_RUNNING, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
                  var logincoinnames = [];
                  $('#logincoinslist input[type=checkbox]:checked').each(function() { logincoinnames.push(this.value); });
                  console.log(logincoinnames);

                  $.each(logincoinnames, function( index, value ) {
                    if ( value == 'BTC' ) {
                      var logincoinmodeval = $('input[name="logincoinbtcmode"]:checked').val(),
                          logincoin_data = {
                            'coin': value,
                            'mode': logincoinmodeval
                          };
                      Iguana_addcoinLogin(logincoin_data);
                    }
                    if ( value == 'BTCD' ) {
                      var logincoinmodeval = $('input[name="logincoinbtcdmode"]:checked').val(),
                          logincoin_data = {
                            'coin': value,
                            'mode': logincoinmodeval
                          };
                      Iguana_addcoinLogin(logincoin_data);
                    }
                    if ( value == 'KMD' ) {
                      var logincoinmodeval = $('input[name="logincoinkmdmode"]:checked').val(),
                          logincoin_data = {
                            'coin': value,
                            'mode': logincoinmodeval
                          };
                      Iguana_addcoinLogin(logincoin_data);
                    }
                  });
                } else if ( LoginOutput.error === 'invalid passphrase' ) {
                  toastr.info(_lang[defaultLang].TOASTR.INVALID_PASSPHRASE, _lang[defaultLang].TOASTR.LOGIN_NOTIFICATION);
                } else {
                  toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                }

                console.log(data.statusText);
                console.log(textStatus);
                console.log(jqXHR);
              }
            },
            error: function(xhr, textStatus, error) {
              console.log('failure');
              console.log(xhr.statusText);
              if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
              }
              console.log(textStatus);
              console.log(error);
            }
          });
        })

        $('#section-dashboard').show();
        $(
          '#section-easydex,' +
          '#section-about-iguana'
        )
        .hide();
        $('#nav-dashboard')
          .removeClass( '' )
          .addClass( 'active open' );
        $(
          '#nav-easydex,' +
          '#nav-about-iguana'
        )
        .removeClass( 'active open' )
        .addClass( '' );
      }
    });

    $('.login-form input').keypress(function(e) {
      if (e.which == 13) {
        if ($('.login-form').validate().form()) {
          $('.login-form').submit(); // form validation success, call ajax form submit
        }

        return false;
      }
    });

    $('input[name=PassPhraseOptions]').on('change', function() {
      if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsIguana' ) {
        console.log('PassPhraseOptionsIguana');
        $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(256));
      }
      if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsWaves' ) {
        console.log('PassPhraseOptionsWaves');
        $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(160));
      }
      if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsNXT' ) {
        console.log('PassPhraseOptionsNXT');
        $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(128));
      }
    });
  }

  var handleRegister = function() {
    $('.register-form').validate({
      errorElement: 'span', // default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      ignore: '',
      rules: {
        walletseed: {
          required: true
        },
        rwalletseed: {
          equalTo: '#walletseed'
        }
      },

      messages: {
        rwalletseed: {
          required: _lang[defaultLang].LOGIN.WALLET_SEED_REQ
        }
      },

      invalidHandler: function(event, validator) { // display error alert on form submit

      },

      highlight: function(element) { // hightlight error inputs
        $(element)
          .closest('.form-group')
          .addClass('has-error'); // set error class to the control group
      },

      success: function(label) {
        label
         .closest('.form-group')
         .removeClass('has-error');
        label.remove();
      },

      errorPlacement: function(error, element) {
        if (element.attr('name') == 'backupconfirm') { // insert checkbox errors after the container
          error.insertAfter($('#register_backupconfirm_error'));
        } else if (element.closest('.input-icon').size() === 1) {
          error.insertAfter(element.closest('.input-icon'));
        } else {
          error.insertAfter(element);
        }
      },

      submitHandler: function(form) {
        swal({
          title: _lang[defaultLang].LOGIN.SAVED_WALLET_SEED,
          text: _lang[defaultLang].LOGIN.SEED_MAKE_SURE_BACKUP,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: _lang[defaultLang].LOGIN.YES_I_BACKUP
        })
        .then(function() {
          var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          		ajax_data = {
          			'userpass': tmpIguanaRPCAuth,
          			'agent': 'bitcoinrpc',
          			'method': 'encryptwallet',
          			'passphrase': $('#walletseed').val()
          		};
          // Use AJAX to post the object to login user
          $.ajax({
            type: 'POST',
            data: ajax_data,
            data: JSON.stringify(ajax_data),
            url: 'http://127.0.0.1:' + config.iguanaPort,
            success: function(data, textStatus, jqXHR) {
              var CreateWalletOutput = JSON.parse(data);

              if (CreateWalletOutput.result === 'success') {
                console.log('Success');
                toastr.success(_lang[defaultLang].TOASTR.WALLET_CREATED_SUCCESFULLY, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                // Iguana_DEXImportAll();

                $('#wallet-handle').val('');
                $('#password').val('');
              } else {
                // If something goes wrong, alert the error message that our service returned
                toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                console.log(CreateWalletOutput);

                if (CreateWalletOutput.error === 'bitcoinrpc needs coin that is active') {
                  var logincoinnames = [];

                  toastr.info(_lang[defaultLang].TOASTR.NO_COIN_RUNNING, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
                  $('#logincoinslist input[type=checkbox]:checked').each(function() { logincoinnames.push(this.value); });
                  console.log(logincoinnames);

                  $.each(logincoinnames, function( index, value ) {
                    if ( value == 'BTC' ) {
                      var logincoinmodeval = $('input[name="logincoinbtcmode"]:checked').val(),
                      		logincoin_data = {
                      			'coin': value,
                      			'mode': logincoinmodeval,
                      			'reload': false
                      		};
                      Iguana_addcoin(logincoin_data);
                      if (index == '0' ) {
                        console.log(value + ' ' + index);
                        $('.register-form').submit();
                        toastr.success(_lang[defaultLang].TOASTR.WALLET_CREATED_SUCCESFULLY, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                      }
                    }
                    if ( value == 'BTCD' ) {
                      var logincoinmodeval = $('input[name="logincoinbtcdmode"]:checked').val(),
                      		logincoin_data = {
                      			'coin': value,
                      			'mode': logincoinmodeval,
                      			'reload': false
                      		};
                      Iguana_addcoin(logincoin_data);
                      if (index == '0' ) {
                        console.log(value + ' ' + index);
                        $('.register-form').submit();
                        toastr.success(_lang[defaultLang].TOASTR.WALLET_CREATED_SUCCESFULLY, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                      }
                    }
                  });
                } else {
                  toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                }

                console.log(data.statusText);

                if ( data.readyState == 0 ) {
                  Iguana_ServiceUnavailable();
                }

                console.log(textStatus);
                console.log(jqXHR);
              }
            },
            error: function(xhr, textStatus, error) {
              console.log('failure');
              console.log(xhr.statusText);
              if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
              }
              console.log(textStatus);
              console.log(error);
              toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
            }
          });

          $('#section-login').fadeIn();
          $('#section-register').hide();
          $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(256));
          $(
            '#rwalletseed,' +
            '#register_password,' +
            '#rpassword'
          )
          .val('');
        });
      }
    });

    $('.register-form input').keypress(function(e) {
      if (e.which == 13) {
        if ($('.register-form').validate().form()) {
          $('.register-form').submit();
        }

        return false;
      }
    });

    jQuery('#register-btn').click(function() {
      event.preventDefault();
      $('#section-login').hide();
      $('#section-register').fadeIn();
      $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(256));
    });

    jQuery('#register-back-btn').click(function() {
      event.preventDefault();
      $('#section-login').fadeIn();
      $('#section-register').hide();
    });
  }

  var handleLogout = function() {
    $('#logout-account').click(function() {
      $('#section-login-addcoin-btn').hide();
      $('#section-login').show();

      var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      		ajax_data = {
      			'userpass': tmpIguanaRPCAuth,
      			'agent': 'bitcoinrpc',
      			'method': 'walletlock'
      		};

      $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:' + config.iguanaPort,
        success: function(data, textStatus, jqXHR) {
          var LogoutOutput = JSON.parse(data);
          // sessionStorage.clear();
          sessionStorage.removeItem('IguanaActiveAccount');
          console.log('== Logout Data OutPut ==');
          console.log(LogoutOutput);

          if (LogoutOutput.result === 'success') {
            console.log('Success');
            toastr.success(_lang[defaultLang].TOASTR.LOGOUT_SUCCESSFULL, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
            $('#wallet-login').show();
            $('body')
              .removeClass( '' )
              .addClass( 'page-login layout-full page-dark' );
            $('#wallet-core').hide();
            $('link[id=loginStyle]')[0].disabled = false;

            // Make sure these fields are unhidden.
            $('#login-welcome').text(_lang[defaultLang].LOGIN.WELCOME + '.');
            $(
              '#wallet-handle,' +
              '.create-account,' +
              '#register-btn'
            )
            .show();
            $('#logint-another-wallet').hide();
            $('#loginbtn').text(_lang[defaultLang].LOGIN.SIGN_IN);

            //Stop SetInterval Calls
            StopShowCoinHistory();
            StopTotalFiatValue();
          } else {
            // If something goes wrong, alert the error message that our service returned
            toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
            console.log(data.statusText);
            if ( xhr.readyState == 0 ) {
              Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(jqXHR);
          }
        },
        error: function(xhr, textStatus, error) {
          console.log('failure');
          console.log(xhr.statusText);
          if ( xhr.readyState == 0 ) {
            Iguana_ServiceUnavailable();
          }
          console.log(textStatus);
          console.log(error);
          toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
        }
      });
    });
  };

  var handleLock = function() {
    // Begin Lock Active Wallet
    $('#lock-screen').click(function() {
	    $('#section-login-addcoin-btn').hide();
	    $('#section-login').show();

      var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      		ajax_data = {
      			'userpass': tmpIguanaRPCAuth,
      			'agent': 'bitcoinrpc',
      			'method': 'walletlock'
      		};

      $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:' + config.iguanaPort,
        success: function(data, textStatus, jqXHR) {
          var LockOutput = JSON.parse(data);
          // Begin Check Active Wallet's status
          var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          		ajax_data_activehandle = {
          			'userpass': tmpIguanaRPCAuth,
          			'agent': 'SuperNET',
          			'method': 'activehandle'
          		};

          $.ajax({
            type: 'POST',
            data: JSON.stringify(ajax_data_activehandle),
            url: 'http://127.0.0.1:' + config.iguanaPort,
            success: function(data, textStatus, jqXHR) {
              var ActiveHandleOutput = JSON.parse(data),
              		ActiveHandleDataToStore = JSON.stringify(data);

              sessionStorage.setItem('IguanaActiveAccount', ActiveHandleDataToStore);
              console.log('== Data OutPut - Active Handle ==');
              console.log(ActiveHandleOutput);

              if (ActiveHandleOutput.status === 'locked') {
                console.log('Success');
                toastr.success(_lang[defaultLang].TOASTR.WALLET_LOCKED, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);

                $('#wallet-login').show();
                $('body')
                  .removeClass( '' )
                  .addClass( 'page-login layout-full page-dark' );
                $('#wallet-core').hide();
                $('link[id=loginStyle]')[0].disabled = false;
                $('#loginbtn').text(_lang[defaultLang].LOGIN.UNLOCK);
                // Hide some login fields not needing at lock screen
                console.log('Wallet is Locked.');
                $('#login-welcome').text(_lang[defaultLang].LOGIN.WALLET_LOCKED_LOGIN);
                $(
                  '#register-btn,' +
                  '#logincoinslist'
                )
                .hide();
                $('#logint-another-wallet').show();
              } else {
                // If something goes wrong, alert the error message that our service returned
                toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
                console.log(data.statusText);
                if ( xhr.readyState == 0 ) {
                  Iguana_ServiceUnavailable();
                }
                console.log(textStatus);
                console.log(jqXHR);
              }
            },
            error: function(xhr, textStatus, error) {
              console.log('failure');
              console.log(xhr.statusText);
              if ( xhr.readyState == 0 ) {
                Iguana_ServiceUnavailable();
              }
              console.log(textStatus);
              console.log(error);
              toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
            }
          });
          // End Check Active Wallet's status
          // console.log('== Data OutPut - Wallet Lock ==');
          // console.log(LockOutput);
        },
        error: function(xhr, textStatus, error) {
          console.log('failure');
          console.log(xhr.statusText);
          if ( xhr.readyState == 0 ) {
            Iguana_ServiceUnavailable();
          }
          console.log(textStatus);
          console.log(error);
          toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
        }
      });
    });
    // End Lock Active Wallet
  };

  var handleCheckLogin = function() {
    if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
      console.log('There\'s no active wallet logged in. Please Login.');
      $('#logint-another-wallet').hide();
      Iguana_CheckActiveCoins()
      .then(function(result) {
        if (result.length !== 0 ) {
          $('#section-login-addcoin-btn').hide();
          $('#section-login').show();
        }
      });
    } else {
        var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));

        Iguana_activehandle()
        .then(function(result) {
          if ( JSON.parse(CheckLoginData).pubkey != result.pubkey ) {
            ClearOnLogout(false, false);
          }
        });

        if ( JSON.parse(CheckLoginData).status === 'unlocked' ) {
          console.log(JSON.parse(CheckLoginData).status);
          $('#password').val('')
          $('#wallet-login').hide();
          $('body')
            .removeClass( 'page-login layout-full page-dark' )
            .addClass( '' );
          $('#wallet-core').fadeIn();
        } else if ( JSON.parse(CheckLoginData).status === 'locked' ) {
          console.log('Wallet is Locked.');
          $('#login-welcome').text(_lang[defaultLang].LOGIN.WALLET_LOCKED_LOGIN);
          $(
            '#register-btn,' +
            '#section-login-addcoin-btn'
          )
          .hide();
          $('#loginbtn').text(_lang[defaultLang].LOGIN.UNLOCK);
          $('#section-login').show();
        }
    }
    if ( sessionStorage.getItem('IguanaRPCAuth') === null || typeof sessionStorage.getItem('IguanaRPCAuth') == undefined) {
      Iguana_SetRPCAuth();
      Shepherd_SendPendValue();
      typeof sessionStorage.getItem('IguanaRPCAuth');
      console.log(sessionStorage.getItem('IguanaRPCAuth'));
      var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
      console.log(tmpIguanaRPCAuth);
    }
  };

  var handleCoinsRunningCheck = function() {
    Iguana_CheckActiveCoins()
    .then(function(result) {
      if (result.length !== 0 ) {
        $('#section-login-addcoin-btn').hide();
        $('#section-login').show();
      }
    });

    /*$.each([ 'basilisk', 'full', 'virtual' ], function( index, value ) {
        var allcoinsvalues = {"agent":"InstantDEX","method":"allcoins"};
        $.ajax({
            type: 'POST',
            data: JSON.stringify(allcoinsvalues),
            url: 'http://127.0.0.1:' + config.iguanaPort,
            //dataType: 'text',
            success: function(data, textStatus, jqXHR) {
                var allcoinsData = JSON.parse(data);
                console.log('== Data OutPut ==');
                console.log(allcoinsData);
                $.each(allcoinsData[value], function(index) {
                    if ( allcoinsData[value][index] == 'BTC' ) { console.log('Index: '+ index + ' and Value: BTC'); }
                    if ( allcoinsData[value][index] == 'BTCD' ) { console.log('Index: '+ index + ' and Value: BTCD'); }
                    var coinvals = {"coin":"BTCD","portp2p":14631,"mode":0}
                    Iguana_addcoin(coinvals);
                });

            },
            error: function(xhr, textStatus, error) {
                console.log('failed getting Coin History.');
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                toastr.error("Unable to complete transaction", "Transaction Notification")
            }
        });
    });
    if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
        $.each([ 'BTC', 'BTCD' ], function( index, value ) {
            var AddCoinBasiliskData = {
                "poll": 100,
                "active": 1,
                "newcoin": value,
                "startpend": 1,
                "endpend": 1,
                "services": 128,
                "maxpeers": 16,
                "RELAY": 0,
                "VALIDATE": 0,
                "portp2p": 14631
            }
            //Start BitcoinDark in Basilisk mode
            $.ajax({
                type: 'GET',
                data: AddCoinBasiliskData,
                url: 'http://127.0.0.1:' + config.iguanaPort + '/api/iguana/addcoin',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var CoinBasiliskDataOutput = JSON.parse(data);
                    //console.log('== Data OutPut ==');
                    //console.log(CoinBasiliskDataOutput);

                    if (CoinBasiliskDataOutput.result === 'coin added') {
                        console.log('coin added');
                        toastr.success(value + " started in Basilisk Mode", "Coin Notification");
                    } else if (CoinBasiliskDataOutput.result === 'coin already there') {
                        console.log('coin already there');
                        //toastr.info("Looks like" + value + "already running.", "Coin Notification");
                    } else if (CoinBasiliskDataOutput.result === null) {
                        console.log('coin already there');
                        //toastr.info("Looks like" + value + "already running.", "Coin Notification");
                    }
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
    }*/
  }

  var handleLoginAnotherWallet = function() {
    $('#logint-another-wallet').click(function() {
      var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      		ajax_data = {
      			'userpass': tmpIguanaRPCAuth,
      			'agent': 'bitcoinrpc',
      			'method': 'walletlock'
      		};

      $('#logint-another-wallet').show();
      $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:' + config.iguanaPort,
        success: function(data, textStatus, jqXHR) {
          var LogoutOutput = JSON.parse(data);
          //sessionStorage.clear();
          sessionStorage.removeItem('IguanaActiveAccount');

          if (LogoutOutput.result === 'success') {
            console.log('Success');
            toastr.success(_lang[defaultLang].TOASTR.LOGOUT_SUCCESSFULL, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);

            $('#wallet-login').show();
            $('body')
              .removeClass( '' )
              .addClass( 'page-login layout-full page-dark' );
            $('#wallet-core').hide();
            $('link[id=loginStyle]')[0].disabled = false;

            // Make sure these fields are unhidden.
            $('#login-welcome').text(_lang[defaultLang].INDEX.WELCOME_LOGIN);
            $(
              '.create-account,' +
              '#register-btn,' +
              '#logincoinslist'
            )
            .show();
            $('#logint-another-wallet').hide();
            $('#loginbtn').text(_lang[defaultLang].LOGIN.SIGN_IN);
          } else {
            // If something goes wrong, alert the error message that our service returned
            toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
            console.log(data.statusText);
            if ( xhr.readyState == 0 ) {
              Iguana_ServiceUnavailable();
            }
            console.log(textStatus);
            console.log(jqXHR);
          }
        },
        error: function(xhr, textStatus, error) {
          console.log('failure');
          console.log(xhr.statusText);
          if ( xhr.readyState == 0 ) {
            Iguana_ServiceUnavailable();
          }
          console.log(textStatus);
          console.log(error);
          toastr.warning(_lang[defaultLang].TOASTR.OPPS, _lang[defaultLang].TOASTR.ACCOUNT_NOTIFICATION);
        }
      });
    });
  };

  var handleAddCoinLoginBtn = function() {
    $('#addcoin_mdl_native_mode_login').prop('disabled', true);
    $('#addcoin_mdl_basilisk_mode_login').prop('disabled', true);
    $('#addcoin_mdl_full_mode_login')
      .prop('disabled', true)
      .prop('checked', false);

    $('.mdl_addcoin_done_btn-login').click(function() {
      ExecuteAddCoinLoginFn();
    });

    $( '#addcoin_select_coin_mdl_options-login' )
    .change(function() {
      var tmp_coin_val = $('#addcoin_select_coin_mdl_options-login').val();

      if (tmp_coin_val !== 'KMD' || tmp_coin_val !== 'KMD' ) {
        $('#addcoin_mdl_native_mode_login').prop('disabled', true);
        $('#addcoin_mdl_basilisk_mode_login').prop('disabled', true);
        $('#addcoin_mdl_full_mode_login')
          .prop('disabled', false)
          .prop('checked', true);
      }
      if (tmp_coin_val == 'KMD') {
        $('#addcoin_mdl_native_mode_login').prop('disabled', false);
        $('#addcoin_mdl_basilisk_mode_login')
          .prop('disabled', false)
          .prop('checked', true);
        $('#addcoin_mdl_full_mode_login').prop('disabled', true);
      }
      if (tmp_coin_val == 'SUPERNET' ||
          tmp_coin_val == 'REVS' ||
          tmp_coin_val == 'WIRELESS' ||
          tmp_coin_val == 'DEX' ||
          tmp_coin_val == 'PANGEA' ||
          tmp_coin_val == 'JUMBLR' ||
          tmp_coin_val == 'BET' ||
          tmp_coin_val == 'CRYPTO' ||
          tmp_coin_val == 'HODL' ||
          tmp_coin_val == 'SHARK' ||
          tmp_coin_val == 'BOTS' ||
          tmp_coin_val == 'MGW' ||
          tmp_coin_val == 'MVP' ||
          tmp_coin_val == 'KV' ||
          tmp_coin_val == 'CEAL' ||
          tmp_coin_val == 'MESH' ||
          tmp_coin_val == 'USD' ||
          tmp_coin_val == 'RON' ||
          tmp_coin_val == 'EUR' ||
          tmp_coin_val == 'JPY' ||
          tmp_coin_val == 'GBP' ||
          tmp_coin_val == 'AUD' ||
          tmp_coin_val == 'CAD' ||
          tmp_coin_val == 'CHF' ||
          tmp_coin_val == 'NZD' ||
          tmp_coin_val == 'CNY' ||
          tmp_coin_val == 'RUB' ||
          tmp_coin_val == 'MXN' ||
          tmp_coin_val == 'BRL' ||
          tmp_coin_val == 'INR' ||
          tmp_coin_val == 'HKD' ||
          tmp_coin_val == 'TRY' ||
          tmp_coin_val == 'ZAR' ||
          tmp_coin_val == 'PLN' ||
          tmp_coin_val == 'NOK' ||
          tmp_coin_val == 'SEK' ||
          tmp_coin_val == 'DKK' ||
          tmp_coin_val == 'CZK' ||
          tmp_coin_val == 'HUF' ||
          tmp_coin_val == 'ILS' ||
          tmp_coin_val == 'KRW' ||
          tmp_coin_val == 'MYR' ||
          tmp_coin_val == 'PHP' ||
          tmp_coin_val == 'SGD' ||
          tmp_coin_val == 'THB' ||
          tmp_coin_val == 'BGN' ||
          tmp_coin_val == 'IDR' ||
          tmp_coin_val == 'HRK' ) {
        $('#addcoin_mdl_native_mode_login').prop('disabled', false);
        $('#addcoin_mdl_basilisk_mode_login')
          .prop('disabled', false)
          .prop('checked', true);
        $('#addcoin_mdl_full_mode_login').prop('disabled', true);
      }
      if (tmp_coin_val == 'BTC') {
        $('#addcoin_mdl_basilisk_mode_login').prop('disabled', true);
        $('#addcoin_mdl_native_mode_login').prop('disabled', true);
        $('#addcoin_mdl_full_mode_login')
          .prop('disabled', false)
          .prop('checked', true);
      }
      if (tmp_coin_val == 'ZEC') {
        $('#addcoin_mdl_basilisk_mode_login').prop('disabled', true);
        $('#addcoin_mdl_native_mode_login')
          .prop('disabled', false)
          .prop('checked', true);
        $('#addcoin_mdl_full_mode_login').prop('disabled', true);
      }
    });
  }

  var handleAddCoinOSOptions = function() {
    if ( navigator.platform == 'Win32-'
      // || navigator.platform == 'MacIntel'
      // || navigator.platform == 'Linux x86_64' || navigator.platform == 'Linux' || navigator.platform == 'Linux i686'
      ) {
      // Conditions for Login Add Coin Dialog
      $.each($('.style-addcoin-lbl-mdl-login'), function(index, value) {
        if ( index == 0  || index == 1 ) {
          $(value)
            .removeClass('col-lg-4 col-md-4')
            .addClass('col-lg-6 col-md-6');
        }
        if ( index == 2 ) {
          $(value).hide();
        }
      });

      // Conditions for Dashboard Add Coin Dialog
      $.each($('.style-addcoin-lbl-mdl'), function(index, value) {
        if ( index == 0  || index == 1 ) {
          $(value)
            .removeClass('col-lg-4 col-md-4')
            .addClass('col-lg-6 col-md-6');
        }
        if ( index == 2 ) {
          $(value).hide();
        }
      });
    }
  }

  return {
    // main function to initiate the module
    init: function() {
      // handleCoinsRunningCheck();
      handleLogin();
      handleLock();
      handleRegister();
      handleLogout();
      handleCheckLogin();
      handleLoginAnotherWallet();
      handleAddCoinLoginBtn();
      handleAddCoinOSOptions();
    }
  };
}();

jQuery(document).ready(function() {
  Login.init();
});

function ClearOnLogout(cleardata, stopinterval) {
  if ( cleardata === true ) {
    sessionStorage.removeItem('IguanaActiveAccount');
  }
  if ( cleardata === false || cleardata === null ) {
    console.log('sessionStorage data not cleared.');
  }
  if ( stopinterval === true ) {
    // Stop SetInterval Calls
    StopShowCoinHistory();
    StopTotalFiatValue();
  }
  if ( stopinterval === false || stopinterval === null ) {
    console.log('SetInterval data not cleared.');
  }
  $('#wallet-login').show();
  $('body')
    .removeClass( '' )
    .addClass( 'page-login layout-full page-dark' );
  $(
    '#wallet-core,' +
    '#logint-another-wallet'
  )
  .hide();
  $('link[id=loginStyle]')[0].disabled = false;

  // Make sure these fields are unhidden.
  $('#login-welcome').text(_lang[defaultLang].LOGIN.WELCOME);
  $(
    '#wallet-handle,' +
    '.create-account,' +
    '#register-btn'
  )
  .show();
  $('#logint-another-wallet').hide();
  $('#loginbtn').text(_lang[defaultLang].LOGIN.SIGN_IN);
}