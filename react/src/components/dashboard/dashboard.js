import React from 'react';
import Navbar from './navbar';
import CoinTile from './coinTile';
import EDEX from './edex';
import WalletsBalance from './walletsBalance';
import WalletsHeader from './walletsHeader';
import WalletsProgress from './walletsProgress';
import WalletsNav from './walletsNav';
import SendCoin from './sendCoin';
import WalletsData from './walletsData';
import Atomic from './atomic';
import Jumblr from './jumblr';
import Settings from './settings';
import ReceiveCoin from './receiveCoin';
import About from './about';
import WalletsBasiliskRefresh from './walletsBasiliskRefresh';
import WalletsBasiliskConnection from './walletsBasiliskConnection';
import WalletsNative from './walletsNative';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    document.body.className = '';
    //            <WalletsHeader {...this.props.ActiveCoin} />
    return (
      <div style={{height: '100%'}}>
        <div className={this.props.Dashboard.activeSection === 'wallets' ? 'page-main' : ''} id="section-dashboard" data-edexcoin="COIN">
          <Navbar {...this.props} />
          <div className={this.props.Dashboard.activeSection === 'wallets' ? 'show' : 'hide'}>
            <CoinTile {...this.props} />
            <WalletsNav {...this.props} />
            <WalletsProgress {...this.props} />
            <WalletsBalance {...this.props.ActiveCoin} />
            <SendCoin {...this.props.ActiveCoin} />
            <ReceiveCoin {...this.props.ActiveCoin} />
            <WalletsData {...this.props} />
            <WalletsBasiliskRefresh {...this.props} />
            <WalletsBasiliskConnection {...this.props} />
            <WalletsNative {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'edex' ? 'show' : 'hide'}>
            <EDEX {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'atomic' ? 'show' : 'hide'}>
            <Atomic {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'jumblr' ? 'show' : 'hide'}>
            <Jumblr {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'settings' ? 'show' : 'hide'}>
            <Settings {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'about' ? 'show' : 'hide'}>
            <About {...this.props} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props && this.props.Main && this.props.Main.isLoggedIn) {
      return this.renderDashboard();
    } else {
      return null;
    }
  }
}

export default Dashboard;
