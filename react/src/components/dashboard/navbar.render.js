import React from 'react';
import { translate } from '../../translate/translate';

const NavbarRender = function () {
  return (
    <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle hamburger hamburger-close navbar-toggle-left hided">
          <span className="sr-only">{ translate('INDEX.TOGGLE_NAV') }</span>
          <span className="hamburger-bar"></span>
        </button>
        <button type="button" className="navbar-toggle collapsed">
          <i className="icon md-more"></i>
        </button>
        <div className="navbar-brand navbar-brand-center site-gridmenu-toggle">
          <img
            className="navbar-brand-logo hidden-xs" src="assets/images/easydex-logo-dashboard.png"
            title="SuperNET Iguana" />
          <img
            className="navbar-brand-logo hidden-md hidden-sm hidden-lg"
            src="assets/images/easydex-logo-dashboard-white.png"
            title="SuperNET Iguana white" />
          <span className="navbar-brand-text hidden-xs"></span>
        </div>
        <button type="button" className="navbar-toggle collapsed">
          <span className="sr-only">{ translate('INDEX.TOGGLE_SEARCH') }</span>
          <i className="icon md-search"></i>
        </button>
      </div>
      <div className="navbar-container container-fluid">
        <div className="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
          <ul className="nav navbar-toolbar">
            <li className="hidden-float display-none" id="toggleMenubar">
              <a>
                <i className="icon hamburger hamburger-arrow-left">
                  <span className="sr-only">{ translate('INDEX.TOGGLE_MENUBAR') }</span>
                  <span className="hamburger-bar"></span>
                </i>
              </a>
            </li>
            <li className={ this.props.Dashboard.activeSection === 'wallets' ? 'active nav-top-menu' : 'nav-top-menu' }>
              <a id="nav-dashboard" onClick={ () => this.dashboardChangeSection('wallets') }>
                <i className="site-menu-icon"></i> { translate('INDEX.WALLETS') }
              </a>
            </li>
            <li className={ this.props.Dashboard.activeSection === 'edex' ? 'active nav-top-menu' : 'nav-top-menu' }>
              <a id="nav-easydex" onClick={ () => this.dashboardChangeSection('edex') }>
                <i className="site-menu-icon" aria-hidden="true"></i> EasyDEX
              </a>
            </li>
            <li
              className={'display-none ' + (this.props.Dashboard.activeSection === 'jumblr' ? 'active nav-top-menu' : 'nav-top-menu') }>
              <a id="nav-jumblr" onClick={ () => this.dashboardChangeSection('jumblr') }>
                <i className="site-menu-icon"></i> Jumblr
              </a>
            </li>
            <li className={ this.props.Dashboard.activeSection === 'atomic' ? 'active nav-top-menu' : 'nav-top-menu' }>
              <a id="nav-iguana-atomic-explorer" onClick={ () => this.dashboardChangeSection('atomic') }>
                <i className="site-menu-icon"></i> Atomic Explorer
              </a>
            </li>
          </ul>
          <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
            <li role="presentation">
              <a
                id="btn_edexcoin_addcoin"
                className="pointer padding-bottom-10 padding-top-16"
                onClick={ this.toggleAddCoinModal }>
                  <span>
                    <img src="assets/images/icons/activatecoin.png" alt={ translate('INDEX.ADD_COIN') } />
                  </span>
              </a>
            </li>
            <li
              className={ 'pointer dropdown' + (this.state.openDropMenu ? ' open' : '') }
              onClick={ this.openDropMenu }>
              <a className="navbar-avatar dropdown-toggle">
                  <span className="avatar avatar-online">
                    <img src="assets/images/iguana_profile_02.jpg" alt="iguana profile pic" />
                    <i></i>
                  </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    id="nav-iguana-wallet-settings"
                    onClick={ () => this.dashboardChangeSection('settings') }>
                    <i className="icon md-settings"></i> { translate('INDEX.SETTINGS') }
                  </a>
                </li>
                <li>
                  <a
                    id="nav-iguana-sync-only"
                    onClick={ () => this.openSyncOnlyModal() }>
                    <i className="icon fa-cubes"></i> { translate('ADD_COIN.SYNC_ONLY') }
                  </a>
                </li>
                <li>
                  <a
                    id="nav-about-iguana"
                    onClick={ () => this.dashboardChangeSection('about') }>
                    <i className="icon fa-users"></i> { translate('INDEX.ABOUT_IGUANA') }
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a id="logout-account" onClick={ this.logout }>
                    <i className="icon md-power"></i> { translate('INDEX.LOGOUT') }
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarRender;