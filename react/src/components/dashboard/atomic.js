import React from 'react';
import { translate } from '../../translate/translate';
/*import { dashboardChangeSection, toggleAddcoinModal, logout } from '../../actions/actionCreators';
import Store from '../../store';*/
import AddCoinOptionsCrypto from '../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../addcoin/addcoinOptionsACFiat';

class Atomic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                      <select className="form-control form-material" id="atomic_explorer_select_coin_options">
                        <option value="-">{translate('INDEX.SELECT_COIN')}</option>
                        <AddCoinOptionsCrypto />
                        <AddCoinOptionsAC />
                        <AddCoinOptionsACFiat />
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12" style={{textAlign: 'center'}}>
                    <select className="form-control form-material" id="atomic_explorer_select_command_options">
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
                    <input type="text" className="form-control" id="atomic_explorer_input_data" name="atomic_explorer_input_data" placeholder="addr, txid, blockash etc." />
                  </div>
                  <div className="col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
                    <button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-dismiss="modal" id="atomic_explorer_getcoinpeers_btn">Submit</button>
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
                    <pre id="atomic-explorer-commands-output"></pre>
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
