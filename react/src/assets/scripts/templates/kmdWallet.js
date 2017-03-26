templates.kmdWallet =
`
<!-- BEGIN KOMODO WALLET CONTENT BODY -->
<div class="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out" style="margin-left: 0px">
  <div class="page-content" data-extcoin="COIN" id="section-extcoin">
    <div role="alert" class="alert alert-danger alert-dismissible" data-extcoin="COIN" id="extcoin-wallet-connection-alert" style="display: none">
      <button aria-label="Close" data-dismiss="alert" class="close" type="button">
        <span aria-hidden="true">×</span>
      </button>
      <h4 data-lang="INDEX.OOPS_ERROR"></h4>
      <p data-extcoin="COIN" id="extcoin-wallet-connection-alert-text">
        <span data-lang="INDEX.OOPS_ERROR_DESC"></span>
        <code>server=1</code><br/>
        <code>rpcport=</code><br/>
        <code>rpcuser=</code><br/>
        <code>rpcpassword=</code>
      </p>
      <!--<p class="margin-top-15"><button class="btn btn-success btn-inverse" type="button" id="extcoin-wallet-connection-alert-btn">Refresh Again</button></p>-->
    </div>

    <div role="alert" class="alert alert-info alert-dismissible" data-extcoin="COIN" id="extcoin-wallet-activating-alert" style="display: none">
      <button aria-label="Close" data-dismiss="alert" class="close" type="button">
        <span aria-hidden="true">×</span>
      </button>
      <h4>
        <span data-lang="INDEX.ACTIVATING_CHAIN"></span><span id="activating-komodod-tridot">...</span><span id="activating-komodod-progress"></span>
      </h4>
      <p data-extcoin="COIN" id="extcoin-wallet-connection-alert-text" data-lang="INDEX.KMD_STARTED"></p>
    </div>

    <div class="row" data-extcoin="COIN" style="margin: -20px 0px 10px 0px">
      <div class="col-xs-12" data-extcoin="COIN" id="extcoin-progressbars">
        <div class="progress">
          <div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 0%; font-size: 80%" role="progressbar" data-extcoin="COIN" id="extcoin-sync">
            <span data-extcoin="COIN" id="extcoin-sync-percent">-</span> | <span data-extcoin="COIN" id="extcoin-synced-blocks">-</span> / <span data-extcoin="COIN" id="extcoin-longestchain">-</span> | <span data-lang="INDEX.CONNECTIONS"></span>: <span data-extcoin="COIN" id="extcoin-connections">-</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row" data-extcoin="COIN" id="extcoin-wallet" data-plugin="masonry" style="display: none">
      <div class="col-xs-12">
        <div class="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_t">
          <!-- KMD Transparent Balance Widget-->
          <div class="widget widget-shadow" id="widgetLineareaOne">
            <div class="widget-content white bg-yellow-800">
              <div class="padding-20 padding-top-10">
                <div class="clearfix">
                  <div class="pull-left padding-vertical-10">
                    <i class="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.TRANSPARENT_BALANCE"></span>
                  </div>
                  <span class="pull-right padding-top-10" data-extcoin="COIN" id="kmd_transparent_balance" style="font-size: 22px">-</span>
                </div>
              </div>
            </div>
          </div>
          <!-- End KMD Transparent Balance Widget -->
        </div>
        <div class="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_z">
          <!-- KMD Private (Z) Balance Widget-->
          <div class="widget widget-shadow" id="widgetLineareaOne">
            <div class="widget-content white bg-blue-grey-800">
              <div class="padding-20 padding-top-10">
                <div class="clearfix">
                  <div class="pull-left padding-vertical-10">
                    <i class="icon fa-eye-slash font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.Z_BALANCE"></span>
                  </div>
                  <span class="pull-right padding-top-10" data-extcoin="COIN" id="kmd_private_balance" style="font-size: 22px">-</span>
                </div>
              </div>
            </div>
          </div>
          <!-- End KMD Private (Z) Balance Widget -->
        </div>
        <div class="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_i">
          <!-- KMD Total Interest Balance Widget-->
          <div class="widget widget-shadow" id="widgetLineareaOne">
            <div class="widget-content white bg-cyan-700">
              <div class="padding-20 padding-top-10">
                <div class="clearfix">
                  <div class="pull-left padding-vertical-10">
                    <i class="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.INTEREST_EARNED"></span>
                  </div>
                  <span class="pull-right padding-top-10" data-extcoin="COIN" id="kmd_total_interest_balance" style="font-size: 22px">-</span>
                </div>
              </div>
            </div>
          </div>
          <!-- End KMD Total Interest Balance Widget -->
        </div>
        <div class="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_tzi">
          <!-- KMD Total (Z+T) Balance Widget-->
          <div class="widget widget-shadow" id="widgetLineareaOne">
            <div class="widget-content white bg-green-600">
              <div class="padding-20 padding-top-10">
                <div class="clearfix">
                  <div class="pull-left padding-vertical-10">
                    <i class="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.ZT_BALANCE"></span>
                  </div>
                  <span class="pull-right padding-top-10" data-extcoin="COIN" id="kmd_total_tz_balance" style="font-size: 22px">-</span>
                </div>
              </div>
            </div>
          </div>
          <!-- End KMD Total (Z+T) Balance Widget -->
        </div>
      </div>

      <div data-extcoin="COIN" id="kmd_wallet_dashboardinfo">
        <div class="col-xs-12 margin-top-20">
          <!-- Iguana Wallet Settings Box Tab -->
          <div class="panel nav-tabs-horizontal">
            <!-- KMD Wallet Dashboard -->
            <div data-extcoin="COIN" id="kmd_wallet_dashoard_section">
              <div class="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                <!-- Panel FixedHeader -->
                <div class="panel">
                  <header class="panel-heading">
                    <h3 class="panel-title" data-lang="INDEX.TRANSACTION_HISTORY"></h3>
                  </header>
                  <div class="panel-body">
                    <!--<p>Transaction History info goes here...</p>-->
                    <table class="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-tx-history-tbl" width="100%">
                      <thead>
                        <tr>
                          <th data-lang="INDEX.TYPE"></th>
                          <th data-lang="INDEX.DIRECTION"></th>
                          <th data-lang="INDEX.CONFIRMATIONS"></th>
                          <th data-lang="INDEX.AMOUNT"></th>
                          <th data-lang="INDEX.TIME"></th>
                          <th data-lang="INDEX.DEST_ADDRESS"></th>
                          <th data-lang="INDEX.TX_DETAIL"></th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th data-lang="INDEX.TYPE"></th>
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

      <div data-extcoin="COIN" id="kmd_wallet_recieve">
        <div class="col-xs-12 margin-top-20">
          <!-- Komodo Wallet receive tab -->
          <div class="panel nav-tabs-horizontal">
            <!-- KMD Wallet Receive -->
            <div data-extcoin="COIN" id="kmd_wallet_recieve_section">
              <div class="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                <!-- Panel FixedHeader -->
                <div class="panel">
                  <header class="panel-heading">
                    <div class="panel-actions">
                      <div class="dropdown">
                        <a class="dropdown-toggle white btn btn-warning" data-extcoin="COIN" id="GetNewRecievingAddress" data-toggle="dropdown" href="javascript:void(0)"
                        aria-expanded="false" role="button">
                          <i class="icon md-arrows margin-right-10" aria-hidden="true"></i> <span data-lang="INDEX.GET_NEW_ADDRESS"></span> <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="GetNewRecievingAddress"
                        role="menu">
                          <li role="presentation">
                            <a href="javascript:void(0)" data-extcoin="COIN" id="kmd_get_new_taddr" role="menuitem">
                              <i class="icon fa-eye" aria-hidden="true"></i> <span data-lang="INDEX.TRANSPARENT_ADDRESS"></span>
                            </a>
                          </li>
                          <li data-extcoin="COIN" role="presentation">
                            <a href="javascript:void(0)" data-extcoin="COIN" id="kmd_get_new_zaddr" role="menuitem">
                              <i class="icon fa-eye-slash" aria-hidden="true"></i> <span data-lang="INDEX.PRIVATE_Z_ADDRESS"></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3 class="panel-title" data-lang="INDEX.RECEIVING_ADDRESS"></h3>
                  </header>
                  <div class="panel-body">
                    <!--<p>Receiving addresses info goes here...</p>-->
                    <table class="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-recieve-addr-tbl">
                      <thead>
                        <tr>
                          <th data-lang="INDEX.TYPE"></th>
                          <th data-lang="INDEX.ADDRESS"></th>
                          <!--<th>Actions</th>-->
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th data-lang="INDEX.TYPE"></th>
                          <th data-lang="INDEX.ADDRESS"></th>
                          <!--<th>Actions</th>-->
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <!-- End Panel FixedHeader -->
              </div>
            </div>
            <!-- End KMD Wallet Receive -->
          </div>
          <!-- End Komodo Wallet receive tab -->
        </div>
      </div>

      <div data-extcoin="COIN" id="kmd_wallet_send" style="display: none">
        <div class="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
          <!-- Panel getinfo -->
          <div class="panel" id="projects">
            <div class="panel-heading">
              <h3 data-extcoin="COIN" class="panel-title">
                <span data-lang="INDEX.SEND"></span> <span data-extcoinname="COIN"></span>
              </h3>
              <!--<div class="panel-actions">
                <a class="panel-action icon md-refresh-alt" data-toggle="panel-refresh" data-load-type="blue-only"
                data-load-callback="KMDSendScreenRefreshCallback" aria-hidden="true"></a>
              </div>-->
            </div>
            <div class="panel-body container-fluid">
              <form class="extcoin-send-form" data-extcoin="COIN" method="post" role="form" autocomplete="off" onsubmit="return false">
                <div class="row">
                  <div class="col-xlg-12 form-group form-material">
                    <label class="control-label" data-extcoin="COIN" for="kmd_wallet_send_from" data-lang="INDEX.SEND_FROM"></label>
                    <select class="form-control form-material showkmdwalletaddrs show-tick" data-extcoin="COIN" id="kmd_wallet_send_from" title="Select Transparent or Private Address" data-size="5"></select>
                  </div>
                  <div class="col-xlg-12 form-group form-material">
                    <label class="control-label" data-extcoin="COIN" for="kmd_wallet_sendto" data-lang="INDEX.SEND_TO"></label>
                    <input type="text" class="form-control" data-extcoin="COIN" id="kmd_wallet_sendto" name="kmd_wallet_sendto" placeholder="Enter Transparent or Private address" autocomplete="off" required />
                  </div>
                  <div class="col-lg-6 form-group form-material">
                    <label class="control-label" for="kmd_wallet_amount" data-extcoin="COIN" id="kmd_wallet_amount_label">
                      <span data-extcoinname="COIN"></span>
                    </label>
                    <input type="text" class="form-control" data-extcoin="COIN" id="kmd_wallet_amount" name="kmd_wallet_amount" placeholder="0.000" autocomplete="off" />
                  </div>
                  <div class="col-lg-6 form-group form-material">
                    <label class="control-label" data-extcoin="COIN" for="kmd_wallet_fee" data-lang="INDEX.FEE"></label>
                    <input type="text" class="form-control" data-extcoin="COIN" id="kmd_wallet_fee" name="kmd_wallet_fee" placeholder="0.000" value="0.0001" autocomplete="off" />
                  </div>
                  <div class="col-lg-12">
                    <span data-extcoin="KMD">
                      <b><span data-lang="INDEX.TOTAL"></span> (<span data-extcoinname="COIN"></span> - txfee):</b> <span data-extcoin="COIN" id="kmd_wallet_total_value">0.000</span> <span data-extcoin="COIN" id="kmd_wallet_total_coinname" data-extcoinname="COIN"></span>
                    </span>
                  </div>
                  <div class="col-lg-12">
                    <button type="submit" class="btn btn-primary waves-effect waves-light pull-right" data-toggle="modal" id="kmd_wallet_send_coins_btn">
                      <span data-lang="INDEX.SEND"></span> <span data-extcoinname="COIN"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- End Panel getinfo -->
        </div>
        <div class="col-xs-12">
          <!-- Komodo Wallet send opid status tab -->
          <div class="row">
            <div class="panel nav-tabs-horizontal">
              <!-- KMD opid status -->
              <div data-extcoin="COIN" id="kmd_wallet_opids_status_section">
                <div class="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                  <!-- Panel FixedHeader -->
                  <div class="panel">
                    <header class="panel-heading">
                      <div class="panel-actions">
                        <button class="btn btn-info btn-block" id="kmd_opids_status_btn" type="button">
                          <i class="icon fa-repeat" aria-hidden="true"></i> <span data-lang="INDEX.REFRESH"></span>
                        </button>
                      </div>
                      <h3 class="panel-title" data-lang="INDEX.OPERATIONS_STATUSES"></h3>
                    </header>
                    <div class="panel-body">
                      <!--<p>Receiving addresses info goes here...</p>-->
                      <table class="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-opid-status-tbl" width="100%">
                        <thead>
                          <tr>
                            <th data-lang="INDEX.STATUS"></th>
                            <th>ID</th>
                            <th data-lang="INDEX.TIME"></th>
                            <th data-lang="INDEX.RESULT"></th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th data-lang="INDEX.STATUS"></th>
                            <th>ID</th>
                            <th data-lang="INDEX.TIME"></th>
                            <th data-lang="INDEX.RESULT"></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <!-- End Panel FixedHeader -->
                </div>
              </div>
              <!-- End KMD opid status -->
            </div>
          </div>
          <!-- End Komodo Wallet send opid status tab -->
        </div>
      </div>

      <div data-extcoin="COIN" id="kmd_wallet_settings" style="display: none">
        <div class="col-xlg-6 col-md-4">
          <!-- Panel Wallet Info -->
          <div class="panel" id="projects">
            <div class="panel-heading">
              <h3 class="panel-title" data-lang="INDEX.WALLET_INFO"></h3>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td data-lang="INDEX.WALLET_VERSION"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_walletversion"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.BALANCE"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_balance"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.UNCONFIRMED_BALANCE"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_unconfirmed_balance"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.IMMATURE_BALANCE"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_immature_balance"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.TOTAL_TX_COUNT"></td>
                    <td>
                      <span data-extcoin="COIN" id="KMDTotalTransactionsCount"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- End Panel Wallet Info -->
        </div>
        <div class="col-xlg-6 col-md-8">
          <!-- Panel getinfo -->
          <div class="panel" id="projects">
            <div class="panel-heading">
              <h3 class="panel-title">
                <span data-extcointitle="COIN">Komodo</span> <span data-lang="INDEX.INFO"></span>
              </h3>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td data-lang="INDEX.VERSION"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_version"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.PROTOCOL_VERSION"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_protocolversion"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.NOTARIZED"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_notarized"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span data-lang="INDEX.NOTARIZED"></span> Hash
                    </td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_notarizedhash"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span data-lang="INDEX.NOTARIZED"></span> BTC
                    </td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_notarizedbtc"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.BLOCKS"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_blocks"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.CONNECTIONS"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_connections"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.DIFFICULTY"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_difficulty"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Testnet</td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_testnet"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.PAY_TX_FEE"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_paytxfee"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.RELAY_FEE"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_relayfee"></span>
                    </td>
                  </tr>
                  <tr>
                    <td data-lang="INDEX.ERRORS"></td>
                    <td>
                      <span data-extcoin="COIN" id="kmd_errors"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- End Panel getinfo -->
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade modal-3d-sign" data-extcoin="COIN" id="kmd_txid_info_mdl" aria-hidden="false" role="dialog"
    tabindex="-1">
      <div class="modal-dialog modal-center modal-lg">
        <div class="modal-content">
          <!--<div class="modal-header bg-orange-a400 wallet-send-header">
            <button type="button" class="close white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title white"><span class="icon fa-search" style="margin: 0"></span> Transaction ID <span id="mdl_txid_info_coin_name"></span></h4>
          </div>-->
          <div class="modal-body">
            <!-- Iguana Wallet Settings Box Tab -->
            <div class="panel nav-tabs-horizontal">
              <ul class="nav nav-tabs nav-tabs-line" data-plugin="nav-tabs" role="tablist">
                <li class="active" role="presentation">
                  <a data-toggle="tab" href="#KmdTxIDInfotab1" data-extcoin="COIN" aria-controls="KmdTxIDInfotab1" role="tab">
                    <i class="icon md-balance-wallet" aria-hidden="true"></i>TxID Info
                  </a>
                </li>
                <li role="presentation">
                  <a data-toggle="tab" href="#KmdTxIDInfotab2" data-extcoin="COIN" aria-controls="KmdTxIDInfotab2" role="tab">
                    <i class="icon md-plus-square" aria-hidden="true"></i>vjointsplits, details
                  </a>
                </li>
                <li role="presentation">
                  <a data-toggle="tab" href="#KmdTxIDInfotab3" data-extcoin="COIN" aria-controls="KmdTxIDInfotab3" role="tab">
                    <i class="icon wb-briefcase" aria-hidden="true"></i>hex
                  </a>
                </li>
              </ul>
              <div class="panel-body">
                <div class="tab-content">
                  <div class="tab-pane active" id="KmdTxIDInfotab1" data-extcoin="COIN" role="tabpanel">
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>amount</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_amount"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>fee</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_fee"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>confirmations</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_confirmations"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>blockhash</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_blockhash"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>blockindex</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_blockindex"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>blocktime</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_blocktime"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>txid</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_txid"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>walletconflicts</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_walletconflicts"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>time</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_time"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>timereceived</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_timereceived"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="tab-pane" id="KmdTxIDInfotab2" data-extcoin="COIN" role="tabpanel">
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td>vjoinsplit</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_vjoinsplit"></span>
                          </td>
                        </tr>
                        <tr>
                          <td>details</td>
                          <td>
                            <span data-extcoin="COIN" id="kmd_txid_info_details"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="tab-pane" id="KmdTxIDInfotab3" data-extcoin="COIN" role="tabpanel">
                    <textarea id="kmd_txid_info_hex" data-extcoin="COIN" style="width: 100%; height: 170px" rows="10" cols="80" disabled></textarea>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Iguana Wallet Settings Box Tab -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</div>
<!-- END KOMODO WALLET CONTENT BODY -->
`;