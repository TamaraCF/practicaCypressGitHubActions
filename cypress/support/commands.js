// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const fastTimeout = 2000;
const slowTimeout = 8000;

Cypress.Commands.add('getFast', { prevSubject: 'optional'}, (subject, locator, options) => {
  let newOptions = options || {};
  newOptions.timeout = newOptions.timeout || fastTimeout;
  if (subject) {
    cy
      .wrap(subject)
      .get(locator, newOptions);
  } else {
    cy
      .get(locator, newOptions);
  }
});

Cypress.Commands.add('getSlow', { prevSubject: 'optional'}, (subject, locator, options) => {
  let newOptions = options || {};
  newOptions.timeout = newOptions.timeout || slowTimeout;
  if (subject) {
    cy
      .wrap(subject)
      .get(locator, newOptions);
  } else {
    cy
      .get(locator, newOptions);
  }
});

Cypress.Commands.add('getQa', { prevSubject: 'optional'}, (subject, locator, options) => {
  let newLocator = `[data-qa='${locator}']`;
  if (subject) {
    cy
      .wrap(subject)
      .get(newLocator, options);
  } else {
    cy
      .get(newLocator, options);
  }
});
