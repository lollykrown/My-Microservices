const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

//   // Set your page viewport
//   await page.setViewport({width:1280, height:800})
  await page.goto('https://carmalou.com');

//   // Get page screenshot
//   await page.screenshot({path: 'carmalou.png', fullPage:true});
 
 //Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
 
  console.log('Dimensions:', dimensions);
  await browser.close();
})();