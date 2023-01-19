/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';

describe('로그인, 로그아웃', () => {
  it('잘못된 아이디인 경우', () => {
    cy.visit('/sign');
    cy.get('#email').type('aaaa@gmail.com');
    cy.get('#password').type('asdf1234');
    cy.get('#log-in').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('해당 계정이 존재하지 않습니다!');
    });
  });

  it('잘못된 비밀번호인 경우', () => {
    cy.visit('/sign');
    cy.get('#email').type('asdf@gmail.com');
    cy.get('#password').type('asdf12345');
    cy.get('#log-in').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('잘못된 비밀번호를 입력하셨습니다!');
    });
  });

  it('로그인하기', () => {
    login('asdf@gmail.com', 'asdf1234');
  });

  it('로그아웃하기', () => {
    logout();
  });
});
