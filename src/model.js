/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/

const config = require('config');
const fs = require('fs')
const CsvReadableStream = require('csv-reader');
const fetch = require('node-fetch');
const isUrl = require('is-url-superb');
const translate = require('./util/translate-csv')

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
Model.prototype.getData = function (req, callback) {
  const source = config.get('source')
  const parseConfig = {
    columnX: config.get('columns.x'),
    columnY: config.get('columns.y'),
    metadata: config.get('metadata'),
  }

  if (isUrl(source)) {
    // this is a network URL
    fetch(source)
      .then((res) => res.text())
      .then((content) => {
        const geojson = translate(content, parseConfig)
        callback(null, geojson)
      })
      .catch(err => callback(err))
  } else if (source.toLowerCase().endsWith('.csv')) {
    const inputStream = fs.createReadStream(source, 'utf8');
    // this is a file path
    const csv = [];
    inputStream
        .pipe(CsvReadableStream({
            parseNumbers: true,
            parseBooleans: true,
            trim: true,
            delimiter: parseConfig.delimiter
        }))
        .on('data', function (row) {
            csv.push(row);
        },(err) => {if(err) callback(err)})
        .on('end', function () {
            // console.log('No more rows!');
            // console.log("csv=",JSON.stringify(csv, null, 4));
            // return
            const geojson = translate(csv, parseConfig)
            callback(null, geojson)
        },(err) => {if(err) callback(err)});
  } else {
    callback(new Error(`Unrecognized CSV source ${source}`))
  }
}

module.exports = Model
