const db = require('./db')

const processNewMessages = async(messages) => {
  for(const message of messages){
    console.log(message)
    // TODO: error handling
    const {messageId, eventSource, body} = message
    await db.addNewMessage({eventId: messageId, eventSource, body})
  }
}

module.exports = {
  processNewMessages
}