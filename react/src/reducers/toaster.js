import { TOASTER_MESSAGE } from '../actions/actionCreators';

export function toaster(state = {
}, action) {
  switch (action.type) {
    case TOASTER_MESSAGE:
      return Object.assign({}, state, {
      	display: action.display,
      	message: action.message,
      });
    default:
      return state;
  }
}

export default toaster;
