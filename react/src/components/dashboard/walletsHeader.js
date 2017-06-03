import React from 'react';
import { translate } from '../../translate/translate';

class WalletsHeader extends React.Component {
  render() {
    if (this.props &&
        this.props.activeSection) {
      return (
        <div
          className="page-header page-header-bordered header-easydex margin-bottom-0"
          id="easydex-header-div"
          style={{ backgroundImage: `url("assets/images/bg/${this.props.activeSection}_transparent_header_bg.png")`, backgroundRepeat: 'no-repeat', backgroundPosition: '0%' }}>
          <h1 className={ this.props.activeSection === 'jumblr' ? 'hide' : 'page-title' }>EasyDEX</h1>
          <ol className="breadcrumb">
            <li className={ this.props.activeSection === 'jumblr' ? 'hide' : 'header-easydex-section' }>{ translate('INDEX.DASHBOARD') }</li>
            <li className={ this.props.activeSection !== 'jumblr' ? 'hide' : 'header-easydex-section' }>
              <img src="assets/images/native/jumblr_header_title_logo.png" /><br /> { translate('SIDEBAR.JUMBLR_MOTTO') }
            </li>
          </ol>
          <div className="page-header-actions z-index-1 display-none">
            <div id="kmd_header_button">
              <button
                type="button"
                id="easydex_kmd_wallet_actions_header"
                className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light">
                <i className="icon md-plus"></i>
              </button>
              <ul className="dropdown-menu animate dropdown-menu-right">
                <li>
                  <a id="btn_kmd_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li>
                  <a id="btn_kmd_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li>
                  <a id="btn_kmd_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a id="btn_kmd_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
                </li>
              </ul>
            </div>

            <div id="zec_header_button" className="display-none">
              <button
                type="button"
                id="easydex_zec_wallet_actions_header"
                className="bg-yellow-600 btn btn-floating white waves-effect waves-float waves-light">
                <i className="icon md-plus"></i>
              </button>
              <ul className="dropdown-menu animate dropdown-menu-right">
                <li>
                  <a id="btn_zec_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li>
                  <a id="btn_zec_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li>
                  <a id="btn_zec_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a id="btn_zec_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
                </li>
              </ul>
            </div>

            <div id="kmd_header_button">
              <button
                type="button"
                id="jumblr_actions_header"
                className="btn white waves-effect waves-light">
                <i className="icon fa-refresh"></i>{ translate('INDEX.REFRESH') }
              </button>
            </div>

            <div id="kmd_header_button" className="display-none">
              <button
                type="button"
                id="easydex_acpax_wallet_actions_header"
                className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light">
                <i className="icon md-plus"></i>
              </button>
              <ul className="dropdown-menu animate dropdown-menu-right">
                <li>
                  <a id="btn_acpax_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li>
                  <a id="btn_acpax_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li>
                  <a id="btn_acpax_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider"></li>
                <li>
                  <a id="btn_acpax_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
                </li>
              </ul>
            </div>

            <div className="row no-space width-350 hidden-xs" id="easydex_btc_btcd_balances_header display-none">
              <div className="col-xs-6">
                <div className="counter">
                  <span className="font-weight-medium" id="header_coinname_balance"> - BTC</span>
                  <span className="counter-label small" id="header_coinfiatbalance"> - USD</span>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="counter">
                  <span className="font-weight-medium" id="header_coinname_balance"> - BTCD</span>
                  <span className="counter-label small" id="header_coinfiatbalance"> - USD</span>
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

export default WalletsHeader;
