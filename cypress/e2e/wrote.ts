/// <reference types="cypress" />
import mockArticles from 'data/article';
import userAccounts from 'data/account';
import { login, logout } from 'cypress/support/sign';

it('첫 번째 글에서 작성자 id 가져온 후, 해당 유저의 wrote에 해당 글이 있는지 확인', () => {
  const { userid, title } = mockArticles[0];
  const theUserAccount = userAccounts.find((userAccount) => userAccount.id === userid);
  let email, password;
  if (theUserAccount) {
    email = theUserAccount.email;
    password = theUserAccount.password;
  }
  if (email && password) {
    login(email, password);
  }
  cy.visit('/profile');
  cy.get('#profile-button__wrote').click();
  cy.get('#article-card').contains(title).should('exist');
  logout();
});
