import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeTxInfo extends React.Component {
  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.showTransactionInfo) {
      return (
        <div>
          <div className="modal show" data-extcoin="COIN" id="kmd_txid_info_mdl" aria-hidden="false" role="dialog">
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
          <div className="modal-backdrop show in"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeTxInfo;
