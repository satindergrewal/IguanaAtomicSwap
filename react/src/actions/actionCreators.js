import 'whatwg-fetch';

export const TOASTER_MESSAGE = 'TOASTER_MESSAGE';

function triggerToaster(display, message) {
  return {
    type: TOASTER_MESSAGE,
	display,
	message,
  }
}

export function addCoin(coin, mode) {
  return dispatch => {
    dispatch(triggerToaster(true, 'Coin ' + coin + ' added in ' + mode))
    /*return fetch(``)
      .then(response => response.json())
      .then(json => dispatch(r(json)))*/
  }
}
