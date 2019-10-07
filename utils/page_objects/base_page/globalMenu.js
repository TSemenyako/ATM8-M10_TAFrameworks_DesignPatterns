const EC = protractor.ExpectedConditions;

class GlobalMenu {
    constructor (){
        this.brand = element(by.css(".navbar__brand"));
        this.dataEntryMenu = element(by.xpath("//span[text()='Data Entry']"));
    }

    async selectDataEntryMenu() {
        return this.dataEntryMenu.click();
    }

    async selectDataEntrySubMenu(templateName) {
        let subMenu = element(by.xpath(`//span[text()='${templateName}']`));
        await browser.wait(EC.elementToBeClickable(subMenu), 3000, 'Data Entry template is not found');
        return subMenu.click();
    }
}

module.exports = GlobalMenu;