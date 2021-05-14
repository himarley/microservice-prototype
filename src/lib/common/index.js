const useLocal = process.env.stage === 'local'
const AWS = require('aws-sdk')

module.exports = {
  AWS: AWS
}