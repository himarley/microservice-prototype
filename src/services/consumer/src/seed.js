module.exports = [
  {
    tableName: "my-dynamo-table",
    partitionKey: "eventId",
    records: [
      {
        eventId: '354e3ec9-0cdb-9fbd-eb39-a13459236661',
        eventSource: 'aws:sqs',
        body: 'test-message'
      },
    ]
  }
]