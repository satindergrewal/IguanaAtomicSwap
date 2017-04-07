import React from 'react';
import { translate } from '../../translate/translate';
import { atomic } from '../../actions/actionCreators';
import Store from '../../store';
import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';

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
    const tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
    var ExplorerInputData;

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
        console.log('error');
        //toastr.error(_lang[defaultLang].DASHBOARD.LESS_RESPONSES_REQ, _lang[defaultLang].DASHBOARD.BASILISC_NOTIFICATION)
      }
    }
  }

  render() {
    return (
      <div className="page" data-animsition-in="fade-in" data-animsition-out="fade-out" style={{marginLeft: '0'}}>
        <div className="page-content" id="section-iguana-atomic-explorer">
          <div className="row" id="atomic-explorer" data-plugin="masonry">
            <div className="col-xlg-12 col-md-12">
              <h4 className="font-size-14 text-uppercase">Atomic Explorer</h4>
              <div className="panel panel-bordered">
                <div className="panel-body">
                  <div className="col-sm-4 col-xs-12">
                    <div className="form-group">
                      <select className="form-control form-material" id="atomic_explorer_select_coin_options" onChange={this.updateSelectedCoin}>
                        <option value="-">{translate('INDEX.SELECT_COIN')}</option>
                        <AddCoinOptionsCrypto />
                        <AddCoinOptionsAC />
                        <AddCoinOptionsACFiat />
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                    <select className="form-control form-material" id="atomic_explorer_select_command_options" onChange={this.updateSelectedAPI}>
                      <option value="">-Select Command-</option>
                      <option value="history">Address History</option>
                      <option value="getbalance">Get Balance</option>
                      <option value="listunspent">List Unspent</option>
                      <option value="txid">Transaction ID</option>
                      <option value="blockash">Block Hash</option>
                      <option value="chaintip">Chain Tip</option>
                      <option value="activehandle">Active Handle</option>
                      <option value="gettransaction">Get Transaction</option>
                      <option value="dex_alladdresses">DEX All Addresses</option>
                      <option value="dex_importaddress">DEX Import Address</option>
                      <option value="dex_checkaddress">DEX Check Address</option>
                      <option value="dex_validateaddress">DEX Validate Address</option>
                      <option value="dex_getinfo">DEX Get Info</option>
                      <option value="dex_getnotaries">DEX Get Notaries</option>
                      <option value="dex_getbestblockhash">DEX Get Best Block Hash</option>
                      <option value="dex_getblockhash">DEX Get Block Hash</option>
                      <option value="dex_getblock">DEX Get Block</option>
                      <option value="dex_gettxin">DEX Get txin</option>
                      <option value="dex_gettxout">DEX Get txout</option>
                      <option value="dex_gettransaction">DEX Get Transaction</option>
                      <option value="dex_getbalance">DEX Get Balance</option>
                      <option value="dex_getsupply">DEX Get Supply</option>
                      <option value="dex_listtransactions">DEX List Transactions</option>
                      <option value="dex_listtransactions2">DEX List Transactions 2</option>
                      <option value="dex_listspent">DEX List Spent</option>
                      <option value="dex_listunspent">DEX List Unspent</option>
                      <option value="dex_listunspent2">DEX List Unspent 2</option>
                      <option value="dex_sendrawtransaction">DEX Send Raw Transaction</option>
                      <option value="basilisk_refresh">Basilisk Refresh</option>
                      <option value="jumblr_status">Jumbler Status</option>
                    </select>
                  </div>
                  <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                    <input type="text" className="form-control" id="atomic_explorer_input_data" name="atomic_explorer_input_data" placeholder="addr, txid, blockash etc." onChange={this.updateInput} />
                  </div>
                  <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                    <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="atomic_explorer_getcoinpeers_btn" onClick={this.getAtomicData}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xlg-4 col-md-12">
              <div className="panel">
                <div className="panel-heading">
                  <h3 className="panel-title">Raw Output</h3>
                </div>
                <div className="panel-body">
                  <div className="tab-content">
                    <pre id="atomic-explorer-commands-output">{this.state.output}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Atomic;
