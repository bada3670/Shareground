/// <reference types="cypress" />

describe('홈페이지', () => {
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
    cy.visit('/');
  });

  it('카테고리 hover해서 이동하기', () => {
    // 코드는 mouseeneter로 했지만 여기서는 mouseover로 하였다.
    cy.get('#category-menu__button').trigger('mouseover');
    cy.get('#category-menu__result').contains('사회').click();
    cy.url().should('contain', 'category');
    cy.url().should('contain', 'society');
    cy.visit('/');
  });

  it('카테고리 키보드로 이동하기', () => {
    cy.get('#category-menu__result').should('have.css', 'display', 'none');
    cy.get('#category-menu__button').focus().type('{enter}');
    cy.get('#category-menu__result').should('not.have.css', 'display', 'none');
  });

  it('작성 페이지로 이동', () => {
    cy.get('#to-create').click();
    cy.url().should('contain', 'create');
    cy.visit('/');
  });

  it('로그인 페이지로 이동', () => {
    cy.get('header #to-login').click();
    cy.url().should('contain', 'sign');
    cy.visit('/');
  });

  it('screen-medium 이하이면 검색창 사라지고 검색 버튼 생김', () => {
    cy.get('#search-narrow__container').should('have.css', 'display', 'none');
    cy.viewport(Cypress.env('screenMedium') - 1, 1000);
    cy.get('#search-narrow__container').should('not.have.css', 'display', 'none');
  });

  it('screen-tiny 이하이면 카테고리 줄어듬', () => {
    cy.get('#category-narrow__button').should('have.css', 'display', 'none');
    cy.viewport(Cypress.env('screenTiny') - 1, 500);
    cy.get('#category-narrow__button').should('not.have.css', 'display', 'none');
  });
});

export {};
