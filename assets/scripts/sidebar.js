// DOM Ready =============================================================
$(document).ready(function() {

    $('#section-dashboard').show();
    $('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Dashboard")

});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	$('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Dashboard")
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( "" ).addClass( "active open" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("EasyDEX")
});

$('#nav-komodo-wallet').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-komodo').show();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( "" ).addClass( "active open" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Komodo Wallet")
});

$('#nav-zcash-wallet').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').show();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( "" ).addClass( "active open" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Zcash Wallet")
});

$('#nav-iguana-atomic-explorer').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').show();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( "" ).addClass( "active open" );
	$(".header-easydex-section").text("Atomic Explorer")
});

$('#nav-iguana-wallet-settings').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').show();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( "" ).addClass( "active open" );
	$(".header-easydex-section").text("Wallet Settings")
	Settings_ShowWalletInfo(); //Execute this function from walletsettings.js file
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-komodo').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').show();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-komodo-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-zcash-wallet').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-atomic-explorer').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( "" ).addClass( "active open" );
	$(".header-easydex-section").text("About Iguana")
});

