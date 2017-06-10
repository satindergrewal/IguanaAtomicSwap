import React from 'react';

const CoinTileItemRender = function() {
  const { item } = this.props;

  return (
    <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info pointer">
      <div className={ this.props.ActiveCoin.coin === item.coin ? 'widget widget-shadow active' : 'widget widget-shadow' }>
        <div
          className="widget-content text-center bg-white padding-20"
          onClick={ () => this.dashboardChangeActiveCoin(item.coin, item.mode) }>
          <a className="avatar margin-bottom-5">
            <img
              className="img-responsive"
              src={ `assets/images/cryptologo/${item.coinlogo}.png` }
              alt={ item.coinname }/>
            <span className={ `badge up badge-${item.modecolor}` }>{ item.modecode }</span>
          </a>
          <div className="coin-name">{ item.coinname } ({ item.coinlogo.toUpperCase() })</div>
        </div>
      </div>
    </div>
  );
};

export default CoinTileItemRender;