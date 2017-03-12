templates.addCoinModal =
`
<!-- Modal -->
<div class="modal fade modal-3d-sign" id="AddCoinDilogModel" aria-hidden="true" aria-labelledby="AddCoinDilogModel" role="dialog" tabindex="-1">
	<div class="modal-dialog modal-center modal-lg">
	  <div class="modal-content">
	    <div class="modal-header bg-orange-a400 wallet-send-header">
	      <button type="button" class="close white" data-dismiss="modal" aria-label="Close">
	        <span aria-hidden="true">×</span>
	      </button>
	      <h4 class="modal-title white" data-lang="INDEX.SELECT_A_COIN"></h4>
	    </div>
	    <div class="modal-body">
	      <div class="col-sm-8">
	        <div class="form-group">
	          <select class="form-control form-material" id="addcoin_select_coin_mdl_options">
	            <option data-lang="INDEX.SELECT"></option>
                    <option value="ANC">AnonCoin</option> 
                    <option value="BTC">Bitcoin</option>
                    <option value="BTCD">BitcoinDark</option>
                    <option value="BTM">Bitmark</option>
                    <option value="CARB">Carboncoin</option>
                    <option value="DGB">Digibyte</option>
                    <option value="DOGE">Dogecoin</option>
                    <option value="FRK">Franko</option>
                    <option value="KMD">Komodo</option>
                    <option value="LTC">Litecoin</option>
                    <option value="MZC">MazaCoin</option>
                    <option value="SYS">SysCoin</option>
                    <option value="UNO">Unobtanium</option>
                    <option value="ZEC">Zcash</option>
                    <option value="ZET">Zetacoin</option>
                    <option value="BET">BET</option>
                    <option value="BOTS">BOTS</option>
                    <option value="CEAL">CEAL NET</option>
                    <option value="CRYPTO">CRYPTO</option>
                    <option value="HODL">HODL</option>
                    <option value="DEX">InstantDEX</option>
                    <option value="JUMBLR">JUMBLR</option>
                    <option value="KV">KV</option>
                    <option value="MGW">MultiGateway</option>
                    <option value="MVP">MVP Lineup</option>
                    <option value="PANGEA">PANGEA</option>
                    <option value="REVS">REVS</option>
                    <option value="SHARK">SHARK</option>
                    <option value="MESH">SpaceMesh</option>
                    <option value="SUPERNET">SUPERNET</option>
                    <option value="WIRELESS">WIRELESS</option>
                    <option value="AUD">Australian Dollar</option>
                    <option value="BRL">Brazilian Real</option>
                    <option value="GBP">British Pound</option>
                    <option value="BGN">Bulgarian Lev</option>
                    <option value="CAD">Canadian Dollar</option>
                    <option value="HRK">Croatian Kuna</option>
                    <option value="CZK">Czech Koruna</option>
                    <option value="CNY">Chinese Yuan</option>
                    <option value="DKK">Danish Krone</option>
                    <option value="EUR">Euro</option>
                    <option value="HKD">Hong Kong Dollar</option>
                    <option value="HUF">Hungarian Forint</option>
                    <option value="INR">Indian Rupee</option>
                    <option value="IDR">Indonesian Rupiah</option>
                    <option value="ILS">Israeli Shekel</option>
                    <option value="JPY">Japanese Yen</option>
                    <option value="KRW">Korean Won</option>
                    <option value="MYR">Malaysian Ringgit</option>
                    <option value="MXN">Mexican peso</option>
                    <option value="NZD">New Zealand Dollar</option>
                    <option value="NOK">Norwegian Krone</option>
                    <option value="PHP">Philippine Peso</option>
                    <option value="PLN">Polish Zloty</option>
                    <option value="RON">Romanian Leu</option>
                    <option value="RUB">Russian Ruble</option>
                    <option value="SGD">Singapore Dollar</option>
                    <option value="ZAR">South African Rand</option>
                    <option value="SEK">Swedish Krona</option>
                    <option value="CHF">Swiss Franc</option>
                    <option value="THB">Thai Baht</option>
                    <option value="TRY">Turkish Lira</option>
                    <option value="USD">US Dollar</option>
	          </select>
	        </div>
	      </div>
	      <div class="col-sm-4" style="text-align: center">
	        <button type="button" class="btn btn-primary mdl_addcoin_done_btn" data-toggle="modal" data-dismiss="modal" id="mdl_addcoin_done_btn" data-lang="INDEX.ACTIVATE_COIN"></button>
	      </div>
	      <div class="col-sm-12" style="text-align: center">
	        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl">
	          <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl" data-plugin="labelauty" id="addcoin_mdl_full_mode" data-labelauty="Full Mode|Full Mode" value="1" checked>
	        </div>
	        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-6 style-addcoin-lbl-mdl">
	          <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl" data-plugin="labelauty" id="addcoin_mdl_basilisk_mode" value="0" data-labelauty="Basilisk Mode|Basilisk Mode">
	        </div>
	        <div class="form-group col-lg-4 col-md-4 col-sm-12 col-xs-12 style-addcoin-lbl-mdl">
	          <input type="radio" class="to-labelauty labelauty" name="addcoin_select_mode_mdl" data-plugin="labelauty" id="addcoin_mdl_native_mode" value="-1" data-labelauty="Native Mode|Native Mode">
	        </div>
	      </div>
	      <div class="col-sm-12" style="color: #333">
	        <p>
	          <strong><span data-lang="INDEX.FULL_MODE"></span>:</strong> <span data-lang="INDEX.FULL_MODE_DESC"></span>
	        </p>
	        <p>
	          <strong><span data-lang="INDEX.BASILISK_MODE"></span>:</strong> <span data-lang="INDEX.BASILISK_MODE_DESC"></span>
	        </p>
	        <p>
	          <strong><span data-lang="INDEX.NATIVE_MODE"></span>:</strong> <span data-lang="INDEX.NATIVE_MODE_DESC1"></span> <strong>Komodo Daemon</strong> <span data-lang="INDEX.NATIVE_MODE_DESC2"></span> <i>Iguana Daemon</i> <span data-lang="INDEX.NATIVE_MODE_DESC3"></span>.
	        </p>
	        <div class="alert alert-icon alert-primary" role="alert">
	          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
	          <i class="icon md-info-outline" aria-hidden="true"></i> <strong data-lang="INDEX.NATIVE_MODE"></strong> <span data-lang="INDEX.NATIVE_MODE_DESC4"></span> <strong data-lang="INDEX.NATIVE_MODE_DESC5"></strong>, <i data-lang="INDEX.NATIVE_MODE_DESC5"></i>.
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
</div>
<!-- End Modal -->
<!--<button type="button" class="btn btn-info btn-lg btn-block waves-effect waves-light" data-target="#AddCoinDilogModel" data-toggle="modal">Activate Coin</button>-->
`;
