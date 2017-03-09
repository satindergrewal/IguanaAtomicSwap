templates.refreshBasiliskConnectionsModal = 
`
<!-- START ADD COIN DIV -->
<div>
	<!-- Modal -->
	<div class="modal fade modal-3d-sign" id="RefreshBasiliskConnectionsMdl" aria-hidden="false" role="dialog"
	tabindex="-1">
		<div class="modal-dialog modal-center modal-md">
		  <div class="modal-content">
		    <div class="modal-header bg-orange-a400 wallet-send-header" style="border-radius: 3px 3px 0 0">
		      <h4 class="modal-title white">
		      	<span class="icon fa-refresh" style="margin: 0"></span> <span data-lang="INDEX.REFRESHING_BASILISK_NET"></span>... <span id="mdl_receive_coin_name"></span>
		      </h4>
		      <!--<span class="white">This is your default Iguana wallet address.</span>-->
		    </div>
		    <div class="modal-body" style="text-align: center">
		      <div class="loader-wrapper active" style="display: none">
		        <div class="loader-layer loader-blue">
		          <div class="loader-circle-left">
		            <div class="circle"></div>
		          </div>
		          <div class="loader-circle-gap"></div>
		          <div class="loader-circle-right">
		            <div class="circle"></div>
		          </div>
		        </div>
		        <div class="loader-layer loader-red">
		          <div class="loader-circle-left">
		            <div class="circle"></div>
		          </div>
		          <div class="loader-circle-gap"></div>
		          <div class="loader-circle-right">
		            <div class="circle"></div>
		          </div>
		        </div>
		        <div class="loader-layer loader-green">
		          <div class="loader-circle-left">
		            <div class="circle"></div>
		          </div>
		          <div class="loader-circle-gap"></div>
		          <div class="loader-circle-right">
		            <div class="circle"></div>
		          </div>
		        </div>
		        <div class="loader-layer loader-yellow">
		          <div class="loader-circle-left">
		            <div class="circle"></div>
		          </div>
		          <div class="loader-circle-gap"></div>
		          <div class="loader-circle-right">
		            <div class="circle"></div>
		          </div>
		        </div>
		      </div>
		      <h5 class="text-left">
		        <span id="basilisk-connections-refresh-title">-</span> <span class="pull-right" id="basilisk-connections-refresh-percent">-</span>
		      </h5>
		      <div class="progress progress-sm">
		        <div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 0%; font-size: 80%" role="progressbar" data-edexcoin="COIN" id="basilisk-connections-refresh-progress-bar"></div>
		      </div>
		      <pre data-edexcoin="COIN" id="basilisk-connections-refresh-status-output"></pre>
		    </div>
		  </div>
		</div>
	</div>
	<!-- End Modal -->
`;