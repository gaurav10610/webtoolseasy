const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('request', req => console.log('REQ:', req.url())); page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  console.log('Navigating to http://localhost:3000/tools/sqlite-studio');
  await page.goto('http://localhost:3000/tools/sqlite-studio');
  
  // Wait 5 seconds to see what happens
  await page.waitForTimeout(5000);
  
  await browser.close();
})();
