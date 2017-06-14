templates.navBar =
`
<nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided"
    data-toggle="menubar">
      <span class="sr-only" data-lang="INDEX.TOGGLE_NAV"></span>
      <span class="hamburger-bar"></span>
    </button>
    <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-collapse"
    data-toggle="collapse">
      <i class="icon md-more" aria-hidden="true"></i>
    </button>
    <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
      <img class="navbar-brand-logo hidden-xs" src="assets/images/easydex-logo-dashboard.png" title="SuperNET Igauana">
      <img class="navbar-brand-logo hidden-md hidden-sm hidden-lg" src="assets/images/easydex-logo-dashboard-white.png" title="SuperNET Igauana white">
      <span class="navbar-brand-text hidden-xs"></span>
    </div>
    <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-search"
    data-toggle="collapse">
      <span class="sr-only" data-lang="INDEX.TOGGLE_SEARCH"></span>
      <i class="icon md-search" aria-hidden="true"></i>
    </button>
  </div>
  <div class="navbar-container container-fluid">
    <!-- Navbar Collapse -->
    <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
      <!-- Navbar Toolbar -->
      <ul class="nav navbar-toolbar">
        <li class="hidden-float" id="toggleMenubar" style="display: none">
          <a data-toggle="menubar" href="#" role="button">
            <i class="icon hamburger hamburger-arrow-left">
              <span class="sr-only" data-lang="INDEX.TOGGLE_MENUBAR"></span>
              <span class="hamburger-bar"></span>
            </i>
          </a>
        </li>
        <li class="active nav-top-menu">
          <a href="javascript:void(0)" id="nav-dashboard">
            <i class="site-menu-icon" aria-hidden="true"></i> <span data-lang="INDEX.WALLETS"></span>
          </a>
        </li>
        <li class="nav-top-menu">
          <a href="javascript:void(0)" id="nav-easydex">
            <i class="site-menu-icon" aria-hidden="true"></i> EasyDEX
          </a>
        </li>
        <li class="nav-top-menu">
          <a href="javascript:void(0)" id="nav-jumblr">
            <i class="site-menu-icon" aria-hidden="true"></i> Jumblr
          </a>
        </li>
        <!--<li class="nav-top-menu"><a href="javascript:void(0)" id="nav-assetchains"><i class="site-menu-icon" aria-hidden="true"></i> Assetchains</a></li>
        <li class="nav-top-menu"><a href="javascript:void(0)" id="nav-pax"><i class="site-menu-icon" aria-hidden="true"></i> PAX</a></li>-->
        <li class="nav-top-menu"><a href="javascript:void(0)" id="nav-iguana-atomic-explorer">
          <i class="site-menu-icon" aria-hidden="true"></i> Atomic Explorer</a>
        </li>
      </ul>
      <!-- End Navbar Toolbar -->
      <!-- Navbar Toolbar Right -->
      <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
        <li role="presentation">
          <a href="javascript:void(0)" role="menuitem" data-edexcoinmenu="COIN" id="btn_edexcoin_addcoin" data-target="#AddCoinDilogModel" data-toggle="modal" style="padding-bottom: 10px; padding-top: 16px">
            <span>
              <img src="assets/images/icons/activatecoin.png" alt="Add Coin">
            </span>
          </a>
        </li>
        <li class="dropdown">
          <a class="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"
          data-animation="scale-up" role="button">
            <span class="avatar avatar-online">
              <img src="assets/images/iguana_profile_02.jpg" alt="iguana profile pic">
              <i></i>
            </span>
          </a>
          <ul class="dropdown-menu" role="menu">
            <li role="presentation">
              <a href="javascript:void(0)" role="menuitem" id="nav-iguana-wallet-settings">
                <i class="icon md-settings" aria-hidden="true"></i> <span data-lang="INDEX.SETTINGS"></span>
              </a>
            </li>
            <li role="presentation">
              <a href="javascript:void(0)" role="menuitem" id="nav-about-iguana">
                <i class="icon md-settings" aria-hidden="true"></i> <span data-lang="INDEX.ABOUT_IGUANA"></span>
              </a>
            </li>
            <li class="divider" role="presentation"></li>
            <li role="presentation">
              <a href="javascript:void(0)" role="menuitem" id="logout-account">
                <i class="icon md-power" aria-hidden="true"></i> <span data-lang="INDEX.LOGOUT"></span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <!-- End Navbar Toolbar Right -->
    </div>
    <!-- End Navbar Collapse -->
  </div>
</nav>
`;