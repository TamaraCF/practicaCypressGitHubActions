import WishListPage from '../../support/pageObjects/WishListPage';

const wishListPage = new WishListPage();

Given('I am in wish list page with a product', () => {
    wishListPage.home();
})

/* We are in wish-list page and move a product to shopping bag */
When('I move the item to the shopping bag', () => {
    wishListPage.moveItemToShoppingCart();
})

Then('I see the wish-list empty', () => {
    wishListPage.iShouldSeeTheWishListEmpty();
})

Then('I should see the product on the shopping bag', () => {
    wishListPage.iShouldSeeTheProductOnTheShoppingCart();
})