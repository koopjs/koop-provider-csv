const test = require('tape')
const path = require('path')
const fs = require('fs')
const translate = require('../../../src/util/translate-csv')

test('it should convert a CSV string to a geojson', (t) => {
  t.plan(8)

  const csv = fs.readFileSync(path.join(__dirname, '../../fixtures/points.csv'), 'utf-8')
  const geojson = translate(csv)

  t.equal(geojson.type, 'FeatureCollection', 'creates a feature collection object')
  t.ok(geojson.features, 'has features')

  const feature = geojson.features[0]
  t.equal(feature.type, 'Feature', 'has proper type')
  t.equal(feature.geometry.type, 'Point', 'creates point geometry')
  t.deepEqual(feature.geometry.coordinates, [-137,45.67], 'translates geometry correctly')
  t.ok(feature.properties, 'creates attributes')
  t.equal(feature.properties.id, '1', 'translates id field correctly')
  t.equal(feature.properties.density, '2.32', 'translates density field correctly')
})

test('it should remove double quotes', (t) => {
  t.plan(2)

  const csvWithQuotes = fs.readFileSync(path.join(__dirname, '../../fixtures/points-with-quotes.csv'), 'utf-8')
  const geojson = translate(csvWithQuotes)

  const feature = geojson.features[0]
  t.equal(feature.properties.id, '1', 'translates id field correctly')
  t.equal(feature.properties.density, '2.32', 'translates density field correctly')
})
