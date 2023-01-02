/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path');
const fs = require('fs');
const cucumber = require('cypress-cucumber-preprocessor').default;

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // add cypress-cucumber-preprocessor
  on('file:preprocessor', cucumber());

  on('after:screenshot', (details) => {
    let parsedPath = path.parse(details.path);
    let isFailedScreeshot = parsedPath.name.includes('(failed)');

    if (isFailedScreeshot) {
      const failedSufix = /(?<bareName>.*)(\(failed\).*)/;
      const match = parsedPath.name.match(failedSufix);
      let originalName = match.groups.bareName;
      let newFilename = `${originalName}(final fail)${parsedPath.ext}`;
      let destination = path.join(parsedPath.dir, newFilename);
      fs.copyFileSync(details.path, destination, fs.constants.COPYFILE_FICLONE);
    }
  });

  let environmentConfiguration = getEnvironmentConfiguration(config.env.environment);
  return environmentConfiguration;
}

function getEnvironmentConfiguration(environment) {
  let readedConfig = {};
  const pathToConfigFile = path.resolve('cypress/environments', `${environment}.json`);
  try {
    let rawData = fs.readFileSync(pathToConfigFile, 'utf8');
    readedConfig = JSON.parse(rawData);
  } catch (err) {
    throw new Error(`Unable to read configuration file for environment: ${environment}\nCaused by: ${err.message}`);
  }
  return readedConfig;
}
