import 'whatwg-fetch';
import { startCurrencyAssetChain, startAssetChain, startCrypto, checkCoinType } from '../components/addcoin/payload';
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

function toggleSendCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_SEND_FORM,
    send: display,
  }
}

function toggleReceiveCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_SEND_FORM,
    send: display,
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
      dispatch(triggerToaster(true, translate('DASHBOARD.ADDR_COPIED'), translate('TOASTR.COIN_NOTIFICATION'), 'success'))
    }
  } else {
    return dispatch => {
      dispatch(triggerToaster(true, 'Couldn\'t copy address to clipboard', translate('TOASTR.COIN_NOTIFICATION'), 'error'))
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
    return fetch('http://127.0.0.1:7778', {
      method: 'POST',
      body: JSON.stringify(acData),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('TOASTR.FAILED_TO_ADDCOIN'), translate('TOASTR.ACCOUNT_NOTIFICATION'), 'error'))
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
    return fetch('http://127.0.0.1:17777/shepherd/herd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'herd': coin !== 'zcashd' ? 'komodod' : 'zcashd',
        'options': herdData
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('FAILED_SHEPHERD_HERD'), translate('TOASTR.SERVICE_NOTIFICATION'), 'error'))
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

export function shepherdGetConfig(coin, mode) {
  return dispatch => {
  	return fetch('http://127.0.0.1:17777/shepherd/getconf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'chain': coin })
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Failed to get mode config', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(shepherdHerd(coin, mode, json)));
  }
}

export function getDexCoins() {
  return dispatch => {
    return fetch('http://127.0.0.1:7778', {
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
      dispatch(triggerToaster(true, 'Error getDexCoins', 'Error', 'error'))

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
    return fetch('http://127.0.0.1:7778', {
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
      dispatch(triggerToaster(true, 'Error iguanaWalletPassphrase', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaWalletPassphraseState(json, dispatch)));
  }
}

export function iguanaActiveHandle(getMainAddress) {
  return dispatch => {
    return fetch('http://127.0.0.1:7778', {
      method: 'POST',
      body: JSON.stringify({
        'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
        'agent': 'SuperNET',
        'method': 'activehandle'
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Error iguanaActiveHandle', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(getMainAddress ? getMainAddressState(json) : iguanaActiveHandleState(json)));
  }
}

export function iguanaEdexBalance(coin) {
  return dispatch => {
    return fetch('http://127.0.0.1:7778', {
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
      dispatch(triggerToaster(true, 'Error iguanaEdexBalance', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaEdexBalanceState(json)));
  }
}

/*function Shepherd_SysInfo() {
  return new Promise((resolve) => {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:17777/shepherd/sysinfo',
      contentType: 'application/json' // send as JSON
    })
    .done(function(data) {
      resolve(data);
    });
  });
}

function Shepherd_SendPendValue() {
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