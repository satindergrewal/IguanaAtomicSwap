import React from 'react';
import { translate } from '../../../translate/translate';

import WalletsBalanceRender from './walletsBalance.render';

class WalletsBalance extends React.Component {
  constructor(props) {
    super(props);
    this.isFullySynced = this.isFullySynced.bind(this);
  }

  isFullySynced() {
    if (this.props.Dashboard.progress &&
        (Number(this.props.Dashboard.progress.balances) +
        Number(this.props.Dashboard.progress.validated) +
        Number(this.props.Dashboard.progress.bundles) +
        Number(this.props.Dashboard.progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  renderBalance(type) {
    let _balance = '0';

    if (this.props.ActiveCoin.mode === 'full') {
      _balance = this.props.ActiveCoin.balance || 0;
    } else {
      if (this.props.ActiveCoin.cache) {
        if (type === 'main' &&
            this.props.ActiveCoin.mode === 'basilisk' &&
            this.props.ActiveCoin.activeAddress &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.balance) {
          _balance = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.balance;
        }

        if (type === 'interest' &&
            this.props.ActiveCoin.mode === 'basilisk' &&
            this.props.ActiveCoin.activeAddress &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.interest) {
          _balance = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.interest;
        }

        if (type === 'total' &&
            this.props.ActiveCoin.mode === 'basilisk' &&
            this.props.ActiveCoin.activeAddress &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress] &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance &&
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data &&
            (this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.balance ||
            this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.interest)) {
          const _regBalance = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.balance ? this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.balance : 0;
          const _regInterest = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.interest ? this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.props.ActiveCoin.activeAddress].getbalance.data.interest : 0;

          _balance = _regBalance + _regInterest;
        }
      }
    }

    return _balance;
  }

  isActiveCoinMode(coinMode) {
    return this.props.ActiveCoin.mode === coinMode;
  }

  isNativeOrBasiliskCoinMode() {
    return this.isActiveCoinMode('native') || this.isActiveCoinMode('basilisk');
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span>
        {_translation}
        <br />
      </span>
    );
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.mode !== 'native' &&
        !this.props.ActiveCoin.send &&
        !this.props.ActiveCoin.receive) {
      return WalletsBalanceRender.call(this);
    }

    return null;
  }
}

export default WalletsBalance;
