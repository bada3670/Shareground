import { rest } from 'msw';
import mockArticles from 'data/article';
import mockUsers from 'data/user';

const address = 'http://localhost:3000/api/articles';

export const articleHandlers = [
  // GET
  rest.get(address, (req, res, ctx) => {
    const params = req.url.searchParams;
    const articleid = params.get('ar');
    const theArticle = mockArticles.find((mockArticle) => mockArticle.id === articleid);
    if (!theArticle) {
      return res(ctx.status(404));
    }
    const { userid } = theArticle;
    const theUser = mockUsers.find((mockUser) => mockUser.id === userid);
    if (!theUser) {
      return res(ctx.status(404));
    }
    const { name } = theUser;
    return res(ctx.status(200), ctx.json({ ...theArticle, username: name }));
  }),
];
