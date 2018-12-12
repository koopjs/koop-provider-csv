const splitLines = require("split-lines");

function translate(csv, { columnX, columnY, delimiter = "," }) {
  const rows = splitLines(csv.trim());
  const columns = rows[0].split(delimiter).map(formatString);

  return {
    type: "FeatureCollection",
    features: rows
      .slice(1)
      .map(row =>
        formatFeature(row, columns, { x: columnX, y: columnY }, delimiter)
      )
  };
}

function formatString(value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, value.length - 1);
  }

  return value;
}

function formatFeature(row, columns, coordColumns, delimiter) {
  // Most of what we need to do here is extract the longitude and latitude
  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: []
    }
  };

  const values = row.split(delimiter).map(formatString);

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] === coordColumns.x) {
      feature.geometry.coordinates.unshift(parseFloat(values[i]));
    } else if (columns[i] === coordColumns.y) {
      feature.geometry.coordinates.push(parseFloat(values[i]));
    } else {
      feature.properties[columns[i]] = values[i];
    }
  }

  return feature;
}

module.exports = translate;
