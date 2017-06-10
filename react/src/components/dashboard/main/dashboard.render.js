import React from 'react';

import Navbar from '../navbar/navbar';
import CoinTile from '../coinTile/coinTile';
import EDEX from '../edex/edex';
import WalletsBalance from '../walletsBalance/walletsBalance';
import WalletsProgress from '../walletsProgress/walletsProgress';
import WalletsNav from '../walletsNav/walletsNav';
import SendCoin from '../sendCoin/sendCoin';
import WalletsData from '../walletsData/walletsData';
import Atomic from '../atomic/atomic';
import Jumblr from '../jumblr/jumblr';
import Settings from '../settings/settings';
import ReceiveCoin from '../receiveCoin/receiveCoin';
import About from '../about/about';
import WalletsNative from '../walletsNative/walletsNative';
import WalletsNativeTxInfo from '../walletsNativeTxInfo/walletsNativeTxInfo';
import WalletsTxInfo from '../walletsTxInfo/walletsTxInfo';

const DashboardRender = function() {
  return (
    <div className="full-height">
      <div
        className={ this.isSectionActive('wallets') ? 'page-main' : '' }
        id="section-dashboard">
        <Navbar {...this.props} />
        <div className={ this.isSectionActive('wallets') ? 'show' : 'hide' }>
          <CoinTile {...this.props} />
          <WalletsNav {...this.props} />
          <WalletsProgress {...this.props} />
          <WalletsBalance {...this.props} />
          <SendCoin {...this.props} />
          <ReceiveCoin {...this.props.ActiveCoin} />
          <WalletsData {...this.props} />
          <WalletsTxInfo {...this.props} />
          <WalletsNative {...this.props} />
          <WalletsNativeTxInfo {...this.props} />
        </div>
        <div className={ this.isSectionActive('edex') ? 'show' : 'hide' }>
          <EDEX {...this.props} />
        </div>
        <div className={ this.isSectionActive('atomic') ? 'show' : 'hide' }>
          <Atomic {...this.props} />
        </div>
        <div className={ this.isSectionActive('jumblr') ? 'show' : 'hide' }>
          <Jumblr {...this.props} />
        </div>
        <div className={ this.isSectionActive('settings') ? 'show' : 'hide' }>
          <Settings {...this.props} />
        </div>
        <div className={ this.isSectionActive('about') ? 'show' : 'hide' }>
          <About {...this.props} />
        </div>
      </div>
    </div>
  );
};

export default DashboardRender;