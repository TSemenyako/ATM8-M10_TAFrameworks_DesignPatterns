const logger = require('../../../config/logger.config');
const EC = protractor.ExpectedConditions;

class Header {
    constructor (){
        this.mainLogo = element(by.css(".navbar__brand"));
        this.userBadgeIcon = element(by.xpath("//*[contains(@class, 'user-icon')]"));
        this.userBadgeSignOutBtn = element(by.css(".fa-sign-out"));
    }

    async openUserBadge() {
        await browser.wait(EC.visibilityOf(this.userBadgeIcon), 5000);
        await browser.wait(EC.elementToBeClickable(this.userBadgeIcon), 5000);
        await this.userBadgeIcon.click();
        return logger.info('Opening User Badge...');
    }

    async clickSignOutButton() {
        await browser.wait(EC.visibilityOf(this.userBadgeSignOutBtn), 5000);
        await browser.wait(EC.elementToBeClickable(this.userBadgeSignOutBtn), 5000);
        await this.userBadgeSignOutBtn.click();
        return logger.info('Signing out...');
    }
}

module.exports = Header;