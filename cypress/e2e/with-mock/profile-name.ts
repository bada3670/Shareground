/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import { mockUserInfo, mockGet, mockNamePut } from 'cypress/support/mock/user';
import { user1 } from 'cypress/support/mock/data';

it('프로필 이름 바꾸기', () => {
  // mocking
  mockNamePut();
  mockGet(user1.id);
  // 로그인하기
  login(user1.email, user1.password);
  // 프로필 페이지로 이동
  cy.visit('/profile');
  // 이름 바꾸기
  cy.get('#profile-name__to-edit').click();
  cy.get('#profile-name__edit-input').clear().type(mockUserInfo.name);
  cy.get('#profile-name__edit-confirm').click();
  // 위에서 mockGet을 했으므로 해당 이름이 잡힌다.
  cy.get('#profile-name').should('have.text', mockUserInfo.name);
  // 로그아웃하기
  logout();
});
