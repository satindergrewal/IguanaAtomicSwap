import React from 'react';
import Toaster from '../toaster/toaster';
import AddCoin from '../addcoin/addcoin';
import Login from '../login/login';

class WalletMain extends React.Component {
  render() {
    return (
      <div>
        <AddCoin {...this.props.AddCoin} />
        <Login {...this.props} />
        <Toaster {...this.props.toaster} />
      </div>
    );
  }
}
//{ React.cloneElement(this.props.children, this.props) }

export default WalletMain;
