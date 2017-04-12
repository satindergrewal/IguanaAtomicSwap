import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeTxHistory extends React.Component {
  render() {
    return (
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
    );
  }
}

export default WalletsNativeTxHistory;
