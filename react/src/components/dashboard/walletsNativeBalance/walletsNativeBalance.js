import React from 'react';
import WalletsNativeBalanceRender from './walletsNativeBalance.render';

class WalletsNativeBalance extends React.Component {
  render() {
    if (this.props &&
        this.props.ActiveCoin.nativeActiveSection === 'default') {
      return WalletsNativeBalanceRender.call(this);
    }

    return null;
  }
}

export default WalletsNativeBalance;
