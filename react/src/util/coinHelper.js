export function getCoinTitle(coin) {
  let coinlogo,
      coinname;

  switch (coin) {
    case 'BTC':
      coinlogo = 'bitcoin';
      coinname = 'Bitcoin';
      break;
    case 'BTCD':
      coinlogo = 'bitcoindark';
      coinname = 'BitcoinDark';
      break;
    case 'LTC':
      coinlogo = 'litecoin';
      coinname = 'Litecoin';
      break;
    case 'VPN':
      coinlogo = 'vpncoin';
      coinname = 'VPNcoin';
      break;
    case 'SYS':
      coinlogo = 'syscoin';
      coinname = 'Syscoin';
      break;
    case 'ZEC':
      coinlogo = 'zcash';
      coinname = 'Zcash';
      break;
    case 'NMC':
      coinlogo = 'namecoin';
      coinname = 'Namecoin';
      break;
    case 'DEX':
      coinlogo = 'dex';
      coinname = 'InstantDEX';
      break;
    case 'DOGE':
      coinlogo = 'dogecoin';
      coinname = 'Dogecoin';
      break;
    case 'DGB':
      coinlogo = 'digibyte';
      coinname = 'Digibyte';
      break;
    case 'MZC':
      coinlogo = 'mazacoin';
      coinname = 'Mazacoin';
      break;
    case 'UNO':
      coinlogo = 'unobtanium';
      coinname = 'Unobtanium';
      break;
    case 'ZET':
      coinlogo = 'zetacoin';
      coinname = 'Zetacoin';
      break;
    case 'KMD':
      coinlogo = 'komodo';
      coinname = 'Komodo';
      break;
    case 'BTM':
      coinlogo = 'bitmark';
      coinname = 'Bitmark';
      break;
    case 'CARB':
      coinlogo = 'carboncoin';
      coinname = 'Carboncoin';
      break;
    case 'ANC':
      coinlogo = 'anoncoin';
      coinname = 'AnonCoin';
      break;
    case 'FRK':
      coinlogo = 'franko';
      coinname = 'Franko';
      break;
    case 'GAME':
      coinlogo = 'GAME';
      coinname = 'GameCredits';
      break;
    case 'SUPERNET':
      coinlogo = 'SUPERNET';
      coinname = 'SUPERNET';
      break;
    case 'REVS':
      coinlogo = 'REVS';
      coinname = 'REVS';
      break;
    case 'WLC':
      coinlogo = 'WLC';
      coinname = 'WIRELESS';
      break;
    case 'PANGEA':
      coinlogo = 'PANGEA';
      coinname = 'PANGEA';
      break;
    case 'JUMBLR':
      coinlogo = 'JUMBLR';
      coinname = 'JUMBLR';
      break;
    case 'BET':
      coinlogo = 'BET';
      coinname = 'BET';
      break;
    case 'CRYPTO':
      coinlogo = 'CRYPTO';
      coinname = 'CRYPTO';
      break;
    case 'HODL':
      coinlogo = 'HODL';
      coinname = 'HODL';
      break;
    case 'SHARK':
      coinlogo = 'SHARK';
      coinname = 'SHARK';
      break;
    case 'BOTS':
      coinlogo = 'BOTS';
      coinname = 'BOTS';
      break;
    case 'MGW':
      coinlogo = 'MGW';
      coinname = 'MultiGateway';
      break;
    case 'MVP':
      coinlogo = 'MVP';
      coinname = 'MVP Lineup';
      break;
    case 'KV':
      coinlogo = 'KV';
      coinname = 'KV';
      break;
    case 'CEAL':
      coinlogo = 'CEAL';
      coinname = 'CEAL NET';
      break;
    case 'MESH':
      coinlogo = 'MESH';
      coinname = 'SpaceMesh';
      break;
    case 'USD':
      coinlogo = 'usd';
      coinname = 'US Dollar';
      break;
    case 'RON':
      coinlogo = 'RON';
      coinname = 'Romanian Leu';
      break;
    case 'EUR':
      coinlogo = 'EUR';
      coinname = 'Euro';
      break;
    case 'JPY':
      coinlogo = 'JPY';
      coinname = 'Japanese Yen';
      break;
    case 'GBP':
      coinlogo = 'GBP';
      coinname = 'British Pound';
      break;
    case 'AUD':
      coinlogo = 'AUD';
      coinname = 'Australian Dollar';
      break;
    case 'CAD':
      coinlogo = 'CAD';
      coinname = 'Canadian Dollar';
      break;
    case 'CHF':
      coinlogo = 'CHF';
      coinname = 'Swiss Franc';
      break;
    case 'NZD':
      coinlogo = 'NZD';
      coinname = 'New Zealand Dollar';
      break;
    case 'CNY':
      coinlogo = 'CNY';
      coinname = 'Chinese Yuan';
      break;
    case 'RUB':
      coinlogo = 'RUB';
      coinname = 'Russian Ruble';
      break;
    case 'MXN':
      coinlogo = 'MXN';
      coinname = 'Mexican peso';
      break;
    case 'BRL':
      coinlogo = 'BRL';
      coinname = 'Brazilian Real';
      break;
    case 'INR':
      coinlogo = 'INR';
      coinname = 'Indian Rupee';
      break;
    case 'HKD':
      coinlogo = 'HKD';
      coinname = 'Hong Kong Dollar';
      break;
    case 'TRY':
      coinlogo = 'TRY';
      coinname = 'Turkish Lira';
      break;
    case 'ZAR':
      coinlogo = 'ZAR';
      coinname = 'South African Rand';
      break;
    case 'PLN':
      coinlogo = 'PLN';
      coinname = 'Polish Zloty';
      break;
    case 'NOK':
      coinlogo = 'NOK';
      coinname = 'Norwegian Krone';
      break;
    case 'SEK':
      coinlogo = 'SEK';
      coinname = 'Swedish Krona';
      break;
    case 'DKK':
      coinlogo = 'DKK';
      coinname = 'Danish Krone';
      break;
    case 'CZK':
      coinlogo = 'CZK';
      coinname = 'Czech Koruna';
      break;
    case 'HUF':
      coinlogo = 'HUF';
      coinname = 'Hungarian Forint';
      break;
    case 'ILS':
      coinlogo = 'ILS';
      coinname = 'Israeli Shekel';
      break;
    case 'KRW':
      coinlogo = 'KRW';
      coinname = 'Korean Won';
      break;
    case 'MYR':
      coinlogo = 'MYR';
      coinname = 'Malaysian Ringgit';
      break;
    case 'PHP':
      coinlogo = 'PHP';
      coinname = 'Philippine Peso';
      break;
    case 'SGD':
      coinlogo = 'SGD';
      coinname = 'Singapore Dollar';
      break;
    case 'THB':
      coinlogo = 'THB';
      coinname = 'Thai Baht';
      break;
    case 'BGN':
      coinlogo = 'BGN';
      coinname = 'Bulgarian Lev';
      break;
    case 'IDR':
      coinlogo = 'IDR';
      coinname = 'Indonesian Rupiah';
      break;
    case 'HRK':
      coinlogo = 'HRK';
      coinname = 'Croatian Kuna';
      break;
  }

  return {
    'logo': coinlogo,
    'name': coinname
  };
}

export function getModeInfo(mode) {
  let modecode,
      modetip,
      modecolor;

  switch (mode) {
    case 'native':
      modecode = 'Native';
      modetip = 'Native';
      modecolor = 'primary';
      break;
    case 'basilisk':
      modecode = 'Basilisk';
      modetip = 'Basilisk';
      modecolor = 'info';
      break;
    case 'full':
      modecode = 'Full';
      modetip = 'Full';
      modecolor = 'success';
      break;
    case 'virtual':
      modecode = 'Virtual';
      modetip = 'Virtual';
      modecolor = 'danger';
      break;
    case 'notarychains':
      modecode = 'Notarychains';
      modetip = 'Notarychains';
      modecolor = 'dark';
      break;
  }

  return {
    'code': modecode,
    'tip': modetip,
    'color': modecolor
  };
}