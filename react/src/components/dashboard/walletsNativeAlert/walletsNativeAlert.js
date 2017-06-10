import React from 'react';
import WalletsNativeAlertRender from './walletsNativeAlert.render';

class WalletsNativeAlert extends React.Component {
  hasNoProgress() {
    return this.props &&
      this.props.Dashboard &&
      !this.props.Dashboard.progress;
  }

  render() {
    if (this.hasNoProgress()) {
      return WalletsNativeAlertRender.call(this);
    }

    return null;
  }
}

export default WalletsNativeAlert;
