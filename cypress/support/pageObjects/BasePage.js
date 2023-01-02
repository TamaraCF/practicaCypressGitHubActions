export default class BasePage {

  locators = {
    cookies: 'button[id=\"onetrust-accept-btn-handler\"]'
  };

  constructor(expectedElement) {
    this.expectedElement = expectedElement;
  }

  isVisible() {
    cy
      .get(this.expectedElement)
      .should('be.visible');
  }

  closeCookies() {
    cy
      .getSlow(this.locators.cookies)
      .should('be.visible')
      .click();
  }
}
