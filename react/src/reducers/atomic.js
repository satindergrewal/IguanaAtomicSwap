import { ATOMIC } from '../actions/actionCreators';

export function Atomic(state = {
  response: null,
}, action) {
  switch (action.type) {
    case ATOMIC:
      return Object.assign({}, state, {
        response: action.response,
      });
    default:
      return state;
  }
}

export default Atomic;
