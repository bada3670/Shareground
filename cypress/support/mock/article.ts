/// <reference types="cypress" />

export function mockGet(article: any) {
  cy.intercept(
    {
      method: 'GET',
      url: `**/api/articles?ar=${article.articleid}`,
    },
    {
      statusCode: 200,
      body: article,
    }
  );
}

// export function mockPut() {
//   cy.intercept(
//     {
//       method: 'PUT',
//       url: '**/api/articles?ar=*',
//     },
//     {
//       statusCode: 204,
//       body: {},
//     }
//   ).as('interestPut');
// }
