import React from 'react';
import { translate } from '../../translate/translate';
import {
  getCoinTitle,
  getModeInfo
} from '../../util/coinHelper';
import CoinTileItem from './coinTileItem';

class CoinTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderTiles = this.renderTiles.bind(this);
  }

  renderTiles() {
    const modes = [
      'native',
      'basilisk',
      'full'
    ];
    const allCoins = this.props.Main.coins;
    let items = [];

    if (this.props.Main &&
        allCoins) {
      modes.map(function(mode) {
        allCoins[mode].map(function(coin) {
          const _coinMode = getModeInfo(mode),
                modecode = _coinMode.code,
                modetip = _coinMode.tip,
                modecolor = _coinMode.color;

          const _coinTitle = getCoinTitle(coin),
                coinlogo = _coinTitle.logo,
                coinname = _coinTitle.name;

          items.push({
            coinlogo,
            coinname,
            coin,
            mode,
            modecolor,
            modetip,
            modecode,
          });
        });
      });
    }

    return (
      items.map((item, i) =>
        <CoinTileItem key={ i } i={ i } item={ item } {...this.props} />)
    );
  }

  render() {
    return (
      <div className="page-aside padding-top-80">
        <div className="page-aside-switch">
          <i className="icon md-chevron-left" aria-hidden="true"></i>
          <i className="icon md-chevron-right" aria-hidden="true"></i>
        </div>
        <div className="page-aside-inner">
          <div className="search-wallet-widgets panel display-none">
            <div className="panel-heading">
              <div className="panel-actions">
                <div className="input-search input-group-sm">
                  <button type="submit" className="input-search-btn">
                    <i className="icon md-search" aria-hidden="true"></i>
                  </button>
                  <input type="text" className="form-control" name="" placeholder="Search..." disabled />
                </div>
              </div>
              <h3 className="panel-title">{ translate('INDEX.ACTIVE_COINS') }</h3>
            </div>
          </div>
          <div className="wallet-widgets-list">
            <div data-role="container">
              <div data-role="content">
                <div className="list-group row wallet-widgets-row">
                  { this.renderTiles() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinTile;
