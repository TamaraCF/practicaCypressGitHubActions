import BasePage from "./BasePage";

export default class MainPage extends BasePage {

  locatorsMP = {
    starButton: ".c-fav__icon",
    menuLeftButton: ".c-header__p",
    menuLeft: ".c-nav",
    topBar: ".filter-tools",
    accessibilitybutton: "#INDmenu-btn",
    footer: "[data-testid=footer] > [data-testid=render-idt]",
    espanaBtn: "[class=store-selector-ee-country]", 
    contactBtn: "[data-translation-code='ItxFooterContact'] > span > span",
    menuBtn: "[data-testid=categories-menu-button] > [data-testid=icon]",
    newInBtn: "[data-categoryid='1469017'] > oy-category-menu-item > .category > [data-testid=toggle-subcategories]",
    searchBox: "#buscador", 
    shoppingGuideBtn: "[data-translation-code='ItxFooterShoppingGuide'] > span > span",
    emailField: "#email-newsletter",
    checkNewsletter: "[data-testid=default-check] > .checkbox > [data-testid=checkbox-input]", 
    sendBtn: "[data-testid=button-submit]",
    subscribed: ".block-form-subscribe__info-container ng-star-inserted",
    sportBtn: "[data-categoryid='1010316003'] > [_ngcontent-oyshoserver-c57=''] > .category--level-1 > [data-testid=toggle-subcategories]"
  }

  constructor() {
    super('.Home');
  }

  home() {
    cy.visit('es/');
    this.closeCookies();
  }

  goToSelectCountryPage() {
    cy.get(this.locatorsMP['footer']).shadow().find(this.locatorsMP['espanaBtn']).click();
  }

  clickOnCustomServiceBtn() {
    cy.get(this.locatorsMP['footer']).shadow().find(this.locatorsMP['contactBtn']).click();
  }

  clickOnMenuBtn() {
    cy.get(this.locatorsMP['menuBtn']).click();
  }

  clickOnNewInBtn() {
    cy.get(this.locatorsMP['newInBtn']).click();
  }

  fillSearchBoxWithPantalonesCrochet(producto) {
    cy.get('#buscador').click({force: true}).focused({force: true}).type(producto, {force: true}).should('have.value', producto);
  }

  clickOnSearchBtn() {
    
  }

  clickOnShoppingGuideBtn() {
    cy.get(this.locatorsMP['footer']).shadow().find(this.locatorsMP['shoppingGuideBtn']).click();
  }

  typeValidEmail(email) {
    cy.get(this.locatorsMP['emailField']).type(email);
    cy.get(this.locatorsMP['checkNewsletter']).click();
  }

  clickArrowBtn() {
    cy.get(this.locatorsMP['sendBtn']).click();
  }

  iShouldSeeTheNewsletterPage() {
    cy.get(this.locatorsMP['checkNewsletter']).should('be.visible');
  }

  clickOnSportBtn() {
    cy.get(this.locatorsMP['sportBtn']).click();
    cy.get('.subcategory--opened > :nth-child(5) > :nth-child(1) > .category--level-2 > [data-testid=toggle-subcategories]').click();
    cy.get(':nth-child(7) > [data-testid=BubbleSelected]').click();

    cy.get('.bloque3Imagenes > :nth-child(2)').realHover('mouse');
    //cy.get(':nth-child(2) > .product > .product__image-flex-wrapper > .product__image-wrapper > [data-testid=size-selector-cart] > .product__size-add').should('be.visible').realHover('mouse');
    //cy.get(':nth-child(2) > .product > .product__image-flex-wrapper > .product__image-wrapper > [data-testid=size-selector-cart] > .product__size-add > oy-icon > [data-testid=icon]').click()
  }

}
