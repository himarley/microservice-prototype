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

the services in this repo support hot reloading whereby code changes are immediately propogating out to the localstack lambda service.

1. to deploy and use hot reloading (nodemon) locally, cd into one of the two services and run: `npm run start`

**NOTE:** needs `setup steps` prior using hot reloading

note: you can actually deploy these stacks to AWS by removing `stage --local` from the deploy and invoke commands above

## Debug

for the purposes of demoing debug capabilities, the nodejs lambda containers are spun up by local stack with the `--inspect-brk` flag, which will pause the lambda container until a debugger is connected.  The included vs code project includes debug configurations to connect to these lambdas.  In this initial configuration, up to two lambda containers can exist simultaneously and they will be exposed for debug on ports 9230 and 9231.  As lambda containers are spun up and destroyed, they will repurpse these two ports, so the developer needs to maintain a connection on both ports to keep lambdas executing.  Luckily, this is simple using the provided debug configuration as it will continue to reconnect after the initial connection is made.

- trigger a lamdba container using the above instructions.  the container will pause and wait for the connection
- using the vs code IDE, connect to the process and debug as needed.

## TODO

- script wrappers?
- resource utilization (how many tables, how many lambdas?)
- prove out all required access patterns (lambda -> lambda, lambda -> sqs -> lambda, lambda -> sns -> sqs -> lambda)
- more research about how to managed mixed resources (depends on the answer to resource utilization)
- limit docker services (lambda, SNS, SQS, dynamo)
