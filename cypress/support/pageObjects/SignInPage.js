import BasePage from "./BasePage";

export default class SignInPage extends BasePage {

    constructor() {
        super('#page-heading');
    }

    home() {
        cy.visit('index.php?controller=authentication&back=my-account');
    }

    enterValidEmail() {
        cy.get('#email_create').type('dhjcafuzlhfkccxdgl@kvhrw.com');
        cy.get('#SubmitCreate > span').click();
        cy.wait(8000)
    }

    completeFormCorrectly() {
        cy.get('#submitAccount > span').should('be.visible');

        cy.get('#customer_firstname').type('Prueba');
        cy.get('#customer_lastname').type('Auto');
        cy.get('#passwd').type('asfj3203.+`');
        cy.get('#firstname').type('Prueba');
        cy.get('#lastname').type('Auto');
        cy.get('#address1').type('Pan, 17');
        cy.get('#city').type('A Coruña');
        cy.get('#postcode').type('15175');
        cy.get('#id_country').select('United States');
        cy.get('#phone_mobile').type('897652231');
        cy.get('#alias').type('Address 1');
        cy.get('#id_state').select('Arizona');

        cy.get('#submitAccount > span').click();
    }

    iShouldSeeMyAccountPage() {
        cy.url().should('eq', 'http://automationpractice.com/index.php?controller=my-account');
    }

    logInAndShoppingCartWithItem() {
        cy.visit('index.php?controller=authentication&back=my-account');
        cy.get('#email').type('dhjcafuzlhfkccxdgl@kvhrw.com');
        cy.get('#passwd').type('asfj3203.+`');
        cy.get('#SubmitLogin > span').click();
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click();
        cy.get('.first-in-line.first-item-of-tablet-line > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click();
    }

    clickCheckout() {
        cy.get('.button-container > .button-medium > span').click({force: true});
        cy.get('[title="View my shopping cart"]').click();
        cy.get('.cart_navigation > .button > span').click();
    }

    completeCheckout() {
        cy.get('.cart_navigation > .button > span').click();
        cy.get('#cgv').click({force: true});
        cy.get('.cart_navigation > .button > span').click();
    }

    iShouldSeeOrderConfirmationPage() {
        cy.url().should('eq', 'http://automationpractice.com/index.php?controller=order&multi-shipping=');
    }

    shoppingCartWithItem() {
        cy.visit('index.php?id_category=8&controller=category');
        cy.get('.first-in-line.first-item-of-tablet-line > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click();
    }

    logIn() {
        cy.get('#email').type('dhjcafuzlhfkccxdgl@kvhrw.com');
        cy.get('#passwd').type('asfj3203.+`');
        cy.get('#SubmitLogin > span').click();
    }
}