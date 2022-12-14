/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import { mockName, mockGet, mockNamePut } from 'cypress/support/mock-user';

it('프로필 이름 바꿨다가 원래대로 돌리기', () => {
  // mocking
  mockNamePut();
  mockGet();
  // 로그인하기
  login('asdf@gmail.com', 'asdf1234');
  // 프로필에서 확인하기
  cy.visit('/profile');
  // 현재 이름 가져오기
  cy.get('#profile-name').invoke('text').as('originalName');
  // 이름 바꾸기
  cy.get('#profile-name__to-edit').click();
  cy.get('#profile-name__edit-input').clear().type(mockName);
  cy.get('#profile-name__edit-confirm').click();
  cy.get('#profile-name').should('have.text', mockName);
  // 로그아웃하기
  logout();
});
