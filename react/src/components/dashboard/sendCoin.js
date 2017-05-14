import React from 'react';
import Config from '../../config';
import { translate } from '../../translate/translate';
import {
  checkTimestamp,
  secondsElapsedToString,
  secondsToString
} from '../../util/time';
import { edexGetTxIDList, edexRemoveTXID } from '../../util/cacheFormat';
import {
  sendToAddress,
  sendFromAddress,
  sendNativeTx,
  getKMDOPID,
  resolveOpenAliasAddress,
  triggerToaster,
  iguanaUTXORawTX,
  clearLastSendToResponseState,
  sendToAddressStateAlt,
  dexSendRawTX,
  fetchUtxoCache,
  basiliskRefresh,
  edexGetTransaction,
  getCacheFile,
  shepherdGroomPostPromise
} from '../../actions/actionCreators';
import Store from '../../store';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect('http://127.0.0.1:' + Config.agamaPort);

// TODO: prevent any cache updates rather than utxo while on send coin form

class SendCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      sendFrom: this.props.Dashboard && this.props.Dashboard.activeHandle ? this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] : null,
      sendFromAmount: 0,
      sendTo: '',
      sendToOA: null,
      amount: 0,
      fee: 0.0001,
      sendSig: false,
      sendApiType: false,
      addressSelectorOpen: false,
      currentStackLength: 0,
      totalStackLength: 0,
      utxoMethodInProgress: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleBasiliskSend = this.handleBasiliskSend.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
    this.toggleSendSig = this.toggleSendSig.bind(this);
    this.getOAdress = this.getOAdress.bind(this);
    this.toggleSendAPIType = this.toggleSendAPIType.bind(this);
    this._fetchNewUTXOData = this._fetchNewUTXOData.bind(this);
    socket.on('messages', msg => this.updateSocketsData(msg));
  }

  componentWillReceiveProps(props) {
    if (!this.state.sendFrom && this.props.ActiveCoin.activeAddress) {
      this.setState(Object.assign({}, this.state, {
        sendFrom: this.props.ActiveCoin.activeAddress,
      }));
    }
  }

  updateSocketsData(data) {
    console.log('sockets', data);
    if (data && data.message && data.message.shepherd.iguanaAPI &&
        data.message.shepherd.iguanaAPI.totalStackLength) {
      this.setState(Object.assign({}, this.state, {
        totalStackLength: data.message.shepherd.iguanaAPI.totalStackLength,
      }));
    }
    if (data && data.message && data.message.shepherd.iguanaAPI &&
        data.message.shepherd.iguanaAPI.currentStackLength) {
      this.setState(Object.assign({}, this.state, {
        currentStackLength: data.message.shepherd.iguanaAPI.currentStackLength,
      }));
    }
    if (data && data.message && data.message.shepherd.method &&
        data.message.shepherd.method === 'cache-one' &&
        data.message.shepherd.status === 'done') {
      Store.dispatch(basiliskRefresh(false));
    }
  }

  _fetchNewUTXOData() {
    Store.dispatch(fetchUtxoCache({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'refresh',
      'address': this.state.sendFrom,
    }));
  }

  renderUTXOCacheInfo() {
    if (this.props.ActiveCoin.mode === 'basilisk' &&
        this.state.sendFrom &&
        !this.state.sendApiType &&
        this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom]) {
        let refreshCacheData,
            timestamp,
            isReadyToUpdate,
            waitUntilCallIsFinished = this.state.currentStackLength > 1 ? true : false;

      if (this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh ||
        this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].listunspent) {
        refreshCacheData = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh || this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].listunspent;
        timestamp = checkTimestamp(refreshCacheData.timestamp);
        isReadyToUpdate = timestamp > 600 ? true : false;
      } else {
        isReadyToUpdate = true;
      }

      if (this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh &&
          this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh.data &&
          this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh.data.error &&
          this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh.data.error === 'request failed') {
        timestamp = null;
      }

      return (
        <div className="col-lg-12">
          <hr />
          Total UTXO available: {refreshCacheData ? refreshCacheData.data && refreshCacheData.data.length : 'N/A. Press update button.'}<br />
          <div className={!timestamp ? 'hide' : ''}>
            Last updated @ {secondsToString(refreshCacheData ? refreshCacheData.timestamp : 0, true)} | {secondsElapsedToString(timestamp || 0)} ago<br />
          </div>
          <div className={isReadyToUpdate ? 'hide' : ''}>Next update available in {secondsElapsedToString(600 - timestamp)}s</div>
          <div className={this.state.currentStackLength === 1 || (this.state.currentStackLength === 0 && this.state.totalStackLength === 0) ? 'hide' : 'progress progress-sm'} style={{width: '100%', marginBottom: '10px', marginTop: '10px'}}>
            <div className="progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success" style={{width: 100 - (this.state.currentStackLength * 100 / this.state.totalStackLength) + '%', fontSize: '80%'}} role="progressbar">
              Processing requests: {this.state.currentStackLength} / {this.state.totalStackLength}
            </div>
          </div>
          <button type="button" style={{marginTop: '10px'}} className={isReadyToUpdate ? 'btn btn-primary waves-effect waves-light' : 'hide'} onClick={this._fetchNewUTXOData} disabled={waitUntilCallIsFinished}>
            {waitUntilCallIsFinished ? 'Locked, please wait...' : 'Update'}
          </button>
        </div>
      );
    } else {
      return null;
    }
    /*
          <hr />
          <div>
            Split funds
            <hr />
          </div>
    */
  }

  renderAddressAmount(address) {
    if (this.props.ActiveCoin.addresses &&
        this.props.ActiveCoin.addresses.public &&
        this.props.ActiveCoin.addresses.public.length) {
      for (let i = 0; i < this.props.ActiveCoin.addresses.public.length; i++) {
        if (this.props.ActiveCoin.addresses.public[i].address === address) {
          if (this.props.ActiveCoin.addresses.public[i].amount !== 'N/A') {
            return this.props.ActiveCoin.addresses.public[i].amount;
          }
        }
      }
    } else {
      return 0;
    }
  }

  renderAddressByType(type) {
    if (this.props.ActiveCoin.addresses &&
        this.props.ActiveCoin.addresses[type] &&
        this.props.ActiveCoin.addresses[type].length) {
      if (this.state.sendApiType) {
        const mainAddress = this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin];
        const mainAddressAmount = this.renderAddressAmount(mainAddress);

        return(
          <li data-original-index="2" key={mainAddress} className={mainAddressAmount <= 0 ? 'hide' : ''}>
            <a tabIndex="0" onClick={() => this.updateAddressSelection(mainAddress, type, mainAddressAmount)}><i className={type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {mainAddressAmount} {this.props.ActiveCoin.coin} ]  {mainAddress}</span><span className="glyphicon glyphicon-ok check-mark"></span></a>
          </li>
        );
      } else {
        let items = [];

        for (let i = 0; i < this.props.ActiveCoin.addresses[type].length; i++) {
          const address = this.props.ActiveCoin.addresses[type][i];
          let _amount = address.amount;

          if (this.props.ActiveCoin.mode === 'basilisk') {
            _amount = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address.address].getbalance.data && this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address.address].getbalance.data.balance ? this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address.address].getbalance.data.balance : 'N/A';
          }

          items.push(
            <li data-original-index="2" key={address.address} className={address.amount <= 0 ? 'hide' : ''}>
              <a tabIndex="0" onClick={() => this.updateAddressSelection(address.address, type, _amount)}><i className={type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {_amount} {this.props.ActiveCoin.coin} ]  {address.address}</span><span className="glyphicon glyphicon-ok check-mark"></span></a>
            </li>
          );
        }

        return items;
      }
    } else {
      return null;
    }
  }

  renderSelectorCurrentLabel() {
    if (this.state.sendFrom) {
      return (
        <span>
          <i className={this.state.addressType === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {this.state.sendFromAmount} {this.props.ActiveCoin.coin} ]  {this.state.sendFrom}</span>
        </span>
      );
    } else if (this.state.sendApiType) {
      const mainAddress = this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin];
      const mainAddressAmount = this.renderAddressAmount(mainAddress);

      return (
        <span>
          <i className={this.state.addressType === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {mainAddressAmount} {this.props.ActiveCoin.coin} ]  {mainAddress}</span>
        </span>
      );
    } else {
      return (
        <span>- Select Transparent or Private Address -</span>
      );
    }
  }

  renderAddressList() {
    return (
      <div className={'btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ' + (this.state.addressSelectorOpen ? 'open' : '')}>
        <button type="button" className="btn dropdown-toggle btn-info" data-toggle="dropdown" data-id="kmd_wallet_send_from" title="- Select Transparent or Private Address -" aria-expanded="true" onClick={this.openDropMenu}>
          <span className="filter-option pull-left">{this.renderSelectorCurrentLabel()} </span>&nbsp;<span className="bs-caret"><span className="caret"></span></span>
        </button>
        <div className="dropdown-menu open">
          <ul className="dropdown-menu inner" role="menu">
            <li className="selected">
              <a tabIndex="0"><span className="text"> - Select Transparent or Private Address - </span><span className="glyphicon glyphicon-ok check-mark"></span></a>
            </li>
            {this.renderAddressByType('public')}
          </ul>
        </div>
      </div>
    );
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  updateAddressSelection(address, type, amount) {
    let _sendFromAmount = amount ? amount : this.props.ActiveCoin.addresses[type][address].amount;

    if (this.props.ActiveCoin.mode === 'basilisk') {
      _sendFromAmount = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address].getbalance.data && this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address].getbalance.data.balance ? this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][address].getbalance.data.balance : 'N/A';
    }

    this.setState(Object.assign({}, this.state, {
      sendFrom: address,
      addressType: type,
      sendFromAmount: _sendFromAmount,
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  changeSendCoinStep(step) {
    if (step === 0) {
      Store.dispatch(clearLastSendToResponseState());

      this.setState({
        currentStep: 0,
        sendFrom: this.props.Dashboard && this.props.Dashboard.activeHandle ? this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] : null,
        sendFromAmount: 0,
        sendTo: '',
        sendToOA: null,
        amount: 0,
        fee: 0.0001,
        sendSig: false,
        sendApiType: false,
        addressSelectorOpen: false,
        currentStackLength: 0,
        totalStackLength: 0,
        utxoMethodInProgress: false,
      });
    }

    if (step === 1 || step === 2) {
      this.setState(Object.assign({}, this.state, {
        currentStep: step,
        utxoMethodInProgress: !this.state.sendApiType && this.props.ActiveCoin.mode === 'basilisk' ? true : false,
      }));
    }

    if (step === 2) {
      if (!this.state.sendApiType && this.props.ActiveCoin.mode === 'basilisk') {
        this.handleBasiliskSend();
      } else {
        Store.dispatch(sendToAddress(this.props.ActiveCoin.coin, this.state));
      }
    }
  }

  toggleSendSig() {
    this.setState(Object.assign({}, this.state, {
      sendSig: !this.state.sendSig,
    }));
  }

  toggleSendAPIType() {
    this.setState(Object.assign({}, this.state, {
      sendApiType: !this.state.sendApiType,
      fee: !this.state.sendApiType ? 0 : 0.0001,
      sendFrom: this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin],
    }));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // TODO: move to action creators
  handleBasiliskSend() {
    const refreshData = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].refresh;
    const listunspentData = this.props.ActiveCoin.cache[this.props.ActiveCoin.coin][this.state.sendFrom].listunspent;
    const utxoSet = (refreshData && refreshData.data) || (listunspentData && listunspentData.data);
    const _pubkey = this.props.Dashboard.activeHandle.pubkey;
    const forceUpdateCache = this._fetchNewUTXOData;
    const _sendFrom = this.state.sendFrom;
    const sendData = {
            'coin': this.props.ActiveCoin.coin,
            'sendfrom': this.state.sendFrom,
            'sendtoaddr': this.state.sendTo,
            'amount': this.state.amount,
            'txfee': this.state.fee,
            'sendsig': this.state.sendSig === true ? 0 : 1,
            'utxos': utxoSet
          };

    iguanaUTXORawTX(sendData)
    .then(function(json) {
      console.log('sendData', sendData);
      console.log('iguanaUTXORawTXJSON', json);
      if (json.result === 'success' && json.completed === true) {
        Store.dispatch(triggerToaster(true, translate('TOASTR.SIGNED_TX_GENERATED') + '.', translate('TOASTR.WALLET_NOTIFICATION'), 'success'));

        if (sendData.sendsig === 1) {
          const dexrawtxData = {
            'signedtx': json.signedtx,
            'coin': sendData.coin
          };
          dexSendRawTX(dexrawtxData)
          .then(function(dexRawTxJSON) {
            console.log('dexRawTxJSON', dexRawTxJSON);
            if (dexRawTxJSON.indexOf('"error":{"code"') > -1) {
              Store.dispatch(triggerToaster(true, 'Transaction failed', translate('TOASTR.WALLET_NOTIFICATION'), 'error'));
              Store.dispatch(sendToAddressStateAlt(JSON.parse(dexRawTxJSON)));

              this.setState(Object.assign({}, this.state, {
                utxoMethodInProgress: false,
              }));
            } else {
              Store.dispatch(triggerToaster(true, translate('TOASTR.SIGNED_TX_SENT'), translate('TOASTR.WALLET_NOTIFICATION'), 'success'));
              Store.dispatch(sendToAddressStateAlt(json));

              let getTxidData = function() {
                return new Promise(function(resolve, reject) {
                  Store.dispatch(triggerToaster(true, translate('TOASTR.GETTING_TXID_INFO') + '.', translate('TOASTR.WALLET_NOTIFICATION'), 'info'));

                  edexGetTransaction({
                    'coin': sendData.coin,
                    'txid': dexRawTxJSON.txid ? dexRawTxJSON.txid : dexRawTxJSON
                  })
                  .then(function(json) {
                    console.log('gettx', json);
                    resolve(json);
                  });
                });
              }

              let processRefreshUTXOs = function(vinData) {
                console.log('vin', vinData);

                return new Promise(function(resolve, reject) {
                  let edexGetTxIDListRes = edexGetTxIDList(vinData);
                  resolve(edexGetTxIDListRes);
                });
              }

              let getDataCacheContents = function(txidListToRemove) {
                return new Promise(function(resolve, reject) {
                  console.log(txidListToRemove);
                  console.log(sendData);

                  getCacheFile(_pubkey)
                  .then(function(result) {
                    console.log('got cache file', result);
                    let saveThisData = edexRemoveTXID(result.result, _sendFrom, txidListToRemove);
                    console.log('saveThisData', saveThisData);
                    resolve(saveThisData);
                  });
                });
              }

              let saveNewCacheData = function(saveThisData) {
                return new Promise(function(resolve, reject) {
                  console.log('saveNewCacheData', saveThisData);

                  shepherdGroomPostPromise(_pubkey, saveThisData)
                  .then(function(result) {
                    console.log('saveNewCacheData', saveThisData);
                    console.log(result);
                    resolve(result);
                    forceUpdateCache();
                    Store.dispatch(triggerToaster(true, 'Local UTXO data is updated. Ready to send new transaction.', translate('TOASTR.WALLET_NOTIFICATION'), 'info'));

                    this.setState(Object.assign({}, this.state, {
                      utxoMethodInProgress: false,
                    }));
                  }.bind(this));
                }.bind(this));
              }.bind(this);

              Store.dispatch(triggerToaster(true, 'Awaiting transaction data response...', translate('TOASTR.WALLET_NOTIFICATION'), 'info'));

              function waterfallUTXOProcess() {
                Store.dispatch(triggerToaster(true, 'Processing UTXO...', translate('TOASTR.WALLET_NOTIFICATION'), 'info'));

                getTxidData()
                .then(function(gettxdata) {
                  return processRefreshUTXOs(gettxdata.vin);
                })
                .then(function(new_utxos_set) {
                  return getDataCacheContents(new_utxos_set);
                })
                .then(function(save_this_data) {
                  return saveNewCacheData(save_this_data);
                });
              }

              let sentTxData = setInterval(function() {
                getTxidData()
                .then(function(gettxdata) {
                  if (gettxdata.vin && gettxdata.vin.length) {
                    clearInterval(sentTxData);
                    waterfallUTXOProcess();
                  }
                })
              }, 1000);

              console.log('utxo remove', true);
            }
          }.bind(this));
        } else {
          Store.dispatch(sendToAddressStateAlt(json));

          this.setState(Object.assign({}, this.state, {
            utxoMethodInProgress: false,
          }));
        }
      } else {
        Store.dispatch(sendToAddressStateAlt(json));
        Store.dispatch(triggerToaster(true, translate('TOASTR.SIGNED_TX_GENERATED_FAIL') + '.', translate('TOASTR.WALLET_NOTIFICATION'), 'error'));

        this.setState(Object.assign({}, this.state, {
          utxoMethodInProgress: false,
        }));
      }

      console.log(json);
    }.bind(this));
  }

  renderSignedTx(isRawTx) {
    let substrBlocks;

    if (this.props.ActiveCoin.mode === 'basilisk') {
      substrBlocks = isRawTx ? 3 : 8;
    } else {
      substrBlocks = 10;
    }

    const _lastSendToResponse = this.props.ActiveCoin.lastSendToResponse[isRawTx ? 'rawtx' : 'signedtx'];
    const substrLength = _lastSendToResponse.length / substrBlocks;
    let out = [];

    for (let i = 0; i < substrBlocks; i++) {
      out.push(
        <div key={i}>{_lastSendToResponse.substring(i * substrLength, substrLength * i + substrLength)}</div>
      );
    }

    return out.length ? out : null;
  }

  renderKey(key) {
    if (key === 'signedtx') {
      return this.renderSignedTx();
    } else if (key === 'rawtx') {
      return this.renderSignedTx(true);
    } else if (key === 'complete' || key === 'completed' || key === 'result') {
      if (this.props.ActiveCoin.lastSendToResponse[key] === true || this.props.ActiveCoin.lastSendToResponse[key] === 'success') {
        return (
          <span className="label label-success">{this.props.ActiveCoin.lastSendToResponse[key] === true ? 'true' : 'success'}</span>
        );
      } else {
        if (key === 'result' && this.props.ActiveCoin.lastSendToResponse.result && typeof this.props.ActiveCoin.lastSendToResponse.result !== 'object') {
          return (
            <span>{this.props.ActiveCoin.lastSendToResponse.result}</span>
          );
        } else {
          return (
            <span className="label label-danger">false</span>
          );
        }
      }
    } else if (key === 'error') {
      if (Object.keys(this.props.ActiveCoin.lastSendToResponse[key]).length) {
        return (
          <span>{JSON.stringify(this.props.ActiveCoin.lastSendToResponse[key], null, '\t')}</span>
        );
      } else {
        return (
          <span className="label label-danger">{this.props.ActiveCoin.lastSendToResponse[key]}</span>
        );
      }
    } else if (key === 'sendrawtransaction') {
      if (this.props.ActiveCoin.lastSendToResponse[key] === 'success') {
        return (
          <span className="label label-success">true</span>
        );
      } else {
        return (
          <span className="label label-danger">false</span>
        );
      }
    } else if (key === 'txid' || key === 'sent') {
      return (
        <span>{this.props.ActiveCoin.lastSendToResponse[key]}</span>
      );
    } else if (key === 'tag') {
      return null;
    }
  }

  renderSendCoinResponse() {
    if (this.props.ActiveCoin.lastSendToResponse) {
      return Object.keys(this.props.ActiveCoin.lastSendToResponse).map((key, index) =>
        <tr key={key}>
          <td>{key}</td>
          <td>{this.renderKey(key)}</td>
        </tr>
      );
    } else {
      return (
        <div style={{padding: '20px', textAlign: 'center'}}>
          <div style={{padding: '10px 0'}}>
            Processing transaction...<br />
            Note: it may take a few minutes to complete the transaction.
          </div>
          <div className="loader-wrapper active">
            <div className="loader-layer loader-blue">
              <div className="loader-circle-left">
                <div className="circle"></div>
              </div>
              <div className="loader-circle-gap"></div>
              <div className="loader-circle-right">
                <div className="circle"></div>
              </div>
            </div>
            <div className="loader-layer loader-red">
              <div className="loader-circle-left">
                <div className="circle"></div>
              </div>
              <div className="loader-circle-gap"></div>
              <div className="loader-circle-right">
                <div className="circle"></div>
              </div>
            </div>
            <div className="loader-layer loader-green">
              <div className="loader-circle-left">
                <div className="circle"></div>
              </div>
              <div className="loader-circle-gap"></div>
              <div className="loader-circle-right">
                <div className="circle"></div>
              </div>
            </div>
            <div className="loader-layer loader-yellow">
              <div className="loader-circle-left">
                <div className="circle"></div>
              </div>
              <div className="loader-circle-gap"></div>
              <div className="loader-circle-right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  getOAdress() {
    resolveOpenAliasAddress(this.state.sendToOA)
    .then(function(json) {
      const reply = json.Answer;

      if (reply && reply.length) {
        for (let i = 0; i < reply.length; i++) {
          const _address = reply[i].data.split(' ');
          const coin = _address[0].replace('"oa1:', '');
          const coinAddress = _address[1].replace('recipient_address=', '').replace(';', '');

          if (coin.toUpperCase() === this.props.ActiveCoin.coin) {
            this.setState(Object.assign({}, this.state, {
              sendTo: coinAddress,
            }));
          }
        }

        if (this.state.sendTo === '') {
          Store.dispatch(triggerToaster(true, 'Couldn\'t find any ' + this.props.ActiveCoin.coin + ' addresses', 'OpenAlias', 'error'));
        }
      } else {
        Store.dispatch(triggerToaster(true, 'Couldn\'t find any addresses', 'OpenAlias', 'error'));
      }
    }.bind(this));
  }

  renderOASendUI() {
    if (Config.openAlias) {
      return (
        <div className="row">
          <div className="col-lg-6 form-group form-material">
            <label className="control-label" htmlFor="kmd_wallet_sendto">Fetch OpenAlias recipient address</label>
            <input type="text" className="form-control" name="sendToOA" onChange={this.updateInput} id="kmd_wallet_sendto" placeholder="Enter an alias as address@site.com" autoComplete="off" required />
          </div>
          <div className="col-lg-6 form-group form-material">
            <button type="button" className="btn btn-primary waves-effect waves-light" id="kmd_wallet_send_coins_btn" onClick={this.getOAdress}>
              Get address
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderSendApiTypeSelector() {
    if (this.props.ActiveCoin.mode === 'basilisk') {
      return (
        <div className="row">
          <div className="col-lg-10 margin-bottom-10">
            <div className="pull-left margin-right-10">
              <input type="checkbox" id="edexcoin_send_api_type" />
            </div>
            <label className="padding-top-3" htmlFor="edexcoin_send_api_type" onClick={this.toggleSendAPIType}>Send via sendtoaddress API</label>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.ActiveCoin && this.props.ActiveCoin.send && this.props.ActiveCoin.mode !== 'native') {
      return (
        <div className="col-sm-12 padding-top-10" id="edexcoin_send">
          <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="steps row" style={{marginTop: '10px'}}>
              <div className={this.state.currentStep === 0 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_1">
                <span className="step-number">1</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.FILL_SEND_FORM')}</span>
                  <p>{translate('INDEX.FILL_SEND_DETAILS')}</p>
                </div>
              </div>
              <div className={this.state.currentStep === 1 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_2">
                <span className="step-number">2</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.CONFIRMING')}</span>
                  <p>{translate('INDEX.CONFIRM_DETAILS')}</p>
                </div>
              </div>
              <div className={this.state.currentStep === 2 ? 'step col-md-4 current' : 'step col-md-4'} id="edexcoin_send_step_3">
                <span className="step-number">3</span>
                <div className="step-desc">
                  <span className="step-title">{translate('INDEX.PROCESSING_TX')}</span>
                  <p>{translate('INDEX.PROCESSING_DETAILS')}</p>
                </div>
              </div>
            </div>

            <div className={this.state.currentStep === 0 ? 'panel' : 'panel hide'} id="edexcoin-send-screen">
              <div className="panel-heading">
                <h3 data-edexcoin="COIN" className="panel-title">
                  {translate('INDEX.SEND')} {this.props.ActiveCoin.coin}
                </h3>
              </div>
              <div className="panel-body container-fluid">
                <form className="edexcoin-send-form" data-edexcoin="COIN" method="post" role="form" autoComplete="off">
                  {this.renderSendApiTypeSelector()}
                  <div className="row">
                    <div className={this.props.ActiveCoin.mode === 'basilisk' ? 'col-xlg-12 form-group form-material' : 'hide'}>
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_send_from">{translate('INDEX.SEND_FROM')}</label>
                      {this.renderAddressList()}
                    </div>
                  </div>
                  {this.renderOASendUI()}
                  <div className="row">
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_sendto">{translate('INDEX.SEND_TO')}</label>
                      <input type="text" className="form-control" id="edexcoin_sendto" name="sendTo" placeholder="Enter address" autoComplete="off" value={this.state.sendTo} onChange={this.updateInput} required />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" htmlFor="edexcoin_amount" data-edexcoin="COIN" id="edexcoin_amount_label">
                        {this.props.ActiveCoin.coin}
                      </label>
                      <input type="text" className="form-control" id="edexcoin_amount" name="amount" placeholder="0.000" autoComplete="off" onChange={this.updateInput} />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" data-edexcoin="COIN" htmlFor="edexcoin_fee">{translate('INDEX.FEE')}</label>
                      <input type="text" className="form-control" id="edexcoin_fee" name="fee" defaultValue={this.state.fee} value={this.state.fee} placeholder="0.000" autoComplete="off" onChange={this.updateInput} />
                    </div>
                    <div className="col-lg-12">
                      <span data-edexcoin="KMD">
                        <b>{translate('INDEX.TOTAL')} ({translate('INDEX.AMOUNT_SM')} - txfee):</b> <span id="edexcoin_total_value">{Number(this.state.amount) - Number(this.state.fee)}</span> {this.props.ActiveCoin.coin}
                      </span>
                    </div>
                    <div className="col-lg-10 margin-top-10">
                      <div className="pull-left margin-right-10">
                        <input type="checkbox" id="edexcoin_send_sig" data-plugin="switchery" data-size="small" />
                      </div>
                      <label className="padding-top-3" htmlFor="edexcoin_send_sig" onClick={this.toggleSendSig}>{translate('INDEX.DONT_SEND')}</label>
                    </div>
                    {this.renderUTXOCacheInfo()}
                    <div className="col-lg-12">
                      <button type="button" className="btn btn-primary waves-effect waves-light pull-right edexcoin_send_coins_btn_step1" onClick={() => this.changeSendCoinStep(1)}>
                        {translate('INDEX.SEND')} {Number(this.state.amount) - Number(this.state.fee)} {this.props.ActiveCoin.coin}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className={this.state.currentStep === 1 ? 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' : 'col-xlg-12 col-md-12 col-sm-12 col-xs-12 hide'}>
            <div className="panel" id="edexcoin-send-confirm-screen">
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-12">
                    <b>{translate('INDEX.TO')}</b>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendto_addr">{this.state.sendTo}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6">
                    <span id="mdl_confirm_currency_send_amount">{this.state.amount}</span> {this.props.ActiveCoin.coin}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">{translate('INDEX.TX_FEE_REQ')}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6">
                    <span id="mdl_confirm_currency_send_fee">{this.state.fee}</span> {this.props.ActiveCoin.coin}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-xs-12">
                    <b>{translate('INDEX.FROM')}</b>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12" id="mdl_confirm_currency_sendfrom_addr">{this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin]}</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6" style={{color: '#f44336'}}>
                    <span id="mdl_confirm_currency_sendfrom_total_dedcut">{Number(this.state.amount) - Number(this.state.fee)}</span> {this.props.ActiveCoin.coin}
                  </div>
                </div>
                <div className="widget-body-footer">
                  <a className="btn btn-default waves-effect waves-light" id="edexcoin_send_coins_back_btn" onClick={() => this.changeSendCoinStep(0)}>{translate('INDEX.BACK')}</a>
                  <div className="widget-actions pull-right">
                    <button type="button" className="btn btn-primary" id="edexcoin_send_coins_btn" onClick={() => this.changeSendCoinStep(2)}>{translate('INDEX.CONFIRM')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.currentStep === 2 ? 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' : 'col-xlg-12 col-md-12 col-sm-12 col-xs-12 hide'}>
            <div className="panel" id="edexcoin-send-txdetails-screen">
              <div className="panel-heading">
                <h4 className="panel-title">{translate('INDEX.TRANSACTION_RESULT')}</h4>
                <div className={!this.state.sendSig ? 'hide' : 'center'}>
                  You picked option "{translate('INDEX.DONT_SEND')}"
                </div>
                <table className="table table-hover table-striped edexcoin_sendto_result" id="edexcoin_sendto_result">
                  <thead>
                    <tr>
                      <th>{translate('INDEX.KEY')}</th>
                      <th>{translate('INDEX.INFO')}</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderSendCoinResponse()}
                  </tbody>
                </table>
                <div className="widget-body-footer">
                  <div className="widget-actions margin-bottom-15 margin-right-15">
                    <button type="button" className="btn btn-primary" id="edexcoin_send_coins_anothertx_btn" onClick={() => this.changeSendCoinStep(0)} disabled={this.state.utxoMethodInProgress}>{!this.state.utxoMethodInProgress ? translate('INDEX.MAKE_ANOTHER_TX') : 'Please wait...'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SendCoin;
