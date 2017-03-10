templates.walletSettings =
`
<!-- BEGIN IGUANA WALLET SETTINGS CONTENT BODY -->
<div class="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out" style="margin-left: 0px">
  <div class="page-content" id="section-iguana-wallet-settings">
    <div class="row" id="iguana-wallet-settings" data-plugin="masonry">
      <div class="col-xlg-12 col-md-12">
        <!-- Iguana Wallet Settings Box -->
          <div class="row" id="iguana-wallet-settings" data-plugin="masonry">
            <div class="col-xlg-12 col-md-12">
              <h4 class="font-size-14 text-uppercase" data-lang="INDEX.WALLET_SETTINGS"></h4>
              <div class="panel-group" id="SettingsAccordion" aria-multiselectable="true"
              role="tablist">
                <div class="panel">
                  <div class="panel-heading" id="WalletInfo" role="tab">
                    <a class="panel-title" data-toggle="collapse" href="#WalletInfoTab" data-parent="#SettingsAccordion" aria-expanded="true" aria-controls="WalletInfoTab">
                      <i class="icon md-balance-wallet" aria-hidden="true"></i><span data-lang="INDEX.WALLET_INFO"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse in" id="WalletInfoTab" aria-labelledby="WalletInfo"
                  role="tabpanel">
                    <div class="panel-body">
                      <table class="table" id="wallet-info-table">
                        <thead>
                          <tr>
                            <th width="10%" data-lang="INDEX.KEY"></th>
                            <th data-lang="INDEX.VALUE"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="font-weight: bold">pubkey</td>
                            <td>
                              <div id="winfo_pubkey_value"></div>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold">btcpubkey</td>
                            <td>
                              <div id="winfo_btcpubkey_value"></div>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold">rmd160</td>
                            <td>
                              <div id="winfo_rmd160_value"></div>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold">NXT</td>
                            <td>
                              <div id="winfo_NXT_value"></div>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold">notary</td>
                            <td>
                              <div id="winfo_notary_value"></div>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold">status</td>
                            <td>
                              <div id="winfo_status_value"></div>
                            </td>
                          </tr>
                          <!--<tr><td style="font-weight: bold">duration</td><td><div id="winfo_duration_value"></div></td></tr>-->
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="AddNodeforCoin" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#AddNodeforCoinTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="AddNodeforCoinTab">
                      <i class="icon md-plus-square" aria-hidden="true"></i><span data-lang="INDEX.ADD_NODE"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="AddNodeforCoinTab" aria-labelledby="AddNodeforCoin"
                  role="tabpanel">
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="col-sm-12">
                            <p data-lang="INDEX.USE_THIS_SECTION"></p>
                          </div>
                          <div class="col-sm-8 col-xs-12">
                            <div class="form-group">
                              <select class="form-control form-material" id="settings_select_coin_options">
                                <option data-lang="INDEX.SELECT_COIN"></option>
                                <option value="BTC">Bitcoin</option>
                                <option value="BTCD">BitcoinDark</option>
                                <option value="LTC">Litecoin</option>
                                <option value="DOGE">Dogecoin</option>
                                <option value="DGB">Digibyte</option>
                                <option value="SYS">SysCoin</option>
                                <option value="MZC">MazaCoin</option>
                                <option value="UNO">Unobtanium</option>
                                <option value="ZET">Zetacoin</option>
                                <option value="KMD">Komodo</option>
                                <option value="BTM">Bitmark</option>
                                <option value="CARB">Carboncoin</option>
                                <option value="ANC">AnonCoin</option>
                                <option value="FRK">Franko</option>
                                <option value="SUPERNET">SUPERNET</option>
                                <option value="REVS">REVS</option>
                                <option value="WIRELESS">WIRELESS</option>
                                <option value="DEX">DEX</option>
                                <option value="PANGEA">PANGEA</option>
                                <option value="JUMBLR">JUMBLR</option>
                                <option value="BET">BET</option>
                                <option value="CRYPTO">CRYPTO</option>
                                <option value="HODL">HODL</option>
                                <option value="SHARK">SHARK</option>
                                <option value="BOTS">BOTS</option>
                                <option value="MGW">MGW</option>
                                <option value="MVP">MVP</option>
                                <option value="KV">KV</option>
                                <option value="CEAL">CEAL</option>
                                <option value="MESH">MESH</option>
                                <option value="USD">USD</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-4 col-xs-12" style="text-align: center">
                            <button type="button" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_getcoinpeers_btn" onclick="Settings_ShowCoinPeers()" data-lang="INDEX.CHECK_NODES"></button>
                          </div>
                          <div class="col-sm-12">
                            <h5>
                              SuperNET Peers: <span id="coin_supernetpeers_h"></span>
                            </h5>
                            <p id="coin_supernetpeers"></p>
                            <h5>
                              Raw Peers: <span id="coin_rawpeers_h"></span>
                            </h5>
                            <p id="coin_rawpeers"></p>
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="col-sm-12">
                            <p data-lang="INDEX.USE_THIS_SECTION_PEER"></p>
                          </div>
                          <div class="col-sm-8 col-xs-12">
                            <div class="form-group">
                              <select class="form-control form-material" id="settings_select_coin_addpeer_options">
                                <option data-lang="INDEX.SELECT_COIN"></option>
                                <option value="BTC">Bitcoin</option>
                                <option value="BTCD">BitcoinDark</option>
                                <option value="LTC">Litecoin</option>
                                <option value="DOGE">Dogecoin</option>
                                <option value="DGB">Digibyte</option>
                                <option value="SYS">SysCoin</option>
                                <option value="MZC">MazaCoin</option>
                                <option value="UNO">Unobtanium</option>
                                <option value="ZET">Zetacoin</option>
                                <option value="KMD">Komodo</option>
                                <option value="BTM">Bitmark</option>
                                <option value="CARB">Carboncoin</option>
                                <option value="ANC">AnonCoin</option>
                                <option value="FRK">Franko</option>
                                <option value="SUPERNET">SUPERNET</option>
                                <option value="REVS">REVS</option>
                                <option value="WIRELESS">WIRELESS</option>
                                <option value="DEX">DEX</option>
                                <option value="PANGEA">PANGEA</option>
                                <option value="JUMBLR">JUMBLR</option>
                                <option value="BET">BET</option>
                                <option value="CRYPTO">CRYPTO</option>
                                <option value="HODL">HODL</option>
                                <option value="SHARK">SHARK</option>
                                <option value="BOTS">BOTS</option>
                                <option value="MGW">MGW</option>
                                <option value="MVP">MVP</option>
                                <option value="KV">KV</option>
                                <option value="CEAL">CEAL</option>
                                <option value="MESH">MESH</option>
                                <option value="USD">USD</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <input type="text" class="form-control" id="settings_add_peer_ip" name="settings_add_peer_ip" placeholder="Add Peer IP">
                            </div>
                          </div>
                          <div class="col-sm-4 col-xs-12" style="text-align: center">
                            <button type="button" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_addcoinpeers_btn" onclick="Settings_AddCoinPeers()" data-lang="INDEX.ADD_NODE"></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="DumpWallet" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#DumpWalletTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="DumpWalletTab">
                      <i class="icon wb-briefcase" aria-hidden="true"></i><span data-lang="INDEX.WALLET_BACKUP"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="DumpWalletTab" aria-labelledby="DumpWallet"
                  role="tabpanel">
                    <div class="panel-body">Wallet Backup section to be updated soon.</div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="FiatCurrencySettings" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#FiatCurrencySettingsTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="FiatCurrencySettingsTab">
                      <i class="icon fa-money" aria-hidden="true"></i><span data-lang="INDEX.FIAT_CURRENCY"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="FiatCurrencySettingsTab" aria-labelledby="FiatCurrencySettings" role="tabpanel">
                    <div class="panel-body">Fiat currency settings section to be updated soon.</div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="ExportKeys" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#ExportKeysTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="ExportKeysTab">
                      <i class="icon md-key" aria-hidden="true"></i><span data-lang="INDEX.EXPORT_KEYS"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="ExportKeysTab" aria-labelledby="ExportKeys"
                  role="tabpanel">
                    <div class="panel-body">
                      <p>
                        <div data-lang="INDEX.ONLY_ACTIVE_WIF_KEYS"></div><br/>
                        <b>
                          <i data-lang="INDEX.PLEASE_KEEP_KEYS_SAFE"></i>
                        </b>
                      </p>
                      <div class="col-sm-12"></div>
                      <form class="wifkeys-form" method="post" action="javascript:" autocomplete="off" onsubmit="return false">
                        <div class="form-group form-material floating">
                          <input type="password" class="form-control" name="wifkeys_passphrase" id="wifkeys_passphrase">
                          <label class="floating-label" for="wifkeys_passphrase" data-lang="INDEX.PASSPHRASE"></label>
                        </div>
                        <div class="col-sm-12 col-xs-12" style="text-align: center">
                          <button type="submit" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="wifkeys_passphrase_btn" data-lang="INDEX.GET_WIF_KEYS"></button>
                        </div>
                      </form>

                      <div class="col-sm-12" style="padding-top: 15px">
                        <div class="row" id="wif-priv-keys" data-plugin="masonry">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="ImportKeys" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#ImportKeysTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="ImportKeysTab">
                      <i class="icon md-key" aria-hidden="true"></i><span data-lang="INDEX.IMPORT_KEYS"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="ImportKeysTab" aria-labelledby="ImportKeys"
                  role="tabpanel">
                    <div class="panel-body">
                      <p>
                        <div data-lang="INDEX.IMPORT_KEYS_DESC_P1"></div><br/>
                        <div data-lang="INDEX.IMPORT_KEYS_DESC_P2"></div><br/>
                        <div data-lang="INDEX.IMPORT_KEYS_DESC_P3"></div><br/>
                        <b>
                          <i data-lang="INDEX.PLEASE_KEEP_KEYS_SAFE"></i>
                        </b>
                      </p>
                      <div class="col-sm-12"></div>
                      <form class="wifkeys-import-form" method="post" action="javascript:" autocomplete="off" onsubmit="return false">
                        <div class="form-group form-material floating">
                          <input type="text" class="form-control" name="import_wifkey" id="import_wifkey">
                          <label class="floating-label" for="import_wifkey" data-lang="INDEX.INPUT_PRIV_KEY"></label>
                        </div>
                        <div class="col-sm-12 col-xs-12" style="text-align: center">
                          <button type="submit" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="import_wifkey_btn" data-lang="INDEX.IMPORT_PRIV_KEY"></button>
                        </div>
                      </form>
                      <div class="col-sm-12" style="padding-top: 15px">
                        <div class="row" id="wif-priv-keys" data-plugin="masonry">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="panel">
                  <div class="panel-heading" id="DebugLog" role="tab">
                    <a class="panel-title collapsed" data-toggle="collapse" href="#DebugLogTab" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="DebugLogTab">
                      <i class="icon md-info" aria-hidden="true"></i><span data-lang="INDEX.DEBUG_LOG"></span>
                    </a>
                  </div>
                  <div class="panel-collapse collapse" id="DebugLogTab" aria-labelledby="DebugLog"
                  role="tabpanel">
                    <div class="panel-body">
                      <p data-lang="INDEX.DEBUG_LOG_DESC"></p>
                      <div class="col-sm-12"></div>
                      <form class="read-debug-log-import-form" method="post" action="javascript:" autocomplete="off" onsubmit="return false">
                        <div class="form-group form-material floating">
                          <input type="text" class="form-control" name="read_debug_log_lines" id="read_debug_log_lines" value="10">
                          <label class="floating-label" for="read_debug_log_lines" data-lang="INDEX.DEBUG_LOG_LINES"></label>
                        </div>
                        <div class="form-group form-material floating">
                          <select class="form-control form-material" id="settings_select_debuglog_options">
                            <option value="iguana">Iguana</option>
                            <option value="komodo">Komodo</option>
                          </select>
                          <label class="floating-label" for="settings_select_debuglog_options" data-lang="INDEX.TARGET"></label>
                        </div>
                        <div class="col-sm-12 col-xs-12" style="text-align: center">
                          <button type="submit" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="read_debug_log_btn" onclick="Settings_LoadDebugLog()" data-lang="INDEX.LOAD_DEBUG_LOG"></button>
                        </div>
                        <div class="col-sm-12 col-xs-12" style="text-align: center">
                          <br/>
                          <textarea id="read_debug_log_textarea" style="width:100%;height:200px"></textarea>
                        </div>
                      </form>
                      <div class="col-sm-12" style="padding-top: 15px">
                        <div class="row" id="wif-priv-keys" data-plugin="masonry"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Iguana Wallet Settings Box -->
      </div>
    </div>
  </div>
</div>
<!-- END IGUANA WALLET SETTINGS CONTENT BODY -->
`;