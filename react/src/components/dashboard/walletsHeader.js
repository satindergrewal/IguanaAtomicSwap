import React from 'react';
import { translate } from '../../translate/translate';
// import { dashboardChangeSection, toggleAddcoinModal } from '../../actions/actionCreators';
// import Store from '../../store';

class WalletsHeader extends React.Component {
  hasActiveSection() {
    return this.props &&
      this.props.activeSection;
  }

  isActiveSectionJumblr() {
    return this.props.activeSection === 'jumblr';
  }

  render() {
    if (this.hasActiveSection()) {
      return (
        <div
          className="page-header page-header-bordered header-easydex margin-bottom-0"
          id="easydex-header-div"
          style={{ backgroundImage: 'url("assets/images/bg/' + this.props.activeSection + '_transparent_header_bg.png")', backgroundRepeat: 'no-repeat', backgroundPosition: '0%' }}>
          <h1 className={ this.isActiveSectionJumblr() ? 'hide' : 'page-title' }>EasyDEX</h1>
          <ol className="breadcrumb">
            <li className={ this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>{ translate('INDEX.DASHBOARD') }</li>
            <li className={ !this.isActiveSectionJumblr() ? 'hide' : 'header-easydex-section' }>
              <img src="assets/images/native/jumblr_header_title_logo.png" /><br /> { translate('SIDEBAR.JUMBLR_MOTTO') }
            </li>
          </ol>
          <div className="page-header-actions z-index-1 display-none">
            <div id="kmd_header_button">
              <button
                type="button"
                id="easydex_kmd_wallet_actions_header"
                className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light"
                aria-expanded="false">
                <i className="icon md-plus" aria-hidden="true"></i>
              </button>
              <ul
                className="dropdown-menu animate dropdown-menu-right"
                aria-labelledby="easydex_kmd_wallet_actions_header"
                role="menu">
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    id="btn_kmd_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    id="btn_kmd_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    id="btn_kmd_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider" role="presentation"></li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    id="btn_kmd_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
                </li>
              </ul>
            </div>

            <div id="zec_header_button" className="display-none">
              <button
                type="button"
                id="easydex_zec_wallet_actions_header"
                className="bg-yellow-600 btn btn-floating white waves-effect waves-float waves-light"
                aria-expanded="false">
                <i className="icon md-plus" aria-hidden="true"></i>
              </button>
              <ul
                className="dropdown-menu animate dropdown-menu-right"
                aria-labelledby="easydex_zec_wallet_actions_header"
                role="menu">
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="ZEC"
                    id="btn_zec_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="ZEC"
                    id="btn_zec_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="ZEC"
                    id="btn_zec_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider" role="presentation"></li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="ZEC"
                    id="btn_zec_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
                </li>
              </ul>
            </div>

            <div id="kmd_header_button">
              <button
                type="button"
                id="jumblr_actions_header"
                className="btn white waves-effect waves-light">
                <i className="icon fa-refresh" aria-hidden="true"></i>{ translate('INDEX.REFRESH') }
              </button>
            </div>

            <div id="kmd_header_button" className="display-none">
              <button
                type="button"
                id="easydex_acpax_wallet_actions_header"
                className="bg-teal-500 btn btn-floating white waves-effect waves-float waves-light"
                aria-expanded="false">
                <i className="icon md-plus" aria-hidden="true"></i>
              </button>
              <ul
                className="dropdown-menu animate dropdown-menu-right"
                aria-labelledby="easydex_acpax_wallet_actions_header"
                role="menu">
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="KMD"
                    id="btn_acpax_wallet_dashboard">{ translate('INDEX.DASHBOARD') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="KMD"
                    id="btn_acpax_wallet_send">{ translate('INDEX.SEND') }</a>
                </li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="KMD"
                    id="btn_acpax_wallet_recieve">{ translate('INDEX.RECEIVE') }</a>
                </li>
                <li className="divider" role="presentation"></li>
                <li role="presentation">
                  <a
                    href="javascript:void(0)"
                    role="menuitem"
                    data-extcoin-menu="KMD"
                    id="btn_acpax_wallet_settings">{ translate('INDEX.SETTINGS') }</a>
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
