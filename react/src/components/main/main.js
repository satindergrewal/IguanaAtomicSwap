import React from 'react';
import Config from '../../config';
import WalletMain from './walletMain';
import { iguanaSetRPCAuth } from '../../util/auth';
import Store from '../../store';
import {
  getDexCoins,
  iguanaActiveHandle
} from '../../actions/actionCreators';

const IGUANA_ACTIVE_HANDLE_TIMEOUT = 30000;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.isWalletUnlocked = this.isWalletUnlocked.bind(this);
    this.state = {
      isLoggedIn: false,
      coins: null,
      activeCoins: false,
      activeHandleInterval: null,
    };
  }

  componentDidMount() {
    Store.dispatch(iguanaActiveHandle());
    const _iguanaActiveHandle = setInterval(function() {
      Store.dispatch(iguanaActiveHandle());
    }, IGUANA_ACTIVE_HANDLE_TIMEOUT);

    this.setState(Object.assign({}, this.state, {
      activeHandleInterval: _iguanaActiveHandle,
    }));
  }

  componentWillMount() {
    // set userpass param
    Store.dispatch(getDexCoins());
    iguanaSetRPCAuth();
  }

  isWalletUnlocked() {
    return (
      <WalletMain {...this.props} />
    );
  }

  render() {
    return (
      <div>
        { this.isWalletUnlocked() }
      </div>
    );
  }
}

export default Main;
