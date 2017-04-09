import { START_INTERVAL, STOP_INTERVAL } from '../actions/actionCreators'

export function Interval(state = {
  interval: {},
}, action) {
  switch (action.type) {
    case START_INTERVAL:
      var newIntervalState = Object.assign({}, state.interval);
      newIntervalState[action.name] = action.handle;

      return Object.assign({}, state, {
        interval: newIntervalState,
      });
    case STOP_INTERVAL:
      var newIntervalState = Object.assign({}, state.interval);
      newIntervalState[action.name] = null;

      return Object.assign({}, state, {
        interval: newIntervalState,
      });
    default:
      return state;
  }
}

export default Interval;
