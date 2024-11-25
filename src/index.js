import puppeteer from "puppeteer";
import {login} from "./login.js";
import {
    clearDB,
    dbSellOfPoint,
    dbUser
} from "./database.js";
import {getDataProductPriceBook} from "./path-crawler/product-price-book.js";
import {getDataProductInventory} from "./path-crawler/product-inventory.js";
import {getDataProductPurchases} from "./path-crawler/product-purchases.js";
import {getDataSnapShotItems} from "./path-crawler/snapshot-items.js";
import {getDataSalesClosing} from "./path-crawler/sales-closing.js";
import {clickFunction} from "./click-events.js";
import {getDataEbpayrollEmployees} from "./path-crawler/ebpayroll-employees.js";
import {getDataEbpayrollTimesheet} from "./path-crawler/ebpayroll-timesheet.js";
import {getDataEbpayrollPayrollView} from "./path-crawler/ebpayroll-payrollview.js";
import {getDataEbpayrollTaxes} from "./path-crawler/ebpayroll-taxes.js";


(async () => {

    await clearDB();

    //Launch the browser and open a new blank page.
    const browser = await puppeteer.launch({headless: false});

    const page = await browser.newPage();

    await page.setViewport({width: 1080, height: 1024});

    //Create table DB
    const user = await dbUser({login: 'kroozinsh249@gmail.com', password: 'Fm24914151!'});

    // Login to Modisoft
    await login(page);

    // Select 1st store
    //await clickFunction(page, '.company-logo > .d-inline-block:first-child');

    const pointsOfSell = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('.search-company > .row > div'));
        return elements.map(element => {
            return {
                htmlElement: '.search-company > .row > div > div > div > a',
                name: element.querySelector('div > strong').innerText
            };
        });
    });

    for (let pointOfSell of pointsOfSell) {
        // Create table Retail Outlet DB
        const retailOutlet = await dbSellOfPoint({name: pointOfSell.name, user: user});

        console.log(`Shop name: ` + pointOfSell.name)

        await clickFunction(page, pointOfSell.htmlElement);

        // Get data Product -> Price Book
        await getDataProductPriceBook(page, retailOutlet.id)

        // Get data Product -> Inventory
        await getDataProductInventory(page, retailOutlet.id);

        // Get data Product -> Purchases
        await getDataProductPurchases(page, retailOutlet.id)

        // Get data SnapShot -> Items
        await getDataSnapShotItems(page, retailOutlet.id)

        // Get data Ebpayroll -> Employees
        await getDataEbpayrollEmployees(page, retailOutlet.id)

        // Get data Ebpayroll -> TimeSheet
        await getDataEbpayrollTimesheet(page, retailOutlet.id)

        // Get data Ebpayroll -> PayrollView
        await getDataEbpayrollPayrollView(page, retailOutlet.id)

        // Get data Ebpayroll -> Taxes
        await getDataEbpayrollTaxes(page, retailOutlet.id)

        // Get data Sales -> Closing
        await getDataSalesClosing(page, retailOutlet.id)
    }
    await browser.close();
})();

export async function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}


