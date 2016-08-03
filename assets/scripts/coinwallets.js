// DOM Ready =============================================================
$(document).ready(function() {

    // button click
    //$('#currency-send').on('click', function(){console.log($(this).data());});
    //console.log('EhLoe!');
    $('button[id="currency-send"]').on('click', sendCurrency($(this).data('currency')));

});

// Functions =============================================================

function sendCurrency(val) {
	console.log('hello');
	console.log(val);
	//$(this).data("id")
}

/*(function(window, document, $){
	console.log('hello');
$('button[id="currency-send"]').on('click', function(){console.log($(this).data('currency'));});
})(window, document, jQuery);*/