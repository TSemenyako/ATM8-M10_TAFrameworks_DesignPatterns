const Helper = require('../../helpers/helper');
const logger = require('../../../config/logger.config');
const EC = protractor.ExpectedConditions;

class QueryList {
    constructor (){
        this.helper = new Helper();
        this.queryListSearchField = element(by.xpath("//*[contains(@class, 'ca-query-list__search')]//*[contains(@class, 'ca-textbox__input')]"));
    }

    async searchQueryByName(queryName) {
        logger.info(`Searching query "${queryName}"...`);
        await browser.wait(EC.elementToBeClickable(this.queryListSearchField), 5000);
        await this.queryListSearchField.sendKeys(queryName, protractor.Key.ENTER);
        return element(by.xpath(`//*[@title='${queryName}']//span[text()='${queryName}']`));
    }

    async runQuery(queryName) {
        const query = await this.searchQueryByName(queryName);
        await browser.wait(EC.elementToBeClickable(query), 5000);
        await query.click();
        logger.info(`Running query "${queryName}"...`);
        return this.helper.waitForSpinnerHidden();
    }
}

module.exports = QueryList;