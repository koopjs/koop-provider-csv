const splitLines = require("split-lines");

function parse(csv, config = {}) {
  return splitLines(csv.trim()).map(row => parseRow(row.trim(), config));
}

function parseRow(row, config) {
  const delimiter = config.delimiter || ",";
  return row.split(delimiter).map(parseValue);
}

function parseValue(value) {
  const matches = value.match(/^["']?(.*?)["']?$/);
  return matches[1];
}

module.exports = parse;
