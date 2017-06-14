import React from 'react';
import { toggleDashboardTxInfoModal } from '../../../actions/actionCreators';
import Store from '../../../store';

class WalletsNativeTxInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTxInfoModal = this.toggleTxInfoModal.bind(this);
  }

  toggleTxInfoModal() {
    Store.dispatch(toggleDashboardTxInfoModal(false));
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.toggleTxInfoModal();
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin.showTransactionInfo &&
        this.props.ActiveCoin.nativeActiveSection === 'default' &&
        this.props.ActiveCoin.mode === 'native') {
      const txInfo = this.props.ActiveCoin.txhistory[this.props.ActiveCoin.showTransactionInfoTxIndex];

      return WalletsNativeTxInfoRender.call(this, txInfo);
    } else {
      return null;
    }
  }
}

export default WalletsNativeTxInfo;
