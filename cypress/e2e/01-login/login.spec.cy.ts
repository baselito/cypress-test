/// <reference types="cypress" />
import { baseUrl, username, password } from "../../support/constants";

describe("Login Test", () => {
  beforeEach(() => {
    console.log("The BASE_URL in spec file is:", Cypress.env("BASE_URL"));
    // cy.loginWithSession(username, password); // I wanted to run test with session but it was flaky. So, I used login command instead. Homepage https://www.saucedemo.com/ is not loading properly.
    cy.login(username, password);
  });

  it("Verify successful login by checking URL and inventory list visibility", () => {
    cy.visit(`${baseUrl}inventory.html`, {
      failOnStatusCode: false,
    });
    cy.url().should("contain", "/inventory");
    cy.get('[data-test="inventory-list"]').should("be.visible");
  });
});
