/// <reference types="cypress" />
import axios from "axios";

Cypress.Commands.add("fetchRandomUser", () => {
  return axios.get("https://randomuser.me/api/").then((response) => {
    const user = response.data.results[0];
    return {
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      username: user.login.username,
      password: user.login.password,
      address: `${user.location.street.number} ${user.location.street.name}`,
      city: user.location.city,
      state: user.location.state,
      postcode: user.location.postcode,
    };
  });
});

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add(
  "loginWithSession",
  (username: string, password: string) => {
    cy.session(
      [username, password],
      () => {
        cy.visit("/");
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
      },
      {
        cacheAcrossSpecs: true,
      }
    );
  }
);
