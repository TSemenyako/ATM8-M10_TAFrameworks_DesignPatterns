const logger = require('../../config/logger.config');

class Helper {

    async waitForSpinnerHidden() {
        const loadingSpinner = by.css('.spinner-image');
        const displayTimeout = 5000;
        const hideTimeout = 100000;

        try {
            await browser.wait(async () => {
                const count = await element.all(loadingSpinner).count();
                if (count) {
                    logger.info(`Spinner is displayed.`);
                    return true;
                } else {
                    logger.debug(`Spinner didn't appear after ${displayTimeout} ms.`);
                    return false;
                }
            }, displayTimeout);
        }
        catch (e) {
            return logger.debug(e);
        }

        try {
            const isDisappeared = await browser.wait(async () => {
                const count = await element.all(loadingSpinner).count();
                if (count) {
                    return false;
                } else {
                    logger.info(`Spinner is hidden.`);
                    return true;
                }
            }, hideTimeout);

            if(!isDisappeared) {
                logger.debug(`Spinner is still displayed after ${hideTimeout} ms.`); //new
                throw new Error(`Spinner is still displayed after ${hideTimeout} ms.`);
            }
        }
        catch (e) {
            return logger.debug(e);
        }
    }

    async waitForBusyIndicatorHidden() {
        const loadingSpinner = by.css('.busy-indicator');
        const displayTimeout = 200000;
        const hideTimeout = 5000;

        try {
            await browser.wait(async () => {
                const count = await element.all(loadingSpinner).count();
                if (count) {
                    logger.info(`Busy indicator is displayed.`);
                    return true;
                } else {
                    logger.debug(`Busy indicator didn't appear after ${displayTimeout} ms.`);
                    return false;
                }
            }, displayTimeout);
        }
        catch (e) {
            return logger.debug(e);
        }

        try {
            const isDisappeared = await browser.wait(async () => {
                const count = await element.all(loadingSpinner).count();
                if (count) {
                    return false;
                } else {
                    logger.info(`Busy indicator is hidden.`);
                    return true;
                }
            }, hideTimeout);

            if(!isDisappeared) {
                throw new Error(`Busy indicator is still displayed after ${displayTimeout} ms.`);
            }
        }
        catch (e) {
            return logger.debug(e);
        }
    }

    async switchToNewTab() {
        let tabs = await browser.getAllWindowHandles();
        await browser.close();
        await browser.switchTo().window(tabs[1]);
        logger.info('Switching to new tab...');
        browser.sleep(1000);
        return true;
    }
}

module.exports = Helper;