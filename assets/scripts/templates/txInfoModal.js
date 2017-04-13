templates.txInfoModal =
`
<!-- Modal -->
<div class="modal fade modal-3d-sign" data-extcoin="COIN" id="txid_info_mdl" aria-hidden="false" role="dialog"
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
              <a data-toggle="tab" href="#KmdTxIDInfotab3" data-extcoin="COIN" aria-controls="KmdTxIDInfotab3" role="tab">
                <i class="icon wb-briefcase" aria-hidden="true"></i>Raw info
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
              <div class="tab-pane" id="KmdTxIDInfotab3" data-extcoin="COIN" role="tabpanel">
                <textarea id="txid_info_hex" data-extcoin="COIN" style="width: 100%; height: 170px" rows="10" cols="80" disabled></textarea>
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
`;