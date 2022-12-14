/// <reference types="cypress" />

export const mockName = 'mock-name';
export const mockPhoto = Cypress.env('defaultProfilePhoto');

export function mockGet() {
  cy.intercept(
    {
      method: 'GET',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 200,
      body: {
        name: mockName,
        photo: mockPhoto,
      },
    }
  ).as('userGet');
}

export function mockNamePut() {
  cy.intercept(
    {
      method: 'PUT',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 204,
      body: {},
    }
  ).as('userNamePut');
}

export function mockPhotoPut() {
  cy.intercept(
    {
      method: 'PUT',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 200,
      body: { url: mockPhoto },
    }
  ).as('userPhotoPut');
}
