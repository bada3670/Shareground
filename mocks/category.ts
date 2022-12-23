import { rest } from 'msw';
import mockArticles from 'data/article';

const address = 'http://localhost:3000/api/category';

export const categoryHandlers = [
  // GET
  rest.get(address, (req, res, ctx) => {
    const itemsPerPage = 4;
    const params = req.url.searchParams;
    const category = params.get('category');
    const page = params.get('page');
    if (!category || !page) {
      return res(ctx.status(400));
    }
    const theArticles = mockArticles.filter(
      (mockArticle) => mockArticle.category === category
    );
    theArticles.sort((a, b) => b.date - a.date);
    const pageStart = (parseInt(page) - 1) * itemsPerPage;
    const pageEnd = parseInt(page) * itemsPerPage;
    const selectedArticles = theArticles.slice(pageStart, pageEnd);
    const pageCount = Math.ceil(theArticles.length / itemsPerPage);
    const data = selectedArticles.map((selectedArticle) => ({
      id: selectedArticle.id,
      info: selectedArticle,
    }));
    return res(ctx.status(200), ctx.json({ data, pageCount }));
  }),
];
