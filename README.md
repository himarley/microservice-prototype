# microservice-prototype

Project to build a proof of concept for a local development environment.  Integrates localstack and serverless so that developers can seamlessly 

- devops - full local environment with ability to seed databases
-

## setup/ test

1. to start local stack: `cd src/resources/local-stack; docker-compose up`
2. install top level repo ()
3. install the repo (this should do everything via npm 7 workspaces) `npm ci`
   workspace install not presently working - manually install the following:
   `cd src/lib/common; npm ci`
   `cd src/resources/infrastructure/queues; npm ci; sls deploy --stage local`
   `cd src/services/phone-connector; npm ci; sls deploy --stage local`
4. to invoke an example lambda function that invokes another locally: `cd src/services/phone-connector; npx sls invoke -f send-sms`

note: you can actually deploy these stacks to AWS by removing `stage --local` from the deploy and invoke commands above
## TODO

