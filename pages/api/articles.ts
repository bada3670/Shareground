import { db } from 'fb';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// 자주 쓰이는 메시지들
const mesBadRequest = '적절하지 않은 요청입니다.';
const mesServerError = '죄송합니다. 서버에서 에러가 발생했습니다.';

async function handleGet(req: Req, res: Res) {
  if (typeof req.query.doc !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  const snapArticle = await getDoc(doc(db, 'articles', req.query.doc));
  if (!snapArticle.exists()) {
    res.status(404).json({ message: '해당 글이 존재하지 않습니다.' });
    return;
  }
  res.status(200).json({ data: snapArticle.data() });
}

async function handlePost(req: Req, res: Res) {
  const { userid, category, title, explanation, fileRef, fileType, fileURL } = req.body;
  const { id } = await addDoc(collection(db, 'articles'), {
    userid,
    category,
    date: Date.now(),
    title,
    explanation,
    fileRef,
    fileType,
    fileURL,
    interestPeople: [],
    comments: [],
  });
  res.status(201).json({ id });
}

async function handlePut(req: Req, res: Res) {
  if (typeof req.query.doc !== 'string') {
    res.status(400).json({ messagae: mesBadRequest });
    return;
  }
  const { category, title, explanation, fileType } = req.body;
  await updateDoc(doc(db, 'articles', req.query.doc), {
    category,
    title,
    explanation,
    fileType,
  });
  res.status(204).json({ message: '수정되었습니다.' });
}

async function handleDelete(req: Req, res: Res) {
  if (typeof req.query.doc !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  await deleteDoc(doc(db, 'articles', req.query.doc));
  res.status(200).json({ message: '삭제되었습니다.' });
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      res.status(500).json({ message: mesServerError });
    }
  }

  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
    } catch (error) {
      res.status(500).json({ message: mesServerError });
    }
  }

  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      res.status(500).json({ message: mesServerError });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await handleDelete(req, res);
    } catch (error) {
      res.status(500).json({ message: mesServerError });
    }
  }
}
