import React from 'react';
import { translate } from '../../../translate/translate';

export const AddressActionsBasiliskModeRender = function(address) {
  return (
    <td>
      <span className="label label-default">
        <i className="icon fa-eye"></i> { translate('IAPI.PUBLIC_SM') }
      </span>
      <button
        className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
        title={ translate('INDEX.COPY_TO_CLIPBOARD') }
        onClick={ () => this._copyCoinAddress(address) }><i className="icon wb-copy"></i> { translate('INDEX.COPY') }</button>
      <span
        className="label label-default margin-left-10 action"
        title={ translate('INDEX.CHECK') }
        onClick={ () => this._checkAddressBasilisk(address) }>
        <i className="icon fa-database"></i>
      </span>
      <span
        className="label label-default margin-left-10 action"
        title={ translate('INDEX.VALIDATE') }
        onClick={ () => this._validateAddressBasilisk(address) }>
        <i className="icon fa-info-circle"></i>
      </span>
    </td>
  );
};

export const AddressActionsNonBasiliskModeRender = function(address) {
  return (
    <td>
      <span className="label label-default">
        <i className="icon fa-eye"></i> { translate('IAPI.PUBLIC_SM') }
      </span>
      <button
        className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
        onClick={ () => this._copyCoinAddress(address) }><i className="icon wb-copy"></i> { translate('INDEX.COPY') }</button>
    </td>
  );
};

export const AddressItemRender = function(address) {
  return (
    <tr key={ address.address }>
      { this.renderAddressActions(address.address) }
      <td>{ address.address }</td>
      <td>{ address.amount }</td>
      <td>{ address.interest ? address.interest : 'N/A' }</td>
    </tr>
  );
};

export const ReceiveCoinRender = function() {
  return (
    <div>
      <div className="col-xs-12 margin-top-20">
        <div className="panel nav-tabs-horizontal">
          <div>
            <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="panel">
                <header className="panel-heading">
                  <div className="panel-actions"></div>
                  <h4 className="panel-title">{ translate('INDEX.RECEIVING_ADDRESS') }</h4>
                </header>
                <div className="panel-body">
                  <table className="table table-hover dataTable table-striped">
                    <thead>
                    <tr>
                      <th>{ translate('INDEX.TYPE') }</th>
                      <th>{ translate('INDEX.ADDRESS') }</th>
                      <th>{ translate('INDEX.BALANCE') }</th>
                      <th>{ translate('INDEX.INTEREST') }</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderAddressList() }
                    </tbody>
                    <tfoot>
                    <tr>
                      <th>{ translate('INDEX.TYPE') }</th>
                      <th>{ translate('INDEX.ADDRESS') }</th>
                      <th>{ translate('INDEX.BALANCE') }</th>
                      <th>{ translate('INDEX.INTEREST') }</th>
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
};