templates.atomicExplorer =
`
<!-- BEGIN ATOMIC EXPLORER SETTINGS CONTENT BODY -->
<div class="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out" style="margin-left: 0px">
  <div class="page-content" id="section-iguana-atomic-explorer">
    <div class="row" id="atomic-explorer" data-plugin="masonry">
      <div class="col-xlg-12 col-md-12">
        <h4 class="font-size-14 text-uppercase">Atomic Explorer</h4>
        <!-- Atomic Explorer Tab -->
        <div class="panel panel-bordered">
          <!--<div class="panel-heading">
            <h3 class="panel-title">Panel Heading</h3>
          </div>-->
          <div class="panel-body">
            <div class="col-sm-4 col-xs-12">
              <div class="form-group">
                <select class="form-control form-material" id="atomic_explorer_select_coin_options">
                  <option value="" data-lang="INDEX.SELECT_COIN"></option>
                  ${templates.addCoinOptions}
                </select>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12" style="text-align: center">
              <select class="form-control form-material" id="atomic_explorer_select_command_options">
                <option value="">-Select Command-</option>
                <option value="history">Address History</option>
                <option value="getbalance">Get Balance</option>
                <option value="listunspent">List Unspent</option>
                <option value="txid">Transaction ID</option>
                <option value="blockash">Block Hash</option>
                <option value="chaintip">Chain Tip</option>
                <option value="activehandle">Active Handle</option>
                <option value="gettransaction">Get Transaction</option>
                <option value="dex_alladdresses">DEX All Addresses</option>
                <option value="dex_importaddress">DEX Import Address</option>
                <option value="dex_checkaddress">DEX Check Address</option>
                <option value="dex_validateaddress">DEX Validate Address</option>
                <option value="dex_getinfo">DEX Get Info</option>
                <option value="dex_getnotaries">DEX Get Notaries</option>
                <option value="dex_getbestblockhash">DEX Get Best Block Hash</option>
                <option value="dex_getblockhash">DEX Get Block Hash</option>
                <option value="dex_getblock">DEX Get Block</option>
                <option value="dex_gettxin">DEX Get txin</option>
                <option value="dex_gettxout">DEX Get txout</option>
                <option value="dex_gettransaction">DEX Get Transaction</option>
                <option value="dex_getbalance">DEX Get Balance</option>
                <option value="dex_getsupply">DEX Get Supply</option>
                <option value="dex_listtransactions">DEX List Transactions</option>
                <option value="dex_listtransactions2">DEX List Transactions 2</option>
                <option value="dex_listspent">DEX List Spent</option>
                <option value="dex_listunspent">DEX List Unspent</option>
                <option value="dex_listunspent2">DEX List Unspent 2</option>
                <option value="dex_sendrawtransaction">DEX Send Raw Transaction</option>
                <option value="basilisk_refresh">Basilisk Refresh</option>
                <option value="jumblr_status">Jumbler Status</option>
              </select>
            </div>
            <div class="col-sm-4 col-xs-12" style="text-align: center">
              <input type="text" class="form-control" id="atomic_explorer_input_data" name="atomic_explorer_input_data" placeholder="addr, txid, blockash etc.">
            </div>
            <div class="col-sm-12 col-xs-12" style="text-align: center">
              <button type="button" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="atomic_explorer_getcoinpeers_btn">Submit</button>
            </div>
          </div>
        </div>
        <!-- End Atomic Explorer Tab -->
      </div>
      <div class="col-xlg-4 col-md-12">
        <!-- Atomic Explorer tab -->
        <div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title">Raw Output</h3>
          </div>
          <div class="panel-body">
            <div class="tab-content">
              <pre id="atomic-explorer-commands-output"></pre>
            </div>
          </div>
        </div>
        <!-- End Atomic Explorer tab -->
      </div>
    </div>
  </div>
</div>
<!-- END ATOMIC EXPLORER SETTINGS CONTENT BODY -->
`;