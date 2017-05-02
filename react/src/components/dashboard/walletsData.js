import React from 'react';
import Config from '../../config';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { sortByDate } from '../../util/sort';
import {
  basiliskRefresh,
  basiliskConnection,
  getDexNotaries,
  toggleDashboardTxInfoModal,
  getBasiliskTransactionsList,
  changeMainBasiliskAddress,
  displayNotariesModal,
  deleteCacheFile,
  connectNotaries,
  toggleViewCacheModal,
  fetchNewCacheData,
  fetchUtxoCache,
  restartBasiliskInstance
} from '../../actions/actionCreators';
import Store from '../../store';

import WalletsBasiliskRefresh from './walletsBasiliskRefresh';
import WalletsBasiliskConnection from './walletsBasiliskConnection';
import WalletsNotariesList from './walletsNotariesList';
import WalletsCacheData from './walletsCacheData';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:' + Config.agamaPort);

class WalletsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basiliskActionsMenu: false,
      itemsPerPage: 10,
      activePage: 1,
      itemsList: null,
      currentAddress: null,
      addressSelectorOpen: false,
      currentStackLength: 0,
      totalStackLength: 0,
      useCache: sessionStorage.getItem('useCache') ? true : false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.toggleBasiliskActionsMenu = this.toggleBasiliskActionsMenu.bind(this);
    this.basiliskRefreshAction = this.basiliskRefreshAction.bind(this);
    this.basiliskConnectionAction = this.basiliskConnectionAction.bind(this);
    this.getDexNotariesAction = this.getDexNotariesAction.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
    this.refreshTxList = this.refreshTxList.bind(this);
    this.removeAndFetchNewCache = this.removeAndFetchNewCache.bind(this);
    this._toggleViewCacheModal = this._toggleViewCacheModal.bind(this);
    this.toggleCacheApi = this.toggleCacheApi.bind(this);
    this._fetchUtxoCache = this._fetchUtxoCache.bind(this);
    this.restartBasiliskInstance = this.restartBasiliskInstance.bind(this);
    socket.on('messages', msg => this.updateSocketsData(msg));
  }

  componentDidMount() {
    console.log('use cache = ', this.state.useCache);
  }

  toggleCacheApi() {
    const _useCache = !this.state.useCache;

    console.log('useCache is set to', _useCache);
    sessionStorage.setItem('useCache', _useCache);
    this.setState(Object.assign({}, this.state, {
      useCache: _useCache,
    }));
  }

  restartBasiliskInstance() {
    Store.dispatch(restartBasiliskInstance());
  }

  _toggleViewCacheModal() {
    Store.dispatch(toggleViewCacheModal(!this.props.Dashboard.displayViewCacheModal));
  }

  updateSocketsData(data) {
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

  removeAndFetchNewCache() {
    Store.dispatch(deleteCacheFile({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'listtransactions:getbalance',
    }));
  }

  _fetchUtxoCache() {
    Store.dispatch(fetchUtxoCache({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'refresh',
      'address': this.state.currentAddress,
    }));
    console.log('_fetchUtxoCache', {
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'refresh',
      'address': this.state.currentAddress,
    });
  }

  toggleBasiliskActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      basiliskActionsMenu: !this.state.basiliskActionsMenu,
    }));
  }

  basiliskRefreshAction() {
    /*if (this.props.Dashboard) {
      Store.dispatch(basiliskRefresh(!this.props.Dashboard.basiliskRefresh));
    }*/
    Store.dispatch(fetchNewCacheData({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'listtransactions:getbalance',
    }));
  }

  basiliskConnectionAction() {
    if (this.props.Dashboard) {
      Store.dispatch(basiliskConnection(!this.props.Dashboard.basiliskConnection));
      Store.dispatch(connectNotaries());
    }
  }

  getDexNotariesAction() {
    Store.dispatch(getDexNotaries(this.props.ActiveCoin.coin));
    Store.dispatch(displayNotariesModal(true));
  }

  updateInput(e) {
    let historyToSplit = sortByDate(this.props.ActiveCoin.txhistory);
    historyToSplit = historyToSplit.slice(0, e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      activePage: 1,
      itemsList: historyToSplit,
    });
  }

  toggleTxInfoModal(display, txIndex) {
    Store.dispatch(toggleDashboardTxInfoModal(display, txIndex));
  }

  componentWillReceiveProps(props) {
    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory.length) {
      if (!this.state.itemsList || (this.state.itemsList && !this.state.itemsList.length) || (props.ActiveCoin.txhistory !== this.props.ActiveCoin.txhistory)) {
        let historyToSplit = sortByDate(this.props.ActiveCoin.txhistory);
        historyToSplit = historyToSplit.slice((this.state.activePage - 1) * this.state.itemsPerPage, this.state.activePage * this.state.itemsPerPage);

        this.setState(Object.assign({}, this.state, {
          itemsList: historyToSplit,
        }));
      }
    }

    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory === 'no data') {
      this.setState(Object.assign({}, this.state, {
        itemsList: 'no data',
      }));
    }
  }

  updateCurrentPage(page) {
    let historyToSplit = sortByDate(this.props.ActiveCoin.txhistory);
    historyToSplit = historyToSplit.slice((page - 1) * this.state.itemsPerPage, page * this.state.itemsPerPage);

    this.setState(Object.assign({}, this.state, {
      activePage: page,
      itemsList: historyToSplit,
    }));
  }

  renderPaginationItems() {
    let items = [];

    for (let i=0; i < Math.ceil(this.props.ActiveCoin.txhistory.length / this.state.itemsPerPage); i++) {
      items.push(
        <li className={this.state.activePage === i + 1 ? 'paginate_button active' : 'paginate_button'}>
          <a aria-controls="kmd-tx-history-tbl" data-dt-idx="1" tabIndex="0" key={i + '-pagination'} onClick={this.state.activePage !== (i + 1) ? () => this.updateCurrentPage(i + 1) : null}>{i + 1}</a>
        </li>
      );
    }

    return items;
  }

  renderPaginationItemsPerPageSelector() {
    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory.length > 10) {
      return (
        <div className="dataTables_length" id="kmd-tx-history-tbl_length">
          <label>
            Show&nbsp;
            <select name="itemsPerPage" aria-controls="kmd-tx-history-tbl" className="form-control input-sm" onChange={this.updateInput}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>&nbsp;
            entries
          </label>
        </div>
      );
    } else {
      return null;
    }
  }

  renderPagination() {
    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory.length > 10) {
      return (
        <div className="row unselectable">
          <div className="col-sm-5">
            <div className="dataTables_info" id="kmd-tx-history-tbl_info" role="status" aria-live="polite">Showing {((this.state.activePage - 1) * this.state.itemsPerPage) + 1} to {this.state.activePage * this.state.itemsPerPage} of {this.props.ActiveCoin.txhistory.length} entries</div>
          </div>
          <div className="col-sm-7">
            <div className="dataTables_paginate paging_simple_numbers" id="kmd-tx-history-tbl_paginate">
              <ul className="pagination">
                <li className={this.state.activePage === 1 ? 'paginate_button previous disabled' : 'paginate_button previous'} id="kmd-tx-history-tbl_previous">
                  <a aria-controls="kmd-tx-history-tbl" data-dt-idx="0" tabIndex="0" onClick={() => this.updateCurrentPage(this.state.activePage - 1)}>Previous</a>
                </li>
                {this.renderPaginationItems()}
                <li className={this.state.activePage > Math.floor(this.props.ActiveCoin.txhistory.length / this.state.itemsPerPage) ? 'paginate_button next disabled' : 'paginate_button next'} id="kmd-tx-history-tbl_next">
                  <a aria-controls="kmd-tx-history-tbl" data-dt-idx="2" tabIndex="0" onClick={() => this.updateCurrentPage(this.state.activePage + 1)}>Next</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderTxType(category) {
    if ( category === 'send' || category === 'sent' ) {
      return (
        <span className="label label-danger">
          <i className="icon fa-arrow-circle-left"></i> <span>{translate('DASHBOARD.OUT')}</span>
        </span>
      );
    }
    if ( category === 'receive' || category === 'received' ) {
      return (
        <span className="label label-success">
          <i className="icon fa-arrow-circle-right"></i> <span>{translate('DASHBOARD.IN')}</span>
        </span>
      );
    }
    if ( category === 'generate' ) {
      return (
        <span>
          <i className="icon fa-cogs"></i> <span>{translate('DASHBOARD.MINED')}</span>
        </span>
      );
    }
    if ( category === 'immature' ) {
      return (
        <span>
          <i className="icon fa-clock-o"></i> <span>{translate('DASHBOARD.IMMATURE')}</span>
        </span>
      );
    }
    if ( category === 'unknown' ) {
      return (
        <span>
          <i className="icon fa-meh-o"></i> <span>{translate('DASHBOARD.UNKNOWN')}</span>
        </span>
      );
    }
  }

  renderTxHistoryList() {
    if (this.state.itemsList && this.state.itemsList.length && this.state.itemsList !== 'no data') {
      return this.state.itemsList.map((tx, index) =>
        <tr key={tx.txid + tx.amount}>
          <td>{this.renderTxType(tx.category || tx.type)}</td>
          <td>{tx.confirmations}</td>
          <td>{tx.amount || translate('DASHBOARD.UNKNOWN')}</td>
          <td>{secondsToString(tx.blocktime || tx.timestamp)}</td>
          <td>{tx.address}</td>
          <td>
            <button type="button" className="btn btn-xs white btn-info waves-effect waves-light btn-kmdtxid" onClick={() => this.toggleTxInfoModal(!this.props.ActiveCoin.showTransactionInfo, index)}><i className="icon fa-search"></i></button>
          </td>
        </tr>
      );
    }

    if (this.state.itemsList === 'no data') {
      return (
        <span>No data</span>
      );
    }

    if (!this.state.itemsList) {
      return null;
    }
  }

  updateAddressSelection(address, type, amount) {
    this.setState(Object.assign({}, this.state, {
      currentAddress: address,
      addressSelectorOpen: false,
      activePage: 1,
    }));

    setTimeout(function() {
      Store.dispatch(changeMainBasiliskAddress(address));
      Store.dispatch(getBasiliskTransactionsList(this.props.ActiveCoin.coin, address));
    }.bind(this), 100);
  }

  refreshTxList() {
    Store.dispatch(getBasiliskTransactionsList(this.props.ActiveCoin.coin, this.props.ActiveCoin.mainBasiliskAddress));
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  renderUseCacheToggle() {
    if (this.props.ActiveCoin.mode === 'basilisk') {
      return (
        <div className="col-sm-2">
          <div className="pull-left margin-right-10">
            <input type="checkbox" id="edexcoin_cache_api" checked={this.state.useCache} data-plugin="switchery" data-size="small" />
          </div>
          <label className="padding-top-3" htmlFor="edexcoin_cache_api" onClick={this.toggleCacheApi}>Use cache</label>
        </div>
      );
    } else {
      return null;
    }
  }

  renderAddressByType(type) {
    if (this.props.ActiveCoin.addresses && this.props.ActiveCoin.addresses[type] && this.props.ActiveCoin.addresses[type].length) {
      return this.props.ActiveCoin.addresses[type].map((address) =>
        <li key={address.address}>
          <a tabIndex="0" onClick={() => this.updateAddressSelection(address.address, type, address.amount)}><i className={type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {address.amount} {this.props.ActiveCoin.coin} ]  {address.address}</span><span className="glyphicon glyphicon-ok check-mark"></span></a>
        </li>
      );
    } else {
      return null;
    }
  }

  renderAddressAmount() {
    if (this.props.ActiveCoin.addresses['public'] && this.props.ActiveCoin.addresses['public'].length) {
      for (let i = 0; i < this.props.ActiveCoin.addresses['public'].length; i++) {
        if (this.props.ActiveCoin.addresses['public'][i].address === this.state.currentAddress) {
          return this.props.ActiveCoin.addresses['public'][i].amount;
        }
      }
    } else {
      return 0;
    }
  }

  renderSelectorCurrentLabel() {
    if (this.state.currentAddress) {
      return (
        <span>
          <i className={this.state.addressType === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {this.renderAddressAmount()} {this.props.ActiveCoin.coin} ]  {this.state.currentAddress}</span>
        </span>
      );
    } else {
      return (
        <span>- Select Transparent or Private Address -</span>
      );
    }
  }

  renderAddressList() {
    if (this.props.Dashboard && this.props.Dashboard.activeHandle && this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] && this.props.ActiveCoin.mode === 'basilisk') {
      return (
        <div className={'btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ' + (this.state.addressSelectorOpen ? 'open' : '')}>
          <button type="button" className="btn dropdown-toggle btn-info" data-toggle="dropdown" data-id="kmd_wallet_send_from" title="- Select Transparent or Private Address -" aria-expanded="true" onClick={this.openDropMenu}>
            <span className="filter-option pull-left">{this.renderSelectorCurrentLabel()} </span>&nbsp;<span className="bs-caret"><span className="caret"></span></span>
          </button>
          <div className="dropdown-menu open">
            <ul className="dropdown-menu inner" role="menu">
              <li data-original-index="1" className="selected">
                <a tabIndex="0" data-tokens="null"><span className="text"> - Select Transparent or Private Address - </span><span className="glyphicon glyphicon-ok check-mark"></span></a>
              </li>
              {this.renderAddressByType('public')}
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.coin && this.props.ActiveCoin.mode !== 'native' && !this.props.ActiveCoin.send && !this.props.ActiveCoin.receive) {
      return (
        <span>
          <WalletsBasiliskRefresh {...this.props} />
          <WalletsBasiliskConnection {...this.props} />
          <WalletsNotariesList {...this.props} />
          <WalletsCacheData {...this.props} />
          <div data-edexcoin="COIN" id="edexcoin_dashboardinfo">
            <div className="col-xs-12 margin-top-20">
              <div className="panel nav-tabs-horizontal">
                <div data-edexcoin="COIN" id="edexcoin_dashoard_section">
                  <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12 edexcoin_dashoard_section_main_div">
                    <div id="edexcoin_txhistory" className="panel">
                      <header className="panel-heading" style={{zIndex: '10'}}>
                        <div className={this.props.ActiveCoin.mode === 'basilisk' ? 'panel-actions' : 'panel-actions hide'}>
                          <div className={this.state.currentStackLength === 1 || (this.state.currentStackLength === 0 && this.state.totalStackLength === 0) ? 'hide' : 'progress progress-sm'} style={{width: '100%', marginBottom: '3px'}}>
                            <div className="progress-bar progress-bar-striped active progress-bar-indicating progress-bar-success" style={{width: 100 - (this.state.currentStackLength * 100 / this.state.totalStackLength) + '%', fontSize: '80%'}} role="progressbar">
                              Processing requests: {this.state.currentStackLength} / {this.state.totalStackLength}
                            </div>
                          </div>
                          <a href="javascript:void(0)" className="dropdown-toggle white btn-xs btn-info btn_refresh_edexcoin_dashboard margin-right-10" data-edexcoin="COIN" aria-expanded="false" role="button" onClick={this.refreshTxList}>
                            <i className="icon fa-refresh margin-right-10" aria-hidden="true"></i> {translate('INDEX.REFRESH')}
                          </a>
                          <div className={this.state.basiliskActionsMenu ? 'dropdown open' : 'dropdown'} onClick={this.toggleBasiliskActionsMenu}>
                            <a className="dropdown-toggle btn-xs btn-default" data-edexcoin="COIN" id="btn_edexcoin_basilisk" data-toggle="dropdown" href="javascript:void(0)"
                            aria-expanded="false" role="button">
                              <i className="icon fa-magic margin-right-10" aria-hidden="true"></i> {translate('INDEX.BASILISK_ACTIONS')} <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="btn_edexcoin_basilisk"
                            role="menu">
                              <li role="presentation">
                                <a className="btn_edexcoin_dashboard_getnotaries" data-edexcoin="COIN" id="btn_edexcoin_dashboard_getnotaries" role="menuitem" onClick={this.getDexNotariesAction}>
                                  <i className="icon fa-sitemap" aria-hidden="true"></i> {translate('INDEX.GET_NOTARY_NODES_LIST')}
                                </a>
                              </li>
                              <li role="presentation">
                                <a className="btn_edexcoin_dashboard_refresh_basilisk_conn" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refresh_basilisk_conn" role="menuitem" onClick={this.basiliskConnectionAction}>
                                  <i className="icon wb-refresh" aria-hidden="true"></i> {translate('INDEX.REFRESH_BASILISK_CONNECTIONS')}
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a className="btn_edexcoin_dashboard_fetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_fetchdata" role="menuitem" onClick={this.basiliskRefreshActionOne}>
                                  <i className="icon fa-cloud-download" aria-hidden="true"></i> {translate('INDEX.FETCH_WALLET_DATA')}
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a className="btn_edexcoin_dashboard_refetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refetchdata" role="menuitem" onClick={this.removeAndFetchNewCache}>
                                  <i className="icon fa-history" aria-hidden="true"></i> {translate('INDEX.REFETCH_WALLET_DATA')}
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a role="menuitem" onClick={this._fetchUtxoCache}>
                                  <i className="icon fa-history" aria-hidden="true"></i> Update UTXO
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a role="menuitem" onClick={this.basiliskRefreshAction}>
                                  <i className="icon fa-cloud-download" aria-hidden="true"></i> Fetch all
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a role="menuitem" onClick={this.restartBasiliskInstance}>
                                  <i className="icon fa-refresh" aria-hidden="true"></i> Restart Basilisk Instance
                                </a>
                              </li>
                              <li data-edexcoin="COIN" role="presentation" className={!this.state.useCache ? 'hide' : ''}>
                                <a className="btn_edexcoin_dashboard_fetchdata" role="menuitem" onClick={this._toggleViewCacheModal}>
                                  <i className="icon fa-list-alt" aria-hidden="true"></i> {translate('INDEX.VIEW_CACHE_DATA')}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <h4 className="panel-title">{translate('INDEX.TRANSACTION_HISTORY')}</h4>
                      </header>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-sm-6">
                          {this.renderAddressList()}
                          </div>
                          {this.renderUseCacheToggle}
                        </div>
                        <div className="row" style={{padding: '20px 0 10px 0'}}>
                          <div className="col-sm-6">
                            {this.renderPaginationItemsPerPageSelector()}
                          </div>
                          <div className="col-sm-6">
                            <div id="kmd-tx-history-tbl_filter" className="dataTables_filter">
                              <label>
                                Search: <input type="search" className="form-control input-sm" aria-controls="kmd-tx-history-tbl" disabled="true" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <table className="table table-hover dataTable table-striped" data-edexcoin="COIN" id="edex-tx-history-tbl" width="100%">
                            <thead>
                              <tr>
                                <th>{translate('INDEX.DIRECTION')}</th>
                                <th className="hidden-xs hidden-sm">{translate('INDEX.CONFIRMATIONS')}</th>
                                <th>{translate('INDEX.AMOUNT')}</th>
                                <th>{translate('INDEX.TIME')}</th>
                                <th>{translate('INDEX.DEST_ADDRESS')}</th>
                                <th className="hidden-xs hidden-sm">{translate('INDEX.TX_DETAIL')}</th>
                              </tr>
                            </thead>
                            <tbody>
                            {this.renderTxHistoryList()}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th>{translate('INDEX.DIRECTION')}</th>
                                <th>{translate('INDEX.CONFIRMATIONS')}</th>
                                <th>{translate('INDEX.AMOUNT')}</th>
                                <th>{translate('INDEX.TIME')}</th>
                                <th>{translate('INDEX.DEST_ADDRESS')}</th>
                                <th className="hidden-xs hidden-sm">{translate('INDEX.TX_DETAIL')}</th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        {this.renderPagination()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      );
    } else {
      return null;
    }
  }
}

export default WalletsData;
