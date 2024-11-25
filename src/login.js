import {clickFunction} from "./click-events.js";


export const login = async (page) => {
    await page.goto('https://insights.modisoft.com/account/logon', {timeout: 120000});

    await page.type('#UserName', 'kroozinsh249@gmail.com');
    await page.type('#Password', 'Fm24914151!');

    await clickFunction(page, '.login-button');
}
