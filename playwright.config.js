// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config= ({
  testDir: './tests',
  timeout: 30 *1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless : true,
    screenshot : 'on', //to get the screenshot of only failed test cases: 'only-on-failure'
    trace : 'on' //to get the trace of only failed test cases:--- write trace : 'retain-on-failure' (highly recommendable)
   
  },
 
});
module.exports = config;
