/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';
import mockAccounts from 'data/account';

it('로그인하기', () => {
  login(mockAccounts[0].email, mockAccounts[0].password);
});

it('로그아웃하기', () => {
  logout();
});
