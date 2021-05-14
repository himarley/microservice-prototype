const Lambda = require('aws-sdk/clients/lambda');
const {isLocal} = require('../../helpers')
// below is not needed currently but will eventually be needed
// aws-sdk clients are not ES6 classes and so cannot be extended
// instead monkey patching the methods as needed
// this is where we could add standardized handling for interservice calls (we could copy this for SNS, SQS, (and HTTP))
// const patchClient = client => {
//   client._invoke = client.invoke
//   client.invoke = params => {
//     return client._invoke(params)
//   }
// }

/**
 * Creates a custom aws lambda client
 * @param {*} param0 
 */
const createCustomClient = () => {
  const useLocal = isLocal()
  if(useLocal) {
    const host = process.env.LOCALSTACK_HOSTNAME || localhost
    const port = process.env.EDGE_PORT || 4566
    config = {
      endpoint: `http://${host}:${port}`,
      region: 'localhost'
    }
  }
  return new Lambda(config)
}

module.exports = createCustomClient
