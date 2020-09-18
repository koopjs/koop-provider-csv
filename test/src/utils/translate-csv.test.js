const test = require("tape");
const translate = require("../../../src/utils/translate-csv");

test("it should convert parsed CSV to a geojson", (t) => {
  t.plan(8);

  const csv = [
    {
      id: 1,
      density: 2.32,
      latitude: 45.67,
      longitude: -137,
    },
    {
      id: 2,
      density: 5.674,
      latitude: 8.34,
      longitude: 67,
    },
  ];
  const geojson = translate(csv, {
    geometryColumns: {
      longitude: "longitude",
      latitude: "latitude",
    },
    metadata: {
      idField: "id",
    },
  });

  t.equal(
    geojson.type,
    "FeatureCollection",
    "creates a feature collection object"
  );
  t.ok(geojson.features, "has features");

  const feature = geojson.features[0];
  t.equal(feature.type, "Feature", "has proper type");
  t.equal(feature.geometry.type, "Point", "creates point geometry");
  t.deepEqual(
    feature.geometry.coordinates,
    [-137, 45.67],
    "translates geometry correctly"
  );
  t.ok(feature.properties, "creates attributes");
  t.equal(feature.properties.id, 1, "translates id field correctly");
  t.equal(
    feature.properties.density,
    2.32,
    "translates density field correctly"
  );
});
