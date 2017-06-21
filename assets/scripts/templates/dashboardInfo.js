templates.dashboardInfo =
`
<div data-edexcoin="COIN" id="edexcoin_dashboardinfo" style="display: none">
  <div class="col-xs-12 margin-top-20">
    <!-- Iguana Wallet Settings Box Tab -->
    <div class="panel nav-tabs-horizontal">
      <!-- KMD Wallet Dashboard -->
      <div data-edexcoin="COIN" id="edexcoin_dashoard_section">
        <div class="col-xlg-12 col-lg-12 col-sm-12 col-xs-12 edexcoin_dashoard_section_main_div">
          <!-- Panel FixedHeader -->
          <div id="edexcoin_txhistory" class="panel">
            <header class="panel-heading" style="z-index: 10">
              <div class="panel-actions">
                <a href="javascript:void(0)" class="dropdown-toggle white btn-xs btn-info btn_refresh_edexcoin_dashboard" data-edexcoin="COIN" aria-expanded="false" role="button">
                  <i class="icon fa-refresh margin-right-10" aria-hidden="true"></i> <span data-lang="INDEX.REFRESH"></span>
                </a>
                <div class="dropdown">
                  <a class="dropdown-toggle btn-xs btn-default" data-edexcoin="COIN" id="btn_edexcoin_basilisk" data-toggle="dropdown" href="javascript:void(0)"
                  aria-expanded="false" role="button" style="display: none">
                    <i class="icon fa-magic margin-right-10" aria-hidden="true"></i> <span data-lang="INDEX.BASILISK_ACTIONS"></span> <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="btn_edexcoin_basilisk"
                  role="menu">
                    <li role="presentation">
                      <a href="javascript:void(0)" class="btn_edexcoin_dashboard_getnotaries" data-edexcoin="COIN" id="btn_edexcoin_dashboard_getnotaries" role="menuitem">
                        <i class="icon fa-sitemap" aria-hidden="true"></i> <span data-lang="INDEX.GET_NOTARY_NODES_LIST"></span>
                      </a>
                    </li>
                    <li role="presentation">
                      <a href="javascript:void(0)" class="btn_edexcoin_dashboard_refresh_basilisk_conn" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refresh_basilisk_conn" role="menuitem">
                        <i class="icon wb-refresh" aria-hidden="true"></i> <span data-lang="INDEX.REFRESH_BASILISK_CONNECTIONS"></span>
                      </a>
                    </li>
                    <li data-edexcoin="COIN" role="presentation">
                      <a href="javascript:void(0)" class="btn_edexcoin_dashboard_fetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_fetchdata" role="menuitem">
                        <i class="icon fa-cloud-download" aria-hidden="true"></i> <span data-lang="INDEX.FETCH_WALLET_DATA"></span>
                      </a>
                    </li>
                    <li data-edexcoin="COIN" role="presentation">
                      <a href="javascript:void(0)" class="btn_edexcoin_dashboard_refetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refetchdata" role="menuitem">
                        <i class="icon fa-cloud-download" aria-hidden="true"></i> <span data-lang="INDEX.REFETCH_WALLET_DATA"></span>
                      </a>
                    </li>
                    <!--<li data-edexcoin="COIN" role="presentation"><a href="javascript:void(0)" class="btn_edexcoin_dashboard_register" data-edexcoin="COIN" id="btn_edexcoin_dashboard_register" role="menuitem"><i class="icon fa-sign-in" aria-hidden="true"></i> Register All Wallet Address</a></li>-->
                    <!--<li data-edexcoin="COIN" role="presentation"><a href="javascript:void(0)" class="btn_edexcoin_dashboard_validate" data-edexcoin="COIN" id="btn_edexcoin_dashboard_validate" role="menuitem"><i class="icon fa-check" aria-hidden="true"></i> Validate Address on Network</a></li>-->
                  </ul>
                </div>
                <!--<a class="panel-action icon md-refresh-alt" data-toggle="panel-refresh" data-load-type="blue-only" data-load-callback="customRefreshCallback" aria-hidden="true"></a>
                <a class="panel-action icon md-minus" aria-expanded="true" data-toggle="panel-collapse" aria-hidden="true"></a>
                <a class="panel-action icon md-fullscreen" data-toggle="panel-fullscreen" aria-hidden="true"></a>-->
              </div>
              <h4 class="panel-title" data-lang="INDEX.TRANSACTION_HISTORY"></h4>
            </header>
            <div class="panel-body">
              <!--<p>Transaction History info goes here...</p>-->
              <table class="table table-hover dataTable table-striped" data-edexcoin="COIN" id="edex-tx-history-tbl" width="100%">
                <thead>
                  <tr>
                    <th data-lang="INDEX.DIRECTION"></th>
                    <th class="hidden-xs hidden-sm" data-lang="INDEX.CONFIRMATIONS"></th>
                    <th data-lang="INDEX.AMOUNT"></th>
                    <th data-lang="INDEX.TIME"></th>
                    <th data-lang="INDEX.DEST_ADDRESS"></th>
                    <th class="hidden-xs hidden-sm" data-lang="INDEX.TX_DETAIL"></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th data-lang="INDEX.DIRECTION"></th>
                    <th data-lang="INDEX.CONFIRMATIONS"></th>
                    <th data-lang="INDEX.AMOUNT"></th>
                    <th data-lang="INDEX.TIME"></th>
                    <th data-lang="INDEX.DEST_ADDRESS"></th>
                    <th data-lang="INDEX.TX_DETAIL"></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <!-- End Panel FixedHeader -->
        </div>
      </div>
      <!-- End KMD Wallet Dashboard -->
    </div>
    <!-- End Iguana Wallet Settings Box Tab -->
  </div>
</div>
`;