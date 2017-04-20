import React from 'react';
import { translate } from '../../translate/translate';
import { checkAddressBasilisk, importAddressBasilisk } from '../../actions/actionCreators';
import Store from '../../store';

// TODO: implement sorting
// TODO: add import address ui in basilisk
// TODO: fallback to localstorage/stores data in case iguana is taking too long to respond

class ReceiveCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  checkAddressBasilisk(address) {
    Store.dispatch(checkAddressBasilisk(this.props.coin, address));
  }

  /*importAddressBasilisk(address) {
    Store.dispatch(importAddressBasilisk(this.props.coin, address));
  }
  <span className="label label-default margin-left-10 action" title="Import" onClick={() => this.importAddressBasilisk(address)}>
  <i className="icon fa-upload"></i>
  </span>*/

  renderAddressActions(address) {
    if (this.props.mode === 'basilisk') {
      return (
        <td>
          <span className="label label-default">
            <i className="icon fa-eye"></i> {translate('IAPI.PUBLIC_SM')}
          </span>
          <span className="label label-default margin-left-10 action" title="Check" onClick={() => this.checkAddressBasilisk(address)}>
            <i className="icon fa-database"></i>
          </span>
        </td>
      );
    } else {
      return (
        <td>
          <span className="label label-default">
            <i className="icon fa-eye"></i> {translate('IAPI.PUBLIC_SM')}
          </span>
        </td>
      );
    }
  }

  renderAddressList() {
    if (this.props.addresses && this.props.addresses['public'] && this.props.addresses['public'].length) {
      return this.props.addresses['public'].map((address) =>
        <tr key={address.address}>
          {this.renderAddressActions(address.address)}
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
