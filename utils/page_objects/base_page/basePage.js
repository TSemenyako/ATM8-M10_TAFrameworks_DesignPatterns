const Header = require ('./header');
const Footer = require ('./footer');
const GlobalMenu = require ('./globalMenu');
const logger = require('../../../config/logger.config');
const EC = protractor.ExpectedConditions;

class BasePage {
    constructor (){
        this.header = new Header();
        this.footer = new Footer();
        this.globalMenu = new GlobalMenu();
    }

    async open(url) {
        return browser.get(url);
    }

    async signOut() {
        await browser.executeScript('window.localStorage.clear();');
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
        await this.header.openUserBadge();
        return this.header.clickSignOutButton();
    }

    async openDataEntryFormByTemplateName(templateName) {
        await this.globalMenu.selectDataEntryMenu();
        await this.globalMenu.selectDataEntrySubMenu(templateName);
        await this.helper.switchToNewTab();
        logger.info('Opening New Data Entry page...');
        return this.helper.waitForSpinnerHidden();
    }
};

module.exports = BasePage;