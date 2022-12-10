import { db, storage } from 'fb';
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// 자주 쓰이는 메시지들
const mesBadRequest = '적절하지 않은 요청입니다.';
const mesServerError = '죄송합니다. 서버에서 에러가 발생했습니다.';

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;

  if (typeof user !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  const snap = await getDoc(doc(db, 'users', user));
  if (!snap.exists()) {
    res.status(404).json({ message: '해당 사용자가 존재하지 않습니다.' });
    return;
  }
  const { name, photo } = snap.data();
  res.status(200).json({ name, photo });
}

async function handlePost(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  const { name, photo } = req.body;
  await setDoc(doc(db, 'users', user), {
    name,
    photo,
  });
  res.status(201).json({});
}

async function handlePut(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  const { name, photo } = req.body;
  if (name !== null) {
    await updateDoc(doc(db, 'users', user), {
      name,
    });
    res.status(204).json({});
    return;
  }
  if (photo !== null) {
    const storageRef = ref(storage, `profile/${user}`);
    await uploadBytes(storageRef, new Uint8Array(photo));
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, 'users', user), {
      photo: url,
    });
    res.status(200).json({ url });
    return;
  }
}

async function handleDelete(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  await deleteObject(ref(storage, `profile/${user}`));
  await deleteDoc(doc(db, 'users', user));
  const queryMade = query(collection(db, 'articles'), where('userid', '==', user));
  const snapshot = await getDocs(queryMade);
  snapshot.docs.forEach(async ({ id }) => {
    deleteDoc(doc(db, 'articles', id));
  });
  res.status(204).json({ message: '삭제되었습니다.' });
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

  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: mesServerError });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await handleDelete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '일부가 삭제되지 못했습니다.' });
    }
  }
}
