var defaultLang = 'EN';

function lang() {
  var htmlItems = $('[data-lang]');

  for (var i = 0; i < htmlItems.length; i++) {
	  var langIDComponents = $(htmlItems[i]).attr('data-lang').split('.');

	  if (langIDComponents.length !== 2) {
	  	console.log('lang placeholder ' + $(htmlItems[i]).attr('data-lang') + ' needs to be named as PARENT.CHILD in ' + defaultLang.toLowerCase() + '.js file');
	  } else {
		  if (_lang && langIDComponents.length === 2 && _lang[defaultLang][langIDComponents[0]][langIDComponents[1]]) {
		  	$(htmlItems[i]).text(_lang[defaultLang][langIDComponents[0]][langIDComponents[1]]);
		  } else {
		    $(htmlItems[i]).text('{{ ' + langIDComponents.join('.') + ' }}');
		    console.log('Missing translation in lang/' +  defaultLang.toLowerCase() + '.js ' + langIDComponents.join('.'));
		  }
  	}
  }

  console.log(htmlItems.length + ' translation placeholders');
}