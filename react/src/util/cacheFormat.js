export function edexGetTxIDList(getTxData) {
  let getTxidList = [];

  for (let i = 0; i < getTxData.length; i++) {
    getTxidList.push(getTxData[i].txid);
  }

  return getTxidList;
}

export function edexRemoveTXID(_obj, address, txidArray) {
  let txidToStr = ':' + txidArray.join(':') + ':';

  if (_obj, _obj.basilisk) {
    if (Object.keys(_obj.basilisk).length === 0) {
      console.log('no coin nodes to parse');
    } else {
      for (let key in _obj.basilisk) {
        for (let coinAddr in _obj.basilisk[key]) {
          if (_obj.basilisk[key][coinAddr] !== 'addresses' &&
              coinAddr === address) {
            if (_obj.basilisk[key][coinAddr].refresh &&
                _obj.basilisk[key][coinAddr].refresh.data &&
                _obj.basilisk[key][coinAddr].refresh.data.length > 0) {
              for (let i = 0; i < _obj.basilisk[key][coinAddr].refresh.data.length; i++) {
                if (txidToStr.indexOf(_obj.basilisk[key][coinAddr].refresh.data[i].txid.toString()) > -1) {
                  console.log('cacheformat remove node', _obj.basilisk[key][coinAddr].refresh.data[i].txid);
                  _obj.basilisk[key][coinAddr].refresh.data.splice(i, 1);
                  _obj.basilisk[key][coinAddr].refresh.timestamp = Date.now();
                }
              }
            }
            if (_obj.basilisk[key][coinAddr].listunspent &&
                _obj.basilisk[key][coinAddr].listunspent.data &&
                _obj.basilisk[key][coinAddr].listunspent.data.length > 0) {
              for (let i = 0; i < _obj.basilisk[key][coinAddr].listunspent.data.length; i++) {
                if (txidToStr.indexOf(_obj.basilisk[key][coinAddr].listunspent.data[i].txid.toString()) > -1) {
                  console.log('cacheformat remove node', _obj.basilisk[key][coinAddr].listunspent.data[i].txid);
                  _obj.basilisk[key][coinAddr].listunspent.data.splice(i, 1);
                  _obj.basilisk[key][coinAddr].listunspent.timestamp = Date.now();
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