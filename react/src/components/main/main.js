import React from 'react';
import Config from '../../config';
import WalletMain from './walletMain';
import { iguanaSetRPCAuth } from '../../util/auth';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
    this.isWalletUnlocked = this.isWalletUnlocked.bind(this);
    this.state = {
      user: false,
    };
  }

  componentWillMount() {
    console.log('mounting main component');
    // set userpass param
    iguanaSetRPCAuth();
    if (sessionStorage.getItem('session')) {
      this.setState({
        user: JSON.parse(sessionStorage.getItem('')),
      });
    }
  }

  error(response) {
    console.error(response);
  }

  loading() {
    console.log('loading');
  }

  success(response) {
    sessionStorage.setItem('session', JSON.stringify(''));
    this.setState({
      user: JSON.parse(sessionStorage.getItem('session')),
    });
  }

  isWalletUnlocked() {
    /*if (!this.state.seed) {
      return (<div>add coin form</div>);
    }*/
    return (
      <WalletMain {...this.props} />
    );
  }

  render() {
    return (
      <div>
        {this.isWalletUnlocked()}
      </div>
    );
  }
}

export default Main;
