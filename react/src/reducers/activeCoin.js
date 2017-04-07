import {
  DASHBOARD_ACTIVE_COIN_CHANGE,
  DASHBOARD_ACTIVE_COIN_BALANCE,
  DASHBOARD_ACTIVE_COIN_SEND_FORM,
  DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
  DASHBOARD_ACTIVE_COIN_RESET_FORMS
} from '../actions/actionCreators';

export function ActiveCoin(state = {
  coin: null,
  mode: null,
  send: false,
  receive: false,
  balance: 0,
}, action) {
  switch (action.type) {
    case DASHBOARD_ACTIVE_COIN_CHANGE:
      return Object.assign({}, state, {
        coin: action.coin,
        mode: action.mode,
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
    default:
      return state;
  }
}

export default ActiveCoin;
