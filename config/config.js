const fsextra = require('fs-extra');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JasmineBeautifulReporter = require('protractor-beautiful-reporter');
const args = require('yargs')
    .option('instances', {alias: 'i', description: 'Number of test run streams', type: 'string', default: 1})
    .option('tags', {alias: 't', description: 'Test suite(s) tag to run', type: 'string', demandedOption: true})
    .argv;

exports.config = {
    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
        grep: `@${args.tags}`
    },

    allScriptsTimeout: 120000,
    specs: ['../test_cases/*.js'],
    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        shardTestFiles: args.instances > 1,
        maxInstances: args.instances || 1
    },

    baseUrl: 'https://qa.aws.cpaglobal.com/tipms/Q491',

    //jasmine reporters
    onPrepare: function () {
        const reportDir = './utils/reports/JasmineBeautifulReporter/';
        fsextra.removeSync(reportDir);

        jasmine.getEnv().addReporter(new JasmineBeautifulReporter({
            baseDirectory: reportDir
        }).getJasmine2Reporter());

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
        }}));

        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(false);
    },
}
