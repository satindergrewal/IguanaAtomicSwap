import {
  triggerToaster,
  Config
} from '../actionCreators';
import { CLI } from '../storeType';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function shepherdCliPromise(mode, chain, cmd) {
  const _payload = {
    mode,
    chain,
    cmd
  };

  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/cli`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': _payload }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('shepherdCli', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdCli(mode, chain, cmd) {
  const _payload = {
    mode,
    chain,
    cmd
  };

  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/cli`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': _payload }),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('shepherdCli', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(cliResponseState(json)))
  }
}

export function cliResponseState(json) {
  return {
    type: CLI,
    data: json,
  }
}