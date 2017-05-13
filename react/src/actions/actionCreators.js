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
export const DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS = 'DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS';
export const DASHBOARD_ACTIVE_COIN_SENDTO = 'DASHBOARD_ACTIVE_COIN_SENDTO';
export const DASHBOARD_ACTIVE_COIN_GET_CACHE = 'DASHBOARD_ACTIVE_COIN_GET_CACHE';
export const DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR = 'DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR';
export const DASHBOARD_GET_NOTARIES_LIST = 'DASHBOARD_GET_NOTARIES_LIST';
export const DASHBOARD_DISPLAY_NOTARIES_MODAL = 'DASHBOARD_DISPLAY_NOTARIES_MODAL';
export const DASHBOARD_CONNECT_NOTARIES = 'DASHBOARD_CONNECT_NOTARIES';
export const VIEW_CACHE_DATA = 'VIEW_CACHE_DATA';
export const SYNC_ONLY_MODAL_TOGGLE = 'SYNC_ONLY_MODAL_TOGGLE';
export const SYNC_ONLY_DATA = 'SYNC_ONLY_DATA';
export const LOAD_APP_CONFIG = 'LOAD_APP_CONFIG';
export const SAVE_APP_CONFIG = 'SAVE_APP_CONFIG';
export const SERVICE_ERROR = 'SERVICE_ERROR';
export const DASHBOARD_ACTIVE_ADDRESS = 'DASHBOARD_ACTIVE_ADDRESS';
export const LOAD_APP_INFO = 'LOAD_APP_INFO';

var iguanaForks = {}; // forks in mem array

export function changeActiveAddress(address) {
  return {
    type: DASHBOARD_ACTIVE_ADDRESS,
    address,
  }
}

function updateErrosStack(method) {
  return {
    apiMethod: method,
  }
}

export function toggleSyncOnlyModal(display) {
  return {
    type: SYNC_ONLY_MODAL_TOGGLE,
    display,
  }
}

export function toggleViewCacheModal(display) {
  return {
    type: VIEW_CACHE_DATA,
    display,
  }
}

export function displayNotariesModal(display) {
  return {
    type: DASHBOARD_DISPLAY_NOTARIES_MODAL,
    display,
  }
}

export function changeMainBasiliskAddress(address) {
  return {
    type: DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR,
    address,
  }
}

export function toggleDashboardActiveSection(name) {
  return {
    type: DASHBOARD_ACTIVE_SECTION,
    section: name,
  }
}

export function toggleDashboardTxInfoModal(display, txIndex) {
  return {
    type: DASHBOARD_ACTIVE_TXINFO_MODAL,
    showTransactionInfo: display,
    showTransactionInfoTxIndex: txIndex,
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

export function triggerToaster(display, message, title, _type) {
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

export function addCoin(coin, mode, syncOnly, port) {
	console.log('coin, mode, syncOnly', coin + ' ' + mode + ' ' + syncOnly);
  /*startIguanaInstance(mode, coin)
  .then(function(json) {
    console.log('addCoin+startIguanaInstance', json);
  });*/
  if (mode === '-1') {
    return dispatch => {
      dispatch(shepherdGetConfig(coin, mode));
    }
  } else {
    if (checkCoinType(coin) === 'currency_ac') {
      const _acData = startCurrencyAssetChain('', coin, mode);

      return dispatch => {
        dispatch(iguanaAddCoin(coin, mode, _acData));
      }
    }
    if (checkCoinType(coin) === 'ac') {
      const _acData = startAssetChain('', coin, mode);

      return dispatch => {
        dispatch(iguanaAddCoin(coin, mode, _acData));
      }
    }
    if (checkCoinType(coin) === 'crypto') {
      const _acData = startCrypto('', coin, mode);

      if (syncOnly) {
        const modeToValue = {
          '1': 'full',
          '0': 'basilisk',
          '-1': 'native'
        };

        return dispatch => {
          startIguanaInstance(modeToValue[mode] + '/sync', coin)
          .then(function(json) {
            setTimeout(function() {
              console.log('started ' + coin + ' / ' + modeToValue[mode] + ' fork', json);
              dispatch(iguanaAddCoin(coin, mode, _acData, json.result));
            }, 2000);
          });
        }
      } else {
        if (port) {
          return dispatch => {
            dispatch(iguanaAddCoin(coin, mode, _acData, port));
          }
        } else {
          return dispatch => {
            dispatch(iguanaAddCoin(coin, mode, _acData));
          }
        }
      }
    }
  }
}

export function iguanaAddCoin(coin, mode, acData, port) {
  function _iguanaAddCoin(dispatch) {
    return fetch('http://127.0.0.1:' + (port ? port : Config.iguanaCorePort), {
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

  if (mode === 0) {
    return dispatch => {
      return _iguanaAddCoin(dispatch);
      /*startIguanaInstance('basilisk', 'basilisk')
      .then(function(json) {
        _iguanaAddCoin(dispatch);
      });*/
    }
  } else {
    return dispatch => {
      return _iguanaAddCoin(dispatch);
    }
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
        'immediate': 60000,
        'timeout': 60000
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
        'method': 'walletpassphrase',
        'immediate': 60000,
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
        'method': 'activehandle',
        'immediate': 60000,
        'timeout': 60000
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(updateErrosStack('activeHandle'));
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
        'coin': coin,
        'immediate': 60000,
        'timeout': 60000
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
    'passphrase': _passphrase,
    'immediate': 60000,
    'timeout': 60000
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
    'timeout': '2592000',
    'immediate': 60000,
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

export function getFullTransactionsList(coin) {
/*params = {
  'userpass': tmpIguanaRPCAuth,
  'agent': 'dex',
  'method': 'listtransactions',
  'address': coinaddr_value,
  'count': 100,
  'skip': 0,
  'symbol': coin
};*/
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'method': 'listtransactions',
    'params': [
      0,
      9999999,
      []
    ],
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getFullTransactionsList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getNativeTxHistoryState(json)))
  }
}

export function getBasiliskTransactionsList(coin, address) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'listtransactions',
    'address': address,
    'count': 100,
    'skip': 0,
    'symbol': coin,
    'immediate': 60000,
    'timeout': 60000
  };

  //if (sessionStorage.getItem('useCache')) {
    const pubkey = JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey;

    return dispatch => {
      return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/cache?pubkey=' + pubkey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'getBasiliskTransactionsList+cache', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.result && !json.result.basilisk && json.result.indexOf('no file with handle') > -1) {
          console.log('new cache');
        }

        json = json.result.basilisk;
        if (json[coin][address].listtransactions) {
          dispatch(getNativeTxHistoryState({ 'result': json[coin][address].listtransactions.data }));
        }
      })
    }
  /*} else {
    return dispatch => {
      return fetch('http://127.0.0.1:' + (Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort), {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'getBasiliskTransactionsList', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => dispatch(getNativeTxHistoryState(json)))
    }
  }*/
}

export function getPeersList(coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'SuperNET',
    'method': 'getpeers',
    'activecoin': coin,
    'immediate': 60000,
    'timeout': 60000
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
    'ipaddr': ip,
    'immediate': 60000,
    'timeout': 60000
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
  if (mode === 'full') {
    let publicAddressArray = [];

    for (let i = 0; i < json.result.length; i++) {
      publicAddressArray.push({
        'address': json.result[i],
        'amount': 'N/A'
      });
    }

    json.result = publicAddressArray;
  }

  if (mode === 'basilisk') {
    getDexBalance(coin, mode, json.result);
  }

  return {
    type: ACTIVE_COIN_GET_ADDRESSES,
    addresses: { 'public': json.result },
  }
}

export function getAddressesByAccount(coin, mode) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'agent': 'bitcoinrpc',
    'method': 'getaddressesbyaccount',
    'account': '*',
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(updateErrosStack('activeHandle'));
      dispatch(triggerToaster(true, 'getAddressesByAccount', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getAddressesByAccountState(json, coin, mode, dispatch)))
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

// TODO: add custom json parser
function getSyncInfoState(json) {
  try {
    JSON.parse(json);
    json = JSON.parse(json);
  } catch(e) {
    //
  }

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
    'immediate': 60000,
    'timeout': 60000
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
    .then(function(response) {
      const _response = response.text().then(function(text) { return text; });

      return _response;
    })
    .then(function(json) {
      if (json.indexOf('coin is busy processing') === -1) {
        dispatch(getSyncInfoState(json, dispatch));
      }
    })
  }
}

function getKMDAddressesNativeState(json) {
  return {
    type: ACTIVE_COIN_GET_ADDRESSES,
    addresses: json,
  }
}

export function getKMDAddressesNative(coin, mode, currentAddress) {
  const type = ['public', 'private'];

  if (mode !== 'native') {
    type.pop();
  }

  return dispatch => {
    Promise.all(type.map((_type, index) => {
      return new Promise((resolve, reject) => {
        var payload,
            ajax_data_to_hex = '',
            ajax_function_input = '',
            tmplistaddr_hex_input = '',
            passthru_agent = getPassthruAgent(coin),
            tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

        if ( _type === 'public' ) {
          ajax_function_input = 'getaddressesbyaccount';
          tmplistaddr_hex_input = '222200';
        }
        if ( _type === 'private' ) {
          ajax_function_input = 'z_listaddresses';
          tmplistaddr_hex_input = '';
        }

        if (passthru_agent === 'iguana') {
          payload = {
            'userpass': tmpIguanaRPCAuth,
            'agent': passthru_agent,
            'method': 'passthru',
            'asset': coin,
            'function': ajax_function_input,
            'hex': tmplistaddr_hex_input,
            'immediate': 60000,
            'timeout': 60000
          };
        } else {
          payload = {
            'userpass': tmpIguanaRPCAuth,
            'agent': passthru_agent,
            'method': 'passthru',
            'function': ajax_function_input,
            'hex': tmplistaddr_hex_input,
            'immediate': 60000,
            'timeout': 60000
          };
        }

        if (mode === 'full' || mode === 'basilisk') {
          payload = {
            'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
            'coin': coin,
            'agent': 'bitcoinrpc',
            'method': 'getaddressesbyaccount',
            'account': '*',
            'immediate': 60000,
            'timeout': 60000
          };
        }

        if (/*sessionStorage.getItem('useCache') &&*/ mode === 'basilisk') {
          const pubkey = JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey;

          fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/cache?pubkey=' + pubkey, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .catch(function(error) {
            console.log(error);
            dispatch(triggerToaster(true, 'getKMDAddressesNative+addresslist+cache', 'Error', 'error'));
          })
          .then(response => response.json())
          .then(function(json) {
            json = json.result.basilisk;

            if (json[coin].addresses) {
              resolve({ 'result': json[coin].addresses });
            }
          })
        } else {
          fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
            method: 'POST',
            body: JSON.stringify(payload),
          })
          .catch(function(error) {
            console.log(error);
            dispatch(triggerToaster(true, 'getKMDAddressesNative', 'Error', 'error'));
          })
          .then(response => response.json())
          .then(json => resolve(json))
        }
      });
    }))
    .then(result => {
      // TODO: split into 2 functions
      const passthru_agent = getPassthruAgent(coin),
            tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
      var payload;

      if (passthru_agent === 'iguana') {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'agent': passthru_agent,
          'method': 'passthru',
          'asset': coin,
          'function': 'listunspent',
          'hex': '',
          'immediate': 60000,
          'timeout': 60000
        };
      } else {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'agent': passthru_agent,
          'method': 'passthru',
          'function': 'listunspent',
          'hex': '',
          'immediate': 60000,
          'timeout': 60000
        };
      }

      if (mode === 'full') {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'coin': coin,
          'method': 'listunspent',
          'params': [
            1,
            9999999,
          ],
          'immediate': 60000,
          'timeout': 60000
        };
      }

      // if api cache option is off
      if (mode === 'basilisk') {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'agent': 'dex',
          'method': 'listunspent',
          'address': currentAddress,
          'symbol': coin,
          'immediate': 60000,
          'timeout': 60000
        };
      }

      function calcBalance(result, json, dispatch, mode) {
        //console.log('result', result);
        if (mode === 'full' || mode === 'basilisk') {
          result[0] = result[0].result;
        }

        //console.log('calc result', result);
        //console.log('calc json', json);

        if (mode !== 'basilisk' && json && json.length) {
          const allAddrArray = json.map(res => res.address).filter((x, i, a) => a.indexOf(x) == i);

          for (let a=0; a < allAddrArray.length; a++) {
            const filteredArray = json.filter(res => res.address === allAddrArray[a]).map(res => res.amount);

            let isNewAddr = true;
            for (let x=0; x < result.length && isNewAddr; x++) {
              for (let y=0; y < result[x].length && isNewAddr; y++) {
                if (allAddrArray[a] === result[x][y]) {
                  isNewAddr = false;
                }
              }
            }

            if (isNewAddr) {
              if (allAddrArray[a].substring(0, 2) === 'zc' || allAddrArray[a].substring(0, 2) === 'zt') {
                result[1][result[1].length] = allAddrArray[a];
              } else {
                result[0][result[0].length] = allAddrArray[a];
              }
              console.log('new addr ' + allAddrArray[a] + ' | ' + allAddrArray[a].substring(0, 2));
            }
          }
        }

        let newAddressArray = [];

        for (let a=0; a < result.length; a++) {
          newAddressArray[a] = [];

          for (let b=0; b < result[a].length; b++) {
            var filteredArray;

            if (mode === 'basilisk') {
              filteredArray = json.map(res => res.amount);
            } else {
              filteredArray = json.filter(res => res.address === result[a][b]).map(res => res.amount);
            }
            //console.log('filteredArray', filteredArray);
            //console.log('addr', result[a][b]);

            let sum = 0;

            for (let i=0; i < filteredArray.length; i++) {
              sum += filteredArray[i];
            }

            newAddressArray[a][b] = {
              address: result[a][b],
              amount: currentAddress === result[a][b] || mode === 'native' ? sum : 'N/A',
            };
          }
        }

        dispatch(getKMDAddressesNativeState({
          'public': newAddressArray[0],
          'private': newAddressArray[1]
        }));
      }

      if (/*sessionStorage.getItem('useCache') &&*/ mode === 'basilisk') {
        const pubkey = JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey;

        fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/cache?pubkey=' + pubkey, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .catch(function(error) {
          console.log(error);
          dispatch(triggerToaster(true, 'getKMDAddressesNative+addresslist+cache', 'Error', 'error'));
        })
        .then(response => response.json())
        .then(function(json) {
          var updatedCache = Object.assign({}, json.result);
          json = json.result.basilisk;
          // if listunspent is not in cache file retrieve new copy
          // otherwise read from cache data
          if (json[coin][currentAddress].refresh) {
            calcBalance(result, json[coin][currentAddress].refresh.data, dispatch, mode);
          } else {
            fetch('http://127.0.0.1:' + (Config.useBasiliskInstance && mode === 'basilisk' ? Config.basiliskPort : Config.iguanaCorePort), {
              method: 'POST',
              body: JSON.stringify(payload),
            })
            .catch(function(error) {
              console.log(error);
              dispatch(triggerToaster(true, 'getKMDAddressesNative+Balance', 'Error', 'error'));
            })
            .then(response => response.json())
            .then(function(json) {
              updatedCache.basilisk[coin][currentAddress].refresh = {
                'data': json,
                'status': 'done',
                'timestamp': Date.now(),
              };
              dispatch(shepherdGroomPost(pubkey, updatedCache));
              calcBalance(result, json, dispatch, mode);
            })
          }
        })
      } else {
        fetch('http://127.0.0.1:' + (Config.useBasiliskInstance && mode === 'basilisk' ? Config.basiliskPort : Config.iguanaCorePort), {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        .catch(function(error) {
          console.log(error);
          dispatch(triggerToaster(true, 'getKMDAddressesNative+Balance', 'Error', 'error'));
        })
        .then(response => response.json())
        .then(function(json) {
          calcBalance(result, json, dispatch, mode);
        })
      }
    })
  }
}

export function shepherdGroomPost(_filename, _payload) {
  console.log('shepherdGroomPost to file ', _filename);
  console.log('shepherdGroomPost payload ', _payload);

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/groom/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'filename': _filename,
        'payload': JSON.stringify(_payload),
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'shepherdGroomPost', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }
}

export function shepherdGroomPostPromise(_filename, _payload) {
  console.log('shepherdGroomPostPromise to file ', _filename);
  console.log('shepherdGroomPostPromise payload ', _payload);

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/groom/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'filename': _filename,
        'payload': JSON.stringify(_payload),
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'shepherdGroomPostPromise', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  })
}

export function fetchUtxoCache(_payload) {
  const _userpass = '?userpass=tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        _pubkey = '&pubkey=' + _payload.pubkey,
        _route = _payload.allcoins ? 'cache-all' : 'cache-one',
        _coin = '&coin=' + _payload.coin,
        _calls = '&calls=' + _payload.calls,
        _address = _payload.address ? ('&address=' + _payload.address) : '',
        _iguanaInstancePort = Config.useBasiliskInstance ? '&port=' + Config.basiliskPort : '';

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/' + _route + _userpass + _pubkey + _coin + _calls + _address + _iguanaInstancePort, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'fetchNewCacheData', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getShepherdCache(_pubkey)))
  }
}

function getShepherdCacheState(json, pubkey, coin) {
  if (json.result && json.error && json.result.indexOf('no file with handle') > -1) {
    console.log('request new cache', true);
    return dispatch => {
      dispatch(fetchNewCacheData({
        'pubkey': pubkey,
        'allcoins': false,
        'coin': coin,
        'calls': 'listtransactions:getbalance:listunspent',
      }));
    }
  } else {
    return {
      type: DASHBOARD_ACTIVE_COIN_GET_CACHE,
      cache: json && json.result && json.result.basilisk ? json.result.basilisk : null,
    }
  }
}

export function getShepherdCache(pubkey, coin) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/cache?pubkey=' + pubkey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getShepherdCache', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getShepherdCacheState(json, pubkey, coin)))
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
    ],
    'immediate': 60000,
    'timeout': 60000
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
    'hex': '',
    'immediate': 60000,
    'timeout': 60000
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
      'symbol': coin,
      'immediate': 60000,
      'timeout': 60000
    };
    console.log('addr', _addr);
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:' + (Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort), {
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
      'hex': '3000',
      'timeout': 60000
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'function': 'z_gettotalbalance',
      'hex': '3000',
      'timeout': 60000
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
      'hex': '',
      'immediate': 60000,
      'timeout': 60000
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'function': 'listtransactions',
      'hex': '',
      'immediate': 60000,
      'timeout': 60000
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
  if (json && json.error) {
    json = null;
  } else if (json && json.result) {
    json = json.result;
  } else if (!json.length) {
    json = 'no data';
  }

  return {
    type: DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
    txhistory: json,
  }
}

function handleGetNewKMDAddresses(pubpriv, coin, dispatch) {
  dispatch(triggerToaster(true, translate('KMD_NATIVE.NEW_ADDR_GENERATED'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
  dispatch(getKMDAddressesNative(coin));

  return {};
}

export function getNewKMDAddresses(coin, pubpriv) {
  var payload,
      ajax_function_input = '';

  if ( pubpriv === 'public' ) {
    ajax_function_input = 'getnewaddress';
  }
  if ( pubpriv === 'private' ) {
    ajax_function_input = 'z_getnewaddress';
  }

  if (getPassthruAgent(coin) === 'iguana') {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'asset': coin,
      'function': ajax_function_input,
      'hex': '',
      'immediate': 60000,
      'timeout': 60000
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': coin,
      'method': 'passthru',
      'function': ajax_function_input,
      'hex': '',
      'immediate': 60000,
      'timeout': 60000
    };
  }

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getNewKMDAddresses', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(handleGetNewKMDAddresses(pubpriv, coin, dispatch)))
    .catch(function(ex) {
      dispatch(handleGetNewKMDAddresses(pubpriv, coin, dispatch))
    })
  }
}

export function iguanaHashHex(data) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'hash',
    'method': 'hex',
    'message': data,
    'immediate': 60000,
    'timeout': 60000
  };

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'iguanaHashHex', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json.hex))
  })
}

export function sendNativeTx(coin, _payload) {
  const ajax_data_to_hex = '["' + _payload.sendFrom + '",[{"address":"' + _payload.sendTo + '","amount":' + (Number(_payload.amount) - Number(_payload.fee)) + '}]]';
  var payload;

  return dispatch => {
    return iguanaHashHex(ajax_data_to_hex).then((hashHexJson) => {
      console.log('sendNativeTx', hashHexJson);

      if (getPassthruAgent(coin) == 'iguana') {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'agent': getPassthruAgent(coin),
          'method': 'passthru',
          'asset': coin,
          'function': 'z_sendmany',
          'hex': hashHexJson,
          'immediate': 60000,
          'timeout': 60000
        };
      } else {
        payload = {
          'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
          'agent': getPassthruAgent(coin),
          'method': 'passthru',
          'function': 'z_sendmany',
          'hex': hashHexJson,
          'immediate': 60000,
          'timeout': 60000
        };
      }

      fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'sendNativeTx', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(function(json) {
        if (json.error && json.error.toString().indexOf('code:') > -1) {
          dispatch(triggerToaster(true, 'Send failed', translate('TOASTR.WALLET_NOTIFICATION'), 'error'));
        } else {
          dispatch(triggerToaster(true, translate('TOASTR.TX_SENT_ALT'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
        }
      })
      .catch(function(ex) {
        dispatch(triggerToaster(true, translate('TOASTR.TX_SENT_ALT'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
        console.log('parsing failed', ex);
      })
    });
  }
}

export function getKMDOPIDState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS,
    opids: json,
  }
}

export function getKMDOPID(opid, coin) {
  var tmpopid_output = '',
      ajax_data_to_hex;

  if ( opid === undefined ) {
    ajax_data_to_hex = null;
  } else {
    ajax_data_to_hex = '["' + opid + '"]';
  }

  return dispatch => {
    return iguanaHashHex(ajax_data_to_hex).then((hashHexJson) => {
      if (hashHexJson === '5b226e756c6c225d00') {
        hashHexJson = '';
      }

      var payload,
          passthru_agent = getPassthruAgent(coin),
          tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

      if (passthru_agent == 'iguana') {
        payload = {
          'userpass': tmpIguanaRPCAuth,
          'agent': passthru_agent,
          'method': 'passthru',
          'asset': coin,
          'function': 'z_getoperationstatus',
          'hex': hashHexJson,
          'immediate': 60000,
          'timeout': 60000
        };
      } else {
        payload = {
          'userpass': tmpIguanaRPCAuth,
          'agent': passthru_agent,
          'method': 'passthru',
          'function': 'z_getoperationstatus',
          'hex': hashHexJson,
          'immediate': 60000,
          'timeout': 60000
        };
      }

      fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(triggerToaster(true, 'getKMDOPID', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => dispatch(getKMDOPIDState(json)))
    })
  }
}

function sendToAddressState(json, dispatch) {
  if (json && json.error) {
    dispatch(triggerToaster(true, json.error, 'Error', 'error'));

    return {
      type: DASHBOARD_ACTIVE_COIN_SENDTO,
      lastSendToResponse: json,
    }
  } else if (json && json.result && json.complete) {
    dispatch(triggerToaster(true, translate('TOASTR.TX_SENT_ALT'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));

    return {
      type: DASHBOARD_ACTIVE_COIN_SENDTO,
      lastSendToResponse: json,
    }
  }
}

export function sendToAddressStateAlt(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_SENDTO,
    lastSendToResponse: json,
  }
}

export function clearLastSendToResponseState() {
  return {
    type: DASHBOARD_ACTIVE_COIN_SENDTO,
    lastSendToResponse: null,
  }
}

export function sendToAddress(coin, _payload) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'method': 'sendtoaddress',
    'params': [
      _payload.sendTo,
      _payload.amount,
      'EasyDEX',
      'EasyDEXTransaction'
    ],
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'sendToAddress', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(sendToAddressState(json, dispatch)))
  }
}

export function sendFromAddress(coin, _payload) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'coin': coin,
    'method': 'sendfrom',
    'params': [
      _payload.sendFrom,
      _payload.sendTo,
      _payload.amount,
      'EasyDEX',
      'EasyDEXTransaction'
    ],
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'sendFromAddress', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(sendToAddressState(json, dispatch)))
  }
}

function checkAddressBasiliskHandle(json) {
  if (json && json.error) {
    return dispatch => {
      dispatch(triggerToaster(true, json.error, translate('TOASTR.WALLET_NOTIFICATION'), 'error'));
    }
  }

  if (json && json.coin && json.randipbits) {
    return dispatch => {
      dispatch(triggerToaster(true, 'Address already registered', translate('TOASTR.WALLET_NOTIFICATION'), 'warning'));
    }
  }
}

export function checkAddressBasilisk(coin, address) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'checkaddress',
    'address': address,
    'symbol': coin,
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + (Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort), {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'checkAddressBasilisk', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(checkAddressBasiliskHandle(json)))
  }
}

function validateAddressBasiliskHandle(json) {
  return dispatch => {
    if (json.iswatchonly === true) {
      dispatch(triggerToaster(true, translate('TOASTR.VALIDATION_SUCCESS'), translate('TOASTR.BASILISK_NOTIFICATION'), 'error'));
    }
    if (json.iswatchonly === false) {
      dispatch(triggerToaster(true, translate('TOASTR.ADDR_ISNT_REG'), translate('TOASTR.BASILISK_NOTIFICATION'), 'error'));
    }
    if (json.iswatchonly === undefined) {
      dispatch(triggerToaster(true, translate('TOASTR.INVALID_QUERY_ALT'), translate('TOASTR.BASILISK_NOTIFICATION'), 'error'));
    }
    if (json.error === 'less than required responses') {
      dispatch(triggerToaster(true, translate('TOASTR.LESS_RESPONSES_REQ'), translate('TOASTR.BASILISK_NOTIFICATION'), 'error'));
    }
  }
}

export function validateAddressBasilisk(coin, address) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'validateaddress',
    'address': address,
    'symbol': coin,
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + (Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort), {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'validateAddressBasilisk', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(validateAddressBasiliskHandle(json)))
  }
}

function getDexNotariesState(json) {
  if (json.error === 'less than required responses') {
    return dispatch => {
      dispatch(triggerToaster(true, translate('TOASTR.LESS_RESPONSES_REQ'), translate('TOASTR.BASILISK_NOTIFICATION'), 'error'));
    }
  } else {
    return {
      type: DASHBOARD_GET_NOTARIES_LIST,
      notaries: json,
    }
  }
}

export function getDexNotaries(coin) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'getnotaries',
    'symbol': coin,
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + (Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort), {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getDexNotaries', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getDexNotariesState(json)))
  }
}

function createNewWalletState(json) {
  if (json && json.result && json.result === 'success') {
    return dispatch => {
      dispatch(triggerToaster(true, translate('TOASTR.WALLET_CREATED_SUCCESFULLY'), translate('TOASTR.ACCOUNT_NOTIFICATION'), 'success'));
    }
  } else {
    return dispatch => {
      dispatch(triggerToaster(true, 'Couldn\'t create new wallet seed', translate('TOASTR.ACCOUNT_NOTIFICATION'), 'error'));
    }
  }
}

export function createNewWallet(_passphrase) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'bitcoinrpc',
    'method': 'encryptwallet',
    'passphrase': _passphrase,
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'createNewWallet', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(createNewWalletState(json)))
  }
}

export function deleteCacheFile(_payload) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/groom?', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'filename': _payload.pubkey }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'deleteCacheFile', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(fetchNewCacheData(_payload)));
  }
}

export function getCacheFile(pubkey) {
  const _pubkey = pubkey || JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey;

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/groom?filename=' + _pubkey, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getCacheFile', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => resolve(json))
  })
}

export function fetchNewCacheData(_payload) {
  console.log('fetchNewCacheData', true);
  const _userpass = '?userpass=tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        _pubkey = '&pubkey=' + _payload.pubkey,
        _route = _payload.allcoins ? 'cache-all' : 'cache-one',
        _coin = '&coin=' + _payload.coin,
        _calls = '&calls=' + _payload.calls,
        _address = _payload.address ? ('&address=' + _payload.address) : '',
        _iguanaInstancePort = Config.useBasiliskInstance ? '&port=' + Config.basiliskPort : '';

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/' + _route + _userpass + _pubkey + _coin + _calls + _address + _iguanaInstancePort, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'fetchNewCacheData', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }
}

function initNotaryNodesConSequence(nodes) {
  return dispatch => {
    Promise.all(nodes.map((node, index) => {
      const payload = {
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'agent': 'dex',
        'method': 'getinfo',
        'symbol': node,
        'immediate': 60000,
        'timeout': 60000
      };

      return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:' + Config.useBasiliskInstance ? Config.basiliskPort : Config.iguanaCorePort, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        .catch(function(error) {
          console.log(error);
          dispatch(triggerToaster(true, 'getInfoDexNode+' + node, 'Error', 'error'));
        })
        .then(response => response.json())
        .then(json => dispatch(updateNotaryNodeConState(json, nodes.length, index, node)))
      });
    }));
  }
}

function updateNotaryNodeConState(json, totalNodes, currentNodeIndex, currentNodeName) {
  if (currentNodeIndex === totalNodes - 1) {
    return dispatch => {
      dispatch(basiliskConnectionState(false));
    };
  } else {
    if (json && json.error === 'less than required responses') {
      return {
        type: DASHBOARD_CONNECT_NOTARIES,
        total: totalNodes - 1,
        current: currentNodeIndex,
        name: currentNodeName,
        failedNode: currentNodeName,
      }
    } else {
      return {
        type: DASHBOARD_CONNECT_NOTARIES,
        total: totalNodes - 1,
        current: currentNodeIndex,
        name: currentNodeName,
      }
    }
  }
}

function connectAllNotaryNodes(json, dispatch) {
  if (json && json.length) {
    dispatch(initNotaryNodesConSequence(json));

    return {
      type: DASHBOARD_CONNECT_NOTARIES,
      total: json.length - 1,
      current: 0,
      name: json[0],
    }
  }
}

export function startIguanaInstance(mode, coin) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/forks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode,
        coin
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'startIguanaInstance', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function getIguanaInstancesList() {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/forks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getIguanaInstanceList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function restartIguanaInstance(pmid) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/forks/restart?pmid=' + pmid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      /*body: JSON.stringify({
        mode,
        coin
      }),*/
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'restartIguanaInstance', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function restartBasiliskInstance() {
  return dispatch => {
    getIguanaInstancesList()
    .then(function(json) {
      for (let port in json.result) {
        if (json.result[port].mode === 'basilisk') {
          restartIguanaInstance(json.result[port].pmid)
          .then(function(json) {
            console.log('restartBasiliskInstance', json);
          });
        }
      }
    });
  }
}

export function resolveOpenAliasAddress(email) {
  const url = email.replace('@', '.');

  return new Promise((resolve, reject) => {
    fetch('https://dns.google.com/resolve?name=' + url + '&type=txt', {
      method: 'GET',
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'resolveOpenAliasAddress', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function connectNotaries() {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dpow',
    'method': 'notarychains,',
    'immediate': 60000,
    'timeout': 60000
  };

  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'connectNotaries', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(connectAllNotaryNodes(json, dispatch)))
  }
}

export function iguanaUTXORawTX(data) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'symbol': data.coin,
    'agent': 'basilisk',
    'method': 'utxorawtx',
    'vals': {
      'timelock': 0,
      'changeaddr': data.sendfrom,
      'destaddr': data.sendtoaddr,
      'txfee': data.txfee,
      'amount': data.amount,
      'sendflag': data.sendsig
    },
    'utxos': data.utxos,
    'immediate': 60000,
    'timeout': 60000
  };
  console.log('iguanaUTXORawTXExport', payload);

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'iguanaUTXORawTX', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function dexSendRawTX(data) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'agent': 'dex',
    'method': 'sendrawtransaction',
    'signedtx': data.signedtx,
    'symbol': data.coin
  };

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'dexSendRawTX', 'Error', 'error'));
    })
    .then(function(response) {
      const _response = response.text().then(function(text) { return text; });

      return _response;
    })
    .then(function(json) {
      resolve(json);
    })
    //.then(response => response.json())
    //.then(json => resolve(json))
  });
}

export function edexGetTransaction(data) {
  const payload = {
    'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
    'symbol': data.coin,
    'agent': 'dex',
    'method': 'gettransaction',
    'vout': 1,
    'txid': data.txid
  };
  console.log('edexGetTransaction', payload);

  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.iguanaCorePort, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'edexGetTransaction', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function saveAppConfig(_payload) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/appconf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': _payload }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'saveAppConfig', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getAppConfig()))
  }
}

function getAppConfigState(json) {
  return {
    type: LOAD_APP_CONFIG,
    config: json,
  }
}

export function getAppConfig() {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/appconf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getAppConfig', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getAppConfigState(json)))
  }
}

function getSyncOnlyForksState(json) {
  /*try {
    JSON.parse(json.result);
  } catch(e) {
    console.log(e);
  }*/

  return {
    type: SYNC_ONLY_DATA,
    forks: JSON.parse(json.result),
  }
}

export function getSyncOnlyForks() {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/forks/info/show', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getSyncOnlyForks', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getSyncOnlyForksState(json)))
  }
}

export function stopIguanaFork(pmid) {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/forks/stop?pmid=' + pmid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'stopIguanaFork', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(triggerToaster(true, 'Iguana instance is stopped', translate('TOASTR.SERVICE_NOTIFICATION'), 'success')))
  }
}

export function shepherdGetCoinList() {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/coinslist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'shepherdGetCoinList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdPostCoinList(data) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/coinslist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': data }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'shepherdPostCoinList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

function getAppInfoState(json) {
  return {
    type: LOAD_APP_INFO,
    info: json,
  }
}

export function getAppInfo() {
  return dispatch => {
    return fetch('http://127.0.0.1:' + Config.agamaPort + '/shepherd/appinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'getAppInfo', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getAppInfoState(json)))
  }
}