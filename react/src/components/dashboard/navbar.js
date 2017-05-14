import React from 'react';
import { translate } from '../../translate/translate';
import {
  dashboardChangeSection,
  toggleAddcoinModal,
  logout,
  stopInterval
} from '../../actions/actionCreators';
import Store from '../../store';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropMenu: false,
    };
    this.openDropMenu = this.openDropMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      openDropMenu: !this.state.openDropMenu,
    }));
  }

  toggleAddCoinModal() {
    Store.dispatch(toggleAddcoinModal(true, false));
  }

  dashboardChangeSection(sectionName) {
    Store.dispatch(dashboardChangeSection(sectionName));
  }

  logout() {
    Store.dispatch(stopInterval('sync', this.props.Interval.interval));
    Store.dispatch(stopInterval('basilisk', this.props.Interval.interval));
    Store.dispatch(logout());
  }

  render() {
    return (
      <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle hamburger hamburger-close navbar-toggle-left hided"
          data-toggle="menubar">
            <span className="sr-only">{translate('INDEX.TOGGLE_NAV')}</span>
            <span className="hamburger-bar"></span>
          </button>
          <button type="button" className="navbar-toggle collapsed" data-target="#site-navbar-collapse"
          data-toggle="collapse">
            <i className="icon md-more" aria-hidden="true"></i>
          </button>
          <div className="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
            <img className="navbar-brand-logo hidden-xs" src="assets/images/easydex-logo-dashboard.png" title="SuperNET Igauana" />
            <img className="navbar-brand-logo hidden-md hidden-sm hidden-lg" src="assets/images/easydex-logo-dashboard-white.png" title="SuperNET Igauana white" />
            <span className="navbar-brand-text hidden-xs"></span>
          </div>
          <button type="button" className="navbar-toggle collapsed" data-target="#site-navbar-search"
          data-toggle="collapse">
            <span className="sr-only">{translate('INDEX.TOGGLE_SEARCH')}</span>
            <i className="icon md-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="navbar-container container-fluid">
          <div className="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
            <ul className="nav navbar-toolbar">
              <li className="hidden-float" id="toggleMenubar" style={{ display: 'none' }}>
                <a data-toggle="menubar" href="#" role="button">
                  <i className="icon hamburger hamburger-arrow-left">
                    <span className="sr-only">{translate('INDEX.TOGGLE_MENUBAR')}</span>
                    <span className="hamburger-bar"></span>
                  </i>
                </a>
              </li>
              <li className={this.props.Dashboard.activeSection === 'wallets' ? 'active nav-top-menu' : 'nav-top-menu'}>
                <a href="javascript:void(0)" id="nav-dashboard" onClick={() => this.dashboardChangeSection('wallets')}>
                  <i className="site-menu-icon" aria-hidden="true"></i> {translate('INDEX.WALLETS')}
                </a>
              </li>
              <li className={this.props.Dashboard.activeSection === 'edex' ? 'active nav-top-menu' : 'nav-top-menu'}>
                <a href="javascript:void(0)" id="nav-easydex" onClick={() => this.dashboardChangeSection('edex')}>
                  <i className="site-menu-icon" aria-hidden="true"></i> EasyDEX
                </a>
              </li>
              <li className={this.props.Dashboard.activeSection === 'jumblr' ? 'active nav-top-menu' : 'nav-top-menu'} style={{display: 'none'}}>
                <a href="javascript:void(0)" id="nav-jumblr" onClick={() => this.dashboardChangeSection('jumblr')}>
                  <i className="site-menu-icon" aria-hidden="true"></i> Jumblr
                </a>
              </li>
              <li className={this.props.Dashboard.activeSection === 'atomic' ? 'active nav-top-menu' : 'nav-top-menu'}>
                <a id="nav-iguana-atomic-explorer" onClick={() => this.dashboardChangeSection('atomic')}>
                  <i className="site-menu-icon" aria-hidden="true"></i> Atomic Explorer
                </a>
              </li>
            </ul>
            <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
              <li role="presentation">
                <a href="javascript:void(0)" role="menuitem" id="btn_edexcoin_addcoin" data-toggle="modal" style={{ paddingBottom: '10px', paddingTop: '16px' }} onClick={this.toggleAddCoinModal}>
                  <span>
                    <img src="assets/images/icons/activatecoin.png" alt="Add Coin" />
                  </span>
                </a>
              </li>
              <li className={'dropdown' + (this.state.openDropMenu ? ' open' : '')} onClick={this.openDropMenu}>
                <a className="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"
                data-animation="scale-up" role="button">
                  <span className="avatar avatar-online">
                    <img src="assets/images/iguana_profile_02.jpg" alt="iguana profile pic" />
                    <i></i>
                  </span>
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li role="presentation">
                    <a href="javascript:void(0)" role="menuitem" id="nav-iguana-wallet-settings" onClick={() => this.dashboardChangeSection('settings')}>
                      <i className="icon md-settings" aria-hidden="true"></i> {translate('INDEX.SETTINGS')}
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="javascript:void(0)" role="menuitem" id="nav-about-iguana" onClick={() => this.dashboardChangeSection('about')}>
                      <i className="icon fa-users" aria-hidden="true"></i> {translate('INDEX.ABOUT_IGUANA')}
                    </a>
                  </li>
                  <li className="divider" role="presentation"></li>
                  <li role="presentation">
                    <a href="javascript:void(0)" role="menuitem" id="logout-account" onClick={this.logout}>
                      <i className="icon md-power" aria-hidden="true"></i> {translate('INDEX.LOGOUT')}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
