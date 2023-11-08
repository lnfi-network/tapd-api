const { convertBuffers } = require('../../utils/index')

const assetWallet = (client) => {

  /**
   * @typedef {import('../../taprootAssets/proto/taprootassets.ts').AssetTransfer} AssetTransfer
   */
  /**
    * AnchorVirtualPsbts merges and then commits multiple virtual transactions in a single BTC level anchor transaction..
    * @param {string} virtual_psbts
    * @returns {Promise<AssetTransfer>}
    */
  const anchorVirtualPsbts = (virtual_psbts) => {
    const request = {
      virtual_psbts
    }
    return new Promise((resolve, reject) => {
      client.anchorVirtualPsbts(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.d.ts').TxTemplate} TxTemplate
   * @typedef {import('../../taprootAssets/proto/assetwallet.d.ts').FundVirtualPsbtResponse} FundVirtualPsbtResponse
   */
  /**
    * FundVirtualPsbt selects inputs from the available asset commitments to fund a virtual transaction matching the template.
    * @param {string} psbt
    * @param {TxTemplate} raw
    * @returns {Promise<FundVirtualPsbtResponse>}
    */
  const fundVirtualPsbt = (psbt, raw) => {
    const request = {
      psbt,
      raw
    }
    return new Promise((resolve, reject) => {
      client.fundVirtualPsbt(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.ts').NextInternalKeyResponse} NextInternalKeyResponse
   */
  /**
    * NextInternalKey derives the next internal key for the given key family and stores it as an internal key in the database to make sure it is identified as a local key later on when importing proofs. While an internal key can also be used as the internal key of a script key, it is recommended to use the NextScriptKey RPC instead, to make sure the tweaked Taproot output key is also recognized as a local key.
    * @param {number} key_family
    * @returns {Promise<NextInternalKeyResponse>}
    */
  const nextInternalKey = (key_family) => {
    const request = {
      key_family
    }
    return new Promise((resolve, reject) => {
      client.nextInternalKey(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.ts').NextScriptKeyResponse} NextScriptKeyResponse
   */
  /**
    * NextScriptKey derives the next script key (and its corresponding internal key) and stores them both in the database to make sure they are identified as local keys later on when importing proofs.
    * @param {number} key_family
    * @returns {Promise<NextInternalKeyResponse>}
    */
  const nextScriptKey = (key_family) => {
    const request = {
      key_family
    }
    return new Promise((resolve, reject) => {
      client.nextScriptKey(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.ts').ProveAssetOwnershipResponse} ProveAssetOwnershipResponse
   */
  /**
    * ProveAssetOwnership creates an ownership proof embedded in an asset transition proof. That ownership proof is a signed virtual transaction spending the asset with a valid witness to prove the prover owns the keys that can spend the asset.
    * @param {string} asset_id
    * @param {string} script_key
    * @returns {Promise<ProveAssetOwnershipResponse>}
    */
  const proveAssetOwnership = (asset_id, script_key) => {
    const request = {
      asset_id, script_key
    }
    return new Promise((resolve, reject) => {
      client.proveAssetOwnership(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }


  /**
    * RemoveUTXOLease removes the lease/lock/reservation of the given managed UTXO.
    * @param {Object} outpoint
    * @param {string} outpoint.txid
    * @param {number} outpoint.output_index
    * @returns {Promise<void>}
    */
  const removeUTXOLease = (outpoint) => {
    const request = {
      outpoint
    }
    return new Promise((resolve, reject) => {
      client.removeUTXOLease(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.ts').SignVirtualPsbtResponse} SignVirtualPsbtResponse
   */
  /**
    * SignVirtualPsbt signs the inputs of a virtual transaction and prepares the commitments of the inputs and outputs.
    * @param {string} funded_psbt
    * @returns {Promise<SignVirtualPsbtResponse>}
    */
  const signVirtualPsbt = (funded_psbt) => {
    const request = {
      funded_psbt
    }
    return new Promise((resolve, reject) => {
      client.signVirtualPsbt(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }

  /**
   * @typedef {import('../../taprootAssets/proto/assetwallet.ts').VerifyAssetOwnershipResponse} VerifyAssetOwnershipResponse
   */

  /**
    * VerifyAssetOwnership verifies the asset ownership proof embedded in the given transition proof of an asset and returns true if the proof is valid.
    * @param {string} proof_with_witness
    * @returns {Promise<VerifyAssetOwnershipResponse>}
    */
  const verifyAssetOwnership = (proof_with_witness) => {
    const request = {
      proof_with_witness
    }
    return new Promise((resolve, reject) => {
      client.verifyAssetOwnership(request, function (err, response) {
        if (err) {
          reject(err)
          return
        }
        resolve(convertBuffers(response))
      })
    })
  }
  return {
    anchorVirtualPsbts,
    fundVirtualPsbt,
    nextInternalKey,
    nextScriptKey,
    proveAssetOwnership,
    removeUTXOLease,
    signVirtualPsbt,
    verifyAssetOwnership
  }
}

module.exports = assetWallet