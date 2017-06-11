import React from 'react';
import { translate } from '../../../translate/translate';
import { secondsToString } from '../../../util/time';

const WalletsTxInfoRender = function(txInfo) {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div className="modal show" id="kmd_txid_info_mdl">
        <div className="modal-dialog modal-center modal-lg">
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              <div className="panel nav-tabs-horizontal">
                <ul className="nav nav-tabs nav-tabs-line">
                  <li className={ this.state.activeTab === 0 ? 'active' : '' }>
                    <a onClick={ () => this.openTab(0) }>
                      <i className="icon md-balance-wallet"></i>TxID Info
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 1 ? 'active' : '' }>
                    <a onClick={ () => this.openTab(1) }>
                      <i className="icon wb-file"></i>Raw info
                    </a>
                  </li>
                </ul>
                <div className="panel-body">
                  <div className="tab-content">
                    <div className={ this.state.activeTab === 0 ? 'tab-pane active' : 'tab-pane' }>
                      <table className="table table-striped">
                        <tbody>
                        <tr>
                          <td>{ translate('TX_INFO.ADDRESS') }</td>
                          <td>
                            { txInfo.address }
                          </td>
                        </tr>
                        <tr>
                          <td>{ translate('TX_INFO.AMOUNT') }</td>
                          <td>
                            { txInfo.amount }
                          </td>
                        </tr>
                        <tr>
                          <td>{ translate('TX_INFO.CATEGORY') }</td>
                          <td>
                            { txInfo.category || txInfo.type }
                          </td>
                        </tr>
                        <tr>
                          <td>{ translate('TX_INFO.CONFIRMATIONS') }</td>
                          <td>
                            { txInfo.confirmations }
                          </td>
                        </tr>
                        <tr>
                          <td>blockhash</td>
                          <td>
                            { txInfo.blockhash }
                          </td>
                        </tr>
                        <tr>
                          <td>blocktime</td>
                          <td>
                            { secondsToString(txInfo.blocktime || txInfo.timestamp) }
                          </td>
                        </tr>
                        <tr>
                          <td>txid</td>
                          <td>
                            { txInfo.txid }
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className={ this.state.activeTab === 1 ? 'tab-pane active' : 'tab-pane' }>
                      <textarea
                        className="full-width height-400"
                        rows="40"
                        cols="80"
                        defaultValue={ JSON.stringify(txInfo, null, '\t') } disabled></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.toggleTxInfoModal }>{ translate('INDEX.CLOSE') }</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};

export default WalletsTxInfoRender;