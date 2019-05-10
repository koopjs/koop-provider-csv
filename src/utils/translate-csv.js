function translate(csv, config) {
  const columns = csv[0];
  const metadata = config.metadata;

  if (metadata.idField && !columns.includes(metadata.idField)) {
    console.warn(`Specified ID field "${metadata.idField}" is not found.`);
  }
  return {
    type: "FeatureCollection",
    features: csv
      .slice(1)
      .map(row =>
        formatFeature(row, columns, config.columns, metadata.idField)
      ),
    metadata: {
      name: metadata.name,
      description: metadata.description,
      idField: metadata.idField
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
    } else if (columns[i] == idField) {
      if (isValidId(values[i])) {
        feature.properties[columns[i]] = parseInt(values[i]);
      } else {
        console.warn(`Invalid ID value: ${values[i]}`);
      }
    } else {
      feature.properties[columns[i]] = values[i];
    }
  }

  if (!isValidGeometry(feature.geometry)) {
    console.warn(
      `Invalid coordinates: ${feature.geometry.coordinates}, setting to [0, 0]`
    );
    feature.geometry.coordinates = [0, 0];
  }

  return feature;
}

// Max ID value supported by feature server:
// https://koopjs.github.io/docs/usage/provider#setting-provider-metadata-in-getdata
function isValidId(value) {
  const parsedValue = parseInt(value);
  return 0 <= parsedValue && parsedValue <= 2147483647;
}

function isValidGeometry(geometry) {
  return (
    !Number.isNaN(geometry.coordinates[0]) &&
    !Number.isNaN(geometry.coordinates[1])
  );
}

module.exports = translate;
