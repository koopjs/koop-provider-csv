# koop-provider-csv

[![npm](https://img.shields.io/npm/v/koop-provider-csv.svg)](https://www.npmjs.com/package/koop-provider-csv) [![Build Status](https://travis-ci.org/haoliangyu/koop-provider-csv.svg?branch=master)](https://travis-ci.org/haoliangyu/koop-provider-csv)

A configurable and reusable CSV provider for [Koop](http://koopjs.github.io/)

This provider can loads a CSV file having coordinate columns (`x` and `y`) from a local file path or a remote URL.

## Configuration

This provider uses [config](https://github.com/lorenwest/node-config) for configuration.

A configuration should look like this:

```javascript
{
  // namespace for this provider plugin
  "koop-provider-csv": {
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
    // ArcGIS service metadata
    "metadata":{
      "name": "service name",
      "description": "service description",
      "idField": "id column name"
    }
  }
}

```

## Development

This provider is created by [Koop CLI](https://github.com/koopjs/koop-cli) and it is recommended to use the CLI tool during your development.

### Run dev server

```bash
koop serve
```

### Run test

```bash
koop test
```

## License

MIT
