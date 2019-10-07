const BasePage = require ('./base_page/basePage');
const SignInPage = require('./signInPage');
const QueryPage = require('./query_page/queryPage');
const DataEntryFormPage = require('./defPage');

class PageFactory {
    static getPage(pageName) {
        const constructors = {
            sign_in: SignInPage,
            query: QueryPage,
            data_entry_form: DataEntryFormPage
        };
        return constructors[pageName] ? new constructors[pageName]() : new BasePage();
    };
};

module.exports = PageFactory;