const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:4200',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: ['**/*.spec.js'],//my version of the specPattern option will run all the tests in the cypress/integration directory.
    // specPattern: 'cypress / e2e/**/ *.{ js, jsx, ts, tsx }',//his version of the specPattern option will run all the tests in the cypress/e2e directory.
  },

})