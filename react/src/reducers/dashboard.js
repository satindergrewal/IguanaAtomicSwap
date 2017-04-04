import { DASHBOARD_SECTION_CHANGE, GET_MAIN_ADDRESS } from '../actions/actionCreators';

export function Dashboard(state = {
  activeSection: 'wallets',
  activeHandle: null,
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
    default:
      return state;
  }
}

export default Dashboard;
