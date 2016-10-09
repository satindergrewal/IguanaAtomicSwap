// DOM Ready =============================================================
$(document).ready(function() {

    $('#section-dashboard').show();
    $('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Dashboard")

});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	$('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( "" ).addClass( "active open" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("Dashboard")
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-about-iguana').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( "" ).addClass( "active open" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$(".header-easydex-section").text("EasyDEX")
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').show();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( "" ).addClass( "active open" );
	$(".header-easydex-section").text("About Iguana")
});

$('#nav-iguana-wallet-settings').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-iguana-wallet-settings').show();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( " active open" ).addClass( "" );
	$('#nav-easydex').removeClass( " active open" ).addClass( "" );
	$('#nav-about-iguana').removeClass( " active open" ).addClass( "" );
	$('#nav-iguana-wallet-settings').removeClass( "" ).addClass( "active open" );
	$(".header-easydex-section").text("Wallet Settings")
});

