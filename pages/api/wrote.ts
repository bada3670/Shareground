import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import mockArticles from 'data/article';

async function handleGet(req: Req, res: Res) {
  const { user, count } = req.query;
  if (typeof user !== 'string' || typeof count !== 'string') {
    res.status(400).end();
    return;
  }
  const currentCount = parseInt(count);
  const theArticles = mockArticles.filter((mockArticle) => mockArticle.userid === user);
  theArticles.sort((a, b) => b.date - a.date);
  const totalCount = theArticles.length;
  const takenArticles = theArticles.slice(0, currentCount);
  const results = takenArticles.map((takenArticle) => ({
    id: takenArticle.id,
    info: takenArticle,
  }));
  res.status(200).json({ articles: results, totalCount });
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
