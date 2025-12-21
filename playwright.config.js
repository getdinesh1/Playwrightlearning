// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


// export default defineConfig({
const Config= ({
  testDir: './tests',
  timeout: 10*1000,
  expect : {
  timeout: 5*1000,  
  },
  reporter: 'html',

  use: {
    headless : false ,
    browserName: 'chromium',
    trace : 'retain-on-failure',
    //  trace : 'on',
   
    
  },


});
module.exports = Config

