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

	if (coin === 'BTC' ||
			coin === 'BTCD' ||
			coin === 'LTC' ||
			coin === 'DOGE' ||
			coin === 'DGB' ||
			coin === 'MZC' ||
			coin === 'SYS' ||
			coin === 'UNO' ||
			coin === 'BTM' ||
			coin === 'CARB' ||
			coin === 'ANC' ||
			coin === 'FRK' ||
			coin === 'GAME' ||
			coin === 'ZEC' ||
			coin === 'KMD') {
		return 'crypto';
	}
}

export function startCrypto(confpath, coin, mode) {
	var tmpinternval = 0,
			AddCoinData = {},
			tmpPendValue,
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (coin !== 'BTC' && coin !== 'LTC' && coin !== 'DOGE') {
		tmpPendValue = parseInt(tmpPendValue) * 4;
	}

	AddCoinData.BTCD = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"prefetchlag":-1,"poll":50,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTCD","startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"maxpeers":64,"portp2p":14631,"rpc":14632}
	AddCoinData.LTC = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"maxpeers":256,"newcoin":"LTC","name":"Litecoin","hasheaders":1,"useaddmultisig":0,"netmagic":"fbc0b6db","p2p":9333,"rpc":9332,"pubval":48,"p2shval":5,"wifval":176,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1317972665,"nBits":"1e0ffff0","nonce":2084524493,"merkle_root":"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9"},"alertpubkey":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9","protover":70002};
	AddCoinData.DOGE = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DOGE","name":"Dogecoin","netmagic":"C0C0C0C0","p2p":22556,"rpc":22555,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"100000000","minconfirms":2,"genesishash":"1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691","genesis":{"hashalgo": "scrypt","version":1,"timestamp":1386325540,"nBits":"1e0ffff0","nonce":99943,"merkle_root":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69"},"alertpubkey":"04d4da7a5dae4db797d9b0644d57a5cd50e05a70f36091cd62e2fc41c98ded06340be5a43a35e185690cd9cde5d72da8f6d065b499b06f51dcfba14aad859f443a"};
	AddCoinData.DGB = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DGB","name":"Digibyte","netmagic":"FAC3B6DA","p2p":12024,"rpc":14022,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"7497ea1b465eb39f1c8f507bc877078fe016d6fcb6dfad3a64c98dcc6e1e8496","genesis":{"version":1,"timestamp":1389388394,"nBits":"1e0ffff0","nonce":2447652,"merkle_root":"72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad"},"alertpubkey":"04F04441C4757F356290A37C313C3772C5BC5003E898EB2E0CF365795543A7BF690C8BBBFA32EE3A3325477CE2000B7D0453EFBB203329D0F9DF34D5927D022BC9"};
	AddCoinData.MZC = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"MZC","name":"MazaCoin","netmagic":"f8b503df","p2p":12835,"rpc":12832,"pubval":50,"p2shval":9,"wifval":224,"txfee_satoshis":"0","minconfirms":2,"genesishash":"00000c7c73d8ce604178dae13f0fc6ec0be3275614366d44b1b4b5c6e238c60c","genesis":{"version":1,"timestamp":1390747675,"nBits":"1e0ffff0","nonce":2091390249,"merkle_root":"62d496378e5834989dd9594cfc168dbb76f84a39bbda18286cddc7d1d1589f4f"},"alertpubkey":"04f09702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284"};
	AddCoinData.SYS = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"maxpeers":256,"newcoin":"SYS","name":"SysCoin","hasheaders":0,"useaddmultisig":0,"netmagic":"f9beb4d9","p2p":8369,"rpc":8370,"pubval":0,"p2shval":5,"wifval":128,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"0000072d66e51ab87de265765cc8bdd2d229a4307c672a1b3d5af692519cf765","genesis":{"version":1,"timestamp":1450473723,"nBits":"1e0ffff0","nonce":5258726,"merkle_root":"5215c5a2af9b63f2550b635eb2b354bb13645fd8fa31275394eb161944303065"},"protover":70012,"auxpow":1};
	AddCoinData.UNO = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"UNO","name":"Unobtanium","netmagic":"03d5b503","p2p":65534,"rpc":65535,"pubval":130,"p2shval":30,"wifval":224,"txfee_satoshis":"1000000","minconfirms":2,"genesishash":"000004c2fc5fffb810dccc197d603690099a68305232e552d96ccbe8e2c52b75","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":1211565,"merkle_root":"36a192e90f70131a884fe541a1e8a5643a28ba4cb24cbb2924bd0ee483f7f484"},"alertpubkey":"04fd68acb6a895f3462d91b43eef0da845f0d531958a858554feab3ac330562bf76910700b3f7c29ee273ddc4da2bb5b953858f6958a50e8831eb43ee30c32f21d"};
	AddCoinData.BTM = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"BTM","name":"Bitmark","netmagic":"f9beb4d9","p2p":9265,"rpc":9266,"pubval":85,"p2shval":5,"wifval":213,"txfee_satoshis":"0","minconfirms":2,"genesishash":"c1fb746e87e89ae75bdec2ef0639a1f6786744639ce3d0ece1dcf979b79137cb","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1405274442,"nBits":"1d00ffff","nonce":14385103,"merkle_root":"d4715adf41222fae3d4bf41af30c675bc27228233d0f3cfd4ae0ae1d3e760ba8"},"alertpubkey":"04bf5a75ff0f823840ef512b08add20bb4275ff6e097f2830ad28645e28cb5ea4dc2cfd0972b94019ad46f331b45ef4ba679f2e6c87fd19c864365fadb4f8d2269"};
	AddCoinData.CARB = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"CARB","name":"Carboncoin","netmagic":"abccbbdf","p2p":9350,"rpc":9351,"pubval":47,"p2shval":5,"wifval":175,"txfee_satoshis":"0","minconfirms":2,"genesishash":"a94f1aae8c409a0bd1e53cbca92d7e506b61c51d955cf56f76da501718d48d6c","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1389199888,"nBits":"1e0ffff0","nonce":605268,"merkle_root":"074bbb9d355731bfa8f67130e2179db7518d1387ad52e55309d4debe7d4e6383"},"alertpubkey":"046d6918a7c0c053aa942dbb8861499be4bd915c8bfb6a2b77b3787e207097cc2734b9321226ff107c1a95dae98570a66baec66e350d78ceba091b54411654d33f"};
	AddCoinData.ANC = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"ANC","name":"AnonCoin","netmagic":"facabada","p2p":9377,"rpc":28332,"pubval":23,"p2shval":5,"wifval":151,"txfee_satoshis":"2000000","minconfirms":2,"genesishash":"00000be19c5a519257aa921349037d55548af7cabf112741eb905a26bb73e468","genesis":{"version":1,"timestamp":1370190760,"nBits":"1e0ffff0","nonce":347089008,"merkle_root":"7ce7004d764515f9b43cb9f07547c8e2e00d94c9348b3da33c8681d350f2c736"},"alertpubkey":"04c6db35c11724e526f6725cc5bd5293b4bc9382397856e1bcef7111fb44ce357fd12442b34c496d937a348c1dca1e36ae0c0e128905eb3d301433887e8f0b4536"};
	AddCoinData.FRK = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"FRK","name":"Franko","netmagic":"7defaced","p2p":7912,"rpc":7913,"pubval":35,"p2shval":5,"wifval":163,"txfee_satoshis":"0","minconfirms":2,"genesishash":"19225ae90d538561217b5949e98ca4964ac91af39090d1a4407c892293e4f44f","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1368144664,"nBits":"1e0ffff0","nonce":731837,"merkle_root":"b78f79f1d10029cc45ed3d5a1db7bd423d4ee170c03baf110a62565d16a21dca"},"alertpubkey":"04d4da7a5dae4db797d9b0644d57a5cd50e05a70f36091cd62e2fc41c98ded06340be5a43a35e185690cd9cde5d72da8f6d065b499b06f51dcfba14aad859f443a"};
	AddCoinData.GAME = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"GAME","name":"GameCredits","netmagic":"fbc0b6db","p2p":40002,"rpc":40001,"pubval":38,"p2shval":5,"wifval":166,"txfee_satoshis":"100000","minconfirms":2,"genesishash":"91ec5f25ee9a0ffa1af7d4da4db9a552228dd2dc77cdb15b738be4e1f55f30ee","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1392757140,"nBits":"1e0ffff0","nonce":2084565393,"merkle_root":"d849db99a14164f4b4c8ad6d2d8d7e2b1ba7f89963e9f4bf9fad5ff1a4754429"},"alertpubkey":"04fc9702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284","auxpow":1,"protover":80006,"isPoS":0};
	AddCoinData.ZET = {'userpass':tmpIguanaRPCAuth,"RELAY":mode,"VALIDATE":mode,"startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"ZET","name":"Zetacoin","netmagic":"fab503df","p2p":17333,"rpc":17335,"pubval":80,"p2shval":9,"wifval":224,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"000006cab7aa2be2da91015902aa4458dd5fbb8778d175c36d429dc986f2bff4","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":2089928209,"merkle_root":"d0227b8c3e3d07bce9656b3d9e474f050d23458aaead93357dcfdac9ab9b79f9"},"alertpubkey":"045337216002ca6a71d63edf062895417610a723d453e722bf4728996c58661cdac3d4dec5cecd449b9086e9602b35cc726a9e0163e1a4d40f521fbdaebb674658"};

	if ( coin === 'KMD' ) {
		if ( mode === '-1' ) {
			AddCoinData.KMD = {"coin":"KMD","conf":"komodo.conf","path":confpath,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":0,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		} else {
			AddCoinData.KMD = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":mode,"VALIDATE":mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		}
	}
	if ( coin === 'ZEC' ) {
		if ( mode === '-1' ) {
			AddCoinData.ZEC = {"coin":"ZEC","conf":"zcash.conf","path":confpath,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":129,"maxpeers":32,"newcoin":"ZEC","name":"Zcash","hasheaders":0,"useaddmultisig":0,"netmagic":"24e92764","p2p":8233,"rpc":8232,"pubval":184,"p2shval":189,"wifval":128,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"00040fe8ec8471911baa1db1266ea15dd06b4a8a5c453883c000b031973dce08","protover":170002,"genesisblock":"040000000000000000000000000000000000000000000000000000000000000000000000db4d7a85b768123f1dff1d4c4cece70083b2d27e117b4ac2e31d087988a5eac4000000000000000000000000000000000000000000000000000000000000000090041358ffff071f5712000000000000000000000000000000000000000000000000000000000000fd4005000a889f00854b8665cd555f4656f68179d31ccadc1b1f7fb0952726313b16941da348284d67add4686121d4e3d930160c1348d8191c25f12b267a6a9c131b5031cbf8af1f79c9d513076a216ec87ed045fa966e01214ed83ca02dc1797270a454720d3206ac7d931a0a680c5c5e099057592570ca9bdf6058343958b31901fce1a15a4f38fd347750912e14004c73dfe588b903b6c03166582eeaf30529b14072a7b3079e3a684601b9b3024054201f7440b0ee9eb1a7120ff43f713735494aa27b1f8bab60d7f398bca14f6abb2adbf29b04099121438a7974b078a11635b594e9170f1086140b4173822dd697894483e1c6b4e8b8dcd5cb12ca4903bc61e108871d4d915a9093c18ac9b02b6716ce1013ca2c1174e319c1a570215bc9ab5f7564765f7be20524dc3fdf8aa356fd94d445e05ab165ad8bb4a0db096c097618c81098f91443c719416d39837af6de85015dca0de89462b1d8386758b2cf8a99e00953b308032ae44c35e05eb71842922eb69797f68813b59caf266cb6c213569ae3280505421a7e3a0a37fdf8e2ea354fc5422816655394a9454bac542a9298f176e211020d63dee6852c40de02267e2fc9d5e1ff2ad9309506f02a1a71a0501b16d0d36f70cdfd8de78116c0c506ee0b8ddfdeb561acadf31746b5a9dd32c21930884397fb1682164cb565cc14e089d66635a32618f7eb05fe05082b8a3fae620571660a6b89886eac53dec109d7cbb6930ca698a168f301a950be152da1be2b9e07516995e20baceebecb5579d7cdbc16d09f3a50cb3c7dffe33f26686d4ff3f8946ee6475e98cf7b3cf9062b6966e838f865ff3de5fb064a37a21da7bb8dfd2501a29e184f207caaba364f36f2329a77515dcb710e29ffbf73e2bbd773fab1f9a6b005567affff605c132e4e4dd69f36bd201005458cfbd2c658701eb2a700251cefd886b1e674ae816d3f719bac64be649c172ba27a4fd55947d95d53ba4cbc73de97b8af5ed4840b659370c556e7376457f51e5ebb66018849923db82c1c9a819f173cccdb8f3324b239609a300018d0fb094adf5bd7cbb3834c69e6d0b3798065c525b20f040e965e1a161af78ff7561cd874f5f1b75aa0bc77f720589e1b810f831eac5073e6dd46d00a2793f70f7427f0f798f2f53a67e615e65d356e66fe40609a958a05edb4c175bcc383ea0530e67ddbe479a898943c6e3074c6fcc252d6014de3a3d292b03f0d88d312fe221be7be7e3c59d07fa0f2f4029e364f1f355c5d01fa53770d0cd76d82bf7e60f6903bc1beb772e6fde4a70be51d9c7e03c8d6d8dfb361a234ba47c470fe630820bbd920715621b9fbedb49fcee165ead0875e6c2b1af16f50b5d6140cc981122fcbcf7c5a4e3772b3661b628e08380abc545957e59f634705b1bbde2f0b4e055a5ec5676d859be77e20962b645e051a880fddb0180b4555789e1f9344a436a84dc5579e2553f1e5fb0a599c137be36cabbed0319831fea3fddf94ddc7971e4bcf02cdc93294a9aab3e3b13e3b058235b4f4ec06ba4ceaa49d675b4ba80716f3bc6976b1fbf9c8bf1f3e3a4dc1cd83ef9cf816667fb94f1e923ff63fef072e6a19321e4812f96cb0ffa864da50ad74deb76917a336f31dce03ed5f0303aad5e6a83634f9fcc371096f8288b8f02ddded5ff1bb9d49331e4a84dbe1543164438fde9ad71dab024779dcdde0b6602b5ae0a6265c14b94edd83b37403f4b78fcd2ed555b596402c28ee81d87a909c4e8722b30c71ecdd861b05f61f8b1231795c76adba2fdefa451b283a5d527955b9f3de1b9828e7b2e74123dd47062ddcc09b05e7fa13cb2212a6fdbc65d7e852cec463ec6fd929f5b8483cf3052113b13dac91b69f49d1b7d1aec01c4a68e41ce157","debug":0}
		} else {
			AddCoinData.ZEC = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":mode,"VALIDATE":mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":tmpPendValue,"endpend":tmpPendValue,"services":129,"maxpeers":32,"newcoin":"ZEC","name":"Zcash","hasheaders":0,"useaddmultisig":0,"netmagic":"24e92764","p2p":8233,"rpc":8232,"pubval":184,"p2shval":189,"wifval":128,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"00040fe8ec8471911baa1db1266ea15dd06b4a8a5c453883c000b031973dce08","protover":170002,"genesisblock":"040000000000000000000000000000000000000000000000000000000000000000000000db4d7a85b768123f1dff1d4c4cece70083b2d27e117b4ac2e31d087988a5eac4000000000000000000000000000000000000000000000000000000000000000090041358ffff071f5712000000000000000000000000000000000000000000000000000000000000fd4005000a889f00854b8665cd555f4656f68179d31ccadc1b1f7fb0952726313b16941da348284d67add4686121d4e3d930160c1348d8191c25f12b267a6a9c131b5031cbf8af1f79c9d513076a216ec87ed045fa966e01214ed83ca02dc1797270a454720d3206ac7d931a0a680c5c5e099057592570ca9bdf6058343958b31901fce1a15a4f38fd347750912e14004c73dfe588b903b6c03166582eeaf30529b14072a7b3079e3a684601b9b3024054201f7440b0ee9eb1a7120ff43f713735494aa27b1f8bab60d7f398bca14f6abb2adbf29b04099121438a7974b078a11635b594e9170f1086140b4173822dd697894483e1c6b4e8b8dcd5cb12ca4903bc61e108871d4d915a9093c18ac9b02b6716ce1013ca2c1174e319c1a570215bc9ab5f7564765f7be20524dc3fdf8aa356fd94d445e05ab165ad8bb4a0db096c097618c81098f91443c719416d39837af6de85015dca0de89462b1d8386758b2cf8a99e00953b308032ae44c35e05eb71842922eb69797f68813b59caf266cb6c213569ae3280505421a7e3a0a37fdf8e2ea354fc5422816655394a9454bac542a9298f176e211020d63dee6852c40de02267e2fc9d5e1ff2ad9309506f02a1a71a0501b16d0d36f70cdfd8de78116c0c506ee0b8ddfdeb561acadf31746b5a9dd32c21930884397fb1682164cb565cc14e089d66635a32618f7eb05fe05082b8a3fae620571660a6b89886eac53dec109d7cbb6930ca698a168f301a950be152da1be2b9e07516995e20baceebecb5579d7cdbc16d09f3a50cb3c7dffe33f26686d4ff3f8946ee6475e98cf7b3cf9062b6966e838f865ff3de5fb064a37a21da7bb8dfd2501a29e184f207caaba364f36f2329a77515dcb710e29ffbf73e2bbd773fab1f9a6b005567affff605c132e4e4dd69f36bd201005458cfbd2c658701eb2a700251cefd886b1e674ae816d3f719bac64be649c172ba27a4fd55947d95d53ba4cbc73de97b8af5ed4840b659370c556e7376457f51e5ebb66018849923db82c1c9a819f173cccdb8f3324b239609a300018d0fb094adf5bd7cbb3834c69e6d0b3798065c525b20f040e965e1a161af78ff7561cd874f5f1b75aa0bc77f720589e1b810f831eac5073e6dd46d00a2793f70f7427f0f798f2f53a67e615e65d356e66fe40609a958a05edb4c175bcc383ea0530e67ddbe479a898943c6e3074c6fcc252d6014de3a3d292b03f0d88d312fe221be7be7e3c59d07fa0f2f4029e364f1f355c5d01fa53770d0cd76d82bf7e60f6903bc1beb772e6fde4a70be51d9c7e03c8d6d8dfb361a234ba47c470fe630820bbd920715621b9fbedb49fcee165ead0875e6c2b1af16f50b5d6140cc981122fcbcf7c5a4e3772b3661b628e08380abc545957e59f634705b1bbde2f0b4e055a5ec5676d859be77e20962b645e051a880fddb0180b4555789e1f9344a436a84dc5579e2553f1e5fb0a599c137be36cabbed0319831fea3fddf94ddc7971e4bcf02cdc93294a9aab3e3b13e3b058235b4f4ec06ba4ceaa49d675b4ba80716f3bc6976b1fbf9c8bf1f3e3a4dc1cd83ef9cf816667fb94f1e923ff63fef072e6a19321e4812f96cb0ffa864da50ad74deb76917a336f31dce03ed5f0303aad5e6a83634f9fcc371096f8288b8f02ddded5ff1bb9d49331e4a84dbe1543164438fde9ad71dab024779dcdde0b6602b5ae0a6265c14b94edd83b37403f4b78fcd2ed555b596402c28ee81d87a909c4e8722b30c71ecdd861b05f61f8b1231795c76adba2fdefa451b283a5d527955b9f3de1b9828e7b2e74123dd47062ddcc09b05e7fa13cb2212a6fdbc65d7e852cec463ec6fd929f5b8483cf3052113b13dac91b69f49d1b7d1aec01c4a68e41ce157","debug":0}
		}
	}

	console.log('AddCoinData', AddCoinData[coin]);
	return AddCoinData[coin];
}

export function startCurrencyAssetChain(confpath, coin, mode) {
	var AddCoinDataPayload = {},
			tmpPendValue,
			tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

	if (coin !== 'BTC' && coin !== 'LTC' && coin !== 'DOGE') {
		tmpPendValue = parseInt(tmpPendValue) * 4;
	}

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
		if (getSuppyOnly) {
			return acConfig[coin].supply;
		} else {
			return acConfig[coin].AddCoinData;
		}
	} else {
		return acConfig[coin].AddCoinDataVar;
	}
}