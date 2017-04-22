import {
  DASHBOARD_ACTIVE_COIN_CHANGE,
  DASHBOARD_ACTIVE_COIN_BALANCE,
  DASHBOARD_ACTIVE_COIN_SEND_FORM,
  DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
  DASHBOARD_ACTIVE_COIN_RESET_FORMS,
  DASHBOARD_ACTIVE_SECTION,
  DASHBOARD_ACTIVE_TXINFO_MODAL,
  ACTIVE_COIN_GET_ADDRESSES,
  DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
  DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
  DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS,
  DASHBOARD_ACTIVE_COIN_SENDTO,
  DASHBOARD_ACTIVE_COIN_GET_CACHE,
  DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR,
  DASHBOARD_GET_NOTARIES_LIST,
  DASHBOARD_DISPLAY_NOTARIES_MODAL
} from '../actions/actionCreators';

// TODO: keep all coin data in array of objects instead of single object

export function ActiveCoin(state = {
  coin: null,
  mode: null,
  send: false,
  receive: false,
  balance: 0,
  nativeActiveSection: 'default',
  showTransactionInfo: false,
  showTransactionInfoTxIndex: null,
  txhistory: [],
  opids: null,
  lastSendToResponse: null,
  cache: null,
  mainBasiliskAddress: null,
  notaries: null,
  displayNotariesModal: false,
}, action) {
  switch (action.type) {
    case DASHBOARD_ACTIVE_COIN_CHANGE:
      return Object.assign({}, state, {
        coin: action.coin,
        mode: action.mode,
        balance: 0,
        txhistory: [],
        send: false,
        receive: false,
        showTransactionInfo: false,
        showTransactionInfoTxIndex: null,
        nativeActiveSection: 'default',
      });
    case DASHBOARD_ACTIVE_COIN_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance,
      });
    case DASHBOARD_ACTIVE_COIN_SEND_FORM:
      return Object.assign({}, state, {
        send: action.send,
        receive: false,
      });
    case DASHBOARD_ACTIVE_COIN_RECEIVE_FORM:
      return Object.assign({}, state, {
        send: false,
        receive: action.receive,
      });
    case DASHBOARD_ACTIVE_COIN_RESET_FORMS:
      return Object.assign({}, state, {
        send: false,
        receive: false,
      });
    case ACTIVE_COIN_GET_ADDRESSES:
      return Object.assign({}, state, {
        addresses: action.addresses,
      });
    case DASHBOARD_ACTIVE_SECTION:
      return Object.assign({}, state, {
        nativeActiveSection: action.section,
      });
    case DASHBOARD_ACTIVE_TXINFO_MODAL:
      return Object.assign({}, state, {
        showTransactionInfo: action.showTransactionInfo,
        showTransactionInfoTxIndex: action.showTransactionInfoTxIndex,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY:
      return Object.assign({}, state, {
        txhistory: action.txhistory,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS:
      return Object.assign({}, state, {
        opids: action.opids,
      });
    case DASHBOARD_ACTIVE_COIN_SENDTO:
      return Object.assign({}, state, {
        lastSendToResponse: action.lastSendToResponse,
      });
    case DASHBOARD_ACTIVE_COIN_GET_CACHE:
      return Object.assign({}, state, {
        cache: action.cache,
      });
    case DASHBOARD_ACTIVE_COIN_MAIN_BASILISK_ADDR:
      return Object.assign({}, state, {
        mainBasiliskAddress: action.address,
      });
    case DASHBOARD_GET_NOTARIES_LIST:
      return Object.assign({}, state, {
        notaries: action.notaries,
      });
    case DASHBOARD_DISPLAY_NOTARIES_MODAL:
      return Object.assign({}, state, {
        displayNotariesModal: action.display,
      });
    default:
      return state;
  }
}

export default ActiveCoin;
