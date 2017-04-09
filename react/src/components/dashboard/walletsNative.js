import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNative extends React.Component {
  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.mode === 'native') {
      return (
        <div className="page" data-animsition-in="fade-in" data-animsition-out="fade-out" style={{marginLeft: '0'}}>
          <div className="page-content" data-extcoin="COIN" id="section-extcoin">
            <div role="alert" className="alert alert-danger alert-dismissible" data-extcoin="COIN" id="extcoin-wallet-connection-alert">
              <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                <span aria-hidden="true">×</span>
              </button>
              <h4>{translate('INDEX.OOPS_ERROR')}</h4>
              <p data-extcoin="COIN" id="extcoin-wallet-connection-alert-text">
                <span>{translate('INDEX.OOPS_ERROR_DESC')}</span>
                <code>server=1</code><br/>
                <code>rpcport=</code><br/>
                <code>rpcuser=</code><br/>
                <code>rpcpassword=</code>
              </p>
            </div>

            <div role="alert" className="alert alert-info alert-dismissible" data-extcoin="COIN" id="extcoin-wallet-activating-alert">
              <button aria-label="Close" data-dismiss="alert" className="close" type="button">
                <span aria-hidden="true">×</span>
              </button>
              <h4>
                {translate('INDEX.ACTIVATING_CHAIN')}<span id="activating-komodod-tridot">...</span><span id="activating-komodod-progress"></span>
              </h4>
              <p data-extcoin="COIN" id="extcoin-wallet-connection-alert-text">{translate('INDEX.KMD_STARTED')}</p>
            </div>

            <div className="row" data-extcoin="COIN" style={{margin: '-20px 0px 10px 0px'}}>
              <div className="col-xs-12" data-extcoin="COIN" id="extcoin-progressbars">
                <div className="progress">
                  <div className="progress-bar progress-bar-info progress-bar-striped active" style={{width: '0%', fontSize: '80%'}} role="progressbar" data-extcoin="COIN" id="extcoin-sync">
                    <span data-extcoin="COIN" id="extcoin-sync-percent">-</span> | <span data-extcoin="COIN" id="extcoin-synced-blocks">-</span> / <span data-extcoin="COIN" id="extcoin-longestchain">-</span> | {translate('INDEX.CONNECTIONS')}: <span data-extcoin="COIN" id="extcoin-connections">-</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" data-extcoin="COIN" id="extcoin-wallet" data-plugin="masonry">
              <div className="col-xs-12">
                <div className="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_t">
                  <div className="widget widget-shadow" id="widgetLineareaOne">
                    <div className="widget-content white bg-yellow-800">
                      <div className="padding-20 padding-top-10">
                        <div className="clearfix">
                          <div className="pull-left padding-vertical-10">
                            <i className="icon fa-eye font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.TRANSPARENT_BALANCE')}
                          </div>
                          <span className="pull-right padding-top-10" data-extcoin="COIN" id="kmd_transparent_balance" style={{fontSize: '22px'}}>-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_z">
                  <div className="widget widget-shadow" id="widgetLineareaOne">
                    <div className="widget-content white bg-blue-grey-800">
                      <div className="padding-20 padding-top-10">
                        <div className="clearfix">
                          <div className="pull-left padding-vertical-10">
                            <i className="icon fa-eye-slash font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.Z_BALANCE')}
                          </div>
                          <span className="pull-right padding-top-10" data-extcoin="COIN" id="kmd_private_balance" style={{fontSize: '22px'}}>-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_i">
                  <div className="widget widget-shadow" id="widgetLineareaOne">
                    <div className="widget-content white bg-cyan-700">
                      <div className="padding-20 padding-top-10">
                        <div className="clearfix">
                          <div className="pull-left padding-vertical-10">
                            <i className="icon fa-money font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.INTEREST_EARNED')}
                          </div>
                          <span className="pull-right padding-top-10" data-extcoin="COIN" id="kmd_total_interest_balance" style={{fontSize: '22px'}}>-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-xs-12" data-extcoin="COIN" id="kmd_widget_get_total_balance_tzi">
                  <div className="widget widget-shadow" id="widgetLineareaOne">
                    <div className="widget-content white bg-green-600">
                      <div className="padding-20 padding-top-10">
                        <div className="clearfix">
                          <div className="pull-left padding-vertical-10">
                            <i className="icon fa-bullseye font-size-24 vertical-align-bottom margin-right-5"></i>{translate('INDEX.ZT_BALANCE')}
                          </div>
                          <span className="pull-right padding-top-10" data-extcoin="COIN" id="kmd_total_tz_balance" style={{fontSize: '22px'}}>-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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

              <div data-extcoin="COIN" id="kmd_wallet_recieve">
                <div className="col-xs-12 margin-top-20">
                  <div className="panel nav-tabs-horizontal">
                    <div data-extcoin="COIN" id="kmd_wallet_recieve_section">
                      <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                        <div className="panel">
                          <header className="panel-heading">
                            <div className="panel-actions">
                              <div className="dropdown">
                                <a className="dropdown-toggle white btn btn-warning" data-extcoin="COIN" id="GetNewRecievingAddress" data-toggle="dropdown" href="javascript:void(0)" aria-expanded="false" role="button">
                                  <i className="icon md-arrows margin-right-10" aria-hidden="true"></i> {translate('INDEX.GET_NEW_ADDRESS')} <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="GetNewRecievingAddress" role="menu">
                                  <li role="presentation">
                                    <a href="javascript:void(0)" data-extcoin="COIN" id="kmd_get_new_taddr" role="menuitem">
                                      <i className="icon fa-eye" aria-hidden="true"></i> {translate('INDEX.TRANSPARENT_ADDRESS')}
                                    </a>
                                  </li>
                                  <li data-extcoin="COIN" role="presentation">
                                    <a href="javascript:void(0)" data-extcoin="COIN" id="kmd_get_new_zaddr" role="menuitem">
                                      <i className="icon fa-eye-slash" aria-hidden="true"></i> {translate('INDEX.PRIVATE_Z_ADDRESS')}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <h3 className="panel-title">{translate('INDEX.RECEIVING_ADDRESS')}</h3>
                          </header>
                          <div className="panel-body">
                            <table className="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-recieve-addr-tbl">
                              <thead>
                                <tr>
                                  <th>{translate('INDEX.TYPE')}</th>
                                  <th data-lang="INDEX.ADDRESS">{translate('INDEX.ADDRESS')}</th>
                                </tr>
                              </thead>
                              <tfoot>
                                <tr>
                                  <th data-lang="INDEX.TYPE">{translate('INDEX.TYPE')}</th>
                                  <th data-lang="INDEX.ADDRESS">{translate('INDEX.ADDRESS')}</th>
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

              <div data-extcoin="COIN" id="kmd_wallet_send">
                <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="panel" id="projects">
                    <div className="panel-heading">
                      <h3 data-extcoin="COIN" className="panel-title">
                        {translate('INDEX.SEND')} <span data-extcoinname="COIN"></span>
                      </h3>
                    </div>
                    <div className="panel-body container-fluid">
                      <form className="extcoin-send-form" data-extcoin="COIN" method="post" role="form" autocomplete="off" onsubmit="return false">
                        <div className="row">
                          <div className="col-xlg-12 form-group form-material">
                            <label className="control-label" data-extcoin="COIN" for="kmd_wallet_send_from">{translate('INDEX.SEND_FROM')}</label>
                            <select className="form-control form-material showkmdwalletaddrs show-tick" data-extcoin="COIN" id="kmd_wallet_send_from" title="Select Transparent or Private Address" data-size="5"></select>
                          </div>
                          <div className="col-xlg-12 form-group form-material">
                            <label className="control-label" data-extcoin="COIN" for="kmd_wallet_sendto">{translate('INDEX.SEND_TO')}</label>
                            <input type="text" className="form-control" data-extcoin="COIN" id="kmd_wallet_sendto" name="kmd_wallet_sendto" placeholder="Enter Transparent or Private address" autocomplete="off" required />
                          </div>
                          <div className="col-lg-6 form-group form-material">
                            <label className="control-label" for="kmd_wallet_amount" data-extcoin="COIN" id="kmd_wallet_amount_label">
                              <span data-extcoinname="COIN"></span>
                            </label>
                            <input type="text" className="form-control" data-extcoin="COIN" id="kmd_wallet_amount" name="kmd_wallet_amount" placeholder="0.000" autocomplete="off" />
                          </div>
                          <div className="col-lg-6 form-group form-material">
                            <label className="control-label" data-extcoin="COIN" for="kmd_wallet_fee">{translate('INDEX.FEE')}</label>
                            <input type="text" className="form-control" data-extcoin="COIN" id="kmd_wallet_fee" name="kmd_wallet_fee" placeholder="0.000" value="0.0001" autocomplete="off" />
                          </div>
                          <div className="col-lg-12">
                            <span data-extcoin="KMD">
                              <b>{translate('INDEX.TOTAL')} (<span data-extcoinname="COIN"></span> - txfee):</b> <span data-extcoin="COIN" id="kmd_wallet_total_value">0.000</span> <span data-extcoin="COIN" id="kmd_wallet_total_coinname" data-extcoinname="COIN"></span>
                            </span>
                          </div>
                          <div className="col-lg-12">
                            <button type="submit" className="btn btn-primary waves-effect waves-light pull-right" data-toggle="modal" id="kmd_wallet_send_coins_btn">
                              {translate('INDEX.SEND')} <span data-extcoinname="COIN"></span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-xs-12">
                  <div className="row">
                    <div className="panel nav-tabs-horizontal">
                      <div data-extcoin="COIN" id="kmd_wallet_opids_status_section">
                        <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                          <div className="panel">
                            <header className="panel-heading">
                              <div className="panel-actions">
                                <button className="btn btn-info btn-block" id="kmd_opids_status_btn" type="button">
                                  <i className="icon fa-repeat" aria-hidden="true"></i> {translate('INDEX.REFRESH')}
                                </button>
                              </div>
                              <h3 className="panel-title">{translate('INDEX.OPERATIONS_STATUSES')}</h3>
                            </header>
                            <div className="panel-body">
                              <table className="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-opid-status-tbl" width="100%">
                                <thead>
                                  <tr>
                                    <th>{translate('INDEX.STATUS')}</th>
                                    <th>ID</th>
                                    <th>{translate('INDEX.TIME')}</th>
                                    <th>{translate('INDEX.RESULT')}</th>
                                  </tr>
                                </thead>
                                <tfoot>
                                  <tr>
                                    <th>{translate('INDEX.STATUS')}</th>
                                    <th>ID</th>
                                    <th>{translate('INDEX.TIME')}</th>
                                    <th>{translate('INDEX.RESULT')}</th>
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

              <div data-extcoin="COIN" id="kmd_wallet_settings">
                <div className="col-xlg-6 col-md-4">
                  <div className="panel" id="projects">
                    <div className="panel-heading">
                      <h3 className="panel-title">{translate('INDEX.WALLET_INFO')}</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>{translate('INDEX.WALLET_VERSION')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_walletversion"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.BALANCE')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_balance"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.UNCONFIRMED_BALANCE')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_unconfirmed_balance"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.IMMATURE_BALANCE')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_immature_balance"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.TOTAL_TX_COUNT')}</td>
                            <td>
                              <span data-extcoin="COIN" id="KMDTotalTransactionsCount"></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-xlg-6 col-md-8">
                  <div className="panel" id="projects">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        <span data-extcointitle="COIN">Komodo</span> {translate('INDEX.INFO')}
                      </h3>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td>{translate('INDEX.VERSION')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_version"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.PROTOCOL_VERSION')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_protocolversion"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.NOTARIZED')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_notarized"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {translate('INDEX.NOTARIZED')} Hash
                            </td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_notarizedhash"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {translate('INDEX.NOTARIZED')} BTC
                            </td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_notarizedbtc"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.BLOCKS')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_blocks"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.CONNECTIONS')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_connections"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.DIFFICULTY')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_difficulty"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>Testnet</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_testnet"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.PAY_TX_FEE')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_paytxfee"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.RELAY_FEE')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_relayfee"></span>
                            </td>
                          </tr>
                          <tr>
                            <td>{translate('INDEX.ERRORS')}</td>
                            <td>
                              <span data-extcoin="COIN" id="kmd_errors"></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade modal-3d-sign" data-extcoin="COIN" id="kmd_txid_info_mdl" aria-hidden="false" role="dialog">
              <div className="modal-dialog modal-center modal-lg">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="panel nav-tabs-horizontal">
                      <ul className="nav nav-tabs nav-tabs-line" data-plugin="nav-tabs" role="tablist">
                        <li className="active" role="presentation">
                          <a data-toggle="tab" href="#KmdTxIDInfotab1" data-extcoin="COIN" aria-controls="KmdTxIDInfotab1" role="tab">
                            <i className="icon md-balance-wallet" aria-hidden="true"></i>TxID Info
                          </a>
                        </li>
                        <li role="presentation">
                          <a data-toggle="tab" href="#KmdTxIDInfotab2" data-extcoin="COIN" aria-controls="KmdTxIDInfotab2" role="tab">
                            <i className="icon md-plus-square" aria-hidden="true"></i>vjointsplits, details
                          </a>
                        </li>
                        <li role="presentation">
                          <a data-toggle="tab" href="#KmdTxIDInfotab3" data-extcoin="COIN" aria-controls="KmdTxIDInfotab3" role="tab">
                            <i className="icon wb-briefcase" aria-hidden="true"></i>hex
                          </a>
                        </li>
                      </ul>
                      <div className="panel-body">
                        <div className="tab-content">
                          <div className="tab-pane active" id="KmdTxIDInfotab1" data-extcoin="COIN" role="tabpanel">
                            <table className="table table-striped">
                              <tbody>
                                <tr>
                                  <td>amount</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_amount"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>fee</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_fee"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>confirmations</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_confirmations"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>blockhash</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_blockhash"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>blockindex</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_blockindex"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>blocktime</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_blocktime"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>txid</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_txid"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>walletconflicts</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_walletconflicts"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>time</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_time"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>timereceived</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_timereceived"></span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="tab-pane" id="KmdTxIDInfotab2" data-extcoin="COIN" role="tabpanel">
                            <table className="table table-striped">
                              <tbody>
                                <tr>
                                  <td>vjoinsplit</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_vjoinsplit"></span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>details</td>
                                  <td>
                                    <span data-extcoin="COIN" id="kmd_txid_info_details"></span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="tab-pane" id="KmdTxIDInfotab3" data-extcoin="COIN" role="tabpanel">
                            <textarea id="kmd_txid_info_hex" data-extcoin="COIN" style={{width: '100%', height: '170px'}} rows="10" cols="80" disabled></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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

export default WalletsNative;
