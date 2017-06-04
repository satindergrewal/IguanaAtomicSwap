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
        <div className="alert alert-danger alert-dismissible">
          <button className="close" type="button">
            <span>×</span>
          </button>
          <h4>{ translate('INDEX.OOPS_ERROR') }</h4>
          <p>
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
