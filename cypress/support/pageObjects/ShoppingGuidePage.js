import BasePage from "./BasePage";

export default class ShoppingGuidePage extends BasePage {

  constructor() {
    super('.help-center ng-star-inserted');
  }

  iShouldSeeTheHowToBuyPage(shoppingGuideURL) {
    cy.url().should('eq', shoppingGuideURL);
  }
}
