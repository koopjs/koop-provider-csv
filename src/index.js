const config = require("config")["koop-provider-csv"];

// Define the provider path
// /:name/:id(csv-source-id)/FeatureServer/:layer/:method
// e.g. /csv/my-csv/FeatureServer/0/query
const provider = {
  type: "provider",
  name: config.name,
  hosts: false,
  disableIdParam: false,
  Model: require("./model"),
  version: require("../package.json").version
};

module.exports = provider;
