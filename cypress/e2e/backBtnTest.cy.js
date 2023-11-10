describe("Goes to homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/20");
  })
  it("Goes to the homepage", () => {
    cy.visit("http://localhost:5173/20");
  });
  it("Clicks the Add Element Button", () => {
    cy.get('button').click();
  });
});