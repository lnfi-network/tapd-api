// @ts-nocheck
const path = require('path')
const TaprootAssets = require('./index')
const taprootAsset = new TaprootAssets({
  /* host: 'tapd.nostrassets.com:10029',
  macaroonFilePath: path.join(__dirname, '../../taprootAssets/admin.macaroon') */
  host: '127.0.0.1:12029',
  macaroonFilePath: '/Users/wjl/.polar/networks/1/volumes/tapd/alice-tap/data/regtest/admin.macaroon',
  certFilePath: '/Users/wjl/.polar/networks/1/volumes/tapd/alice-tap/tls.cert'
})
const assetsService = taprootAsset.getAssetsService();
const universeService = taprootAsset.getUniverseService();
const mintService = taprootAsset.getMintService()
const assetWalletService = taprootAsset.getAssetWalletService();
const fnTestAssets = async () => {
  /* // listAssets
  const listAssetsRet = await assetsService.listAssets({ with_witness: true, include_spent: true, include_leased: true }).catch(e => {
    console.log(e.message)
  })
  console.log("🚀 ~ file: demo.js:11 ~ fnTest ~ ret:", listAssetsRet?.assets) */

  // listBalances
  /*   const { asset_balances, asset_group_balances } = await assetsService.listBalances().catch(e => {
      console.log('e---->', e.message)
    });
    console.log("🚀 ~ file: index.js:73 ~ ret:", asset_balances, asset_group_balances) */

  // queryAddrs
  /* const { addrs } = await assetsService.queryAddrs();
  console.log("🚀 ~ file: index.js:95 ~ addrs:", addrs) */


  // newAddr
  /*  const asset_id = "RyldoVa0piF/lWfLhDvP1d73HV/yZj+7D9bivU8nm3c="
   const ret = await assetsService.newAddr({ asset_id, amt: 10 })
   console.log("🚀 ~ file: index.js:146 ~ ret:", ret) */

  /* 
    // newAddr
    const asset_id = 'TaE1V/H+edBzu2mJNVVtWMlPuNxwpfAH1XLfvieKIkk='
    const script_key = {
      pub_key: '0gVBCyWYGF7ZFBxxZ9XFIzY9835aa/vd6WQ7ekpmrl4=',
      key_desc: {
        raw_key_bytes: 'Au1Ytseznys9yXWhHabKuNojtkHCbI/pkw8+74CJlRp8',
        key_loc: { key_family: 110, key_index: 1 }
      },
      tap_tweak: ''
    }

    const internal_key = {
      raw_key_bytes: 'Au1Ytseznys9yXWhHabKuNojtkHCbI/pkw8+74CJlRp8',
      key_loc: { key_family: 110, key_index: 1 }
    }

    const ret = await assetsService.newAddr({ asset_id, amt: 20, script_key, internal_key }).catch(e => {
      console.log(e.message)
    })
    console.log("🚀 ~ file: demo.js:182 ~ ret ~ ret:", ret) 
  */


  /* // decodeAddr
  const encodedAddr = 'taptb1qqqsqq3qgu54mg2kkjnzzlu4vl9cgw706h00w82l7fnrlwc06m3t6ne8ndmsgggz79s2xtckmj5jev6evnx3vfftnskaru9fwe2n3jzec3y8f7zg276qvggrgzsn5n9mga2kcg96r7sye44pv9lgmkxrynp0z7yr35crhm2l3s6qsqg244eyah'
  const decodeRet = await assetsService.decodeAddr(encodedAddr).catch(e => {
    console.log(e.message)
  })
  console.log("🚀 ~ file: index.js:176 ~ decodeRet:", decodeRet) */


  /* // addrReceives
  const { events } = await assetsService.addrReceives('taptb1qqqsqq3qgu54mg2kkjnzzlu4vl9cgw706h00w82l7fnrlwc06m3t6ne8ndmsgggz79s2xtckmj5jev6evnx3vfftnskaru9fwe2n3jzec3y8f7zg276qvggrgzsn5n9mga2kcg96r7sye44pv9lgmkxrynp0z7yr35crhm2l3s6qsqg244eyah');
  console.log("🚀 ~ file: index.js:203 ~ ret:", events) */


  /* const tap_addr1 = 'taptb1qqqsqq3q6ay3l98ltdh44gtdzsy84x330kwzc7cvg4d4kpsp8rjxdffyqcnsgggzsefcjrwwqc2e2nyz6qr9rpdn8smqf99fh44q8wnljyg5lnc52v4qvggz4cpgfrlpzcvzc064r6apek9vsqprlc6wh46eunmctjusf9tv7twqsqgfcretjf'
  const tap_addr2 = 'taptb1qqqsqq3q6ay3l98ltdh44gtdzsy84x330kwzc7cvg4d4kpsp8rjxdffyqcnsgggzpvpfrt6ge4k4gzd8h8j0rcegjmtvluvap2gdppaf86hsgfy4dgxqvggzf0u8san5crm5hhrh0zvfht5mx0qu7nlwwqgr39lvh2kwddc6axaqsqg4tw4324'
  const tap_addr3 = 'taptb1qqqsqq3q6ay3l98ltdh44gtdzsy84x330kwzc7cvg4d4kpsp8rjxdffyqcnsgggzlfm3trs70g3jnrh92q6j2yhcjlnrsgkzp9905wnnnymmjl7lwkgqvggrgf5q6f5pa99487wreg5r243nld3yrm2llfqav64vpu5vs7unv90ssqgk0szs4l'
  const ret = await assetsService.sendAsset([tap_addr1]).catch(e => {
    console.log(e, e.message)
  })
  console.log("🚀 ~ file: index.js:225 ~ ret:", JSON.stringify(ret)) */

  /*   // getInfo
    const getInfoRet = await assetsService.getInfo()
    console.log("🚀 ~ file: demo.js:202 ~ fnTest ~ getInfoRet:", getInfoRet) */

  /* // listGroups
  const listGroupsRet = await assetsService.listGroups();
  console.log("🚀 ~ file: demo.js:206 ~ fnTest ~ listGroupsRet:", listGroupsRet) */

  // listTransfers
  /* const listTransfersRet = await assetsService.listTransfers();
  console.log("🚀 ~ file: demo.js:210 ~ fnTest ~ listTransfersRet:", JSON.stringify(listTransfersRet.transfers)) */

  /* //listUtxos
  const listUtxosRet = await assetsService.listUtxos();
  console.log("🚀 ~ file: demo.js:214 ~ fnTest ~ listUtxosRet:", listUtxosRet) */

  //subscribeSendAssetEventNtfns
  /*  assetsService.subscribeSendAssetEventNtfns((response) => {
     console.log('response', response)
   }, (status) => {
     console.log('status', status)
   }, () => {
     console.log('end')
   }) */

  /* //fetchAssetMeta
  const fetchAssetMetaRet = await assetsService.fetchAssetMeta("TaE1V/H+edBzu2mJNVVtWMlPuNxwpfAH1XLfvieKIkk=", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
  console.log("🚀 ~ file: demo.js:228 ~ fnTest ~ fetchAssetMetaRet:", fetchAssetMetaRet) */

  /* //debugLevel
  const debugLevelRet = await assetsService.debugLevel(true, '')
  console.log("🚀 ~ file: demo.js:232 ~ fnTest ~ debugLevelRet:", debugLevelRet) */
}

const fnTestMintAsset = async () => {
  /* 
  // mintAsset
  const asset = {
      asset_type: ASSET_TYPE.NORMAL,
      name: 'TAP2',
      amount: 999
    }
    const ret = await mintService.mintAsset(asset).catch(e => {
      console.warn(e.message)
    })
    console.log("🚀 ~ file: index.js:269 ~ ret ~ ret:", ret) 
  */
  /* // listBatches
  const retListBatches = await mintService.listBatches()
  console.log("🚀 ~ file: demo.js:328 ~ fnTestMintAsset ~ retListBatches:", retListBatches) */

  // finalizeBatch
  /* const retFinal = await mintService.finalizeBatch()
  console.log("🚀 ~ file: demo.js:332 ~ fnTestMintAsset ~ retFinal:", retFinal) */

  /* // cancelBatch
  const retCancelBatch = await mintService.cancelBatch().catch(e => {
    console.log(e.message)
  });
  console.log("🚀 ~ file: demo.js:336 ~ fnTestMintAsset ~ retCancelBatch:", retCancelBatch) */



}

const fnTestUniverse = async () => {

  // info
  const ret = await universeService.info();
  // {runtime_id: { low: 765276518, high: 438833711, unsigned: false },
  // num_assets: { low: 2, high: 0, unsigned: true }}
  console.log("🚀 ~ file: index.js:72 ~ fnTest ~ ret:", ret)


  // queryAssetStats
  /* const { asset_stats } = await universeService.queryAssetStats();
  console.log("🚀 ~ file: index.js:77 ~ fnTest ~ asset_stats:", JSON.stringify(asset_stats.map(item => item.asset_name))) */

  /* 
  // queryAssetRoots
  const { asset_root } = await universeService.queryAssetRoots({ asset_id: 'wsTHhPUFczIrj/g7XGfrzQWYs3WcB8+ML1t14YhWzFw=' })
  console.log("🚀 ~ file: index.js:80 ~ fnTest ~ asset_root:", JSON.stringify(asset_root)) */

  /* 
  // queryEvents
  const ret = await universeService.queryEvents(parseInt(Date.now() / 1000) - 24 * 3600,)
  console.log("🚀 ~ file: index.js:83 ~ fnTest ~ ret:", ret) */

  /* 
  // universeStats
  const { num_total_assets, num_total_syncs, num_total_proofs } = await universeService.universeStats();
  console.log("🚀 ~ file: index.js:86 ~ fnTest ~ ret:", num_total_assets.low, num_total_syncs.low, num_total_proofs.low) */

  /*  
   // assetLeafKeys
   const ret = await universeService.assetLeafKeys({ asset_id: 'wsTHhPUFczIrj/g7XGfrzQWYs3WcB8+ML1t14YhWzFw=' })
   console.log("🚀 ~ file: index.js:89 ~ fnTest ~ ret:", ret) */

  /* 
  // assetLeaves
  const ret = await universeService.assetLeaves({ asset_id: 'wsTHhPUFczIrj/g7XGfrzQWYs3WcB8+ML1t14YhWzFw=' })
  console.log("🚀 ~ file: index.js:92 ~ fnTest ~ ret:", JSON.stringify(ret)) */


  /* 
  // deleteAssetRoot
  const ret = await universeService.deleteAssetRoot({ asset_id: 'wsTHhPUFczIrj/g7XGfrzQWYs3WcB8+ML1t14YhWzFw=' }).catch(e => {
    console.log('e---', e.message)
  })
  console.log("🚀 ~ file: index.js:114 ~ fnTest ~ ret:", ret) */



  /*   // assetRoots
    const { universe_roots } = await universeService.assetRoots();
    const filterRoots = universe_roots.find(item => item.asset_name === 'Test')
    console.log("🚀 ~ file: index.js:95 ~ fnTest ~ ret:", filterRoots) */

  /* 
  // addFederationServer
  const ret = await universeService.addFederationServer([{ host: 'tapd.nostrassets.com', id: 10029 }]).catch(e => {
    console.log(e.message)
  })
  console.log('ret', ret) */



  /* 
  // deleteFederationServer
  const ret = await universeService.deleteFederationServer([{ host: 'tapd.nostrassets.com', id: 10029 }])
  console.log("🚀 ~ file: index.js:122 ~ fnTest ~ ret:", ret)

   */

  /* 
    // listFederationServers
    const { servers } = await universeService.listFederationServers();
    console.log("🚀 ~ file: index.js:98 ~ fnTest ~ servers:", servers) */

  /*  
   // syncUniverse
   const asset_id = "07c7c3c0e08007324570c72128bd3842895f89d5124806e8dfdbc7f50cce71b3"
   const buffer_asset_id = Buffer.from(asset_id, 'hex').toString('base64')
   const retSync = await universeService.syncUniverse('testnet.universe.lightning.finance:10029', 0, []).catch(e => {
     console.log(e.message)
   })
   console.log("🚀 ~ file: index.js:109 ~ fnTest ~ ret:", retSync) */

  /* 
  // insertProof

  const asset =
  {
    "version": 0,
    "asset_genesis": {
      "genesis_point": "5c45823d14a1e1cdbb0cfba21c7cfb514d827552b5a537833d7fa120c524d4b0:1",
      "name": "test987",
      "meta_hash": "0000000000000000000000000000000000000000000000000000000000000000",
      "asset_id": buffer_asset_id,
      "output_index": 0,
      "version": 0
    },
    "asset_type": 0,
    "amount": "100000",
    "lock_time": 0,
    "relative_lock_time": 0,
    "script_version": 0,
    "script_key": "02f1c1ab9d7c11fcefe442e0a1a687a080fc40215565ed9c917129144d0e3acb5a",
    "script_key_is_local": true,
    "asset_group": null,
    "chain_anchor": {
      "anchor_tx": "02000000000101b0d424c520a17f3d8337a5b55275824d51fb7c1ca2fb0cbbcde1a1143d82455c0100000000ffffffff02e80300000000000022512055749820da3c370f67e6868608e7f4da78f88c02503482a89372a32e856173d05b13000000000000225120b5178aedddc6141ac96bc979e4863e8913482713d215d577319beed693e3fb8001401fa9887e7103ad0ca038290643e74be4c74321cb5d1f49e1e722be7ec22d8662a644a85b2d060193dc5a326aabedd8f85b10d4ea8c37dd7990a7e04201c2676500000000",
      "anchor_txid": "475d80acf1208250424222b716a0a1bb88ddd0334818c513a58f34cb7c414818",
      "anchor_block_hash": "0000000000000015a0ff5d8d0e22a248827ff630e71f227a9277dfe3af810fd8",
      "anchor_outpoint": "475d80acf1208250424222b716a0a1bb88ddd0334818c513a58f34cb7c414818:0",
      "internal_key": "032618521583ce709df85496672052d60cf0ebd29015a861afba2a1fcc269ce30c",
      "merkle_root": "7cc3029fafc36c389f4410ccf2952b80d7c648804aab0d7e734e228fcfc1953e",
      "tapscript_sibling": "",
      "block_height": 0
    },
    "prev_witnesses": [],
    "is_spent": false
  }
  const ret = await universeService.insertProof({ id: {}, leaf_key: {} }, { asset: asset, issuance_proof: bufferProof }).catch(e => {
    console.log(e.message)
  })
  console.log("🚀 ~ file: demo.js:239 ~ fnTest ~ ret:", ret) */

  /* 
    // queryProof
    const ret = await universeService.queryProof({ asset_id: "wsTHhPUFczIrj/g7XGfrzQWYs3WcB8+ML1t14YhWzFw=" }, {
      script_key_bytes: "AuvK8FsiS/5HVUeS+EX12gyYqqMWK/uW/NMbJpP9F0O7", op: {
        index: 1
      }
    }).catch(e => {
      console.log('queryProof Error--> ', e.message)
    })
    console.log("🚀 ~ file: index.js:126 ~ fnTest ~ ret:", ret) */

  /* 
  // importProof
  const proof_file = "0000000001fd03980024b0d424c520a17f3d8337a5b55275824d51fb7c1ca2fb0cbbcde1a1143d82455c00000001015000000020ed300b39be50373985025106aa8cb76d2a8f9b632429d4d98b36000000000000cbd1717c266065f4a3c017043c0040182d68e387c18c68cd869a428b2d20a50f2c3bf564ee231d192876025c02cd02000000000101b0d424c520a17f3d8337a5b55275824d51fb7c1ca2fb0cbbcde1a1143d82455c0100000000ffffffff02e80300000000000022512055749820da3c370f67e6868608e7f4da78f88c02503482a89372a32e856173d05b13000000000000225120b5178aedddc6141ac96bc979e4863e8913482713d215d577319beed693e3fb8001401fa9887e7103ad0ca038290643e74be4c74321cb5d1f49e1e722be7ec22d8662a644a85b2d060193dc5a326aabedd8f85b10d4ea8c37dd7990a7e04201c26765000000000382044962976332e720ec7ebf0d9a647195fbe8c085992d3ea09d4af84188704075e6ef1f66958ba677d63ae21f1e13a24a26fb0224c526cb0f7bac9fc95237555a8cd58ffa5ef6a728500d91cf177124b7fd27543d5454b5135a195f37ccdfefcccea06b5dcb73dd5b11c31a9924db5c0ef47d136cb00ab214e426490cf63c84847e0b04f20001000151b0d424c520a17f3d8337a5b55275824d51fb7c1ca2fb0cbbcde1a1143d82455c000000010774657374393837000000000000000000000000000000000000000000000000000000000000000000000000000201000305fe000186a0066901670065000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008020000092102f1c1ab9d7c11fcefe442e0a1a687a080fc40215565ed9c917129144d0e3acb5a059f0004000000000121032618521583ce709df85496672052d60cf0ebd29015a861afba2a1fcc269ce30c02740049000100012007c7c3c0e08007324570c72128bd3842895f89d5124806e8dfdbc7f50cce71b302220000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff012700010001220000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0630012e00040000000101210218e19449597ed74467df2197216c8052dfe4a94f933fa65e9d91ecd2fefd1a8603030201010b040025c8f0f8b2a9f6326b5eedca311f36faf274e91712e6369ebd403b09365f6c4a7f7a97"

 const bufferProof = Buffer.from(proof_file, 'hex').toString('base64')

 const genesis_point = "5c45823d14a1e1cdbb0cfba21c7cfb514d827552b5a537833d7fa120c524d4b0:1"
 const ret = await tapDevService.importProof(bufferProof, genesis_point).catch(e => {
   console.log(e.message)
 });
 console.log("🚀 ~ file: demo.js:292 ~ ret ~ ret:", ret) */

  /*  
  // decodeProof
 const { decoded_proof } = await assetService.decodeProof(bufferProof)
 console.log("🚀 ~ file: demo.js:289 ~ fnTest ~ decodeProof:", decoded_proof) */
}

const fnTestAssetWallet = async () => {

  /*
   //nextScriptKey
  const { script_key } = await assetWalletService.nextScriptKey(110)
  console.log("🚀 ~ file: demo.js:137 ~ fnTest ~ script_key:", script_key) 
  */



  /* const { internal_key } = await assetWalletService.nextInternalKey(111)
  console.log("🚀 ~ file: demo.js:150 ~ fnTest ~ internal_key:", internal_key) */

}

//fnTestAssets();
//fnTestMintAsset();
fnTestUniverse();
//fnTestAssetWallet()
