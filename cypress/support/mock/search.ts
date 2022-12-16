/// <reference types="cypress" />

import { searchList } from 'cypress/support/mock/data';

export function mockSearch() {
  cy.intercept(
    {
      method: 'GET',
      url: '**/api/search',
    },
    {
      statusCode: 200,
      body: { searchList },
    }
  );
}
