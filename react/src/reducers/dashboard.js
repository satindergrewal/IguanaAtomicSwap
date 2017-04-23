import {
  DASHBOARD_SECTION_CHANGE,
  GET_MAIN_ADDRESS,
  BASILISK_REFRESH,
  SYNCING_FULL_MODE,
  SYNCING_NATIVE_MODE,
  BASILISK_CONNECTION,
  DASHBOARD_CONNECT_NOTARIES
} from '../actions/actionCreators';

export function Dashboard(state = {
  activeSection: 'wallets',
  activeHandle: null,
  basiliskRefresh: false,
  basiliskConnection: false,
  connectedNotaries: {
    total: 0,
    current: 0,
    currentNodeName: null,
    failedToConnectNodes: null,
  }
}, action) {
  switch (action.type) {
    case DASHBOARD_SECTION_CHANGE:
      return Object.assign({}, state, {
        activeSection: action.activeSection,
      });
    case GET_MAIN_ADDRESS:
      return Object.assign({}, state, {
        activeHandle: action.activeHandle,
      });
    case BASILISK_REFRESH:
      return Object.assign({}, state, {
        basiliskRefresh: action.basiliskRefresh,
        progress: action.progress,
      });
    case BASILISK_CONNECTION:
      return Object.assign({}, state, {
        basiliskConnection: action.basiliskConnection,
        progress: action.progress,
      });
    case SYNCING_FULL_MODE:
      return Object.assign({}, state, {
        syncingFullMode: action.syncingFullMode,
        progress: action.progress,
      });
    case SYNCING_NATIVE_MODE:
      return Object.assign({}, state, {
        syncingNativeMode: action.syncingNativeMode,
        progress: action.progress,
      });
    case DASHBOARD_CONNECT_NOTARIES:
      return Object.assign({}, state, {
        connectedNotaries: {
          total: action.total,
          current: action.current,
          currentNodeName: action.name,
          failedToConnectNodes: action.failedNode,
        }
      });
    default:
      return state;
  }
}

export default Dashboard;
