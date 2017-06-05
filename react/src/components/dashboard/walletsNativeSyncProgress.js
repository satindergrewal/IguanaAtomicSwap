import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeSyncProgress extends React.Component {
  renderSyncPercentagePlaceholder() {
    if (this.props.Dashboard.progress.blocks > 0 &&
        this.props.Dashboard.progress.longestchain === 0) {
      return (
        <div className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent">
          <span className="full-width">{ translate('INDEX.SYNC_ERR_LONGESTCHAIN') }</span>
        </div>
      );
    } else if (this.props.Dashboard.progress.blocks === 0) {
      return (
        <div className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent">
          <span className="full-width">{ translate('INDEX.SYNC_ERR_BLOCKS') }</span>
        </div>
      );
    } else {
      const syncPercentage = (parseFloat(parseInt(this.props.Dashboard.progress.blocks, 10) * 100 / parseInt(this.props.Dashboard.progress.longestchain, 10)).toFixed(2) + '%').replace('NaN', 0);

      return (
        <div
          className="progress-bar progress-bar-info progress-bar-striped active font-size-80-percent"
          style={{ width: syncPercentage }}>
          <span style={{ width: syncPercentage }}>{ syncPercentage }</span> | { this.props.Dashboard.progress.blocks } / { this.props.Dashboard.progress.longestchain } | { translate('INDEX.CONNECTIONS') }: { this.props.Dashboard.progress.connections }
        </div>
      );
    }
  }

  renderActivatingBestChainProgress() {
    if (this.props.Settings &&
        this.props.Settings.debugLog) {
      if (this.props.Settings.debugLog.indexOf('UpdateTip') > -1) {
        let temp = this.props.Settings.debugLog.split(' ');
        let currentBestChain;
        let currentProgress;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('height=') > -1) {
            currentBestChain = temp[i].replace('height=', '');
          }
          if (temp[i].indexOf('progress=') > -1) {
            currentProgress = Number(temp[i].replace('progress=', '')) * 100;
          }
        }

        // fallback to local data if remote node is inaccessible
        if (this.props.Dashboard.progress.remoteKMDNode &&
            !this.props.Dashboard.progress.remoteKMDNode.blocks) {
          return (
            `: ${currentProgress}%`
          );
        } else {
          return(
            `: ${Math.floor(currentBestChain * 100 / this.props.Dashboard.progress.remoteKMDNode.blocks)}% (blocks ${currentBestChain} / ${this.props.Dashboard.progress.remoteKMDNode.blocks})`
          );
        }
      } else {
        return (
          <span>...</span>
        );
      }
    }
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span>
        { _translation }
        <br />
      </span>
    );
  }

  renderChainActivationNotification() {
    if ((!this.props.Dashboard.progress.blocks && !this.props.Dashboard.progress.longestchain) ||
        (this.props.Dashboard.progress.blocks < this.props.Dashboard.progress.longestchain)) {
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
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.Dashboard &&
        this.props.Dashboard.progress) {
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
    } else {
      return null;
    }
  }
}

export default WalletsNativeSyncProgress;
