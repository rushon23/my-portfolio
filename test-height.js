import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:7778/');
  await new Promise(r => setTimeout(r, 4000));
  
  // Force intro to have height 0
  await page.evaluate(() => {
    document.querySelector('#intro').style.height = '0';
    document.querySelector('#intro').style.overflow = 'visible';
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test-overlap-height-0.png' });
  
  await browser.close();
})();
