const puppeteer = require('puppeteer');

/*
function dateCalculator (postDateString) {
    // postDateString in format yyyy-mm-dd
    let currentDate = new Date();
    let postDate = new Date(postDateString);
    let diffTime = currentDate.getTime() - postDate.getTime();
    let diffDays= diffTime / (1000 * 3600 * 24);
    
    if (diffDays > 365) return false;
    return true;
}
*/

async function getTitles() {
    const browser = await puppeteer.launch({});

    const page = await browser.newPage();

    const url = 'https://filmloverss.com/kategori/haberler/';

    await page.goto(url);

    await page.waitForSelector('#cb-content > div > article');

    const titles = await page.$$eval('#cb-content > div > article', posts => {
        return posts.map(post => {
            const properties = {};

            // Calculating time interval to determine which posts are lower than a year and aren't
            const time = post.querySelector('div.cb-meta > div.cb-byline > span.cb-date > time');
            let currentDate = new Date();
            let postDate = new Date(time);
            let diffTime = currentDate.getTime() - postDate.getTime();
            let diffDays = diffTime / (1000 * 3600 * 24);

            if (diffDays <= 365) {
                const titleElement = post.querySelector('div.cb-meta > h2 > a');
                properties.title = titleElement.innerText;
                properties.url = titleElement.getAttribute('href');
            }
            return properties;
        });
    });

    console.log(titles);

    browser.close();
}

getTitles();

//#post-140936 > div.cb-meta > div.cb-byline > span.cb-date > time

//#cb-content > div > article // her biri bir post oluyor