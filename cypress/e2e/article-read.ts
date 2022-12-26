/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';

describe('글 읽기', () => {
  describe('로그아웃 상황', () => {
    before(() => {
      cy.visit('/article/9mDSqenHRWNZTvCvsSew');
    });

    it('구성 요소가 있는지 확인', () => {
      cy.get('#article__category').should('exist');
      cy.get('#article__date').should('exist');
      cy.get('#article__writer').should('exist');
      cy.get('#article__title').should('exist');
      cy.get('#article__explanation').should('exist');
      cy.get('#article__file').should('exist');
      cy.get('#article__comment-title').should('exist');
      cy.get('#comment__whole').should('exist');
    });
  });

  describe('로그인 상황', () => {
    before(() => {
      login('asdf@gmail.com', 'asdf1234');
      cy.visit('/article/9mDSqenHRWNZTvCvsSew');
    });
    after(() => {
      logout();
    });

    it('로그인을 한 사람이라면 댓글을 작성할 수 있다.', () => {
      cy.get('#comment-form').should('exist');
    });

    it('자신이 쓴 글이라면 수정과 삭제 버튼이 있어야 한다.', () => {
      cy.get('#article__to-edit').should('exist');
      cy.get('#article__delete').should('exist');
    });
  });
});
