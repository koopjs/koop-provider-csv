const splitLines = require("split-lines");

function translate(csv, { columnX, columnY, metadata }) {
  const columns = csv[0];

  return {
    type: "FeatureCollection",
    features: csv
      .slice(1)
      .map(row =>
        formatFeature(row, columns, { x: columnX, y: columnY }, metadata.idField)
    ),
    metadata: {
        name: metadata.name, // Get the workbook name before ! symbol and set as layer name
        description: metadata.description,
        idField: metadata.idField,
    }
  };
}

function formatFeature(values, columns, coordColumns, idField) {
  // Most of what we need to do here is extract the longitude and latitude
  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: []
    }
  };

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] === coordColumns.x) {
      feature.geometry.coordinates.unshift(parseFloat(values[i]));
    } else if (columns[i] === coordColumns.y) {
      feature.geometry.coordinates.push(parseFloat(values[i]));
    } else {
      if(columns[i] == idField){
          // Ensure idField is in the valid range
          if(values[i] > 2147483647){
              feature.properties[columns[i]] = parseInt(values[i] - Math.pow(10, (10 - values[i].toString().length) * -1));
              while(feature.properties[columns[i]] > 2147483647){
                  feature.properties[columns[i]] = parseInt(feature.properties[columns[i]]/2);
              }
          }else{
              feature.properties[columns[i]] = values[i]
          }
      }else{
          feature.properties[columns[i]] = values[i];
      }
    }
  }
  return feature;
}

module.exports = translate;
