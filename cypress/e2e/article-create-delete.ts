/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
// 작성할 내용
const category = '사회';
const title = 'wpahrdlqslek';
const explanation = 'tjfauddlqslek';
const file = 'cypress/fixtures/red.jpg';

describe('글 생성 및 삭제', () => {
  describe('로그아웃 상황', () => {
    it('생성할 수 없다는 메시지가 보여야 한다.', () => {
      cy.visit('/create');
      cy.get('#cannot-create').should('exist');
    });
  });

  describe('로그인 상황', () => {
    beforeEach(() => {
      login('asdf@gmail.com', 'asdf1234');
      cy.get('#to-create').click();
    });
    afterEach(() => {
      logout();
    });

    it('파일이 없는 경우', () => {
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
      // 작성 목록에서 확인하기
      cy.visit('/profile');
      cy.get('#profile-button__wrote').click();
      cy.get('#article-card').contains(title).click();
      // 삭제
      cy.get('#article__delete').click();
      cy.on('window:confirm', (str) => true);
      cy.get('#article-deletion-page').should('exist');
      // 작성 목록에서도 지워졌는지 확인
      cy.visit('/profile');
      cy.get('#profile-button__wrote').click();
      cy.contains(title).should('not.exist');
    });

    it('파일이 있는 경우', () => {
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
    });
  });
});
