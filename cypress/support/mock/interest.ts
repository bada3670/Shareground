/// <reference types="cypress" />
export const titleForChecking = '글 1';
const totalCount = 2;
const article1 = {
  id: 'a',
  info: {
    fileType: 'pdf',
    title: titleForChecking,
    category: '과학기술',
    username: 'asdf',
    date: 1670912015158,
  },
};
const article2 = {
  id: 'b',
  info: {
    fileType: 'mp4',
    title: '글 2',
    category: '문화',
    username: 'asdf',
    date: 1670912015160,
  },
};
const articles = [article1, article2];

export function mockGet() {
  cy.intercept(
    {
      method: 'GET',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 200,
      body: { articles, totalCount },
    }
  ).as('interestGet');
}

export function mockPut() {
  cy.intercept(
    {
      method: 'PUT',
      url: '**/api/user?user=*',
    },
    {
      statusCode: 204,
      body: {},
    }
  ).as('interestPut');
}
