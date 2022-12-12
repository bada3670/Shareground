/// <reference types="cypress" />

export function login() {
  cy.visit('/sign');
  cy.get('#email').type('asdf@gmail.com');
  cy.get('#password').type('asdf1234');
  cy.get('#log-in').click();
  cy.get('#to-profile').should('exist');
}

export function logout() {
  cy.get('#to-profile').click();
  cy.get('#to-profile').click();
  cy.get('#log-out').click();
  cy.get('#to-login').should('exist');
}

it('로그인하기', () => {
  login();
});

it('로그아웃하기', () => {
  logout();
});
