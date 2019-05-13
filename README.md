# koop-provider-csv

[![npm](https://img.shields.io/npm/v/koop-provider-csv.svg)](https://www.npmjs.com/package/koop-provider-csv) [![Build Status](https://travis-ci.org/haoliangyu/koop-provider-csv.svg?branch=master)](https://travis-ci.org/haoliangyu/koop-provider-csv)

A configurable and reusable [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) provider for [Koop](http://koopjs.github.io/)

This provider can load a CSV file from a local path or a remote endpoint. The provided CSV file must include columns of latitude and longitude coordinates.

## Features

- fully configurable
- support multiple CSV sources
- support local file path or remote endpoint
- parse boolean and numeric values automatically
- stream processing

## Installation

with npm

```bash
npm install koop-provider-csv
```

with [Koop CLI](https://github.com/koopjs/koop-cli) for your Koop app

`bash koop add koop-provider-csv`

## Usage

Once installed, this provider enables routes like

```
/koop-provider-csv/:id/FeatureServer/*
```

where `id` is the unique ID for a source CSV defined in the configuration file.

For example, this route allows to query a CSV file with ID `my-csv`:

```
/koop-provider-csv/my-csv/FeatureServer/0/query
```

## Configuration

This provider is configured with [config](https://github.com/lorenwest/node-config) and all configuration files are in the `config` directory.

A configuration looks like this:

```javascript
{
  // configuration namespace for this provider plugin
  "koop-provider-csv": {
    // define one or multiple CSV sources
    "sources": {
      // a unique ID for each source, which is used in the query route
      "my-data": {
        // [required] a file path or a URL for the source CSV
        "url": "path_to_csv",
        // [required] point coordinate columns
        "geometryColumns": {
          "longitude": "longitude_column_name",
          "latitude": "latitude_column_name"
        },
        // [optional] delimiter character
        "delimiter": ",",
        // [optional] ArcGIS service metadata
        "metadata": {
          "idField": "id_column_name"
        }
      }
    }
  }
}

```

See `config/example.json` for a full example.

## Development

This provider is created by [Koop CLI](https://github.com/koopjs/koop-cli) and it is recommended to use the CLI tool during your development.

### Run server

```bash
koop serve
```

A dev server will be set up at `http://localhost:8080`.

### Run test

```bash
koop test
```

## License

MIT
