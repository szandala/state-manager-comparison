describe("Filter Products", () => {
  it("should apply filters and update product list correctly", () => {
    cy.visit("http://localhost:5173/");

    // load product cards
    cy.get(".MuiGrid-container>.MuiGrid-item>[href^='/product/']").should(
      "have.length.greaterThan",
      1
    );

    cy.contains("button", "Filter").click();

    cy.contains("p", "Stock Available")
      .nextAll("span")
      .find('input[type="checkbox"]')
      .check({ force: true });

    const value = "250";
    cy.get('span[data-index="1"] input[type="range"]')
      .invoke("val", value)
      .invoke("attr", "aria-valuenow", value)
      .trigger("input", { force: true })
      .trigger("change", { force: true });

    cy.get('span[data-index="1"].MuiSlider-thumbColorPrimary').invoke(
      "attr",
      "style",
      "left: 83.3333%;"
    );
    cy.get('span[data-index="1"] .MuiSlider-valueLabelLabel').invoke(
      "text",
      value
    );
    cy.get('input[type="range"][data-index="1"]').should(
      "have.attr",
      "aria-valuenow",
      value
    );

    cy.contains("label", "Category")
      .parents(".MuiFormControl-root")
      .find("[role='combobox']")
      .click();
    cy.get("[data-value='Q2F0ZWdvcnk6Mjg=']").click();
    cy.get("#menu- > .MuiBackdrop-root").click();

    cy.wait(2000);
    cy.contains("label", "Category")
      .parents(".MuiFormControl-root")
      .find("[role='combobox']")
      .click();
    cy.get('[data-value="Q2F0ZWdvcnk6Mzk="]').click();
  });
});
