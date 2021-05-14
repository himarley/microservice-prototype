# microservice-prototype

Project to build future Microservices.  This will demonstrate how we want to build and create services in the following dimensions:

- devops - full local environment with seeded databases
- Architecture - example of how to break down and define microservice boundaries across interfaces
- Architecture - loose coupling between services via events and queues
- Code best practices - demonstrating practical implementations
- shared code - starting point for future common shared code modules

## setup

This is very primitive for now, we can gradually add automation as the patterns we want to use congeal

1. to start local stack: `cd src/resources/local-stack; docker-compose up`
2. install the repo (this should do everything via npm 7 workspaces) `npm ci`
3. Install/Deploy example service to a local docker container (only one for now) `cd src/services/phone-connector; sls deploy --stage local`
   Note: i'm pretty sure without serverless-webpack the structure here won't work when deployed
4. seed DB: `node ../../devops/seed.js`

## TODO

intention is to start fleshing out 3 services: phone-connector, directory (previously called contact), and conversation

use cases:
verifying a user (with some hardcoding)
sending a message to a conversation (only SMS users for now)

in the process of doing this we will define and iterate on the domain models and events that are required for these services to function, then dive into implementing them to develop our implementation strategy.  We will take inspiration from DDD but we may not ultimately implement a full layered architecture with a seperated domain model.  We need to consider the benefits vs. complexity tradeoff.

devops:

- verify local SNS/SQS (in particular, lambda triggers)
- make the common module publishable
- autotrigger DB seeding post deployment
- integrate typescript support
- integtate webpack support
