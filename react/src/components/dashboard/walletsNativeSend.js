import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { sendNativeTx, getKMDOPID } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNativeSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressType: null,
      sendFrom: null,
      sendFromAmount: 0,
      sendTo: null,
      amount: 0,
      fee: 0.0001,
      addressSelectorOpen: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
  }

  renderAddressByType(type) {
    if (this.props.ActiveCoin.addresses && this.props.ActiveCoin.addresses[type] && this.props.ActiveCoin.addresses[type].length) {
      return this.props.ActiveCoin.addresses[type].map((address) =>
        <li data-original-index="2" key={address.address} className={address.amount <= 0 ? 'hide' : ''}>
          <a tabIndex="0" data-tokens="null" onClick={() => this.updateAddressSelection(address.address, type, address.amount)}><i className={type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {address.amount} {this.props.ActiveCoin.coin} ]  {address.address}</span><span className="glyphicon glyphicon-ok check-mark"></span></a>
        </li>
      );
    } else {
      return null;
    }
  }

  renderSelectorCurrentLabel() {
    if (this.state.sendFrom) {
      return (
        <span>
          <i className={this.state.addressType === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash'}></i>  <span className="text">[ {this.state.sendFromAmount} {this.props.ActiveCoin.coin} ]  {this.state.sendFrom}</span>
        </span>
      );
    } else {
      return (
        <span>- Select Transparent or Private Address -</span>
      );
    }
  }

  renderAddressList() {
    return (
      <div className={'btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ' + (this.state.addressSelectorOpen ? 'open' : '')}>
        <button type="button" className="btn dropdown-toggle btn-info" data-toggle="dropdown" data-id="kmd_wallet_send_from" title="- Select Transparent or Private Address -" aria-expanded="true" onClick={this.openDropMenu}>
          <span className="filter-option pull-left">{this.renderSelectorCurrentLabel()} </span>&nbsp;<span className="bs-caret"><span className="caret"></span></span>
        </button>
        <div className="dropdown-menu open">
          <ul className="dropdown-menu inner" role="menu">
            <li data-original-index="1" className="selected">
              <a tabIndex="0" data-tokens="null"><span className="text"> - Select Transparent or Private Address - </span><span className="glyphicon glyphicon-ok check-mark"></span></a>
            </li>
            {this.renderAddressByType('public')}
            {this.renderAddressByType('private')}
          </ul>
        </div>
      </div>
    );
  }

  renderOPIDLabel(opid) {
    if (opid.status === 'queued') {
      return (
        <span className="label label-warning">
          <i className="icon fa-eye"></i> <span>{translate('KMD_NATIVE.QUEUED')}</span>
        </span>
      );
    }
    if (opid.status === 'executing') {
      return (
        <span className="label label-info">
          <i className="icon fa-eye"></i> <span>{translate('KMD_NATIVE.EXECUTING')}</span>
        </span>
      );
    }
    if (opid.status === 'failed') {
      return (
        <span className="label label-danger">
          <i className="icon fa-eye"></i> <span>{translate('KMD_NATIVE.FAILED')}</span>
        </span>
      );
    }
    if (opid.status === 'success') {
      return (
        <span className="label label-success">
          <i className="icon fa-eye"></i> <span>{translate('KMD_NATIVE.SUCCESS')}</span>
        </span>
      );
    }
  }

  renderOPIDResult(opid) {
    var isWaitingStatus = true;

    if (opid.status === 'queued') {
      isWaitingStatus = false;
      return (
        <i>{translate('KMD_NATIVE.PLEASE_REFRESH')}...</i>
      );
    }
    if (opid.status === 'executing') {
      isWaitingStatus = false;
      return (
        <i>{translate('KMD_NATIVE.PLEASE_REFRESH')}...</i>
      );
    }
    if (opid.status === 'failed') {
      isWaitingStatus = false;
      return (
        <span>
          <b>Error Code:</b> <span>{opid.error.code}</span>
          <br />
          <b>{translate('KMD_NATIVE.MESSAGE')}:</b> <span>{opid.error.message}</span>
        </span>
      );
    }
    if (opid.status === 'success') {
      isWaitingStatus = false;
      return (
        <span>
          <b>txid:</b> <span>{opid.result.txid}</span>
          <br />
          <b>{translate('KMD_NATIVE.EXECUTION_SECONDS')}:</b> <span>{opid.execution_secs}</span>
        </span>
      );
    }
    if (isWaitingStatus) {
      return (
        <span>Waiting...</span>
      );
    }
  }

  renderOPIDList() {
    if (this.props.ActiveCoin.opids && this.props.ActiveCoin.opids.length) {
      return this.props.ActiveCoin.opids.map((opid) =>
        <tr key={opid.id}>
          <td>{this.renderOPIDLabel(opid)}</td>
          <td>{opid.id}</td>
          <td>{secondsToString(opid.creation_time)}</td>
          <td>{this.renderOPIDResult(opid)}</td>
        </tr>
      );
    } else {
      return null;
    }
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  updateAddressSelection(address, type, amount) {
    this.setState(Object.assign({}, this.state, {
      sendFrom: address,
      addressType: type,
      sendFromAmount: amount,
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    console.log(this.state);
    Store.dispatch(sendNativeTx(this.props.ActiveCoin.coin, this.state));
    setTimeout(function() {
      Store.dispatch(getKMDOPID(null, this.props.ActiveCoin.coin));
    }, 1000);
  }

  render() {
    if (this.props && this.props.ActiveCoin && this.props.ActiveCoin.nativeActiveSection === 'send') {
      return (
        <div data-extcoin="COIN" id="kmd_wallet_send">
          <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="panel" id="projects">
              <div className="panel-heading">
                <h3 data-extcoin="COIN" className="panel-title">
                  {translate('INDEX.SEND')} <span data-extcoinname="COIN"></span>
                </h3>
              </div>
              <div className="panel-body container-fluid">
                <form className="extcoin-send-form" data-extcoin="COIN" method="post" role="form" autoComplete="off">
                  <div className="row">
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label" data-extcoin="COIN" htmlFor="kmd_wallet_send_from">{translate('INDEX.SEND_FROM')}</label>
                      {this.renderAddressList()}
                    </div>
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label" data-extcoin="COIN" htmlFor="kmd_wallet_sendto">{translate('INDEX.SEND_TO')}</label>
                      <input type="text" className="form-control" data-extcoin="COIN" name="sendTo" onChange={this.updateInput} id="kmd_wallet_sendto" placeholder="Enter Transparent or Private address" autoComplete="off" required />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" htmlFor="kmd_wallet_amount" data-extcoin="COIN" id="kmd_wallet_amount_label">
                        <span data-extcoinname="COIN"></span>
                      </label>
                      <input type="text" className="form-control" name="amount" onChange={this.updateInput} data-extcoin="COIN" id="kmd_wallet_amount" placeholder="0.000" autoComplete="off" />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" data-extcoin="COIN" htmlFor="kmd_wallet_fee">{translate('INDEX.FEE')}</label>
                      <input type="text" className="form-control" name="fee" onChange={this.updateInput} data-extcoin="COIN" id="kmd_wallet_fee" placeholder="0.000" value={this.state.fee} autoComplete="off" />
                    </div>
                    <div className="col-lg-12">
                      <span data-extcoin="KMD">
                        <b>{translate('INDEX.TOTAL')}:</b> {this.state.amount} - {this.state.fee}/kb = {Number(this.state.amount) - Number(this.state.fee)} {this.props.ActiveCoin.coin}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <button type="button" className="btn btn-primary waves-effect waves-light pull-right" data-toggle="modal" id="kmd_wallet_send_coins_btn" onClick={this.handleSubmit}>
                        {translate('INDEX.SEND')} {this.state.amount} {this.props.ActiveCoin.coin}
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
                <div data-extcoin="COIN" id="kmd_wallet_opids_status_section">
                  <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="panel">
                      <header className="panel-heading">
                        <div className="panel-actions">
                          <button className="btn btn-info btn-block" id="kmd_opids_status_btn" type="button">
                            <i className="icon fa-repeat" aria-hidden="true"></i> {translate('INDEX.REFRESH')}
                          </button>
                        </div>
                        <h3 className="panel-title">{translate('INDEX.OPERATIONS_STATUSES')}</h3>
                      </header>
                      <div className="panel-body">
                        <table className="table table-hover dataTable table-striped" data-extcoin="COIN" id="kmd-opid-status-tbl" width="100%">
                          <thead>
                            <tr>
                              <th>{translate('INDEX.STATUS')}</th>
                              <th>ID</th>
                              <th>{translate('INDEX.TIME')}</th>
                              <th>{translate('INDEX.RESULT')}</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.renderOPIDList()}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>{translate('INDEX.STATUS')}</th>
                              <th>ID</th>
                              <th>{translate('INDEX.TIME')}</th>
                              <th>{translate('INDEX.RESULT')}</th>
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
    } else {
      return null;
    }
  }
}

export default WalletsNativeSend;
