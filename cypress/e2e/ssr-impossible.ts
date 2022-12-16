/// <reference types="cypress" />
import { mockSearch } from 'cypress/support/mock/search';
import { searchList } from 'cypress/support/mock/data';

it('ssr', () => {
  mockSearch();
  cy.visit('/search-ssr');
  cy.contains(searchList[0].title).should('exist');
});

it('csr', () => {
  mockSearch();
  cy.visit('/search-csr');
  cy.contains(searchList[0].title).should('exist');
});
