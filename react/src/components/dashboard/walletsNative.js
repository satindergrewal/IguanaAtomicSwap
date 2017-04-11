import React from 'react';
import { translate } from '../../translate/translate';
import WalletsNativeAlert from './walletsNativeAlert';
import WalletsNativeBalance from './walletsNativeBalance';
import WalletsNativeInfo from './walletsNativeInfo';
import WalletsNativeReceive from './walletsNativeReceive';
import WalletsNativeSend from './walletsNativeSend';
import WalletsNativeSyncProgress from './walletsNativeSyncProgress';
import WalletsNativeTxHistory from './walletsNativeTxHistory';
import WalletsNativeTxInfo from './walletsNativeTxInfo';

class WalletsNative extends React.Component {
  constructor(props) {
    super(props);
  }

      /*$('.header-easydex-section')
      .html('<img src="assets/images/native/' + imgSrcName + '_header_title_logo.png"> <span style="font-size: 35px; vertical-align: middle">' + _coin + '</span>');
    $('#easydex-header-div').css('background-image', 'url("assets/images/bg/' + imgBgName + '_transparent_header_bg.png")');*/

  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.mode === 'native') {
      return (
        <div className="page" data-animsition-in="fade-in" data-animsition-out="fade-out" style={{marginLeft: '0'}}>
          <div data-extcoin="COIN" id="section-extcoin" style={{paddingTop: '0'}}>
            <div id="easydex-header-div" style={{'backgroundImage': 'url("assets/images/bg/' + this.props.ActiveCoin.coin.toLowerCase() + '_transparent_header_bg.png")'}}>
              <ol className="breadcrumb">
                <li className="header-easydex-section">
                  <img src={'assets/images/native/' + this.props.ActiveCoin.coin.toLowerCase() + '_header_title_logo.png'} /> <span style={{fontSize: '35px', verticalAlign: 'middle'}} className={this.props.ActiveCoin.coin === 'KMD' ? 'hide' : 'show'}>{this.props.ActiveCoin.coin}</span>
                </li>
              </ol>
            </div>
            <div className="page-content">
              <WalletsNativeAlert {...this.props} />
              <WalletsNativeSyncProgress {...this.props} />

              <div className="row" data-extcoin="COIN" id="extcoin-wallet" data-plugin="masonry">
                <WalletsNativeBalance {...this.props} />
                <WalletsNativeTxHistory {...this.props} />
                <WalletsNativeReceive {...this.props} />
                <WalletsNativeSend {...this.props} />
                <WalletsNativeInfo {...this.props} />
              </div>
            </div>
            <WalletsNativeTxInfo {...this.props} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNative;
