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

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;

  if (typeof user !== 'string') {
    res.status(400).json({});
    return;
  }
  const snap = await getDoc(doc(db, 'users', user));
  if (!snap.exists()) {
    res.status(404).json({});
    return;
  }
  const { name, photo } = snap.data();
  res.status(200).json({ name, photo });
}

async function handlePost(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).json({});
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
    res.status(400).json({});
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
    res.status(400).json({});
    return;
  }
  // 사진이 없을 수도 있으므로 try catch
  try {
    await deleteObject(ref(storage, `profile/${user}`));
  } catch (error) {
    console.error(error);
  }
  await deleteDoc(doc(db, 'users', user));
  const queryMade = query(collection(db, 'articles'), where('userid', '==', user));
  const snapshot = await getDocs(queryMade);
  snapshot.docs.forEach(async (eachDoc) => {
    const { fileRef } = eachDoc.data();
    if (fileRef) {
      await deleteObject(ref(storage, `article-file/${fileRef}`));
    }
    deleteDoc(doc(db, 'articles', eachDoc.id));
  });
  res.status(204).json({});
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

  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({});
    }
  }

  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({});
    }
  }

  if (req.method === 'DELETE') {
    try {
      await handleDelete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({});
    }
  }
}
