import { DASHBOARD_SECTION_CHANGE } from '../actions/actionCreators';

export function Dashboard(state = {
  activeSection: 'wallets',
}, action) {
  switch (action.type) {
    case DASHBOARD_SECTION_CHANGE:
      return Object.assign({}, state, {
        activeSection: action.activeSection,
      });
    default:
      return state;
  }
}

export default Dashboard;
