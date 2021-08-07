const DynamoDB = require('aws-sdk/clients/dynamodb');
const {isLocal} = require('../../helpers');

const createConfig = ({localOverride}) => {
  const useLocal = localOverride || isLocal()
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
 const createCustomClient = ({localOverride}) => {
  const config = createConfig({localOverride})
  return new DynamoDB(config)
}

const createDocumentClient = ({localOverride}) => {
  const config = createConfig({localOverride})
  return new DynamoDB.DocumentClient(config)
}

module.exports = {
  createCustomClient,
  createDocumentClient
}