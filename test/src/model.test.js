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

test("it should throw an error if no path or url is provided", (t) => {
  t.plan(2);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {},
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
    t.ok(err, "has error");
    t.notok(geojson, "geojson does not exist");
  });
});

test("it should throw an error if both path and url are provided", (t) => {
  t.plan(2);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: "http://test.com/test.csv",
          path: "./test.csv",
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
        },
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
    t.ok(err, "has error");
    t.notok(geojson, "geojson does not exist");
  });
});

test("it should send a request for a URL", (t) => {
  t.plan(3);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: "http://my-site.com/points.csv",
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
          metadata: {
            idField: "id",
          },
        },
      },
    },
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
    config,
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

test("it should load the local file for a file path with .csv using the 'url' property", (t) => {
  t.plan(3);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: path.join(__dirname, "../fixtures/points.csv"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
          metadata: {
            idField: "id",
          },
        },
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
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

test("it should load the local file for a file path with .CSV using the 'url' property", (t) => {
  t.plan(3);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          url: path.join(__dirname, "../fixtures/points.CSV"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
          metadata: {
            idField: "id",
          },
        },
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
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

test("it should load a single file with a glob pattern", (t) => {
  t.plan(4);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          path: path.join(__dirname, "../fixtures/points.csv"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
          metadata: {
            idField: "id",
          },
        },
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.equal(geojson.features.length, 2, "only one file is loaded");
    t.ok(geojson.features, "has features");
  });
});

test("it should load multiple files with a glob pattern", (t) => {
  t.plan(4);

  const config = {
    "koop-provider-csv": {
      name: "csv",
      sources: {
        test: {
          path: path.join(__dirname, "../fixtures/*.csv"),
          geometryColumns: {
            longitude: "longitude",
            latitude: "latitude",
          },
          metadata: {
            idField: "id",
          },
        },
      },
    },
  };

  const Model = proxyquire("../../src/model", {
    config,
  });
  const model = new Model();

  model.getData({ params: { id: "test" } }, (err, geojson) => {
    t.error(err, "no error");
    t.equal(
      geojson.type,
      "FeatureCollection",
      "creates a feature collection object"
    );
    t.equal(geojson.features.length, 4, "multiple files are loaded");
    t.ok(geojson.features, "has features");
  });
});
