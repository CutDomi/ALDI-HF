// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    workers: 2,
    use: {
        headless: false,
        slowMo: 200,
    },

    testDir: '.',

    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium', headless: false, slowMo: 200 },
        },
    ],
});
