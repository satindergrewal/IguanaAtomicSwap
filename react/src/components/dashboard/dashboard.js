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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    document.body.className = 'page-login';
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
            <WalletsData {...this.props.ActiveCoin} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'edex' ? 'show' : 'hide'}>
            <EDEX {...this.props} />
          </div>
          <div className={this.props.Dashboard.activeSection === 'atomic' ? 'show' : 'hide'}>
            <Atomic {...this.props} />
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
