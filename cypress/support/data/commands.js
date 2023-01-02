const users = require('../../data/users');

Cypress.Commands.add('user', (userType) => {
  let user = users[userType];
  cy.wrap(user);
});
