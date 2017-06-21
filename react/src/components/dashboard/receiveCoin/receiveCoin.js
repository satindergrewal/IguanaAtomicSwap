import React from 'react';
import {
  copyCoinAddress,
  checkAddressBasilisk,
  validateAddressBasilisk
} from '../../../actions/actionCreators';
import Store from '../../../store';

import {
  AddressActionsBasiliskModeRender,
  AddressActionsNonBasiliskModeRender,
  AddressItemRender,
  ReceiveCoinRender
} from './receiveCoin.render';

// TODO: implement sorting
// TODO: fallback to localstorage/stores data in case iguana is taking too long to respond

class ReceiveCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  _checkAddressBasilisk(address) {
    Store.dispatch(checkAddressBasilisk(this.props.coin, address));
  }

  _validateAddressBasilisk(address) {
    Store.dispatch(validateAddressBasilisk(this.props.coin, address));
  }

  _copyCoinAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  isBasiliskMode() {
    return this.props.mode === 'basilisk';
  }

  renderAddressActions(address) {
    if (this.isBasiliskMode()) {
      return AddressActionsBasiliskModeRender.call(this, address);
    }

    return AddressActionsNonBasiliskModeRender.call(this, address);
  }

  hasNoAmount(address) {
    return address.amount === 'N/A' || address.amount === 0;
  }

  hasNoInterest(address) {
    return address.interest === 'N/A' || address.interest === 0 || !address.interest;
  }

  renderAddressList() {
    if (this.props.addresses &&
        this.props.addresses.public &&
        this.props.addresses.public.length) {
      let items = [];

      for (let i = 0; i < this.props.addresses.public.length; i++) {
        let address = this.props.addresses.public[i];

        if (this.isBasiliskMode() &&
            this.hasNoAmount(address)) {
          address.amount = this.props.cache && this.props.cache[this.props.coin][address.address] && this.props.cache[this.props.coin][address.address].getbalance.data && this.props.cache[this.props.coin][address.address].getbalance.data.balance ? this.props.cache[this.props.coin][address.address].getbalance.data.balance : 'N/A';
        }
        if (this.isBasiliskMode() &&
            this.hasNoInterest(address)) {
          address.interest = this.props.cache && this.props.cache[this.props.coin][address.address] && this.props.cache[this.props.coin][address.address].getbalance.data && this.props.cache[this.props.coin][address.address].getbalance.data.interest ? this.props.cache[this.props.coin][address.address].getbalance.data.interest : 'N/A';
        }

        items.push(
          AddressItemRender.call(this, address)
        );
      }

      return items;
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.receive &&
        this.props.mode !== 'native') {
      return ReceiveCoinRender.call(this);
    }

    return null;
  }
}

export default ReceiveCoin;
