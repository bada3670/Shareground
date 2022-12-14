/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import { titleForChecking, mockGet, mockPut } from 'cypress/support/mock/interest';
const titleText = '사회 1';

describe('관심 목록에서 추가하고 삭제하기', () => {
  before(() => {
    // 로그인: 다른 사람이어야 한다!
    login('qwer@gmail.com', 'asdf1234');
    cy.visit('/article/9mDSqenHRWNZTvCvsSew');
  });
  after(() => {
    logout();
  });

  it('추가하기', () => {
    cy.get('#article__interest-button').click();
    cy.get('#article__interest-button svg').should('have.attr', 'data-prefix', 'fas');
  });

  it('프로필에서 확인하기', () => {
    cy.visit('/profile');
    cy.get('#profile-button__interest').click();
    cy.contains(titleForChecking).should('exist');
  });

  it('해제하기', () => {
    cy.get('#article__interest-button svg').should('have.attr', 'data-prefix', 'fas');
    cy.get('#article__interest-button').click();
    // 해제한 다음에 확인하려고 했는데 안 된다. 계속 fas라고 한다. (1)
  });

  it('프로필에서 확인하기', () => {
    cy.visit('/profile');
    cy.get('#profile-button__interest').click();
    cy.contains(titleText).should('not.exist');
  });
});
