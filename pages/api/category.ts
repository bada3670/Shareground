import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import mockArticles from 'data/article';

async function handleGet(req: Req, res: Res) {
  const itemsPerPage = 4;
  const { category, page } = req.query;
  if (typeof category !== 'string' || typeof page !== 'string') {
    res.status(400).end();
    return;
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
  res.status(200).json({ data, pageCount });
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
