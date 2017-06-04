import React from 'react';
import { translate } from '../../translate/translate';
import { getCoinTitle } from '../../util/coinHelper';
import {
  stopInterval,
  addCoin,
  toggleSyncOnlyModal,
  stopIguanaFork,
  restartIguanaInstance
} from '../../actions/actionCreators';
import Store from '../../store';

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
    return (
      <div>
        <div>
          <div className="progress progress-sm">
            <div
              className={'font-size-80-percent full-width ' + (this.isFullySynced(fork) ? 'progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success' : 'hide') }>
              { translate('INDEX.BUNDLES') } ({ fork.coin }) 100.00% - ( { fork.blocks } / { fork.blocks } ) ==&gt;&gt; RT{ fork.RTheight }
            </div>
            <div
              className={ 'font-size-80-percent ' + (this.isFullySynced(fork) ? 'hide' : 'progress-bar progress-bar-info progress-bar-striped active') }
              style={{ width: fork.bundles + '%' }}>
              { translate('INDEX.BUNDLES') } { fork.bundles }%
            </div>
          </div>
        </div>
        <div id="additional-progress-bars" className={ this.isFullySynced(fork) ? 'hide' : '' }>
          <div className="progress progress-sm">
            <div
              className="progress-bar progress-bar-warning progress-bar-striped active font-size-80-percent"
              style={{ width: fork.utxo + '%' }}>
              utxo { fork.utxo }%
            </div>
          </div>
          <div className="progress progress-sm">
            <div
              className="progress-bar progress-bar-danger progress-bar-striped active font-size-80-percent"
              style={{ width: fork.balances + '%' }}>
              { translate('INDEX.BALANCES') } { fork.balances }%
            </div>
          </div>
          <div className="progress progress-sm">
            <div
              className="progress-bar progress-bar-success progress-bar-striped active font-size-80-percent"
              style={{ width: fork.validated + '%' }}>
              { translate('INDEX.VALIDATED') } { fork.validated }%
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderForksList() {
    let items = [];

    for (let port in this.props.SyncOnly.forks) {
      const forkInfo = this.props.SyncOnly.forks[port];

      if (forkInfo &&
          forkInfo.registry &&
          forkInfo.getinfo) {
        items.push(
          <div key={ port } className="padding-bottom-60 full-width">
            <div className="avatar">
              <img
                className="img-responsive margin-bottom-5"
                src={ `assets/images/cryptologo/${this.renderCoinName(forkInfo.registry.coin).logo}.png` }
                alt={ forkInfo.registry.coin }/>
              <span className="badge up badge-success margin-bottom-5">Full</span>
              <div className="coin-name">{ this.renderCoinName(forkInfo.registry.coin).name } ({ forkInfo.registry.coin.toUpperCase() })</div>
              <div className="margin-top-10">
                <span
                  className="btn btn-primary"
                  onClick={ () => this._stopIguanaFork(forkInfo.registry.pmid) }>
                  <span className="fa fa-stop"></span> { translate('INDEX.STOP') }
                </span>
                <span
                  className="btn btn-primary margin-left-10"
                  onClick={ () => this._restartIguanaFork(forkInfo.registry.coin.toUpperCase(), forkInfo.registry.pmid, port) }>
                  <span className="fa fa-undo"></span> { translate('INDEX.RESTART') }
                </span>
              </div>
            </div>
            <div className="progress-bars">
            { this.renderProgress(forkInfo.getinfo) }
            </div>
          </div>
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
      return (
        <div>
          <div className="modal show sync-only-forks">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body modal-body-container">
                  { this.renderForksList() }
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={ this.closeSyncOnlyModal }>{ translate('INDEX.CLOSE') }</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show in"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SyncOnly;