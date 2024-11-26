import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {delay} from "../index.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";

export const getDataEbpayrollEmployees = async (page, retailOutletId) => {

    console.log(`Reading data: Ebpayroll -> Employees`)

    let fileName = 'ebpayroll_employees';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/ebpayroll/Employees');

    await page.click('#mainBody > section > div > div:first-child > span')

    await delay(1000);

    await page.click('#ddlStatus_listbox > li:last-child')

    await delay(3000);

    await saveToJSON(await selectMaxValuePerPageOnEmployees(page), fileName, retailOutletId);

    await paginationCrawler(
        page,
        '_SelectEmployees',
        fileName,
        retailOutletId,
        '#GrdEmp > div > a.k-link.k-pager-nav:nth-child(4)'
    );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnEmployees = async (page) => {

    let id = await page.$eval('.k-pager-sizes.k-label > .k-widget.k-dropdown', (element) => element.getAttribute('aria-controls'));

    await page.click('.k-pager-sizes.k-label > .k-widget > .k-dropdown-wrap');

    await delay(1000);

    return await getFirstPageData(page, '_SelectEmployees',
        `#${id} > li:last-child`,
        `#${id}`);
}
