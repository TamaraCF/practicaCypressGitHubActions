// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {

  interface Chainable {

    /**
     * Custom command to get a user of the given type.
     *
     * @returns the user wrapped on a cypress object
     *
     * @example cy.user('valid')
     */
    user(userType: string): Chainable<Element>

  }

}
