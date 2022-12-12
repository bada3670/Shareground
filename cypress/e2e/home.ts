/// <reference types="cypress" />

it('각종 부분이 있는지 체크하기', () => {
  cy.visit('/');
  cy.get('header');
  cy.get('#welcome');
  cy.get('#intro');
  cy.get('footer');
});

it('카테고리 클릭해서 이동하기', () => {
  cy.get('#category-menu__button').click();
  cy.get('#category-menu__button').click();
  cy.get('#category-menu__result').contains('사회').click();
  cy.url().should('contain', 'category');
  cy.url().should('contain', 'society');
});

it('카테고리 hover해서 이동하기', () => {
  cy.visit('/');
  // 코드는 mouseeneter로 했지만 여기서는 mouseover로 하였다.
  cy.get('#category-menu__button').trigger('mouseover');
  cy.get('#category-menu__result').contains('사회').click();
  cy.url().should('contain', 'category');
  cy.url().should('contain', 'society');
});

it('작성 페이지로 이동', () => {
  cy.visit('/');
  cy.get('#to-create').click();
  cy.url().should('contain', 'create');
});

// 로그아웃이 된 상태에서 해야 한다!
it.skip('로그인 페이지로 이동', () => {
  cy.visit('/');
  cy.get('header #to-login').click();
  cy.url().should('contain', 'sign');
});

export {};
