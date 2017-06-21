import React from 'react';
import { translate } from '../../../translate/translate';

export const AddressListRender = function(address, type) {
  return (
    <tr key={ address.address }>
      <td>
        <span className={ type === 'public' ? 'label label-default' : 'label label-dark' }>
          <i className={ type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash' }></i> { type === 'public' ? translate('IAPI.PUBLIC_SM') : translate('KMD_NATIVE.PRIVATE') }
        </span>
        <button
          className="btn btn-default btn-xs clipboard-edexaddr margin-left-10"
          onClick={ () => this.copyZAddress(address.address) }><i className="icon wb-copy"></i> { translate('INDEX.COPY') }</button>
      </td>
      <td>{ type === 'public' ? address.address : address.address.substring(0, 34) + '...' }</td>
      <td>{ address.amount }</td>
      <td></td>
    </tr>
  );
};

export const WalletsNativeReceiveRender = function() {
  return (
    <div>
      <div className="col-xs-12 margin-top-20">
        <div className="panel nav-tabs-horizontal">
          <div>
            <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="panel">
                <header className="panel-heading">
                  <div className="panel-actions">
                    <div className={ 'dropdown' + (this.state.openDropMenu ? ' open' : '') } onClick={ this.openDropMenu }>
                      <a className="dropdown-toggle white btn btn-warning">
                        <i className="icon md-arrows margin-right-10"></i> { translate('INDEX.GET_NEW_ADDRESS') } <span className="caret"></span>
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-right">
                        <li>
                          <a onClick={ () => this.getNewAddress('public') }>
                            <i className="icon fa-eye"></i> { translate('INDEX.TRANSPARENT_ADDRESS') }
                          </a>
                        </li>
                        <li>
                          <a onClick={ () => this.getNewAddress('private') }>
                            <i className="icon fa-eye-slash"></i> { translate('INDEX.PRIVATE_Z_ADDRESS') }
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h3 className="panel-title">{ translate('INDEX.RECEIVING_ADDRESS') }</h3>
                </header>
                <div className="panel-body">
                  <table className="table table-hover dataTable table-striped">
                    <thead>
                    <tr>
                      <th>{ translate('INDEX.TYPE') }</th>
                      <th>{ translate('INDEX.ADDRESS') }</th>
                      <th>{ translate('INDEX.AMOUNT') }</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderAddressList('public') }
                    { this.renderAddressList('private') }
                    </tbody>
                    <tfoot>
                    <tr>
                      <th>{ translate('INDEX.TYPE') }</th>
                      <th>{ translate('INDEX.ADDRESS') }</th>
                      <th>{ translate('INDEX.AMOUNT') }</th>
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