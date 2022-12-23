/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import mockArticles from 'data/article';
import mockAccounts from 'data/account';
const articleid = mockArticles[0].id;
const writerid = mockArticles[0].userid;
const writerAccount = mockAccounts.find((mockAccount) => mockAccount.id === writerid);

describe('로그인을 하지 않은 경우', () => {
  before(() => {
    cy.visit(`/article/${articleid}`);
  });

  it('구성 요소가 있는지 확인', () => {
    cy.get('#article__category').should('exist');
    cy.get('#article__date').should('exist');
    cy.get('#article__writer').should('exist');
    cy.get('#article__title').should('exist');
    cy.get('#article__explanation').should('exist');
    cy.get('#article__comment-title').should('exist');
    cy.get('#comment__whole').should('exist');
  });
});

describe('로그인을 한 경우', () => {
  before(() => {
    if (writerAccount) {
      const { email, password } = writerAccount;
      login(email, password);
    }
    cy.visit(`/article/${articleid}`);
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
