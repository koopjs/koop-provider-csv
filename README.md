# koop-provider-csv

[![npm](https://img.shields.io/npm/v/koop-provider-csv.svg)](https://www.npmjs.com/package/koop-provider-csv) [![Build Status](https://travis-ci.org/koopjs/koop-provider-csv.svg?branch=master)](https://travis-ci.org/koopjs/koop-provider-csv)

A configurable and reusable [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) provider for [Koop](http://koopjs.github.io/), created with [Koop CLI](https://github.com/koopjs/koop-cli)

This provider can load a CSV file from a local path or a remote endpoint. The provided CSV file must include columns of latitude and longitude coordinates.

## Features

- fully configurable
- support multiple CSV sources
- support local file path or remote endpoint
- parse boolean and numeric values automatically
- stream processing

## Installation

with npm

``` bash
npm install koop-provider-csv
```

with [Koop CLI](https://github.com/koopjs/koop-cli) for your Koop app

``` bash
koop add provider koop-provider-csv
```

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
      "my-csv": {
        // [required] a file path or a URL for the source CSV
        "url": "path_to_csv",
        // [required] point coordinate columns
        "geometryColumns": {
          "longitude": "longitude_column_name",
          "latitude": "latitude_column_name"
        },
        // [optional] ArcGIS service metadata
        // See https://koopjs.github.io/docs/development/provider/model#adding-provider-metadata-to-the-geojson
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

### Run dev server

```bash
$ npm start
```

A dev server will be running at `http://localhost:8080`. By default, it will use with `NODE_ENV=dev` and the dev configuration `config/dev.json` should be created beforehand.

### Run tests

```bash
$ npm test
```

## License

MIT
