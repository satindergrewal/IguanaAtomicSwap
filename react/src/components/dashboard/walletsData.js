import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { basiliskRefresh, basiliskConnection, getDexNotaries } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basiliskActionsMenu: false,
    };
    this.toggleBasiliskActionsMenu = this.toggleBasiliskActionsMenu.bind(this);
    this.basiliskRefreshAction = this.basiliskRefreshAction.bind(this);
    this.basiliskConnectionAction = this.basiliskConnectionAction.bind(this);
    this.getDexNotariesAction = this.getDexNotariesAction.bind(this);
  }

  toggleBasiliskActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      basiliskActionsMenu: !this.state.basiliskActionsMenu,
    }));
  }

  basiliskRefreshAction() {
    if (this.props.Dashboard) {
      Store.dispatch(basiliskRefresh(!this.props.Dashboard.basiliskRefresh));
    }
  }

  basiliskConnectionAction() {
    if (this.props.Dashboard) {
      Store.dispatch(basiliskConnection(!this.props.Dashboard.basiliskConnection));
    }
  }

  getDexNotariesAction() {
    Store.dispatch(getDexNotaries(this.props.ActiveCoin.coin));
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

  renderTxHistoryList() {
    if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory.length) {
      return this.props.ActiveCoin.txhistory.map((tx, index) =>
        <tr key={tx.txid + tx.amount}>
          <td>{this.renderTxType(tx.category)}</td>
          <td>{tx.confirmations}</td>
          <td>{tx.amount}</td>
          <td>{secondsToString(tx.blocktime)}</td>
          <td>{tx.address}</td>
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
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.coin && this.props.ActiveCoin.mode !== 'native' && !this.props.ActiveCoin.send && !this.props.ActiveCoin.receive) {
      return (
        <div data-edexcoin="COIN" id="edexcoin_dashboardinfo">
          <div className="col-xs-12 margin-top-20">
            <div className="panel nav-tabs-horizontal">
              <div data-edexcoin="COIN" id="edexcoin_dashoard_section">
                <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12 edexcoin_dashoard_section_main_div">
                  <div id="edexcoin_txhistory" className="panel">
                    <header className="panel-heading" style={{zIndex: '10'}}>
                      <div className={this.props.ActiveCoin.mode === 'basilisk' ? 'panel-actions' : 'panel-actions hide'}>
                        <a href="javascript:void(0)" className="dropdown-toggle white btn-xs btn-info btn_refresh_edexcoin_dashboard" data-edexcoin="COIN" aria-expanded="false" role="button">
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
                            <li data-edexcoin="COIN" role="presentation">
                              <a className="btn_edexcoin_dashboard_fetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_fetchdata" role="menuitem" onClick={this.basiliskRefreshAction}>
                                <i className="icon fa-cloud-download" aria-hidden="true"></i> {translate('INDEX.FETCH_WALLET_DATA')}
                              </a>
                            </li>
                            <li data-edexcoin="COIN" role="presentation">
                              <a className="btn_edexcoin_dashboard_refetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refetchdata" role="menuitem">
                                <i className="icon fa-cloud-download" aria-hidden="true"></i> {translate('INDEX.REFETCH_WALLET_DATA')}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <h4 className="panel-title">{translate('INDEX.TRANSACTION_HISTORY')}</h4>
                    </header>
                    <div className="panel-body">
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

export default WalletsData;
