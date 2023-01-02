const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const jiraUtils = require('./jiraUtils.js')

const configFilePath = path.join(__dirname, 'jira_report_config.json');
const reportFile = path.join(__dirname, '../reports/cucumber.json');

const argv = yargs
  .option('testplan', {
    alias: 'k',
    description: 'Test plan key where to add the test execution',
    type: 'string'
  })
  .option('summary', {
    alias: 'n',
    description: 'Test execution summary',
    type: 'string'
  })
  .option('silent', {
    alias: 's',
    description: 'Give less information about the process',
    type: 'boolean',
    default: false
  })
  .demandOption(['testplan'], 'Please provide a test plan key to associate this execution to.')
  .requiresArg('testplan')
  .help()
  .alias('help', 'h')
  .argv;

// Get options from command line
const testPlan = argv.testplan;
const silent = argv.silent;
const summary = argv.summary;

// Verify config file exists
let validConfiguration = jiraUtils.verifyConfigFile(configFilePath);
if (!validConfiguration) {
  abort(`Error verifying configuration file: ${configFilePath}`);
}
logOk(`Configuration file found: ${configFilePath}`);

// Verify report file exists
let validReport = verifyFileExists(reportFile);
if (!validReport) {
  abort(`Error verifying report file: ${reportFile}`);
}
logOk(`Report file found: ${reportFile}`);

(async function () {
  // Verify Test plan
  let issueType = await jiraUtils.getIssueType(testPlan);
  if (issueType !== 'Test Plan') {
    abort(`Wrong issue type (${issueType}) for ${testPlan}`);
  }
  logOk(`Test plan found: ${testPlan}`);

  // Import cucumber report
  const key = await jiraUtils.importCucumberReport(reportFile);
  if (!key) {
    abort(`Error importing report`);
  }
  logOk(`Report imported on: ${key}`);

  // Add Testexecution to TestPlan
  let addedToTestPlan = await jiraUtils.addTexecToTestplan(testPlan, key);
  if (!addedToTestPlan) {
      abort(`Error adding test execution ${key} to test plan ${testPlan}`);
  }
  logOk(`Test execution ${key} added to test plan ${testPlan}`);

  // Rename Test Execution issue
  if(summary) {
    let issueRenamed = await jiraUtils.changeIssueSummary(key, summary);
    if (issueRenamed) {
      abort(`Error changing test execution ${key} summary`);
    }
    logOk(`Test execution ${key} summary changed`);
  }
})();


///////////////
// Functions //
///////////////

function verifyFileExists(aFile) {
  let found = true;
  try {
    fs.accessSync(aFile, fs.F_OK);
  } catch (err) {
    found = false;
  }
  return found;
}

function logOk(message) {
  if (!silent) {
    console.log(chalk.green(`- ${message}`));
  }
}

function logKo(message) {
  console.log(chalk.red(`x ${message}`));
}

function abort(message) {
  logKo(message);
  process.exit(1);
}
