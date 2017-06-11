import {
  SYNC_ONLY_MODAL_TOGGLE,
  SYNC_ONLY_DATA
} from '../storeType';
import { translate } from '../../translate/translate';
import {
  triggerToaster,
  Config
} from '../actionCreators';
import {
  logGuiHttp,
  guiLogState
} from './log';

export function toggleSyncOnlyModal(display) {
  return {
    type: SYNC_ONLY_MODAL_TOGGLE,
    display,
  }
}

function getSyncOnlyForksState(json) {
  return {
    type: SYNC_ONLY_DATA,
    forks: JSON.parse(json.result),
  }
}

export function getSyncOnlyForks() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/forks/info/show`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('getSyncOnlyForks', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(getSyncOnlyForksState(json)))
  }
}

export function stopIguanaFork(pmid) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/forks/stop?pmid=${pmid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('stopIguanaFork', 'Error', 'error'));
    })
    .then(response => response.json())
    .then(json => dispatch(triggerToaster('Iguana instance is stopped', translate('TOASTR.SERVICE_NOTIFICATION'), 'success')))
  }
}