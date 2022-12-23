import users from './user';

interface Comment {
  content: string;
  date: number;
  id: string;
  writerid: string;
}
interface Article {
  id: string;
  category: string;
  comments: Comment[];
  date: number;
  explanation: string;
  fileRef: null | string;
  fileType: null | string;
  fileURL: null | string;
  interestPeople: string[];
  title: string;
  userid: string;
}

const article1 = {
  id: 'aaaaaa',
  category: 'science',
  comments: [
    {
      content: 'mock 글 1 댓글',
      date: 1670915519101,
      id: 'comment-id-1-1',
      writerid: users[1].id,
    },
  ],
  date: 1670915520101,
  explanation: 'mock 글 1 설명',
  fileRef: null,
  fileType: null,
  fileURL: null,
  interestPeople: [users[1].id],
  title: 'mock 글 1 제목',
  userid: users[0].id,
};
const article2 = {
  id: 'bbbbbb',
  category: 'science',
  comments: [
    {
      content: 'mock 글 2 댓글',
      date: 1670916619101,
      id: 'comment-id-2-1',
      writerid: users[0].id,
    },
  ],
  date: 1669915520101,
  explanation: 'mock 글 2 설명',
  fileRef: null,
  fileType: null,
  fileURL: null,
  interestPeople: [users[0].id],
  title: 'mock 글 2 제목',
  userid: users[1].id,
};

const mockArticles: Article[] = [article1, article2];

export default mockArticles;
