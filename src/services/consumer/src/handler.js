const service = require('./service')

const direct = async(event, context) => {
  const msg = `successfully invoked consumer with payload ${JSON.stringify(event)}`
  console.log(msg)
  return msg
}

const queue = async(event, context) => {
  const msg = `successfully invoked from queue with payload ${JSON.stringify(event)}`
  const result = await service.processNewMessages(event.Records)
  console.log(msg)
  return msg
}

module.exports = {
  direct,
  queue
}