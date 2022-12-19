/// <reference types="cypress" />

it('wide한 상황에서 최신 글 찾고, 검색하기', () => {
  cy.visit('/category/society/1');
  cy.get('#article-card__title')
    .first()
    .then(($firstArticleCard) => {
      const titleText = $firstArticleCard.text();
      cy.get('#search-wide-input').type(titleText);
      cy.get('#search-wide-result').contains(titleText).click();
      cy.url().should('contain', 'article');
      cy.get('#article__title').should('have.text', titleText);
    });
  cy.visit('/category/society/1');
});

it('narrow한 상황에서 최신 글 찾고, 검색하기', () => {
  cy.viewport(Cypress.env('screenMedium') - 1, 1000);
  cy.get('#search-narrow__button').click();
  cy.get('#article-card__title')
    .first()
    .then(($firstArticleCard) => {
      const titleText = $firstArticleCard.text();
      cy.get('#search-narrow__input').type(titleText);
      cy.get('#search-narrow__result').contains(titleText).click();
      cy.url().should('contain', 'article');
      cy.get('#article__title').should('have.text', titleText);
    });
});

export {};
