import {closeJsonFile, createToJSON, saveToJSON} from "../saveToJSON.js";

import {dbSalesClosingUpdatePaymentInfo} from "../database.js";
import {clickDateSelector, clickSelector} from "../click-events.js";
import {getFirstPageData, paginationCrawler} from "../page-table-crawler.js";
import {delay} from "../index.js";

export const getDataSalesClosing = async (page, retailOutletId) => {

    console.log(`Reading data: Sales -> Closing`)

    let fileName = 'sales_closing';

    await createToJSON(fileName);

    await createToJSON('sales_closing_product');

    await createToJSON('sales_closing_fuel');

    await page.goto('https://insights.modisoft.com/Sales/Closing');

    await clickSelector(page, '#rdpBankRegister', '.daterangepicker')

    await clickDateSelector(page, '_SelectTransactionRange', '.daterangepicker > .ranges > ul > li:nth-child(12)')

    await delay(3000);

    await saveToJSON(await selectMaxValuePerPageOnSalesClosing(page), fileName, retailOutletId);

    await getDetailInfoCheck(page);

    await paginationCrawler(
        page,
        '_SelectTransactionRange',
        fileName,
        retailOutletId,
        '#GridTrans > div > a.k-link.k-pager-nav:nth-child(4)'
    );

    await closeJsonFile(fileName);
}

const selectMaxValuePerPageOnSalesClosing = async (page) => {
    let id = await page.$eval(
        '#GridTrans > .k-widget.k-floatwrap >.k-pager-sizes.k-label > span.k-widget.k-dropdown',
        (element) => element.getAttribute('aria-controls')
    );

    await page.click('#GridTrans > .k-widget.k-floatwrap >.k-pager-sizes.k-label > span.k-widget.k-dropdown')

    return await getFirstPageData(page, '_SelectTransactionRange',
        `#${id} > li:last-child`,
        `#${id}`);
}

export const getDetailInfoCheck = async (page) => {
    for (let i = 1; i <= 100; i++) {
        console.log(`Detail info number ${i}`)
        const element = await page.$eval(`#GridTrans > table > tbody > tr:nth-child(${i}) > td:last-child`, (element) => element.innerHTML);
        if (element !== '') {
            let checkId = await page.$eval(
                `#GridTrans > table > tbody > tr:nth-child(${i}) > td:last-child > a`,
                (element) => element.getAttribute('id')
            );
            await clickSelector(page, `#GridTrans > table > tbody > tr:nth-child(${i}) > td:last-child > a`, '#ha-drawer > .drawer-panel')
            await getHTMLDetails(page, checkId);
            await clickSelector(page, '#btnClosePop', '.ha-drawer-large.hide')
            await delay(210)
        }
    }
}

export const getHTMLDetails = async (page, checkId) => {
    const products = await getProductInCheck(page, checkId);
    const fuel = await getFuelInCheck(page, checkId);
    const paymentInfo = await getPayInfoInCheck(page, checkId);
    if (products !== undefined) {
        products.shift()
        await saveToJSON(products, 'sales_closing_product', checkId);
    }
    if (fuel !== undefined) {
        fuel.shift()
        await saveToJSON(fuel, 'sales_closing_fuel', checkId);

    }
    if (paymentInfo !== undefined) {
        await dbSalesClosingUpdatePaymentInfo(paymentInfo[0]);
    }
}

const getProductInCheck = async (page, checkId) => {
    return await page.evaluate((checkId) => {
        let productsInCheck = Array.from(document.querySelectorAll('.modal-body.px-0.py-3.my-1 > div > div:nth-child(4) > table:first-child > tbody > tr'));
        if (productsInCheck.length !== 0 && productsInCheck[0].querySelector(`td:nth-child(1)`).innerText === 'Qty') {
            return productsInCheck.map(element => {
                return {
                    quantity: element.querySelector(`td:nth-child(1)`) ? element.querySelector(`td:nth-child(1)`).innerText : '0',
                    scanCode: element.querySelector(`td:nth-child(2)`) ? element.querySelector(`td:nth-child(2)`).innerText : '',
                    department: element.querySelector(`td:nth-child(3)`) ? element.querySelector(`td:nth-child(3)`).innerText : '',
                    description: element.querySelector(`td:nth-child(4)`) ? element.querySelector(`td:nth-child(4)`).innerText : '',
                    amount: element.querySelector(`td:last-child`) ? element.querySelector(`td:last-child`).innerText : '0',
                    checkId: checkId
                };
            });
        }
    }, checkId);
}

const getFuelInCheck = async (page, checkId) => {
    return await page.evaluate((checkId) => {
        let fuelInCheck = Array.from(document.querySelectorAll('.modal-body.px-0.py-3.my-1 > div > div:nth-child(4) > table:last-child > tbody > tr'));
        if (fuelInCheck.length !== 0 && fuelInCheck[0].querySelector(`td:nth-child(2)`).innerText === 'Gallons') {
            return fuelInCheck.map(element => {
                return {
                    gallons: element.querySelector(`td:nth-child(2)`) ? element.querySelector(`td:nth-child(2)`).innerText : '0',
                    price: element.querySelector(`td:nth-child(3)`) ? element.querySelector(`td:nth-child(3)`).innerText : '0',
                    amount: element.querySelector(`td:nth-child(4)`) ? element.querySelector(`td:nth-child(4)`).innerText : '0',
                    checkId: checkId
                };
            });
        }
    }, checkId);
}

const getPayInfoInCheck = async (page, checkId) => {
    return await page.evaluate((checkId) => {
        let paymentDetailsInCheck = Array.from(document.querySelectorAll('.modal-body.px-0.py-3.my-1 > div > div:nth-child(5) > table > tbody'));
        if (paymentDetailsInCheck.length !== 0) {
            return paymentDetailsInCheck.map(element => {
                return {
                    givenByClient: element.querySelector(`tr:nth-child(4) > td:last-child`) ? element.querySelector(`tr:nth-child(4) > td:last-child`).innerText : '0',
                    change: element.querySelector(`tr:nth-child(5) > td:last-child`) ? element.querySelector(`tr:nth-child(5) > td:last-child`).innerText : '0',
                    checkId: checkId
                };
            });
        }
    }, checkId);
}
