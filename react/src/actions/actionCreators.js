import 'whatwg-fetch';
import { startCurrencyAssetChain } from '../components/addcoin/payload';
import { translate } from '../translate/translate';

export const TOASTER_MESSAGE = 'TOASTER_MESSAGE';
export const DISPLAY_ADDCOIN_MODAL = 'DISPLAY_ADDCOIN_MODAL';

function triggerToaster(display, message, title, _type) {
  return {
    type: TOASTER_MESSAGE,
    display,
    message,
    title,
    _type,
  }
}

function toggleAddcoinModalState(display, isLogin) {
  return {
    type: DISPLAY_ADDCOIN_MODAL,
    display: display,
    isLogin: isLogin,
  }
}

export function toggleAddcoinModal(display, isLogin) {
  return dispatch => {
    dispatch(toggleAddcoinModalState(display, isLogin));
  }
}

export function addCoin(coin, mode) {
	console.log('coin, mode', coin + ' ' + mode);
  return dispatch => {
    dispatch(shepherdGetConfig(coin, mode));
  }
}

export function iguanaAddCoin(coin, mode, acData) {
  console.log('acData', acData);
  return dispatch => {
    return fetch('http://127.0.0.1:7778', {
      method: 'POST',
      body: JSON.stringify(acData),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('TOASTR.FAILED_TO_ADDCOIN'), translate('TOASTR.ACCOUNT_NOTIFICATION'), 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(addCoinResult(coin, mode, acData)));
  }
}

export function shepherdHerd(coin, mode, path) {
  const herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      '-ac_name=' + coin,
      '-addnode=78.47.196.146'
    ]
  };
  const acData = startCurrencyAssetChain(path.result, coin, mode);

  console.log('herdData', herdData);
  return dispatch => {
    return fetch('http://127.0.0.1:17777/shepherd/herd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'herd': coin !== 'zcashd' ? 'komodod' : 'zcashd',
        'options': herdData
      }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster(true, translate('FAILED_SHEPHERD_HERD'), translate('TOASTR.SERVICE_NOTIFICATION'), 'error'))
    })
    .then(response => response.json())
    .then(json => dispatch(iguanaAddCoin(coin, mode, acData)));
  }
}

export function addCoinResult(coin, mode) {
  const modeToValue = {
    'full': 1,
    'basilisk': 0,
    'native': -1,
  };

  return dispatch => {
    //dispatch(shepherdGetConfig(coin, mode));
    dispatch(triggerToaster(true, coin + ' ' + translate('TOASTR.COIN_STARTED') + modeToValue[defaultMode] + ' ' + translate('TOASTR.MODE'), translate('TOASTR.COIN_NOTIFICATION'), 'success'));
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
    .then(json => dispatch(shepherdHerd(coin, mode, json)));
  }
}
