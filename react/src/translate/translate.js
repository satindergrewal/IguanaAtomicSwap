import { _lang } from './en.js';

export function translate(langID) {
  var defaultLang = 'EN';

  if (langID && langID.indexOf('.') > -1) {
    var langIDComponents = langID.split('.');

    if (_lang && langIDComponents && _lang[defaultLang][langIDComponents[0]][langIDComponents[1]]) {
      return _lang[defaultLang][langIDComponents[0]][langIDComponents[1]];
    } else {
      console.log('Missing translation in js/' +  defaultLang.toLowerCase() + '.js ' + langID);
      return '--> ' + langID + ' <--';
    }
  } else {
    if (langID.length)
      console.log('Missing translation in js/' +  defaultLang.toLowerCase() + '.js ' + langID);
      return '--> ' + langID + ' <--';
  }
}