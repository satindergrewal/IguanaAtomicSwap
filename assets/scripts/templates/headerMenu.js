templates.headerMenu =
`
<!-- Header with background and menus -->
<div class="page-header page-header-bordered header-easydex margin-bottom-0" id="easydex-header-div">
  <h1 class="page-title">EasyDEX</h1>
  <ol class="breadcrumb">
    <li class="header-easydex-section" data-lang="INDEX.DASHBOARD"></li>
    <!--<li class="active">You are Here</li>-->
  </ol>
  <div class="page-header-actions" style="z-index: 1">
    <!-- KMD Wallet Header button -->
    <div id="kmd_header_button">
      <button type="button" id="easydex_kmd_wallet_actions_header" class="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light" data-toggle="dropdown" aria-expanded="false" style="display: none">
        <i class="icon md-plus" aria-hidden="true"></i>
      </button>
      <ul class="dropdown-menu animate dropdown-menu-right" aria-labelledby="easydex_kmd_wallet_actions_header" role="menu">
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_kmd_wallet_dashboard" data-lang="INDEX.DASHBOARD"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_kmd_wallet_send" data-lang="INDEX.SEND"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_kmd_wallet_recieve" data-lang="INDEX.RECEIVE"></a>
        </li>
        <!--<li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_kmd_wallet_transactions" data-lang="INDEX.TRANSACTIONS"></a>
        </li>-->
        <li class="divider" role="presentation"></li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_kmd_wallet_settings" data-lang="INDEX.SETTINGS"></a>
        </li>
      </ul>
    </div>
    <!-- End KMD Wallet Header button -->
    <!-- ZEC Wallet Header button -->
    <div id="zec_header_button">
      <button type="button" id="easydex_zec_wallet_actions_header" class="bg-yellow-600 btn btn-floating white waves-effect waves-float waves-light" data-toggle="dropdown" aria-expanded="false" style="display: none">
        <i class="icon md-plus" aria-hidden="true"></i>
      </button>
      <ul class="dropdown-menu animate dropdown-menu-right" aria-labelledby="easydex_zec_wallet_actions_header" role="menu">
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="ZEC" id="btn_zec_wallet_dashboard" data-lang="INDEX.DASHBOARD"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="ZEC" id="btn_zec_wallet_send" data-lang="INDEX.SEND"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="ZEC" id="btn_zec_wallet_recieve" data-lang="INDEX.RECEIVE"></a>
        </li>
        <!--<li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="ZEC" id="btn_zec_wallet_transactions" data-lang="INDEX.TRANSACTIONS"></a>
        </li>-->
        <li class="divider" role="presentation"></li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="ZEC" id="btn_zec_wallet_settings" data-lang="INDEX.SETTINGS"></a>
        </li>
      </ul>
    </div>
    <!-- End ZEC Wallet Header button -->
    <!-- Jumblr Header button -->
    <div id="kmd_header_button">
      <button type="button" id="jumblr_actions_header" class="btn white waves-effect waves-light" style="display: none">
        <i class="icon fa-refresh" aria-hidden="true"></i><span data-lang="INDEX.REFRESH"></span>
      </button>
    </div>
    <!-- End Jumblr Header button -->
    <!-- ASSETCHAINS/PAX Header button -->
    <div id="kmd_header_button">
      <button type="button" id="easydex_acpax_wallet_actions_header" class="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light" data-toggle="dropdown" aria-expanded="false" style="display: none">
        <i class="icon md-plus" aria-hidden="true"></i>
      </button>
      <ul class="dropdown-menu animate dropdown-menu-right" aria-labelledby="easydex_acpax_wallet_actions_header" role="menu">
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_acpax_wallet_dashboard" data-lang="INDEX.DASHBOARD"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_acpax_wallet_send" data-lang="INDEX.SEND"></a>
        </li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_acpax_wallet_recieve" data-lang="INDEX.RECEIVE"></a>
        </li>
        <!--<li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_acpax_wallet_transactions" data-lang="INDEX.TRANSACTIONS"></a>
        </li>-->
        <li class="divider" role="presentation"></li>
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-extcoin-menu="KMD" id="btn_acpax_wallet_settings" data-lang="INDEX.SETTINGS"></a>
        </li>
      </ul>
    </div>
    <!-- End ASSETCHAINS/PAX Header button -->
    <div class="row no-space width-350 hidden-xs" id="easydex_btc_btcd_balances_header" style="display: none">
      <div class="col-xs-6">
        <div class="counter">
          <span class="font-weight-medium" data-currency="BTC" id="header_coinname_balance"> - BTC</span>
          <span class="counter-label small" data-currency="BTC" id="header_coinfiatbalance"> - USD</span>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="counter">
          <span class="font-weight-medium" data-currency="BTCD" id="header_coinname_balance"> - BTCD</span>
          <span class="counter-label small" data-currency="BTCD" id="header_coinfiatbalance"> - USD</span>
        </div>
      </div>
      <!--<div class="col-xs-4">
        <div class="counter">
          <span class="font-weight-medium" data-currency="USD" id="header_fiatname">USD</span>
          <div class="counter-label small" data-currency="USD" id="header_fiattotalbalance">0</div>
        </div>
      </div>-->
    </div>
  </div>
</div>
<!-- End Header with background and menus -->
`;