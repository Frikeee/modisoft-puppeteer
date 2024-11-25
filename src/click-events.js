export const clickFunction = async (page, button) => {
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle2'}),
        page.click(button)
    ]);
}

export const clickSelector = async (page, button, selector) => {
    await Promise.all([
        page.waitForSelector(selector),
        page.click(button)
    ]);
}

export const clickDateSelector = async (page, url, button) => {
    await Promise.all([
        page.waitForResponse(async (response) => {
            return response.url().includes(url);
        }, {timeout: 120000}),
        page.click(button)
    ]);
}
