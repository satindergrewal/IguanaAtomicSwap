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
	$(".header-easydex-section").text("Dashboard");
	CommonSidebarActionsSet01();

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
	$(".header-easydex-section").text("Dashboard");
	CommonSidebarActionsSet01();
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
	$(".header-easydex-section").text("EasyDEX");
	CommonSidebarActionsSet02();
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
	$(".header-easydex-section").text("Komodo Wallet");
	CommonSidebarActionsSet02();
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
	$(".header-easydex-section").text("Zcash Wallet");
	CommonSidebarActionsSet02();
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
	$(".header-easydex-section").text("Atomic Explorer");
	CommonSidebarActionsSet02();
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
	CommonSidebarActionsSet02();
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
	$(".header-easydex-section").text("About Iguana");
	CommonSidebarActionsSet02();
});


function CommonSidebarActionSet01() {
	sessionStorage.setItem('DashboardActions', "start");
	$(document).ready(function() { Dashboard.init(); });
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet02() {
	sessionStorage.setItem('DashboardActions', "stop");
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}
