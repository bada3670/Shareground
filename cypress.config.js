const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 40000,
    screenshotOnRunFailure: true,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    supportFile: false,
  },
});
