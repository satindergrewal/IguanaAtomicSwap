import { GET_WIF_KEY } from '../actions/actionCreators';

export function Settings(state = {
  wifkey: null,
  address: null,
}, action) {
  switch (action.type) {
    case GET_WIF_KEY:
      return Object.assign({}, state, {
        wifkey: action.wifkey,
        address: action.address,
      });
    default:
      return state;
  }
}

export default Settings;
