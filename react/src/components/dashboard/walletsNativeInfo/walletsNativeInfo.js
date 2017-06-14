import React from 'react';
import WalletsNativeInfoRender from './walletsNativeInfo.render';

class WalletsNativeInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props &&
        this.props.Dashboard &&
        this.props.Dashboard.progress &&
        this.props.ActiveCoin.nativeActiveSection === 'settings') {
      return WalletsNativeInfoRender.call(this);
    }

    return null;
  }
}

export default WalletsNativeInfo;
