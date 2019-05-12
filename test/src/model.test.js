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
const { Readable } = require("stream");

test("it should send a request for a URL", t => {
  t.plan(3);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: "http://my-site.com/points.csv",
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude"
          },
          metadata: {
            idField: "id"
          }
        }
      }
    }
  };

  const csv = fs.readFileSync(
    path.join(__dirname, "../fixtures/points.csv"),
    "utf-8"
  );

  const readable = new Readable();
  readable.push(csv);
  readable.push(null);

  const fetch = fetchMock
    .sandbox()
    .mock("http://my-site.com/points.csv", readable, { sendAsJson: false });

  const Model = proxyquire("../../src/model", {
    "node-fetch": fetch,
    config
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
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
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: path.join(__dirname, "../fixtures/points.csv"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude"
          },
          metadata: {
            idField: "id"
          }
        }
      }
    }
  };

  const Model = proxyquire("../../src/model", {
    config
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
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
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: path.join(__dirname, "../fixtures/points.csv"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude"
          },
          metadata: {
            idField: "id"
          }
        }
      }
    }
  };

  const Model = proxyquire("../../src/model", {
    config
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.ok(geojson.features, "has features");
  });
});
