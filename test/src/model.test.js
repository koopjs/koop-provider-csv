/*
  model-test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/

const test = require("tape");
const proxyquire = require("proxyquire");
const fetchMock = require("fetch-mock");
const fs = require("fs");
const path = require("path");

test("it should send a request for a URL", t => {
  t.plan(3);

  const config = {
    source: "http://my-site.com/points.csv",
    "column.x": "longitude",
    "column.y": "latitude"
  };

  const csv = fs.readFileSync(
    path.join(__dirname, "../fixtures/points.csv"),
    "utf-8"
  );

  const fetch = fetchMock.sandbox().mock("http://my-site.com/points.csv", csv);

  const Model = proxyquire("../../src/model", {
    "node-fetch": fetch,
    config: {
      get(path) {
        return config[path];
      }
    }
  });
  const model = new Model();

  model.getData({}, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.ok(geojson.features, "has features");
  });
});

test("it should load the local file for a file path with .csv", t => {
  t.plan(3);

  const config = {
    source: path.join(__dirname, "../fixtures/points.csv"),
    "column.x": "longitude",
    "column.y": "latitude"
  };

  const Model = proxyquire("../../src/model", {
    config: {
      get(path) {
        return config[path];
      }
    }
  });
  const model = new Model();

  model.getData({}, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.ok(geojson.features, "has features");
  });
});

test("it should load the local file for a file path with .CSV", t => {
  t.plan(3);

  const config = {
    source: path.join(__dirname, "../fixtures/points.CSV"),
    "column.x": "longitude",
    "column.y": "latitude"
  };

  const Model = proxyquire("../../src/model", {
    config: {
      get(path) {
        return config[path];
      }
    }
  });
  const model = new Model();

  model.getData({}, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.ok(geojson.features, "has features");
  });
});
