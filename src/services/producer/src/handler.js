const lambda = require('@himarley/common/aws-sdk/clients/lambda')()
const sqs = require('@himarley/common/aws-sdk/clients/sqs')()
const sns = require('@himarley/common/aws-sdk/clients/sns')()

const direct = async(event, context) => {
  const stage = process.env.STAGE
  const response = await lambda.invoke({FunctionName : `lsdemo-consumer-${stage}-direct-invoke`}).promise()
  console.log(response)
  return response
}

const queue = async(event, context) => {
  const params = {
    QueueUrl: process.env.MY_QUEUE_URL,
    MessageBody: "test-message"
  }
  const response = await sqs.sendMessage(params).promise()
  return response
}

const topic = async(event, context) => {
  const params = {
    TopicArn: process.env.MY_TOPIC_ARN,
    Message: "test-message"
  }
  const response = await sns.publish(params).promise()
  return response
}

module.exports = {
  direct,
  queue,
  topic
}