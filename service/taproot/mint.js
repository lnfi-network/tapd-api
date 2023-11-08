const { convertBuffers } = require('../../utils/index')


const mint = (client) => {
  /**
   * @typedef {import('../../taprootAssets/proto/mint.ts').MintAsset} MintAsset
   * @typedef {import('../../taprootAssets/proto/mint.ts').MintAssetResponse} MintAssetResponse
   */
  /**
    * MintAsset will attempt to mint the set of assets (async by default to ensure proper batching) specified in the request.
    * @param {MintAsset} asset
    * @param {boolean} enable_emission
    * @param {boolean} short_response
    * @returns {Promise<MintAssetResponse>}
    */
  const mintAsset = (asset, enable_emission = true, short_response = true) => {
    const request = {
      asset,
      enable_emission,
      short_response
    }
    return new Promise((resolve, reject) => {
      client.mintAsset(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/mint.ts').FinalizeBatchResponse} FinalizeBatchResponse
   */
  /**
    * FinalizeBatch will attempt to finalize the current pending batch.
    * @param {boolean} short_response
    * @returns {Promise<FinalizeBatchResponse>}
    */
  const finalizeBatch = (short_response = true) => {
    const request = {
      short_response
    }
    return new Promise((resolve, reject) => {
      client.finalizeBatch(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/mint.ts').CancelBatchResponse} CancelBatchResponse
   */
  /**
    * CancelBatch will attempt to cancel the current pending batch.
    * @returns {Promise<CancelBatchResponse>}
    */
  const cancelBatch = () => {
    return new Promise((resolve, reject) => {
      client.cancelBatch({}, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/mint.ts').ListBatchResponse} ListBatchResponse
   */
  /**
    * ListBatches lists the set of batches submitted to the daemon, including pending and cancelled batches.
    * @param {string} batch_key
    * @returns {Promise<ListBatchResponse>}
    */
  const listBatches = (batch_key) => {
    return new Promise((resolve, reject) => {
      client.listBatches({ batch_key }, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  return {
    mintAsset,
    finalizeBatch,
    cancelBatch,
    listBatches
  }
}
module.exports = mint