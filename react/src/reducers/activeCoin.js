import { DASHBOARD_ACTIVE_COIN_CHANGE } from '../actions/actionCreators';

export function ActiveCoin(state = {
  coin: null,
}, action) {
  switch (action.type) {
    case DASHBOARD_ACTIVE_COIN_CHANGE:
      return Object.assign({}, state, {
        coin: action.coin,
      });
    default:
      return state;
  }
}

export default ActiveCoin;
