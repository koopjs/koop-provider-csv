 [![Build Status](https://travis-ci.org/haoliangyu/koop-provider-csv.svg?branch=master)](https://travis-ci.org/haoliangyu/koop-provider-csv)

# koop-provider-csv

A simple CSV provider for [Koop](http://koopjs.github.io/)

This provider works with any API that exports a CSV file with coordinate columns (x and y).

## Configuration

Three environment variables are required to use the provider:
* **URL**: the API URL that exports the CSV file
* **COLUMN_X**: the column name for coordinate x
* **COLUMN_Y**: the column name for coordinate y

Two optional environment variables can be added:
* DELIMITER: CSV delimiter, default to be `,`
* PORT: Koop application port

See `.env.example` as an example

## Test it out
Run server:
- `npm install`
- `npm start`

Tests:
- `npm test`

### Development output callstack logs

During development you can output error callstack with

- `NODE_ENV=test npm start`


## Deploy to AWS Lambda

Koop providers can be quickly deployed and scaled with AWS Lambda. To first create the service:

- `npm run lambda-create`

To deploy code updates

- `npm run lambda-update`

### AWS Lambda configuration

By default, AWS Lambda has a 3 second timeout and only 128MB memory. If your Koop provider uses a slower service, then you should change the AWS Lambda timeout to a higher time limit (e.g. 60 seconds) as well as add more memory (e.g. 512MB).

## With Docker

- `docker build -t koop-provider-sample .`
- `docker run -it -p 8080:8080 koop-provider-sample`

## Publish to npm

- run `npm init` and update the fields
  - Choose a name like `koop-provider-foo`
- run `npm publish`
