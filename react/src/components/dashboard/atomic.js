import React from 'react';
import { translate } from '../../translate/translate';
/*import { dashboardChangeSection, toggleAddcoinModal, logout } from '../../actions/actionCreators';
import Store from '../../store';*/

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
                        <optgroup label="Crypto Currencies">
                          <option value="ANC|full" data-full-mode="true">AnonCoin (ANC)</option>
                          <option value="BTC|full|basilisk">Bitcoin (BTC)</option>
                          <option value="BTCD|full">BitcoinDark (BTCD)</option>
                          <option value="BTM|full">Bitmark (BTM)</option>
                          <option value="CARB|full">Carboncoin (CARB)</option>
                          <option value="DGB|full">Digibyte (DGB)</option>
                          <option value="DOGE|full">Dogecoin (DOGE)</option>
                          <option value="FRK|full">Franko (FRK)</option>
                          <option value="GMC|full">Gamerscoin (GMC)</option>
                          <option value="KMD|basilisk|native">Komodo (KMD)</option>
                          <option value="LTC|full">Litecoin (LTC)</option>
                          <option value="MZC|full">MazaCoin (MZC)</option>
                          <option value="SYS|full">SysCoin (SYS)</option>
                          <option value="UNO|full">Unobtanium (UNO)</option>
                          <option value="ZEC|full">Zcash (ZEC)</option>
                          <option value="ZET|full">Zetacoin (ZET)</option>
                        </optgroup>
                        <optgroup label="Assetchains">
                          <option value="BET|basilisk|native">BET (BET)</option>
                          <option value="BOTS|basilisk|native">BOTS (BOTS)</option>
                          <option value="CEAL|basilisk|native">CEAL NET (CEAL)</option>
                          <option value="CRYPTO|basilisk|native">CRYPTO (CRYPTO)</option>
                          <option value="HOD|basilisk|native">HODL (HODL)</option>
                          <option value="DEX|basilisk|native">InstantDEX (DEX)</option>
                          <option value="JUMBLR|basilisk|native">JUMBLR (JUMBLR)</option>
                          <option value="KV|basilisk|native">KV (KV)</option>
                          <option value="MGW|basilisk|native">MultiGateway (MGW)</option>
                          <option value="MVP|basilisk|native">MVP Lineup (MVP)</option>
                          <option value="PANGEA|basilisk|native">PANGEA (PANGEA)</option>
                          <option value="REVS|basilisk|native">REVS (REVS)</option>
                          <option value="SHARK|basilisk|native">SHARK (SHARK)</option>
                          <option value="MESH|basilisk|native">SpaceMesh (MESH)</option>
                          <option value="SUPERNET|basilisk|native">SUPERNET (SUPERNET)</option>
                          <option value="WIRELESS|basilisk|native">WIRELESS (WIRELESS)</option>
                        </optgroup>
                        <optgroup label="Fiat Currencies">
                          <option value="AUD|basilisk|native">Australian Dollar (AUD)</option>
                          <option value="BRL|basilisk|native">Brazilian Real (BRL)</option>
                          <option value="GBP|basilisk|native">British Pound (GBP)</option>
                          <option value="BGN|basilisk|native">Bulgarian Lev (BGN)</option>
                          <option value="CAD|basilisk|native">Canadian Dollar (CAD)</option>
                          <option value="HRK|basilisk|native">Croatian Kuna (HRK)</option>
                          <option value="CZK|basilisk|native">Czech Koruna (CZK)</option>
                          <option value="CNY|basilisk|native">Chinese Yuan (CNY)</option>
                          <option value="DKK|basilisk|native">Danish Krone (DKK)</option>
                          <option value="EUR|basilisk|native">Euro (EUR)</option>
                          <option value="HKD|basilisk|native">Hong Kong Dollar (HKD)</option>
                          <option value="HUF|basilisk|native">Hungarian Forint (HUF)</option>
                          <option value="INR|basilisk|native">Indian Rupee (INR)</option>
                          <option value="IDR|basilisk|native">Indonesian Rupiah (IDR)</option>
                          <option value="ILS|basilisk|native">Israeli Shekel (ILS)</option>
                          <option value="JPY|basilisk|native">Japanese Yen (JPY)</option>
                          <option value="KRW|basilisk|native">Korean Won (KRW)</option>
                          <option value="MYR|basilisk|native">Malaysian Ringgit (MYR)</option>
                          <option value="MXN|basilisk|native">Mexican peso (MXN)</option>
                          <option value="NZD|basilisk|native">New Zealand Dollar (NZD)</option>
                          <option value="NOK|basilisk|native">Norwegian Krone (NOK)</option>
                          <option value="PHP|basilisk|native">Philippine Peso (PHP)</option>
                          <option value="PLN|basilisk|native">Polish Zloty (PLN)</option>
                          <option value="RON|basilisk|native">Romanian Leu (RON)</option>
                          <option value="RUB|basilisk|native">Russian Ruble (RUB)</option>
                          <option value="SGD|basilisk|native">Singapore Dollar (SGD)</option>
                          <option value="ZAR|basilisk|native">South African Rand (ZAR)</option>
                          <option value="SEK|basilisk|native">Swedish Krona (SEK)</option>
                          <option value="CHF|basilisk|native">Swiss Franc (CHF)</option>
                          <option value="THB|basilisk|native">Thai Baht (THB)</option>
                          <option value="TRY|basilisk|native">Turkish Lira (TRY)</option>
                          <option value="USD|basilisk|native">US Dollar (USD)</option>
                        </optgroup>
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
