import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:7778/contact');
  await page.waitForSelector('input[name="email"]');
  
  await page.type('input[name="email"]', 'test@test.com');
  await page.type('textarea[name="message"]', 'Hello there');
  
  await page.click('button[type="submit"]');
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'test-contact-success.png' });
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
  
  await browser.close();
})();
