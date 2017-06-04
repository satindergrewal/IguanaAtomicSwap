import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeAlert extends React.Component {
  hasNoProgress() {
    return this.props &&
      this.props.Dashboard &&
      !this.props.Dashboard.progress;
  }

  render() {
    if (this.hasNoProgress()) {
      return (
        <div role="alert" className="alert alert-danger alert-dismissible" id="extcoin-wallet-connection-alert">
          <button aria-label="Close" data-dismiss="alert" className="close" type="button">
            <span aria-hidden="true">×</span>
          </button>
          <h4>{ translate('INDEX.OOPS_ERROR') }</h4>
          <p id="extcoin-wallet-connection-alert-text">
            <span>{ translate('INDEX.OOPS_ERROR_DESC') }</span>
            <code>server=1</code><br/>
            <code>rpcport=</code><br/>
            <code>rpcuser=</code><br/>
            <code>rpcpassword=</code>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeAlert;
