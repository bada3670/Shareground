import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import mockSearchList from 'data/searchList';

async function handleGet(req: Req, res: Res) {
  res.status(200).json({ searchList: mockSearchList });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({});
    }
  }
}
