import React from 'react';
import { translate } from '../../translate/translate';

className WalletsBalance extends React.Component {
  render() {
    return (
      <div id="wallet-widgets" data-plugin="masonry" data-edexcoin="COIN" style={{display: 'none'}}>
        <div className="col-xs-12">
          <div className="col-xs-12">
            <div role="alert" className="alert alert-info alert-dismissible" data-edexcoin="COIN" id="edexcoin-wallet-waitingrt-alert" style={{display: 'none'}}>
              <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                <span aria-hidden="true">×</span>
              </button>
              <h4 data-lang="INDEX.ACTIVATING_WALLET_RT"></h4>
              <p data-edexcoin="COIN" id="edexcoin-wallet-waitingrt-alert-text" data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P1"></p>
              <p data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P2"></p>
              <p data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P3" style="font-weight: 600"></p>
            </div>

            <div role="alert" className="alert alert-info alert-dismissible" data-edexcoin="COIN" id="edexcoin-wallet-waitingcache-alert" style={{display: 'none'}}>
              <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                <span aria-hidden="true">×</span>
              </button>
              <h4 data-lang="INDEX.FETCHING_COIN_DATA"></h4>
              <p data-edexcoin="COIN" id="edexcoin-wallet-waitingcache-alert-text" data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P1"></p>
              <p data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P2"></p>
              <p data-lang="INDEX.IGUANA_FULL_MODE_SYNC_P3" style="font-weight: 600"></p>
            </div>
          </div>
          <div className="col-lg-12 col-xs-12" data-edexcoin="COIN" id="edexcoin_getbalance_t">
            <!-- EasyDEX Total Balance Widget-->
            <div className="widget widget-shadow" id="widgetLineareaOne">
              <div className="widget-content">
                <div className="padding-20 padding-top-10">
                  <div className="clearfix">
                    <div className="pull-left padding-vertical-10">
                      <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.BALANCE"></span>
                    </div>
                    <span className="pull-right padding-top-10" data-edexcoin="COIN" style="font-size: 22px">
                      <span data-edexcoin="COIN" id="edex_total_balance"></span> <span data-edexcoin="COIN" id="edex_total_balance_coincode"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- End EasyDEX Total Balance Widget -->
          </div>

          <div className="col-lg-4 col-xs-12" data-edexcoin="COIN" id="edexcoin_getbalance_interest" style="display: none">
            <!-- EasyDEX Interest Balance Widget-->
            <div className="widget widget-shadow" id="widgetLineareaOne">
              <div className="widget-content">
                <div className="padding-20 padding-top-10">
                  <div className="clearfix">
                    <div className="pull-left padding-vertical-10">
                      <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.INTEREST_EARNED"></span>
                    </div>
                    <span className="pull-right padding-top-10" data-edexcoin="COIN" style="font-size: 22px">
                      <span data-edexcoin="COIN" id="edex_interest_balance"></span> <span data-edexcoin="COIN" id="edex_total_interest_coincode"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- End EasyDEX Interest Balance Widget -->
          </div>

          <div className="col-lg-4 col-xs-12" data-edexcoin="COIN" id="edexcoin_getbalance_total_interest" style="display: none">
            <!-- EasyDEX Total Balance Widget-->
            <div className="widget widget-shadow" id="widgetLineareaOne">
              <div className="widget-content">
                <div className="padding-20 padding-top-10">
                  <div className="clearfix">
                    <div className="pull-left padding-vertical-10">
                      <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i><span data-lang="INDEX.TOTAL_BALANCE"></span>
                    </div>
                    <span className="pull-right padding-top-10" data-edexcoin="COIN" style="font-size: 22px">
                      <span data-edexcoin="COIN" id="edex_total_balance_interest"></span> <span data-edexcoin="COIN" id="edex_total_balance_interest_coincode"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- End EasyDEX Total Balance Widget -->
          </div>
        </div>
      </div>
    );
  }
}

export default WalletsBalance;
