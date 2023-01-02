import BasePage from "./BasePage";
import ProductPage from '../../support/pageObjects/ProductPage';

const productPage = new ProductPage();

export default class ShoppingCartPage extends BasePage {

    constructor() {
        super('#color-selector__name-text');
    }

    home() {
        productPage.home();
        productPage.addProductToWishList();
        productPage.goToWishList();
        productPage.iShouldSeeTheProductInTheWishList();
    }

    moveItemToShoppingCart() {
        cy.get('.product-desktop-shopcart > .oy-button').click({force: true});
    }

    iShouldSeeTheWishListEmpty() {
        cy.get('#wishlist > .shopcart-header > .shopcart-header__title').should('have.text', ' Guardado para más tarde (1 artículo)')
    }

    iShouldSeeTheProductOnTheShoppingCart() {
        cy.get('[carttype="shopcart"][_nghost-oyshoserver-c164=""] > .shopcart-header > .shopcart-header__title').should('have.text', ' Cesta de la compra (0 artículos)')
        
    }
}