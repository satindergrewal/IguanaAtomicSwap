export function checkCoinType(coin) {
	if (coin === 'USD' ||
			coin === 'RON' ||
			coin === 'RUB' ||
			coin === 'SEK' ||
			coin === 'SGD' ||
			coin === 'THB' ||
			coin === 'TRY' ||
			coin === 'ZAR' ||
			coin === 'CNY' ||
			coin === 'CZK' ||
			coin === 'DKK' ||
			coin === 'EUR' ||
			coin === 'GBP' ||
			coin === 'HKD' ||
			coin === 'HUF' ||
			coin === 'IDR' ||
			coin === 'ILS' ||
			coin === 'INR' ||
			coin === 'JPY' ||
			coin === 'KRW' ||
			coin === 'MXN' ||
			coin === 'MYR' ||
			coin === 'NOK' ||
			coin === 'NZD' ||
			coin === 'PHP' ||
			coin === 'PLN' ||
			coin === 'AUD' ||
			coin === 'BGN' ||
			coin === 'BRL' ||
			coin === 'CAD' ||
			coin === 'CHF') {
		return 'currency_ac';
	}

	if (coin === 'SUPERNET' ||
			coin === 'REVS' ||
			coin === 'SUPERNET' ||
			coin === 'PANGEA' ||
			coin === 'DEX' ||
			coin === 'JUMBLR' ||
			coin === 'BET' ||
			coin === 'CRYPTO' ||
			coin === 'HODL' ||
			coin === 'SHARK' ||
			coin === 'BOTS' ||
			coin === 'MGW' ||
			coin === 'MVP' ||
			coin === 'KV' ||
			coin === 'CEAL' ||
			coin === 'MESH' ||
			coin === 'WIRELESS') {
		return 'ac';
	}
}

export function startCurrencyAssetChain(confpath, coin, mode) {
	var AddCoinDataPayload = {};
	var tmpPendValue = 4;
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	var _payloadVar = {
		'userpass': tmpIguanaRPCAuth,
		'unitval': '20',
		'zcash': 1,
		'RELAY': mode,
		'VALIDATE': mode,
		'prefetchlag': -1,
		'poll': 100,
		'active': 1,
		'agent': 'iguana',
		'method': 'addcoin',
		'startpend': tmpPendValue,
		'endpend': tmpPendValue,
		'services': 129,
		'maxpeers': 8,
		'newcoin': coin,
		'name': coin,
		'hasheaders': 1,
		'useaddmultisig': 0,
		'netmagic': '2d8e7803',
		'p2p': 13966,
		'rpc': 13967,
		'pubval': 60,
		'p2shval': 85,
		'wifval': 188,
		'txfee_satoshis': '10000',
		'isPoS': 0,
		'minoutput': 10000,
		'minconfirms': 2,
		'genesishash': '027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71',
		'protover': 170002,
		'genesisblock': '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2',
		'debug': 0,
		'seedipaddr': '78.47.196.146'
	};

	if (mode === '-1') {
		var _payloadVarRegular = Object.assign({}, _payloadVar);
		delete _payloadVarRegular.userpass;
		_payloadVarRegular.RELAY = -1;
		_payloadVarRegular.VALIDATE = 1;
		_payloadVarRegular.startpend = 4;
		_payloadVarRegular.endpend = 4;
		_payloadVarRegular.path = confpath;

		const USDDiff = {
			'coin': 'USD',
			'conf': 'USD.conf'
		};
		AddCoinDataPayload.USD = Object.assign({}, _payloadVarRegular, USDDiff);

		const RONDiff = {
			'coin': 'RON',
			'conf': 'RON.conf'
		};
		AddCoinDataPayload.RON = Object.assign({}, _payloadVarRegular, RONDiff);

		const RUBDiff = {
			'coin': 'RUB',
			'conf': 'RUB.conf'
		};
		AddCoinDataPayload.RUB = Object.assign({}, _payloadVarRegular, RUBDiff);

		const SEKDiff = {
			'coin': 'SEK',
			'conf': 'SEK.conf'
		};
		AddCoinDataPayload.SEK = Object.assign({}, _payloadVarRegular, SEKDiff);

		const SGDDiff = {
			'coin': 'SGD',
			'conf': 'SGD.conf'
		};
		AddCoinDataPayload.SGD = Object.assign({}, _payloadVarRegular, SGDDiff);

		const THBDiff = {
			'coin': 'THB',
			'conf': 'THB.conf'
		};
		AddCoinDataPayload.THB = Object.assign({}, _payloadVarRegular, THBDiff);

		const TRYDiff = {
			'coin': 'TRY',
			'conf': 'TRY.conf'
		};
		AddCoinDataPayload.TRY = Object.assign({}, _payloadVarRegular, TRYDiff);

		const ZARDiff = {
			'coin': 'ZAR',
			'conf': 'ZAR.conf'
		};
		AddCoinDataPayload.ZAR = Object.assign({}, _payloadVarRegular, ZARDiff);

		const CNYDiff = {
			'coin': 'CNY',
			'conf': 'CNY.conf'
		};
		AddCoinDataPayload.CNY = Object.assign({}, _payloadVarRegular, CNYDiff);

		const CZKDiff = {
			'coin': 'CZK',
			'conf': 'CZK.conf'
		};
		AddCoinDataPayload.CZK = Object.assign({}, _payloadVarRegular, CZKDiff);

		const DKKDiff = {
			'coin': 'DKK',
			'conf': 'DKK.conf'
		};
		AddCoinDataPayload.DKK = Object.assign({}, _payloadVarRegular, DKKDiff);

		const EURDiff = {
			'coin': 'EUR',
			'conf': 'EUR.conf'
		};
		AddCoinDataPayload.EUR = Object.assign({}, _payloadVarRegular, EURDiff);

		const GBPDiff = {
			'coin': 'GBP',
			'conf': 'GBP.conf'
		};
		AddCoinDataPayload.GBP = Object.assign({}, _payloadVarRegular, GBPDiff);

		const HKDDiff = {
			'coin': 'HKD',
			'conf': 'HKD.conf'
		};
		AddCoinDataPayload.HKD = Object.assign({}, _payloadVarRegular, HKDDiff);

		const HUFDiff = {
			'coin': 'HUF',
			'conf': 'HUF.conf'
		};
		AddCoinDataPayload.HUF = Object.assign({}, _payloadVarRegular, HUFDiff);

		const IDRDiff = {
			'coin': 'IDR',
			'conf': 'IDR.conf'
		};
		AddCoinDataPayload.IDR = Object.assign({}, _payloadVarRegular, IDRDiff);

		const ILSDiff = {
			'coin': 'ILS',
			'conf': 'ILS.conf'
		};
		AddCoinDataPayload.ILS = Object.assign({}, _payloadVarRegular, ILSDiff);

		const INRDiff = {
			'coin': 'INR',
			'conf': 'INR.conf'
		};
		AddCoinDataPayload.INR = Object.assign({}, _payloadVarRegular, INRDiff);

		const JPYDiff = {
			'coin': 'JPY',
			'conf': 'JPY.conf'
		};
		AddCoinDataPayload.JPY = Object.assign({}, _payloadVarRegular, JPYDiff);

		const KRWDiff = {
			'coin': 'KRW',
			'conf': 'KRW.conf'
		};
		AddCoinDataPayload.KRW = Object.assign({}, _payloadVarRegular, KRWDiff);

		const MXNDiff = {
			'coin': 'MXN',
			'conf': 'MXN.conf'
		};
		AddCoinDataPayload.MXN = Object.assign({}, _payloadVarRegular, MXNDiff);

		const MYRDiff = {
			'coin': 'MYR',
			'conf': 'MYR.conf'
		};
		AddCoinDataPayload.MYR = Object.assign({}, _payloadVarRegular, MYRDiff);

		const NOKDiff = {
			'coin': 'NOK',
			'conf': 'NOK.conf'
		};
		AddCoinDataPayload.NOK = Object.assign({}, _payloadVarRegular, NOKDiff);

		const NZDDiff = {
			'coin': 'NZD',
			'conf': 'NZD.conf'
		};
		AddCoinDataPayload.NZD = Object.assign({}, _payloadVarRegular, NZDDiff);

		const PHPDiff = {
			'coin': 'PHP',
			'conf': 'PHP.conf'
		};
		AddCoinDataPayload.PHP = Object.assign({}, _payloadVarRegular, PHPDiff);

		const PLNDiff = {
			'coin': 'PLN',
			'conf': 'PLN.conf'
		};
		AddCoinDataPayload.PLN = Object.assign({}, _payloadVarRegular, PLNDiff);

		const AUDDiff = {
			'coin': 'AUD',
			'conf': 'AUD.conf'
		};
		AddCoinDataPayload.AUD = Object.assign({}, _payloadVarRegular, AUDDiff);

		const BGNDiff = {
			'coin': 'BGN',
			'conf': 'BGN.conf'
		};
		AddCoinDataPayload.BGN = Object.assign({}, _payloadVarRegular, BGNDiff);

		const BRLDiff = {
			'coin': 'BRL',
			'conf': 'BRL.conf'
		};
		AddCoinDataPayload.BRL = Object.assign({}, _payloadVarRegular, BRLDiff);

		const CADDiff = {
			'coin': 'CAD',
			'conf': 'CAD.conf'
		};
		AddCoinDataPayload.CAD = Object.assign({}, _payloadVarRegular, CADDiff);

		const CHFDiff = {
			'coin': 'CHF',
			'conf': 'CHF.conf'
		};
		AddCoinDataPayload.CHF = Object.assign({}, _payloadVarRegular, CHFDiff);

		return AddCoinDataPayload[coin];
	} else {
		const USDDiff = {
			'netmagic': '2d8e7803',
			'p2p': 13966,
			'rpc': 13967
		};
		AddCoinDataPayload.USDVar = Object.assign({}, _payloadVar, USDDiff);

		const CHFDiff = {
			'netmagic': '59fbeb5c',
			'p2p': 15311,
			'rpc': 15312
		};
		AddCoinDataPayload.CHFVar = Object.assign({}, _payloadVar, CHFDiff);

		const CADDiff = {
			'netmagic': '3c212763',
			'p2p': 8719,
			'rpc': 8720
		};
		AddCoinDataPayload.CADVar = Object.assign({}, _payloadVar, CADDiff);

		const BRLDiff = {
			'netmagic': 'ab82d10d',
			'p2p': 9913,
			'rpc': 9914
		};
		AddCoinDataPayload.BRLVar = Object.assign({}, _payloadVar, BRLDiff);

		const BGNDiff = {
			'netmagic': '93056ad4',
			'p2p': 9109,
			'rpc': 9110
		};
		AddCoinDataPayload.BGNVar = Object.assign({}, _payloadVar, BGNDiff);

		const AUDDiff = {
			'netmagic': '07220d4e',
			'p2p': 8044,
			'rpc': 8045
		};
		AddCoinDataPayload.AUDVar = Object.assign({}, _payloadVar, AUDDiff);

		const PLNDiff = {
			'netmagic': '46ab3c28',
			'p2p': 13492,
			'rpc': 13493
		};
		AddCoinDataPayload.PLNVar = Object.assign({}, _payloadVar, PLNDiff);

		const PHPDiff = {
			'netmagic': '21535fb6',
			'p2p': 11180,
			'rpc': 11181
		};
		AddCoinDataPayload.PHPVar = Object.assign({}, _payloadVar, PHPDiff);

		const NZDDiff = {
			'netmagic': 'f579c9c2',
			'p2p': 10914,
			'rpc': 10915
		};
		AddCoinDataPayload.NZDVar = Object.assign({}, _payloadVar, NZDDiff);

		const NOKDiff = {
			'netmagic': '7082c365',
			'p2p': 11587,
			'rpc': 11588
		};
		AddCoinDataPayload.NOKVar = Object.assign({}, _payloadVar, NOKDiff);

		const MYRDiff = {
			'netmagic': '3e21761f',
			'p2p': 10687,
			'rpc': 10688
		};
		AddCoinDataPayload.MYRVar = Object.assign({}, _payloadVar, MYRDiff);

		const MXNDiff = {
			'netmagic': '304c6c12',
			'p2p': 13969,
			'rpc': 13970
		};
		AddCoinDataPayload.MXNVar = Object.assign({}, _payloadVar, MXNDiff);

		const KRWDiff = {
			'netmagic': 'c8706588',
			'p2p': 14019,
			'rpc': 14020
		};
		AddCoinDataPayload.KRWVar = Object.assign({}, _payloadVar, KRWDiff);

		const JPYDiff = {
			'netmagic': '7a55295c',
			'p2p': 13144,
			'rpc': 13145
		};
		AddCoinDataPayload.JPYVar = Object.assign({}, _payloadVar, JPYDiff);

		const INRDiff = {
			'netmagic': '740dfc1d',
			'p2p': 10535,
			'rpc': 10536
		};
		AddCoinDataPayload.INRVar = Object.assign({}, _payloadVar, INRDiff);

		const ILSDiff = {
			'netmagic': '605fcd58',
			'p2p': 14637,
			'rpc': 14638
		};
		AddCoinDataPayload.ILSVar = Object.assign({}, _payloadVar, ILSDiff);

		const IDRDiff = {
			'netmagic': 'fee513e7',
			'p2p': 14458,
			'rpc': 14459
		};
		AddCoinDataPayload.IDRVar = Object.assign({}, _payloadVar, IDRDiff);

		const HKDDiff = {
			'netmagic': '57269d95',
			'p2p': 15408,
			'rpc': 15409
		};
		AddCoinDataPayload.HKDVar = Object.assign({}, _payloadVar, HKDDiff);

		const HUFDiff = {
			'netmagic': 'a478d2af',
			'p2p': 13698,
			'rpc': 13699
		};
		AddCoinDataPayload.HUFVar = Object.assign({}, _payloadVar, HUFDiff);

		const GBPDiff = {
			'netmagic': '5e0ed955',
			'p2p': 11504,
			'rpc': 11505
		};
		AddCoinDataPayload.GBPVar = Object.assign({}, _payloadVar, GBPDiff);

		const EURDiff = {
			'netmagic': '8a3fd0bd',
			'p2p': 8064,
			'rpc': 8065
		};
		AddCoinDataPayload.EURVar = Object.assign({}, _payloadVar, EURDiff);

		const DKKDiff = {
			'netmagic': 'a2c2380c',
			'p2p': 13829,
			'rpc': 13830
		};
		AddCoinDataPayload.DKKVar = Object.assign({}, _payloadVar, DKKDiff);

		const CNYDiff = {
			'netmagic': '2a51b987',
			'p2p': 10383,
			'rpc': 10384
		};
		AddCoinDataPayload.CNYVar = Object.assign({}, _payloadVar, CNYDiff);

		const ZARDiff = {
			'netmagic': '920c0484',
			'p2p': 15159,
			'rpc': 15160
		};
		AddCoinDataPayload.ZARVar = Object.assign({}, _payloadVar, ZARDiff);

		const TRYDiff = {
			'netmagic': '82b9a778',
			'p2p': 13923,
			'rpc': 13924
		};
		AddCoinDataPayload.TRYVar = Object.assign({}, _payloadVar, TRYDiff);

		const THBDiff = {
			'netmagic': 'b58aef42',
			'p2p': 11846,
			'rpc': 11847
		};
		AddCoinDataPayload.THBVar = Object.assign({}, _payloadVar, THBDiff);

		const SGDDiff = {
			'netmagic': 'ca255b29',
			'p2p': 14474,
			'rpc': 14475
		};
		AddCoinDataPayload.SGDVar = Object.assign({}, _payloadVar, SGDDiff);

		const SEKDiff = {
			'netmagic': 'd95ad28b',
			'p2p': 11446,
			'rpc': 11447
		};
		AddCoinDataPayload.SEKVar = Object.assign({}, _payloadVar, SEKDiff);

		const RONDiff = {
			'netmagic': 'eb2c9500',
			'p2p': 8674,
			'rpc': 8675
		};
		AddCoinDataPayload.RONVar = Object.assign({}, _payloadVar, RONDiff);

		const RUBDiff = {
			'netmagic': '1b9a0eb9',
			'p2p': 8198,
			'rpc': 8199
		};
		AddCoinDataPayload.RUBVar = Object.assign({}, _payloadVar, RUBDiff);

		const CZKDiff = {
			'netmagic': '37f7ae5a',
			'p2p': 9481,
			'rpc': 9482
		};
		AddCoinDataPayload.CZKVar = Object.assign({}, _payloadVar, CZKDiff);

		return AddCoinDataPayload[coin + 'Var'];
	}
}

export function startAssetChain(confpath, coin, mode, getSuppyOnly) {
	var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
	var tmpPendValue;

	if (coin !== 'BTC' && coin !== 'LTC' && coin !== 'DOGE') {
		tmpPendValue = parseInt(tmpPendValue) * 4;
	}	

	const _acPayloadOrigin = {
		'unitval': '20',
		'zcash': 1,
		'prefetchlag': -1,
		'poll': 100,
		'active': 1,
		'agent': 'iguana',
		'method': 'addcoin',
		'services': 129,
		'hasheaders': 1,
		'useaddmultisig': 0,
		'pubval': 60,
		'p2shval': 85,
		'wifval': 188,
		'txfee_satoshis': '10000',
		'isPoS': 0,
		'minoutput': 10000,
		'minconfirms': 2,
		'genesishash': '027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71',
		'protover': 170002,
		'genesisblock': '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2',
		'debug': 0,
		'seedipaddr': '78.47.196.146'
	};
	const acConfig = {
		'SUPERNET': {
			'name': 'SUPERNET',
			'supply': 816061,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"SUPERNET","conf":"SUPERNET.conf","path":confpath,"RELAY":-1,"VALIDATE":0,"startpend":4,"endpend":4,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","netmagic":"cc55d9d4","p2p":11340,"rpc":11341}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","netmagic":"cc55d9d4","p2p":11340,"rpc":11341})
		},
		'REVS': {
			'name': 'REVS',
			'supply': 1300000,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"REVS","conf":"REVS.conf","path":confpath,"RELAY":-1,"VALIDATE":0,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"REVS","name":"REVS","netmagic":"905c3498","p2p":10195,"rpc":10196}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"REVS","name":"REVS","netmagic":"905c3498","p2p":10195,"rpc":10196})
		},
		'WLC': {
			'name': 'WIRELESS',
			'supply': 210000000,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"WLC","conf":"WLC.conf","path":confpath,"RELAY":-1,"VALIDATE":0,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"WLC","name":"WIRELESS","netmagic":"62071ed3","p2p":11666,"rpc":11667}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"WLC","name":"WIRELESS","netmagic":"62071ed3","p2p":11666,"rpc":11667})
		},
		'PANGEA': {
			'name': 'PANGEA',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"PANGEA","conf":"PANGEA.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"PANGEA","name":"PANGEA","netmagic":"5fa45ae8","p2p":10073,"rpc":10074}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"PANGEA","name":"PANGEA","netmagic":"5fa45ae8","p2p":10073,"rpc":10074})
		},
		'DEX': {
			'name': 'DEX',
			'supply': 1300000,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"DEX","conf":"DEX.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"DEX","name":"DEX","netmagic":"f2ae0516","p2p":9502,"rpc":9503}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"DEX","name":"DEX","netmagic":"f2ae0516","p2p":9502,"rpc":9503})
		},
		'JUMBLR': {
			'name': 'JUMBLR',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"JUMBLR","conf":"JUMBLR.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"JUMBLR","name":"JUMBLR","netmagic":"7223759e","p2p":10788,"rpc":10789}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"JUMBLR","name":"JUMBLR","netmagic":"7223759e","p2p":10788,"rpc":10789})
		},
		'BET': {
			'name': 'BET',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"BET","conf":"BET.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"BET","name":"BET","netmagic":"6b9e3e1b","p2p":11221,"rpc":11222}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"BET","name":"BET","netmagic":"6b9e3e1b","p2p":11221,"rpc":11222})
		},
		'CRYPTO': {
			'name': 'CRYPTO',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"CRYPTO","conf":"CRYPTO.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"CRYPTO","name":"CRYPTO","netmagic":"fced9e2a","p2p":10419,"rpc":10420}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"CRYPTO","name":"CRYPTO","netmagic":"fced9e2a","p2p":10419,"rpc":10420})
		},
		'HODL': {
			'name': 'HODL',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"HODL","conf":"HODL.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"HODL","name":"HODL","netmagic":"9b13fb5f","p2p":8009,"rpc":8010}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"HODL","name":"HODL","netmagic":"9b13fb5f","p2p":8009,"rpc":8010})
		},
		'SHARK': {
			'name': 'SHARK',
			'supply': 1401,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"SHARK","conf":"SHARK.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"SHARK","name":"SHARK","netmagic":"54a5e30c","p2p":14103,"rpc":14104}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"SHARK","name":"SHARK","netmagic":"54a5e30c","p2p":14103,"rpc":14104})
		},
		'BOTS': {
			'name': 'BOTS',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"BOTS","conf":"BOTS.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"BOTS","name":"BOTS","netmagic":"5bec8cf7","p2p":10150,"rpc":10151}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"BOTS","name":"BOTS","netmagic":"5bec8cf7","p2p":10150,"rpc":10151})
		},
		'MGW': {
			'name': 'MGW',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"MGW","conf":"MGW.conf","path":confpath,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"MGW","name":"MGW","netmagic":"6eea5dbb","p2p":15523,"rpc":15524}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"MGW","name":"MGW","netmagic":"6eea5dbb","p2p":15523,"rpc":15524})
		},
		'MVP': {
			'name': 'MVP',
			'supply': 1000000,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"MVP","conf":"MVP.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"MVP","name":"MVP","netmagic":"dd5ce076","p2p":11675,"rpc":11676}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"MVP","name":"MVP","netmagic":"dd5ce076","p2p":11675,"rpc":11676})
		},
		'KV': {
			'name': 'KV',
			'supply': 999999,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"KV","conf":"KV.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"KV","name":"KV","netmagic":"b09a2d65","p2p":9746,"rpc":9747}) : {},
			'AddCoinDataVar': Object.assign(_acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"KV","name":"KV","netmagic":"b09a2d65","p2p":9746,"rpc":9747})
		},
		'CEAL': {
			'name': 'CEAL',
			'supply': 366666666,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"CEAL","conf":"CEAL.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"CEAL","name":"CEAL","netmagic":"09e51af8","p2p":13096,"rpc":13097}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"CEAL","name":"CEAL","netmagic":"09e51af8","p2p":13096,"rpc":13097})
		},
		'MESH': {
			'name': 'MESH',
			'supply': 1000000,
			'AddCoinData': confpath ? Object.assign({}, _acPayloadOrigin, {"coin":"MESH","conf":"MESH.conf","path":confpath,"RELAY":-1,"VALIDATE":1,"startpend":4,"endpend":4,"maxpeers":8,"newcoin":"MESH","name":"MESH","netmagic":"f0265c67","p2p":8399,"rpc":8400}) : {},
			'AddCoinDataVar': Object.assign({}, _acPayloadOrigin, {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"maxpeers":8,"newcoin":"MESH","name":"MESH","netmagic":"f0265c67","p2p":8399,"rpc":8400})
		}
	};

	if ( mode === '-1' ) {
		/*var setconfig = function() {
			return new Promise(function(resolve, reject) {
				Shepherd_setConf(addcoin_data.coin);
				var result = 'setconfig: DONE';
				console.log(result);
				resolve(result);
			});
		}

		var startcoin = function() {
			return new Promise(function(resolve, reject) {
				Shepherd_herd('komodod', {
					'ac_name': addcoin_data.coin,
					'ac_options': [
						'-daemon=0',
						'-server',
						'-ac_name=' + addcoin_data.coin,
						'-ac_supply=' + acConfig[addcoin_data.coin].supply,
						'-addnode=78.47.196.146'
					]
				});

				var result = 'startcoin: DONE';
				console.log(result);
				resolve(result);
			});
		}

		startcoin();

		var tmpinternval = 6000,
				AddCoinData = acConfig[addcoin_data.coin].AddCoinData;*/
		if (getSuppyOnly) {
			return acConfig[coin].supply;
		} else {
			return acConfig[coin].AddCoinData;
		}
	} else {
		return acConfig[coin].AddCoinDataVar;
	}
}