import React from 'react';
import { translate } from '../../translate/translate';

// TODO: implement sorting

class ReceiveCoin extends React.Component {
  renderAddressList() {
    if (this.props.addresses && this.props.addresses['public'] && this.props.addresses['public'].length) {
      return this.props.addresses['public'].map((address) =>
        <tr key={address.address}>
          <td>
            <span className="label label-default">
              <i className="icon fa-eye"></i> {translate('IAPI.PUBLIC_SM')}
            </span>
          </td>
          <td>{address.address}</td>
          <td>{address.amount}</td>
          <td>{address.interest ? address.interest : 'N/A'}</td>
        </tr>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props && this.props.receive && this.props.mode !== 'native') {
      return (
        <div data-edexcoin="COIN" id="edexcoin_recieve">
          <div className="col-xs-12 margin-top-20">
            <div className="panel nav-tabs-horizontal">
              <div data-edexcoin="COIN" id="edexcoin_recieve_section">
                <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                  <div className="panel">
                    <header className="panel-heading">
                      <div className="panel-actions">
                      </div>
                      <h4 className="panel-title">{translate('INDEX.RECEIVING_ADDRESS')}</h4>
                    </header>
                    <div className="panel-body">
                      <table className="table table-hover dataTable table-striped" data-edexcoin="COIN" id="edexcoin-recieve-addr-tbl">
                        <thead>
                          <tr>
                            <th>{translate('INDEX.TYPE')}</th>
                            <th>{translate('INDEX.ADDRESS')}</th>
                            <th>{translate('INDEX.BALANCE')}</th>
                            <th>{translate('INDEX.INTEREST')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderAddressList()}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>{translate('INDEX.TYPE')}</th>
                            <th>{translate('INDEX.ADDRESS')}</th>
                            <th>{translate('INDEX.BALANCE')}</th>
                            <th>{translate('INDEX.INTEREST')}</th>
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

export default ReceiveCoin;
