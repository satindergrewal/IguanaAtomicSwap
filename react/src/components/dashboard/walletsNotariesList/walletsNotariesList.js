import React from 'react';
import { translate } from '../../../translate/translate';
import { displayNotariesModal } from '../../../actions/actionCreators';
import Store from '../../../store';
import { TreeNode } from 'rc-tree';
import {
  NotariesListRender,
  WalletsNotariesListRender
} from './walletsNotariesList.render';

class WalletsNotariesList extends React.Component {
  constructor(props) {
    super(props);
    this.closeNotariesModal = this.closeNotariesModal.bind(this);
  }

  closeNotariesModal() {
    Store.dispatch(displayNotariesModal(false));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.closeNotariesModal();
    }
  }

  renderNotariesFetching() {
    if (!this.props.ActiveCoin.notaries) {
      return (
        <div>{ translate('INDEX.FETCHING_NOTARIES_LIST') }...</div>
      );
    } else {
      return (
        <div>{ translate('INDEX.TOTAL_NOTARIES') }: { this.props.ActiveCoin.notaries.numnotaries }</div>
      );
    }
  }

  renderNotariesList() {
    if (this.props.ActiveCoin.notaries &&
        this.props.ActiveCoin.notaries.notaries &&
        this.props.ActiveCoin.notaries.notaries.length) {
      return this.props.ActiveCoin.notaries.notaries.map((node, index) =>
        NotariesListRender.call(this, node, index)
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin.mode === 'basilisk' &&
        this.props.ActiveCoin.displayNotariesModal) {
      return WalletsNotariesListRender.call(this);
    }

    return null;
  }
}

export default WalletsNotariesList;
