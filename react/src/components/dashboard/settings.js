import React from 'react';
import { translate } from '../../translate/translate';
import {
  iguanaActiveHandle,
  encryptWallet,
  settingsWifkeyState,
  importPrivKey,
  getDebugLog,
  getPeersList,
  addPeerNode,
  getAppConfig,
  saveAppConfig,
  getAppInfo,
  shepherdCli
} from '../../actions/actionCreators';
import Store from '../../store';

import {
  AppInfoTabRender,
  SettingsRender
} from './settings.render';

/*
  TODO:
  1) pre-select active coin in add node tab
  2) add fiat section
  3) kickstart section
  4) batch export/import wallet addresses
*/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      debugLinesCount: 10,
      debugTarget: 'iguana',
      activeTabHeight: '0',
      appSettings: {},
      tabElId: null,
      cliCmdString: null,
      cliCoin: null,
      cliResponse: null,
      exportWifKeysRaw: false,
      seedInputVisibility: false,
    };
    this.exportWifKeys = this.exportWifKeys.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateInputSettings = this.updateInputSettings.bind(this);
    this.importWifKey = this.importWifKey.bind(this);
    this.readDebugLog = this.readDebugLog.bind(this);
    this.checkNodes = this.checkNodes.bind(this);
    this.addNode = this.addNode.bind(this);
    this.renderPeersList = this.renderPeersList.bind(this);
    this.renderSNPeersList = this.renderSNPeersList.bind(this);
    this._saveAppConfig = this._saveAppConfig.bind(this);
    this.exportWifKeysRaw = this.exportWifKeysRaw.bind(this);
    this.toggleSeedInputVisibility = this.toggleSeedInputVisibility.bind(this);
  }

  componentDidMount() {
    Store.dispatch(iguanaActiveHandle());
    Store.dispatch(getAppConfig());
    Store.dispatch(getAppInfo());
  }

  componentWillReceiveProps(props) {
    if (this.state.tabElId) {
      const _height = document.querySelector(`#${this.state.tabElId} .panel-collapse .panel-body`).offsetHeight;

      this.setState(Object.assign({}, this.state, {
        activeTab: this.state.activeTab,
        activeTabHeight: _height,
        tabElId: this.state.tabElId,
      }));
    }
  }

  toggleSeedInputVisibility() {
    this.setState({
      seedInputVisibility: !this.state.seedInputVisibility,
    });
  }

  execCliCmd() {
    Store.dispatch(shepherdCli('passthru', this.state.cliCoin, this.state.cliCmd));
  }

  openTab(elemId, tab) {
    setTimeout(() => {
      const _height = document.querySelector(`#${elemId} .panel-collapse .panel-body`).offsetHeight;

      this.setState(Object.assign({}, this.state, {
        activeTab: tab,
        activeTabHeight: _height,
        tabElId: elemId,
      }));
    }, 100);
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
      const _getPeersCoin = this.state.getPeersCoin;
      const _rawPeers = this.props.Settings.rawPeers;
      const coin = _getPeersCoin.split('|')[0];

      if (_rawPeers &&
          _getPeersCoin &&
          _rawPeers[coin]) {
        return _rawPeers[coin].map((ip) =>
          <div key={ ip }>{ ip }</div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderAppInfoTab() {
    const releaseInfo = this.props.Settings.appInfo && this.props.Settings.appInfo.releaseInfo;

    if (releaseInfo) {
      return AppInfoTabRender.call(this);
    }

    return null;
  }

  renderSNPeersList() {
    if (this.state.getPeersCoin) {
      const _getPeersCoin = this.state.getPeersCoin;
      const _supernetPeers = this.props.Settings.supernetPeers;
      const coin = _getPeersCoin.split('|')[0];

      if (_supernetPeers &&
          _getPeersCoin &&
          _supernetPeers[coin]) {
        return _supernetPeers[coin].map((ip) =>
          <div key={ ip }>{ ip }</div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  updateInputSettings(e) {
    let _appSettings = this.state.appSettings;
    _appSettings[e.target.name] = e.target.value;

    this.setState({
      appSettings: _appSettings,
    });
  }

  _saveAppConfig() {
    const _appSettings = this.state.appSettings;
    let _appSettingsPristine = Object.assign({}, this.props.Settings.appSettings);

    for (let key in _appSettings) {
      if (key.indexOf('__') === -1) {
        _appSettingsPristine[key] = _appSettings[key];
      } else {
        const _nestedKey = key.split('__');
        _appSettingsPristine[_nestedKey[0]][_nestedKey[1]] = _appSettings[key];
      }
    }

    Store.dispatch(saveAppConfig(_appSettingsPristine));
  }

  renderConfigEditForm() {
    let items = [];
    const _appConfig = this.props.Settings.appSettings;

    for (let key in _appConfig) {
      if (typeof _appConfig[key] === 'object') {
        items.push(
          <tr key={ `app-settings-${key}` }>
            <td className="padding-15">
              { key }
            </td>
            <td className="padding-15"></td>
          </tr>
        );

        for (let _key in _appConfig[key]) {
          items.push(
            <tr key={ `app-settings-${key}-${_key}` }>
              <td className="padding-15 padding-left-30">
                { _key }
              </td>
              <td className="padding-15">
                <input
                  type="text"
                  name={ `${key}__${_key}` }
                  defaultValue={ _appConfig[key][_key] }
                  onChange={ this.updateInputSettings } />
              </td>
            </tr>
          );
        }
      } else {
        items.push(
          <tr key={ `app-settings-${key}` }>
            <td className="padding-15">
              { key }
            </td>
            <td className="padding-15">
              <input
                type="text"
                name={ `${key}` }
                defaultValue={ _appConfig[key] }
                onChange={ this.updateInputSettings } />
            </td>
          </tr>
        );
      }
    }

    return items;
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderDebugLogData() {
    if (this.props.Settings.debugLog) {
      const _debugLogDataRows = this.props.Settings.debugLog.split('\n');

      if (_debugLogDataRows &&
          _debugLogDataRows.length) {
        return _debugLogDataRows.map((_row) =>
          <div
            key={ `settings-debuglog-${Math.random(0, 9) * 10}` }
            className="padding-bottom-5">{ _row }</div>
        );
      } else {
        return (
          <span>{ translate('INDEX.EMPTY_DEBUG_LOG') }</span>
        );
      }
    } else {
      return null;
    }
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span key={ `settings-label-${Math.random(0, 9) * 10}` }>
        { _translation }
        <br />
      </span>
    );
  }

  renderCliResponse() {
    const _cliResponse = this.props.Settings.cli;

    if (_cliResponse) {
      let _cliResponseParsed;

      try {
        _cliResponseParsed = JSON.parse(_cliResponse.result)
      } catch(e) {
        _cliResponseParsed = _cliResponse.result;
      }

      return (
        <div>
          <div>
            <strong>CLI response:</strong>
          </div>
          { JSON.stringify(_cliResponseParsed, null, '\t') }
        </div>
      );
    } else {
      return null;
    }
  }

  renderActiveCoinsList(mode) {
    const modes = [
      'native',
      'basilisk',
      'full'
    ];

    const allCoins = this.props.Main.coins;
    let items = [];

    if (allCoins) {
      if (mode === 'all') {
        modes.map(function(mode) {
          allCoins[mode].map(function(coin) {
            items.push(
              <option value={ coin } key={ coin }>{ coin } ({ mode })</option>
            );
          });
        });
      } else {
        allCoins[mode].map(function(coin) {
          items.push(
            <option value={ coin } key={ coin }>{ coin } ({ mode })</option>
          );
        });
      }

      return items;
    } else {
      return null;
    }
  }

  renderExportWifKeysRaw() {
    const _wifKeysResponse = this.props.Settings.wifkey;

    if (_wifKeysResponse &&
        this.state.exportWifKeysRaw) {
      return (
        <div className="padding-bottom-30 padding-top-30">{ JSON.stringify(_wifKeysResponse, null, '\t') }</div>
      );
    } else {
      return null;
    }
  }

  renderWifKeys() {
    let items = [];

    if (this.props.Settings.wifkey) {
      const _wifKeys = this.props.Settings.wifkey;

      for (let i = 0; i < 2; i++) {
        items.push(
          <tr key={ `wif-export-table-header-${i}` }>
            <td className="padding-bottom-10 padding-top-10">
              <strong>{ i === 0 ? 'Address list' : 'Wif key list' }</strong>
            </td>
            <td className="padding-bottom-10 padding-top-10"></td>
          </tr>
        );

        for (let _key in _wifKeys) {
          if ((i === 0 && _key.length === 3 && _key !== 'tag') ||
              (i === 1 && _key.indexOf('wif') > -1)) {
            items.push(
              <tr key={ _key }>
                <td>{ _key }</td>
                <td className="padding-left-15">{ _wifKeys[_key] }</td>
              </tr>
            );
          }
        }
      }

      return items;
    } else {
      return null;
    }
  }

  exportWifKeysRaw() {
    this.setState(Object.assign({}, this.state, {
      exportWifKeysRaw: !this.state.exportWifKeysRaw,
    }));
  }

  render() {
    return SettingsRender.call(this);
  }
}

export default Settings;
