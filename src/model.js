/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/

const koopConfig = require("config");
const fs = require("fs");
const Papa = require("papaparse");
const fetch = require("node-fetch");
const isUrl = require("is-url-superb");
const translate = require("./utils/translate-csv");

function Model(koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
Model.prototype.getData = async function (req, callback) {
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

  Papa.parse(readStream, {
    header: true,
    dynamicTyping: true,
    complete: function (result) {
      if (result.errors.length > 0) {
        callback(new Error(result.errors[0].message));
      }

      try {
        const geojson = translate(result.data, sourceConfig);
        callback(null, geojson);
      } catch (e) {
        callback(e);
      }
    },
    error: callback,
  });
};

module.exports = Model;
