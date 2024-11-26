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

    await clickSelector(page, 'xpath///li[@data-range-key="All Dates"]', '.daterangepicker')

    await saveToJSON(await selectMaxValuePerPageOnInventory(page), fileName, retailOutletId);

    await paginationCrawler(
        page,
        '_SelectInventory',
        fileName,
        retailOutletId,
        '#grdPriceLog > div > a.k-link.k-pager-nav:nth-child(5)'
        );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnInventory = async (page) => {
    await page.click('xpath///span/span[@role="option" and text()=\'10\']')

    await console.log(`<- wait page click`)

    return await getFirstPageData(page, '_SelectInventory',
        `xpath///div/ul/li[@role="option" and @data-offset-index="5" and text()=\'100\']`,
        `div.k-animation-container`);
}
