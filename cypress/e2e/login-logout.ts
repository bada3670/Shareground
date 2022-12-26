/// <reference types="cypress" />
import { login, logout } from 'cypress/support/sign';

describe('로그인, 로그아웃', () => {
  it('로그인하기', () => {
    login('asdf@gmail.com', 'asdf1234');
  });

  it('로그아웃하기', () => {
    logout();
  });
});
