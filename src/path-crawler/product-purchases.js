import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {clickDateSelector, clickSelector} from "../click-events.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";
import {delay} from "../index.js";


export const getDataProductPurchases = async (page, retailOutletId) => {

    console.log(`Reading data: Product -> Purchases`)

    let fileName = 'product_purchases';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/Product/Purchases');

    await clickSelector(page, '#rdpBankRegister', '.daterangepicker')

    await delay(1000);

    await clickDateSelector(page, '_SelectAjaxEntries', '.daterangepicker > .ranges > ul > li:first-child')

    await saveToJSON(await selectMaxValuePerPageOnPurchases(page), fileName, retailOutletId);

    await paginationCrawler(page, '_SelectAjaxEntries', fileName, retailOutletId);

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnPurchases = async (page) => {
    let id = await page.$eval('.k-widget.k-dropdown', (element) => element.getAttribute('aria-controls'));

    await page.click('.k-widget.k-dropdown > .k-dropdown-wrap.k-state-default')

    return await getFirstPageData(page, '_SelectAjaxEntries',
        `#${id} > li:last-child`,
        `#${id}`);
}
