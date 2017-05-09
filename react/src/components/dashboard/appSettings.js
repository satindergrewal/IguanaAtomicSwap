import React from 'react';
import { translate } from '../../translate/translate';
import {

} from '../../actions/actionCreators';
import Store from '../../store';

class AppSettings extends React.Component {
  constructor(props) {
    super(props);
    //this.closeSyncOnlyModal = this.closeSyncOnlyModal.bind(this);
  }

  render() {
    /*if (this.props && this.props.SyncOnly.display) {
      return (
        <div>
          <div className="modal show sync-only-forks" aria-hidden="false" role="dialog">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body" style={{height: '590px'}}>
                  {this.renderForksList()}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.closeSyncOnlyModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show in"></div>
        </div>
      );
    } else {
      return null;
    }*/
  }
}

export default AppSettings;