import React from 'react';
import Toaster from '../toaster/toaster';
import AddCoin from '../addcoin/addcoin';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import SyncOnly from '../dashboard/syncOnly';
import Notifications from '../dashboard/notifications';

class WalletMain extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <SyncOnly {...this.props} />
        <Dashboard {...this.props} />
        <AddCoin {...this.props.AddCoin} />
        <Login {...this.props} />
        <Toaster {...this.props.toaster} />
        <Notifications {...this.props} />
      </div>
    );
  }
}

export default WalletMain;
