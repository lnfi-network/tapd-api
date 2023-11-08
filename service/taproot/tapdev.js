/* const { getClient } = require('./client.js')
const { convertBuffers } = require('../../utils/index')

const { CLIENT_TYPE } = require('./constant.js')
const { client } = getClient(CLIENT_TYPE.DEV);

const importProof = (proof_file, genesis_point) => {
  const request = {
    proof_file, genesis_point
  }
  return new Promise((resolve, reject) => {
    client.importProof(request, function (err, response) {
      if (err) {
        reject(err)
        return
      }
      resolve(convertBuffers(response))
    })
  })
}

module.exports = {
  importProof
} */