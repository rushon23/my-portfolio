import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:7778/contact');
  await page.waitForSelector('.navLink'); // use class for desktop
  
  // Click Projects
  const links = await page.$$('.navLink');
  for (const link of links) {
    const text = await page.evaluate(el => el.textContent, link);
    if (text === 'Projects') {
      await link.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  const intro = await page.$('#intro');
  const proj1 = await page.$('#project-1');
  
  const introBox = await intro.boundingBox();
  const proj1Box = await proj1.boundingBox();
  
  console.log('Intro:', introBox);
  console.log('Proj1:', proj1Box);
  
  await browser.close();
})();
