import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {getFirstPageData} from "../page-table-crawler.js";
import {delay} from "../index.js";

export const getDataEbpayrollTaxes = async (page, retailOutletId) => {

    console.log(`Reading data: Ebpayroll -> Taxes`)

    let fileName = 'ebpayroll_taxes';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/ebpayroll/taxes');

    await page.click('#rdpBankRegister')

    await page.click('xpath///li[@data-range-key="All Dates" and text()=\'All Dates\']')

    await delay(500);

    await saveToJSON(await selectMaxValuePerPageOnPayrollView(page), fileName, retailOutletId);

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnPayrollView = async (page) => {

    return await getFirstPageData(page, '_SelectPayrollTaxes',
        `#btnSearch`,
        `div`);
}
