import React from 'react';
import {
  getCoinTitle,
  getModeInfo
} from '../../../util/coinHelper';
import CoinTileItem from './coinTileItem';

import CoinTileRender from './coinTile.render';

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
    return CoinTileRender.call(this);
  }
}

export default CoinTile;
