/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
const titleText = '사회 1';

describe('관심 목록', () => {
  it('추가하고 삭제하기', () => {
    // 로그인하기
    login('qwer@gmail.com', 'asdf1234');
    cy.visit('/article/9mDSqenHRWNZTvCvsSew');
    // 추가하기
    cy.get('#article__interest-button').click();
    cy.get('#article__interest-button svg').should('have.attr', 'data-prefix', 'fas');
    // 프로필에서 확인하기
    cy.visit('/profile');
    cy.get('#profile-button__interest').click();
    cy.contains(titleText).click();
    // 해제하기
    cy.get('#article__interest-button svg').should('have.attr', 'data-prefix', 'fas');
    cy.get('#article__interest-button').click();
    cy.get('#article__interest-button svg').should('have.attr', 'data-prefix', 'far');
    // 프로필에서 확인하기
    cy.visit('/profile');
    cy.get('#profile-button__interest').click();
    cy.contains(titleText).should('not.exist');
    // 로그아웃하기
    logout();
  });
});
