import BasePage from "./BasePage";

export default class CustomerServicePage extends BasePage {

  locatorsMP = {
    footer: "[data-testid=footer] > [data-testid=render-idt]",
    sizeGuideBtn: "[data-translation-code='ItxSgTGuiadetallas'] > span > span", 
    body: "oy-cms-content-page > oy-web-component-wrapper > [data-testid=render-idt]"
  }

  constructor() {
    super('#landing_guiatallas20');
  }

  home() {
    cy.visit('es/att-client.html');
    this.closeCookies();
  }

  goToGuidePage() {
    cy.get(this.locatorsMP['footer']).shadow().find(this.locatorsMP['sizeGuideBtn']).click();
  }

  clickOpcionPrendaBtn(opcionPrenda) {
    var opcion = "[data-guide-type-id-trigger=" + opcionPrenda + "]"
    cy.get(this.locatorsMP['body']).shadow().find(opcion).click();
  }

  iShouldSeeTheExpectedContent(opcionPrenda) {
    var opcion = "[data-guide-type-id-trigger=" + opcionPrenda + "]"
    var prendaSeleccionada = cy.get(this.locatorsMP['body']).shadow().find(opcion);
    prendaSeleccionada.invoke("attr", "class").should("contain", "cta_guide_type active")
  }
}
