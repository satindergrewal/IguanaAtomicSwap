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
  getSyncInfoNative,
  getKMDBalanceTotal,
  getNativeTxHistory,
  getKMDAddressesNative,
  getKMDOPID,
  getFullTransactionsList,
  getBasiliskTransactionsList
} from '../../actions/actionCreators';
import Store from '../../store';

class CoinTileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  dashboardChangeActiveCoin(coin, mode) {
    if (coin !== this.props.ActiveCoin.coin) {
      Store.dispatch(stopInterval('sync', this.props.Interval.interval));
      Store.dispatch(dashboardChangeActiveCoin(coin, mode));

      if (mode === 'full') {
        var _iguanaActiveHandle = setInterval(function() {
          Store.dispatch(getSyncInfo(coin));
          Store.dispatch(iguanaEdexBalance(coin, mode));
          Store.dispatch(getKMDAddressesNative(coin, mode));//getAddressesByAccount(coin));
          Store.dispatch(getFullTransactionsList(coin));
        }, 3000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'native') {
        // TODO: add conditions to skip txhistory, balances, addresses while "activating best chain"
        var _iguanaActiveHandle = setInterval(function() {
          Store.dispatch(getSyncInfoNative(coin));
          Store.dispatch(getKMDBalanceTotal(coin));
          Store.dispatch(getNativeTxHistory(coin));
          Store.dispatch(getKMDAddressesNative(coin));
          Store.dispatch(getKMDOPID(null, coin));
        }, coin === 'KMD' ? 15000 : 3000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'basilisk') {
        var _iguanaActiveHandle = setInterval(function() {
          Store.dispatch(getBasiliskTransactionsList(coin, 'RDbGxL8QYdEp8sMULaVZS2E6XThcTKT9Jd'));
          Store.dispatch(iguanaEdexBalance(coin, mode));
          Store.dispatch(getKMDAddressesNative(coin, mode));
        }, 3000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
        // basilisk
      }
    }

    Store.dispatch(iguanaActiveHandle(true));
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="{item.coin}">
        <div className={this.props.ActiveCoin.coin === item.coin ? 'widget widget-shadow active' : 'widget widget-shadow'}>
          <div className="widget-content text-center bg-white padding-20 edexcoin-logo" data-edexcoincode="{item.coin}" data-edexcoinmodecode="{item.modecode}" data-edexcoinname="{item.coinname}" onClick={() => this.dashboardChangeActiveCoin(item.coin, item.mode)}>
            <a className="avatar margin-bottom-5" href="javascript:void(0)" id="edexcoin-logo">
              <img className="img-responsive" src={'assets/images/cryptologo/' + item.coinlogo + '.png'} alt="{item.coinname}"/>
              <span className={'badge up badge-' + item.modecolor} id="basfull" data-edexcoincode="{item.coin}" data-toggle="tooltip" data-placement="top" data-original-title="{item.modetip}">{item.modecode}</span>
            </a>
            <div className="coin-name">{item.coinname} ({item.coinlogo.toUpperCase()})</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinTileItem;
