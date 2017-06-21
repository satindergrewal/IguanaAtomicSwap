import React from 'react';
import { translate } from '../../translate/translate';

class AddCoinOptionsACFiat extends React.Component {
  render() {
    return (
      <optgroup label="Fiat Currencies">
        <option value="AUD|basilisk|native">Australian Dollar (AUD)</option>
        <option value="BRL|basilisk|native">Brazilian Real (BRL)</option>
        <option value="GBP|basilisk|native">British Pound (GBP)</option>
        <option value="BGN|basilisk|native">Bulgarian Lev (BGN)</option>
        <option value="CAD|basilisk|native">Canadian Dollar (CAD)</option>
        <option value="HRK|basilisk|native">Croatian Kuna (HRK)</option>
        <option value="CZK|basilisk|native">Czech Koruna (CZK)</option>
        <option value="CNY|basilisk|native">Chinese Yuan (CNY)</option>
        <option value="DKK|basilisk|native">Danish Krone (DKK)</option>
        <option value="EUR|basilisk|native">Euro (EUR)</option>
        <option value="HKD|basilisk|native">Hong Kong Dollar (HKD)</option>
        <option value="HUF|basilisk|native">Hungarian Forint (HUF)</option>
        <option value="INR|basilisk|native">Indian Rupee (INR)</option>
        <option value="IDR|basilisk|native">Indonesian Rupiah (IDR)</option>
        <option value="ILS|basilisk|native">Israeli Shekel (ILS)</option>
        <option value="JPY|basilisk|native">Japanese Yen (JPY)</option>
        <option value="KRW|basilisk|native">Korean Won (KRW)</option>
        <option value="MYR|basilisk|native">Malaysian Ringgit (MYR)</option>
        <option value="MXN|basilisk|native">Mexican peso (MXN)</option>
        <option value="NZD|basilisk|native">New Zealand Dollar (NZD)</option>
        <option value="NOK|basilisk|native">Norwegian Krone (NOK)</option>
        <option value="PHP|basilisk|native">Philippine Peso (PHP)</option>
        <option value="PLN|basilisk|native">Polish Zloty (PLN)</option>
        <option value="RON|basilisk|native">Romanian Leu (RON)</option>
        <option value="RUB|basilisk|native">Russian Ruble (RUB)</option>
        <option value="SGD|basilisk|native">Singapore Dollar (SGD)</option>
        <option value="ZAR|basilisk|native">South African Rand (ZAR)</option>
        <option value="SEK|basilisk|native">Swedish Krona (SEK)</option>
        <option value="CHF|basilisk|native">Swiss Franc (CHF)</option>
        <option value="THB|basilisk|native">Thai Baht (THB)</option>
        <option value="TRY|basilisk|native">Turkish Lira (TRY)</option>
        <option value="USD|basilisk|native">US Dollar (USD)</option>
      </optgroup>
    );
  }
}

export default AddCoinOptionsACFiat;
