import {saveToJSON} from "./saveToJSON.js";
import {getDetailInfoCheck} from "./path-crawler/sales-closing.js";
import {delay} from "./index.js";

export const getFirstPageData = async (page, url, buttonTrigger) => {
    await delay(1000);
    console.log('Current page: 1')
    const [response] = await Promise.all([
        page.waitForResponse(async (response) => {
            return response.url().includes(url);
        }, {timeout: 30000}),
        page.click(buttonTrigger)
    ]);
    return JSON.parse(await response.text())["Data"];
}

export const paginationCrawler = async (page, url, fileName, retailOutletId, nextButton) => {
    let nextPageButton = await page.$eval(nextButton, (element) => element.className);
    let pageButtonPrevNumber = 1;
    while (!nextPageButton.includes('k-state-disabled')) {
        try {
            pageButtonPrevNumber += await getBodyTable(page, pageButtonPrevNumber, url,  fileName, retailOutletId, nextButton);
        } catch (e) {
            pageButtonPrevNumber += await getBodyTable(page, pageButtonPrevNumber, url,  fileName, retailOutletId, nextButton);
        }
        if (fileName === 'sales_closing'){
            await getDetailInfoCheck(page);
        }
        nextPageButton = await page.$eval(nextButton, (element) => element.className);
    }
}

export const getBodyTable = async (page, pageButtonPrevNumber, url, fileName, retailOutletId, nextButton) => {
    let currenPage;
    const [response] = await Promise.all([
        page.waitForResponse(async (response) => {
            if (response.url().includes(url)) {
                const postData = response.request().postData();
                currenPage = await (postData !== undefined ? Number(postData.slice(postData.indexOf('page=') + 5, postData.indexOf('&pageSize'))) : NaN);
                return response.url().includes(url);
            }
        }),
        page.click(nextButton)
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
