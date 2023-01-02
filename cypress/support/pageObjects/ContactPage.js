import BasePage from "./BasePage";

export default class ContactPage extends BasePage {

  constructor() {
    super('.core-wrapper__router-content core-wrapper--max-width-content');
  }

  iShouldSeeTheContactInfo(contactURL) {
    cy.url().should('eq', contactURL);
  }
}
