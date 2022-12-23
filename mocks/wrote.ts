import { rest } from 'msw';
import mockArticles from 'data/article';

const address = '/api/wrote';

export const wroteHandlers = [
  // GET
  rest.get(address, (req, res, ctx) => {
    const params = req.url.searchParams;
    const userid = params.get('user');
    const count = params.get('count');
    if (!userid || !count) {
      return res(ctx.status(400));
    }
    const currentCount = parseInt(count);
    const theArticles = mockArticles.filter(
      (mockArticle) => mockArticle.userid === userid
    );
    theArticles.sort((a, b) => b.date - a.date);
    const totalCount = theArticles.length;
    const takenArticles = theArticles.slice(0, currentCount);
    const results = takenArticles.map((takenArticle) => ({
      id: takenArticle.id,
      info: takenArticle,
    }));
    return res(ctx.status(200), ctx.json({ articles: results, totalCount }));
  }),
];
