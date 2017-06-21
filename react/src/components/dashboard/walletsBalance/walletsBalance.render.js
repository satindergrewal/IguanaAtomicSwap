import React from 'react';
import { translate } from '../../../translate/translate';

const WalletsBalanceRender = function() {
  return (
    <div id="wallet-widgets">
      <div className="col-xs-12">
        <div className={ this.isActiveCoinMode('native') || (this.isActiveCoinMode('full') && !this.isFullySynced()) ? 'col-xs-12' : 'col-xs-12 hide' }>
          <div className="alert alert-info alert-dismissible">
            <button className="close" type="button">
              <span>×</span>
            </button>
            <h4>{ translate('INDEX.ACTIVATING_WALLET_RT') }</h4>
            <p>{ translate('INDEX.IGUANA_FULL_MODE_SYNC_P1') }</p>
            <p>{ translate('INDEX.IGUANA_FULL_MODE_SYNC_P2') }</p>
            <p className="font-weight-600">{ this.renderLB('INDEX.IGUANA_FULL_MODE_SYNC_P3') }</p>
          </div>

          <div className="alert alert-info alert-dismissible">
            <button className="close" type="button">
              <span>×</span>
            </button>
            <h4>{ translate('INDEX.FETCHING_COIN_DATA') }</h4>
            <p>{ translate('INDEX.IGUANA_FULL_MODE_SYNC_P1') }</p>
            <p>{ translate('INDEX.IGUANA_FULL_MODE_SYNC_P2') }</p>
            <p className="font-weight-600">{ this.renderLB('INDEX.IGUANA_FULL_MODE_SYNC_P3') }</p>
          </div>
        </div>

        <div className={ this.isNativeOrBasiliskCoinMode() ? 'col-lg-4 col-xs-12' : 'col-lg-12 col-xs-12' }>
          <div className="widget widget-shadow">
            <div className="widget-content">
              <div className="padding-20 padding-top-10">
                <div className="clearfix">
                  <div className="pull-left padding-vertical-10">
                    <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.BALANCE')}
                  </div>
                  <span className="pull-right padding-top-10 font-size-22">
                    { this.renderBalance('main') } { this.props.ActiveCoin.coin }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ this.isNativeOrBasiliskCoinMode() ? 'col-lg-4 col-xs-12' : 'col-lg-4 col-xs-12 hide' }>
          <div className="widget widget-shadow">
            <div className="widget-content">
              <div className="padding-20 padding-top-10">
                <div className="clearfix">
                  <div className="pull-left padding-vertical-10">
                    <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.INTEREST_EARNED') }
                  </div>
                  <span className="pull-right padding-top-10 font-size-22">
                    { this.renderBalance('interest') } { this.props.ActiveCoin.coin }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ this.isNativeOrBasiliskCoinMode() ? 'col-lg-4 col-xs-12' : 'col-lg-4 col-xs-12 hide' }>
          <div className="widget widget-shadow">
            <div className="widget-content">
              <div className="padding-20 padding-top-10">
                <div className="clearfix">
                  <div className="pull-left padding-vertical-10">
                    <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.TOTAL_BALANCE') }
                  </div>
                  <span className="pull-right padding-top-10 font-size-22">
                    { this.renderBalance('total') } { this.props.ActiveCoin.coin }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsBalanceRender;