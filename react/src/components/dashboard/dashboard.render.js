import React from 'react';

import Navbar from './navbar';
import CoinTile from './coinTile';
import EDEX from './edex';
import WalletsBalance from './walletsBalance';
import WalletsProgress from './walletsProgress';
import WalletsNav from './walletsNav';
import SendCoin from './sendCoin';
import WalletsData from './walletsData';
import Atomic from './atomic';
import Jumblr from './jumblr';
import Settings from './settings';
import ReceiveCoin from './receiveCoin';
import About from './about';
import WalletsNative from './walletsNative';
import WalletsNativeTxInfo from './walletsNativeTxInfo';
import WalletsTxInfo from './walletsTxInfo';

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