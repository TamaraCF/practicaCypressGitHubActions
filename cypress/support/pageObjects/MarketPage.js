import BasePage from "./BasePage";

export default class SelectStorePage extends BasePage {

  constructor() {
    super('.worldwide-title');
  }

  selectMarket(market) {
    cy.get('#select2-countryList-container').click();
    cy.get('.select2-search__field').type(market)
    cy.get('li[id^=select2-countryList-result]').click();
  }

  confirmMarketAndGoBackHome() {
    cy.get('.worldwide-button').click();
  }

  iShouldStayInCorrectMarketURL(marketURL) {
    cy.url().should('eq', marketURL);
  }

  selectMarketInDropdownMenu(market) {
      cy.get('#select2-countryList-container').click();
      cy.get('.select2-search__field').type(market);
      cy.get('li[id^=select2-countryList-result]').click();
  }

  iShouldSeeTheMarketUrl(marketURL) {
      cy.url().should('eq', marketURL);
  }

}
