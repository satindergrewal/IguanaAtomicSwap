import React from 'react';
import { translate } from '../../../translate/translate';
import AddCoinOptionsCrypto from '../../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../../addcoin/addcoinOptionsACFiat';

export const AppInfoTabRender = function() {
  return (
    <div className="panel" id="AppInfo" onClick={ () => this.openTab('AppInfo', 8) }>
      <div className="panel-heading">
        <a className={ this.state.activeTab === 8 ? 'panel-title' : 'panel-title collapsed' }>
          <i className="icon md-info"></i>{ translate('SETTINGS.APP_INFO') }
        </a>
      </div>
      <div
        className={ this.state.activeTab === 8 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
        style={{ height: this.state.activeTab === 8 ? this.state.activeTabHeight + 'px' : '0' }}>
        <div className="panel-body">
          <div className="col-sm-12 padding-top-15">
            <div className="row">
              <h5>{ translate('SETTINGS.APP_RELEASE') }</h5>
              <div>
                { translate('SETTINGS.NAME') }: { this.props.Settings.appInfo.releaseInfo.name }
              </div>
              <div>
                { translate('SETTINGS.VERSION') }: { this.props.Settings.appInfo.releaseInfo.version }
              </div>
              <div>
                { translate('SETTINGS.APP_SESSION') }: { this.props.Settings.appInfo.appSession }
              </div>
            </div>
          </div>
          <div className="col-sm-12 padding-top-20">
            <div className="row">
              <h5>{ translate('SETTINGS.SYS_INFO') }</h5>
              <div>
                { translate('SETTINGS.ARCH') }: { this.props.Settings.appInfo.sysInfo.arch }
              </div>
              <div>
                { translate('SETTINGS.OS_TYPE') }: { this.props.Settings.appInfo.sysInfo.os_type }
              </div>
              <div>
                { translate('SETTINGS.OS_PLATFORM') }: { this.props.Settings.appInfo.sysInfo.platform }
              </div>
              <div>
                { translate('SETTINGS.OS_RELEASE') }: { this.props.Settings.appInfo.sysInfo.os_release }
              </div>
              <div>
                { translate('SETTINGS.CPU') }: { this.props.Settings.appInfo.sysInfo.cpu }
              </div>
              <div>
                { translate('SETTINGS.CPU_CORES') }: { this.props.Settings.appInfo.sysInfo.cpu_cores }
              </div>
              <div>
                { translate('SETTINGS.MEM') }: { this.props.Settings.appInfo.sysInfo.totalmem_readable }
              </div>
            </div>
          </div>
          <div className="col-sm-12 padding-top-20">
            <div className="row">
              <h5>{ translate('SETTINGS.LOCATIONS') }</h5>
              <div>
                { translate('SETTINGS.CACHE') }: { this.props.Settings.appInfo.dirs.cacheLocation }
              </div>
              <div>
                { translate('SETTINGS.CONFIG') }: { this.props.Settings.appInfo.dirs.configLocation }
              </div>
              <div>
                Iguana { translate('SETTINGS.BIN') }: { this.props.Settings.appInfo.dirs.iguanaBin }
              </div>
              <div>
                Iguana { translate('SETTINGS.DIR') }: { this.props.Settings.appInfo.dirs.iguanaDir }
              </div>
              <div>
                Komodo { translate('SETTINGS.BIN') }: { this.props.Settings.appInfo.dirs.komododBin }
              </div>
              <div>
                Komodo { translate('SETTINGS.DIR') }: { this.props.Settings.appInfo.dirs.komodoDir }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsRender = function() {
  return (
    <div className="margin-left-0">
      <div className="page-content" id="section-iguana-wallet-settings">
        <div className="row">
          <div className="col-xlg-12 col-md-12">
            <div className="row">
              <div className="col-xlg-12 col-md-12">
                <h4 className="font-size-14 text-uppercase">{ translate('INDEX.WALLET_SETTINGS') }</h4>
                <div className="panel-group" id="SettingsAccordion">
                  <div
                    className="panel"
                    id="WalletInfo"
                    onClick={ () => this.openTab('WalletInfo', 0) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 0 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon md-balance-wallet"></i>{ translate('INDEX.WALLET_INFO') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 0 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 0 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <table className="table">
                          <thead>
                          <tr>
                            <th width="10%">{ translate('INDEX.KEY') }</th>
                            <th>{ translate('INDEX.VALUE') }</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td className="wallet-info-key">pubkey</td>
                            <td>{ this.props.Main.activeHandle.pubkey }</td>
                          </tr>
                          <tr>
                            <td className="wallet-info-key">btcpubkey</td>
                            <td>{ this.props.Main.activeHandle.btcpubkey }</td>
                          </tr>
                          <tr>
                            <td className="wallet-info-key">rmd160</td>
                            <td>{ this.props.Main.activeHandle.rmd160 }</td>
                          </tr>
                          <tr>
                            <td className="wallet-info-key">NXT</td>
                            <td>{ this.props.Main.activeHandle.NXT }</td>
                          </tr>
                          <tr>
                            <td className="wallet-info-key">notary</td>
                            <td>{ this.props.Main.activeHandle.notary }</td>
                          </tr>
                          <tr>
                            <td className="wallet-info-key">status</td>
                            <td>{ this.props.Main.activeHandle.status }</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="AddNodeforCoin"
                    onClick={ () => this.openTab('AddNodeforCoin', 1) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 1 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon md-plus-square"></i>{ translate('INDEX.ADD_NODE') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 1 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 1 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="col-sm-12">
                              <p>{ translate('INDEX.USE_THIS_SECTION') }</p>
                            </div>
                            <div className="col-sm-8 col-xs-12">
                              <div className="form-group">
                                <select
                                  className="form-control form-material"
                                  name="getPeersCoin"
                                  onChange={ this.updateInput }>
                                  <option>{ translate('INDEX.SELECT_COIN') }</option>
                                  <AddCoinOptionsCrypto />
                                  <AddCoinOptionsAC />
                                  <AddCoinOptionsACFiat />
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-4 col-xs-12 text-align-center">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.checkNodes }>{ translate('INDEX.CHECK_NODES') }</button>
                            </div>
                            <div className="col-sm-12">
                              <h5>
                                SuperNET Peers:
                              </h5>
                              <p>{ this.renderSNPeersList() }</p>
                              <h5>
                                Raw Peers:
                              </h5>
                              <p>{ this.renderPeersList() }</p>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="col-sm-12">
                              <p>{ translate('INDEX.USE_THIS_SECTION_PEER') }</p>
                            </div>
                            <div className="col-sm-8 col-xs-12">
                              <div className="form-group">
                                <select
                                  className="form-control form-material"
                                  name="addNodeCoin"
                                  onChange={ this.updateInput }>
                                  <option>{ translate('INDEX.SELECT_COIN') }</option>
                                  <AddCoinOptionsCrypto />
                                  <AddCoinOptionsAC />
                                  <AddCoinOptionsACFiat />
                                </select>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="addPeerIP"
                                  placeholder={ translate('SETTINGS.ADD_PEER_IP') }
                                  onChange={ this.updateInput } />
                              </div>
                            </div>
                            <div className="col-sm-4 col-xs-12 text-align-center">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.addNode }>{ translate('INDEX.ADD_NODE') }</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="DumpWallet"
                    onClick={ () => this.openTab('DumpWallet', 2) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 2 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon wb-briefcase"></i>{ translate('INDEX.WALLET_BACKUP') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 2 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 2 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">Wallet Backup section to be updated soon.</div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="FiatCurrencySettings"
                    onClick={ () => this.openTab('FiatCurrencySettings', 3) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 3 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon fa-money"></i>{ translate('INDEX.FIAT_CURRENCY') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 3 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 3 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">Fiat currency settings section to be updated soon.</div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="ExportKeys"
                    onClick={ () => this.openTab('ExportKeys', 4) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 4 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon md-key"></i>{ translate('INDEX.EXPORT_KEYS') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 4 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 4 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <p>
                          <div className="padding-bottom-20">{ this.renderLB('INDEX.ONLY_ACTIVE_WIF_KEYS') }</div>
                          <div className="padding-bottom-20">
                            <i>{ this.renderLB('SETTINGS.EXPORT_KEYS_NOTE') }</i>
                          </div>
                          <strong>
                            <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
                          </strong>
                        </p>
                        <div className="col-sm-12"></div>
                        <form className="wifkeys-form" method="post" action="javascript:" autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type={ this.state.seedInputVisibility ? 'text' : 'password' }
                              className="form-control"
                              name="wifkeysPassphrase"
                              id="wifkeysPassphrase"
                              onChange={ this.updateInput } />
                            <i
                              className={ this.state.seedInputVisibility ? 'seed-toggle fa fa-eye-slash' : 'seed-toggle fa fa-eye' }
                              onClick={ this.toggleSeedInputVisibility }></i>
                            <label className="floating-label" htmlFor="wifkeysPassphrase">{ translate('INDEX.PASSPHRASE') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.exportWifKeys }>{ translate('INDEX.GET_WIF_KEYS') }</button>
                          </div>
                        </form>

                        <div className="col-sm-12 padding-top-15">
                          <div className="row">
                            <table className="table">
                              { this.renderWifKeys() }
                            </table>
                            <div className={ this.props.Settings.wifkey ? 'col-sm-12 col-xs-12 text-align-center' : 'hide' }>
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.exportWifKeysRaw }>{ this.state.exportWifKeysRaw ? 'Hide' : 'Show' } raw data</button>
                            </div>
                            <div className={ this.state.exportWifKeysRaw ? 'col-sm-12 col-xs-12 text-align-center' : 'hide' }>
                              { this.renderExportWifKeysRaw() }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="ImportKeys"
                    onClick={ () => this.openTab('ImportKeys', 5) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 5 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon md-key"></i>{ translate('INDEX.IMPORT_KEYS') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 5 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 5 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <p>
                          <div>{ translate('INDEX.IMPORT_KEYS_DESC_P1') }</div><br/>
                          <div>{ translate('INDEX.IMPORT_KEYS_DESC_P2') }</div><br/>
                          <div>{ translate('INDEX.IMPORT_KEYS_DESC_P3') }</div><br/>
                          <strong>
                            <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
                          </strong>
                        </p>
                        <div className="col-sm-12"></div>
                        <form className="wifkeys-import-form" method="post" action="javascript:" autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type="text"
                              className="form-control"
                              name="importWifKey"
                              id="importWifkey"
                              onChange={ this.updateInput } />
                            <label
                              className="floating-label"
                              htmlFor="importWifkey">{ translate('INDEX.INPUT_PRIV_KEY') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.importWifKey }>{ translate('INDEX.IMPORT_PRIV_KEY') }</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="DebugLog"
                    onClick={ () => this.openTab('DebugLog', 6) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 6 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon fa-bug"></i>{ translate('INDEX.DEBUG_LOG') }
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 6 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 6 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <p>{ translate('INDEX.DEBUG_LOG_DESC') }</p>
                        <div className="col-sm-12"></div>
                        <form
                          className="read-debug-log-import-form"
                          method="post"
                          action="javascript:"
                          autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type="text"
                              className="form-control"
                              name="debugLinesCount"
                              id="readDebugLogLines"
                              value={ this.state.debugLinesCount }
                              onChange={ this.updateInput } />
                            <label
                              className="floating-label"
                              htmlFor="readDebugLogLines">{ translate('INDEX.DEBUG_LOG_LINES') }</label>
                          </div>
                          <div className="form-group form-material floating">
                            <select
                              className="form-control form-material"
                              name="debugTarget"
                              id="settingsDelectDebugLogOptions"
                              onChange={ this.updateInput }>
                              <option value="iguana">Iguana</option>
                              <option value="komodo">Komodo</option>
                            </select>
                            <label
                              className="floating-label"
                              htmlFor="settingsDelectDebugLogOptions">{ translate('INDEX.TARGET') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.readDebugLog }>{ translate('INDEX.LOAD_DEBUG_LOG') }</button>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-left">
                            <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">{ this.renderDebugLogData() }</div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="AppSettings"
                    onClick={ () => this.openTab('AppSettings', 7) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 7 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon fa-wrench"></i>{ translate('SETTINGS.APP_CONFIG') } (config.json)
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 7 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 7 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <p>
                          <strong>{ translate('SETTINGS.CONFIG_RESTART_REQUIRED') }</strong>
                        </p>
                        <div className="col-sm-12 padding-top-15">
                          <table>
                            <tbody>
                            { this.renderConfigEditForm() }
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-xs-12 text-align-center padding-top-25 padding-bottom-25">
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={ this._saveAppConfig }>{ translate('SETTINGS.SAVE_APP_CONFIG') }</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  { this.renderAppInfoTab() }

                  <div
                    className="panel"
                    id="Cli"
                    onClick={ () => this.openTab('Cli', 9) }>
                    <div className="panel-heading">
                      <a className={ this.state.activeTab === 9 ? 'panel-title' : 'panel-title collapsed' }>
                        <i className="icon fa-code"></i> CLI
                      </a>
                    </div>
                    <div
                      className={ this.state.activeTab === 9 ? 'panel-collapse collapse in' : 'panel-collapse collapse' }
                      style={{ height: this.state.activeTab === 9 ? this.state.activeTabHeight + 'px' : '0' }}>
                      <div className="panel-body">
                        <p>Select a coin and type in CLI compatible command</p>
                        <div className="col-sm-12"></div>
                        <form
                          className="execute-cli-cmd-form"
                          method="post"
                          action="javascript:"
                          autoComplete="off">
                          <div className="form-group form-material floating">
                            <select
                              className="form-control form-material"
                              name="cliCoin"
                              id="settingsCliOptions"
                              onChange={ this.updateInput }>
                              <option value="">Select coin</option>
                              { this.renderActiveCoinsList('native') }
                            </select>
                            <label
                              className="floating-label"
                              htmlFor="settingsDelectDebugLogOptions">Coin</label>
                          </div>
                          <div className="form-group form-material floating">
                            <textarea
                              type="text"
                              className="form-control"
                              name="cliCmd"
                              id="cliCmd"
                              value={ this.state.cliCmdString }
                              onChange={ this.updateInput }></textarea>
                            <label
                              className="floating-label"
                              htmlFor="readDebugLogLines">Type in CLI compatible cmd</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              disabled={ !this.state.cliCoin || !this.state.cliCmd }
                              onClick={ () => this.execCliCmd() }>Execute</button>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-left">
                            <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">
                              { this.renderCliResponse() }
                            </div>
                          </div>
                        </form>
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
  );
};