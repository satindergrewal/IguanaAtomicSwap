import React from 'react';
import {
  secondsToString
} from '../../../util/time';
import { translate } from '../../../translate/translate';

export const NotificationsByTypeRender = function(logItem, type, index) {
  return (
    <div key={ logItem.timestamp }>
      <div>{ index + 1 }.</div>
      <div>
        <strong>Time:</strong> { secondsToString(logItem.timestamp, true, true) }
      </div>
      <div>
        <strong>GUI Function:</strong> { logItem.function }
      </div>
      <div>
        <strong>HTTP:</strong> { logItem.httpMethod.toUpperCase() }
      </div>
      <div>
        <strong>URL:</strong> { logItem.url }
      </div>
      <div>
        <strong>Payload:</strong> { JSON.stringify(logItem.payload, null, '\t') }
      </div>
      <div className={ type !== 'pending' ? '' : 'hide' }>
        <strong>Response:</strong> { JSON.stringify(logItem.response, null, '\t') }
      </div>
      <hr />
    </div>
  );
}

export const NotificationsModalRender = function() {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div className="modal show notifications-modal">
        <div className="modal-dialog modal-center modal-lg">
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              <div className="panel nav-tabs-horizontal">
                <ul className="nav nav-tabs nav-tabs-line">
                  <li className={ this.state.activeTab === 0 ? 'active' : 'pointer' }>
                    <a
                      onClick={ () => this.openTab(0) }>
                      <i className="icon fa fa-thumbs-o-up"></i> Success ({ this.state.calls.success })
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 1 ? 'active' : 'pointer' }>
                    <a
                      onClick={ () => this.openTab(1) }>
                      <i className="icon fa fa-exclamation-triangle"></i> Error ({ this.state.calls.error })
                    </a>
                  </li>
                  <li className={ this.state.activeTab === 2 ? 'active' : 'pointer' }>
                    <a
                      onClick={ () => this.openTab(2) }>
                      <i className="icon fa fa-clock-o"></i> Pending ({ this.state.calls.pending })
                    </a>
                  </li>
                </ul>
                <div className="panel-body panel-body-container">
                  <div className="tab-content">
                    <div
                      className={ this.state.activeTab === 0 ? 'tab-pane active' : 'tab-pane' }>
                      { this.renderNotificationsByType('success') }
                    </div>
                    <div
                      className={ this.state.activeTab === 1 ? 'tab-pane active' : 'tab-pane' }>
                      { this.renderNotificationsByType('error') }
                    </div>
                    <div
                      className={ this.state.activeTab === 2 ? 'tab-pane active' : 'tab-pane' }>
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
};

export const NotificationsRender = function() {
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
};