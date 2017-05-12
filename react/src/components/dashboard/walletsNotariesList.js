import React from 'react';
import { translate } from '../../translate/translate';
import { displayNotariesModal } from '../../actions/actionCreators';
import Store from '../../store';
import Tree, { TreeNode } from 'rc-tree';
import { animation } from '../../util/rc-tree-animate';

class WalletsNotariesList extends React.Component {
  constructor(props) {
    super(props);
    this.closeNotariesModal = this.closeNotariesModal.bind(this);
  }

  closeNotariesModal() {
    Store.dispatch(displayNotariesModal(false));
  }

  renderNotariesFetching() {
    if (!this.props.ActiveCoin.notaries) {
      return (
        <div>{translate('INDEX.FETCHING_NOTARIES_LIST')}...</div>
      );
    } else {
      return (
        <div>{translate('INDEX.TOTAL_NOTARIES')}: {this.props.ActiveCoin.notaries.numnotaries}</div>
      );
    }
  }

  renderNotariesList() {
    if (this.props.ActiveCoin.notaries &&
        this.props.ActiveCoin.notaries.notaries &&
        this.props.ActiveCoin.notaries.notaries.length) {
      return this.props.ActiveCoin.notaries.notaries.map((node, index) =>
        <TreeNode title={`Node ${index}`} key={`node-${index}`}>
          <TreeNode key={`node-${index}-btc`} title={`BTC: ${node.BTCaddress}`} />
          <TreeNode key={`node-${index}-kmd`} title={`KMD: ${node.KMDaddress}`} />
          <TreeNode key={`node-${index}-pubkey`} title={`Pubkey: ${node.pubkey}`} />
        </TreeNode>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props && this.props.ActiveCoin.mode === 'basilisk' && this.props.ActiveCoin.displayNotariesModal) {
      const notariesData = this.props.ActiveCoin.notaries ? this.props.ActiveCoin.notaries.notaries : null;

      return (
        <div>
          <div className="modal show" id="kmd_txid_info_mdl" aria-hidden="false" role="dialog">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body" style={{height: '590px'}}>
                  <div className="panel nav-tabs-horizontal">
                    <div className="panel-body">
                      <div className="tab-content">
                        <div className="tab-pane active" role="tabpanel">
                          {this.renderNotariesFetching()}
                          <Tree defaultExpandAll={false} openAnimation={animation}>
                          {this.renderNotariesList()}
                          </Tree>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.closeNotariesModal}>{translate('INDEX.CLOSE')}</button>
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

export default WalletsNotariesList;
