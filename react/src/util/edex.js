export function edexRemoveTXID(_obj, txidArray) {
  var txidToStr = txidArray.join(':');

  console.log(txidToStr);
  if (_obj, _obj.basilisk) {
    if (Object.keys(_obj.basilisk).length === 0) {
      console.log('no coin nodes to parse');
    } else {
      for (var key in _obj.basilisk) {
        for (var coinAddr in _obj.basilisk[key]) {
          if (_obj.basilisk[key][coinAddr] !== 'addresses') {
            if (_obj.basilisk[key][coinAddr].refresh &&
                _obj.basilisk[key][coinAddr].refresh.data &&
                _obj.basilisk[key][coinAddr].refresh.data.length > 0) {
              for (var i = 0; i < _obj.basilisk[key][coinAddr].refresh.data.length; i++) {
                if (txidToStr.indexOf(_obj.basilisk[key][coinAddr].refresh.data[i].txid) > -1) {
                  _obj.basilisk[key][coinAddr].refresh.data.splice(i, 1);
                }
              }
            }
          }
        }
      }
    }
  } else {
    console.log('basilisk node is missing');
  }

  return _obj;
}