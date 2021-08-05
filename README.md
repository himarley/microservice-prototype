# microservice-prototype

Project to build a proof of concept for a local development environment.  Integrates localstack and serverless so that developers can seamlessly deploy services to AWS or run locally via localstack.

Tools in use:

- serverless 2.x
- serverless-localstack to enable simple integration: https://github.com/localstack/serverless-localstack
- localstack: 
## setup/ test

1. to start local stack: `cd src/resources/local-stack; docker-compose up`
2. install top level repo ()
3. install the repo (this should do everything via npm 7 workspaces) `npm ci`
   workspace install not presently working - manually install the following:
   `cd src/lib/common; npm ci`
   `cd src/resources/infrastructure/queues; npm ci; sls deploy --stage local`
   `cd src/services/phone-connector; npm ci; sls deploy --stage local`
4. to invoke an example lambda function that invokes another locally: `cd src/services/phone-connector; npx sls invoke -f send-sms`

## Hot reloading

1. to deploy and use hot reloading (nodemon) locally: `cd src/services/phone-connector;npm run start`


note: you can actually deploy these stacks to AWS by removing `stage --local` from the deploy and invoke commands above
## TODO

- script wrappers?
- resource utilization (how many tables, how many lambdas?)
- prove out all required access patterns (lambda -> lambda, lambda -> sqs -> lambda, lambda -> sns -> sqs -> lambda)
- more research about how to managed mixed resources (depends on the answer to resource utilization)
- limit docker services (lambda, SNS, SQS, dynamo)
