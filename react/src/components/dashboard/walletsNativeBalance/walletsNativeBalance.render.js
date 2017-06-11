import React from 'react';
import { translate } from '../../../translate/translate';

const WalletsNativeBalanceRender = function() {
  return (
    <div className="col-xs-12">
      <div className="col-lg-3 col-xs-12">
        <div className="widget widget-shadow">
          <div className="widget-content white bg-yellow-800">
            <div className="padding-20 padding-top-10">
              <div className="clearfix">
                <div className="pull-left padding-vertical-10">
                  <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.TRANSPARENT_BALANCE') }
                </div>
                <span className="pull-right padding-top-10 font-size-22">{ this.props.ActiveCoin.balance.transparent ? this.props.ActiveCoin.balance.transparent : '-' }</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-xs-12">
        <div className="widget widget-shadow">
          <div className="widget-content white bg-blue-grey-800">
            <div className="padding-20 padding-top-10">
              <div className="clearfix">
                <div className="pull-left padding-vertical-10">
                  <i className="icon fa-eye-slash font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.Z_BALANCE') }
                </div>
                <span className="pull-right padding-top-10 font-size-22">{ this.props.ActiveCoin.balance.private ? this.props.ActiveCoin.balance.private : '-' }</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-xs-12">
        <div className="widget widget-shadow">
          <div className="widget-content white bg-cyan-700">
            <div className="padding-20 padding-top-10">
              <div className="clearfix">
                <div className="pull-left padding-vertical-10">
                  <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.INTEREST_EARNED') }
                </div>
                <span className="pull-right padding-top-10 font-size-22">{ this.props.Dashboard.progress && this.props.Dashboard.progress.interest ? this.props.Dashboard.progress.interest : '-' }</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-xs-12">
        <div className="widget widget-shadow">
          <div className="widget-content white bg-green-600">
            <div className="padding-20 padding-top-10">
              <div className="clearfix">
                <div className="pull-left padding-vertical-10">
                  <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i>{ translate('INDEX.ZT_BALANCE') }
                </div>
                <span className="pull-right padding-top-10 font-size-22">{ this.props.ActiveCoin.balance.total ? this.props.ActiveCoin.balance.total : '-' }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsNativeBalanceRender;