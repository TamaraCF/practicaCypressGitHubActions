import ProductPage from '../../support/pageObjects/ProductPage';

const productPage = new ProductPage();

Given('I am in a product page', () => {
  productPage.home();
})

/* We are in product page and add a product to shopping cart */
When('I add the product to the shopping cart', () => {
    productPage.addProductToShoppingCart();
})

When('I go to the shopping cart', () => {
    productPage.goToShoppingCart();
})

Then('I should see the product in the shopping cart', () => {
    productPage.iShouldSeeTheProductInTheShoppingCart();
})

/* We are in product page and add a product to wish-list */
When('I add a product to Wish-List', () => {
    productPage.addProductToWishList();
})

When('I navigate to wish-list', () => {
    productPage.goToWishList();
})

Then('I should see the product on the wish-list', () => {
    productPage.iShouldSeeTheProductInTheWishList();
})