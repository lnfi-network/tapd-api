const TaprootAssets = require('./index.js');
const domainRegex = /^([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]{1,5})?$/
const globalTaprootAssetsCache = {}
const getTaprootAssets = (req) => {
  const host = req.headers['grpc'] || process.env.GRPC_HOST;
  try {
    const cacheTaprootAssets = globalTaprootAssetsCache[`${host}`];
    if (cacheTaprootAssets) {
      return cacheTaprootAssets
    }
    if (host === process.env.GRPC_HOST) {
      const taprootAsset = new TaprootAssets({
        host: host,
        macaroonFilePath: process.env.MACARNOON_PATH,
        certFilePath: process.env.CERT_FILE_PATH
      })
      globalTaprootAssetsCache[host] = taprootAsset
      return taprootAsset
    } else {
      const macaroonFilePath = `uploads/${host}/${host}.macaroon`
      const certFilePath = `uploads/${host}/${host}.cert`
      const taprootAsset = new TaprootAssets({
        host: host,
        macaroonFilePath: macaroonFilePath,
        certFilePath: domainRegex.test(host) ? "" : certFilePath
      })
      globalTaprootAssetsCache[host] = taprootAsset
      return taprootAsset
    }
  } catch (e) {
    throw new Error('Get TaprootAssetInstance failed.')
  }

}
module.exports = getTaprootAssets