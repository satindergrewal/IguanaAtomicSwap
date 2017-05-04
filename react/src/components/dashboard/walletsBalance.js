import React from 'react';
import { translate } from '../../translate/translate';

class WalletsBalance extends React.Component {
  constructor(props) {
    super(props);
    this.isFullySynced = this.isFullySynced.bind(bind);
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
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.mode !== 'native' &&
        !this.props.ActiveCoin.send &&
        !this.props.ActiveCoin.receive) {
      return (
        <div id="wallet-widgets" data-plugin="masonry" data-edexcoin="COIN">
          <div className="col-xs-12">
            <div className={this.props.ActiveCoin.mode === 'native' || (this.props.ActiveCoin.mode === 'full' && !this.isFullySynced())  ? 'col-xs-12' : 'col-xs-12 hide'}>
              <div role="alert" className="alert alert-info alert-dismissible" data-edexcoin="COIN" id="edexcoin-wallet-waitingrt-alert">
                <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                  <span aria-hidden="true">×</span>
                </button>
                <h4>{translate('INDEX.ACTIVATING_WALLET_RT')}</h4>
                <p data-edexcoin="COIN" id="edexcoin-wallet-waitingrt-alert-text">{translate('INDEX.IGUANA_FULL_MODE_SYNC_P1')}</p>
                <p>{translate('INDEX.IGUANA_FULL_MODE_SYNC_P2')}</p>
                <p style={{fontWeight: '600'}}>{translate('INDEX.IGUANA_FULL_MODE_SYNC_P3')}</p>
              </div>

              <div role="alert" className="alert alert-info alert-dismissible" data-edexcoin="COIN" id="edexcoin-wallet-waitingcache-alert">
                <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                  <span aria-hidden="true">×</span>
                </button>
                <h4>{translate('INDEX.FETCHING_COIN_DATA')}</h4>
                <p data-edexcoin="COIN" id="edexcoin-wallet-waitingcache-alert-text">{translate('INDEX.IGUANA_FULL_MODE_SYNC_P1')}</p>
                <p>{translate('INDEX.IGUANA_FULL_MODE_SYNC_P2')}</p>
                <p style={{fontWeight: '600'}}>{translate('INDEX.IGUANA_FULL_MODE_SYNC_P3')}</p>
              </div>
            </div>
            <div className="col-lg-12 col-xs-12" data-edexcoin="COIN" id="edexcoin_getbalance_t">
              <div className="widget widget-shadow" id="widgetLineareaOne">
                <div className="widget-content">
                  <div className="padding-20 padding-top-10">
                    <div className="clearfix">
                      <div className="pull-left padding-vertical-10">
                        <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.BALANCE')}
                      </div>
                      <span className="pull-right padding-top-10" data-edexcoin="COIN" style={{fontSize: '22px'}}>
                        <span data-edexcoin="COIN" id="edex_total_balance"></span> <span data-edexcoin="COIN" id="edex_total_balance_coincode">{this.props.ActiveCoin && this.props.ActiveCoin.balance ? this.props.ActiveCoin.balance : 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={this.props.ActiveCoin.mode === 'native'|| (this.props.ActiveCoin.mode === 'basilisk' && this.props.ActiveCoin.coin === 'KMD') ? 'col-lg-4 col-xs-12' : 'col-lg-4 col-xs-12 hide'} data-edexcoin="COIN" id="edexcoin_getbalance_interest">
              <div className="widget widget-shadow" id="widgetLineareaOne">
                <div className="widget-content">
                  <div className="padding-20 padding-top-10">
                    <div className="clearfix">
                      <div className="pull-left padding-vertical-10">
                        <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.INTEREST_EARNED')}
                      </div>
                      <span className="pull-right padding-top-10" data-edexcoin="COIN" style={{fontSize: '22px'}}>
                        <span data-edexcoin="COIN" id="edex_interest_balance"></span> <span data-edexcoin="COIN" id="edex_total_interest_coincode"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={this.props.ActiveCoin.mode === 'native' || (this.props.ActiveCoin.mode === 'basilisk' && this.props.ActiveCoin.coin === 'KMD') ? 'col-lg-4 col-xs-12' : 'col-lg-4 col-xs-12 hide'} data-edexcoin="COIN" id="edexcoin_getbalance_total_interest">
              <div className="widget widget-shadow" id="widgetLineareaOne">
                <div className="widget-content">
                  <div className="padding-20 padding-top-10">
                    <div className="clearfix">
                      <div className="pull-left padding-vertical-10">
                        <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.TOTAL_BALANCE')}
                      </div>
                      <span className="pull-right padding-top-10" data-edexcoin="COIN" style={{fontSize: '22px'}}>
                        <span data-edexcoin="COIN" id="edex_total_balance_interest"></span> <span data-edexcoin="COIN" id="edex_total_balance_interest_coincode"></span>
                      </span>
                    </div>
                  </div>
                </div>
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

export default WalletsBalance;
