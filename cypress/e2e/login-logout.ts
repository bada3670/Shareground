/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';

it('로그인하기', () => {
  login('asdf@gmail.com', 'asdf1234');
});

it('로그아웃하기', () => {
  logout();
});
