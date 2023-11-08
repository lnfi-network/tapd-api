const assets = require('./assets.js');

const mint = require('./mint.js')

const universe = require('./universe.js')

const assetWallet = require('./assetWallet.js')

const { getClient } = require('./client.js')

const { CLIENT_TYPE } = require('./constant.js')

class TaprootAssets {
  constructor({ host, macaroonFilePath, certFilePath }) {
    this.host = host
    this.macaroonFilePath = macaroonFilePath
    this.certFilePath = certFilePath
  }
  _setClientType(clientType) {
    const host = this.host
    const macaroonFilePath = this.macaroonFilePath
    const certFilePath = this.certFilePath
    this.client = getClient(clientType, { host: host, macaroonFilePath: macaroonFilePath, certFilePath: certFilePath })
  }
  getAssetsService() {
    this._setClientType(CLIENT_TYPE.ASSET)
    return assets(this.client)
  }
  getAssetWalletService() {
    this._setClientType(CLIENT_TYPE.ASSETWALLET)
    return assetWallet(this.client)
  }
  getMintService() {
    this._setClientType(CLIENT_TYPE.MINT)
    return mint(this.client)
  }
  getUniverseService() {
    this._setClientType(CLIENT_TYPE.UNIVERSE)
    return universe(this.client)
  }
}

module.exports = TaprootAssets