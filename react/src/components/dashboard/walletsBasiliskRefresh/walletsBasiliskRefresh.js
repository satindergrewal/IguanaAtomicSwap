import React from 'react';
import WalletsBasiliskRefreshRender from './walletsBasiliskRefresh.render';

class WalletsBasiliskRefresh extends React.Component {
  isBasiliskRefresh() {
   return this.props &&
    this.props.Dashboard.basiliskRefresh;
  }

  render() {
    if (this.isBasiliskRefresh()) {
      return WalletsBasiliskRefreshRender.call(this);
    }

    return null;
  }
}

export default WalletsBasiliskRefresh;
