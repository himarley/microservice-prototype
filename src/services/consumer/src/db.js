const docClient = require('@himarley/common/aws-sdk/clients/dynamodb').createDocumentClient({localOverride: true})

const addNewMessage =(record) => {
  //expected properties {eventId, eventSource, message}
  console.log(record)
  return docClient.put({TableName: 'my-dynamo-table', Item: record}).promise()
}

module.exports = {
  addNewMessage
}