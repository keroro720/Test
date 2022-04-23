# Parking service

## Project stack
- Framework: NodeJs, express
- language: typescript
- test: mocha, chai
- database relational mapping: knex

## Folder Structure
under folder ```/src```
- folder controller: hold endpoint of the app
- folder service: hold bussiness logic of the app
- folder repository: hold data source
- folder unit: hold app unit test

## Preaparation
- please make sure Docker client running locally

## Getting start
- build docker image of the app using
``` docker build . --tag parking-server ```
- run the docker compose
``` docker-compose up ```

## Run locally
- running sql database ``` ${db_name} ```
- initial app using ``` yarn ```
- create ``` .env ``` file outside ```/src ``` (can look for example from .env.example)
- initial table by using ``` yarn knex migrate:latest ```
- to start the app usin ``` yarn dev ```
## Unit test
- the unit test script inside ```/src/unit```

For Unit test run the command below
```
yarn test
```
