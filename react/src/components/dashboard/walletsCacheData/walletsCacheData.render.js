import React from 'react';
import { translate } from '../../../translate/translate';
import { animation } from '../../../util/rc-tree-animate';
import { TreeNode } from 'rc-tree';

const WalletsCacheDataRender = function() {
  return (
    <div>
      <div className="modal show">
        <div className="modal-dialog modal-center modal-lg">
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              <div className="panel nav-tabs-horizontal">
                <div className="panel-body">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      { this.renderNotariesFetching() }
                      <Tree defaultExpandAll={ false } openAnimation={ animation }>
                        { this.renderCoinRootNodes() }
                      </Tree>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.closeViewCacheModal }>{ translate('INDEX.CLOSE') }</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};

export default WalletsCacheDataRender;