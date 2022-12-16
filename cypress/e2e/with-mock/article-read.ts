/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import { article1, user1, user2 } from 'cypress/support/mock/data';
import { mockGet } from 'cypress/support/mock/article';
import { mockGet as mockGetUser } from 'cypress/support/mock/user';

describe.only('로그인을 하지 않은 경우', () => {
  before(() => {});

  it('구성 요소가 있는지 확인', () => {
    mockGet(article1);
    mockGetUser(user1.id);
    mockGetUser(user2.id);
    cy.visit(`/article/${article1.articleid}`);
    cy.get('#article__category').should('exist');
    cy.get('#article__date').should('exist');
    cy.get('#article__writer').should('exist');
    cy.get('#article__title').should('exist');
    cy.get('#article__explanation').should('exist');
    // cy.get('#article__file').should('exist');
    cy.get('#article__comment-title').should('exist');
    // cy.get('#comment__whole').should('exist');
  });
});

// describe('로그인을 한 경우', () => {
//   before(() => {
//     login('asdf@gmail.com', 'asdf1234');
//     cy.visit('/article/9mDSqenHRWNZTvCvsSew');
//   });
//   after(() => {
//     logout();
//   });

//   it('로그인을 한 사람이라면 댓글을 작성할 수 있다.', () => {
//     cy.get('#comment-form').should('exist');
//   });

//   it('자신이 쓴 글이라면 수정과 삭제 버튼이 있어야 한다.', () => {
//     cy.get('#article__to-edit').should('exist');
//     cy.get('#article__delete').should('exist');
//   });
// });
