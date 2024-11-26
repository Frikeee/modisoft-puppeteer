import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";
import {delay} from "../index.js";


export const getDataProductPriceBook = async (page, retailOutletId) => {

    console.log(`Reading data: Product -> Price Book`)

    let fileName = 'product_price_book';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/Product/PriceBook');

    await saveToJSON(await selectMaxValuePerPageOnPriceBook(page), fileName, retailOutletId);

    await paginationCrawler(
        page,
        '_SelectAjaxVendorsItems',
        fileName,
        retailOutletId,
        '#VendorsItems > div:nth-child(3) > a:nth-child(5)'
    );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnPriceBook = async (page) => {
    let id = await page.$eval('xpath///span/span[@role="listbox" and @aria-haspopup="listbox"]', (element) => element.getAttribute('aria-controls'));

    await page.click('xpath///span/span[@role="option" and text()=\'100\']')

    await delay(1000);

    return await getFirstPageData(page, '_SelectAjaxVendorsItems',
        `#${await id} > li:last-child`,
        `#${await id}`);
}
