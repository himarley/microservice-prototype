const DynamoDB = require('aws-sdk/clients/dynamodb');
const {isLocal} = require('../../helpers');

const createConfig = ({isLocal}) => {
  const useLocal = isLocal || isLocal()
  if(useLocal) {
    const host = process.env.LOCALSTACK_HOSTNAME || 'localhost'
    const port = process.env.EDGE_PORT || 4566
    config = {
      endpoint: `http://${host}:${port}`,
      region: 'localhost'
    }
  }
  return config
}
/**
 * Creates a custom aws lambda client
 */
 const createCustomClient = ({isLocal}) => {
  const config = createConfig({isLocal})
  return new DynamoDB(config)
}

const createDocumentClient = ({isLocal}) => {
  const config = createConfig({isLocal})
  return new DynamoDB.DocumentClient(config)
}

module.exports = {
  createCustomClient,
  createDocumentClient
}