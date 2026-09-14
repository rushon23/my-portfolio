const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport large enough
  await page.setViewport({ width: 1200, height: 800 });
  
  await page.goto('http://localhost:7778/contact', { waitUntil: 'networkidle0' });
  
  // Find visible Projects link
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a[href="/#project-1"]')).find(l => l.offsetParent !== null);
    if (link) link.click();
  });
  
  await new Promise(r => setTimeout(r, 1000)); //(1000);
  
  const introNamePos = await page.evaluate(() => {
    const el = document.querySelector('h1[id="intro-title"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, height: rect.height, text: el.innerText };
  });
  
  const project1Pos = await page.evaluate(() => {
    const el = document.querySelector('#project-1 h2');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, height: rect.height, text: el.innerText };
  });
  
  console.log('Intro Name Position:', introNamePos);
  console.log('Project 1 Position:', project1Pos);
  
  await browser.close();
})();
