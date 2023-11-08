// @ts-nocheck
const path = require('path')
const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader')

const protoAsset = path.join(__dirname, '../../taprootAssets/proto/taprootassets.proto')
const protoMint = path.join(__dirname, '../../taprootAssets/proto/mint.proto')
const protoUniverse = path.join(__dirname, '../../taprootAssets/proto/universe.proto')
const protoAssetWallet = path.join(__dirname, '../../taprootAssets/proto/assetwallet.proto')
const protoTapDev = path.join(__dirname, '../../taprootAssets/proto/tapdev.proto')
const { CLIENT_TYPE } = require('./constant.js')

const getClient = (clientType = CLIENT_TYPE.ASSET, { host, macaroonFilePath, certFilePath }) => {
  const loaderOptions = {
    keepCase: true,
    longs: "",
    enums: "",
    defaults: true,
    oneofs: true,
  };
  process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';
  const tlsCert = certFilePath ? fs.readFileSync(certFilePath) : '';
  const sslCreds = grpc.credentials.createSsl(tlsCert, null, null, {
    checkServerIdentity: (ret) => {
      /* console.log('ret', ret) */
    }
  });
  const macaroon = fs.readFileSync(macaroonFilePath).toString('hex');
  const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function (args, callback) {
    let metadata = new grpc.Metadata();
    metadata.add('macaroon', macaroon);
    callback(null, metadata);
  });
  let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
  let packageDefinition = null
  let client = null;
  switch (clientType) {
    case CLIENT_TYPE.ASSET:
      packageDefinition = protoLoader.loadSync(protoAsset, loaderOptions);
      const taprpc = grpc.loadPackageDefinition(packageDefinition).taprpc;
      client = new taprpc.TaprootAssets(host, creds);
      break;
    case CLIENT_TYPE.MINT:
      packageDefinition = protoLoader.loadSync(protoMint, loaderOptions);
      const mintrpc = grpc.loadPackageDefinition(packageDefinition).mintrpc;
      client = new mintrpc.Mint(host, creds);
      break;
    case CLIENT_TYPE.UNIVERSE:
      packageDefinition = protoLoader.loadSync(protoUniverse, loaderOptions);
      const universerpc = grpc.loadPackageDefinition(packageDefinition).universerpc;
      client = new universerpc.Universe(host, creds);
      break;
    case CLIENT_TYPE.ASSETWALLET:
      packageDefinition = protoLoader.loadSync(protoAssetWallet, loaderOptions);
      const assetwalletrpc = grpc.loadPackageDefinition(packageDefinition).assetwalletrpc;
      client = new assetwalletrpc.AssetWallet(host, creds);
      break;
    case CLIENT_TYPE.DEV:
      packageDefinition = protoLoader.loadSync(protoTapDev, loaderOptions);
      const tapdevrpc = grpc.loadPackageDefinition(packageDefinition).tapdevrpc;
      client = new tapdevrpc.TapDev(host, creds);
      break;
    default:
      packageDefinition = protoLoader.loadSync(protoAsset, loaderOptions);
      const rpc = grpc.loadPackageDefinition(packageDefinition).taprpc;
      client = new rpc.TaprootAssets(host, creds);
  }

  return client
}
module.exports = { getClient }