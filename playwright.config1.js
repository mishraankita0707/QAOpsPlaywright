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
  retries : 1,
  timeout: 30 *1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects : [  //to make custom configuration file
   {
    name : 'safari',
    use: {
      browserName: 'webkit', //runs in safari engine
      headless : false,
      screenshot : 'off', 
      trace : 'on',
      //to open browser in iPhone 11 screen dimension
      ...devices['iPhone 11'] //it dynamically sets the dimensions for iphone 11
     
    },
  },
  {
    name : 'chrome',
    use: {
      browserName: 'chromium', 
      headless : false,
      screenshot : 'on',
      video: 'retain-on-failure', //Record video for each test, but remove it from successful test runs
      ignoreHttpsErrors: true, //to ignore the ssl certification error, loads even when the website is not https
      Permissions:['geolocation'], //to automatically allow the location popup that appears on browser
      trace : 'on', 
      //viewport : {width:720,height:720} //opens the browser(viewport) in this dimension, used when performing web responsive tests
    },
  }

  ]

  
 
});
module.exports = config;
//by default playwright.config.js runs
//command to run this config file: --config playwright.config1.js
//to run by making project: command is--> --project=safari
//this is used for cross browser testing
//If you don't create projects option, then all the projects will run simultaneously in all the mentioned browsers
