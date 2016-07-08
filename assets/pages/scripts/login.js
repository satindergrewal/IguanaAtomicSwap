var Login = function() {


    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                password: {
                    required: true
                }
            },

            messages: {
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                var IguanaLoginData = {
                    'handle': $('#wallet-handle').val(),
                    'password': $('#password').val(),
                    'timeout': '2592000'
                }
                //console.log('== Data Collected ==');
                //console.log(IguanaLoginData);
                // Use AJAX to post the object to login user
                $.ajax({
                    type: 'GET',
                    data: IguanaLoginData,
                    url: 'http://127.0.0.1:7778/api/bitcoinrpc/walletpassphrase',
                    dataType: 'text',
                    success: function(data, textStatus, jqXHR) {
                        var LoginOutput = JSON.parse(data);
                        var LoginDataToStore = JSON.stringify(data);
                        sessionStorage.setItem('IguanaActiveAccount', LoginDataToStore);
                        //console.log(sessionStorage);
                        console.log('== Data OutPut ==');
                        console.log(LoginOutput);

                        if (LoginOutput.result === 'success') {
                            console.log('Success');
                            //swal("Success", "Login Successfully.", "success");
                            toastr.success("Login Successfull", "Account Notification")

                            NProgress.done();
                            $('#wallet-handle').val('')
                            $('#password').val('')
                            $('#login-section').hide();
                            $('body').removeClass( " login" ).addClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" );
                            $('#wallet-section').fadeIn();
                        }
                        else {
                            // If something goes wrong, alert the error message that our service returned
                            //swal("Oops...", "Something went wrong!", "error");
                            toastr.warning("Opps... Something went wrong!", "Account Notification")
                            console.log(data.statusText);
                            console.log(textStatus);
                            console.log(jqXHR);

                            NProgress.done();
                        }
                    },
                    error: function(xhr, textStatus, error) {
                        console.log('failure');
                        console.log(xhr.statusText);
                        console.log(textStatus);
                        console.log(error);
                        //swal("Oops...", "Something went wrong!", "error");
                        toastr.warning("Opps... Something went wrong!", "Account Notification")
                        
                        NProgress.done();
                    }
                });
                
                //form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });

        $('input[name=PassPhraseOptions]').on('change', function() {
            if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsIguana' ) {
                //console.log('PassPhraseOptionsIguana');
                $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(256))
            }
            if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsWaves' ) {
                //console.log('PassPhraseOptionsWaves');
                $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(160))
            }
            if ( $('input[name=PassPhraseOptions]:checked', '.register-form').val() === 'PassPhraseOptionsNXT' ) {
                //console.log('PassPhraseOptionsNXT');
                $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(128))
            }
        });
    }

    var handleRegister = function() {

        function format(state) {
            if (!state.id) { return state.text; }
            var $state = $(
             '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );
            
            return $state;
        }

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                walletseed: {
                    required: true
                },

                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                
            },

            

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "backupconfirm") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_backupconfirm_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                var IguanaLoginData = {
                    'handle': $('#wallet-handle').val(),
                    'password': $('#password').val(),
                    'timeout': '2592000'
                }
                //console.log('== Data Collected ==');
                //console.log(IguanaLoginData);
                // Use AJAX to post the object to login user
                $.ajax({
                    type: 'GET',
                    data: IguanaLoginData,
                    url: 'http://127.0.0.1:7778/api/bitcoinrpc/walletpassphrase',
                    dataType: 'text',
                    success: function(data, textStatus, jqXHR) {
                        var LoginOutput = JSON.parse(data);
                        var LoginDataToStore = JSON.stringify(data);
                        sessionStorage.setItem('IguanaActiveAccount', LoginDataToStore);
                        //console.log(sessionStorage);
                        console.log('== Data OutPut ==');
                        console.log(LoginOutput);

                        if (LoginOutput.result === 'success') {
                            console.log('Success');
                            //swal("Success", "Login Successfully.", "success");
                            toastr.success("Login Successfull", "Account Notification")

                            NProgress.done();
                            $('#wallet-handle').val('')
                            $('#password').val('')
                            $('#login-section').hide();
                            $('body').removeClass( " login" ).addClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" );
                            $('#wallet-section').fadeIn();
                        }
                        else {
                            // If something goes wrong, alert the error message that our service returned
                            //swal("Oops...", "Something went wrong!", "error");
                            toastr.warning("Opps... Something went wrong!", "Account Notification")
                            console.log(data.statusText);
                            console.log(textStatus);
                            console.log(jqXHR);

                            NProgress.done();
                        }
                    },
                    error: function(xhr, textStatus, error) {
                        console.log('failure');
                        console.log(xhr.statusText);
                        console.log(textStatus);
                        console.log(error);
                        //swal("Oops...", "Something went wrong!", "error");
                        toastr.warning("Opps... Something went wrong!", "Account Notification")
                        
                        NProgress.done();
                    }
                });
                
                //form.submit();
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
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
            $('#walletseed').text(PassPhraseGenerator.generatePassPhrase(256));
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });


    }

    var handleLogout = function() {

        $('#logout-account').click(function() {
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:7778/api/SuperNET/logout',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var LogoutOutput = JSON.parse(data);
                    sessionStorage.clear();
                    //console.log('== Data OutPut ==');
                    //console.log(LogoutOutput);

                    if (LogoutOutput.result === 'logged out') {
                        console.log('Success');
                        //swal("Success", "Logout Successfully.", "success");
                        toastr.success("Logout Successfull", "Account Notification")

                        NProgress.done();
                        $('#login-section').show();
                        $('body').removeClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" ).addClass( " login" );
                        $('#wallet-section').hide();

                        //Make sure these fields are unhidden.
                        $('#login-welcome').text('Welcome.');
                        $('#wallet-handle').show();
                        $('.create-account').show();
                        $('#register-btn').show();
                        $('#logint-another-wallet').hide();

                    }
                    else {
                        // If something goes wrong, alert the error message that our service returned
                        //swal("Oops...", "Something went wrong!", "error");
                        toastr.warning("Opps... Something went wrong!", "Account Notification")
                        console.log(data.statusText);
                        console.log(textStatus);
                        console.log(jqXHR);

                        NProgress.done();
                    }
                },
                error: function(xhr, textStatus, error) {
                    console.log('failure');
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                    //swal("Oops...", "Something went wrong!", "error");
                    toastr.warning("Opps... Something went wrong!", "Account Notification")
                    
                    NProgress.done();
                }
            });
        });
    };

    var handleLock = function() {
        //Begin Lock Active Wallet
        $('#lock-screen').click(function() {
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:7778/api/bitcoinrpc/walletlock',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var LockOutput = JSON.parse(data);

                    //Begin Check Active Wallet's status
                    $.ajax({
                        type: 'GET',
                        url: 'http://127.0.0.1:7778/api/SuperNET/activehandle',
                        dataType: 'text',
                        success: function(data, textStatus, jqXHR) {
                            var ActiveHandleOutput = JSON.parse(data);
                            var ActiveHandleDataToStore = JSON.stringify(data);
                            sessionStorage.setItem('IguanaActiveAccount', ActiveHandleDataToStore);
                            console.log('== Data OutPut - Active Handle ==');
                            console.log(ActiveHandleOutput);

                            if (ActiveHandleOutput.status === 'locked') {
                                console.log('Success');
                                //swal("Success", "Wallet Locked Successfully.", "success");
                                toastr.success("Wallet Locked Successfully", "Account Notification")

                                NProgress.done();
                                $('#login-section').show();
                                $('body').removeClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" ).addClass( " login" );
                                $('#wallet-section').hide();
                                //Hide some login fields not needing at lock screen
                                console.log('Wallet is Locked.');
                                $('#login-welcome').text('Wallet Locked.');
                                $('#wallet-handle').hide();
                                $('#register-btn').hide();
                                $('#logint-another-wallet').show();
                            }
                            else {
                                // If something goes wrong, alert the error message that our service returned
                                //swal("Oops...", "Something went wrong!", "error");
                                toastr.warning("Opps... Something went wrong!", "Account Notification")
                                console.log(data.statusText);
                                console.log(textStatus);
                                console.log(jqXHR);

                                NProgress.done();
                            }
                        },
                        error: function(xhr, textStatus, error) {
                            console.log('failure');
                            console.log(xhr.statusText);
                            console.log(textStatus);
                            console.log(error);
                            //swal("Oops...", "Something went wrong!", "error");
                            toastr.warning("Opps... Something went wrong!", "Account Notification")
                            
                            NProgress.done();
                        }
                    });
                    //End Check Active Wallet's status

                    //console.log('== Data OutPut - Wallet Lock ==');
                    //console.log(LockOutput);
                },
                error: function(xhr, textStatus, error) {
                    console.log('failure');
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                    //swal("Oops...", "Something went wrong!", "error");
                    toastr.warning("Opps... Something went wrong!", "Account Notification")
                    
                    NProgress.done();
                }
            });
        });
        //End Lock Active Wallet
    };

    var handleCheckLogin = function() {
        if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
            console.log('There\'s no active wallet logged in. Please Login.');
            $('#logint-another-wallet').hide();
        } else {
            var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));
            if ( JSON.parse(CheckLoginData).status === 'unlocked' ) {
                console.log(JSON.parse(CheckLoginData).status);
                $('#wallet-handle').val('')
                $('#password').val('')
                $('#login-section').hide();
                $('body').removeClass( " login" ).addClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" );
                $('#wallet-section').fadeIn();
            } else if ( JSON.parse(CheckLoginData).status === 'locked' ) {
                console.log('Wallet is Locked.');
                $('#login-welcome').text('Wallet Locked.');
                $('#wallet-handle').hide();
                $('#register-btn').hide();
            }
        }
        
    };

    var handleLoginAnotherWallet = function() {
        $('#logint-another-wallet').click(function() {
            $('#logint-another-wallet').show();
            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:7778/api/SuperNET/logout',
                dataType: 'text',
                success: function(data, textStatus, jqXHR) {
                    var LogoutOutput = JSON.parse(data);
                    sessionStorage.clear();
                    //console.log('== Data OutPut ==');
                    //console.log(LogoutOutput);

                    if (LogoutOutput.result === 'logged out') {
                        console.log('Success');
                        //swal("Success", "Logout Successfully.", "success");
                        toastr.success("Logout Successfull", "Account Notification")

                        NProgress.done();
                        $('#login-section').show();
                        $('body').removeClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" ).addClass( " login" );
                        $('#wallet-section').hide();

                        //Make sure these fields are unhidden.
                        $('#login-welcome').text('Welcome.');
                        $('#wallet-handle').show();
                        $('.create-account').show();
                        $('#register-btn').show();
                        $('#logint-another-wallet').hide();

                    }
                    else {
                        // If something goes wrong, alert the error message that our service returned
                        //swal("Oops...", "Something went wrong!", "error");
                        toastr.warning("Opps... Something went wrong!", "Account Notification")
                        console.log(data.statusText);
                        console.log(textStatus);
                        console.log(jqXHR);

                        NProgress.done();
                    }
                },
                error: function(xhr, textStatus, error) {
                    console.log('failure');
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                    //swal("Oops...", "Something went wrong!", "error");
                    toastr.warning("Opps... Something went wrong!", "Account Notification")
                    
                    NProgress.done();
                }
            });
        });
    };

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleLock();
            handleRegister();
            handleLogout();
            handleCheckLogin();
            handleLoginAnotherWallet();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});