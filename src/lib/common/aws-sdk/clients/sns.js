const SNS = require('aws-sdk/clients/sns');

const {isLocal} = require('../../helpers');

/**
 * Creates a custom aws lambda client
 * @param {*} param0 
 */
 const createCustomClient = () => {
  let config = {}
  if(isLocal()) {
    const host = process.env.LOCALSTACK_HOSTNAME || 'localhost'
    const port = process.env.EDGE_PORT || 4566
    config = {
      endpoint: `http://${host}:${port}`,
      region: 'localhost'
    }
  }
  return new SNS(config)
}

module.exports = createCustomClient
