import React from 'react';
import { translate } from '../../../translate/translate';

const WalletsBasiliskConnectionRender = function() {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div className="modal show" id="RefreshBasiliskConnectionsMdl">
        <div className="modal-dialog modal-center modal-md">
          <div className="modal-content">
            <div className="modal-header bg-orange-a400 wallet-send-header">
              <h4 className="modal-title white">
                <span className="icon fa-refresh no-margin"></span> { translate('INDEX.REFRESHING_BASILISK_NET') }...
              </h4>
              <button type="button" className="close btn-close" onClick={ this.basiliskConnectionAction }>
                <span>&times;</span>
                <span className="sr-only">{ translate('INDEX.CLOSE') }</span>
              </button>
            </div>
            <div className="modal-body text-align-center">
              <div className="loader-wrapper active">
                <div className="loader-layer loader-blue">
                  <div className="loader-circle-left">
                    <div className="circle"></div>
                  </div>
                  <div className="loader-circle-gap"></div>
                  <div className="loader-circle-right">
                    <div className="circle"></div>
                  </div>
                </div>
                <div className="loader-layer loader-red">
                  <div className="loader-circle-left">
                    <div className="circle"></div>
                  </div>
                  <div className="loader-circle-gap"></div>
                  <div className="loader-circle-right">
                    <div className="circle"></div>
                  </div>
                </div>
                <div className="loader-layer loader-green">
                  <div className="loader-circle-left">
                    <div className="circle"></div>
                  </div>
                  <div className="loader-circle-gap"></div>
                  <div className="loader-circle-right">
                    <div className="circle"></div>
                  </div>
                </div>
                <div className="loader-layer loader-yellow">
                  <div className="loader-circle-left">
                    <div className="circle"></div>
                  </div>
                  <div className="loader-circle-gap"></div>
                  <div className="loader-circle-right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
              <h5 className="text-left">
                { `${translate('IAPI.CON_STATUS')}... ${this.props.Dashboard.connectedNotaries.current}/${this.props.Dashboard.connectedNotaries.total}:${this.props.Dashboard.connectedNotaries.currentNodeName}` } <span className="pull-right" id="basilisk-connections-refresh-percent">{ Math.floor(this.props.Dashboard.connectedNotaries.current * 100 / this.props.Dashboard.connectedNotaries.total) }%</span>
              </h5>
              <div className="progress progress-sm">
                <div className="progress-bar progress-bar-info progress-bar-striped active font-size-80-percent" style={{ width: Math.floor(this.props.Dashboard.connectedNotaries.current * 100 / this.props.Dashboard.connectedNotaries.total) + '%' }} role="progressbar" id="basilisk-connections-refresh-progress-bar"></div>
              </div>
              <pre id="basilisk-connections-refresh-status-output no-padding">
                { this.props.Dashboard.connectedNotaries.failedToConnectNodes ? `Failed: ${this.props.Dashboard.connectedNotaries.failedToConnectNodes}` : null }
                </pre>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};

export default WalletsBasiliskConnectionRender;