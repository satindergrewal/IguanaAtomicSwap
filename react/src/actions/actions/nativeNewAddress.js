import { translate } from '../../translate/translate';
import {
  triggerToaster,
  Config,
  getPassthruAgent,
  getKMDAddressesNative
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

function handleGetNewKMDAddresses(pubpriv, coin, dispatch) {
  dispatch(triggerToaster(translate('KMD_NATIVE.NEW_ADDR_GENERATED'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
  dispatch(getKMDAddressesNative(coin));

  return {};
}

export function getNewKMDAddresses(coin, pubpriv) {
  let payload,
      ajaxFunctionInput = '';

  if (pubpriv === 'public') {
    ajaxFunctionInput = 'getnewaddress';
  }
  if (pubpriv === 'private') {
    ajaxFunctionInput = 'z_getnewaddress';
  }

  if (getPassthruAgent(coin) === 'iguana') {
    payload = {
      'userpass': `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
      'agent': getPassthruAgent(coin),
      'method': 'passthru',
      'asset': coin,
      'function': ajaxFunctionInput,
      'hex': '',
    };
  } else {
    payload = {
      'userpass': 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
      'agent': coin,
      'method': 'passthru',
      'function': ajaxFunctionInput,
      'hex': '',
    };
  }

  return dispatch => {
    const _timestamp = Date.now();
    dispatch(logGuiHttp({
      'timestamp': _timestamp,
      'function': 'getNewKMDAddresses',
      'type': 'post',
      'url': `http://127.0.0.1:${Config.iguanaCorePort}`,
      'payload': payload,
      'status': 'pending',
    }));

    return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
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
      dispatch(triggerToaster('getNewKMDAddresses', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => {
      dispatch(logGuiHttp({
        'timestamp': _timestamp,
        'status': 'success',
        'response': json,
      }));
      dispatch(handleGetNewKMDAddresses(pubpriv, coin, dispatch));
    })
    .catch(function(ex) {
      dispatch(handleGetNewKMDAddresses(pubpriv, coin, dispatch))
    })
  }
}