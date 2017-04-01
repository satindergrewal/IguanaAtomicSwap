import { PassPhraseGenerator } from './crypto/passphrasegenerator.js';
import { md5 } from './crypto/md5.js';

export function iguanaSetRPCAuth() {
  var tmpPass = '1234'; //md5(PassPhraseGenerator.generatePassPhrase(128));
  sessionStorage.setItem('IguanaRPCAuth', tmpPass);
  console.log('passphraseGen', tmpPass);
}