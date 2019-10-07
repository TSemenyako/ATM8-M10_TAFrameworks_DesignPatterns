const Helper = require('../helpers/helper');
const logger = require('../../config/logger.config');
const EC = protractor.ExpectedConditions;
const userName = 'ts_user5@cpaglobal.com';
const password = 'Jump4Fun!';

class LoginPage {
    constructor () {
        this.helper = new Helper();
        this.userName = userName;
        this.password = password;
        this.loginField = element(by.css("#username-login-type-discovery"));
        this.nextBtn = element(by.css("#button-discovery-next"));
        this.pswField = element(by.css("#password"));
        this.signInBtn = element(by.css("#btnLoginSubmit"));
    }

    async open() {
        logger.info('Opening Sign In page...');
        return browser.get(browser.baseUrl + '/UI');
    }

    async fillCredentials() {
        await browser.wait(EC.visibilityOf(this.loginField), 3000);
        await this.loginField.sendKeys(this.userName);
        logger.info(`Username "${this.userName}" is entered.`);
        await this.nextBtn.click();
        await browser.wait(EC.visibilityOf(this.pswField), 3000);
        await this.pswField.sendKeys(this.password);
        logger.info(`Password "${this.password}" is entered.`);
        await this.signInBtn.click();
        logger.info(`Sign in is started...`);
        return this.helper.waitForSpinnerHidden();
    }
};

module.exports = LoginPage;