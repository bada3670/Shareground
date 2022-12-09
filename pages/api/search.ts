import { db } from 'fb';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// 자주 쓰이는 메시지들
const mesServerError = '죄송합니다. 서버에서 에러가 발생했습니다.';

async function handleGet(req: Req, res: Res) {
  const snapShot = await getDoc(doc(db, 'search', 'search'));
  if (!snapShot.exists()) {
    res.status(404).json({ message: '검색 목록이 존재하지 않습니다.' });
    return;
  }
  const { searchList } = snapShot.data();
  res.status(200).json({ searchList });
}

async function handlePost(req: Req, res: Res) {
  const { newSearchList } = req.body;
  await updateDoc(doc(db, 'search', 'search'), {
    searchList: newSearchList,
  });
  res.status(201).json({ message: '검색 목록에 추가되었습니다.' });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: mesServerError });
    }
  }

  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: mesServerError });
    }
  }
}
