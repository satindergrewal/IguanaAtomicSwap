import React from 'react';
import { secondsToString } from '../../../util/time';
import { toggleViewCacheModal } from '../../../actions/actionCreators';
import Store from '../../../store';
import { TreeNode } from 'rc-tree';
import WalletsCacheDataRender from './walletsCacheData.render';

// TODO: refresh data render

class WalletsCacheData extends React.Component {
  constructor(props) {
    super(props);
    this.closeViewCacheModal = this.closeViewCacheModal.bind(this);
  }

  closeViewCacheModal() {
    Store.dispatch(toggleViewCacheModal(false));
  }

  hasActiveCoinCache() {
    return this.props.ActiveCoin.cache;
  }

  coinsInCache() {
    return Object.keys(this.props.ActiveCoin.cache).length;
  }

  renderNotariesFetching() {
    if (!this.hasActiveCoinCache()) {
      return (
        <div>Fetching cache data...</div>
      );
    } else {
      return (
        <div>
          <strong>{ this.coinsInCache() }</strong> coin(s) in cache file
        </div>
      );
    }
  }

  renderKeyValueParent(pre, _sourceObj) {
    if (_sourceObj.data[0] &&
        Object.keys(_sourceObj.data[0]).length) {
      return _sourceObj.data.map((key, value) =>
        <TreeNode title={ key.txid ? key.txid : `${pre}-array-${value}` } key={ `{$pre}-${value}-array` }>
          { this.renderArrayNode(`${pre}-array-${value}`, key) }
        </TreeNode>);
    } else {
      return Object.keys(_sourceObj.data).map((key, value) => this.renderKeyValue(pre, key, _sourceObj.data[key]));
    }
  }

  renderArrayNode(pre, obj) {
    return Object.keys(obj).map((key, value) => this.renderKeyValue(`${pre}-${key}`, key, obj[key]));
  }

  renderKeyValue(pre, key, value) {
    return (
      <TreeNode title={ `${key}: ${value}` } key={ `{$pre}-${key}` } />
    );
  }

  renderCallData(coin, address, call) {
    const sourceObj = this.props.ActiveCoin.cache[coin][address];

    if (sourceObj[call].data &&
        (sourceObj[call].data.length || Object.keys(sourceObj[call].data).length)) {
      return (
        <TreeNode title={ `${call}`} key={`${coin}-${address}-${call}` }>
          <TreeNode title={ `status: ${sourceObj[call].status}` } key={ `${coin}-${address}-${call}-status` } />
          <TreeNode title={ `updated @: ${secondsToString(sourceObj[call].timestamp, true)}` } key={ `${coin}-${address}-${call}-timestamp` } />
          <TreeNode title="data" key={ `${coin}-${address}-${call}-data` }>
          { this.renderKeyValueParent(`${coin}-${address}-${call}`, sourceObj[call]) }
          </TreeNode>
        </TreeNode>
      );
    } else {
      return (
        <TreeNode title={ `${call} (no data)` } key={ `${coin}-${address}-${call}` } />
      );
    }
  }

  renderAddressCallsList(coin, address) {
    let allCalls = [];
    const sourceObj = this.props.ActiveCoin.cache[coin][address];
    const _allCalls = [
      'listtransactions',
      'listunspent',
      'getbalance',
      'refresh'
    ];

    for (let i = 0; i < _allCalls.length; i++) {
      if (sourceObj[_allCalls[i]]) {
        allCalls.push(_allCalls[i]);
      }
    }

    if (sourceObj) {
      return allCalls.map((call, index) => this.renderCallData(coin, address, call));
    } else {
      return null;
    }
  }

  renderCoinAddressList(coin) {
    const addrList = this.props.ActiveCoin.cache[coin].addresses;

    if (addrList && addrList.length) {
      return addrList.map((address, index) =>
        <TreeNode title={ `${address}` } key={ `${coin}-${address}` }>
        { this.renderAddressCallsList(coin, address) }
        </TreeNode>
      );
    } else {
      return null;
    }
  }

  renderCoinRootNodes() {
    if (this.props.ActiveCoin.cache &&
        Object.keys(this.props.ActiveCoin.cache).length) {
      return Object.keys(this.props.ActiveCoin.cache).map((coinName, index) =>
        <TreeNode title={ `${coinName}` } key={ `coin-${coinName}` }>
          <TreeNode title="Address list" key={ `${coinName}-addrlist` }>
          { this.renderCoinAddressList(coinName) }
          </TreeNode>
        </TreeNode>
      );
    } else {
      return null;
    }
  }

  hasActiveCoinNotaries() {
    return this.props.ActiveCoin.notaries &&
      this.props.ActiveCoin.notaries.notaries &&
      this.props.ActiveCoin.notaries.notaries.length;
  }

  renderCoinData() {
    if (this.hasActiveCoinNotaries()) {
      return this.props.ActiveCoin.notaries.notaries.map((node, index) =>
        <TreeNode title={ `Node ${index}` } key={ `node-${index}` }>
          <TreeNode key={ `node-${index}-btc` } title={ `BTC: ${node.BTCaddress}` } />
          <TreeNode key={ `node-${index}-kmd` } title={ `KMD: ${node.KMDaddress}` } />
          <TreeNode key={ `node-${index}-pubkey` } title={ `Pubkey: ${node.pubkey}` } />
        </TreeNode>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin.mode === 'basilisk' &&
        this.props.Dashboard.displayViewCacheModal) {

      return WalletsCacheDataRender.call(this);
    } else {
      return null;
    }
  }
}

export default WalletsCacheData;
