import SignInPage from '../../support/pageObjects/SignInPage';

const signInPage = new SignInPage();

/* We sign in and go to my account page */
Given('I am in the Sign In page', () => {
    signInPage.home();
})

When('I enter a valid email', () => {
    signInPage.enterValidEmail();
})

Then('I complete the formulary correctly', () => {
    signInPage.completeFormCorrectly();
})

Then('I should see my account page', () => {
    signInPage.iShouldSeeMyAccountPage();
})

/* We log in and checkout */
Given('As a logged user I am in the shopping cart with one item', () => {
    signInPage.logInAndShoppingCartWithItem();
})

When('I click proceed to checkout', () => {
    signInPage.clickCheckout();
})

When('I complete checkout process', () => {
    signInPage.completeCheckout();
})

Then('I should see the order confirmation page', () => {
    signInPage.iShouldSeeOrderConfirmationPage();
})

/* Checkout without log in */
Given('As a not logged user I am in the shopping cart with a item', () => {
    signInPage.shoppingCartWithItem();
})

When('I log with valid credentials', () => {
    signInPage.logIn();
})