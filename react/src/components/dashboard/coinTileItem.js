import React from 'react';
import { translate } from '../../translate/translate';
import { dashboardChangeSection, toggleAddcoinModal } from '../../actions/actionCreators';
import Store from '../../store';

class CoinTileItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="{item.coin}">
        <div className="widget widget-shadow">
          <div className="widget-content text-center bg-white padding-20 edexcoin-logo" data-edexcoincode="{item.coin}" data-edexcoinmodecode="{item.modecode}" data-edexcoinname="{item.coinname}" onClick={this.switchActiveCoin}>
            <a className="avatar margin-bottom-5" href="javascript:void(0)" id="edexcoin-logo">
              <img className="img-responsive" src={'assets/images/cryptologo/' + item.coinlogo + '.png'} alt="{item.coinname}"/>
              <span className="badge up badge-{item.modecolor}" id="basfull" data-edexcoincode="{item.coin}" data-toggle="tooltip" data-placement="top" data-original-title="{item.modetip}">{item.modecode}</span>
            </a>
            <div className="coin-name">{item.coinname} ({item.coinlogo})</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinTileItem;
