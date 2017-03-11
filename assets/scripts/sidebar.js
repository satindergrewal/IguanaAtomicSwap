// DOM Ready =============================================================
$(document).ready(function() {
  $('#section-dashboard').show();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( '' ).addClass( 'active open' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.DASHBOARD);

	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet01();
	applyDashboardStyle();
});

$('#nav-dashboard').on('click', function() {
	$('#section-dashboard').show();
	var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
	if (active_edexcoin !== 'COIN') {
		$('#header-dashboard').show();
	}
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( '' ).addClass( 'active open' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.DASHBOARD);
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet011();
	applyDashboardStyle();
});

$('#nav-easydex').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').show();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( '' ).addClass( 'active open' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('.page-header-bordered h1').text('EasyDEX');
	$(".header-easydex-section").text(_lang[defaultLang].SIDEBAR.EDEX_MOTTO);
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active')
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
});

$('#nav-jumblr').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').show();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( '' ).addClass( 'active open' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('.page-header-bordered h1').text('Jumblr')
	//$(".header-easydex-section").text('Secure, Native and Decentralised Coin Shuffling');
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active')
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	applyJumblrStyle()
});

$('#nav-komodo-wallet').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').show();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( '' ).addClass( 'active open' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );

	$.each($('[data-extcoin]'), function(index, value) {
		$('[data-extcoin]').attr('data-extcoin', 'KMD');
		$('[data-extcoin="KMD"]');
	});
	$.each($('[data-extcoinname]'), function(index, value) {
		$('[data-extcoinname]').text('KMD');
		$('[data-extcoinname="KMD"]');
	});
	$.each($('[data-extcointitle]'), function(index, value) {
		$('[data-extcointitle]').text('Komodo');
		$('[data-extcointitle="Komodo"]');
	});
	KMDWalletDashboard.init(); // Initiate Komodo Dashboard sript
	RunKMDInitFunctions();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	// removeZECWalletStyle();
	applyKMDWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
});

$('#nav-zcash-wallet').on('click', function() {
	NProgress.done(true);
	NProgress.configure({
		template: '<div class="bar nprogress-bar-header nprogress-bar-info" role="bar"></div>' +
							'<div class="spinner" role="spinner">' +
								'<div class="spinner-icon"></div>' +
							'</div>'
	});
	NProgress.start();
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	// $('#section-zcash').show();
	$('#section-extcoin').show();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( '' ).addClass( 'active open' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$(".header-easydex-section").text(_lang[defaultLang].INDEX.ZC_WALLET);

	$.each($('[data-extcoin]'), function(index, value) {
		$('[data-extcoin]').attr('data-extcoin', 'ZEC');
		$('[data-extcoin="ZEC"]');
	});
	$.each($('[data-extcoinname]'), function(index, value) {
		$('[data-extcoinname]').text('ZEC');
		$('[data-extcoinname="ZEC"]');
	});
	$.each($('[data-extcointitle]'), function(index, value) {
		$('[data-extcointitle]').text('Zcash');
		$('[data-extcointitle="Zcash"]');
	});

	KMDWalletDashboard.init(); // Initiate Komodo Dashbaord sript
	RunKMDInitFunctions();
	//removeKMDWalletStyle();
	applyZECWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	NProgress.done();
});

$('#nav-iguana-atomic-explorer').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').show();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( '' ).addClass( 'active open' );
	$(".header-easydex-section").text('Atomic Explorer');
	$.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
	$(this.parentElement).addClass('active');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});

$('#nav-iguana-wallet-settings').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').show();
	$('#section-about-iguana').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( '' ).addClass( 'active open' );
	// $(".header-easydex-section").text("Wallet Settings");
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	Settings_ShowWalletInfo(); // Execute this function from walletsettings.js file
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});

$('#nav-about-iguana').on('click', function() {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').hide();
	$('#section-zcash').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#section-about-iguana').show();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( '' ).addClass( 'active open' );
	$(".header-easydex-section").text('About Iguana');
	removeKMDWalletStyle();
	removeZECWalletStyle();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	CommonSidebarActionsSet02();
	removeDashboardStyle();
	$('#easydex-header-div').hide();
});


// ASSETCHAINS AND PAXCHAINS SIDE MENU

function assetchain_pax_menu_actions(coin) {
	$('#section-dashboard').hide();
	$('#header-dashboard').hide();
	$('#section-easydex').hide();
	$('#section-jumblr').hide();
	$('#section-extcoin').show();
	$('#section-zcash').hide();
	$('#section-about-iguana').hide();
	$('#section-iguana-atomic-explorer').hide();
	$('#section-iguana-wallet-settings').hide();
	$('#nav-dashboard').removeClass( 'active open' ).addClass( '' );
	$('#nav-easydex').removeClass( 'active open' ).addClass( '' );
	$('#nav-jumblr').removeClass( 'active open' ).addClass( '' );
	$('#nav-komodo-wallet').removeClass( '' ).addClass( 'active open' );
	$('#nav-zcash-wallet').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-atomic-explorer').removeClass( 'active open' ).addClass( '' );
	$('#nav-iguana-wallet-settings').removeClass( 'active open' ).addClass( '' );
	$('#nav-about-iguana').removeClass( 'active open' ).addClass( '' );

	$.each($('[data-extcoin]'), function(index, value) {
		$('[data-extcoin]').attr('data-extcoin', coin);
		$('[data-extcoin='+coin+']');
	});
	$.each($('[data-extcoinname]'), function(index, value) {
		$('[data-extcoinname]').text(coin);
		$('[data-extcoinname='+coin+']');
	});
	$.each($('[data-extcointitle]'), function(index, value) {
		$('[data-extcointitle]').text(coin);
		$('[data-extcointitle='+coin+']');
	});
	KMDWalletDashboard.init(); // Initiate Komodo Dashboard sript
	RunKMDInitFunctions();
	removeJumblrStyle();
	removeACPAXWalletStyle();
	//removeZECWalletStyle();
	//applyKMDWalletStyle();
	applyACPAXWalletStyle()
	CommonSidebarActionsSet02();
	removeDashboardStyle();

	switch (coin) {
	case 'SUPERNET':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'REVS':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'WIRELESS':
		$('.header-easydex-section').html('<img src="assets/images/native/wireless_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/wireless_transparent_header_bg.png")');
		break;
	case 'PANGEA':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'DEX':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'JUMBLR':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'BET':
		$('.header-easydex-section').html('<img src="assets/images/native/wireless_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/wireless_transparent_header_bg.png")');
		break;
	case 'CRYPTO':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'HODL':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'SHARK':
		$('.header-easydex-section').html('<img src="assets/images/native/wireless_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/wireless_transparent_header_bg.png")');
		break;
	case 'BOTS':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'MGW':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'MVP':
		$('.header-easydex-section').html('<img src="assets/images/native/mvp_header_title_logo.png">');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/mvp_transparent_header_bg.png")');
		break;
	case 'KV':
		$('.header-easydex-section').html('<img src="assets/images/native/supernet_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
		break;
	case 'CEAL':
		$('.header-easydex-section').html('<img src="assets/images/native/ceal_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/ceal_transparent_header_bg.png")');
		break;
	case 'MESH':
		$('.header-easydex-section').html('<img src="assets/images/native/mesh_header_title_logo.png">');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/mesh_transparent_header_bg.png")');
		break;

	case 'USD':
		$('.header-easydex-section').html('<img src="assets/images/native/usd_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">US Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/usd_transparent_header_bg.png")');
		break;
	case 'RON':
		$('.header-easydex-section').html('<img src="assets/images/native/ron_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Romanian Leu</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/ron_transparent_header_bg.png")');
		break;
	case 'EUR':
		$('.header-easydex-section').html('<img src="assets/images/native/eur_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Euro</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/eur_transparent_header_bg.png")');
		break;
	case 'JPY':
		$('.header-easydex-section').html('<img src="assets/images/native/jpy_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Japanese Yen</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jpy_transparent_header_bg.png")');
		break;
	case 'GBP':
		$('.header-easydex-section').html('<img src="assets/images/native/gbp_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">British Pound</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/gbp_transparent_header_bg.png")');
		break;
	case 'AUD':
		$('.header-easydex-section').html('<img src="assets/images/native/aud_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Australian Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/aud_transparent_header_bg.png")');
		break;
	case 'CAD':
		$('.header-easydex-section').html('<img src="assets/images/native/cad_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Canadian Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/cad_transparent_header_bg.png")');
		break;
	case 'CHF':
		$('.header-easydex-section').html('<img src="assets/images/native/chf_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Swiss Franc</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/chf_transparent_header_bg.png")');
		break;
	case 'NZD':
		$('.header-easydex-section').html('<img src="assets/images/native/nzd_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">New Zealand Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/nzd_transparent_header_bg.png")');
		break;
	case 'CNY':
		$('.header-easydex-section').html('<img src="assets/images/native/cny_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Chinese Yuan</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/cny_transparent_header_bg.png")');
		break;
	case 'RUB':
		$('.header-easydex-section').html('<img src="assets/images/native/rub_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Russian Ruble</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/rub_transparent_header_bg.png")');
		break;
	case 'MXN':
		$('.header-easydex-section').html('<img src="assets/images/native/mxn_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Mexican peso</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/mxn_transparent_header_bg.png")');
		break;
	case 'BRL':
		$('.header-easydex-section').html('<img src="assets/images/native/brl_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Brazilian Real</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/brl_transparent_header_bg.png")');
		break;
	case 'INR':
		$('.header-easydex-section').html('<img src="assets/images/native/inr_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Indian Rupee</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/inr_transparent_header_bg.png")');
		break;
	case 'HKD':
		$('.header-easydex-section').html('<img src="assets/images/native/hkd_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Hong Kong Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/hkd_transparent_header_bg.png")');
		break;
	case 'TRY':
		$('.header-easydex-section').html('<img src="assets/images/native/try_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Turkish Lira</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/try_transparent_header_bg.png")');
		break;
	case 'ZAR':
		$('.header-easydex-section').html('<img src="assets/images/native/zar_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">South African Rand</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/zar_transparent_header_bg.png")');
		break;
	case 'PLN':
		$('.header-easydex-section').html('<img src="assets/images/native/pln_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Polish Zloty</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/pln_transparent_header_bg.png")');
		break;
	case 'NOK':
		$('.header-easydex-section').html('<img src="assets/images/native/nok_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Norwegian Krone</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/nok_transparent_header_bg.png")');
		break;
	case 'SEK':
		$('.header-easydex-section').html('<img src="assets/images/native/sek_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Swedish Krona</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/sek_transparent_header_bg.png")');
		break;
	case 'DKK':
		$('.header-easydex-section').html('<img src="assets/images/native/dkk_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Danish Krone</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/dkk_transparent_header_bg.png")');
		break;
	case 'CZK':
		$('.header-easydex-section').html('<img src="assets/images/native/czk_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Czech Koruna</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/czk_transparent_header_bg.png")');
		break;
	case 'HUF':
		$('.header-easydex-section').html('<img src="assets/images/native/huf_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Hungarian Forint</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/huf_transparent_header_bg.png")');
		break;
	case 'ILS':
		$('.header-easydex-section').html('<img src="assets/images/native/ils_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Israeli Shekel</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/ils_transparent_header_bg.png")');
		break;
	case 'KRW':
		$('.header-easydex-section').html('<img src="assets/images/native/krw_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Korean Won</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/krw_transparent_header_bg.png")');
		break;
	case 'MYR':
		$('.header-easydex-section').html('<img src="assets/images/native/myr_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Malaysian Ringgit</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/myr_transparent_header_bg.png")');
		break;
	case 'PHP':
		$('.header-easydex-section').html('<img src="assets/images/native/php_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Philippine Peso</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/php_transparent_header_bg.png")');
		break;
	case 'SGD':
		$('.header-easydex-section').html('<img src="assets/images/native/sgd_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Singapore Dollar</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/sgd_transparent_header_bg.png")');
		break;
	case 'THB':
		$('.header-easydex-section').html('<img src="assets/images/native/thb_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Thai Baht</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/thb_transparent_header_bg.png")');
		break;
	case 'BGN':
		$('.header-easydex-section').html('<img src="assets/images/native/bgn_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Bulgarian Lev</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/bgn_transparent_header_bg.png")');
		break;
	case 'IDR':
		$('.header-easydex-section').html('<img src="assets/images/native/idr_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Indonesian Rupiah</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/idr_transparent_header_bg.png")');
		break;
	case 'HRK':
		$('.header-easydex-section').html('<img src="assets/images/native/hrk_header_title_logo.png"> <span style="font-size: 35px; vertical-align:middle;">Croatian Kuna</span>');
		$('#easydex-header-div').css('background-image', 'url("assets/images/bg/hrk_transparent_header_bg.png")');
		break;
	default:
		$('.header-easydex-section').html('<span style="font-size: 35px; vertical-align:middle;">'+ coin + '</span>');
    }
}

// END ASSETCHAINS AND PAXCHAINS SIDE MENU

function CommonSidebarActionsSet01() {
	sessionStorage.setItem('DashboardActions', 'start');
	sessionStorage.setItem('NativeWalletActions', 'stop');
	// $(document).ready(function() { Dashboard.init(); });
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet011() {
	sessionStorage.setItem('DashboardActions', 'start');
	sessionStorage.setItem('NativeWalletActions', 'stop');
	// location.reload();
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet02() {
	sessionStorage.setItem('DashboardActions', 'stop');
	$("#wifkeys_passphrase").val('');
	$('#wif-priv-keys').html('');
}

function applyKMDWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/native/kmd_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/kmd_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').show();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
	getTotalKMDBalance();
}

function removeKMDWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyZECWalletStyle() {
	$('.header-easydex-section').html('<img src="assets/images/native/zec_header_title_logo.png">');
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/zec_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').show();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
	getTotalKMDBalance();
}

function removeZECWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyJumblrStyle() {
	$('.header-easydex-section').html('<img src="assets/images/native/jumblr_header_title_logo.png"><br>' + _lang[defaultLang].SIDEBAR.JUMBLR_MOTTO);
	$('.page-title').hide();
	$('#easydex-header-div').css('background-image', 'url("assets/images/bg/jumblr_transparent_header_bg.png")');
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').show();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
}

function removeJumblrStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyACPAXWalletStyle() {
	$('.page-title').hide();
	$('#easydex-header-div').css('background-repeat', 'no-repeat');
	$('#easydex-header-div').css('background-position', '0%');
	$('#easydex_acpax_wallet_actions_header').show();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'start');
	getTotalKMDBalance();
}

function removeACPAXWalletStyle() {
	$('.page-title').show();
	$('#easydex-header-div').removeAttr( 'style' );
	$('#easydex_acpax_wallet_actions_header').hide();
	$('#easydex_kmd_wallet_actions_header').hide();
	$('#easydex_zec_wallet_actions_header').hide();
	$('#jumblr_actions_header').hide();
	$('#easydex_btc_btcd_balances_header').hide();
	sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyDashboardStyle() {
	$('.page-aside').show();
	$('.page-main').show();
	/* set default map height */
	var navbarH = $('.site-navbar').outerHeight(),
			footerH = $('.site-footer').outerHeight(),
			mapH = $(window).height() - navbarH - footerH;
	$('.page-main').outerHeight(mapH);
	$('#easydex-header-div').hide();
	var active_edexcoinmodecode = sessionStorage.getItem('edexTmpMode');
	console.log(active_edexcoinmodecode);
	if (active_edexcoinmodecode == 'Basilisk') {
		$('#edex-footer').hide();
	} else {
		$('#edex-footer').show();
	}

	setTimeout(function() {
		var active_edexcoin = $('[data-edexcoin]').attr('data-edexcoin');
		console.log(active_edexcoin)
		if (active_edexcoin == 'COIN') {
			var basiliskCoins = $('.page-aside .wallet-widgets-list .list-group .list-group-item .widget-content[data-edexcoinmodecode="Basilisk"] a');
			if (basiliskCoins && basiliskCoins.length) {
				$('.page-aside .wallet-widgets-list .list-group .list-group-item .widget-content[data-edexcoinmodecode="Basilisk"] a')[0].click();
			} else {
				$('.page-aside .wallet-widgets-list .list-group .list-group-item .widget-content[data-edexcoinmodecode="Full"] a')[0].click();
			}
		}
	}, 1000);
}

function removeDashboardStyle() {
	$('.page-aside').hide();
	$(".page-main").hide();
	$('#easydex-header-div').show();
	$('#edex-footer').hide();
}