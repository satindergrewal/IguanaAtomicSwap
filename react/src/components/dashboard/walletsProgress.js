import React from 'react';
import { translate } from '../../translate/translate';

class WalletsProgress extends React.Component {
  constructor(props) {
    super(props);
    this.isFullySynced = this.isFullySynced.bind(this);
  }

  isFullySynced() {
    if ((Number(this.props.Dashboard.progress.balances) +
        Number(this.props.Dashboard.progress.validated) +
        Number(this.props.Dashboard.progress.bundles) +
        Number(this.props.Dashboard.progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.mode === 'full' &&
        this.props.Dashboard.progress) {
      if (this.props.Dashboard.progress &&
          this.props.Dashboard.progress.error) {
        return (
          <div className="text-align-center padding-10">{ translate('INDEX.COIN_IS_BUSY') }</div>
        );
      } else {
        return (
          <div id="edex-footer" className="margin-bottom-20">
            <div className="row no-space">
              <div id="currency-progressbars">
                <div className="progress progress-sm">
                  <div className={ 'full-width font-size-80-percent ' + (this.isFullySynced() ? 'progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success' : 'hide') }>
                    { translate('INDEX.BUNDLES') } <span id="currency-bundles-percent">({ this.props.ActiveCoin.coin }) 100.00% - ( { this.props.Dashboard.progress.blocks } / { this.props.Dashboard.progress.blocks } ) ==&gt;&gt; RT{ this.props.Dashboard.progress.RTheight }</span>
                  </div>
                  <div
                    className={ 'font-size-80-percent ' + (this.isFullySynced() ? 'hide' : 'progress-bar progress-bar-info progress-bar-striped active') }
                    style={{ width: this.props.Dashboard.progress.bundles + '%' }}>
                    { translate('INDEX.BUNDLES') } { this.props.Dashboard.progress.bundles }%
                  </div>
                </div>
              </div>
              <div className={ this.isFullySynced() ? 'hide' : '' }>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar progress-bar-warning progress-bar-striped active font-size-80-percent"
                    style={{ width: this.props.Dashboard.progress.utxo + '%' }}>
                    utxo { this.props.Dashboard.progress.utxo }%
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar progress-bar-danger progress-bar-striped active font-size-80-percent"
                    style={{ width: this.props.Dashboard.progress.balances + '%' }}>
                    { translate('INDEX.BALANCES') } { this.props.Dashboard.progress.balances }%
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar progress-bar-success progress-bar-striped active font-size-80-percent"
                    style={{ width: this.props.Dashboard.progress.validated + '%' }}>
                    { translate('INDEX.VALIDATED') } { this.props.Dashboard.progress.validated }%
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}

export default WalletsProgress;
