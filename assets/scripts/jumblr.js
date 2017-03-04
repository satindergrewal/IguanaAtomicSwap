var Jumblr = function() {

	var handleJumblr = function() {
		if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
			//clearInterval(CheckIfIguanaRunning);
			//console.log('=> No wallet logged in, or Dashboard not ative. No need to Run History.');
		} else {
			Jumblr_DisplayAddresses();
			Jumblr_DisplayStatus();
		}
		
		$('#jumblr_actions_header').click(function(){
			Jumblr_DisplayAddresses();
			Jumblr_DisplayStatus();
		})
	};

	return {
		//main function to initiate the module
		init: function() {
			handleJumblr();
		}
	};
}();

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

jQuery(document).ready(function() {
	Jumblr.init();
});