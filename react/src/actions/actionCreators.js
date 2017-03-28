import 'whatwg-fetch';

export const TOASTER_MESSAGE = 'TOASTER_MESSAGE';

function triggerToaster(display, message, title, _type) {
  return {
    type: TOASTER_MESSAGE,
    display,
    message,
    title,
    _type,
  }
}

export function addCoin(coin, mode) {
	console.log('coin, mode', coin + ' ' + mode);
  return dispatch => {
    dispatch(triggerToaster(true, 'Coin ' + coin + ' added in ' + mode, 'Coin message', 'warning'))
    /*return fetch(``)
      .then(response => response.json())
      .then(json => dispatch(r(json)))*/
  }
}

export function shepherdGetConfig() {
  return dispatch => {
		return fetch('http://127.0.0.1:17777/shepherd/getconf', {
			
		})
    //.then(response => response.json())
    //.then(json => dispatch(r(json)))
  }

function Shepherd_getConf(coin) {
	var result = [],
			ajax_data = { 'chain': coin };

	console.log(ajax_data);
	$.ajax({
		async: false,
		type: 'POST',
		data: JSON.stringify(ajax_data),
		url: 'http://127.0.0.1:17777/shepherd/getconf',
		contentType: 'application/json', // send as JSON
		success: function(data, textStatus, jqXHR) {
			var AjaxOutputData = JSON.parse(data);
			console.log(AjaxOutputData.result);
			result.push({ 'path': AjaxOutputData.result });
		},
		error: function(xhr, textStatus, error) {
		}
	});

	return result;
}	
}
