import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { toggleDashboardTxInfoModal } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNativeTxHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  // TODO: implement sorting and pagination
  //       z transactions

  toggleTxInfoModal(display, txIndex) {
    Store.dispatch(toggleDashboardTxInfoModal(display, txIndex));
  }

  renderTxType(category) {
    if ( category === 'send' ) {
      return (
        <span>
          <i className="icon fa-arrow-circle-left"></i> <span>{translate('DASHBOARD.OUT')}</span>
        </span>
      );
    }
    if ( category === 'receive' ) {
      return (
        <span>
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

  renderTxHistoryList() {
    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory.length && this.props.ActiveCoin.nativeActiveSection === 'default') {
      return this.props.ActiveCoin.txhistory.map((tx, index) =>
        <tr key={tx.txid}>
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
