import { copyToClipboard } from '../../util/copyToClipboard';
import { translate } from '../../translate/translate';
import { triggerToaster } from '../actionCreators';

export function copyCoinAddress(address) {
  const _result = copyToClipboard(address);

  if (_result) {
    return dispatch => {
      dispatch(triggerToaster(translate('DASHBOARD.ADDR_COPIED'), translate('TOASTR.COIN_NOTIFICATION'), 'success'));
    }
  } else {
    return dispatch => {
      dispatch(triggerToaster('Couldn\'t copy address to clipboard', translate('TOASTR.COIN_NOTIFICATION'), 'error'));
    }
  }
}