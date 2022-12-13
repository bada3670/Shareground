/// <reference types="cypress" />
const email = 'zxcv@email.com';
const password = 'asdf1234';

it('회원가입하고 탈퇴하기', () => {
  // 회원가입하기
  cy.visit('/sign');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#sign-up-button').click();
  cy.get('#to-profile').should('exist');
  // profile에서 이름 확인하기
  cy.visit('/profile');
  cy.get('#profile-name').should('have.text', email.split('@')[0]);
  // 탈퇴하기
  cy.get('#delete-account-button').click();
  cy.get('#to-login').should('exist');
});

export {};
