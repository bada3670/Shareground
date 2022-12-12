/// <reference types="cypress" />
import { login, logout } from 'cypress/e2e/sign';
// 작성할 내용
const category = '사회';
const title = '제목 1';
const explanation = '설명 1';
const file = 'cypress/fixtures/red.jpg';

it('로그아웃 상태', () => {
  cy.visit('/');
  cy.get('#to-create').click();
  cy.get('#cannot-create').should('exist');
});

it('파일이 없는 경우', () => {
  // 로그인하기
  login();
  // 이동하기
  cy.get('#to-create').click();
  // 작성
  cy.get('#create__category').select(category, { force: true });
  cy.get('#create__title').type(title);
  cy.get('#create__explanation').type(explanation);
  cy.get('#create__submit').click();
  // 확인
  cy.url().should('contain', 'article');
  cy.get('#article__category').should('contain', category);
  cy.get('#article__writer').should('contain', 'asdf');
  cy.get('#article__title').should('contain', title);
  cy.get('#article__explanation').should('contain', explanation);
  // 파일 버튼은 없어야 한다.
  cy.get('#article__file').should('not.exist');
  // 삭제
  cy.get('#article__delete').click();
  cy.on('window:confirm', (str) => true);
  cy.get('#article-deletion-page').should('exist');
  // 로그아웃하기
  logout();
});

it('파일이 있는 경우', () => {
  // 로그인하기
  login();
  // 이동하기
  cy.get('#to-create').click();
  // 작성
  cy.get('#create__category').select(category, { force: true });
  cy.get('#create__title').type(title);
  cy.get('#create__explanation').type(explanation);
  // 파일 부분은 display가 none이므로 force를 true로 해야 한다.
  cy.get('#create__file').selectFile(file, { force: true });
  cy.get('#create__submit').click();
  // 확인
  cy.url().should('contain', 'article');
  cy.get('#article__category').should('contain', category);
  cy.get('#article__writer').should('contain', 'asdf');
  cy.get('#article__title').should('contain', title);
  cy.get('#article__explanation').should('contain', explanation);
  cy.get('#article__file').should('exist');
  // 삭제
  cy.get('#article__delete').click();
  cy.on('window:confirm', (str) => true);
  cy.get('#article-deletion-page').should('exist');
  // 로그아웃하기
  logout();
});
