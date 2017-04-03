import React from 'react';
import { translate } from '../../translate/translate';

class WalletsProgress extends React.Component {
  render() {
    return (
      <div id="edex-footer" data-edexcoin="COIN">
        <div className="row no-space" data-edexcoin="COIN">
          <div data-edexcoin="COIN" id="currency-progressbars" style={{display: 'none'}}>
            <div className="progress progress-sm">
              <div className="progress-bar progress-bar-info progress-bar-striped active" style={{width: '0%', font-size: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-bundles">
                <span data-lang="INDEX.BUNDLES"></span> <span data-edexcoin="COIN" id="currency-bundles-percent">0%</span>
              </div>
            </div>
          </div>
          <div data-edexcoin="COIN" id="additional-progress-bars" style={{display: 'none'}}>
            <div className="progress progress-sm">
              <div className="progress-bar progress-bar-warning progress-bar-striped active" style={{width: '0%', font-size: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-utxo">
                utxo <span data-edexcoin="COIN" id="currency-utxo-percent">0%</span>
              </div>
            </div>
            <div className="progress progress-sm">
              <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{width: '0%', font-size: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-balances">
                <span data-lang="INDEX.BALANCES"></span> <span data-edexcoin="COIN" id="currency-balances-percent">0%</span>
              </div>
            </div>
            <div className="progress progress-sm">
              <div className="progress-bar progress-bar-success progress-bar-striped active" style={{width: '0%', font-size: '80%'}} role="progressbar" data-edexcoin="COIN" id="currency-validated">
                <span data-lang="INDEX.VALIDATED"></span> <span data-edexcoin="COIN" id="currency-validated-percent">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WalletsProgress;