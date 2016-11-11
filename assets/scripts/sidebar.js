// DOM Ready =============================================================
$(document).ready(function() {

    $('#section-dashboard').show();
    $('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet01();

});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	$('#header-dashboard').show();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet01();
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-extcoin').hide();
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
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet02();
});

$('#nav-komodo-wallet').on('click', function() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-extcoin').show();
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
	//$.each($('[data-extcoin="KMD"]'), function(index, value) {console.log($('[data-extcoin="KMD"]').data()); $('[data-extcoin="KMD"]').attr("data-extcoin","ZEC"); });
	$.each($('[data-extcoin]'), function(index, value) {$('[data-extcoin]').attr("data-extcoin","KMD"); $('[data-extcoin="KMD"]')});
	KMDWalletDashboard.init(); //Initiate Komodo Dashbaord sript
	applyKMDWalletStyle();
	//removeZECWalletStyle();
	CommonSidebarActionsSet02();
	NProgress.done();
});

$('#nav-zcash-wallet').on('click', function() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	});
	NProgress.start();
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	$.each($('[data-extcoin]'), function(index, value) {$('[data-extcoin]').attr("data-extcoin","ZEC"); $('[data-extcoin="ZEC"]')});
	applyZECWalletStyle();
	//removeKMDWalletStyle();
	CommonSidebarActionsSet02();
	NProgress.done();
});

$('#nav-iguana-atomic-explorer').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet02();
});

$('#nav-iguana-wallet-settings').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	$(".header-easydex-section").text("Wallet Settings");
	removeKMDWalletStyle();
	removeZECWalletStyle();
	Settings_ShowWalletInfo(); //Execute this function from walletsettings.js file
	CommonSidebarActionsSet02();
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-extcoin').hide();
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
	removeKMDWalletStyle();
	removeZECWalletStyle();
	CommonSidebarActionsSet02();
});


function CommonSidebarActionsSet01() {
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


function applyKMDWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/kmd_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/kmd_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_kmd_wallet_actions_header').show();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
}

function removeKMDWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( "style" );
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').show();
}


function applyZECWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/zec_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/zec_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').show();
	$('#easydex_btc_btcd_balances_header').hide();
}

function removeZECWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( "style" );
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').show();
}