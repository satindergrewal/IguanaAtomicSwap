import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { toggleDashboardTxInfoModal } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsTxInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTxInfoModal = this.toggleTxInfoModal.bind(this);
  }

  toggleTxInfoModal() {
    Store.dispatch(toggleDashboardTxInfoModal(false));
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  render() {
    if (this.props && this.props.ActiveCoin.showTransactionInfo && this.props.ActiveCoin.mode !== 'native') {
      const txInfo = this.props.ActiveCoin.txhistory[this.props.ActiveCoin.showTransactionInfoTxIndex];

      return (
        <div>
          <div className="modal show" data-extcoin="COIN" id="kmd_txid_info_mdl" aria-hidden="false" role="dialog">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body" style={{height: '590px'}}>
                  <div className="panel nav-tabs-horizontal">
                    <ul className="nav nav-tabs nav-tabs-line" data-plugin="nav-tabs" role="tablist">
                      <li className={this.state.activeTab === 0 ? 'active' : ''} role="presentation">
                        <a data-toggle="tab" data-extcoin="COIN" aria-controls="KmdTxIDInfotab1" role="tab" onClick={() => this.openTab(0)}>
                          <i className="icon md-balance-wallet" aria-hidden="true"></i>TxID Info
                        </a>
                      </li>
                      <li className={this.state.activeTab === 1 ? 'active' : ''} role="presentation">
                        <a data-toggle="tab" data-extcoin="COIN" aria-controls="KmdTxIDInfotab4" role="tab" onClick={() => this.openTab(1)}>
                          <i className="icon wb-file" aria-hidden="true"></i>Raw info
                        </a>
                      </li>
                    </ul>
                    <div className="panel-body">
                      <div className="tab-content">
                        <div className={this.state.activeTab === 0 ? 'tab-pane active' : 'tab-pane'} id="KmdTxIDInfotab1" data-extcoin="COIN" role="tabpanel">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>address</td>
                                <td>
                                {txInfo.address}
                                </td>
                              </tr>
                              <tr>
                                <td>amount</td>
                                <td>
                                {txInfo.amount}
                                </td>
                              </tr>
                              <tr>
                                <td>category</td>
                                <td>
                                  {txInfo.category || txInfo.type}
                                </td>
                              </tr>
                              <tr>
                                <td>confirmations</td>
                                <td>
                                  {txInfo.confirmations}
                                </td>
                              </tr>
                              <tr>
                                <td>blockhash</td>
                                <td>
                                  {txInfo.blockhash}
                                </td>
                              </tr>
                              <tr>
                                <td>blocktime</td>
                                <td>
                                  {secondsToString(txInfo.blocktime || txInfo.timestamp)}
                                </td>
                              </tr>
                              <tr>
                                <td>txid</td>
                                <td>
                                  {txInfo.txid}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className={this.state.activeTab === 1 ? 'tab-pane active' : 'tab-pane'} id="KmdTxIDInfotab4" data-extcoin="COIN" role="tabpanel">
                          <textarea id="kmd_txid_info_hex" data-extcoin="COIN" style={{width: '100%', height: '400px'}} rows="40" cols="80" defaultValue={JSON.stringify(txInfo, null, '\t')} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.toggleTxInfoModal}>Close</button>
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

export default WalletsTxInfo;
