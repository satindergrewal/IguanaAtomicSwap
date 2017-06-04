import React from 'react';
import {
  checkTimestamp,
  secondsElapsedToString,
  secondsToString
} from '../../util/time';
import { sortByDate } from '../../util/sort';
import { translate } from '../../translate/translate';

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
            <div key={ _logItem.timestamp }>
              <div>{ i + 1 }.</div>
              <div>
                <strong>Time:</strong> { secondsToString(_logItem.timestamp, true, true) }
              </div>
              <div>
                <strong>GUI Function:</strong> { _logItem.function }
              </div>
              <div>
                <strong>HTTP:</strong> { _logItem.httpMethod.toUpperCase() }
              </div>
              <div>
                <strong>URL:</strong> { _logItem.url }
              </div>
              <div>
                <strong>Payload:</strong> { JSON.stringify(_logItem.payload, null, '\t') }
              </div>
              <div className={ type !== 'pending' ? '' : 'hide' }>
                <strong>Response:</strong> { JSON.stringify(_logItem.response, null, '\t') }
              </div>
              <hr />
            </div>
          );
        }
      }

      return items;
    }
  }

  renderNotificationsModal() {
    if (this.state.displayModal) {
      return (
        <div onKeyDown={ (event) => this.handleKeydown(event) }>
          <div className="modal show notifications-modal">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body modal-body-container">
                  <div className="panel nav-tabs-horizontal">
                    <ul className="nav nav-tabs nav-tabs-line">
                      <li className={ this.state.activeTab === 0 ? 'active' : 'pointer' }>
                        <a onClick={ () => this.openTab(0) }>
                          <i className="icon fa fa-thumbs-o-up"></i> Success ({ this.state.calls.success })
                        </a>
                      </li>
                      <li className={ this.state.activeTab === 1 ? 'active' : 'pointer' }>
                        <a onClick={ () => this.openTab(1) }>
                          <i className="icon fa fa-exclamation-triangle"></i> Error ({ this.state.calls.error })
                        </a>
                      </li>
                      <li className={ this.state.activeTab === 2 ? 'active' : 'pointer' }>
                        <a onClick={ () => this.openTab(2) }>
                          <i className="icon fa fa-clock-o"></i> Pending ({ this.state.calls.pending })
                        </a>
                      </li>
                    </ul>
                    <div className="panel-body panel-body-container">
                      <div className="tab-content">
                        <div className={ this.state.activeTab === 0 ? 'tab-pane active' : 'tab-pane' }>
                          { this.renderNotificationsByType('success') }
                        </div>
                        <div className={ this.state.activeTab === 1 ? 'tab-pane active' : 'tab-pane' }>
                          { this.renderNotificationsByType('error') }
                        </div>
                        <div className={ this.state.activeTab === 2 ? 'tab-pane active' : 'tab-pane' }>
                          { this.renderNotificationsByType('pending') }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={ this.toggleNotificationsModal }>{ translate('INDEX.CLOSE') }</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show in"></div>
        </div>
      );
    } else {
      return null;
    }
  }

  toggleNotificationsModal() {
    this.setState(Object.assign({}, this.state, {
      displayModal: !this.state.displayModal,
    }));
  }

  render() {
    return (
      <div>
        <div
          className={ this.props.Dashboard.activeHandle && this.props.Dashboard.activeHandle.status === 'unlocked' ? 'notifications-badge stick-to-top' : 'notifications-badge' }
          onClick={ this.toggleNotificationsModal }>
          <span className="badge success">{ this.state.calls.success }</span>
          <span className="badge error">{ this.state.calls.error }</span>
          <span className="badge pending">{ this.state.calls.pending }</span>
          <div className={ this.state.calls.pending === 0 ? 'spinner spinner-hide' : 'spinner' }>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
        { this.renderNotificationsModal() }
      </div>
    );
  }
}

export default Notifications;
