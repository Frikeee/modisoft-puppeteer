import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";


export const getDataProductPriceBook = async (page, retailOutletId) => {

    console.log(`Reading data: Product -> Price Book`)

    let fileName = 'product_price_book';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/Product/PriceBook');

    await saveToJSON(await selectMaxValuePerPageOnPriceBook(page), fileName, retailOutletId);

    await paginationCrawler(page, '_SelectAjaxVendorsItems', fileName, retailOutletId);

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnPriceBook = async (page) => {
    let id = await page.$eval('div:nth-child(3) > .k-pager-sizes.k-label > .k-widget.k-dropdown', (element) => element.getAttribute('aria-controls'));
    await page.click('div:nth-child(3) > .k-pager-sizes.k-label > .k-widget.k-dropdown > .k-dropdown-wrap.k-state-default')

    return await getFirstPageData(page, '_SelectAjaxVendorsItems',
        `#${id} > li:last-child`,
        `#${id}`);
}
