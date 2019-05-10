# koop-provider-csv

[![npm](https://img.shields.io/npm/v/koop-provider-csv.svg)](https://www.npmjs.com/package/koop-provider-csv) [![Build Status](https://travis-ci.org/haoliangyu/koop-provider-csv.svg?branch=master)](https://travis-ci.org/haoliangyu/koop-provider-csv)

A simple CSV provider for [Koop](http://koopjs.github.io/)

This provider works with a CSV file with coordinate columns (`x` and `y`).

## Configuration

This provider uses [config](https://github.com/lorenwest/node-config) for configuration.

A configuration should look like this:

```javascript
{
  // required:
  // CSV source path, a local file path or a URL
  "source": "example.csv",
  // service name
  "sourceName": "csv",
  // coordinate column names
  "columns": {
    "x": "longitude",
    "y": "latitude"
  },
  // optional:
  // delimiter
  "delimiter": ",",
  // test server port
  "port": 8080,
  // ArcGIS service metadata
  "metadata":{
    "name": "service name",
    "description": "service description",
    "idField": "id column name"
  },
}

```

## Test it out

Run server:

- `npm install`
- `npm start`

Tests:

- `npm test`

## License

MIT
