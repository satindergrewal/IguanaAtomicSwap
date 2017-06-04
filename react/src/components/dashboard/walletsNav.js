import React from 'react';
import { translate } from '../../translate/translate';
import {
  copyCoinAddress,
  iguanaEdexBalance,
  toggleSendCoinForm,
  toggleReceiveCoinForm,
  toggleSendReceiveCoinForms,
  toggleDashboardActiveSection
} from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSendReceiveCoinForms = this.toggleSendReceiveCoinForms.bind(this);
  }

  componentWillMount() {
    Store.dispatch(iguanaEdexBalance(this.props.ActiveCoin.coin));
  }

  copyMyAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  toggleSendReceiveCoinForms() {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(toggleDashboardActiveSection(this.props.ActiveCoin.nativeActiveSection === 'settings' ? 'default' : 'settings'));
    } else {
      Store.dispatch(toggleSendReceiveCoinForms());
    }
  }

  toggleSendCoinForm(display) {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(toggleDashboardActiveSection(this.props.ActiveCoin.nativeActiveSection === 'send' ? 'default' : 'send'));
    } else {
      Store.dispatch(toggleSendCoinForm(display));
    }
  }

  toggleReceiveCoinForm(display) {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(toggleDashboardActiveSection(this.props.ActiveCoin.nativeActiveSection === 'receive' ? 'default' : 'receive'));
    } else {
      Store.dispatch(toggleReceiveCoinForm(display));
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        !this.props.ActiveCoin.coin) {
      return (
        <div>
          <div className="col-xs-12 padding-top-20">
            <div className="alert alert-info alert-dismissible">
              <button type="button" className="close"></button>
              <span className="font-size-24 text-align-center">
                <i className="icon fa-paw"></i> { translate('INDEX.NO_WALLET_CAPS') }
              </span>
              <br/>
              { translate('INDEX.PLEASE_SELECT_A_WALLET') }.
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="page-header page-header-bordered header-easydex padding-bottom-20"
            id="header-dashboard"
            style={{ marginBottom: this.props.ActiveCoin.mode === 'basilisk' ? '30px' : '0' }}>
            <ol className="breadcrumb">
              <strong>{ translate('INDEX.MY') } { this.props && this.props.ActiveCoin ? this.props.ActiveCoin.coin : '-' } { translate('INDEX.ADDRESS') }: </strong> { this.props && this.props.Dashboard && this.props.Dashboard.activeHandle ? this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] : '-' } <button className="btn btn-default btn-xs clipboard-edexaddr" onClick={ () => this.copyMyAddress(this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin]) }><i className="icon wb-copy"></i> { translate('INDEX.COPY') }</button>
            </ol>
            <div className="page-header-actions">
              <div id="kmd_header_button">
                <button
                  type="button"
                  className="btn btn-dark waves-effect waves-light"
                  onClick={ this.toggleSendReceiveCoinForms }>
                  <i className="icon md-view-dashboard"></i> { this.props.ActiveCoin.mode !== 'native' ? translate('INDEX.DASHBOARD') : translate('INDEX.WALLET_INFO') }
                </button>
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  onClick={ () => this.toggleSendCoinForm(!this.props.ActiveCoin.send) }>
                  <i className="icon fa-send"></i> { translate('INDEX.SEND') }
                </button>
                <button
                  type="button"
                  className="btn btn-info waves-effect waves-light"
                  onClick={ () => this.toggleReceiveCoinForm(!this.props.ActiveCoin.receive) }>
                  <i className="icon fa-inbox"></i> { translate('INDEX.RECEIVE') }
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WalletsNav;
