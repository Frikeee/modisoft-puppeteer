import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";

export const getDataSnapShotItems = async (page, retailOutletId) => {

    console.log(`Reading data: SnapShot -> Items`)

    let fileName = 'snapshot_items';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/SnapShot/Items');

    await saveToJSON(await selectMaxValuePerPageOnSnapShotItems(page), fileName, retailOutletId);

    console.log('Current page AWAIT')

    await paginationCrawler(
        page,
        'GetVerifyItemsData',
        fileName,
        retailOutletId,
        '#GridItemsChangeLog > div > a.k-link.k-pager-nav:nth-child(5)'
    );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnSnapShotItems = async (page) => {
    let id = await page.$eval(
        '#GridItemsChangeLog > .k-widget.k-floatwrap >.k-pager-sizes.k-label > span.k-widget.k-dropdown',
        (element) => element.getAttribute('aria-controls')
    );

    await page.click('#GridItemsChangeLog > .k-widget.k-floatwrap >.k-pager-sizes.k-label > span.k-widget.k-dropdown')

    return await getFirstPageData(page, 'GetVerifyItemsData',
        `#${id} > li:last-child`,
        `#${id}`);
}
