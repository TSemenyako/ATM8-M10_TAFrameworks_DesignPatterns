const BasePage = require ('./base_page/basePage');
const Helper = require('../helpers/helper');
const logger = require('../../config/logger.config');
const EC = protractor.ExpectedConditions;

class NewDataEntryPage extends BasePage {
    constructor () {
        super();
        this.helper = new Helper();
        this.dockNumField = element(by.xpath("//*[contains(@name,'PAM$DOCKETNUMBER')]//input"));
        this.countryClearIcon = element(by.xpath("//*[contains(@name,'PAM$COUNTRY')]//*[contains(@class,'k-clear-value')]"));
        this.countryField = element(by.xpath("//*[contains(@name,'PAM$COUNTRY')]//input"));
        this.caseTypeClearIcon = element(by.xpath("//*[contains(@name,'PAM$CASETYPE')]//*[contains(@class,'k-clear-value')]"));
        this.caseTypeField = element(by.xpath("//*[contains(@name,'PAM$CASETYPE')]//input"));
        this.relationTypeClearIcon = element(by.xpath("//*[contains(@name,'PAM$RELATIONTYPE')]//*[contains(@class,'k-clear-value')]"));
        this.relationTypeField = element(by.xpath("//*[contains(@name,'PAM$RELATIONTYPE')]//input"));
        this.filingTypeClearIcon = element(by.xpath("//*[contains(@name,'PAM$FILINGTYPE')]//*[contains(@class,'k-clear-value')]"));
        this.filingTypeLookupBtn = element(by.xpath("//*[contains(@name,'PAM$FILINGTYPE')]//*[contains(@class,'ca-hierarchy__actions')]"));
        this.searchField = element(by.xpath("//*[contains(@class,'ca-hierarchy-modal__search')]//*[contains(@class,'ca-textbox__input')]"));
        this.searchBtn = element(by.xpath("//*[contains(@class,'ca-hierarchy-modal__search')]//*[contains(@class,'ca-search__search-button')]"));
        this.searchResult = element(by.xpath("//div[contains(@class,'ca-tree-view__item')]"));
        this.addBtn = element(by.buttonText('Add'));
        this.filingTypeField = element(by.xpath("//*[contains(@name,'PAM$FILINGTYPE')]//input"))
        this.saveBtn = element(by.buttonText('Save'));
        this.toastMessage = element(by.xpath("//*[contains(@class,'ca-notification-message--success')]"));
        this.toastMessageCloseIcon = element(by.xpath("//*[contains(@class,'ca-notification-message--success')]//button"));
        this.recordID = element(by.xpath("//*[contains(@class,'data-entry-form__id')]"));
    }

    async fillRequiredFields(obj) {
        await this.fillSingleLineField("Docket Number", this.dockNumField, obj.docketNumber);
        await this.fillComboBoxField("Country", this.countryClearIcon, this.countryField , obj.country);
        await this.fillComboBoxField("Case Type", this.caseTypeClearIcon, this.caseTypeField, obj.caseType);
        await this.fillComboBoxField("Relation Type", this.relationTypeClearIcon, this.relationTypeField, obj.relationType);
        await this.fillComboBoxField("Filing Type", this.filingTypeClearIcon, this.filingTypeField, obj.filingType);
        return logger.info(`Required fields are successfully filled.`);
    }

    async fillSingleLineField(elementName, fieldElement, value) {
        await fieldElement.sendKeys(value);
        const actualValue = await fieldElement.getAttribute('value')
        logger.debug(`[${elementName}] value entered: "${value}", actual value: "${actualValue}".`);
        return logger.info(`[${elementName}] is filled with "${value}" value.`);
    }

    async fillComboBoxField(elementName, clearIconElement, fieldElement, value) {
        await clearIconElement.click();
        await fieldElement.sendKeys(value);
        await this.helper.waitForBusyIndicatorHidden();
        await fieldElement.sendKeys(protractor.Key.ARROW_DOWN);
        await fieldElement.sendKeys(protractor.Key.ENTER);
        const actualValue = await fieldElement.getAttribute('value')
        logger.debug(`[${elementName}] value entered: "${value}", actual value: "${actualValue}".`);
        return logger.info(`[${elementName}] is filled with "${value}" value.`);
    }

    // implementation of click action via executeScript
    async save() {
        await browser.wait(EC.elementToBeClickable(this.saveBtn), 5000);
        await browser.executeScript("arguments[0].style.backgroundColor = '" + "pink" + "'", this.saveBtn);
        await browser.executeScript("arguments[0].click()", this.saveBtn);
        logger.info(`Save button is clicked.`);
        await this.helper.waitForSpinnerHidden();
        return browser.executeScript("arguments[0].style.backgroundColor  = '" + "white" + "'", this.saveBtn);
    }

    async toastMessageIsDisplayed() {
        let isDisplayed = await browser.wait(EC.visibilityOf(this.toastMessage), 3000);
        logger.info(`Toast message is displayed.`);
        return isDisplayed;
    }

    async closeToastMessage() {
        await browser.wait(EC.elementToBeClickable(this.toastMessageCloseIcon), 3000);
        await this.toastMessageCloseIcon.click();
        await browser.wait(EC.invisibilityOf(this.toastMessage), 3000);
        return logger.info(`Toast message is closed.`);
    }


    async getRecordID() {
        let recordIDText = await this.recordID.getText();
        logger.debug(`Record ID is: ${recordIDText}`);
        return recordIDText;
    }
};

module.exports = NewDataEntryPage;