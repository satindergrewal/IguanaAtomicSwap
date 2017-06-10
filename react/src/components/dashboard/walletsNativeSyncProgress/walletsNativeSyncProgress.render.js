import React from 'react';
import { translate } from '../../../translate/translate';

export const ChainActivationNotificationRender = function() {
  return (
    <div className="alert alert-info alert-dismissible margin-bottom-40">
      <button className="close" type="button">
        <span>×</span>
      </button>
      <h4>
        { translate('INDEX.ACTIVATING_CHAIN') }{ this.renderActivatingBestChainProgress() }
      </h4>
      <p>{ this.renderLB('INDEX.KMD_STARTED') }</p>
    </div>
  );
};

export const WalletsNativeSyncProgressRender = function() {
  return (
    <div>
      { this.renderChainActivationNotification() }
      <div className="row sync-progress-container">
        <div className="col-xs-12">
          <div className="progress">
            { this.renderSyncPercentagePlaceholder() }
          </div>
        </div>
      </div>
    </div>
  );
};