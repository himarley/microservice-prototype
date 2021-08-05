const lambda = require('@himarley/common/aws-sdk/clients/lambda')()

const sendSMS = async (event, context) => {
  const stage = process.env.STAGE
  const response = await lambda.invoke({ FunctionName: `phone-connector-${stage}-test` }).promise()
  console.log(response)
  return response
}

const test1 = async (event, context) => {
  const test = process.env
  return test
}

const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'hello world!',
        input: event,
      },
      null,
      2
    ),
  };
}
module.exports = {
  sendSMS,
  test1,
  hello
}
