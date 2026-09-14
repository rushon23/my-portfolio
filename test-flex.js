import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:7778/');
  await new Promise(r => setTimeout(r, 4000));
  
  const y = await page.evaluate(() => {
    return document.querySelector('#project-1').getBoundingClientRect().y;
  });
  
  console.log('Project 1 Y:', y);
  
  await browser.close();
})();
