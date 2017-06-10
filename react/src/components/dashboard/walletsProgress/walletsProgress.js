import React from 'react';
import { translate } from '../../../translate/translate';
import WalletsProgressRender from './walletsProgress.render';

class WalletsProgress extends React.Component {
  constructor(props) {
    super(props);
    this.isFullySynced = this.isFullySynced.bind(this);
  }

  isFullySynced() {
    if ((Number(this.props.Dashboard.progress.balances) +
        Number(this.props.Dashboard.progress.validated) +
        Number(this.props.Dashboard.progress.bundles) +
        Number(this.props.Dashboard.progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.mode === 'full' &&
        this.props.Dashboard.progress) {
      if (this.props.Dashboard.progress &&
          this.props.Dashboard.progress.error) {
        return (
          <div className="text-align-center padding-10">{ translate('INDEX.COIN_IS_BUSY') }</div>
        );
      }

      return WalletsProgressRender.call(this);
    }

    return null;
  }
}

export default WalletsProgress;
