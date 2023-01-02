// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {

  interface Chainable {

    /**
     * Custom command to get an element using a lower timeout
     *
     * @example cy.getFast('element_locator')
     */
    getFast(locator: string): Chainable<Element>

    /**
     * Custom command to get an element using a higher timeout
     *
     * @example cy.getSlow('element_locator')
     */
    getSlow(locator: string): Chainable<Element>

    /**
     * Custom command to get an element using a QA locator.
     * If 'qaLocator' is used as locator, then a search for "[data-qa='qaLocator']"
     * will be performed.
     *
     * @example cy.getQa('qaLocator')
     */
    getQa(qaLocator: string): Chainable<Element>

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
