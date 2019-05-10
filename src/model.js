/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/

const config = require("config");
const fs = require("fs");
const CsvReadableStream = require("csv-reader");
const fetch = require("node-fetch");
const isUrl = require("is-url-superb");
const parse = require("./utils/parse-csv");
const translate = require("./utils/translate-csv");

function Model(koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
Model.prototype.getData = function(req, callback) {
  const source = config.source;

  if (isUrl(source)) {
    // this is a network URL
    fetch(source)
      .then(res => res.text())
      .then(content => {
        const geojson = translate(parse(content, config), config);
        callback(null, geojson);
      })
      .catch(callback);
  } else if (source.toLowerCase().endsWith(".csv")) {
    // this is a file path
    const inputStream = fs.createReadStream(source, "utf8");
    const csv = [];

    inputStream
      .pipe(
        CsvReadableStream({
          trim: true,
          delimiter: config.delimiter
        })
      )
      .on(
        "data",
        function(row) {
          csv.push(row);
        },
        callback
      )
      .on(
        "end",
        function() {
          const geojson = translate(csv, config);
          callback(null, geojson);
        },
        callback
      )
      .on("error", callback);
  } else {
    callback(new Error(`Unrecognized CSV source ${source}`));
  }
};

module.exports = Model;
