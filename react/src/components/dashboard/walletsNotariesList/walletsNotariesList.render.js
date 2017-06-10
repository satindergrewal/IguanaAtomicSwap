import React from 'react';
import { translate } from '../../../translate/translate';
import Tree, { TreeNode } from 'rc-tree';
import { animation } from '../../../util/rc-tree-animate';

export const NotariesListRender = function (node, index) {
  <TreeNode title={ `Node ${index}` } key={ `node-${index}` }>
    <TreeNode key={ `node-${index}-btc` } title={ `BTC: ${node.BTCaddress}` } />
    <TreeNode key={ `node-${index}-kmd` } title={ `KMD: ${node.KMDaddress}` } />
    <TreeNode key={ `node-${index}-pubkey` } title={ `Pubkey: ${node.pubkey}` } />
  </TreeNode>
};

export const WalletsNotariesListRender = function () {
  return (
    <div onKeyDown={ (event) => this.handleKeydown(event) }>
      <div className="modal show" id="kmd_txid_info_mdl">
        <div className="modal-dialog modal-center modal-lg">
          <div className="modal-content">
            <div className="modal-body modal-body-container">
              <div className="panel nav-tabs-horizontal">
                <div className="panel-body">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      { this.renderNotariesFetching() }
                      <Tree defaultExpandAll={ false } openAnimation={ animation }>
                        { this.renderNotariesList() }
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
                onClick={ this.closeNotariesModal }>{ translate('INDEX.CLOSE') }</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show in"></div>
    </div>
  );
};