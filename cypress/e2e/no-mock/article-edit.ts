/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import goToProfile from 'cypress/support/to-profile';
// 원래 내용
const original_category = '문화';
const original_title = '문화 1';
const original_explanation = '문화 1입니다.';
const original_file = 'cypress/fixtures/red.jpg';
// 변형될 내용
const changed_category = '과학기술';
const changed_title = '변형';
const changed_explanation = '변형입니다.';
const changed_file = 'cypress/fixtures/blue.jpg';

describe('로그아웃', () => {
  it('쓸 수 없다는 메시지', () => {
    cy.visit('/edit/zSfNpmAgYXlXL3rEb2iq');
    cy.get('#edit-page__no-author').should('exist');
    cy.visit('/');
  });
});

describe('로그인', () => {
  beforeEach(() => {
    login('asdf@gmail.com', 'asdf1234');
    cy.visit('/article/zSfNpmAgYXlXL3rEb2iq');
    cy.get('#article__to-edit').click();
  });
  afterEach(() => {
    logout();
    cy.visit('/');
  });

  it('원래 -> 변형', () => {
    // 작성
    cy.get('#edit__category').select(changed_category, { force: true });
    cy.get('#edit__title').clear().type(changed_title);
    cy.get('#edit__explanation').clear().type(changed_explanation);
    // 파일 부분은 display가 none이므로 force를 true로 해야 한다.
    cy.get('#edit__file').selectFile(changed_file, { force: true });
    cy.get('#edit__submit').click();
    // 확인
    cy.url().should('contain', 'article');
    cy.get('#article__category').should('contain', changed_category);
    cy.get('#article__writer').should('contain', 'asdf');
    cy.get('#article__title').should('contain', changed_title);
    cy.get('#article__explanation').should('contain', changed_explanation);
    cy.get('#article__file').should('exist');
    // 작성 목록에서 확인하기
    // cy.visit('/profile');
    goToProfile();
    cy.get('#profile-button__wrote').click();
    cy.get('#article-card').contains(changed_title).should('exist');
  });

  it('변형 -> 원래', () => {
    // 작성
    cy.get('#edit__category').select(original_category, { force: true });
    cy.get('#edit__title').clear().type(original_title);
    cy.get('#edit__explanation').clear().type(original_explanation);
    // 파일 부분은 display가 none이므로 force를 true로 해야 한다.
    cy.get('#edit__file').selectFile(original_file, { force: true });
    cy.get('#edit__submit').click();
    // 확인
    cy.url().should('contain', 'article');
    cy.get('#article__category').should('contain', original_category);
    cy.get('#article__writer').should('contain', 'asdf');
    cy.get('#article__title').should('contain', original_title);
    cy.get('#article__explanation').should('contain', original_explanation);
    cy.get('#article__file').should('exist');
    // 작성 목록에서 확인하기
    // cy.visit('/profile');
    goToProfile();
    cy.get('#profile-button__wrote').click();
    cy.get('#article-card').contains(original_title).should('exist');
  });
});
