import React from 'react';
import Navbar from './navbar';
import CoinTile from './coinTile';
import EDEX from './edex';
import WalletsBalance from './walletsBalance';
import WalletsHeader from './walletsHeader';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    document.body.className = 'page-login';

    return (
      <div>
        <Navbar {...this.props} />
        <div className={this.props.Dashboard.activeSection === 'wallets' ? 'show' : 'hide'}>
          <CoinTile {...this.props} />
          <WalletsBalance {...this.props.ActiveCoin} />
          <WalletsHeader {...this.props.ActiveCoin} />
        </div>
        <div className={this.props.Dashboard.activeSection === 'edex' ? 'show' : 'hide'}>
          <EDEX {...this.props} />
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
