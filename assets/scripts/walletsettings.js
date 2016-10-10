// DOM Ready =============================================================
$(document).ready(function() {

});

// Functions =============================================================

function Settings_ShowWalletInfo() {
	var CheckLoginData = JSON.parse(sessionStorage.getItem('IguanaActiveAccount'));
	console.log(JSON.parse(CheckLoginData));
	$("#winfo_pubkey_value").text(JSON.parse(CheckLoginData).pubkey);
	$("#winfo_btcpubkey_value").text(JSON.parse(CheckLoginData).btcpubkey);
	$("#winfo_rmd160_value").text(JSON.parse(CheckLoginData).rmd160);
	$("#winfo_NXT_value").text(JSON.parse(CheckLoginData).NXT);
	$("#winfo_notary_value").text(JSON.parse(CheckLoginData).notary);
	$("#winfo_status_value").text(JSON.parse(CheckLoginData).status);
	//$("#winfo_duration_value").text(JSON.parse(CheckLoginData).duration);
}