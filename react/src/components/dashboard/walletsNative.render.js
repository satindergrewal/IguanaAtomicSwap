import React from 'react';
import WalletsNativeBalance from './walletsNativeBalance';
import WalletsNativeInfo from './walletsNativeInfo';
import WalletsNativeReceive from './walletsNativeReceive';
import WalletsNativeSend from './walletsNativeSend';
import WalletsNativeSyncProgress from './walletsNativeSyncProgress';
import WalletsNativeTxHistory from './walletsNativeTxHistory';

const WalletsNativeRender = function () {
  return (
    <div className="page margin-left-0">
      <div className="padding-top-0">
        <div id="easydex-header-div" className="background-color-white" style={{ 'backgroundImage': `url("assets/images/bg/${this.defaultBG()}_transparent_header_bg.png")` }}>
          <ol className="breadcrumb">
            <li className="header-easydex-section">
              <img src={ `assets/images/native/${this.defaultBG()}_header_title_logo.png` } /> <span className={ `easydex-section-image ${(this.props.ActiveCoin.coin === 'KMD' ? 'hide' : '')}` }>{ this.props.ActiveCoin.coin }</span>
            </li>
          </ol>
        </div>
        <div className="page-content">
          <WalletsNativeSyncProgress {...this.props} />
          <div className="row">
            <WalletsNativeBalance {...this.props} />
            <WalletsNativeTxHistory {...this.props} />
            <WalletsNativeReceive {...this.props} />
            <WalletsNativeSend {...this.props} />
            <WalletsNativeInfo {...this.props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsNativeRender;