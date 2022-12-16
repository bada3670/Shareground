/// <reference types="cypress" />
import { user1, user2 } from 'cypress/support/mock/data';
export const mockUserInfo = {
  name: '가짜 사용자',
  photo: Cypress.env('defaultProfilePhoto'),
};

export function mockGet(id: string) {
  cy.log(id);
  let name;
  let photo;
  switch (id) {
    case user1.id:
      name = user1.name;
      photo = user1.photo;
      break;
    case user2.id:
      name = user2.name;
      photo = user2.photo;
      break;
    default:
      break;
  }
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

export function mockNamePut() {
  function changeName() {
    user1.name = mockUserInfo.name;
    return {};
  }

  cy.intercept(
    {
      method: 'PUT',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 204,
      body: changeName(),
    }
  );
}

// export function mockPhotoPut() {
//   cy.intercept(
//     {
//       method: 'PUT',
//       url: '**/api/user?user=*',
//     },
//     {
//       statusCode: 200,
//       body: { url: mockPhoto },
//     }
//   ).as('userPhotoPut');
// }
