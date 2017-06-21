import React from 'react';
import { translate } from '../../../translate/translate';

export const AddressListRender = function() {
  return (
    <div className={ `btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ${(this.state.addressSelectorOpen ? 'open' : '')}` }>
      <button
        type="button"
        className="btn dropdown-toggle btn-info"
        title="- { translate('SEND.SELECT_T_OR_Z_ADDR') } -"
        onClick={ this.openDropMenu }>
        <span className="filter-option pull-left">{ this.renderSelectorCurrentLabel() } </span>
        <span className="bs-caret">
            <span className="caret"></span>
          </span>
      </button>
      <div className="dropdown-menu open">
        <ul className="dropdown-menu inner">
          <li className="selected">
            <a><span className="text"> - { translate('SEND.SELECT_T_OR_Z_ADDR') } - </span><span className="glyphicon glyphicon-ok check-mark"></span></a>
          </li>
          { this.renderAddressByType('public') }
          { this.renderAddressByType('private') }
        </ul>
      </div>
    </div>
  );
};

export const OASendUIRender = function() {
  return (
    <div className="row">
      <div className="col-lg-6 form-group form-material">
        <label
          className="control-label"
          htmlFor="kmdWalletSendTo">{ translate('INDEX.SEND_TO') } via Openalias address</label>
        <input
          type="text"
          className="form-control"
          name="sendToOA"
          onChange={ this.updateInput }
          id="kmdWalletSendTo"
          placeholder="Enter an alias as address@site.com"
          autoComplete="off"
          required />
      </div>
      <div className="col-lg-6 form-group form-material">
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
          onClick={ this.getOAdress }>
          Get address
        </button>
      </div>
    </div>
  );
};

export const WalletsNativeSendRender = function() {
  return (
    <div id="kmd_wallet_send">
      <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel" id="projects">
          <div className="panel-heading">
            <h3 className="panel-title">
              { translate('INDEX.SEND') } { this.props.ActiveCoin.coin }
            </h3>
          </div>
          <div className="panel-body container-fluid">
            <form className="extcoin-send-form" method="post" autoComplete="off">
              <div className="row">
                <div className="col-xlg-12 form-group form-material">
                  <label className="control-label">{ translate('INDEX.SEND_FROM') }</label>
                  { this.renderAddressList() }
                </div>
              </div>
              { this.renderOASendUI() }
              <div className="row">
                <div className="col-xlg-12 form-group form-material">
                  <label className="control-label" htmlFor="kmdWalletSendTo">{ translate('INDEX.SEND_TO') }</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sendTo"
                    onChange={ this.updateInput }
                    value={ this.state.sendTo }
                    id="kmdWalletSendTo"
                    placeholder={ translate('SEND.ENTER_T_OR_Z_ADDR') }
                    autoComplete="off"
                    required />
                </div>
                <div className="col-lg-6 form-group form-material">
                  <label className="control-label" htmlFor="kmdWalletAmount">
                    { this.props.ActiveCoin.coin }
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="amount"
                    onChange={ this.updateInput }
                    id="kmdWalletAmount"
                    placeholder="0.000"
                    autoComplete="off" />
                </div>
                <div className="col-lg-6 form-group form-material">
                  <label className="control-label" htmlFor="kmdWalletFee">{ translate('INDEX.FEE') }</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fee"
                    onChange={ this.updateInput }
                    id="kmdWalletFee"
                    placeholder="0.000"
                    value={ this.state.fee }
                    autoComplete="off" />
                </div>
                <div className="col-lg-12">
                  <span>
                    <strong>{ translate('INDEX.TOTAL') }:</strong> { this.state.amount } - { this.state.fee }/kb = { Number(this.state.amount) - Number(this.state.fee) } { this.props.ActiveCoin.coin }
                  </span>
                </div>
                <div className="col-lg-12">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light pull-right"
                    onClick={ this.handleSubmit }
                    disabled={ !this.state.sendFrom || !this.state.sendTo || !this.state.amount }>
                    { translate('INDEX.SEND') } { this.state.amount } { this.props.ActiveCoin.coin }
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
            <div>
              <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                <div className="panel">
                  <header className="panel-heading">
                    <h3 className="panel-title">{ translate('INDEX.OPERATIONS_STATUSES') }</h3>
                  </header>
                  <div className="panel-body">
                    <table
                      className="table table-hover dataTable table-striped"
                      width="100%">
                      <thead>
                      <tr>
                        <th>{ translate('INDEX.STATUS') }</th>
                        <th>ID</th>
                        <th>{ translate('INDEX.TIME') }</th>
                        <th>{ translate('INDEX.RESULT') }</th>
                      </tr>
                      </thead>
                      <tbody>
                      { this.renderOPIDList() }
                      </tbody>
                      <tfoot>
                      <tr>
                        <th>{ translate('INDEX.STATUS') }</th>
                        <th>ID</th>
                        <th>{ translate('INDEX.TIME') }</th>
                        <th>{ translate('INDEX.RESULT') }</th>
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
  );
};