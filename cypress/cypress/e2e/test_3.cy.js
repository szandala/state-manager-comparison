describe("Change Address", () => {
  it("should checkout correctly", () => {
    cy.visit("http://localhost:5173/");

    cy.get(".MuiGrid-container>.MuiGrid-item>[href^='/product/']").should(
      "have.length.greaterThan",
      1
    );

    cy.contains("div", "Monospace Tee").closest("a").click();

    cy.contains("p", "Select Variant:")
      .parent()
      .find('[role="combobox"]')
      .click();
    cy.get('[data-value="UHJvZHVjdFZhcmlhbnQ6MzQ5"]').click();
    cy.contains("button", "Add to cart").click();

    cy.get('[data-testid="ShoppingCartIcon"]').click();

    cy.get('input[name="email"]').type("person@example.com");
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="streetAddress1"]').type("Via Santi 1");
    cy.get('input[name="city"]').type("Lugano");
    cy.get('input[name="countryArea"]').type("PA");
    cy.get('input[name="postalCode"]').type("15669");

    cy.contains("button", "Save address").click();
  });
});
