describe("Goes to homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  })
  it("Goes to the homepage", () => {
    cy.visit("http://localhost:5173");
  });
  it("select status", () => {
    cy.get('#demo-simple-select1')
    .parent()
    .click()
    .get('ul > li[data-value="alive"]')
    .click();
  });
  it("select gender", () => {
    cy.get('#demo-simple-select2')
    .parent()
    .click()
    .get('ul > li[data-value="male"]')
    .click();
  });
});