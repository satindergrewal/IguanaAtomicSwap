import {  } from '../actions/actionCreators';

export function toaster(state = {
}, action) {
  switch (action.type) {
    case '1234':
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}

export default toaster;
