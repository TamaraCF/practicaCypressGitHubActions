import CustomerServicePage from '../../support/pageObjects/CustomerServicePage';

const customerServicePage = new CustomerServicePage();

Given('I am in customer service page', () => {
  customerServicePage.home();
})

/* We are in customer service page and see the size guide */
When('I click the size guide link', () => {
    customerServicePage.goToGuidePage();
})

When('I click the {string} button', (opcionPrenda) => {
    customerServicePage.clickOpcionPrendaBtn(opcionPrenda);
})

Then('I should see the {string} content as expected', (opcionPrenda) => {
    customerServicePage.iShouldSeeTheExpectedContent(opcionPrenda);
})