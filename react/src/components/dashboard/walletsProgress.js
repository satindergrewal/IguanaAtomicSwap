import React from 'react';
import { translate } from '../../translate/translate';

class WalletsProgress extends React.Component {
  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.mode === 'full' && this.props.Dashboard.progress) {
      if (this.props.Dashboard.progress && this.props.Dashboard.progress.error) {
        return (<div style={{textAlign: 'center', padding: '10px'}}>Coin is busy processing</div>);
      } else {
        return (
          <div id="edex-footer" data-edexcoin="COIN">
            <div className="row no-space" data-edexcoin="COIN">
              <div data-edexcoin="COIN" id="currency-progressbars">
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-info progress-bar-striped active" style={{width: this.props.Dashboard.progress.bundles + '%', fontSize: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-bundles">
                    {translate('INDEX.BUNDLES')} <span data-edexcoin="COIN" id="currency-bundles-percent">{this.props.Dashboard.progress.bundles}%</span>
                  </div>
                </div>
              </div>
              <div data-edexcoin="COIN" id="additional-progress-bars">
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: this.props.Dashboard.progress.utxo + '%', fontSize: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-utxo">
                    utxo <span data-edexcoin="COIN" id="currency-utxo-percent">{this.props.Dashboard.progress.utxo}%</span>
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width: this.props.Dashboard.progress.balances + '%', fontSize: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-balances">
                    {translate('INDEX.BALANCES')} <span data-edexcoin="COIN" id="currency-balances-percent">{this.props.Dashboard.progress.balances}%</span>
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-success progress-bar-striped active" style={{width: this.props.Dashboard.progress.validated + '%', fontSize: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-validated">
                    {translate('INDEX.VALIDATED')} <span data-edexcoin="COIN" id="currency-validated-percent">{this.props.Dashboard.progress.validated}%</span>
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