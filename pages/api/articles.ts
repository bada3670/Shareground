import { db, storage } from 'fb';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const { ar } = req.query;
  if (typeof ar !== 'string') {
    res.status(400).json({});
    return;
  }
  // 글 가져오기
  const snapArticle = await getDoc(doc(db, 'articles', ar));
  if (!snapArticle.exists()) {
    res.status(404).json({});
    return;
  }
  const { userid } = snapArticle.data();
  // 작성자 정보 가져오기
  const snapWriter = await getDoc(doc(db, 'users', userid));
  if (!snapWriter.exists()) {
    res.status(404).json({});
    return;
  }
  const { name } = snapWriter.data();
  // 보내기
  res.status(200).json({ ...snapArticle.data(), username: name });
}

async function handlePost(req: Req, res: Res) {
  const { fileType, fileBuffer, userid, category, title, explanation } = req.body;
  // 파일 올리기
  let fileRef = null;
  let fileURL = null;
  if (fileType !== null && fileBuffer !== null) {
    fileRef = uuidv4() + '.' + fileType;
    const storageRef = ref(storage, `article-file/${fileRef}`);
    await uploadBytes(storageRef, new Uint8Array(fileBuffer));
    fileURL = await getDownloadURL(storageRef);
  }
  // 글 올리기
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
  // 검색 목록에 추가하기
  const snapShot = await getDoc(doc(db, 'search', 'search'));
  if (!snapShot.exists()) {
    res.status(404).json({});
    return;
  }
  const { searchList } = snapShot.data();
  const searchListLimit = 10;
  const searchListLength = searchList.length;
  const searchListMargin = searchListLength + 1 - searchListLimit;
  let newSearchList;
  if (searchListMargin > 0) {
    newSearchList = searchList.slice(searchListMargin);
  } else {
    newSearchList = searchList;
  }
  newSearchList.push({ id, title });
  await updateDoc(doc(db, 'search', 'search'), {
    searchList: newSearchList,
  });
  res.status(201).json({ id, newSearchList });
}

async function handlePut(req: Req, res: Res) {
  const { ar } = req.query;
  if (typeof ar !== 'string') {
    res.status(400).json({});
    return;
  }
  const { prevFileRef, fileType, fileBuffer, category, title, explanation } = req.body;
  // 기존 파일 삭제
  if (prevFileRef) {
    await deleteObject(ref(storage, `article-file/${prevFileRef}`));
  }
  // 새 파일 올리기
  let fileRef = null;
  let fileURL = null;
  if (fileType !== null && fileBuffer !== null) {
    fileRef = uuidv4() + '.' + fileType;
    const storageRef = ref(storage, `article-file/${fileRef}`);
    await uploadBytes(storageRef, new Uint8Array(fileBuffer));
    fileURL = await getDownloadURL(storageRef);
  }
  // 글 수정하기
  await updateDoc(doc(db, 'articles', ar), {
    category,
    title,
    explanation,
    fileType,
    fileRef,
    fileURL,
  });
  res.status(204).json({});
}

async function handleDelete(req: Req, res: Res) {
  const { ar, fi } = req.query;
  if (typeof ar !== 'string' || typeof fi !== 'string') {
    res.status(400).json({});
    return;
  }
  if (fi !== 'no') {
    await deleteObject(ref(storage, `article-file/${fi}`));
  }
  await deleteDoc(doc(db, 'articles', ar));
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
