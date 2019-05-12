const packageInfo = require("../package.json");

// Define the provider path
// /:name/:id(csv-source-id)/FeatureServer/:layer/:method
// e.g. /koop-provider-csv/my-csv/FeatureServer/0/query
const provider = {
  type: "provider",
  name: packageInfo.name,
  version: packageInfo.version,
  hosts: false,
  disableIdParam: false,
  Model: require("./model")
};

module.exports = provider;
