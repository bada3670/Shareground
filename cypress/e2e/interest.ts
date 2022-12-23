/// <reference types="cypress" />
import mockArticles from 'data/article';
import mockAccounts from 'data/account';
import { login, logout } from 'cypress/support/sign';

it('첫 번째 글에서 작성자 id 가져온 후, 해당 유저의 wrote에 해당 글이 있는지 확인', () => {
  const { interestPeople, title } = mockArticles[0];
  const thePerson = interestPeople[0];
  const theMockAccount = mockAccounts.find((mockAccount) => mockAccount.id === thePerson);
  if (theMockAccount) {
    const { email, password } = theMockAccount;
    login(email, password);
  }
  cy.visit('/profile');
  cy.get('#profile-button__interest').click();
  cy.get('#article-card').contains(title).should('exist');
  logout();
});
