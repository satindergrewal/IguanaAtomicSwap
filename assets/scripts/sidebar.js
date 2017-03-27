// DOM Ready =============================================================
$(document).ready(function() {
  $('#section-dashboard').show();
  $(
    '#section-easydex,' +
    '#section-jumblr,' +
    '#section-extcoin,' +
    '#section-zcash,' +
    '#section-iguana-atomic-explorer,' +
    '#section-iguana-wallet-settings,' +
    '#section-about-iguana'
    )
    .hide();
  $('#nav-dashboard')
    .removeClass( '' )
    .addClass( 'active open' );
  $(
    '#nav-easydex,' +
    '#nav-jumblr,' +
    '#nav-komodo-wallet,' +
    '#nav-zcash-wallet,' +
    '#nav-iguana-atomic-explorer,' +
    '#nav-iguana-wallet-settings,' +
    '#nav-about-iguana'
    )
    .removeClass( 'active open' )
    .addClass( '' );
  $('.header-easydex-section').text(_lang[defaultLang].INDEX.DASHBOARD);

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
  $(
    '#section-easydex,' +
    '#section-jumblr,' +
    '#section-extcoin,' +
    '#section-zcash,' +
    '#section-iguana-atomic-explorer,' +
    '#section-iguana-wallet-settings,' +
    '#section-about-iguana'
    )
    .hide();
  $('#nav-dashboard')
    .removeClass( '' )
    .addClass( 'active open' );
  $(
    '#nav-easydex,' +
    '#nav-jumblr,' +
    '#nav-komodo-wallet,' +
    '#nav-zcash-wallet,' +
    '#nav-iguana-atomic-explorer,' +
    '#nav-iguana-wallet-settings,' +
    '#nav-about-iguana'
    )
    .removeClass( 'active open' )
    .addClass( '' );
  $('.header-easydex-section').text(_lang[defaultLang].INDEX.DASHBOARD);

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
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-jumblr,' +
  	'#section-extcoin,' +
  	'#section-zcash,' +
  	'#section-about-iguana,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  $('#section-easydex').show();
  $('#nav-easydex')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $(
  	'#nav-dashboard,' +
  	'#nav-komodo-wallet,' +
  	'#nav-zcash-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings,' +
  	'#nav-about-iguana'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('.page-header-bordered h1').text('EasyDEX');
  $('.header-easydex-section').text(_lang[defaultLang].SIDEBAR.EDEX_MOTTO);

  $.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
  $(this.parentElement).addClass('active');
  removeKMDWalletStyle();
  removeZECWalletStyle();
  removeJumblrStyle();
  removeACPAXWalletStyle();
  CommonSidebarActionsSet02();
  removeDashboardStyle();
});

$('#nav-jumblr').on('click', function() {
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-extcoin,' +
  	'#section-zcash,' +
  	'#section-about-iguana,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  $('#section-jumblr').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-komodo-wallet,' +
  	'#nav-zcash-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings,' +
  	'#nav-about-iguana'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('#nav-jumblr')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $('.page-header-bordered h1').text('Jumblr')
  //$(".header-easydex-section").text('Secure, Native and Decentralised Coin Shuffling');

  $.each($('.nav-top-menu'), function(index, value) { $(value).removeClass('active'); });
  $(this.parentElement).addClass('active');
  removeKMDWalletStyle();
  removeZECWalletStyle();
  removeACPAXWalletStyle();
  CommonSidebarActionsSet02();
  removeDashboardStyle();
  applyJumblrStyle()
});

$('#nav-komodo-wallet').on('click', function() {
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-zcash,' +
  	'#section-about-iguana,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  $('#section-extcoin').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-zcash-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings,' +
  	'#nav-about-iguana'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('#nav-komodo-wallet')
  	.removeClass( '' )
  	.addClass( 'active open' );

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
    template: templates.nprogressBar
  });
  NProgress.start();
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-extcoin,' +
  	'#section-about-iguana,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  // $('#section-zcash').show();
  $('#section-extcoin').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-komodo-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings,' +
  	'#nav-about-iguana'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('#nav-zcash-wallet')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $('.header-easydex-section').text(_lang[defaultLang].INDEX.ZC_WALLET);

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
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-extcoin,' +
  	'#section-zcash,' +
  	'#section-iguana-wallet-settings,' +
  	'#section-about-iguana'
  )
  .hide();
  $('#section-iguana-atomic-explorer').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-komodo-wallet,' +
  	'#nav-zcash-wallet,' +
  	'#nav-about-iguana,' +
  	'#nav-iguana-wallet-settings'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('#nav-iguana-atomic-explorer')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $('.header-easydex-section').text('Atomic Explorer');

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
  $(
  	'#section-dashboard,' +
  	'#header-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-extcoin,' +
  	'#section-zcash,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-about-iguana'
  )
  .hide();
  $('#section-iguana-wallet-settings').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-komodo-wallet,' +
  	'#nav-zcash-wallet,' +
  	'#nav-about-iguana,' +
  	'#nav-iguana-atomic-explorer'
  )
  .removeClass( 'active open' ).addClass( '' );
  $('#nav-iguana-wallet-settings')
  	.removeClass( '' )
  	.addClass( 'active open' );
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
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-extcoin,' +
  	'#section-zcash,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  $('#section-about-iguana').show();
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-komodo-wallet,' +
  	'#nav-zcash-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings'
  )
  .removeClass( 'active open' )
  .addClass( '' );
  $('#nav-about-iguana')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $('.header-easydex-section').text('About Iguana');
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
  $(
  	'#header-dashboard,' +
  	'#section-dashboard,' +
  	'#section-easydex,' +
  	'#section-jumblr,' +
  	'#section-zcash,' +
  	'#section-about-iguana,' +
  	'#section-iguana-atomic-explorer,' +
  	'#section-iguana-wallet-settings'
  )
  .hide();
  $('#section-extcoin').show();
  $('#nav-komodo-wallet')
  	.removeClass( '' )
  	.addClass( 'active open' );
  $(
  	'#nav-dashboard,' +
  	'#nav-easydex,' +
  	'#nav-jumblr,' +
  	'#nav-zcash-wallet,' +
  	'#nav-iguana-atomic-explorer,' +
  	'#nav-iguana-wallet-settings,' +
  	'#nav-about-iguana'
  )
  .removeClass( 'active open' )
  .addClass( '' );

  $.each($('[data-extcoin]'), function(index, value) {
    $('[data-extcoin]').attr('data-extcoin', coin);
    $('[data-extcoin=' + coin + ']');
  });
  $.each($('[data-extcoinname]'), function(index, value) {
    $('[data-extcoinname]').text(coin);
    $('[data-extcoinname=' + coin + ']');
  });
  $.each($('[data-extcointitle]'), function(index, value) {
    $('[data-extcointitle]').text(coin);
    $('[data-extcointitle=' + coin + ']');
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

  function renderAssetGFX(imgSrcName, imgBgName, _coin) {
    $('.header-easydex-section')
      .html('<img src="assets/images/native/' + imgSrcName + '_header_title_logo.png"> <span style="font-size: 35px; vertical-align: middle">' + _coin + '</span>');
    $('#easydex-header-div').css('background-image', 'url("assets/images/bg/' + imgBgName + '_transparent_header_bg.png")');
  }

	switch (coin) {
    case 'SUPERNET':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'REVS':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'WLC':
      renderAssetGFX('wireless', 'wireless', 'Wireless (WLC)');
      break;
    case 'PANGEA':
      renderAssetGFX('pangea', 'jumblr', coin);
      break;
    case 'DEX':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'JUMBLR':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'BET':
      renderAssetGFX('bet', 'bet', coin);
      break;
    case 'CRYPTO':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'HODL':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'SHARK':
      renderAssetGFX('shark', 'shark', coin);
      break;
    case 'BOTS':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'MGW':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'MVP':
      renderAssetGFX('mvp', 'mvp', coin);
      break;
    case 'KV':
      renderAssetGFX('supernet', 'jumblr', coin);
      break;
    case 'CEAL':
      renderAssetGFX('ceal', 'ceal', coin);
      break;
    case 'MESH':
      renderAssetGFX('mesh', 'mesh', 'SuperMesh (MESH)');
      break;
    case 'BTC':
      renderAssetGFX('btc', 'btc', '(BTC)');
      break;
    case 'USD':
      renderAssetGFX('usd', 'usd', 'US Dollar (USD)');
      break;
    case 'RON':
      renderAssetGFX('ron', 'ron', 'Romanian Leu (RON)');
      break;
		case 'EUR':
      renderAssetGFX('eur', 'eur', 'Euro (EUR)');
			break;
		case 'JPY':
      renderAssetGFX('jpy', 'jpy', 'Japanese Yen (JPY)');
			break;
		case 'GBP':
      renderAssetGFX('gbp', 'gbp', 'British Pound (GBP)');
			break;
		case 'AUD':
      renderAssetGFX('aud', 'aud', 'Australian Dollar (AUD)');
			break;
		case 'CAD':
      renderAssetGFX('cad', 'cad', 'Canadian Dollar (CAD)');
			break;
		case 'CHF':
      renderAssetGFX('chf', 'chf', 'Swiss Franc (CHF)');
			break;
		case 'NZD':
      renderAssetGFX('nzd', 'nzd', 'New Zealand Dollar (NZD)');
			break;
		case 'CNY':
      renderAssetGFX('cny', 'cny', 'Chinese Yuan (CNY)');
			break;
		case 'RUB':
      renderAssetGFX('rub', 'rub', 'Russian Ruble (RUB)');
			break;
		case 'MXN':
      renderAssetGFX('mxn', 'mxn', 'Mexican Peso (MXN)');
			break;
		case 'BRL':
      renderAssetGFX('brl', 'brl', 'Brazilian Real (BRL)');
			break;
		case 'INR':
      renderAssetGFX('inr', 'inr', 'Indian Rupee (INR)');
			break;
		case 'HKD':
      renderAssetGFX('hkd', 'hkd', 'Hong Kong Dollar (HKD)');
			break;
		case 'TRY':
      renderAssetGFX('try', 'try', 'Turkish Lira (TRY)');
			break;
		case 'ZAR':
      renderAssetGFX('zar', 'zar', 'South African Rand (ZAR)');
			break;
		case 'PLN':
      renderAssetGFX('pln', 'pln', 'Polish Zloty (PLN)');
			break;
		case 'NOK':
      renderAssetGFX('nok', 'nok', 'Norwegian Krone (NOK)');
			break;
		case 'SEK':
      renderAssetGFX('sek', 'sek', 'Swedish Krona (SEK)');
			break;
		case 'DKK':
      renderAssetGFX('dkk', 'dkk', 'Danish Krone (DKK)');
			break;
		case 'CZK':
      renderAssetGFX('czk', 'czk', 'Czech Koruna (CZK)');
			break;
		case 'HUF':
      renderAssetGFX('huf', 'huf', 'Hungarian Forint (HUF)');
			break;
		case 'ILS':
      renderAssetGFX('ils', 'ils', 'Israeli Shekel (ILS)');
			break;
		case 'KRW':
      renderAssetGFX('krw', 'krw', 'Korean Won (KRW)');
			break;
		case 'MYR':
      renderAssetGFX('myr', 'myr', 'Malaysian Ringgit (MYR)');
			break;
		case 'PHP':
      renderAssetGFX('php', 'php', 'Philippine Peso (PHP)');
			break;
		case 'SGD':
      renderAssetGFX('sgd', 'sgd', 'Singapore Dollar (SGD)');
			break;
		case 'THB':
      renderAssetGFX('thb', 'thb', 'Thai Baht (THB)');
			break;
		case 'BGN':
      renderAssetGFX('bgn', 'bgn', 'Bulgarian Lev (BGN)');
			break;
		case 'IDR':
      renderAssetGFX('idr', 'idr', 'Indonesian Rupiah (IDR)');
			break;
		case 'HRK':
      renderAssetGFX('hrk', 'hrk', 'Croatian Kuna (HRK)');
			break;
    default:
    	$('.header-easydex-section').html('<span style="font-size: 35px; vertical-align: middle">' + coin + '</span>');
    	break;
  }
}

// END ASSETCHAINS AND PAXCHAINS SIDE MENU

function CommonSidebarActionsSet01() {
  sessionStorage.setItem('DashboardActions', 'start');
  sessionStorage.setItem('NativeWalletActions', 'stop');
  // $(document).ready(function() { Dashboard.init(); });
  $('#wifkeys_passphrase').val('');
  $('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet011() {
  sessionStorage.setItem('DashboardActions', 'start');
  sessionStorage.setItem('NativeWalletActions', 'stop');
  // location.reload();
  $('#wifkeys_passphrase').val('');
  $('#wif-priv-keys').html('');
}

function CommonSidebarActionsSet02() {
  sessionStorage.setItem('DashboardActions', 'stop');
  $('#wifkeys_passphrase').val('');
  $('#wif-priv-keys').html('');
}

function applyKMDWalletStyle() {
  $('.header-easydex-section').html('<img src="assets/images/native/kmd_header_title_logo.png">');
  $('.page-title').hide();
  $('#easydex-header-div').css({
  	'background-image': 'url("assets/images/bg/kmd_transparent_header_bg.png")',
  	'background-repeat': 'no-repeat',
  	'background-position': '0%'
  });
  $('#easydex_kmd_wallet_actions_header').show();
  $(
  	'#easydex_acpax_wallet_actions_header,' +
  	'#easydex_zec_wallet_actions_header,' +
  	'#jumblr_actions_header,' +
  	'#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'start');
  getTotalKMDBalance();
}

function removeKMDWalletStyle() {
  $('.page-title').show();
  $('#easydex-header-div').removeAttr( 'style' );
  $(
  	'#easydex_acpax_wallet_actions_header,' +
  	'#easydex_kmd_wallet_actions_header,' +
  	'#easydex_zec_wallet_actions_header,' +
  	'#jumblr_actions_header,' +
  	'#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyZECWalletStyle() {
  $('.header-easydex-section').html('<img src="assets/images/native/zec_header_title_logo.png">');
  $('.page-title').hide();
  $('#easydex-header-div').css({
    'background-image': 'url("assets/images/bg/zec_transparent_header_bg.png")',
    'background-repeat': 'no-repeat',
    'background-position': '0%'
  });
  $('#easydex_zec_wallet_actions_header').show();
  $(
    '#easydex_acpax_wallet_actions_header,' +
    '#easydex_kmd_wallet_actions_header,' +
    '#jumblr_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'start');
  getTotalKMDBalance();
}

function removeZECWalletStyle() {
  $('.page-title').show();
  $('#easydex-header-div').removeAttr( 'style' );
  $(
    '#easydex_acpax_wallet_actions_header,' +
    '#easydex_kmd_wallet_actions_header,' +
    '#easydex_zec_wallet_actions_header,' +
    '#jumblr_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyJumblrStyle() {
  $('.header-easydex-section').html('<img src="assets/images/native/jumblr_header_title_logo.png"><br>' + _lang[defaultLang].SIDEBAR.JUMBLR_MOTTO);
  $('.page-title').hide();
  $('#easydex-header-div').css({
    'background-image': 'url("assets/images/bg/jumblr_transparent_header_bg.png")',
    'background-repeat': 'no-repeat',
    'background-position': '0%'
  });
  $(
    '#easydex_acpax_wallet_actions_header,' +
    '#easydex_kmd_wallet_actions_header,' +
    '#easydex_zec_wallet_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  $('#jumblr_actions_header').show();
  sessionStorage.setItem('NativeWalletActions', 'start');
}

function removeJumblrStyle() {
  $('.page-title').show();
  $('#easydex-header-div').removeAttr( 'style' );
  $(
    '#easydex_acpax_wallet_actions_header,' +
    '#easydex_kmd_wallet_actions_header,' +
    '#jumblr_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyACPAXWalletStyle() {
  $('.page-title').hide();
  $('#easydex-header-div').css({
    'background-repeat': 'no-repeat',
    'background-position': '0%'
  });
  $('#easydex_acpax_wallet_actions_header').show();
  $(
    '#easydex_kmd_wallet_actions_header,' +
    '#easydex_zec_wallet_actions_header,' +
    '#jumblr_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'start');
  getTotalKMDBalance();
}

function removeACPAXWalletStyle() {
  $('.page-title').show();
  $('#easydex-header-div').removeAttr( 'style' );
  $(
    '#easydex_acpax_wallet_actions_header,' +
    '#easydex_kmd_wallet_actions_header,' +
    '#easydex_zec_wallet_actions_header,' +
    '#jumblr_actions_header,' +
    '#easydex_btc_btcd_balances_header'
  )
  .hide();
  sessionStorage.setItem('NativeWalletActions', 'stop');
}

function applyDashboardStyle() {
  $(
    '.page-aside,' +
    '.page-main'
  )
  .show();
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
    console.log(active_edexcoin);

    if (active_edexcoin == 'COIN') {
      var basiliskCoins = $('.page-aside .wallet-widgets-list .list-group .list-group-item .widget-content[data-edexcoinmodecode="Basilisk"] a');

      if (basiliskCoins && basiliskCoins.length) {
        basiliskCoins[0].click();
      } else {
      	var fullCoins = $('.page-aside .wallet-widgets-list .list-group .list-group-item .widget-content[data-edexcoinmodecode="Full"] a');

      	if (fullCoins && fullCoins.length) {
      		fullCoins[0].click();
      	}
      }
    }
  }, 1000);
}

function removeDashboardStyle() {
  $(
    '.page-aside,' +
    '.page-main'
  )
  .hide();
  $('#easydex-header-div').show();
  $('#edex-footer').hide();
}