import React from 'react';
import { getCoinTitle } from '../../../util/coinHelper';
import {
  stopInterval,
  addCoin,
  toggleSyncOnlyModal,
  stopIguanaFork,
  restartIguanaInstance
} from '../../../actions/actionCreators';
import Store from '../../../store';

import {
  ProgressRender,
  ForkItemRender,
  SyncOnlyRender
} from './syncOnly.render';

class SyncOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRestartedForks: {}
    };
    this.closeSyncOnlyModal = this.closeSyncOnlyModal.bind(this);
  }

  isFullySynced(fork) {
    if (fork.balances &&
        ((Number(fork.balances) +
        Number(fork.validated) +
        Number(fork.bundles) +
        Number(fork.utxo)) / 4 === 100)) {
      return true;
    } else {
      return false;
    }
  }

  renderCoinName(coin) {
    const _coinTitle = getCoinTitle(coin);

    return {
      'logo': _coinTitle.logo,
      'name': _coinTitle.name
    };
  }

  componentWillReceiveProps(props) {
    if (props.SyncOnly) {
      for (let port in this.props.SyncOnly.forks) {
        const forkInfo = this.props.SyncOnly.forks[port];

        if (!this.state.autoRestartedForks[port] &&
            forkInfo &&
            forkInfo.registry &&
            forkInfo.getinfo &&
            forkInfo.getinfo.error &&
            forkInfo.getinfo.error === 'bitcoinrpc needs coin that is active') {
          let _autoRestartedForks = Object.assign({}, this.state.autoRestartedForks);
          _autoRestartedForks[port] = true;

          this.setState({
            autoRestartedForks: _autoRestartedForks,
          });
          Store.dispatch(addCoin(forkInfo.registry.coin, '1', null, port));

          setTimeout(() => {
            let _autoRestartedForks = Object.assign({}, this.state.autoRestartedForks);
            _autoRestartedForks[port] = false;

            this.setState({
              autoRestartedForks: _autoRestartedForks,
            });
          }, 10000);
        }
      }
    }
  }

  closeSyncOnlyModal() {
    Store.dispatch(stopInterval('syncOnly', this.props.Interval.interval));
    Store.dispatch(toggleSyncOnlyModal(false));
  }

  _stopIguanaFork(pmid) {
    Store.dispatch(stopIguanaFork(pmid));
  }

  _restartIguanaFork(coin, pmid, port) {
    restartIguanaInstance(pmid)
    .then(function(json) {
      setTimeout(function() {
        Store.dispatch(addCoin(coin, '1', null, port));
        console.log('restartSyncOnlyInstance', json);
      }, 2000);
    });
  }

  renderProgress(fork) {
    return ProgressRender.call(this, fork);
  }

  renderForksList() {
    let items = [];

    for (let port in this.props.SyncOnly.forks) {
      const forkInfo = this.props.SyncOnly.forks[port];

      if (forkInfo &&
          forkInfo.registry &&
          forkInfo.getinfo) {
        items.push(
          ForkItemRender.call(this, forkInfo, port)
        );
      }
    }

    if (items.length) {
      return items;
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }

  render() {
    if (this.props &&
        this.props.SyncOnly.display) {
      return SyncOnlyRender.call(this);
    } else {
      return null;
    }
  }
}

export default SyncOnly;