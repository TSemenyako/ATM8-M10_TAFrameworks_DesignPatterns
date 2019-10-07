const BasePage = require ('../base_page/basePage');
const QueryList = require ('../query_page/queryList');
const QueryBuilder = require ('../query_page/queryBuilder');
const QueryResults = require ('../query_page/queryResults');
const Helper = require('../../helpers/helper');
const logger = require('../../../config/logger.config');

class QueryPage extends BasePage {
    constructor () {
        super();
        this.helper = new Helper();
        this.queryList = new QueryList();
        this.queryBuilder = new QueryBuilder();
        this.queryResults = new QueryResults();
    }

    async open() {
        logger.info('Opening Query page...');
        await browser.get(browser.baseUrl + '/UI/queries');
        return this.helper.waitForSpinnerHidden();
    }

    async searchQueryByName(queryName) {
        return this.queryList.searchQueryByName(queryName);
    }

    async runQuery(queryName) {
        return this.queryList.runQuery(queryName);
    }

    async isQueryLoaded(expectedQueryName) {
        return this.queryResults.isQueryLoaded(expectedQueryName);
    }
};

module.exports = QueryPage;