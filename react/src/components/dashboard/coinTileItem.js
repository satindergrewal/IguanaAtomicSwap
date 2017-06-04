import React from 'react';
import { translate } from '../../translate/translate';
import {
  dashboardChangeActiveCoin,
  iguanaActiveHandle,
  getAddressesByAccount,
  getSyncInfo,
  startInterval,
  stopInterval,
  iguanaEdexBalance,
  getKMDAddressesNative,
  getFullTransactionsList,
  getBasiliskTransactionsList,
  changeActiveAddress,
  getShepherdCache,
  fetchNewCacheData,
  getKMDOPID,
  getNativeTxHistory,
  getKMDBalanceTotal,
  getSyncInfoNative
} from '../../actions/actionCreators';
import Store from '../../store';

const BASILISK_CACHE_UPDATE_TIMEOUT = 240000;
const IGUNA_ACTIVE_HANDLE_TIMEOUT = 3000;
const IGUNA_ACTIVE_HANDLE_TIMEOUT_KMD_NATIVE = 15000;
const NATIVE_MIN_SYNC_PERCENTAGE_THRESHOLD = 90;

class CoinTileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // TODO: 1) cache native/full node data to file
  //       2) limit amount of req per update e.g. list of addresses don't change too often
  //       3) limit req in basilisk as much as possible incl. activehandle

  dispatchCoinActions(coin, mode) {
    if (mode === 'native') {
      Store.dispatch(iguanaActiveHandle(true));
      const syncPercentage = this.props.Dashboard && this.props.Dashboard.progress && (parseFloat(parseInt(this.props.Dashboard.progress.blocks, 10) * 100 / parseInt(this.props.Dashboard.progress.longestchain, 10)).toFixed(2)).replace('NaN', 0);

      if (this.props.Dashboard.progress &&
          this.props.Dashboard.progress.blocks &&
          this.props.Dashboard.progress.longestchain &&
          syncPercentage &&
          syncPercentage >= NATIVE_MIN_SYNC_PERCENTAGE_THRESHOLD) {
        Store.dispatch(getSyncInfoNative(coin, true));
        Store.dispatch(getKMDBalanceTotal(coin));
        Store.dispatch(getNativeTxHistory(coin));
        Store.dispatch(getKMDAddressesNative(coin, mode));
        Store.dispatch(getKMDOPID(null, coin));
      } else {
        Store.dispatch(getSyncInfoNative(coin));
      }
    }
    if (mode === 'full') {
      Store.dispatch(iguanaActiveHandle(true));
      Store.dispatch(getSyncInfo(coin));
      Store.dispatch(iguanaEdexBalance(coin, mode));
      Store.dispatch(getAddressesByAccount(coin, mode));
      Store.dispatch(getFullTransactionsList(coin));
    }
    if (mode === 'basilisk') {
      const useAddress = this.props.ActiveCoin.mainBasiliskAddress ? this.props.ActiveCoin.mainBasiliskAddress : this.props.Dashboard.activeHandle[coin];

      Store.dispatch(iguanaActiveHandle(true));
      Store.dispatch(getKMDAddressesNative(coin, mode, useAddress));
      Store.dispatch(getShepherdCache(JSON.parse(sessionStorage.getItem('IguanaActiveAccount')).pubkey, coin));

      if (this.props &&
          this.props.Dashboard &&
          this.props.Dashboard.activeHandle &&
          this.props.Dashboard.activeHandle[coin]) {
        if (!this.props.ActiveCoin.addresses) {
          Store.dispatch(getAddressesByAccount(coin, mode));
        }

        Store.dispatch(getBasiliskTransactionsList(coin, useAddress));
      }
    }
  }

  dashboardChangeActiveCoin(coin, mode) {
    if (coin !== this.props.ActiveCoin.coin) {
      Store.dispatch(stopInterval('sync', this.props.Interval.interval));
      Store.dispatch(stopInterval('basilisk', this.props.Interval.interval));
      Store.dispatch(dashboardChangeActiveCoin(coin, mode));

      this.dispatchCoinActions(coin, mode);

      if (mode === 'full') {
        const _iguanaActiveHandle = setInterval(() => {
          this.dispatchCoinActions(coin, mode);
        }, IGUNA_ACTIVE_HANDLE_TIMEOUT);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'native') {
        const _iguanaActiveHandle = setInterval(() => {
          this.dispatchCoinActions(coin, mode);
        }, coin === 'KMD' ? IGUNA_ACTIVE_HANDLE_TIMEOUT_KMD_NATIVE : IGUNA_ACTIVE_HANDLE_TIMEOUT);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'basilisk') {
        const _basiliskMainAddress = this.props.Dashboard.activeHandle[coin] || JSON.parse(sessionStorage.getItem('IguanaActiveAccount'))[coin];
        Store.dispatch(changeActiveAddress(_basiliskMainAddress));

        if (_basiliskMainAddress) {
          Store.dispatch(fetchNewCacheData({
            'pubkey': this.props.Dashboard.activeHandle.pubkey,
            'allcoins': false,
            'coin': coin,
            'calls': 'listtransactions:getbalance',
            'address': _basiliskMainAddress,
          }));

          const _iguanaActiveHandle = setInterval(() => {
            this.dispatchCoinActions(coin, mode);
          }, IGUNA_ACTIVE_HANDLE_TIMEOUT);

          const _basiliskCache = setInterval(() => {
            Store.dispatch(fetchNewCacheData({
              'pubkey': this.props.Dashboard.activeHandle.pubkey,
              'allcoins': false,
              'coin': this.props.ActiveCoin.coin,
              'calls': 'listtransactions:getbalance',
              'address': _basiliskMainAddress,
            }));
          }, BASILISK_CACHE_UPDATE_TIMEOUT);
          Store.dispatch(startInterval('sync', _iguanaActiveHandle));
          Store.dispatch(startInterval('basilisk', _basiliskCache));
        }
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info pointer">
        <div className={ this.props.ActiveCoin.coin === item.coin ? 'widget widget-shadow active' : 'widget widget-shadow' }>
          <div
            className="widget-content text-center bg-white padding-20"
            onClick={ () => this.dashboardChangeActiveCoin(item.coin, item.mode) }>
            <a className="avatar margin-bottom-5">
              <img
                className="img-responsive"
                src={ `assets/images/cryptologo/${item.coinlogo}.png` }
                alt={ item.coinname }/>
              <span className={ `badge up badge-${item.modecolor}` }>{ item.modecode }</span>
            </a>
            <div className="coin-name">{ item.coinname } ({ item.coinlogo.toUpperCase() })</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinTileItem;
