import { rest } from 'msw';
import mockUsers from 'data/user';

const address = '/api/user';

export const userHandlers = [
  // GET
  rest.get(address, (req, res, ctx) => {
    const params = req.url.searchParams;
    const userid = params.get('user');
    const theUser = mockUsers.find((mockUser) => mockUser.id === userid);
    if (!theUser) {
      return res(ctx.status(404));
    }
    const { name, photo } = theUser;
    return res(ctx.status(200), ctx.json({ name, photo }));
  }),

  // POST
  rest.post(address, async (req, res, ctx) => {
    const params = req.url.searchParams;
    const userid = params.get('user');
    if (!userid) {
      return res(ctx.status(400));
    }
    const { name, photo } = await req.json();
    mockUsers.push({ id: userid, name, photo });
    return res(ctx.status(201));
  }),

  // PUT
  rest.put(address, async (req, res, ctx) => {
    const params = req.url.searchParams;
    const userid = params.get('user');
    if (!userid) {
      return res(ctx.status(400));
    }
    const { name, photo } = await req.json();
    const theUser = mockUsers.find((mockUser) => mockUser.id === userid);
    if (!theUser) {
      return res(ctx.status(404));
    }
    if (name !== null) {
      theUser.name = name;
      return res(ctx.status(204));
    }
    if (photo !== null) {
      const defaultPhoto = process.env.NEXT_PUBLIC_MOCK_USER_PHOTO;
      if (!defaultPhoto) {
        return res(ctx.status(404));
      }
      return res(ctx.status(200), ctx.json({ url: defaultPhoto }));
    }
  }),

  // DELETE
  rest.delete(address, (req, res, ctx) => {
    const params = req.url.searchParams;
    const userid = params.get('user');
    if (!userid) {
      return res(ctx.status(400));
    }
    mockUsers.forEach((mockUser, index) => {
      if (mockUser.id === userid) {
        mockUsers.splice(index, 1);
      }
    });
    return res(ctx.status(204));
  }),
];
