import React from 'react';
import {
  copyCoinAddress,
  getNewKMDAddresses
} from '../../../actions/actionCreators';
import Store from '../../../store';
import {
  AddressListRender,
  WalletsNativeReceiveRender
} from './walletsNativeReceive.render';

class WalletsNativeReceive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropMenu: false,
    };
    this.openDropMenu = this.openDropMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (e.srcElement.className.indexOf('dropdown') === -1 &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className.indexOf('dropdown') === -1)) {
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

  copyZAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  renderAddressList(type) {
    if (this.props.ActiveCoin.addresses &&
        this.props.ActiveCoin.addresses[type] &&
        this.props.ActiveCoin.addresses[type].length) {
      return this.props.ActiveCoin.addresses[type].map((address) =>
        AddressListRender.call(this, address, type)
      );
    }

    return null;
  }

  getNewAddress(type) {
    Store.dispatch(getNewKMDAddresses(this.props.ActiveCoin.coin, type));
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.nativeActiveSection === 'receive') {
      return WalletsNativeReceiveRender.call(this);
    }

    return null;
  }
}

export default WalletsNativeReceive;
