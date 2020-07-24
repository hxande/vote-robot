const puppeteer = require('puppeteer');

let count = 0;
setInterval(function () {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.riddle.com/a/259229?');

    for (const frame of page.mainFrame().childFrames()) {
      if (frame.url().includes('riddle')) {
        const username = await frame.waitForSelector('div.choices div:nth-child(2) div.choice-overlay');
        await username.click();
        console.log('Votou: ', count++);
      }
    }
    await browser.close()
  })()
}, 3000);