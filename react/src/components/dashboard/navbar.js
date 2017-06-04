import React from 'react';
import { translate } from '../../translate/translate';
import {
  dashboardChangeSection,
  toggleAddcoinModal,
  stopInterval,
  startInterval,
  toggleSyncOnlyModal,
  getSyncOnlyForks,
  logout
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
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (e.srcElement.className !== 'dropdown-menu' &&
        e.srcElement.alt !== 'iguana profile pic' &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className !== 'avatar avatar-online') &&
        e.srcElement.className.indexOf('navbar-avatar') === -1 &&
        (e.path && e.path[4] && e.path[4].className.indexOf('dropdown-menu') === -1)) {
      this.setState({
        openDropMenu: false,
      });
    }
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

  openSyncOnlyModal() {
    Store.dispatch(getSyncOnlyForks());

    const _iguanaActiveHandle = setInterval(function() {
      Store.dispatch(getSyncOnlyForks());
    }.bind(this), 3000);
    Store.dispatch(startInterval('syncOnly', _iguanaActiveHandle));

    Store.dispatch(toggleSyncOnlyModal(true));
  }

  isSectionActive(section) {
    return this.props.Dashboard.activeSection === section;
  }

  render() {
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
          <div className="collapse navbar-collapse navbar-collapse-toolbar">
            <ul className="nav navbar-toolbar">
              <li className="hidden-float display-none">
                <a>
                  <i className="icon hamburger hamburger-arrow-left">
                    <span className="sr-only">{ translate('INDEX.TOGGLE_MENUBAR') }</span>
                    <span className="hamburger-bar"></span>
                  </i>
                </a>
              </li>
              <li className={ this.isSectionActive('wallets') ? 'active nav-top-menu' : 'nav-top-menu' }>
                <a onClick={ () => this.dashboardChangeSection('wallets') }>
                  <i className="site-menu-icon"></i> { translate('INDEX.WALLETS') }
                </a>
              </li>
              <li className={ this.isSectionActive('edex') ? 'active nav-top-menu' : 'nav-top-menu' }>
                <a onClick={ () => this.dashboardChangeSection('edex') }>
                  <i className="site-menu-icon"></i> EasyDEX
                </a>
              </li>
              <li className={ 'display-none ' + (this.isSectionActive('jumblr') ? 'active nav-top-menu' : 'nav-top-menu') }>
                <a onClick={ () => this.dashboardChangeSection('jumblr') }>
                  <i className="site-menu-icon"></i> Jumblr
                </a>
              </li>
              <li className={ this.isSectionActive('atomic') ? 'active nav-top-menu' : 'nav-top-menu' }>
                <a onClick={ () => this.dashboardChangeSection('atomic') }>
                  <i className="site-menu-icon"></i> Atomic Explorer
                </a>
              </li>
            </ul>
            <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
              <li>
                <a
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
                    <a onClick={ () => this.dashboardChangeSection('settings') }>
                      <i className="icon md-settings"></i> { translate('INDEX.SETTINGS') }
                    </a>
                  </li>
                  <li>
                    <a onClick={ () => this.openSyncOnlyModal() }>
                      <i className="icon fa-cubes"></i> { translate('ADD_COIN.SYNC_ONLY') }
                    </a>
                  </li>
                  <li>
                    <a onClick={ () => this.dashboardChangeSection('about') }>
                      <i className="icon fa-users"></i> { translate('INDEX.ABOUT_IGUANA') }
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a onClick={ this.logout }>
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
  }
}

export default Navbar;
