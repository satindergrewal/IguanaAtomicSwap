import React from 'react';
import { translate } from '../../translate/translate';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      totalCalls: 0,
      totalErrorCalls: 0,
      totalSuccessCalls: 0,
      totalPendingCalls: 0,
    };
    this.toggleNotificationsModal = this.toggleNotificationsModal.bind(this);
  }

  componentWillReceiveProps(props) {
    // get total number of calls per type
    if (this.props.Dashboard &&
        this.props.Dashboard.guiLog) {
      const _guiLog = this.props.Dashboard.guiLog;
      let totalCalls = Object.keys(_guiLog).length;
      let totalErrorCalls = 0;
      let totalSuccessCalls = 0;
      let totalPendingCalls = 0;

      for (let timestamp in _guiLog) {
        if (_guiLog[timestamp].status === 'error') {
          totalErrorCalls++;
        }
        if (_guiLog[timestamp].status === 'success') {
          totalSuccessCalls++;
        }
        if (_guiLog[timestamp].status === 'pending') {
          totalPendingCalls++;
        }
      }

      this.setState(Object.assign({}, this.state, {
        totalCalls,
        totalErrorCalls,
        totalSuccessCalls,
        totalPendingCalls,
      }));
    }
  }

  toggleNotificationsModal() {

  }

  render() {
    return (
      <div className="notifications-badge" onClick={ this.toggleNotificationsModal }>
        <span className="badge success">{ this.state.totalSuccessCalls }</span>
        <span className="badge error">{ this.state.totalErrorCalls }</span>
        <span className="badge pending">{ this.state.totalPendingCalls }</span>
      </div>
    );
  }
}

export default Notifications;