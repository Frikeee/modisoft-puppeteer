import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {clickSelector} from "../click-events.js";
import {delay} from "../index.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";


export const getDataProductInventory = async (page, retailOutletId) => {

    console.log(`Reading data: Product -> Inventory`)

    let fileName = 'product_inventory';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/Product/Inventory');

    await clickSelector(page, '#rdpBankRegister', '.daterangepicker')

    await delay(1000)

    await clickSelector(page, '.daterangepicker > .ranges > ul > li:first-child', '.daterangepicker')

    await saveToJSON(await selectMaxValuePerPageOnInventory(page), fileName, retailOutletId);

    await paginationCrawler(page, '_SelectInventory', fileName, retailOutletId);

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnInventory = async (page) => {
    let id = await page.$eval('.k-pager-sizes.k-label > .k-widget.k-dropdown', (element) => element.getAttribute('aria-controls'));

    await page.click('.k-pager-sizes.k-label > .k-widget > .k-dropdown-wrap')

    return await getFirstPageData(page, '_SelectInventory',
        `#${id} > li:last-child`,
        `#${id}`);
}
