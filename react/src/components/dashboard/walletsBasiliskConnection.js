import React from 'react';
import { translate } from '../../translate/translate';

class WalletsBasiliskConnection extends React.Component {
  render() {
    if (this.props && this.props.Dashboard.basiliskConnection) {
      return (
        <div>
          <div className="modal show" id="RefreshBasiliskConnectionsMdl" aria-hidden="false" role="dialog">
            <div className="modal-dialog modal-center modal-md">
              <div className="modal-content">
                <div className="modal-header bg-orange-a400 wallet-send-header" style={{borderRadius: '3px 3px 0 0'}}>
                  <h4 className="modal-title white">
                    <span className="icon fa-refresh" style={{margin: '0'}}></span> {translate('INDEX.REFRESHING_BASILISK_NET')}... <span id="mdl_receive_coin_name"></span>
                  </h4>
                </div>
                <div className="modal-body" style={{textAlign: 'center'}}>
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
                    <span id="basilisk-connections-refresh-title">-</span> <span className="pull-right" id="basilisk-connections-refresh-percent">-</span>
                  </h5>
                  <div className="progress progress-sm">
                    <div className="progress-bar progress-bar-info progress-bar-striped active" style={{width: '10%', fontSize: '80%'}} role="progressbar" data-edexcoin="COIN" id="basilisk-connections-refresh-progress-bar"></div>
                  </div>
                  <pre data-edexcoin="COIN" id="basilisk-connections-refresh-status-output"></pre>
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
}

export default WalletsBasiliskConnection;
