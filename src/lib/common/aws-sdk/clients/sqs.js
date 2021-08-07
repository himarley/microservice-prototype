const SQS = require('aws-sdk/clients/sqs');
const {isLocal} = require('../../helpers')

/**
  helper to update a SQS queue URL to the correct host in a local env.
  this is required to reach the SQS service from within a docker container.
 */
const updateLocalQueueUrl = (params) => {
 if(params.QueueUrl) {
    // the queue URL needs to be modified to use LOCALSTACK_HOSTNAME
    const { QueueUrl } = params
    const url = new URL(QueueUrl)
    url.host = process.env.LOCALSTACK_HOSTNAME || 'localhost'
    url.port =  process.env.EDGE_PORT || 4566
    params.QueueUrl = url.toString()
  }
  return params
}


const patchClient = client => {
  if(isLocal()) {
    client._sendMessage = client.sendMessage
    client.sendMessage = inputParams => {
      let params = inputParams
      if(isLocal()){
        params = updateLocalQueueUrl(params)
      }
      return client._sendMessage(params)
    }
  }
  return client

}

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
  const sqs = new SQS(config) 
  return patchClient(sqs)
}

module.exports = createCustomClient