
const fs = require('fs');

const dynamoDB = require('@himarley/common/aws-sdk/clients/dynamodb').createCustomClient({localOverride: true})
const docClient = require('@himarley/common/aws-sdk/clients/dynamodb').createDocumentClient({localOverride: true})

const loadSeedFile = () => {
  // we could eventually support yaml or json if so desired
  const seedFileType = '.js'
  const seedFilePath = `${process.env.PWD}/src/seed${seedFileType}`
  let seedData;
  if (fs.existsSync(seedFilePath)) {
    seedData = require(seedFilePath)
  }
  return seedData
}

const seedTable = async ({tableName, records}) => {
  const {TableNames} = await dynamoDB.listTables().promise()
  console.log(`Seeding table ${tableName}`)
  if(!TableNames.includes(tableName)) {
    console.log(`WARNING: table ${tableName} does not exist.  skipping seed operation.`)
  }
  const tableInfo = await dynamoDB.describeTable({TableName: tableName}).promise()
  // there is probably a smarter way to do this, but for now just run the seed if the table is empty
  if(tableInfo.Table.ItemCount > 0) {
    console.log(`Table ${tableName} already has records.  skipping seed.`)
    return false
  }
  // TODO: improve to bulk writing
  for(const record of records){
    console.log(record)
    // TODO: error handling
    await docClient.put({TableName: tableName, Item: record}).promise()
  }
}


;(async () => {
  const seedData = loadSeedFile()
  if(!seedData) {
    console.log('no seed data defined for this service.  skipping seeding.')
    process.exit()
  }
  for (const table of seedData) {
    await seedTable(table)
  }
})()
