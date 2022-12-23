import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import mockArticles from 'data/article';
import mockUsers from 'data/user';

async function handleGet(req: Req, res: Res) {
  const { ar } = req.query;
  if (typeof ar !== 'string') {
    res.status(400).end();
    return;
  }
  // 글 가져오기
  const theArticle = mockArticles.find((mockArticle) => mockArticle.id === ar);
  if (!theArticle) {
    res.status(404).end();
    return;
  }
  const { userid } = theArticle;
  // 작성자 정보 가져오기
  const theUser = mockUsers.find((mockUser) => mockUser.id === userid);
  if (!theUser) {
    res.status(404).end();
    return;
  }
  const { name } = theUser;
  // 보내기
  res.status(200).json({ ...theArticle, username: name });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
