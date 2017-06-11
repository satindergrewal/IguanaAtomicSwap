import React from 'react';
import WalletsNativeRender from './walletsNative.render';

class WalletsNative extends React.Component {
  constructor(props) {
    super(props);
  }

  defaultBG() {
    if (this.props.ActiveCoin.coin === 'REVS') {
      return 'supernet';
    } else {
      return this.props.ActiveCoin.coin.toLowerCase();
    }
  }

  isActiveCoinModeNative() {
    return this.props &&
      this.props.ActiveCoin &&
      this.props.ActiveCoin.mode === 'native';
  }

  render() {
    if (this.isActiveCoinModeNative()) {
      return WalletsNativeRender.call(this);
    } else {
      return null;
    }
  }
}

export default WalletsNative;
