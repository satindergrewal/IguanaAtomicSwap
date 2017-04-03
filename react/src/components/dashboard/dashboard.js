import React from 'react';
import Navbar from './navbar';
import CoinTile from './coinTile';
import EDEX from './edex';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'wallets',
    };
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    console.log('dash');
    return (
      <div>
        <Navbar {...this.props} />
        <div className={this.state.activePage === 'wallets' ? 'show' : 'hide'}>
          <CoinTile {...this.props} />
        </div>
        <div className={this.state.activePage === 'edex' ? 'show' : 'hide'}>
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
