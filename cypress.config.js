const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    supportFile: false,
    env: {
      screenTiny: 473,
      screenSmall: 640,
      screenMedium: 768,
      defaultProfilePhoto: process.env.NEXT_PUBLIC_USER_PHOTO,
    },
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
  },
});
