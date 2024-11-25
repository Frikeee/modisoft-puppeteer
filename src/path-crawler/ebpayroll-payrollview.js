import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";
import {getFirstPageData} from "../page-table-crawler.js";

export const getDataEbpayrollPayrollView= async (page, retailOutletId) => {

    console.log(`Reading data: Ebpayroll -> PayrollView`)

    let fileName = 'ebpayroll_payrollview';

    await createToJSON(fileName);

    await page.goto('https://insights.modisoft.com/ebpayroll/PayrollView');

    await page.click('#rdpBankRegister')

    await page.click('xpath///li[@data-range-key="All Dates" and text()=\'All Dates\']')

    await saveToJSON(await selectMaxValuePerPageOnPayrollView(page), fileName, retailOutletId);

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnPayrollView = async (page) => {

    return await getFirstPageData(page, '_SelectEmployeePastChecks',
        `#btnSearch`,
        `div`);
}
