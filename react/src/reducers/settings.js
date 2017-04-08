import { GET_WIF_KEY, GET_PEERS_LIST, GET_DEBUG_LOG } from '../actions/actionCreators';

export function Settings(state = {
  wifkey: null,
  address: null,
  debugLog: null,
}, action) {
  switch (action.type) {
    case GET_WIF_KEY:
      return Object.assign({}, state, {
        wifkey: action.wifkey,
        address: action.address,
      });
    case GET_PEERS_LIST:
      return Object.assign({}, state, {
        supernetPeers: action.supernetPeers,
        rawPeers: action.rawPeers,
      });
    case GET_DEBUG_LOG:
      return Object.assign({}, state, {
        debugLog: action.data,
      });
    default:
      return state;
  }
}

export default Settings;
