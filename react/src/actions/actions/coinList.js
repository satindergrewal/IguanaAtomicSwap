import {
  triggerToaster,
  Config
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function shepherdGetCoinList() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('shepherdGetCoinList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdPostCoinList(data) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/coinslist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': data }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('shepherdPostCoinList', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}