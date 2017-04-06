import React from 'react';
import { translate } from '../../translate/translate';
/*import { dashboardChangeSection, toggleAddcoinModal, logout } from '../../actions/actionCreators';
import Store from '../../store';*/
import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  render() {
    return (
      <div data-animsition-in="fade-in" data-animsition-out="fade-out" style={{marginLeft: '0'}}>
        <div className="page-content" id="section-iguana-wallet-settings">
          <div className="row" id="iguana-wallet-settings" data-plugin="masonry">
            <div className="col-xlg-12 col-md-12">
                <div className="row" id="iguana-wallet-settings" data-plugin="masonry">
                  <div className="col-xlg-12 col-md-12">
                    <h4 className="font-size-14 text-uppercase">{translate('INDEX.WALLET_SETTINGS')}</h4>
                    <div className="panel-group" id="SettingsAccordion" aria-multiselectable="true" role="tablist">
                      <div className="panel">
                        <div className="panel-heading" id="WalletInfo" role="tab">
                          <a className="panel-title" data-toggle="collapse" href="#WalletInfoTab" data-parent="#SettingsAccordion" aria-expanded="true" aria-controls="WalletInfoTab">
                            <i className="icon md-balance-wallet" aria-hidden="true"></i>{translate('INDEX.WALLET_INFO')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse in" id="WalletInfoTab" aria-labelledby="WalletInfo" role="tabpanel">
                          <div className="panel-body">
                            <table className="table" id="wallet-info-table">
                              <thead>
                                <tr>
                                  <th width="10%">{translate('INDEX.KEY')}</th>
                                  <th>{translate('INDEX.VALUE')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>pubkey</td>
                                  <td>
                                    <div id="winfo_pubkey_value"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>btcpubkey</td>
                                  <td>
                                    <div id="winfo_btcpubkey_value"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>rmd160</td>
                                  <td>
                                    <div id="winfo_rmd160_value"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>NXT</td>
                                  <td>
                                    <div id="winfo_NXT_value"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>notary</td>
                                  <td>
                                    <div id="winfo_notary_value"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>status</td>
                                  <td>
                                    <div id="winfo_status_value"></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="AddNodeforCoin" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="AddNodeforCoinTab">
                            <i className="icon md-plus-square" aria-hidden="true"></i>{translate('INDEX.ADD_NODE')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="AddNodeforCoinTab" aria-labelledby="AddNodeforCoin" role="tabpanel">
                          <div className="panel-body">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="col-sm-12">
                                  <p>{translate('INDEX.USE_THIS_SECTION')}</p>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                  <div className="form-group">
                                    <select className="form-control form-material" id="settings_select_coin_options">
                                      <option>{translate('INDEX.SELECT_COIN')}</option>
                                      <AddCoinOptionsCrypto />
                                      <AddCoinOptionsAC />
                                      <AddCoinOptionsACFiat />
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                                  <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_getcoinpeers_btn" onClick="Settings_ShowCoinPeers">{translate('INDEX.CHECK_NODES')}</button>
                                </div>
                                <div className="col-sm-12">
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

                              <div className="col-sm-6">
                                <div className="col-sm-12">
                                  <p>{translate('INDEX.USE_THIS_SECTION_PEER')}</p>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                  <div className="form-group">
                                    <select className="form-control form-material" id="settings_select_coin_addpeer_options">
                                      <option>{translate('INDEX.SELECT_COIN')}</option>
                                      <AddCoinOptionsCrypto />
                                      <AddCoinOptionsAC />
                                      <AddCoinOptionsACFiat />
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <input type="text" className="form-control" id="settings_add_peer_ip" name="settings_add_peer_ip" placeholder="Add Peer IP" />
                                  </div>
                                </div>
                                <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                                  <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_addcoinpeers_btn" onClick="Settings_AddCoinPeers()">{translate('INDEX.ADD_NODE')}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="DumpWallet" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="DumpWalletTab">
                            <i className="icon wb-briefcase" aria-hidden="true"></i>{translate('INDEX.WALLET_BACKUP')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="DumpWalletTab" aria-labelledby="DumpWallet" role="tabpanel">
                          <div className="panel-body">Wallet Backup section to be updated soon.</div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="FiatCurrencySettings" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="FiatCurrencySettingsTab">
                            <i className="icon fa-money" aria-hidden="true"></i>{translate('INDEX.FIAT_CURRENCY')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="FiatCurrencySettingsTab" aria-labelledby="FiatCurrencySettings" role="tabpanel">
                          <div className="panel-body">Fiat currency settings section to be updated soon.</div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="ExportKeys" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="ExportKeysTab">
                            <i className="icon md-key" aria-hidden="true"></i>{translate('INDEX.EXPORT_KEYS')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="ExportKeysTab" aria-labelledby="ExportKeys" role="tabpanel">
                          <div className="panel-body">
                            <p>
                              <div>{translate('INDEX.ONLY_ACTIVE_WIF_KEYS')}</div><br/>
                              <b>
                                <i>{translate('INDEX.PLEASE_KEEP_KEYS_SAFE')}</i>
                              </b>
                            </p>
                            <div className="col-sm-12"></div>
                            <form className="wifkeys-form" method="post" action="javascript:" autoComplete="off">
                              <div className="form-group form-material floating">
                                <input type="password" className="form-control" name="wifkeys_passphrase" id="wifkeys_passphrase" />
                                <label className="floating-label" htmlFor="wifkeys_passphrase">{translate('INDEX.PASSPHRASE')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="submit" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="wifkeys_passphrase_btn">{translate('INDEX.GET_WIF_KEYS')}</button>
                              </div>
                            </form>

                            <div className="col-sm-12" style={{paddingTop: '15px'}}>
                              <div className="row" id="wif-priv-keys" data-plugin="masonry">

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="ImportKeys" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" href="#ImportKeysTab" aria-expanded="false" aria-controls="ImportKeysTab">
                            <i className="icon md-key" aria-hidden="true"></i>{translate('INDEX.IMPORT_KEYS')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="ImportKeysTab" aria-labelledby="ImportKeys" role="tabpanel">
                          <div className="panel-body">
                            <p>
                              <div>{translate('INDEX.IMPORT_KEYS_DESC_P1')}</div><br/>
                              <div>{translate('INDEX.IMPORT_KEYS_DESC_P2')}</div><br/>
                              <div>{translate('INDEX.IMPORT_KEYS_DESC_P3')}</div><br/>
                              <b>
                                <i>{translate('INDEX.PLEASE_KEEP_KEYS_SAFE')}</i>
                              </b>
                            </p>
                            <div className="col-sm-12"></div>
                            <form className="wifkeys-import-form" method="post" action="javascript:" autoComplete="off">
                              <div className="form-group form-material floating">
                                <input type="text" className="form-control" name="import_wifkey" id="import_wifkey" />
                                <label className="floating-label" htmlFor="import_wifkey">{translate('INDEX.INPUT_PRIV_KEY')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="submit" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="import_wifkey_btn">{translate('INDEX.IMPORT_PRIV_KEY')}</button>
                              </div>
                            </form>
                            <div className="col-sm-12" style={{paddingTop: '15px'}}>
                              <div className="row" id="wif-priv-keys" data-plugin="masonry">

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="DebugLog" role="tab">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#SettingsAccordion" aria-expanded="false" aria-controls="DebugLogTab">
                            <i className="icon md-info" aria-hidden="true"></i>{translate('INDEX.DEBUG_LOG')}
                          </a>
                        </div>
                        <div className="panel-collapse collapse" id="DebugLogTab" aria-labelledby="DebugLog" role="tabpanel">
                          <div className="panel-body">
                            <p>{translate('INDEX.DEBUG_LOG_DESC')}</p>
                            <div className="col-sm-12"></div>
                            <form className="read-debug-log-import-form" method="post" action="javascript:" autoComplete="off">
                              <div className="form-group form-material floating">
                                <input type="text" className="form-control" name="read_debug_log_lines" id="read_debug_log_lines" value="10" />
                                <label className="floating-label" htmlFor="read_debug_log_lines">{translate('INDEX.DEBUG_LOG_LINES')}</label>
                              </div>
                              <div className="form-group form-material floating">
                                <select className="form-control form-material" id="settings_select_debuglog_options">
                                  <option value="iguana">Iguana</option>
                                  <option value="komodo">Komodo</option>
                                </select>
                                <label className="floating-label" htmlFor="settings_select_debuglog_options">{translate('INDEX.TARGET')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="submit" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="read_debug_log_btn" onClick="Settings_LoadDebugLog()">{translate('INDEX.LOAD_DEBUG_LOG')}</button>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <br />
                                <textarea id="read_debug_log_textarea" style={{width: '100%', height: '200px'}}></textarea>
                              </div>
                            </form>
                            <div className="col-sm-12" style={{paddingTop: '15px'}}>
                              <div className="row" id="wif-priv-keys" data-plugin="masonry"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
