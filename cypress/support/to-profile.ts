/// <reference types="cypress" />

export default function () {
  cy.get('#to-profile').click();
  cy.get('#to-profile').click();
  cy.get('#to-profile-button').click();
}
