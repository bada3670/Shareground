import { db } from 'fb';
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const { user, count } = req.query;
  if (typeof user !== 'string' || typeof count !== 'string') {
    res.status(400).json({ message: '잘못된 요청입니다.' });
    return;
  }
  const currentCount = parseInt(count);
  const queryArticles = query(
    collection(db, 'articles'),
    where('userid', '==', user),
    orderBy('date', 'desc'),
    limit(currentCount)
  );
  const snapshotArticles = await getDocs(queryArticles);
  const articles = snapshotArticles.docs.map((doc) => ({
    id: doc.id,
    info: doc.data(),
  }));
  const queryCount = query(collection(db, 'articles'), where('userid', '==', user));
  const countSnapshot = await getCountFromServer(queryCount);
  const totalCount = countSnapshot.data().count;
  res.status(200).json({ articles, totalCount });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '죄송합니다. 서버에서 에러가 났습니다.' });
    }
  }
}
