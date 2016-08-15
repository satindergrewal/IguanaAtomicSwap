
function Iguana_dumpwallet() {

	var ajax_data = {"agent":"bitcoinrpc","method":"dumpwallet","filename": ""};
	var return_result = function () {
		var tmp = null;
		$.ajax({
			'async': false,
			'type': 'POST',
			'global': false,
			//'dataType': 'html',
			'url': 'http://127.0.0.1:7778',
			'data': JSON.stringify(ajax_data),
			'success': function (data) {
				tmp = data;
			}
		});
		return tmp;
	}();

	//console.log(return_result);

	//comment
    /*var ajax_data = {"agent":"bitcoinrpc","method":"dumpwallet","filename": ""};
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            //console.log('== Data OutPut ==');
            console.log(AjaxOutputData);
            //return AjaxOutputData;
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
    //console.log(datareturn)
    //return datareturn;*/
}


function Iguana_rmd160conv(rmd160conv_data) {
	//console.log(rmd160conv_data);
	//return rmd160conv_data;

	//comment
    var ajax_data = {"agent":"SuperNET","method":"rmd160conv","rmd160": rmd160conv_data.rmd160,"coin": rmd160conv_data.coin};
    console.log(ajax_data);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(ajax_data),
        url: 'http://127.0.0.1:7778',
        //dataType: 'text',
        success: function(data, textStatus, jqXHR) {
            var AjaxOutputData = JSON.parse(data);
            console.log('== Data OutPut ==');
            console.log(AjaxOutputData);
            return AjaxOutputData;
        },
        error: function(xhr, textStatus, error) {
            console.log('failed getting Coin History.');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}