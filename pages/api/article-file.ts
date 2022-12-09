import { storage } from 'fb';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

// 자주 쓰이는 메시지들
const mesBadRequest = '적절하지 않은 요청입니다.';
const mesServerError = '죄송합니다. 서버에서 에러가 발생했습니다.';

async function handlePost(req: Req, res: Res) {
  const { fileType, buffer } = req.body;
  const fileRef = uuidv4() + '.' + fileType;
  const storageRef = ref(storage, `article-file/${fileRef}`);
  await uploadBytes(storageRef, new Uint8Array(buffer));
  const fileURL = await getDownloadURL(storageRef);
  res.status(201).json({ fileRef, fileURL });
}

async function handleDelete(req: Req, res: Res) {
  if (typeof req.query.file !== 'string') {
    res.status(400).json({ message: mesBadRequest });
    return;
  }
  await deleteObject(ref(storage, `article-file/${req.query.file}`));
  res.status(200).json({ message: '삭제되었습니다.' });
}

export default async function (req: Req, res: Res) {
  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
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
      res.status(500).json({ message: mesServerError });
    }
  }
}
