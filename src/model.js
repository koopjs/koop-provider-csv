/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/

const koopConfig = require("config");
const fs = require("fs");
const CsvReadableStream = require("csv-reader");
const AutoDetectDecoderStream = require("autodetect-decoder-stream");
const fetch = require("node-fetch");
const isUrl = require("is-url-superb");
const translate = require("./utils/translate-csv");

function Model(koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
Model.prototype.getData = async function(req, callback) {
  const config = koopConfig["koop-provider-csv"];
  const sourceId = req.params.id;
  const sourceConfig = config.sources[sourceId];

  const csv = [];
  let readStream;

  if (isUrl(sourceConfig.url)) {
    // this is a network URL
    const res = await fetch(sourceConfig.url);
    readStream = res.body;
  } else if (sourceConfig.url.toLowerCase().endsWith(".csv")) {
    // this is a file path
    readStream = fs.createReadStream(sourceConfig.url, "utf8");
  } else {
    callback(new Error(`Unrecognized CSV source ${sourceConfig.url}`));
    return;
  }

  readStream
    .pipe(new AutoDetectDecoderStream())
    .pipe(
      CsvReadableStream({
        trim: true,
        parseNumbers: true,
        parseBooleans: true,
        delimiter: sourceConfig.delimiter || ","
      })
    )
    .on(
      "data",
      row => {
        csv.push(row);
      },
      callback
    )
    .on(
      "end",
      () => {
        const geojson = translate(csv, sourceConfig);
        callback(null, geojson);
      },
      callback
    )
    .on("error", callback);
};

module.exports = Model;
