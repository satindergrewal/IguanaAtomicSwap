templates.walletWidgetsSidebar =
`
<!-- Wallet Widgets Sidebar -->
<div class="page-aside">
  <div class="page-aside-switch">
    <i class="icon md-chevron-left" aria-hidden="true"></i>
    <i class="icon md-chevron-right" aria-hidden="true"></i>
  </div>
  <div class="page-aside-inner">
    <!-- Search Panel -->
    <div class="search-wallet-widgets panel" style="display: none">
      <div class="panel-heading">
        <div class="panel-actions">
          <div class="input-search input-group-sm">
            <button type="submit" class="input-search-btn">
              <i class="icon md-search" aria-hidden="true"></i>
            </button>
            <input type="text" class="form-control" name="" placeholder="Search..." disabled>
          </div>
        </div>
        <h3 class="panel-title" data-lang="INDEX.ACTIVE_COINS"></h3>
      </div>
    </div>
    <!-- End Search Panel -->
    <!-- Wallet Widgets List -->
    <div class="wallet-widgets-list" data-plugin="pageAsideScroll">
      <!--<div class="wallet-widgets-list">-->
      <div data-role="container">
        <div data-role="content">
          <div class="list-group row wallet-widgets-row">

          </div>
        </div>
      </div>
    </div>
    <!-- End Wallet Widgets List -->
  </div>
</div>
<!-- End Wallet Widgets Sidebar -->
`;