import 'whatwg-fetch';
import { startCurrencyAssetChain } from '../components/addcoin/payload';
import { translate } from '../translate/translate';

export const TOASTER_MESSAGE = 'TOASTER_MESSAGE';
export const DISPLAY_ADDCOIN_MODAL = 'DISPLAY_ADDCOIN_MODAL';
export const GET_ACTIVE_COINS = 'GET_ACTIVE_COINS';
export const LOGIN = 'LOGIN';
export const ACTIVE_HANDLE = 'ACTIVE_HANDLE';

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
  console.log('passp', json);
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
    isLoggedIn: JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey === json.pubkey && json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

export function toggleAddcoinModal(display, isLogin) {
  return dispatch => {
    dispatch(toggleAddcoinModalState(display, isLogin));
  }
}

export function addCoin(coin, mode) {
	console.log('coin, mode', coin + ' ' + mode);
  return dispatch => {
    dispatch(shepherdGetConfig(coin, mode));
  }
}

export function iguanaAddCoin(coin, mode, acData) {
  console.log('acData', acData);
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
  const herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      '-ac_name=' + coin,
      '-addnode=78.47.196.146'
    ]
  };
  const acData = startCurrencyAssetChain(path.result, coin, mode);

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
    'full': 1,
    'basilisk': 0,
    'native': -1,
  };

  return dispatch => {
    dispatch(triggerToaster(true, coin + ' ' + translate('TOASTR.COIN_STARTED') + modeToValue[mode] + ' ' + translate('TOASTR.MODE'), translate('TOASTR.COIN_NOTIFICATION'), 'success'));
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

export function iguanaActiveHandle() {
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
    .then(json => dispatch(iguanaActiveHandleState(json)));
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