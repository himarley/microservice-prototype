# microservice-prototype

Project to build a proof of concept for a local development environment.  Integrates localstack and serverless so that developers can seamlessly deploy services to AWS or run locally via localstack.

Tools in use:

- serverless 2.x
- serverless-localstack to enable simple integration: https://github.com/localstack/serverless-localstack
- localstack: 

here is an overview of the service architecture in this demo.

![service architecture](https://github.com/himarley/microservice-prototype/blob/84b292599dc21973b15dd1faf4aac40b05a78ad9/ls-demo.png?raw=true)
## setup/ test

1. to start local stack: `cd src/resources/local-stack; docker-compose up`
2. install dependencies && deploy resources to localstack
   - `cd src/lib/common; npm ci`
   - `cd src/resources/infrastructure; npm ci; sls deploy`
   - `cd src/services/consumer; npm ci; sls deploy`
   - `cd src/services/producer; npm ci; sls deploy`

3. the producer stack contains lambdas which will invoke the consumer via 3 options: direct lambda, queue (SQS), pub/sub (SNS)
   to test these patterns, you can cd into the producer stack and invoke them via:
   - sls invoke -f queue
   - sls invoke -f topic
   - sls invoke -f direct

   additionally, the direct invoke lambda has been exposed via API Gateway to test that path.  You can invoke it via curl where the URL
   will be in this format: `http://localhost:4566/restapis/${API_ID}/${STAGE}/_user_request_/direct-invoke`

## Hot reloading

1. to deploy and use hot reloading (nodemon) locally, cd into one of the two services and run: `npm run start`

**NOTE:** needs `setup steps` prior using hot reloading

note: you can actually deploy these stacks to AWS by removing `stage --local` from the deploy and invoke commands above
## TODO

- script wrappers?
- resource utilization (how many tables, how many lambdas?)
- prove out all required access patterns (lambda -> lambda, lambda -> sqs -> lambda, lambda -> sns -> sqs -> lambda)
- more research about how to managed mixed resources (depends on the answer to resource utilization)
- limit docker services (lambda, SNS, SQS, dynamo)
