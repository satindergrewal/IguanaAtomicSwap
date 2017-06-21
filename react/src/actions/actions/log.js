import { LOG_GUI_HTTP } from '../storeType';
import {
  triggerToaster,
  Config
} from '../actionCreators';

export function logGuiHttp(payload) {
  return dispatch => {
    dispatch(guiLogState(payload));

    // disabled for now
    /*return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/guilog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('logGuiHttp', 'Error', 'error'));
    })
    .then(response => response.json())*/
  }
}

export function getAgamaLog(type) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.agamaPort}/shepherd/getlog?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(function(error) {
      console.log(error);
      dispatch(triggerToaster('getAgamaLog', 'Error', 'error'));
    })
    .then(response => response.json())
    .then()
  }
}

export function guiLogState(logData) {
  return {
    type: LOG_GUI_HTTP,
    timestamp: logData.timestamp,
    log: {
      timestamp: logData.timestamp,
      function: logData.function,
      httpMethod: logData.type,
      url: logData.url,
      payload: logData.payload,
      status: logData.status,
      response: logData.response,
    }
  }
}