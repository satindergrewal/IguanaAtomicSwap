import {
  TOASTER_MESSAGE
} from '../actions/storeType';

export function toaster(state = {
	display: false,
	message: null,
	title: null,
	type: null,
}, action) {
  switch (action.type) {
    case TOASTER_MESSAGE:
      return Object.assign({}, state, {
      	display: action.display,
      	message: action.message,
      	title: action.title,
      	type: action._type,
      });
    default:
      return state;
  }
}

export default toaster;
