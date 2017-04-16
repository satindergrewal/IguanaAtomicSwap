import React from 'react';
import { translate } from '../../translate/translate';

class AddCoinOptionsCrypto extends React.Component {
  render() {
    return (
      <optgroup label="Crypto Currencies">
        <option value="ANC|full" data-full-mode="true">AnonCoin (ANC)</option>
        <option value="BTC|full|basilisk">Bitcoin (BTC)</option>
        <option value="BTCD|full">BitcoinDark (BTCD)</option>
        <option value="BTM|full">Bitmark (BTM)</option>
        <option value="CARB|full">Carboncoin (CARB)</option>
        <option value="DGB|full">Digibyte (DGB)</option>
        <option value="DOGE|full">Dogecoin (DOGE)</option>
        <option value="FRK|full">Franko (FRK)</option>
        <option value="GAME|full">Gamecredits (GAME)</option>
        <option value="KMD|basilisk|native">Komodo (KMD)</option>
        <option value="LTC|full">Litecoin (LTC)</option>
        <option value="MZC|full">MazaCoin (MZC)</option>
        <option value="SYS|full">SysCoin (SYS)</option>
        <option value="UNO|full">Unobtanium (UNO)</option>
        <option value="ZEC|full">Zcash (ZEC)</option>
        <option value="ZET|full">Zetacoin (ZET)</option>
      </optgroup>
    );
  }
}

export default AddCoinOptionsCrypto;
