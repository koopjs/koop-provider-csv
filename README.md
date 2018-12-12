[![npm version](https://badge.fury.io/js/koop-provider-csv.svg)](https://badge.fury.io/js/koop-provider-csv) [![Build Status](https://travis-ci.org/haoliangyu/koop-provider-csv.svg?branch=master)](https://travis-ci.org/haoliangyu/koop-provider-csv)

# koop-provider-csv

A simple CSV provider for [Koop](http://koopjs.github.io/)

This provider works with a CSV file with coordinate columns (x and y).

## Configuration

This provider uses [config](https://github.com/lorenwest/node-config) for configuration. The configuration files are within the `config` folder.

A configuration should look like this:

``` javascript
{
  // required:
  // 1. CSV source path, a local file path or a URL
  "source": "example.csv",
  // 2. service name
  "sourceName": "csv",
  // 3. coordinate column names
  "columns": {
    "x": "longitude",
    "y": "latitude"
  },
  // optional:
  // 1. delimiter
  "delimiter": ",",
  // 2. test server port
  "port": 8080
}

```

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
