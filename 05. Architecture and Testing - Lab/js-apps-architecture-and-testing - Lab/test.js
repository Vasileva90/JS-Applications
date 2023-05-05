const { chromium } = require('playwright-chromium');

(async function() {
    const browser = await chromium.launch({headless: false, slowMo: 100});
    const page = await browser.newPage();

    await page.goto('http://127.0.0.1:5500');
    await page.screenshot({path: 'screenshot.png'});

    await browser.close();
})();
