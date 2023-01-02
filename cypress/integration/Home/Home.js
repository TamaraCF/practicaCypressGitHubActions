import SelectStore from '../../support/pageObjects/MarketPage';
import Main from '../../support/pageObjects/MainPage';
import ContactPage from '../../support/pageObjects/ContactPage';
import NewInPage from '../../support/pageObjects/NewInPage';
import ResultsSearchPage from '../../support/pageObjects/ResultsSearchPage';
import ShoppingGuidePage from '../../support/pageObjects/ShoppingGuidePage';

const main = new Main();
const selectStore = new SelectStore();
const contactPage = new ContactPage();
const newInPage = new NewInPage();
const resultsSearchPage = new ResultsSearchPage();
const shoppingGuidePage = new ShoppingGuidePage();

Given('I am in the home page', () => {
  main.home();
})

/* We come from spain market and go to france in english */
When('I click the "ESPAÑA" button', () => {
  main.goToSelectCountryPage();
})

When('I select "France English" in the dropdown menu', () => {
  selectStore.selectMarket('France (English)');
})

When('I click the "Go" button', () => {
  selectStore.confirmMarketAndGoBackHome();
})

Then('I should see the web for that market', () => {
  selectStore.iShouldStayInCorrectMarketURL('https://www.oysho.com/fr/en/');
})

/* We are in home page and go to contact info page */
When('I click on the custom service button', () => {
  main.clickOnCustomServiceBtn();
})

Then('I should see the contact info', () => {
  contactPage.iShouldSeeTheContactInfo('https://www.oysho.com/es/contact.html');
})

/* We are in home page and go to new in section */
When('I click on the menu button', () => {
  main.clickOnMenuBtn();
})

When('I click on New In', () => {
  main.clickOnNewInBtn();
})

Then('I should see New in section', () => {
  newInPage.iShouldSeeNewInSection('https://www.oysho.com/es/%C3%BAltima-semana-c1469017.html');
})

/* We are in home page and search a product on search box */
When('I fill the search box with “Pantalones crochet”', () => {
  main.fillSearchBoxWithPantalonesCrochet('Pantalones crochet');
})

When('I click on the search button', () => {
  main.clickOnSearchBtn();
})

Then('I should see products with the specified criteria', () => {
  resultsSearchPage.iShouldSeeProductsWithTheSpecifiedCriteria('https://www.oysho.com/es/?q=Pantalones+crochet');
})

/* We are in home page and change market */
When('I select {string} in the dropdown menu', (market) => {
  selectStore.selectMarketInDropdownMenu(market);
})

Then('I should see the {string} URL', (marketURL) => {
  selectStore.iShouldSeeTheMarketUrl(marketURL);
})

/* We are in home page and go to shopping guide */
When('I click on “Shopping guide” button', () => {
  main.clickOnShoppingGuideBtn();
})

Then('I should see the how to buy page', () => {
  shoppingGuidePage.iShouldSeeTheHowToBuyPage('https://www.oysho.com/es/att-client.html');
})

/* We are in home page and we subscribe to newsletter */
When('I type a valid email in the "Escribe tu e-mail" field', () => {
  main.typeValidEmail('tamara.couto@globetesting.com');
})

When('I click the arrow button', () => {
  main.clickArrowBtn();
})

Then('I should see the "Newsletter" page', () => {
  main.iShouldSeeTheNewsletterPage();
})

/* We are in home page and go to sport section */
When('I click on Sport', () => {
  main.clickOnSportBtn();
})

Then('I should see Sport section', () => {
  //newInPage.iShouldSeeNewInSection('https://www.oysho.com/es/%C3%BAltima-semana-c1469017.html');
})