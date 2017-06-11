import 'whatwg-fetch';
import 'bluebird';

import _config from '../config';
import { translate } from '../translate/translate';
import {
  GET_ACTIVE_COINS,
  DASHBOARD_ACTIVE_ADDRESS,
  VIEW_CACHE_DATA,
  DASHBOARD_DISPLAY_NOTARIES_MODAL,
  DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR,
  DASHBOARD_ACTIVE_SECTION,
  DASHBOARD_ACTIVE_TXINFO_MODAL,
  BASILISK_CONNECTION,
  BASILISK_REFRESH,
  SYNCING_FULL_MODE,
  SYNCING_NATIVE_MODE,
  DASHBOARD_ACTIVE_COIN_SEND_FORM,
  DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
  DASHBOARD_ACTIVE_COIN_RESET_FORMS,
  ADD_TOASTER_MESSAGE,
  REMOVE_TOASTER_MESSAGE,
  DISPLAY_ADDCOIN_MODAL,
  GET_MAIN_ADDRESS,
  DASHBOARD_SECTION_CHANGE,
  DASHBOARD_ACTIVE_COIN_CHANGE,
  ACTIVE_COIN_GET_ADDRESSES,
  DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
  START_INTERVAL,
  STOP_INTERVAL
} from './storeType';
import {
  logGuiHttp,
  getAgamaLog,
  guiLogState
} from './actions/log';

export * from './actions/nativeSyncInfo';
export * from './actions/basiliskCache';
export * from './actions/nativeSend';
export * from './actions/coinList';
export * from './actions/createWallet';
export * from './actions/nativeTxHistory';
export * from './actions/nativeBalance';
export * from './actions/nativeNewAddress';
export * from './actions/logout';
export * from './actions/basiliskProcessAddress';
export * from './actions/edexGetTx';
export * from './actions/sendFullBasilisk';
export * from './actions/settings';
export * from './actions/syncOnly';
export * from './actions/iguanaInstance';
export * from './actions/notary';
export * from './actions/edexBalance';
export * from './actions/addCoin';
export * from './actions/addressBalance';
export * from './actions/syncInfo';
export * from './actions/getAddrByAccount';
export * from './actions/atomic';
export * from './actions/walletAuth';
export * from './actions/openAlias';
export * from './actions/copyAddress';
export * from './actions/sysInfo';
export * from './actions/dexCoins';
export * from './actions/fullTxHistory';
export * from './actions/basiliskTxHistory';
export * from './actions/iguanaHelpers';
export * from './actions/cli';

export let Config;

try {
  Config = window.require('electron').remote.getCurrentWindow().appConfig;
} catch (e) {
  Config = _config;
}

export function changeActiveAddress(address) {
  return {
    type: DASHBOARD_ACTIVE_ADDRESS,
    address,
  }
}

export function updateErrosStack(method) {
  return {
    apiMethod: method,
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

export function basiliskConnectionState(display, json) {
  return {
    type: BASILISK_CONNECTION,
    basiliskConnection: display,
    progress: json,
  }
}

export function basiliskRefreshState(display, json) {
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
    type: SYNCING_NATIVE_MODE,
    syncingNativeMode: display,
    progress: json,
  }
}

export function syncingFullModeState(display, json) {
  return {
    type: SYNCING_FULL_MODE,
    syncingFullMode: display,
    progress: json,
  }
}

export function toggleSendCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_SEND_FORM,
    send: display,
  }
}

export function toggleReceiveCoinFormState(display) {
  return {
    type: DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
    receive: display,
  }
}

export function toggleSendReceiveCoinFormsState() {
  return {
    type: DASHBOARD_ACTIVE_COIN_RESET_FORMS,
    send: false,
    receive: false,
  }
}

export function triggerToaster(message, title, _type, autoClose = true) {
  return {
    type: ADD_TOASTER_MESSAGE,
    message,
    title,
    _type,
    autoClose
  }
}

// triggers removing of the toast with the provided toastId
export function dismissToaster(toastId) {
  return {
    type: REMOVE_TOASTER_MESSAGE,
    toastId: toastId
  }
}

export function toggleAddcoinModalState(display, isLogin) {
  return {
    type: DISPLAY_ADDCOIN_MODAL,
    display: display,
    isLogin: isLogin,
  }
}

export function dashboardCoinsState(json) {
  return {
    type: GET_ACTIVE_COINS,
    coins: json,
    activeCoins: Object.keys(json.native).length || Object.keys(json.basilisk).length || Object.keys(json.full).length ? true : false
  }
}

export function getMainAddressState(json) {
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

export function dashboardChangeSectionState(sectionName) {
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

export function dashboardChangeActiveCoinState(coin, mode) {
  return {
    type: DASHBOARD_ACTIVE_COIN_CHANGE,
    coin: coin,
    mode: mode,
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

export function dismissToasterMessage(toastId) {
  return dispatch => {
    dispatch(dismissToaster(toastId))
  }
}

// TODO
export function rpcErrorHandler(json, dispatch) {
  console.log('json', json);
  if (json &&
      json.error) {
    if (json.error === 'bitcoinrpc needs coin that is active') {
      dispatch(triggerToaster('No active coin', translate('TOASTR.SERVICE_NOTIFICATION'), 'error'));
    }
  }
}

export function setBasiliskMainAddress(json, coin, mode) {
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
    addresses: { 'public': [] },
  }
}

export function getNativeTxHistoryState(json) {
  if (json &&
      json.error) {
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