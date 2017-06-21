import React from 'react';
import { sortByDate } from '../../../util/sort';
import {
  NotificationsByTypeRender,
  NotificationsModalRender,
  NotificationsRender
} from './notifications.render';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      calls: {
        total: 0,
        error: 0,
        success: 0,
        pending: 0,
      },
      activeTab: 2,
      guiLog: null,
    };
    this.toggleNotificationsModal = this.toggleNotificationsModal.bind(this);
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  componentWillReceiveProps(props) {
    // get total number of calls per type
    if (this.props.Dashboard &&
        this.props.Dashboard.guiLog) {
      const _guiLog = this.props.Dashboard.guiLog;
      let _callsLength = {
        total: Object.keys(_guiLog).length,
        error: 0,
        success: 0,
        pending: 0,
      }

      let guiLogToArray = [];

      for (let timestamp in _guiLog) {
        guiLogToArray.push(_guiLog[timestamp]);
        _callsLength[_guiLog[timestamp].status]++;
      }

      this.setState(Object.assign({}, this.state, {
        calls: {
          total: _callsLength.total,
          error: _callsLength.error,
          success: _callsLength.success,
          pending: _callsLength.pending,
        },
        guiLog: guiLogToArray,
      }));
    }
  }

  renderNotificationsByType(type) {
    // get total number of calls per type
    if (this.state.guiLog &&
        this.state.guiLog.length) {
      let _guiLog = this.state.guiLog;
      _guiLog = sortByDate(_guiLog);
      let items = [];

      for (let i = 0; i < _guiLog.length; i++) {
        if (_guiLog[i].status === type) {
          const _logItem = _guiLog[i];

          items.push(
            NotificationsByTypeRender.call(this, _logItem, type, i)
          );
        }
      }

      return items;
    }
  }

  renderNotificationsModal() {
    if (this.state.displayModal) {
      return NotificationsModalRender.call(this);
    }

    return null;
  }

  toggleNotificationsModal() {
    this.setState(Object.assign({}, this.state, {
      displayModal: !this.state.displayModal,
    }));
  }

  render() {
    return NotificationsRender.call(this);
  }
}

export default Notifications;
