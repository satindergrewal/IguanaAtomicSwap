import { DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS } from '../storeType';
import { translate } from '../../translate/translate';
import {
  triggerToaster,
  Config,
  getPassthruAgent,
  iguanaHashHex
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function sendNativeTx(coin, _payload) {
  let ajaxDataToHex;
  let payload;
  let _apiMethod;

  if (_payload.addressType === 'public' && _payload.sendTo.length !== 95) {
    _apiMethod = 'sendtoaddress';
    ajaxDataToHex = `["${_payload.sendTo}", ${Number(_payload.amount) - Number(_payload.fee)}]`;
  } else {
    _apiMethod = 'z_sendmany';
    ajaxDataToHex = `["${_payload.sendFrom}", [{"address": "${_payload.sendTo}", "amount": ${Number(_payload.amount) - Number(_payload.fee)}}]]`;
  }

  return dispatch => {
    return iguanaHashHex(ajaxDataToHex, dispatch).then((hashHexJson) => {
      if (getPassthruAgent(coin) === 'iguana') {
        payload = {
          'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
          'agent': getPassthruAgent(coin),
          'method': 'passthru',
          'asset': coin,
          'function': _apiMethod,
          'hex': hashHexJson,
        };
      } else {
        payload = {
          'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
          'agent': getPassthruAgent(coin),
          'method': 'passthru',
          'function': _apiMethod,
          'hex': hashHexJson,
        };
      }

      const _timestamp = Date.now();
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'function': 'sendNativeTx',
        'type': 'post',
        'url': `http://127.0.0.1:${Config.iguanaCorePort}`,
        'payload': payload,
        'status': 'pending',
      }));

      fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(logGuiHttp({
          'timestamp': _timestamp,
          'status': 'error',
          'response': error,
        }));
        dispatch(triggerToaster(true, 'sendNativeTx', 'Error', 'error'));
      })
      .then(function(response) {
        if (_apiMethod === 'sendtoaddress') {
          const _response = response.text().then(function(text) { return text; });

          console.log('native sendtoaddress', _response);
          return _response;
        } else {
          return response.json();
        }
      })
      .then(function(json) {
        dispatch(logGuiHttp({
          'timestamp': _timestamp,
          'status': 'success',
          'response': json,
        }));

        if (json.error &&
            json.error.toString().indexOf('code:') > -1) {
          dispatch(triggerToaster(true, 'Send failed', translate('TOASTR.WALLET_NOTIFICATION'), 'error'));
        } else {
          dispatch(triggerToaster(true, translate('TOASTR.TX_SENT_ALT'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
        }
      })
    });
  }
}

export function getKMDOPIDState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS,
    opids: json,
  }
}

export function getKMDOPID(opid, coin) {
  let tmpopidOutput = '',
      ajaxDataToHex;

  if (opid === undefined) {
    ajaxDataToHex = null;
  } else {
    ajaxDataToHex = `["${opid}"]`;
  }

  return dispatch => {
    return iguanaHashHex(ajaxDataToHex, dispatch).then((hashHexJson) => {
      if (hashHexJson === '5b226e756c6c225d00') {
        hashHexJson = '';
      }

      let payload,
          passthruAgent = getPassthruAgent(coin),
          tmpIguanaRPCAuth = `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`;

      if (passthruAgent == 'iguana') {
        payload = {
          'userpass': tmpIguanaRPCAuth,
          'agent': passthruAgent,
          'method': 'passthru',
          'asset': coin,
          'function': 'z_getoperationstatus',
          'hex': hashHexJson,
        };
      } else {
        payload = {
          'userpass': tmpIguanaRPCAuth,
          'agent': passthruAgent,
          'method': 'passthru',
          'function': 'z_getoperationstatus',
          'hex': hashHexJson,
        };
      }

      const _timestamp = Date.now();
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'function': 'getKMDOPID',
        'type': 'post',
        'url': `http://127.0.0.1:${Config.iguanaCorePort}`,
        'payload': payload,
        'status': 'pending',
      }));

      fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(logGuiHttp({
          'timestamp': _timestamp,
          'status': 'error',
          'response': error,
        }));
        dispatch(triggerToaster(true, 'getKMDOPID', 'Error', 'error'));
      })
      .then(response => response.json())
      .then(json => {
        dispatch(logGuiHttp({
          'timestamp': _timestamp,
          'status': 'success',
          'response': json,
        }));
        dispatch(getKMDOPIDState(json));
      })
    })
  }
}