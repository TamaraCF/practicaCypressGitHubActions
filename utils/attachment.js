const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

//const cucumberJsonDir = './cypress/cucumber-json'
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
//const screenshotsDir = './cypress/screenshots';

function addScreenshotToReport(cucumberJsonDir, screenshotsDir) {
  console.log(chalk.green('- Adding attachments to JSONs'));
  getCucumberReportMaps(cucumberJsonDir);
  addScreenshots(cucumberJsonDir, screenshotsDir);
}

//Mapping cucumber json files from the cucumber-json directory to the features
function getCucumberReportMaps(cucumberJsonDir) {
  const files = fs.readdirSync(cucumberJsonDir).filter(file => {
    return file.indexOf('.json') > -1
  })
  files.forEach(file => {
    const json = JSON.parse(fs.readFileSync(path.join(cucumberJsonDir, file)));
    if (!json[0]) { return; }
    const [feature] = json[0].uri.split('/').reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  })
}

//Adding screenshots to the respective failed test steps in the feature files
function addScreenshots(cucumberJsonDir, screenshotsDir) {
  if (fs.existsSync(screenshotsDir)) {
    const prependPathSegment = pathSegment => location => path.join(pathSegment, location);
    const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location));
    const readdirRecursive = location => readdirPreserveRelativePath(location)
      .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory() ? result.concat(readdirRecursive(currentValue)) : result.concat(currentValue), []);
    const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => {
      return file.indexOf('(final fail).png') > -1;
    });
    const featuresList = Array.from(new Set(screenshots.map(x => x.match(/[\w-_.]+.feature/g)[0])));
    featuresList.forEach(feature => {
      screenshots.forEach(screenshot => {
        const regex = /(?<=-- ).+?(?= \(final fail\))/g;
        let match = screenshot.match(regex);
        const scenarioName = match[0];
        const myScenarios = cucumberReportMap[feature][0].elements.filter(
          e => scenarioName.includes(e.name));
        if (!myScenarios) { return }
        let foundFailedStep = false;
        myScenarios.forEach(myScenario => {
          if (foundFailedStep) {
            return;
          }
          let myStep = myScenario.steps.find(step => step.result.status === 'failed')
          if (!myStep) {
            return;
          }
          const data = fs.readFileSync(path.resolve(screenshot));
          if (data) {
            const base64Image = Buffer.from(data, 'binary').toString('base64');
            if (!myStep.embeddings) {
              myStep.embeddings = [];
              // eslint-disable-next-line camelcase
              myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' });
              foundFailedStep = true;
            }
          }
        })
        //Write JSON with screenshot back to report file.
        fs.writeFileSync(path.join(cucumberJsonDir, cucumberReportFileMap[feature]), JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel))
      })
    })
  }
}

exports.addScreenshotToReport = addScreenshotToReport;
