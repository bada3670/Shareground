/// <reference types="cypress" />

describe('카드', () => {
  before(() => {
    cy.visit('/category/society/1');
  });

  it('카테고리가 한글로 되어 있어야 한다.', () => {
    cy.get('#article-card__others').should('contain', '사회');
  });

  it('날짜가 한글로 되어 있어야 한다.', () => {
    cy.get('#article-card__others').should('contain', '년');
  });
});

export {};
