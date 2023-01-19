/// <reference types="cypress" />
const email = 'sample@gmail.com';
const password = 'asdf1234';

describe('회원가입, 탈퇴', () => {
  it('비밀번호는 6자리 이상이어야 한다.', () => {
    cy.visit('/sign');
    cy.get('#email').type(email);
    cy.get('#password').type('1234');
    cy.get('#sign-up-button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('비밀번호는 6자리 이상이어야 합니다!');
    });
  });

  it('회원가입', () => {
    cy.visit('/sign');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#sign-up-button').click();
    cy.get('#to-profile').should('exist');
  });

  it('프로필에서 이름 확인', () => {
    cy.visit('/profile');
    cy.get('#profile-name').should('have.text', email.split('@')[0]);
  });

  it('탈퇴하기', () => {
    cy.get('#delete-account-button').click();
    cy.get('#to-login').should('exist');
  });
});

export {};
