/// <reference types="cypress" />

it('글이 있는 경우', () => {
  cy.visit('/category/society/1');
  cy.get('#category-page__title').should('exist');
  cy.get('#article-card').should('exist');
  cy.get('#category-page__paginate').should('exist');
});

it('페이지네이션', () => {
  cy.get('#category-page__paginate').contains('2').click();
  cy.url().should('contain', '2');
  cy.visit('/category/society/1');
});

it('글로 이동', () => {
  cy.get('#article-card').click();
  cy.url().should('contain', 'article');
});

export {};
