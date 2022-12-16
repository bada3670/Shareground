/// <reference types="cypress" />

export function mockGet() {
  cy.intercept(
    {
      method: 'GET',
      url: `**/api/user?user=${id}`,
    },
    {
      statusCode: 200,
      body: {
        name,
        photo,
      },
    }
  );
}
