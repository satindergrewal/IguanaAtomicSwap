import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { sortByDate } from '../../util/sort';
import { toggleDashboardTxInfoModal } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNativeTxHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 10,
      activePage: 1,
      itemsList: null,
    };
    this.updateInput = this.updateInput.bind(this);
  }

  // TODO: implement sorting
  //       implement pagination past X items should call listtransactions to get new chunk of data
  //       z transactions
  //       filter based on addr

  toggleTxInfoModal(display, txIndex) {
    Store.dispatch(toggleDashboardTxInfoModal(display, txIndex));
  }

  updateInput(e) {
    let historyToSplit = this.props.ActiveCoin.txhistory;
    historyToSplit = historyToSplit.slice(0, e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      activePage: 1,
      itemsList: sortByDate(historyToSplit),
    });
  }

  renderTxType(category) {
    if ( category === 'send' ) {
      return (
        <span className="label label-danger">
          <i className="icon fa-arrow-circle-left"></i> <span>{translate('DASHBOARD.OUT')}</span>
        </span>
      );
    }
    if ( category === 'receive' ) {
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
  }

  renderAddress(tx) {
    if (!tx.address) {
      return (
        <span>
          <i className="icon fa-bullseye"></i> <span className="label label-dark">{translate('DASHBOARD.ZADDR_NOT_LISTED')}</span>
        </span>
      );
    } else {
      return (tx.address);
    }
  }

  componentWillReceiveProps(props) {
    if (!this.state.itemsList || (this.state.itemsList && !this.state.itemsList.length) || (props.ActiveCoin.txhistory !== this.props.ActiveCoin.txhistory)) {
      if (this.props.ActiveCoin.txhistory) {
        let historyToSplit = this.props.ActiveCoin.txhistory;
        historyToSplit = historyToSplit.slice((this.state.activePage - 1) * this.state.itemsPerPage, this.state.activePage * this.state.itemsPerPage);

        this.setState(Object.assign({}, this.state, {
          itemsList: sortByDate(historyToSplit),
        }));
      }
    }
  }

  updateCurrentPage(page) {
    let historyToSplit = this.props.ActiveCoin.txhistory;
    historyToSplit = historyToSplit.slice((page - 1) * this.state.itemsPerPage, page * this.state.itemsPerPage);

    this.setState(Object.assign({}, this.state, {
      activePage: page,
      itemsList: sortByDate(historyToSplit),
    }));
  }

  renderPaginationItems() {
    let items = [];

    for (let i=0; i <= Math.floor(this.props.ActiveCoin.txhistory.length / this.state.itemsPerPage); i++) {
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
                <li className={this.state.activePage === Math.floor(this.props.ActiveCoin.txhistory.length / this.state.itemsPerPage) ? 'paginate_button next disabled' : 'paginate_button next'} id="kmd-tx-history-tbl_next">
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

  renderTxHistoryList() {
    if (this.state.itemsList && this.state.itemsList.length && this.props.ActiveCoin.nativeActiveSection === 'default') {
      return this.state.itemsList.map((tx, index) =>
        <tr key={tx.txid + tx.amount}>
          <td>
            <span className="label label-default">
              <i className="icon fa-eye"></i> {translate('IAPI.PUBLIC_SM')}
            </span>
          </td>
          <td>{this.renderTxType(tx.category)}</td>
          <td>{tx.confirmations}</td>
          <td>{tx.amount}</td>
          <td>{secondsToString(tx.time)}</td>
          <td>{this.renderAddress(tx)}</td>
          <td>
            <button type="button" className="btn btn-xs white btn-info waves-effect waves-light btn-kmdtxid" onClick={() => this.toggleTxInfoModal(!this.props.ActiveCoin.showTransactionInfo, index)}><i className="icon fa-search"></i></button>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props && this.props.ActiveCoin.nativeActiveSection === 'default') {
      return (
        <div className="native-transactions">
          <div data-extcoin="COIN" id="kmd_wallet_dashboardinfo">
            <div className="col-xs-12 margin-top-20">
              <div className="panel nav-tabs-horizontal">
                <div data-extcoin="COIN" id="kmd_wallet_dashoard_section">
                  <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="panel">
                      <header className="panel-heading">
                        <h3 className="panel-title">{translate('INDEX.TRANSACTION_HISTORY')}</h3>
                      </header>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-sm-6">
                            {this.renderPaginationItemsPerPageSelector()}
                          </div>
                          <div className="col-sm-6">
                            <div id="kmd-tx-history-tbl_filter" className="dataTables_filter">
                              <label>
                                Search: <input type="search" className="form-control input-sm" placeholder="" aria-controls="kmd-tx-history-tbl" disabled="true" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <table className="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-tx-history-tbl" width="100%">
                            <thead>
                              <tr>
                                <th>{translate('INDEX.TYPE')}</th>
                                <th>{translate('INDEX.DIRECTION')}</th>
                                <th>{translate('INDEX.CONFIRMATIONS')}</th>
                                <th>{translate('INDEX.AMOUNT')}</th>
                                <th>{translate('INDEX.TIME')}</th>
                                <th>{translate('INDEX.DEST_ADDRESS')}</th>
                                <th>{translate('INDEX.TX_DETAIL')}</th>
                              </tr>
                            </thead>
                            <tbody>
                            {this.renderTxHistoryList()}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th>{translate('INDEX.TYPE')}</th>
                                <th>{translate('INDEX.DIRECTION')}</th>
                                <th>{translate('INDEX.CONFIRMATIONS')}</th>
                                <th>{translate('INDEX.AMOUNT')}</th>
                                <th>{translate('INDEX.TIME')}</th>
                                <th>{translate('INDEX.DEST_ADDRESS')}</th>
                                <th>{translate('INDEX.TX_DETAIL')}</th>
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
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeTxHistory;
