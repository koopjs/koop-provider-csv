function translate(csv, { columnX, columnY, metadata }) {
  const columns = csv[0];
  let maxIdValue = 0;
  let replaceIds = false;
  let auxId = {value: 1};

  if(findMaxIdValue(csv, metadata) > 2147483647){
      replaceIds = true;
  }

  return {
    type: "FeatureCollection",
    features: csv
      .slice(1)
      .map(row =>
        formatFeature(row, columns, { x: columnX, y: columnY }, metadata.idField, replaceIds, auxId)
    ),
    metadata: {
        name: metadata.name, // Get the workbook name before ! symbol and set as layer name
        description: metadata.description,
        idField: metadata.idField,
    }
  };;
}

function findMaxIdValue(csv, metadata){
    const numRows = csv.length;
    let idFieldPos = csv[0].indexOf(metadata.idField);
    let i = 1;
    let maxIdValue = 0;

    do{
        maxIdValue = (csv[i][idFieldPos] > maxIdValue)? csv[i][idFieldPos] : maxIdValue;
        i++;
    }while(i < numRows);

    return maxIdValue;
}

function formatFeature(values, columns, coordColumns, idField, replaceIds, auxId) {
  // Most of what we need to do here is extract the longitude and latitude
  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: []
    }
  };

  let hasId = false;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i] === coordColumns.x) {
      feature.geometry.coordinates.unshift(parseFloat(values[i]));
    } else if (columns[i] === coordColumns.y) {
      feature.geometry.coordinates.push(parseFloat(values[i]));
    } else {
      if(columns[i] == idField){
          // Ensure idField is in the valid range
          hasId = true;
          if(replaceIds){
              feature.properties[columns[i]] = auxId.value;
              auxId.value++;
          }else{
              feature.properties[columns[i]] = values[i]
          }
      }else{
          feature.properties[columns[i]] = values[i];
      }
    }
  }

  if(Number.isNaN(feature.geometry.coordinates[0]) || Number.isNaN(feature.geometry.coordinates[1])){
      console.warn(`This feature has no coordinates: ${JSON.stringify(feature, null, 2)}`);
      console.warn('Setting to [0, 0])');
      feature.geometry.coordinates = [0, 0];
  }

  if(!hasId){
      let obj = Object.assign({}, values);
      console.warn(`This feature has no idField ('${idField}'): ${JSON.stringify(obj, null, 2)}`);
  }
  return feature;
}

module.exports = translate;
