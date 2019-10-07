const PageFactory = require('../utils/page_objects/pageFactory');
const logger = require('../config/logger.config');

describe("Test1", function () {
    let page;

    beforeEach(async function() {
        page = await PageFactory.getPage('sign_in');
        await page.open();
        await page.fillCredentials();
    });

    afterEach(async function() {
        await page.signOut();
    });

    it('should be able to create new Patent case record [@test1][@all]', async function () {
        const today = new Date();
        const dockNum = `TS_ATM_${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        logger.info(`Test1: "Create new Patent case record" is started.`);
        page = await PageFactory.getPage('data_entry_form');
        await page.openDataEntryFormByTemplateName("Patent DEF");
        await page.fillRequiredFields({docketNumber: dockNum, country: 'Belarus', caseType: 'Black Box', relationType: 'Division', filingType: 'ARIPO Case'});
        await page.save();
        expect(page.toastMessageIsDisplayed()).toBe(true);
        await page.closeToastMessage();
        let actualRecordID = await page.getRecordID();
        expect(actualRecordID).toContain(dockNum);
    });
});