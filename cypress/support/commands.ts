/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const getBy = (attribute: string, value: string) => {
  return cy.get(`[${attribute}="${value}"]`);
};

const getByTestId = (testId: string) => getBy("data-test", testId);

const getByClassName = (className: string) => cy.get(`.${className}`);

Cypress.Commands.add("getByTestId", getByTestId);
Cypress.Commands.add("getByClassName", getByClassName);
