/// <reference types="cypress" />
import mockArticles from 'data/article';
const titleText = mockArticles[0].title;

it('wide한 상황에서 검색하기', () => {
  cy.visit('/');
  cy.get('#search-wide-input').type(titleText);
  cy.get('#search-wide-result').contains(titleText).click();
  cy.url().should('contain', 'article');
  cy.get('#article__title').should('have.text', titleText);
});

it('narrow한 상황에서 검색하기', () => {
  cy.viewport(Cypress.env('screenMedium') - 1, 1000);
  cy.get('#search-narrow__button').click();
  cy.get('#search-narrow__input').type(titleText);
  cy.get('#search-narrow__result').contains(titleText).click();
  cy.url().should('contain', 'article');
  cy.get('#article__title').should('have.text', titleText);
});

export {};
