import React from 'react';
import { translate } from '../../../translate/translate';

const WalletsNativeAlertRender = function() {
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
};

export default WalletsNativeAlertRender;