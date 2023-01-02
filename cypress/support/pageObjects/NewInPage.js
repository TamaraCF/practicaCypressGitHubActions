import BasePage from "./BasePage";

export default class NewInPage extends BasePage {

  constructor() {
    super('.grid__header-container ng-star-inserted');
  }

  iShouldSeeNewInSection(newInURL) {
    cy.url().should('eq', newInURL);
  }
}
