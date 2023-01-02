import BasePage from "./BasePage";

export default class ProductPage extends BasePage {

  constructor() {
    super('#color-selector__name-text');
  }

  home() {
    cy.visit('es/sport/destacados/leggings-ciclista-compressive-color-block-20-cm-c1010350015p114224237.html?colorId=527');
    this.closeCookies();
  }

  addProductToShoppingCart() {
    cy.get('[data-testid=openSizesButton]').first().click({force: true});
    cy.get(':nth-child(1) > [data-testid=select-size]').click({force: true});
    cy.get('[data-testid=addToCartButton]').click({force: true});
  }

  goToShoppingCart() {
    cy.get('[data-testid=shopcart-button-component] > oy-icon > [data-testid=icon]').click();
  }

  iShouldSeeTheProductInTheShoppingCart() {
    cy.url().should('eq', 'https://www.oysho.com/es/shop-cart');
  }

  addProductToWishList() {
    cy.get('.product-info__title > [data-testid=wishlist-button]').first().click({force: true});
    cy.get(':nth-child(1) > [data-testid=select-size]').click({force: true});
  }

  goToWishList() {
    cy.get('.header__block > [data-testid=wishlist-button] > oy-icon > [data-testid=icon]').click();

  }

  iShouldSeeTheProductInTheWishList() {
    cy.url().should('eq', 'https://www.oysho.com/es/shop-cart#wishlist');
  }
}