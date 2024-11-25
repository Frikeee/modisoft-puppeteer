import {saveToJSON} from "./saveToJSON.js";
import {clickSelector} from "./click-events.js";
import {getDetailInfoCheck} from "./path-crawler/sales-closing.js";

export const getFirstPageData = async (page, url, buttonTrigger, selector) => {
    console.log('Current page: 1')
    const [response] = await Promise.all([
        page.waitForResponse(async (response) => {
            return response.url().includes(url);
        }, {timeout: 30000}),
        clickSelector(page, buttonTrigger, selector)
    ]);
    return JSON.parse(await response.text())["Data"];
}

export const paginationCrawler = async (page, url, fileName, retailOutletId) => {
    let nextPageButton = await page.$eval('xpath///a[@aria-label="Go to the next page"]', (element) => element.className);
    let pageButtonPrevNumber = 1;
    while (!nextPageButton.includes('k-state-disabled')) {
        pageButtonPrevNumber += await getBodyTable(page, pageButtonPrevNumber, url,  fileName, retailOutletId);
        if (fileName === 'sales_closing'){
            await getDetailInfoCheck(page);
        }
        nextPageButton = await page.$eval('xpath///a[@aria-label="Go to the next page"]', (element) => element.className);
    }
}

export const getBodyTable = async (page, pageButtonPrevNumber, url, fileName, retailOutletId) => {
    let currenPage;
    const [response] = await Promise.all([
        page.waitForResponse(async (response) => {
            if (response.url().includes(url)) {
                const postData = response.request().postData();
                currenPage = await (postData !== undefined ? Number(postData.slice(postData.indexOf('page=') + 5, postData.indexOf('&pageSize'))) : NaN);
                return response.url().includes(url);
            }
        }),
        page.click('xpath///a[@aria-label="Go to the next page"]')
    ]);
    const data = JSON.parse(await response.text())["Data"];
    console.log('Current page: ' + currenPage)
    if (currenPage !== pageButtonPrevNumber && !isNaN(currenPage)) {
        await saveToJSON(data, fileName, retailOutletId)
        return 1;
    } else {
        return 0;
    }
}
