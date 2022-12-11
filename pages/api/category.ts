import { db } from 'fb';
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const itemsPerPage = 4;
  const { category, page } = req.query;

  if (typeof category !== 'string' || typeof page !== 'string') {
    res.status(400).json({});
    return;
  }

  const countQuery = query(collection(db, 'articles'), where('category', '==', category));
  const countSnapshot = await getCountFromServer(countQuery);
  const pageCount = Math.ceil(countSnapshot.data().count / itemsPerPage);

  // 페이지네이트
  let realQuery;
  if (parseInt(page) === 1) {
    // 첫 페이지인 경우
    realQuery = query(
      collection(db, 'articles'),
      where('category', '==', category),
      orderBy('date', 'desc'),
      limit(itemsPerPage)
    );
  } else {
    // 두 번째 페이지부터
    const offset = itemsPerPage * (parseInt(page) - 1);
    const offsetQuery = query(
      collection(db, 'articles'),
      where('category', '==', category),
      orderBy('date', 'desc'),
      limit(offset)
    );
    const offsetSnapshot = await getDocs(offsetQuery);
    const lastOffset = offsetSnapshot.docs.at(-1);
    realQuery = query(
      collection(db, 'articles'),
      where('category', '==', category),
      orderBy('date', 'desc'),
      startAfter(lastOffset),
      limit(itemsPerPage)
    );
  }
  const realSnapshot = await getDocs(realQuery); // 페이지네이트
  const data = realSnapshot.docs.map((result) => ({
    id: result.id,
    info: result.data(),
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
      res.status(500).json({});
    }
  }
}
