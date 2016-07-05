// DOM Ready =============================================================
$(document).ready(function() {

    // Login on button click
    $('#login-submit').on('click', Iguanalogin);

});

// Functions =============================================================

// Iguana Login
function Iguanalogin() {
	var IguanaLoginData = {
            'handle': $('#username').val(),
            'password': $('#password').val(),
            'timeout': '99999999'
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
            console.log('== Data OutPut ==');
            console.log(LoginOutput);

            if (LoginOutput.result === 'success') {
                console.log('Success');
                swal("Success", "Login Successfully.", "success");

                // Populate IP Info
                //populateIPInfo();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                swal("Oops...", "Something went wrong!", "error");
                console.log(data.statusText);
	            console.log(textStatus);
	            console.log(jqXHR);
            }
        },
        error: function(xhr, textStatus, error) {
            console.log('failure');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
            swal("Oops...", "Something went wrong!", "error");
            
        }
    });
};