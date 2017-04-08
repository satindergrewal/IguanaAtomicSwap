import React from 'react';
import { translate } from '../../translate/translate';
import {
  iguanaActiveHandle,
  encryptWallet,
  settingsWifkeyState,
  importPrivKey,
  getDebugLog,
  getPeersList,
  addPeerNode
} from '../../actions/actionCreators';
import Store from '../../store';
import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';

/*
  TODO:
  1) pre-select active coin in add node tab
  2) add agama config section
  3) add fiat section
*/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      debugLinesCount: 10,
      debugTarget: 'iguana',
    };
    this.exportWifKeys = this.exportWifKeys.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.importWifKey = this.importWifKey.bind(this);
    this.readDebugLog = this.readDebugLog.bind(this);
    this.checkNodes = this.checkNodes.bind(this);
    this.addNode = this.addNode.bind(this);
    this.renderPeersList = this.renderPeersList.bind(this);
    this.renderSNPeersList = this.renderSNPeersList.bind(this);
  }

  componentDidMount() {
    Store.dispatch(iguanaActiveHandle());
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  exportWifKeys() {
    Store.dispatch(encryptWallet(this.state.wifkeysPassphrase, settingsWifkeyState, this.props.ActiveCoin.coin));
  }

  importWifKey() {
    Store.dispatch(importPrivKey(this.state.importWifKey));
  }

  readDebugLog() {
    Store.dispatch(getDebugLog(this.state.debugTarget, this.state.debugLinesCount));
  }

  checkNodes() {
    if (this.state.getPeersCoin) {
      Store.dispatch(getPeersList(this.state.getPeersCoin.split('|')[0]));
    }
  }

  addNode() {
    if (this.state.addNodeCoin) {
      Store.dispatch(addPeerNode(this.state.addNodeCoin.split('|')[0], this.state.addPeerIP));
    }
  }

  renderPeersList() {
    if (this.state.getPeersCoin) {
      const coin = this.state.getPeersCoin.split('|')[0];

      if (this.props.Settings.rawPeers &&
          this.state.getPeersCoin &&
          this.props.Settings.rawPeers[coin]) {
        return this.props.Settings.rawPeers[coin].map((ip) => <div key={ip}>{ip}</div>);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderSNPeersList() {
    if (this.state.getPeersCoin) {
      const coin = this.state.getPeersCoin.split('|')[0];

      if (this.props.Settings.supernetPeers &&
          this.state.getPeersCoin &&
          this.props.Settings.supernetPeers[coin]) {
        return this.props.Settings.supernetPeers[coin].map((ip) => <div key={ip}>{ip}</div>);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
                        <div className="panel-heading" id="WalletInfo" role="tab" onClick={() => this.openTab(0)}>
                          <a className={this.state.activeTab === 0 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon md-balance-wallet" aria-hidden="true"></i>{translate('INDEX.WALLET_INFO')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 0 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="WalletInfoTab" aria-labelledby="WalletInfo" role="tabpanel">
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
                                    <div id="winfo_pubkey_value">{this.props.Main.activeHandle.pubkey}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>btcpubkey</td>
                                  <td>
                                    <div id="winfo_btcpubkey_value">{this.props.Main.activeHandle.btcpubkey}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>rmd160</td>
                                  <td>
                                    <div id="winfo_rmd160_value">{this.props.Main.activeHandle.rmd160}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>NXT</td>
                                  <td>
                                    <div id="winfo_NXT_value">{this.props.Main.activeHandle.NXT}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>notary</td>
                                  <td>
                                    <div id="winfo_notary_value">{this.props.Main.activeHandle.notary}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{fontWeight: 'bold'}}>status</td>
                                  <td>
                                    <div id="winfo_status_value">{this.props.Main.activeHandle.status}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="AddNodeforCoin" role="tab" onClick={() => this.openTab(1)}>
                          <a className={this.state.activeTab === 1 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon md-plus-square" aria-hidden="true"></i>{translate('INDEX.ADD_NODE')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 1 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="AddNodeforCoinTab" aria-labelledby="AddNodeforCoin" role="tabpanel">
                          <div className="panel-body">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="col-sm-12">
                                  <p>{translate('INDEX.USE_THIS_SECTION')}</p>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                  <div className="form-group">
                                    <select className="form-control form-material" id="settings_select_coin_options" name="getPeersCoin" onChange={this.updateInput}>
                                      <option>{translate('INDEX.SELECT_COIN')}</option>
                                      <AddCoinOptionsCrypto />
                                      <AddCoinOptionsAC />
                                      <AddCoinOptionsACFiat />
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                                  <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_getcoinpeers_btn" onClick={this.checkNodes}>{translate('INDEX.CHECK_NODES')}</button>
                                </div>
                                <div className="col-sm-12">
                                  <h5>
                                    SuperNET Peers: <span id="coin_supernetpeers_h"></span>
                                  </h5>
                                  <p id="coin_supernetpeers">{this.renderSNPeersList()}</p>
                                  <h5>
                                    Raw Peers: <span id="coin_rawpeers_h"></span>
                                  </h5>
                                  <p id="coin_rawpeers">{this.renderPeersList()}</p>
                                </div>
                              </div>

                              <div className="col-sm-6">
                                <div className="col-sm-12">
                                  <p>{translate('INDEX.USE_THIS_SECTION_PEER')}</p>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                  <div className="form-group">
                                    <select className="form-control form-material" id="settings_select_coin_addpeer_options" name="addNodeCoin" onChange={this.updateInput}>
                                      <option>{translate('INDEX.SELECT_COIN')}</option>
                                      <AddCoinOptionsCrypto />
                                      <AddCoinOptionsAC />
                                      <AddCoinOptionsACFiat />
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <input type="text" className="form-control" id="settings_add_peer_ip" name="addPeerIP" placeholder="Add Peer IP" onChange={this.updateInput} />
                                  </div>
                                </div>
                                <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                                  <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="settings_addcoinpeers_btn" onClick={this.addNode}>{translate('INDEX.ADD_NODE')}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="DumpWallet" role="tab" onClick={() => this.openTab(2)}>
                          <a className={this.state.activeTab === 2 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon wb-briefcase" aria-hidden="true"></i>{translate('INDEX.WALLET_BACKUP')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 2 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="DumpWalletTab" aria-labelledby="DumpWallet" role="tabpanel">
                          <div className="panel-body">Wallet Backup section to be updated soon.</div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="FiatCurrencySettings" role="tab" onClick={() => this.openTab(3)}>
                          <a className={this.state.activeTab === 3 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon fa-money" aria-hidden="true"></i>{translate('INDEX.FIAT_CURRENCY')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 3 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="FiatCurrencySettingsTab" aria-labelledby="FiatCurrencySettings" role="tabpanel">
                          <div className="panel-body">Fiat currency settings section to be updated soon.</div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="ExportKeys" role="tab" onClick={() => this.openTab(4)}>
                          <a className={this.state.activeTab === 4 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon md-key" aria-hidden="true"></i>{translate('INDEX.EXPORT_KEYS')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 4 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="ExportKeysTab" aria-labelledby="ExportKeys" role="tabpanel">
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
                                <input type="password" className="form-control" name="wifkeysPassphrase" id="wifkeys_passphrase" onChange={this.updateInput} />
                                <label className="floating-label" htmlFor="wifkeys_passphrase">{translate('INDEX.PASSPHRASE')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="wifkeys_passphrase_btn" onClick={this.exportWifKeys}>{translate('INDEX.GET_WIF_KEYS')}</button>
                              </div>
                            </form>

                            <div className="col-sm-12" style={{paddingTop: '15px'}}>
                              <div className="row" id="wif-priv-keys" data-plugin="masonry">
                                <table className={this.props.Settings && this.props.Settings.address ? 'table show' : 'table hide'}>
                                  <tr>
                                    <td style={{width: '5%'}}>
                                      <b>{this.props.ActiveCoin.coin}</b>
                                    </td>
                                    <td>{this.props.Settings.address}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>{this.props.ActiveCoin.coin}Wif</b>
                                    </td>
                                    <td>{this.props.Settings.wifkey}</td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="panel">
                        <div className="panel-heading" id="ImportKeys" role="tab" onClick={() => this.openTab(5)}>
                          <a className={this.state.activeTab === 5 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse">
                            <i className="icon md-key" aria-hidden="true"></i>{translate('INDEX.IMPORT_KEYS')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 5 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="ImportKeysTab" aria-labelledby="ImportKeys" role="tabpanel">
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
                                <input type="text" className="form-control" name="importWifKey" id="import_wifkey" onChange={this.updateInput} />
                                <label className="floating-label" htmlFor="import_wifkey">{translate('INDEX.INPUT_PRIV_KEY')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="import_wifkey_btn" onClick={this.importWifKey}>{translate('INDEX.IMPORT_PRIV_KEY')}</button>
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
                        <div className="panel-heading" id="DebugLog" role="tab" onClick={() => this.openTab(6)}>
                          <a className={this.state.activeTab === 6 ? 'panel-title' : 'panel-title collapsed'} data-toggle="collapse" data-parent="#SettingsAccordion">
                            <i className="icon md-info" aria-hidden="true"></i>{translate('INDEX.DEBUG_LOG')}
                          </a>
                        </div>
                        <div className={this.state.activeTab === 6 ? 'panel-collapse collapse in' : 'panel-collapse collapse'} id="DebugLogTab" aria-labelledby="DebugLog" role="tabpanel">
                          <div className="panel-body">
                            <p>{translate('INDEX.DEBUG_LOG_DESC')}</p>
                            <div className="col-sm-12"></div>
                            <form className="read-debug-log-import-form" method="post" action="javascript:" autoComplete="off">
                              <div className="form-group form-material floating">
                                <input type="text" className="form-control" name="debugLinesCount" id="read_debug_log_lines" value={this.state.debugLinesCount} onChange={this.updateInput} />
                                <label className="floating-label" htmlFor="read_debug_log_lines">{translate('INDEX.DEBUG_LOG_LINES')}</label>
                              </div>
                              <div className="form-group form-material floating">
                                <select className="form-control form-material" name="debugTarget" id="settings_select_debuglog_options" onChange={this.updateInput}>
                                  <option value="iguana">Iguana</option>
                                  <option value="komodo">Komodo</option>
                                </select>
                                <label className="floating-label" htmlFor="settings_select_debuglog_options">{translate('INDEX.TARGET')}</label>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="read_debug_log_btn" onClick={this.readDebugLog}>{translate('INDEX.LOAD_DEBUG_LOG')}</button>
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{textAlign: 'left'}}>
                                <br />
                                <div style={{padding: '20px 0'}}>{this.props.Settings.debugLog}</div>
                              </div>
                            </form>
                            <div className="col-sm-12" style={{paddingTop: '15px'}}>
                              <div className="row" data-plugin="masonry"></div>
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
