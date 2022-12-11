import { db } from 'fb';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const snapShot = await getDoc(doc(db, 'search', 'search'));
  if (!snapShot.exists()) {
    res.status(404).json({});
    return;
  }
  const { searchList } = snapShot.data();
  res.status(200).json({ searchList });
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
