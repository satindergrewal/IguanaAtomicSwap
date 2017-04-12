import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeReceive extends React.Component {
  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.receive) {
      return (
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
                            <th>{translate('INDEX.ADDRESS')}</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>{translate('INDEX.TYPE')}</th>
                            <th>{translate('INDEX.ADDRESS')}</th>
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

export default WalletsNativeReceive;
