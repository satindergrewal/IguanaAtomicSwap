import React from 'react';
import { atomic } from '../../../actions/actionCreators';
import Store from '../../../store';

import AtomicRender from './atomic.render';

/*
  TODO:
  pre-select active coin
*/
class Atomic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      api: null,
      coin: null,
      input: null,
    };
    this.updateSelectedAPI = this.updateSelectedAPI.bind(this);
    this.updateSelectedCoin = this.updateSelectedCoin.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.getAtomicData = this.getAtomicData.bind(this);
  }

  updateSelectedAPI(e) {
    this.setState(Object.assign({}, this.state, {
      'api': e.target.value,
    }));
  }

  updateSelectedCoin(e) {
    this.setState(Object.assign({}, this.state, {
      'coin': e.target.value.split('|')[0],
    }));
  }

  updateInput(e) {
    this.setState(Object.assign({}, this.state, {
      'input': e.target.value,
    }));
  }

  getAtomicData() {
    const tmpIguanaRPCAuth = `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`;
    let ExplorerInputData;

    switch (this.state.api) {
      case 'history':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'timeout': 20000,
          'agent': 'basilisk',
          'method': 'history',
          'vals': {
            'coin': this.state.coin,
            'addresses': [ this.state.input ]
          }
        };
        break;
      case 'getbalance':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'method': 'getbalance',
          'params': [ this.state.input ]
        };
        break;
      case 'listunspent':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'method': 'listunspent',
          'params': [
            1,
            9999999,
            [ this.state.input ]
          ]
        };
        break;
      case 'txid':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'method': 'getrawtransaction',
          'params': [ this.state.input ]
        };
        break;
      case 'blockash':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'agent': 'bitcoinrpc',
          'method': 'getblockhash',
          'height': this.state.input
        };
        break;
      case 'chaintip':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'agent': 'bitcoinrpc',
          'method': 'getbestblockhash'
        };
        break;
      case 'activehandle':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'SuperNET',
          'method': 'activehandle'
        };
        break;
      case 'gettransaction':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'coin': this.state.coin,
          'agent': 'bitcoinrpc',
          'method': 'gettransaction',
          'txid': this.state.input
        };
        break;
      case 'dex_getinfo':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getinfo',
          'symbol': this.state.coin
        };
        break;
      case 'dex_getnotaries':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getnotaries',
          'symbol': this.state.coin
        };
        break;
      case 'dex_alladdresses':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'alladdresses',
          'symbol': this.state.coin
        };
        break;
      case 'dex_importaddress':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'importaddress',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_checkaddress':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'checkaddress',
          'ddress': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_validateaddress':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'validateaddress',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_getbestblockhash':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getbestblockhash',
          'symbol': this.state.coin
        };
        break;
      case 'dex_listtransactions':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'listtransactions',
          'address': this.state.input,
          'count': 100,
          'skip': 0,
          'symbol': this.state.coin
        };
        break;
      case 'dex_listtransactions2':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'listtransactions2',
          'address': this.state.input,
          'count': 100,
          'skip': 0,
          'symbol': this.state.coin
        };
        break;
      case 'dex_listunspent':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'listunspent',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_listspent':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'listspent',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_listunspent2':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'listunspent2',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_getblockhash':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getblockhash',
          'height': 100,
          'symbol': this.state.coin
        };
        break;
      case 'dex_getblock':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getblock',
          'hash': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_gettxin':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'gettxin',
          'vout': 0,
          'txid': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_gettxout':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'gettxout',
          'vout': 0,
          'txid': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_gettransaction':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'gettransaction',
          'txid': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_getbalance':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getbalance',
          'address': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'dex_getsupply':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'getbalance',
          'address': '*',
          'symbol': this.state.coin,
          'timeout': 600000
        };
        break;
      case 'dex_sendrawtransaction':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'dex',
          'method': 'sendrawtransaction',
          'signedtx': this.state.input,
          'symbol': this.state.coin
        };
        break;
      case 'basilisk_refresh':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'basilisk',
          'method': 'refresh',
          'address': this.state.input,
          'symbol': this.state.coin,
          'timeout': 600000
        };
        break;
      case 'jumblr_status':
        ExplorerInputData = {
          'userpass': tmpIguanaRPCAuth,
          'agent': 'jumblr',
          'method': 'status'
        };
        break;
    }

    Store.dispatch(atomic(ExplorerInputData));
  }

  componentWillReceiveProps(props) {
    if (props && props.Atomic.response) {
      if (this.state.api === 'txid' ||
          this.state.api === 'dex_getbestblockhash' ||
          this.state.api === 'dex_sendrawtransaction' ||
          this.state.api === 'dex_getblockhash') {
        this.setState(Object.assign({}, this.state, {
          'output': props.Atomic.response,
        }));
      } else {
        this.setState(Object.assign({}, this.state, {
          'output': JSON.stringify(props.Atomic.response, null, '\t'),
        }));
      }

      if (props.Atomic.response.error === 'less than required responses') {
        Store.dispatch(triggerToaster(true, 'Basilisk connection error', translate('TOASTR.SERVICE_NOTIFICATION'), 'error'));
      }
    }
  }

  renderAtomicOptions() {
    const _options = [
      {
        method: 'history',
        name: 'Address History',
      },
      {
        method: 'getbalance',
        name: 'Get Balance',
      },
      {
        method: 'listunspent',
        name: 'List Unspent',
      },
      {
        method: 'txid',
        name: 'Transaction ID',
      },
      {
        method: 'blockash',
        name: 'Block Hash',
      },
      {
        method: 'chaintip',
        name: 'Chain Tip',
      },
      {
        method: 'activehandle',
        name: 'Active Handle',
      },
      {
        method: 'gettransaction',
        name: 'Get Transaction',
      },
      {
        method: 'dex_alladdresses',
        name: 'DEX All Addresses',
      },
      {
        method: 'dex_importaddress',
        name: 'DEX Import Address',
      },
      {
        method: 'dex_checkaddress',
        name: 'DEX Check Address',
      },
      {
        method: 'dex_validateaddress',
        name: 'DEX Validate Address',
      },
      {
        method: 'dex_getinfo',
        name: 'DEX Get Info',
      },
      {
        method: 'dex_getnotaries',
        name: 'DEX Get Notaries',
      },
      {
        method: 'dex_getbestblockhash',
        name: 'DEX Get Best Block Has',
      },
      {
        method: 'dex_getblock',
        name: 'DEX Get Block',
      },
      {
        method: 'dex_gettxin',
        name: 'DEX Get Txin',
      },
      {
        method: 'dex_gettxout',
        name: 'DEX Get Txout',
      },
      {
        method: 'dex_gettransaction',
        name: 'DEX Get Transaction',
      },
      {
        method: 'dex_getbalance',
        name: 'DEX Get Balance',
      },
      {
        method: 'dex_getsupply',
        name: 'DEX Get Supply',
      },
      {
        method: 'dex_listtransactions',
        name: 'DEX List Transactions',
      },
      {
        method: 'dex_listtransactions2',
        name: 'DEX List Transactions 2',
      },
      {
        method: 'dex_listspent',
        name: 'DEX List Spent',
      },
      {
        method: 'dex_listunspent',
        name: 'DEX List Unspent',
      },
      {
        method: 'dex_listunspent2',
        name: 'DEX List Unspent 2',
      },
      {
        method: 'dex_sendrawtransaction',
        name: 'DEX Send Raw Transaction',
      },
      {
        method: 'basilisk_refresh',
        name: 'Basilisk Refresh',
      },
      {
        method: 'jumblr_status',
        name: 'Jumbler Status',
      },
    ];

    let items = [];

    for (let i = 0; i < _options.length; i++) {
      items.push(
        <option key={ _options[i].method } value={ _options[i].method }>{ _options[i].name }</option>
      );
    }

    return items;
  }

  render() {
    return AtomicRender.call(this);
  }
}

export default Atomic;
