/// <reference types="cypress" />
import { username, password } from "../../support/constants";

describe("Login Test", () => {
  beforeEach(() => {
    console.log("The BASE_URL is:", Cypress.env("BASE_URL"));
    // cy.loginWithSession(username, password); // I wanted to run test with session but it was flaky. So, I used login command instead. Homepage https://www.saucedemo.com/ is not loading properly.
    cy.login(username, password);
  });

  it("Add Sauce Labs Backpack to Cart and Save Product Details", () => {
    //Object to store product details
    let productDetails: ProductDetails = {
      title: "",
      price: "",
      description: "",
    };

    //Saving details of the product in productDetails object
    cy.get('[data-test="inventory-item"]:contains("Sauce Labs Backpack")')
      .within(() => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((text) => (productDetails.title = text.trim()));
        cy.get('[data-test="inventory-item-price"]')
          .invoke("text")
          .then((text) => (productDetails.price = text.trim()));
        cy.get('[data-test="inventory-item-desc"]')
          .invoke("text")
          .then((text) => (productDetails.description = text.trim()));
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      })
      .then(() => {
        // Output saved details to console
        console.log("Product Details:", productDetails);
      });

    // Navigate to cart
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("contain", "/cart.html");

    // Verify product details in cart match the saved details in productDetails object
    cy.get('[data-test="inventory-item-name"]:contains("Sauce Labs Backpack")')
      .parents('[data-test="inventory-item"]')
      .within(() => {
        cy.get('[data-test="inventory-item-name"]').should(
          "have.text",
          productDetails.title
        );
        cy.get(".inventory_item_price").should(
          "have.text",
          productDetails.price
        );
        cy.get(".inventory_item_desc").should(
          "have.text",
          productDetails.description
        );
      });

    // Fetch random user data and complete the checkout
    cy.fetchRandomUser().then((contactInfo) => {
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type(contactInfo.firstName);
      cy.get('[data-test="lastName"]').type(contactInfo.lastName);
      cy.get('[data-test="postalCode"]').type(contactInfo.postcode);
      cy.get('[data-test="continue"]').click();

      // Verify product details in summary
      cy.get('[data-test="inventory-item-name"]').should(
        "contain",
        "Sauce Labs Backpack"
      );
      cy.get('[data-test="inventory-item-price"]').should(
        "contain",
        productDetails.price
      );
      cy.get('[data-test="inventory-item-desc"]').should(
        "contain",
        productDetails.description
      );

      // Finish purchase
      cy.get('[data-test="finish"]').click();
      cy.get("h2").should("contain", "Thank you for your order!");
    });
  });
});
