import {
  DASHBOARD_SECTION_CHANGE,
  GET_MAIN_ADDRESS,
  BASILISK_REFRESH,
  SYNCING_FULL_MODE,
  SYNCING_NATIVE_MODE,
  BASILISK_CONNECTION,
  DASHBOARD_CONNECT_NOTARIES,
  VIEW_CACHE_DATA,
  LOG_GUI_HTTP,
  TOGGLE_NOTIFICATIONS_MODAL
} from '../actions/storeType';

const HTTP_STACK_MAX_ENTRIES = 150; // limit stack mem length to N records per type

const trimHTTPLogs = (logObject) => {
  const logObjectArray = Object.keys(logObject);
  
  if (logObjectArray.length - HTTP_STACK_MAX_ENTRIES === 1) {
    delete logObject[logObjectArray.shift()];
  }

  return logObject;
};

export function Dashboard(state = {
  activeSection: 'wallets',
  activeHandle: null,
  basiliskRefresh: false,
  basiliskConnection: false,
  displayViewCacheModal: false,
  connectedNotaries: {
    total: 0,
    current: 0,
    currentNodeName: null,
    failedToConnectNodes: null,
  },
  guiLog: {},
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
    case VIEW_CACHE_DATA:
      return Object.assign({}, state, {
        displayViewCacheModal: action.display,
      });
    case LOG_GUI_HTTP:
      const logState = state.guiLog;
      const actionTS = action.timestamp;
      let newLogState = {};

      if (logState[actionTS]) {
        const logItem = { [actionTS]: logState[actionTS] };
        logItem[actionTS].status = action.log.status;
        logItem[actionTS].response = action.log.response;
        newLogState = trimHTTPLogs(Object.assign({}, logState, logItem));
      } else {
        const logItem = { [actionTS]: action.log };
        newLogState = trimHTTPLogs(Object.assign({}, logState, logItem));
      }
      
      return Object.assign({}, state, {
        guiLog: newLogState,
      });
    default:
      return state;
  }
}

export default Dashboard;
