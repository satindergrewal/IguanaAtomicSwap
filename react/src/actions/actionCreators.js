import 'whatwg-fetch';
import { startCurrencyAssetChain } from '../components/addcoin/payload';

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
    dispatch(shepherdGetConfig(coin, mode));
    //dispatch(triggerToaster(true, 'Coin ' + coin + ' added in ' + mode, 'Coin message', 'warning'))
  }
}

export function addCoinResult(coin, mode, acData) {
  console.log('coin', coin);
  console.log('acData', acData);
  //console.log('coin, mode', coin + ' ' + mode);
  return dispatch => {
    //dispatch(shepherdGetConfig(coin, mode));
    dispatch(triggerToaster(true, 'Coin ' + coin + ' added in ' + mode + ' mode', 'Coin message', 'success'))
  }
}

export function shepherdGetConfig(coin, mode) {
  return dispatch => {
  	return fetch('http://127.0.0.1:17777/shepherd/getconf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      
      body: JSON.stringify({ 'chain': coin })
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, 'Failed to get mode config', 'Error', 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(addCoinResult(coin, mode, startCurrencyAssetChain(json.result, coin, mode))))
  }

/*function Shepherd_getConf(coin) {
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
}*/
}
