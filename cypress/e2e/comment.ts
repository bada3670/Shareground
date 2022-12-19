/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
// 작성할 내용
const content = 'cypress에서 작성한 댓글입니다.';

it('작성 -> 확인 -> 삭제', () => {
  // 로그인하기
  login('asdf@gmail.com', 'asdf1234');
  // 이동하기
  cy.visit('/article/9mDSqenHRWNZTvCvsSew');
  // 작성
  cy.get('#comment-form__content').type(content);
  cy.get('#comment-form__submit').click();
  // 작성 확인
  cy.contains(content).should('exist');
  // 삭제
  cy.get('#comment__delete').click();
  cy.on('window:confirm', (str) => true);
  // 삭제 확인
  cy.contains(content).should('not.exist');
  // 로그아웃하기
  logout();
});
