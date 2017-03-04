var Jumblr = function() {

	var handleJumblr = function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
			//clearInterval(CheckIfIguanaRunning);
			//console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
		} else {
			Jumblr_CheckIfConnected().then(function(result){
				console.log(result)
				if (result == 'connected') {
					Jumblr_DisplayAddresses();
					Jumblr_DisplayStatus();
					Jumblr_ShowHideAlert();
				}
			})
		}
		
		$('#jumblr_actions_header').click(function(){
			Jumblr_CheckIfConnected().then(function(result){
				console.log(result)
				if (result == 'connected') {
					Jumblr_DisplayAddresses();
					Jumblr_DisplayStatus();
					Jumblr_ShowHideAlert();
				}
			})
		})
	};

	return {
		//main function to initiate the module
		init: function() {
			handleJumblr();
		}
	};
}();

function Jumblr_ShowHideAlert() {
	Jumblr_LookforNativeKomodo().then(function(result){
		//console.log(result)
		if (result === 'isnative') {
			$('#jumblr_no_native_kmd_alert').hide()
		} else {
			$('#jumblr_no_native_kmd_alert').show()
		}
	})
}

function Jumblr_DisplayAddresses() {
	var jumblr_session_data = JSON.parse(JSON.parse(sessionStorage.getItem('IguanaActiveAccount')));
	//console.log(jumblr_session_data);
	$('#jumblr_BTCdeposit').text(jumblr_session_data.BTCdeposit)
	$('#jumblr_BTCjumblr').text(jumblr_session_data.BTCjumblr)
	$('#jumblr_KMDdeposit').text(jumblr_session_data.KMDdeposit)
	$('#jumblr_KMDjumblr').text(jumblr_session_data.KMDjumblr)
}

function Jumblr_DisplayStatus() {
	Iguana_Jumblr_Status().then(function(result){
		//console.log(result)
		$('#jumblr_status_BTCdeposit').text(result.BTCdeposit)
		$('#jumblr_status_BTCjumblr').text(result.BTCjumblr)
		$('#jumblr_status_KMDdeposit').text(result.KMDdeposit)
		$('#jumblr_status_KMDjumblr').text(result.KMDjumblr)
		$('#jumblr_status_result').text(result.result)
		$('#jumblr_status_deposited').text(result.deposited)
		$('#jumblr_status_t_to_z').text(result.t_to_z)
		$('#jumblr_status_z_to_z').text(result.z_to_z)
		$('#jumblr_status_z_to_t').text(result.z_to_t)
		$('#jumblr_status_finished').text(result.finished)
		$('#jumblr_status_pending').text(result.pending)
	})
}

function Jumblr_LookforNativeKomodo() {
	return new Promise((resolve) => {
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				ajax_data = {
					'userpass': tmpIguanaRPCAuth,
					'agent': 'InstantDEX',
					'method': 'allcoins'
				},
				AjaxOutputData = IguanaAJAX('http://127.0.0.1:7778', ajax_data).done(function(data) {
					AjaxOutputData = JSON.parse(AjaxOutputData.responseText);
					if (AjaxOutputData['native'].length !== 0 ) {
						$.each(AjaxOutputData.native, function( index, value ) {
						//console.log(index)
						//console.log(value)
								if (value !== 'KMD') {
									console.log('Native KMD not found')
									resolve('notfound');
								} else {
									console.log('Native KMD found')
									resolve('isnative');
								}
						});
					} else {
						resolve('notnative');
					}
		}).fail(function(xhr, textStatus, error) {
				// handle request failures
				console.log(xhr.statusText);
				if ( xhr.readyState == 0 ) {
				}
				console.log(textStatus);
				console.log(error);
		})
	});
}


function Jumblr_CheckIfConnected() {
	return new Promise((resolve) => {
		var extcoin = $('[data-extcoin]').attr('data-extcoin'),
			passthru_agent = getPassthruAgent(),
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
			ajax_data = {
				'userpass': tmpIguanaRPCAuth,
				'agent': passthru_agent,
				'method': 'passthru',
				'function': 'getinfo',
				'hex': ''
			};
		
		//console.log(ajax_data);
		$.ajax({
			type: 'POST',
			data: JSON.stringify(ajax_data),
			url: 'http://127.0.0.1:7778'
		}).done(function(data){
			data = JSON.parse(data)
			if ( data.errors != undefined ) {
				resolve('connected');
			} else if (data.errors == '' ) {
				resolve('connected');
			} else if ( data.errors == undefined) {
				resolve('not active');
			} else {
				resolve(data.errors);
			}
		})
	})
}


jQuery(document).ready(function() {
	Jumblr.init();
});