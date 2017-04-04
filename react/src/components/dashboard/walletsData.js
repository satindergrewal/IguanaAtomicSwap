import React from 'react';
import { translate } from '../../translate/translate';
/*import {  } from '../../actions/actionCreators';
import Store from '../../store';*/

class WalletsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basiliskActionsMenu: false,
    };
    this.toggleBasiliskActionsMenu = this.toggleBasiliskActionsMenu.bind(this);
  }

  toggleBasiliskActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      basiliskActionsMenu: !this.state.basiliskActionsMenu,
    }));
  }

  render() {
    if (this.props && this.props.coin) {
      return (
        <div data-edexcoin="COIN" id="edexcoin_dashboardinfo">
          <div className="col-xs-12 margin-top-20">
            <div className="panel nav-tabs-horizontal">
              <div data-edexcoin="COIN" id="edexcoin_dashoard_section">
                <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12 edexcoin_dashoard_section_main_div">
                  <div id="edexcoin_txhistory" className="panel">
                    <header className="panel-heading" style={{zIndex: '10'}}>
                      <div className="panel-actions">
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
                              <a href="javascript:void(0)" className="btn_edexcoin_dashboard_getnotaries" data-edexcoin="COIN" id="btn_edexcoin_dashboard_getnotaries" role="menuitem">
                                <i className="icon fa-sitemap" aria-hidden="true"></i> {translate('INDEX.GET_NOTARY_NODES_LIST')}
                              </a>
                            </li>
                            <li role="presentation">
                              <a href="javascript:void(0)" className="btn_edexcoin_dashboard_refresh_basilisk_conn" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refresh_basilisk_conn" role="menuitem">
                                <i className="icon wb-refresh" aria-hidden="true"></i> {translate('INDEX.REFRESH_BASILISK_CONNECTIONS')}
                              </a>
                            </li>
                            <li data-edexcoin="COIN" role="presentation">
                              <a href="javascript:void(0)" className="btn_edexcoin_dashboard_fetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_fetchdata" role="menuitem">
                                <i className="icon fa-cloud-download" aria-hidden="true"></i> {translate('INDEX.FETCH_WALLET_DATA')}
                              </a>
                            </li>
                            <li data-edexcoin="COIN" role="presentation">
                              <a href="javascript:void(0)" className="btn_edexcoin_dashboard_refetchdata" data-edexcoin="COIN" id="btn_edexcoin_dashboard_refetchdata" role="menuitem">
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
