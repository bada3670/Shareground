/// <reference types="cypress" />
import { mockSearch } from 'cypress/support/mock/search';
import { searchList } from 'cypress/support/mock/data';

it.only('wide한 상황에서 검색하기', () => {
  mockSearch();
  cy.get('#search-wide-input').type(searchList[0].title);
  cy.get('#search-wide-result').contains(searchList[0].title).click();
  cy.url().should('contain', 'article');
  cy.get('#article__title').should('have.text', searchList[0].title);
});

// it('narrow한 상황에서 최신 글 찾고, 검색하기', () => {
//   cy.viewport(Cypress.env('screenMedium') - 1, 1000);
//   cy.get('#search-narrow__button').click();
//   cy.get('#article-card__title')
//     .first()
//     .then(($firstArticleCard) => {
//       const titleText = $firstArticleCard.text();
//       cy.get('#search-narrow__input').type(titleText);
//       cy.get('#search-narrow__result').contains(titleText).click();
//       cy.url().should('contain', 'article');
//       cy.get('#article__title').should('have.text', titleText);
//     });
// });
