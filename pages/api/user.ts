import mockUsers from 'data/user';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

async function handleGet(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const theUser = mockUsers.find((mockUser) => mockUser.id === user);
  if (!theUser) {
    res.status(404).end();
    return;
  }
  const { name, photo } = theUser;
  res.status(200).json({ name, photo });
}

async function handlePost(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const { name, photo } = req.body;
  mockUsers.push({ id: user, name, photo });
  res.status(201).end();
}

async function handlePut(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  const { name, photo } = req.body;
  const theUser = mockUsers.find((mockUser) => mockUser.id === user);
  if (!theUser) {
    res.status(404).end();
    return;
  }
  if (name !== null) {
    theUser.name = name;
    res.status(204).end();
    return;
  }
  if (photo !== null) {
    const defaultPhoto = process.env.NEXT_PUBLIC_MOCK_USER_PHOTO;
    if (!defaultPhoto) {
      res.status(404).end();
      return;
    }
    res.status(200).json({ url: defaultPhoto });
    return;
  }
}

async function handleDelete(req: Req, res: Res) {
  const { user } = req.query;
  if (typeof user !== 'string') {
    res.status(400).end();
    return;
  }
  mockUsers.forEach((mockUser, index) => {
    if (mockUser.id === user) {
      mockUsers.splice(index, 1);
    }
  });
  res.status(204).end();
}

//////////////////////////////////////////////////////

export default async function (req: Req, res: Res) {
  if (req.method === 'GET') {
    try {
      await handleGet(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'POST') {
    try {
      await handlePost(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'PUT') {
    try {
      await handlePut(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'DELETE') {
    try {
      await handleDelete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
