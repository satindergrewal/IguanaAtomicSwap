
var IguanaAPI = function() {
	
	var btcrpcEncryptwallet = function () {
		
		test: function(data) {
			console.log(this.data);
			return data;
		}
		
	}

	return {
		//main function to initiate the module
		init: function() {
			btcrpcEncryptwallet();
		}
	}
}();

jQuery(document).ready(function() {    
   IguanaAPI.init(); // init metronic core componets
});