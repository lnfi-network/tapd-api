
const { convertBuffers } = require('../../utils/index')
const assets = (client) => {
  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ListAssetResponse} ListAssetResponse
   */
  /**
    * ListAssets lists the set of assets owned by the target daemon.
    * @param {import("../../taprootAssets/proto/taprootassets.ts").ListAssetRequest} listAssetRequest
    * @returns {Promise<ListAssetResponse>} 
    */
  const listAssets = (listAssetRequest) => {
    let request = listAssetRequest || { with_witness: true, include_spent: false, include_leased: false }
    return new Promise((resolve, reject) => {
      client.listAssets(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      });
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').SendAssetResponse} SendAssetResponse
   */
  /**
    * SendAsset uses one or multiple passed Taproot Asset address(es) to attempt to complete an asset send. The method returns information w.r.t the on chain send, as well as the proof file information the receiver needs to fully receive the asset.
    * @param {string[]} tap_addrs
    * @returns {Promise<SendAssetResponse>} 
    */
  const sendAsset = (tap_addrs = []) => {
    const request = {
      tap_addrs
    }
    return new Promise((resolve, reject) => {
      client.sendAsset(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ListBalancesResponse} ListBalancesResponse
   */
  /**
    * ListBalances lists asset balances.
    * @param {Boolean} asset_id
    * @param {Boolean} group_key
    * @param {string} asset_filter
    * @param {string} group_key_filter
    * @returns {Promise<ListBalancesResponse>} 
    */
  const listBalances = (asset_id = true, group_key = true, asset_filter = null, group_key_filter = null) => {
    const request = {
      asset_id,
      group_key,
      asset_filter,
      group_key_filter
    }
    return new Promise((resolve, reject) => {
      client.listBalances(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').QueryAddrResponse} QueryAddrResponse
   */
  /**
    * QueryAddrs queries the set of Taproot Asset addresses stored in the database.
    * @param {number} created_after
    * @param {number} created_before
    * @param {number} limit
    * @param {number} offset
    * @returns {Promise<QueryAddrResponse>} 
    */
  const queryAddrs = (created_after = 0, created_before = 0, limit = 10, offset = 0) => {
    const request = {
      created_after,
      created_before,
      limit,
      offset,
    }
    return new Promise((resolve, reject) => {
      client.queryAddrs(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').Addr} Addr
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ScriptKey} ScriptKey
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').KeyDescriptor} KeyDescriptor
   */
  /**
    * NewAddr makes a new address from the set of request params.
    * @param {object} addr
    * @param {string} addr.asset_id
    * @param {number} addr.amt
    * @param {ScriptKey} addr.script_key
    * @param {KeyDescriptor} addr.internal_key
    * @param {string} addr.tapscript_sibling
    * @param {string} addr.proof_courier_addr
    * @returns {Promise<Addr>}
  */
  const newAddr = (addr) => {
    const request = {
      ...addr
    }
    return new Promise((resolve, reject) => {
      client.newAddr(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
    * DecodeAddr decode a Taproot Asset address into a partial asset message that represents the asset it wants to receive.
    * @param {string} addr
    * @returns {Promise<Addr>}
  */
  const decodeAddr = (addr) => {
    const request = {
      addr,
    }
    return new Promise((resolve, reject) => {
      client.decodeAddr(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').AddrEventStatus} AddrEventStatus
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').AddrReceivesResponse} AddrReceivesResponse
   */
  /**
    List all receives for incoming asset transfers for addresses that were created previously.
     * @param {string} filter_addr
     * @param {AddrEventStatus} filter_status
     * @returns {Promise<AddrReceivesResponse>} 
  */
  const addrReceives = (filter_addr, filter_status) => {
    const request = {
      filter_addr,
      filter_status
    }
    return new Promise((resolve, reject) => {
      client.addrReceives(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').DebugLevelResponse} DebugLevelResponse
   */
  /**
    DebugLevel allows a caller to programmatically set the logging verbosity of tapd. The logging can be targeted according to a coarse daemon-wide logging level, or in a granular fashion to specify the logging for a target sub-system.
     * @param {boolean} show
     * @param {string} level_spec
     * @returns {Promise<DebugLevelResponse>} 
  */
  const debugLevel = (show, level_spec) => {
    const request = {
      show,
      level_spec
    }
    return new Promise((resolve, reject) => {
      client.debugLevel(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').DecodeProofResponse} DecodeProofResponse
   */
  /**
    DecodeProof attempts to decode a given proof file into human readable format.
     * @param {string} raw_proof
     * @param {number} proof_at_depth
     * @param {boolean} with_prev_witnesses
     * @param {boolean} with_meta_reveal
     * @returns {Promise<DecodeProofResponse>} 
  */
  const decodeProof = (raw_proof, proof_at_depth, with_prev_witnesses, with_meta_reveal) => {
    const request = {
      raw_proof, proof_at_depth, with_prev_witnesses, with_meta_reveal
    }
    return new Promise((resolve, reject) => {
      client.decodeProof(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {Object} ExportProofResponse
   * @property {string} raw_proof
   * @property {string } genesis_point
   */
  /**
    ExportProof exports the latest raw proof file anchored at the specified script_key.
     * @param {string} asset_id
     * @param {number} script_key
     * @returns {Promise<ExportProofResponse>} 
  */
  const exportProof = (asset_id, script_key) => {
    const request = {
      asset_id, script_key
    }
    return new Promise((resolve, reject) => {
      client.exportProof(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {Object} FetchAssetMetaResponse
   * @property {string} data
   * @property {object} type
   * @property {string } meta_hash
   */
  /**
    FetchAssetMeta allows a caller to fetch the reveal meta data for an asset either by the asset ID for that asset, or a meta hash.
     * @param {string} asset_id
     * @param {string} meta_hash
     * @returns {Promise<FetchAssetMetaResponse>} 
  */
  const fetchAssetMeta = (asset_id, meta_hash) => {
    const request = {
      asset_id, meta_hash
    }
    return new Promise((resolve, reject) => {
      client.fetchAssetMeta(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').GetInfoResponse} GetInfoResponse
   */
  /**
    GetInfo returns the information for the node.
     * @returns {Promise<GetInfoResponse>} 
  */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      client.getInfo({}, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ListGroupsResponse} ListGroupsResponse
   */
  /**
    ListGroups lists the asset groups known to the target daemon, and the assets held in each group.
     * @returns {Promise<ListGroupsResponse>} 
  */
  const listGroups = () => {
    return new Promise((resolve, reject) => {
      client.listGroups({}, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ListTransfersResponse} ListTransfersResponse
   */
  /**
    ListTransfers lists outbound asset transfers tracked by the target daemon.
     * @returns {Promise<ListTransfersResponse>} 
  */
  const listTransfers = () => {
    return new Promise((resolve, reject) => {
      client.listTransfers({}, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').ListUtxosResponse} ListUtxosResponse
   */
  /**
    ListUtxos lists the UTXOs managed by the target daemon, and the assets they hold.
     * @param {boolean} include_leased
     * @returns {Promise<ListUtxosResponse>} 
  */
  const listUtxos = (include_leased = true) => {
    return new Promise((resolve, reject) => {
      client.listUtxos({ include_leased }, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').StopResponse} StopResponse
   */
  /**
    StopDaemon will send a shutdown request to the interrupt handler, triggering a graceful shutdown of the daemon.
     * @returns {Promise<StopResponse>} 
  */
  const stopDaemon = (include_leased = true) => {
    return new Promise((resolve, reject) => {
      client.stopDaemon({ include_leased }, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @callback onData
   * @param {object} response
   * @callback onStatus
   * @param {string} response
   * @callback onEnd
   */
  /**
     * SubscribeSendAssetEventNtfns registers a subscription to the event notification stream which relates to the asset sending process.
     * @param {onData} onData
     * @param {onStatus} onStatus
     * @param {onEnd} onEnd
  */
  const subscribeSendAssetEventNtfns = (onData, onStatus, onEnd) => {
    const call = client.subscribeSendAssetEventNtfns({});
    call.on('data', onData)
    onStatus && call.on('status', onStatus)
    onEnd && call.on('end', onEnd);
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').VerifyProofResponse} VerifyProofResponse
   */
  /**
     * VerifyProof attempts to verify a given proof file that claims to be anchored at the specified genesis point.
     * @param {string} raw_proof
     * @param {string} genesis_point
     * @returns {Promise<VerifyProofResponse>} 
  */
  const verifyProof = (raw_proof, genesis_point) => {
    const request = {
      raw_proof,
      genesis_point
    }
    return new Promise((resolve, reject) => {
      client.verifyProof(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  return {
    listAssets,
    sendAsset,
    listBalances,
    queryAddrs,
    newAddr,
    decodeAddr,
    addrReceives,
    debugLevel,
    decodeProof,
    exportProof,
    fetchAssetMeta,
    getInfo,
    listGroups,
    listTransfers,
    listUtxos,
    stopDaemon
  }

}
module.exports = assets