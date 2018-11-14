/*
  model-test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/

const test = require('tape')
const proxyquire = require('proxyquire')
const fetchMock = require('fetch-mock')
const dotEnv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotEnv.config({
  path: path.join(__dirname, '../.env.test')
})

const csv = fs.readFileSync(path.join(__dirname, '../fixtures/points.csv'), 'utf-8')

test('should properly fetch from the API and translate features', t => {
  const fetch = fetchMock
    .sandbox()
    .mock('points.csv', csv)

  const Model = proxyquire('../../src/model', {
    'node-fetch': fetch
  })
  const model = new Model()

  model.getData({}, (err, geojson) => {
    t.error(err, 'no error')
    t.equal(geojson.type, 'FeatureCollection', 'creates a feature collection object')
    t.ok(geojson.features, 'has features')

    const feature = geojson.features[0]
    t.equal(feature.type, 'Feature', 'has proper type')
    t.equal(feature.geometry.type, 'Point', 'creates point geometry')
    t.deepEqual(feature.geometry.coordinates, [-137,45.67], 'translates geometry correctly')
    t.ok(feature.properties, 'creates attributes')
    t.equal(feature.properties.id, '1', 'translates id field correctly')
    t.equal(feature.properties.density, '2.32', 'translates density field correctly')

    t.end()
  })
})
