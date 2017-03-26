import { ADD_COIN } from '../actions/actionCreators'

export function coins(state = {
  items: []
}, action) {
  switch (action.type) {
    case ADD_COIN:
      return Object.assign({}, state, {
        items: action.coins
      });
    default:
      return state;
	}
}

export default coins;
