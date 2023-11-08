var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path')
const multer = require('multer');
const axios = require('axios');
var { sendResponse, convertHexObjToBase64Obj, domainRegex, ipRegex } = require('../utils/index')
const getTaprootAssets = require('../service/taproot/getTaorootAssets')
const memopoolRequest = axios.create({
  baseURL: process.env.BTC_API_BASE_URL,
  timeout: 10000
})
// getHost
router.get('/node/host', async function (req, res) {
  sendResponse(res, 0, 'success', { host: req.headers.grpc || process.env.GRPC_HOST })
});
/* listAssets */
router.get('/assets/list', async function (req, res) {
  const { withWitness = true, includeSpent = false, includeLeased = false } = req.query
  try {
    const assetsService = getTaprootAssets(req).getAssetsService();
    const retAssetList = await assetsService.listAssets({ with_witness: withWitness, include_spent: includeSpent, include_leased: includeLeased })
    const { assets = [] } = retAssetList
    sendResponse(res, 0, 'success', assets)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }

});

// listTransfers
router.get('/assets/listTransfers', async function (req, res) {
  try {
    const assetsService = getTaprootAssets(req).getAssetsService();
    const retAssetList = await assetsService.listTransfers()
    sendResponse(res, 0, 'success', retAssetList)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
});
// addrReceives
router.get('/assets/addrReceives', async function (req, res) {
  try {
    const { filterAddr, filterStatus } = req.query
    const assetsService = getTaprootAssets(req).getAssetsService();
    const retAddrReceives = await assetsService.addrReceives(filterAddr, filterStatus)
    sendResponse(res, 0, 'success', retAddrReceives)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
});
//decodeAddr
router.post('/assets/decodeAddr', async function (req, res) {
  try {
    const { addr } = req.body
    const assetsService = getTaprootAssets(req).getAssetsService();
    const retDecodeAddr = await assetsService.decodeAddr(addr)
    sendResponse(res, 0, 'success', retDecodeAddr)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }

})
//newAddr
router.post('/assets/newAddr', async function (req, res) {
  try {
    if (!req.body) {
      sendResponse(res, 400, 'params error.', null)
      return;
    }
    const assetsService = getTaprootAssets(req).getAssetsService();
    const { assetId, amt, scriptKey, internalKey } = req.body
    let postData = {
      asset_id: assetId,
      amt: Number(amt),
      script_key: scriptKey,
      internal_key: internalKey
    }
    postData = convertHexObjToBase64Obj(postData)
    const retNewAddr = await assetsService.newAddr(postData)
    sendResponse(res, 0, 'success', retNewAddr)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
})
//sendAsset
router.post('/assets/sendAsset', async function (req, res) {
  try {
    if (!req.body) {
      sendResponse(res, 400, 'params error.', null)
      return;
    }
    const { addrs } = req.body
    if (!addrs || !addrs.length || !Array.isArray(addrs)) {
      sendResponse(res, 400, 'params error', null)
      return;
    }
    const assetsService = getTaprootAssets(req).getAssetsService();
    const { transfers } = await assetsService.listTransfers();
    const transferLength = transfers ? transfers.length : 0;
    const lastTransfer = transfers[transferLength - 1];
    if (lastTransfer) {
      const outputs = lastTransfer.outputs
      const tx = outputs[outputs.length - 1].anchor.outpoint.split(':')[0]

      const ret = await memopoolRequest.get(`api/tx/${tx}`);
      if (ret?.data?.txid === tx) {
        if (!ret.data.status.confirmed) {

          throw new Error(`The previous transaction ${tx} has not been completed yet. Please try again later`)

        }
      } else {
        throw new Error('Get transaction failed.')
      }
    }
    const retSendAsset = await assetsService.sendAsset(addrs)
    sendResponse(res, 0, 'success', retSendAsset)
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
})
//mintAsset
router.post('/mint/mintAsset', async function (req, res) {
  try {
    if (!req.body) {
      sendResponse(res, 400, 'params error', null)
      return;
    }
    const { assetType = 0, name, amount, assetMeta, groupKey, groupAnchor, enableEmission = true } = req.body
    let asset = {
      name: name,
      amount: amount,
      asset_type: assetType,
      asset_meta: assetMeta,
      group_key: groupKey,
      group_anchor: groupAnchor
    }
    const mintService = getTaprootAssets(req).getMintService();
    const retSendAsset = await mintService.mintAsset(asset, enableEmission, true)
    //console.log("🚀 ~ file: taproot.js:141 ~ retSendAsset:", retSendAsset)
    if (retSendAsset?.pending_batch?.batch_key) {
      const retFinalizeBath = await mintService.finalizeBatch()
      sendResponse(res, 0, 'success', retFinalizeBath)
    } else {
      throw new Error(`Mint asset ${name} failed.`)
    }
    /* if (retSendAsset.batch_key) {
      const retFinalizeBath = await mintService.finalizeBatch()

      sendResponse(res, 0, 'success', retFinalizeBath)
    } */

  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }

})
//syncUniverse
router.post('/universe/syncUniverse', async function (req, res) {
  try {
    if (!req.body) {
      sendResponse(res, 400, 'params error', null)
      return;
    }
    const { universeHost, syncMode = 1, syncTarget = null } = req.body
    let postData = {
      universe_host: universeHost,
      sync_mode: syncMode,
      sync_targets: syncTarget
    }
    postData = convertHexObjToBase64Obj(postData)
    postData.sync_targets = postData.sync_targets.map(syncTarget => ({
      id: {
        asset_id: syncTarget,
        proof_type: 0
      }
    }))
    const universeService = getTaprootAssets(req).getUniverseService();
    const ret = await universeService.syncUniverse(postData.universe_host, postData.sync_mode, postData.sync_targets)
    sendResponse(res, 0, 'success', ret);
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }

})
//queryAssetInfo
router.get('/universe/info', async function (req, res) {
  try {
    const universeService = getTaprootAssets(req).getUniverseService();
    const ret = await universeService.info()
    const { num_assets } = ret
    sendResponse(res, 0, 'success', num_assets);
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
})
//queryAssetStats
router.get('/universe/queryAssetStats', async function (req, res) {
  const { assetNameFilter, assetIdFilter, assetTypeFilter = 1, sortBy = 1, direction = 0, offset = 0, limit = 0 } = req.query
  try {
    let queryData = {
      asset_name_filter: assetNameFilter,
      asset_id_filter: assetIdFilter,
      asset_type_filter: assetTypeFilter,
      sort_by: sortBy,
      offset: Number(offset),
      limit: Number(limit),
      direction
    }
    queryData = convertHexObjToBase64Obj(queryData)
    const universeService = getTaprootAssets(req).getUniverseService();
    const ret = await universeService.queryAssetStats(queryData);
    const { asset_stats } = ret
    sendResponse(res, 0, 'success', asset_stats);
  } catch (err) {
    sendResponse(res, 500, err.message, null)
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const grpc = req.body.universeHost
    const filePath = `uploads/${grpc}/`;
    fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    const grpc = req.body.universeHost
    const extendName = path.extname(file.originalname)
    const fileName = `${grpc}${extendName}`
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage, limits: { fileSize: 20 * 1000 } }).array('file', 2);
//upload universe host
router.post('/universe/setting', async function (req, res) {
  if (!req.headers['nick']) {
    sendResponse(res, 400, 'Parameter error, Nick and universeHost are required', null)
    return
  }
  upload(req, res, function (err) {

    if (err) {
      sendResponse(res, 500, err.message, null)
      return;
    }
    sendResponse(res, 0, 'success', 'upload request submitted.');
  });
})

router.get('/universe/hosts', async function (req, res) {
  try {
    const hosts = fs.readdirSync(`uploads/`) || []
    const filterHosts = hosts.filter(host => (domainRegex.test(host) || ipRegex.test(host)))
    const retHosts = process.env.GRPC_HOST ? [process.env.GRPC_HOST, ...filterHosts] : filterHosts
    sendResponse(res, 0, 'success', retHosts);
  } catch (err) {
    if (err.message.indexOf('no such file or directory') > -1) {
      sendResponse(res, 0, 'success', []);
    } else {
      sendResponse(res, 500, err.message, null)
    }
  }

})

module.exports = router;
