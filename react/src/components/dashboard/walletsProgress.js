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
      if (this.props.Dashboard.progress && this.props.Dashboard.progress.error) {
        return (<div style={{textAlign: 'center', padding: '10px'}}>{translate('INDEX.COIN_IS_BUSY')}</div>);
      } else {
        return (
          <div id="edex-footer" style={{marginBottom: '20px'}}>
            <div className="row no-space">
              <div id="currency-progressbars">
                <div className="progress progress-sm">
                  <div className={this.isFullySynced() ? 'progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success' : 'hide'} style={{width: '100%', fontSize: '80%'}} role="progressbar" id="currency-bundles">
                    {translate('INDEX.BUNDLES')} <span id="currency-bundles-percent">({this.props.ActiveCoin.coin}) 100.00% - ( {this.props.Dashboard.progress.blocks} / {this.props.Dashboard.progress.blocks} ) ==&gt;&gt; RT{this.props.Dashboard.progress.RTheight}</span>
                  </div>
                  <div className={this.isFullySynced() ? 'hide' : 'progress-bar progress-bar-info progress-bar-striped active'} style={{width: this.props.Dashboard.progress.bundles + '%', fontSize: '80%'}} role="progressbar" id="currency-bundles">
                    {translate('INDEX.BUNDLES')} <span id="currency-bundles-percent">{this.props.Dashboard.progress.bundles}%</span>
                  </div>
                </div>
              </div>
              <div id="additional-progress-bars" className={this.isFullySynced() ? 'hide' : ''}>
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: this.props.Dashboard.progress.utxo + '%', fontSize: '80%'}} role="progressbar" id="currency-utxo">
                    utxo <span id="currency-utxo-percent">{this.props.Dashboard.progress.utxo}%</span>
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width: this.props.Dashboard.progress.balances + '%', fontSize: '80%'}} role="progressbar" id="currency-balances">
                    {translate('INDEX.BALANCES')} <span id="currency-balances-percent">{this.props.Dashboard.progress.balances}%</span>
                  </div>
                </div>
                <div className="progress progress-sm">
                  <div className="progress-bar progress-bar-success progress-bar-striped active" style={{width: this.props.Dashboard.progress.validated + '%', fontSize: '80%'}} role="progressbar" id="currency-validated">
                    {translate('INDEX.VALIDATED')} <span id="currency-validated-percent">{this.props.Dashboard.progress.validated}%</span>
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