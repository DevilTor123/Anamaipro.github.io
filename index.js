const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jorportoday.com/news/');

    // ดึง URL ของรูปภาพ
    const imageUrls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.src);
    });

    // บันทึก URL ลงในไฟล์
    fs.writeFileSync('image-urls.json', JSON.stringify(imageUrls, null, 2));

    await browser.close();
})();
