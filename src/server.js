// clean shutdown on `cntrl + c`
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

const config = require('config')

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the Sample Provider
const provider = require('./')
koop.register(provider)

if (process.env.DEPLOY === 'export') {
  module.exports = koop.server
} else {
  // Set port for configuration or fall back to default
  const port = config.get('port') || 8080
  koop.server.listen(port)

  const message = `

  Koop CSV Provider listening on ${port}
  For more docs visit: https://koopjs.github.io/docs/specs/provider/
  To find providers visit: https://www.npmjs.com/search?q=koop+provider

  Try it out in your browser: http://localhost:${port}/csv/FeatureServer/0/query
  Or on the command line: curl --silent http://localhost:${port}/csv/FeatureServer/0/query?returnCountOnly=true

  Press control + c to exit
  `
  console.log(message)
}
