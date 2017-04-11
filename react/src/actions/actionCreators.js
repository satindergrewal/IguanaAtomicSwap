import 'whatwg-fetch';
import 'bluebird';

import Config from '../config';
import {
  startCurrencyAssetChain,
  startAssetChain,
  startCrypto,
  checkCoinType,
  checkAC
} from '../components/addcoin/payload';
import { copyToClipboard } from '../util/copyToClipboard';
import { translate } from '../translate/translate';

export const TOASTER_MESSAGE = 'TOASTER_MESSAGE';
export const DISPLAY_ADDCOIN_MODAL = 'DISPLAY_ADDCOIN_MODAL';
export const GET_ACTIVE_COINS = 'GET_ACTIVE_COINS';
export const LOGIN = 'LOGIN';
export const ACTIVE_HANDLE = 'ACTIVE_HANDLE';
export const DASHBOARD_SECTION_CHANGE = 'DASHBOARD_SECTION_CHANGE';
export const DASHBOARD_ACTIVE_COIN_CHANGE = 'DASHBOARD_ACTIVE_COIN_CHANGE';
export const GET_MAIN_ADDRESS = 'GET_MAIN_ADDRESS';
export const DASHBOARD_ACTIVE_COIN_BALANCE = 'DASHBOARD_ACTIVE_COIN_BALANCE';
export const DASHBOARD_ACTIVE_COIN_SEND_FORM = 'DASHBOARD_ACTIVE_COIN_SEND_FORM';
export const DASHBOARD_ACTIVE_COIN_RECEIVE_FORM = 'DASHBOARD_ACTIVE_COIN_RECEIVE_FORM';
export const DASHBOARD_ACTIVE_COIN_RESET_FORMS = 'DASHBOARD_ACTIVE_COIN_RESET_FORMS';
export const ATOMIC = 'ATOMIC';
export const GET_WIF_KEY = 'GET_WIF_KEY';
export const GET_PEERS_LIST = 'GET_PEERS_LIST';
export const GET_DEBUG_LOG = 'GET_DEBUG_LOG';
export const BASILISK_REFRESH = 'BASILISK_REFRESH';
export const BASILISK_CONNECTION = 'BASILISK_CONNECTION';
export const SYNCING_FULL_MODE = 'SYNCING_FULL_MODE';
export const SYNCING_NATIVE_MODE = 'SYNCING_NATIVE_MODE';
export const ACTIVE_COIN_GET_ADDRESSES = 'ACTIVE_COIN_GET_ADDRESSES';
export const START_INTERVAL= 'START_INTERVAL';
export const STOP_INTERVAL= 'STOP_INTERVAL';
export const DASHBOARD_ACTIVE_SECTION = 'DASHBOARD_ACTIVE_SECTION';
export const DASHBOARD_ACTIVE_TXINFO_MODAL = 'DASHBOARD_ACTIVE_TXINFO_MODAL';
export const DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE = 'DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE';
export const DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY = 'DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY';

export function toggleDashboardActiveSection(name) {
  return {
    type: DASHBOARD_ACTIVE_SECTION,
    section: name,
  }
}

export function toggleDashboardTxInfoModal(display) {
  return {
    type: DASHBOARD_ACTIVE_TXINFO_MODAL,
    showTransactionInfo: display,
  }
}

function basiliskConnectionState(display, json) {
  return {
    type: BASILISK_CONNECTION,
    basiliskConnection: display,
    progress: json,
  }
}

function basiliskRefreshState(display, json) {
  return {
    type: BASILISK_REFRESH,
    basiliskRefresh: display,
    progress: json,
  }
}

export function basiliskRefresh(display) {
  return dispatch => {
    dispatch(basiliskRefreshState(display));
  }
}

export function basiliskConnection(display) {
  return dispatch => {
    dispatch(basiliskConnectionState(display));
  }
}

export function syncingNativeModeState(display, json) {
  return {
    type: SYNCING_FULL_MODE,
    syncingNativeMode: display,
    progress: json,
  }
}

export function syncingFullModeState(display, json) {
  return {
    type: SYNCING_NATIVE_MODE,
    syncingFullMode: display,
    progress: json,
  }
}

function atomicState(json) {
  return {
    type: ATOMIC,
    response: json,
  }
}

function toggleSendCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_SEND_FORM,
    send: display,
  }
}

function toggleReceiveCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
    receive: display,
  }
}

function toggleSendReceiveCoinFormsState() {
  return {
    type: DASHBOARD_ACTIVE_COIN_RESET_FORMS,
    send: false,
    receive: false,
  }
}

function triggerToaster(display, message, title, _type) {
  return {
    type: TOASTER_MESSAGE,
    display,
    message,
    title,
    _type,
  }
}

function toggleAddcoinModalState(display, isLogin) {
  return {
    type: DISPLAY_ADDCOIN_MODAL,
    display: display,
    isLogin: isLogin,
  }
}

function dashboardCoinsState(json) {
  return {
    type: GET_ACTIVE_COINS,
    coins: json,
    activeCoins: Object.keys(json.native).length || Object.keys(json.basilisk).length || Object.keys(json.full).length ? true : false
  }
}

function iguanaWalletPassphraseState(json, dispatch) {
  console.log('iguanaWalletPassphraseState', json);
  sessionStorage.setItem('IguanaActiveAccount', JSON.stringify(json));
  dispatch(triggerToaster(true, translate('TOASTR.LOGIN_SUCCESSFULL'), translate('TOASTR.ACCOUNT_NOTIFICATION'), 'success'));

  return {
    type: LOGIN,
    isLoggedIn: json && json.pubkey ? true : false,
  }
}

function iguanaActiveHandleState(json) {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: sessionStorage.getItem('IguanaActiveAccount') && JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey === json.pubkey && json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

function getMainAddressState(json) {
  return {
    type: GET_MAIN_ADDRESS,
    activeHandle: json,
  }
}

export function toggleSendCoinForm(display) {
  return dispatch => {
    dispatch(toggleSendCoinFormState(display));
  }
}

export function toggleReceiveCoinForm(display) {
  return dispatch => {
    dispatch(toggleReceiveCoinFormState(display));
  }
}

export function toggleSendReceiveCoinForms() {
  return dispatch => {
    dispatch(toggleSendReceiveCoinFormsState());
  }
}

function logoutState(json, dispatch) {
  console.log('passp', json);
  sessionStorage.removeItem('IguanaActiveAccount');

  return {
    type: LOGIN,
    isLoggedIn: false,
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutState());
  }
}

function dashboardChangeSectionState(sectionName) {
  return {
    type: DASHBOARD_SECTION_CHANGE,
    activeSection: sectionName,
  }
}

export function dashboardChangeSection(sectionName) {
  return dispatch => {
    dispatch(dashboardChangeSectionState(sectionName));
  }
}

function dashboardChangeActiveCoinState(coin, mode) {
  return {
    type: DASHBOARD_ACTIVE_COIN_CHANGE,
    coin: coin,
    mode: mode,
  }
}

function iguanaEdexBalanceState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_BALANCE,
    balance: json && json.result ? json.result : 0,
  }
}

export function dashboardChangeActiveCoin(coin, mode) {
  return dispatch => {
    dispatch(dashboardChangeActiveCoinState(coin, mode));
  }
}

export function toggleAddcoinModal(display, isLogin) {
  return dispatch => {
    dispatch(toggleAddcoinModalState(display, isLogin));
  }
}

export function copyCoinAddress(address) {
  var _result = copyToClipboard(address);

  if (_result) {
    return dispatch => {
      dispatch(triggerToaster(true, translate('DASHBOARD.ADDR_COPIED'), translate('TOASTR.COIN_NOTIFICATION'), 'success'));
    }
  } else {
    return dispatch => {
      dispatch(triggerToaster(true, 'Couldn\'t copy address to clipboard', translate('TOASTR.COIN_NOTIFICATION'), 'error'));
    }
  }
}

export function dismissToasterMessage() {
  return dispatch => {
    dispatch(triggerToaster(false))
  }
}

export function addCoin(coin, mode) {
	console.log('coin, mode', coin + ' ' + mode);
  if (mode === '-1') {
    return dispatch => {
      dispatch(shepherdGetConfig(coin, mode));
    }
  } else {
    if (checkCoinType(coin) === 'currency_ac') {
      var _acData = startCurrencyAssetChain('', coin, mode);
      return dispatch => {
        dispatch(iguanaAddCoin(coin, mode, _acData));
      }
    }
    if (checkCoinType(coin) === 'ac') {
      var _acData = startAssetChain('', coin, mode);
      return dispatch => {
        dispatch(iguanaAddCoin(coin, mode, _acData));
      }
    }
    if (checkCoinType(coin) === 'crypto') {
      var _acData = startCrypto('', coin, mode);
      return dispatch => {
        dispatch(iguanaAddCoin(coin, mode, _acData));
      }
    }
  }
}

export function iguanaAddCoin(coin, mode, acData) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(acData),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('TOASTR.FAILED_TO_ADDCOIN'), translate('TOASTR.ACCOUNT_NOTIFICATION'), 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(addCoinResult(coin, mode, acData)));
  }
}

export function shepherdHerd(coin, mode, path) {
  var acData;
  var herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      '-ac_name=' + coin,
      '-addnode=78.47.196.146'
    ]
  };

  if (coin === 'ZEC') {
    herdData = {
      'ac_name': 'zcashd',
      'ac_options': [
        '-daemon=0',
        '-server=1'
      ]
    };
  }

  if (coin === 'KMD') {
    herdData = {
      'ac_name': 'komodod',
      'ac_options': [
        '-daemon=0',
        '-addnode=78.47.196.146'
      ]
    };
  }

  if (checkCoinType(coin) === 'crypto') {
    acData = startCrypto(path.result, coin, mode);
  }
  if (checkCoinType(coin) === 'currency_ac') {
    acData = startCurrencyAssetChain(path.result, coin, mode);
  }
  if (checkCoinType(coin) === 'ac') {
    acData = startAssetChain(path.result, coin, mode);
    var supply = startAssetChain(path.result, coin, mode, true);
    herdData.ac_options.push('-ac_supply=' + supply);
  }

  console.log('herdData', herdData);
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/herd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'herd': coin !== 'ZEC' ? 'komodod' : 'zcashd',
        'options': herdData
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('FAILED_SHEPHERD_HERD'), translate('TOASTR.SERVICE_NOTIFICATION'), 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaAddCoin(coin, mode, acData)));
  }
}

export function addCoinResult(coin, mode) {
  const modeToValue = {
    '1': 'full',
    '0': 'basilisk',
    '-1': 'native'
  };

  return dispatch => {
    dispatch(triggerToaster(true, coin + ' ' + translate('TOASTR.STARTED_IN') + ' ' + modeToValue[mode] + ' ' + translate('TOASTR.MODE'), translate('TOASTR.COIN_NOTIFICATION'), 'success'));
    dispatch(toggleAddcoinModal(false, false));
    dispatch(getDexCoins());
  }
}

export function _shepherdGetConfig(coin, mode) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/getconf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'chain': 'komodod' })
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Failed to get mode config', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(shepherdHerd(coin, mode, json)));
  }
}

// TODO: fix setconf/getconf KMD

export function shepherdGetConfig(coin, mode) {
  if (coin === 'KMD' && mode === '-1') {
    return dispatch => {
      return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/getconf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'chain': 'komodod' })
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'Failed to get KMD config', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => dispatch(shepherdHerd(coin, mode, json)))
    }
  } else {
    return dispatch => {
    	return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/getconf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'chain': coin })
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'Failed to get mode config', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => dispatch(shepherdHerd(coin, mode, json)));
    }
  }
}

export function getDexCoins() {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      //mode: 'no-cors'
      body: JSON.stringify({
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'agent': 'InstantDEX',
        'method': 'allcoins',
      })
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Error getDexCoins', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(dashboardCoinsState(json)));
  }
}

function rpcErrorHandler(json, dispatch) {
  console.log('json', json);
  if (json && json.error) {
    if (json.error === 'bitcoinrpc needs coin that is active') {
      dispatch(triggerToaster(true, 'No active coin', translate('TOASTR.SERVICE_NOTIFICATION'), 'error'));
    }
  }
}

export function iguanaWalletPassphrase(_passphrase) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify({
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'handle': '',
        'password': _passphrase,
        'timeout': '2592000',
        'agent': 'bitcoinrpc',
        'method': 'walletpassphrase'
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Error iguanaWalletPassphrase', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaWalletPassphraseState(json, dispatch)));
  }
}

export function iguanaActiveHandle(getMainAddress) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify({
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'agent': 'SuperNET',
        'method': 'activehandle'
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('TOASTR.IGUANA_ARE_YOU_SURE'), translate('TOASTR.SERVICE_NOTIFICATION'), 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getMainAddress ? getMainAddressState(json) : iguanaActiveHandleState(json)));
  }
}

export function iguanaEdexBalance(coin) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify({
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'agent': 'bitcoinrpc',
        'method': 'getbalance',
        'coin': coin
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Error iguanaEdexBalance', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaEdexBalanceState(json)));
  }
}

export function atomic(payload) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, payload.method, 'Atomic explore error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(atomicState(json)));
  }
}

export function settingsWifkeyState(json, coin) {
  return {
    type: GET_WIF_KEY,
    wifkey: json[coin + 'wif'],
    address: json[coin],
  }
}

export function encryptWallet(_passphrase, cb, coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'bitcoinrpc',
    'method': 'encryptwallet',
    'passphrase': _passphrase
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'encryptWallet', 'Error', 'error'));
    })
    .then(dispatch(walletPassphrase(_passphrase)))
    .then(response => response.json())
    .then(json => dispatch(cb.call(this, json, coin)));
  }
}

export function walletPassphrase(_passphrase) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'bitcoinrpc',
    'method': 'walletpassphrase',
    'password': _passphrase,
    'timeout': '2592000'
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'walletPassphrase', 'Error', 'error'));
    })
  }
}

export function getPeersListState(json) {
  var peersList = {};

  if (json && json.rawpeers && json.rawpeers.length) {
    for (var i=0; i < json.rawpeers.length; i++) {
      peersList[json.rawpeers[i].coin] = json.rawpeers[i].peers;
    }
  }
  return {
    type: GET_PEERS_LIST,
    supernetPeers: json && json.supernet[0] ? json.supernet : null,
    rawPeers: peersList,
  }
}

export function getPeersList(coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'SuperNET',
    'method': 'getpeers',
    'activecoin': coin,
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getPeersList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getPeersListState(json, dispatch)))
  }
}

function addPeerNodeState(json, dispatch) {
  if (json.error === 'addnode needs active coin, do an addcoin first') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Addnode needs active coin', translate('TOASTR.SETTINGS_NOTIFICATION'), 'error'));
    }
  }
  if (json.result === 'peer was already connected') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Peer was already connected', translate('TOASTR.SETTINGS_NOTIFICATION'), 'warning'));
    }
  }
  if (json.result === 'addnode connection was already pending') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Addnode connection was already pending', translate('TOASTR.SETTINGS_NOTIFICATION'), 'warning'));
    }
  }
  if (json.result === 'addnode submitted') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Peer is added', translate('TOASTR.SETTINGS_NOTIFICATION'), 'success'));
    }
  }
}

export function addPeerNode(coin, ip) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'iguana',
    'method': 'addnode',
    'activecoin': coin,
    'ipaddr': ip
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'addPeerNode', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(addPeerNodeState(json, dispatch)))
  }
}

export function getAddressesByAccountState(json, coin, mode) {
  if (mode === 'basilisk') {
    getDexBalance(coin, mode, json.result);
  }

  return {
    type: ACTIVE_COIN_GET_ADDRESSES,
    addresses: json.result,
  }
}

export function getAddressesByAccount(coin, mode) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'agent': 'bitcoinrpc',
    'method': 'getaddressesbyaccount',
    'account': '*'
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getAddressesByAccount', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getAddressesByAccountState(json, coin, mode, dispatch)))
  }
}

function getDexNotariesState(json, dispatch) {
  return dispatch => {
    dispatch(triggerToaster(true, 'Notaries list received', translate('TOASTR.BASILISK_NOTIFICATION'), 'success'));
  }
}

export function getDexNotaries(coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'getnotaries',
    'symbol': coin
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getDexNotaries', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getDexNotariesState(json, dispatch)))
  }
}

export function startInterval(name, handle) {
  return {
    type: START_INTERVAL,
    name,
    handle,
  }
}

export function stopInterval(name, intervals) {
  clearInterval(intervals[name]);

  return {
    type: STOP_INTERVAL,
    name,
  }
}

function getSyncInfoState(json) {
  return {
    type: SYNCING_FULL_MODE,
    progress: json,
  }
}

export function getSyncInfo(coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'agent': 'bitcoinrpc',
    'method': 'getinfo',
    'immediate': 100,
    'timeout': 4000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getSyncInfo', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getSyncInfoState(json, dispatch)))
  }
}

function getDebugLogState(json) {
  const _data = json.result.replace('\n', '\r\n');

  return {
    type: GET_DEBUG_LOG,
    data: _data,
  }
}

export function getDebugLog(target, linesCount) {
  const payload = {
    'herdname': target,
    'lastLines': linesCount
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/debuglog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getDebugLog', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getDebugLogState(json)))
  }
}

function parseImportPrivKeyResponse(json, dispatch) {
  if (json.error === 'illegal privkey') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Illegal privkey', translate('TOASTR.SETTINGS_NOTIFICATION'), 'error'));
    }
  }
  if (json.error === 'privkey already in wallet') {
    return dispatch => {
      dispatch(triggerToaster(true, 'Privkey already in wallet', translate('TOASTR.SETTINGS_NOTIFICATION'), 'warning'));
    }
  }
  if (json && json.result !== undefined && json.result == 'success') {
    return dispatch => {
      dispatch(triggerToaster(true, translate('TOASTR.PRIV_KEY_IMPORTED'), translate('TOASTR.SETTINGS_NOTIFICATION'), 'success'));
    }
  }
}

export function importPrivKey(wifKey) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'method': 'importprivkey',
    'params': [
      wifKey,
      'imported'
    ]
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'importPrivKey', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(parseImportPrivKeyResponse(json, dispatch)))
    .catch(function(ex) {
      dispatch(parseImportPrivKeyResponse({ 'error': 'privkey already in wallet' }, dispatch));
      console.log('parsing failed', ex);
    })
  }
}

export function shepherdGetSysInfo() {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/sysinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Failed to get sys info', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(shepherdHerd(coin, mode, json)));
  }
}

export function getSyncInfoNativeKMD() {
  const coin = 'KMD';

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort + '/api/dex/getinfo?userpass=tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth') + '&symbol=' + coin, {
      method: 'GET',
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getSyncInfoNativeKMD', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getSyncInfoNativeState({ 'remoteKMDNode': json })))
    .then(dispatch(getDebugLog('komodo', 1)))
  }
}

function getSyncInfoNativeState(json) {
  if (json && json.error) {
    return getSyncInfoNativeKMD();
  } else {
    return {
      type: SYNCING_NATIVE_MODE,
      progress: json,
    }
  }
}

function getPassthruAgent(coin) {
  var passthru_agent;

  if ( coin === 'KMD') { passthru_agent = 'komodo'; };
  if ( coin === 'ZEC') { passthru_agent = 'zcash'; };

  if (checkAC(coin)) { passthru_agent = 'iguana'; };

  return passthru_agent;
}

export function getSyncInfoNative(coin) {
  var payload = {};

  payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': getPassthruAgent(coin),
    'method': 'passthru',
    'asset': coin,
    'function': 'getinfo',
    'hex': ''
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getSyncInfo', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getSyncInfoNativeState(json, dispatch)))
  }
}

export function getDexBalance(coin, addr) {
  Promise.all(addr.map((_addr, index) => {
    const payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': 'dex',
      'method': 'listunspent',
      'address': _addr,
      'symbol': coin
    };
    console.log('addr', _addr);
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'getDexBalance', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => console.log(json))
      //.then(json => dispatch(getSyncInfoState(json, dispatch)))

      resolve(index);
    });
  }))
  .then(result => {
    console.log(result);
  });
}

export function getKMDBalanceTotal(coin) {
  var payload;

  if ( coin !== 'KMD' && coin !== 'ZEC' ) {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': 'iguana',
      'method': 'passthru',
      'asset': coin,
      'function': 'z_gettotalbalance',
      'hex': '3000'
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'function': 'z_gettotalbalance',
      'hex': '3000'
    };
  }

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getKMDBalanceTotal', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(function(json) { // TODO: figure out why komodod spits out "parse error"
      if (json && !json.error) {
        dispatch(getNativeBalancesState(json));
      }
    })
  }
}

export function getNativeBalancesState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
    balance: json && !json.error ? json : 0,
  }
}

export function getNativeTxHistory(coin) {
  var payload;

  if (getPassthruAgent(coin) === 'iguana') {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': 'iguana',
      'method': 'passthru',
      'asset': coin,
      'function': 'listtransactions',
      'hex': ''
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'function': 'listtransactions',
      'hex': ''
    };
  }

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getNativeTxHistory', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getNativeTxHistoryState(json)))
  }
}

export function getNativeTxHistoryState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
    txhistory: json && !json.error ? json : 0,
  }
}

/*function Shepherd_SendPendValue() {
  Shepherd_SysInfo().then(function(result){
    var ram_data = formatBytes(result.totalmem_bytes)
    var pend_val = null;
    if (ram_data.size === 'GB') {
      if (ram_data.ramsize >= '63' ) { pend_val = 16; }
      if (ram_data.ramsize >= '31' ) { pend_val = 8; }
      if (ram_data.ramsize >= '15' ) { pend_val = 4; }
      if (ram_data.ramsize <= '15' ) { pend_val = 1; }
    } else { pend_val = 1; }
    sessionStorage.setItem('IguanaPendValue', pend_val);
  })
}*/