/// <reference types="cypress" />

export function login(email: string, password: string) {
  cy.visit('/sign');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#log-in').click();
  cy.get('#to-profile').should('exist');
}

export function logout() {
  cy.get('#to-profile').click();
  cy.get('#to-profile').click();
  cy.get('#log-out').click();
  cy.get('#to-login').should('exist');
}
