import BasePage from "./BasePage";
import ProductPage from '../../support/pageObjects/ProductPage';

const productPage = new ProductPage();

export default class ShoppingCartPage extends BasePage {

    constructor() {
        super('#color-selector__name-text');
    }

    home() {
        productPage.home();
        productPage.addProductToShoppingCart();
        productPage.goToShoppingCart();
        productPage.iShouldSeeTheProductInTheShoppingCart();
    }

    removeItemFromShoppingCart() {
        cy.get('.shopcart-header > .oy-button > .ng-star-inserted').click();
        cy.get('.product-desktop-shopcart__two-cols--save-button > .oy-button').click();
    }

    iShouldSeeTheShoppingCartEmpty() {
        cy.get('[carttype="shopcart"][_nghost-oyshoserver-c164=""] > .shopcart-header > .shopcart-header__title').should('have.text', ' Cesta de la compra (0 artículos)')
    }

    checkoutWithoutLogin() {
        cy.get('[data-testid=button-action]').click();
    }

    iShouldSeeTheLoginRequest() {
        cy.url().should('eq', 'https://www.oysho.com/es/checkout.html');
    }
}