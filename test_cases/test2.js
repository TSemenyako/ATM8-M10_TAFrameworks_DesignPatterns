const PageFactory = require('../utils/page_objects/pageFactory');
const logger = require('../config/logger.config');

describe("Test2", function () {
    let page;

    beforeEach(async function() {
        page = await PageFactory.getPage('sign_in');
        await page.open();
        await page.fillCredentials();
    });

    afterEach(async function() {
        await page.signOut();
    });

    it('should be able to open Patent query [@test2][@all]', async function () {
        const queryName = "_TS ATM - PA All Cases";
        logger.info(`Test2: "Verify Patent case record could be opened" is started.`);
        page = await PageFactory.getPage("query");
        await page.runQuery(queryName);
        expect(await page.isQueryLoaded(queryName)).toBe(true);
    });
});