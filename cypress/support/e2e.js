// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const { faker } = require("@faker-js/faker");
const userName = faker.person.firstName();
const userEmail = faker.internet.email();
const userPhone = "5555551234";
const password = "123456";

before(() => {
  cy.fixture("user").then((userdata) => {
    if (userdata.email && userdata.password) {
      // login
      cy.request({
        url: "/login",
        method: "POST",
        body: {
          email: userdata.email,
          password: userdata.password,
        },
      }).then((response) => {
        cy.writeFile("cypress/fixtures/token.json", { Bearer: response.body.token });
      });
    } else {
      // register
      cy.request({
        url: "/register",
        method: "POST",
        body: {
          name: userName,
          email: userEmail,
          phone: userPhone,
          password: password,
          password_confirmation: password,
        },
      });

      // login
      cy.request({
        url: "/login",
        method: "POST",
        body: {
          email: userEmail,
          password: password,
        },
      }).then((response) => {
        cy.writeFile("cypress/fixtures/token.json", { Bearer: response.body.token });
      });
    }
  });
});
