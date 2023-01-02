import ShoppingCartPage from '../../support/pageObjects/ShoppingCartPage';

const shoppingCartPage = new ShoppingCartPage();

Given('As a not logged used I am in the shopping cart with one item', () => {
    shoppingCartPage.home();
})

/* We are in shopping cart page and delete a product */
When('I remove the item from the shopping cart', () => {
    shoppingCartPage.removeItemFromShoppingCart();
})

Then('I should see the shopping cart empty', () => {
    shoppingCartPage.iShouldSeeTheShoppingCartEmpty();
})

/* We are in shopping cart page and move to checkout without login */
When('I click on "Continue" button', () => {
    shoppingCartPage.checkoutWithoutLogin();
})

Then('I should see the checkout page with a login request', () => {
    shoppingCartPage.iShouldSeeTheLoginRequest();
})