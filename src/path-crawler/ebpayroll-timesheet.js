import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {delay} from "../index.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";

export const getDataEbpayrollTimesheet = async (page, retailOutletId) => {

    console.log(`Reading data: Ebpayroll -> Timesheet`)

    let fileName = 'ebpayroll_timesheet';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/ebpayroll/TimeSheet');

    await page.click('#rdpBankRegister')

    await page.click('xpath///li[@data-range-key="All Dates" and text()=\'All Dates\']')

    await delay(3000);

    await saveToJSON(await selectMaxValuePerPageOnTimesheet(page), fileName, retailOutletId);

    await paginationCrawler(
        page,
        '_SelectTimeSheet',
        fileName,
        retailOutletId,
        '#GrdEmp > div > a.k-link.k-pager-nav:nth-child(5)'
    );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnTimesheet = async (page) => {

    let id = await page.$eval('.k-pager-sizes.k-label > .k-widget.k-dropdown', (element) => element.getAttribute('aria-controls'));

    await page.click('xpath///span/span[@role="option" and text()=\'10\']');

    await delay(1000);

    return await getFirstPageData(page, '_SelectTimeSheet',
        `#${id} > li:last-child`,
        `#${id}`);
}

export const parseJsonFileTimesheet = async (dataTimesheet) => {
    const formattingData = []
    for (let row of dataTimesheet) {
        formattingData.push(...row['Items']);
    }
    return formattingData;
}
