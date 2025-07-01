describe("Homepage Sorting Order Toggle", () => {
  it("should toggle sort order from ascending to descending", () => {
    cy.visit("http://localhost:5173/");

    // Wait for product cards to load
    cy.get(".MuiGrid-container>.MuiGrid-item>[href^='/product/']").should(
      "have.length.greaterThan",
      1
    );

    // Click sort order button (toggles to descending)
    cy.get('[data-testid="KeyboardArrowDownIcon"]').parents("button").click();

    // Wait for product cards to load again
    cy.get(".MuiGrid-container>.MuiGrid-item>[href^='/product/']").should(
      "have.length.greaterThan",
      1
    );
  });
});
