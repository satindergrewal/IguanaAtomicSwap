import React from 'react';
import { translate } from '../../translate/translate';

class AddCoinOptionsAC extends React.Component {
  render() {
    return (
      <optgroup label="Assetchains">
        <option value="BET|basilisk|native">BET (BET)</option>
        <option value="BOTS|basilisk|native">BOTS (BOTS)</option>
        <option value="CEAL|basilisk|native">CEAL NET (CEAL)</option>
        <option value="CRYPTO|basilisk|native">CRYPTO (CRYPTO)</option>
        <option value="HOD|basilisk|native">HODL (HODL)</option>
        <option value="DEX|basilisk|native">InstantDEX (DEX)</option>
        <option value="JUMBLR|basilisk|native">JUMBLR (JUMBLR)</option>
        <option value="KV|basilisk|native">KV (KV)</option>
        <option value="MGW|basilisk|native">MultiGateway (MGW)</option>
        <option value="MVP|basilisk|native">MVP Lineup (MVP)</option>
        <option value="PANGEA|basilisk|native">PANGEA (PANGEA)</option>
        <option value="REVS|basilisk|native">REVS (REVS)</option>
        <option value="SHARK|basilisk|native">SHARK (SHARK)</option>
        <option value="MESH|basilisk|native">SpaceMesh (MESH)</option>
        <option value="SUPERNET|basilisk|native">SUPERNET (SUPERNET)</option>
        <option value="WLC|basilisk|native">WIRELESS (WIRELESS)</option>
      </optgroup>
    );
  }
}

export default AddCoinOptionsAC;
