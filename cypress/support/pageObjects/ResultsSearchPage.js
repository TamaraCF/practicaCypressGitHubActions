import BasePage from "./BasePage";

export default class ResultsSearchPage extends BasePage {

  constructor() {
    super('.ebx-empathy-x__main ebx-scroll');
  }

  iShouldSeeProductsWithTheSpecifiedCriteria(resultsSearchURL) {
    cy.url().should('eq', resultsSearchURL);
  }
}
