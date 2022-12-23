import { rest } from 'msw';
import mockSearchList from 'data/searchList';

const address = '/api/search';

export const searchHandlers = [
  // GET
  rest.get(address, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ searchList: mockSearchList }));
  }),
];
