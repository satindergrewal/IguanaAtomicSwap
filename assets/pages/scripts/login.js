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
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
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
                    'handle': $('#username').val(),
                    'password': $('#password').val(),
                    'timeout': '2592000'
                }
                console.log('== Data Collected ==');
                console.log(IguanaLoginData);
                // Use AJAX to post the object to login user
                $.ajax({
                    type: 'GET',
                    data: IguanaLoginData,
                    url: 'http://127.0.0.1:7778/api/bitcoinrpc/walletpassphrase',
                    dataType: 'text',
                    success: function(data, textStatus, jqXHR) {
                        var LoginOutput = JSON.parse(data);
                        //console.log('== Data OutPut ==');
                        //console.log(LoginOutput);

                        if (LoginOutput.result === 'success') {
                            console.log('Success');
                            //swal("Success", "Login Successfully.", "success");
                            toastr.success("Login SUccessfull", "Account Notification")

                            NProgress.done();
                            $('#username').val('')
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
    }

    var handleRegister = function() {

        function format(state) {
            if (!state.id) { return state.text; }
            var $state = $(
             '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );
            
            return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
            $("#country_list").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            templateResult: format,
                templateSelection: format,
                width: 'auto', 
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#country_list').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
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
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
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
                    var LoginOutput = JSON.parse(data);
                    console.log('== Data OutPut ==');
                    console.log(LoginOutput);

                    if (LoginOutput.result === 'logged out') {
                        console.log('Success');
                        //swal("Success", "Logout Successfully.", "success");
                        toastr.success("Logout Successfull", "Account Notification")

                        NProgress.done();
                        $('#login-section').show();
                        $('body').removeClass( "page-sidebar-closed-hide-logo page-container-bg-solid page-header-fixed" ).addClass( " login" );
                        $('#wallet-section').hide();
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
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleRegister();
            handleLogout();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});