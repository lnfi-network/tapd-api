const { convertBuffers } = require('../../utils/index')

const universe = (client) => {
  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').AssetLeafKeyResponse} AssetLeafKeyResponse
   */
  /**
    * AssetLeafKeys queries for the set of Universe keys associated with a given asset_id or group_key. Each key takes the form: (outpoint, script_key), where outpoint is an outpoint in the Bitcoin blockcahin that anchors a valid Taproot Asset commitment, and script_key is the script_key of the asset within the Taproot Asset commitment for the given asset_id or group_key.
    * @param {object} id
    * @param {string} id.asset_id
    * @param {string} id.group_key
    * @param {number} id.proof_type
    * @returns {Promise<AssetLeafKeyResponse>} Promise object AssetLeafKeyResponse
    */
  const assetLeafKeys = (id) => {
    const request = id
    return new Promise((resolve, reject) => {
      client.assetLeafKeys(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').AssetLeafResponse} AssetLeafResponse
   */
  /**
    * AssetLeaves queries for the set of asset leaves (the values in the Universe MS-SMT tree) for a given asset_id or group_key. These represents either asset issuance events (they have a genesis witness) or asset transfers that took place on chain. The leaves contain a normal Taproot Asset proof, as well as details for the asset.
    * @param {object} id
    * @param {string} id.asset_id
    * @param {string} id.group_key
    * @param {number} id.proof_type
    * @returns {Promise<AssetLeafResponse>} Promise object AssetLeafKeyResponse
    */
  const assetLeaves = (id) => {
    const request = id
    return new Promise((resolve, reject) => {
      client.assetLeaves(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').AssetRootResponse} AssetRootResponse
   */
  /**
    * AssetRoots queries for the known Universe roots associated with each known asset. These roots represent the supply/audit state for each known asset.
    * @returns {Promise<AssetRootResponse>}  
    */
  const assetRoots = () => {
    const request = null
    return new Promise((resolve, reject) => {
      client.assetRoots(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').InfoResponse} InfoResponse
   */
  /**
    * Info returns a set of information about the current state of the Universe..
    * @returns {Promise<InfoResponse>}  { runtime_id:int64,num_assets:uint64 }
    */
  const info = () => {
    const request = {}
    return new Promise((resolve, reject) => {
      client.info(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @enum {number}
   */
  const AssetFilterType = {
    FILTER_ASSET_NONE: 0,
    FILTER_ASSET_NORMAL: 1,
    FILTER_ASSET_COLLECTIBLE: 2
  }

  /**
   * @enum {number}
   */
  const AssetQuerySort = {
    SORT_BY_NONE: 0,
    SORT_BY_ASSET_NAME: 1,
    SORT_BY_ASSET_ID: 2,
    SORT_BY_ASSET_TYPE: 3,
    SORT_BY_TOTAL_SYNCS: 4,
    SORT_BY_TOTAL_PROOFS: 5,
    SORT_BY_GENESIS_HEIGHT: 6
  }


  /**
    * tapcli universe stats assets QueryAssetStats returns a set of statistics for a given set of assets. Stats can be queried for all assets, or based on the: asset ID, name, or asset type. Pagination is supported via the offset and limit params. Results can also be sorted based on any of the main query params.
    * @param {object} assetStatsQuery
    * @param {string} assetStatsQuery.asset_name_filter
    * @param {string}  assetStatsQuery.asset_id_filter
    * @param {AssetFilterType} assetStatsQuery.asset_type_filter
    * @param {AssetQuerySort} assetStatsQuery.sort_by
    * @param {number} assetStatsQuery.offset
    * @param {number} assetStatsQuery.limit
    * @param {number} assetStatsQuery.direction  -- 0|1
    * @returns {Promise<object>} 
    */
  const queryAssetStats = (assetStatsQuery) => {
    const request = { ...assetStatsQuery }
    return new Promise((resolve, reject) => {
      client.queryAssetStats(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').QueryRootResponse} QueryRootResponse
   */
  /**
    * QueryAssetRoots attempts to locate the current Universe root for a specific asset. This asset can be identified by its asset ID or group key.
    * @param {object} id
    * @param {string} id.asset_id
    * @param {string} id.group_key
    * @param {number} id.proof_type
    * @returns {Promise<QueryRootResponse>} Promise object represents UniverseRoot
    */
  const queryAssetRoots = (id) => {
    const request = {
      id
    }
    return new Promise((resolve, reject) => {
      client.queryAssetRoots(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').QueryEventsResponse} QueryEventsResponse
   */
  /**
    * QueryEvents returns the number of sync and proof events for a given time period, grouped by day.
    * @param {number} start_timestamp
    * @param {number} end_timestamp
    * @returns {Promise<QueryEventsResponse>} Promise object represents GroupedUniverseEvents[]
    */
  const queryEvents = (start_timestamp, end_timestamp) => {
    const request = {
      start_timestamp,
      end_timestamp
    }
    return new Promise((resolve, reject) => {
      client.queryEvents(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').Asset} Asset
   * @typedef {import('../../taprootAssets/proto/universe.ts').AssetProofResponse} AssetProofResponse
   */
  /**
    * InsertProof attempts to insert a new issuance or transfer proof into the Universe tree specified by the UniverseKey. If valid, then the proof is inserted into the database, with a new Universe root returned for the updated asset_id/group_key.
    * @param {object} key
    * @param {string} key.group_key
    * @param {string} key.asset_id
    * @param {object} asset_leaf
    * @param {Asset} asset_leaf.asset
    * @param {string} asset_leaf.issuance_proof
    * @returns {Promise<AssetProofResponse>}
    */
  const insertProof = (key, asset_leaf) => {
    const request = {
      key,
      asset_leaf
    }
    return new Promise((resolve, reject) => {
      client.insertProof(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
    * QueryProof attempts to query for an issuance or transfer proof for a given asset based on its UniverseKey. A UniverseKey is composed of the Universe ID (asset_id/group_key) and also a leaf key (outpoint || script_key). If found, then the issuance proof is returned that includes an inclusion proof to the known Universe root, as well as a Taproot Asset state transition or issuance proof for the said asset.
    * @param {object} id
    * @param {string} id.group_key
    * @param {string} id.asset_id
    * @param {object} leaf_key
    * @param {string} leaf_key.op_str
    * @param {string} leaf_key.script_key_str
    * @param {string} leaf_key.script_key_string
    * @param {object} leaf_key.op
    * @param {string} leaf_key.op.hash_str
    * @param {number} leaf_key.op.index
    * @returns {Promise<AssetProofResponse>}
    */
  const queryProof = (id, leaf_key) => {
    const request = {
      id,
      leaf_key
    }
    return new Promise((resolve, reject) => {
      client.queryProof(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {Object} StatsResponse
   * @property {number} num_total_assets
   * @property {number} num_total_groups
   * @property {number} num_total_syncs
   * @property {number} num_total_proofs
   */

  /**
   * Returns a set of aggregate statistics for the current state of the Universe.
   * Stats returned include: total number of syncs, total number of proofs, and total number of known assets.
   * @returns {Promise<StatsResponse>} A promise that resolves to the statistics response.
   */
  const universeStats = () => {
    const request = {
    }
    return new Promise((resolve, reject) => {
      client.universeStats(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {Object} UniverseFederationServer
   * @property {string} host
   * @property {number} id
   */
  /**
    * AddFederationServer adds a new server to the federation of the local Universe server. Once a server is added, this call can also optionally be used to trigger a sync of the remote server.
    * @param {UniverseFederationServer} servers
    * @returns {Promise<void>}
    */
  const addFederationServer = (servers) => {
    const request = { servers }
    return new Promise((resolve, reject) => {
      client.addFederationServer(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })

  }



  /**
    * DeleteFederationServer removes a server from the federation of the local Universe server.
    * @param {Array<UniverseFederationServer>} servers --[{host:'',id:number}]
    * @returns {Promise<void>}
    */
  const deleteFederationServer = (servers) => {
    const request = {
      servers
    }
    return new Promise((resolve, reject) => {
      client.deleteFederationServer(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
    * ListFederationServers lists the set of servers that make up the federation of the local Universe server. This servers are used to push out new proofs, and also periodically call sync new proofs from the remote server.
    * @returns {Promise<UniverseFederationServer[]>}  
    */
  const listFederationServers = () => {
    const request = null
    return new Promise((resolve, reject) => {
      client.listFederationServers(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @enum {number}
   */
  const UniverseSyncMode = {
    SYNC_ISSUANCE_ONLY: 0,
    SYNC_FULL: 1,
  }


  /**
   * @typedef {Object} ID
   * @property {string} asset_id
   * @property {string} group_key
   * @property {number} proof_type -- 0|1|2
   */
  /**
   * @typedef {import('../../taprootAssets/proto/universe.ts').SyncResponse} SyncResponse
   */
  /**
    * SyncUniverse takes host information for a remote Universe server, then attempts to synchronize either only the set of specified asset_ids, or all assets if none are specified. The sync process will attempt to query for the latest known root for each asset, performing tree based reconciliation to arrive at a new shared root.
    * @param {string} universe_host
    * @param {UniverseSyncMode} sync_mode
    * @param {Array<ID>} sync_targets
    * @returns {Promise<SyncResponse>}
    */
  const syncUniverse = (universe_host, sync_mode, sync_targets) => {
    const request = {
      universe_host,
      sync_mode,
      sync_targets
    }
    return new Promise((resolve, reject) => {
      client.syncUniverse(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
    * DeleteAssetRoot deletes the Universe root for a specific asset, including all asoociated universe keys, leaves, and events.
    * @param {object} id
    * @param {string} id.asset_id
    * @param {string} id.group_key
    * @param {number} id.proof_type -- 0|1|2
    * @returns {Promise<void>}
    */
  const deleteAssetRoot = (id) => {
    const request = {
      id
    }
    return new Promise((resolve, reject) => {
      client.deleteAssetRoot(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  return {
    AssetQuerySort,
    AssetFilterType,
    assetLeafKeys,
    assetLeaves,
    assetRoots,
    listFederationServers,
    info,
    queryAssetStats,
    queryAssetRoots,
    queryEvents,
    insertProof,
    queryProof,
    universeStats,
    addFederationServer,
    syncUniverse,
    deleteAssetRoot,
    deleteFederationServer
  }
}

module.exports = universe