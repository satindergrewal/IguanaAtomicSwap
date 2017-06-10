import React from 'react';
import {
  dashboardChangeSection,
  toggleAddcoinModal,
  stopInterval,
  startInterval,
  toggleSyncOnlyModal,
  getSyncOnlyForks,
  logout
} from '../../../actions/actionCreators';
import Store from '../../../store';

import NavbarRender from './navbar.render';

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
    return NavbarRender.call(this);
  }
}

export default Navbar;
