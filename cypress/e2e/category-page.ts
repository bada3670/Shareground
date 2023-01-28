/// <reference types="cypress" />

describe('카테고리 페이지', () => {
  it('구성 요소 확인', () => {
    cy.visit('/category/society/1');
    cy.get('#category-page__title').should('exist');
    cy.get('#article-card').should('exist');
    cy.get('#category-page__paginate').should('exist');
  });

  it('페이지네이션', () => {
    cy.get('#category-page__paginate').contains('2').click();
    cy.url().should('contain', '2');
  });

  it('글로 이동', () => {
    cy.get('#article-card').click();
    cy.url().should('contain', 'article');
  });

  // it('다른 페이지 클릭하고 다시 카테고리로 돌아오면 페이지네이션 active 버튼이 1페이지를 가리켜야 한다', () => {
  //   cy.visit('/category/society/1');
  //   cy.get('#category-page__paginate').contains('2').click();
  //   cy.get('#category-menu__button').click();
  //   cy.get('#category-menu__button').click();
  //   cy.get('#category-menu__result').contains('과학기술').click();
  //   cy.get('#category-menu__button').click();
  //   cy.get('#category-menu__button').click();
  //   cy.get('#category-menu__result').contains('사회').click();
  //   cy.get('#category-page__paginate')
  //     .contains('1')
  //     .should('have.css', 'color', 'rgb(230, 126, 34)');
  // });
});

export {};
