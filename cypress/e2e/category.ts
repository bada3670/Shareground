/// <reference types="cypress" />
import mockArticles from 'data/article';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';

const { category, title } = mockArticles[0];

it('첫 번째 글 해당 카테고리에 있는지 확인', () => {
  cy.visit(`/category/${category}/1`);
  cy.get('#category-page__title').should('have.text', categoryEngToKor(category));
  cy.get('#article-card__title').contains(title).should('exist');
  cy.get('#category-page__paginate').should('exist');
});
