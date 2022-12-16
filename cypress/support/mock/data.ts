// users
export const user1 = {
  id: 'Bgj6ld8SyhatK2ODWfVj4eBS8p72',
  name: 'asdf',
  photo: Cypress.env('defaultProfilePhoto'),
  email: 'asdf@gmail.com',
  password: 'asdf1234',
};
export const user2 = {
  id: '7YgeI4Wr9YOswBtPyVFiUUHq9Pn1',
  name: 'qwer',
  photo: Cypress.env('defaultProfilePhoto'),
};

// articles
export const article1 = {
  articleid: 'aaaaaa',
  category: 'science',
  comments: [
    {
      content: 'mock 댓글 1',
      date: 1670915519101,
      id: 'comment-id-1-1',
      writerid: 'Bgj6ld8SyhatK2ODWfVj4eBS8p72',
    },
  ],
  date: 1670915520101,
  explanation: 'mock 글 1의 설명입니다.',
  fileRef: null,
  fileType: null,
  fileURL: null,
  interestPeople: [],
  title: 'mock 글 1',
  userid: '7YgeI4Wr9YOswBtPyVFiUUHq9Pn1',
  username: 'qwer',
};

export const article2 = {
  articleid: 'bbbbbb',
  category: 'science',
  comments: [
    {
      content: 'mock 댓글 2',
      date: 1670916619101,
      id: 'comment-id-2-1',
      writerid: '7YgeI4Wr9YOswBtPyVFiUUHq9Pn1',
    },
  ],
  date: 1669915520101,
  explanation: 'mock 글 2의 설명입니다.',
  fileRef: null,
  fileType: null,
  fileURL: null,
  interestPeople: [],
  title: 'mock 글 2',
  userid: 'Bgj6ld8SyhatK2ODWfVj4eBS8p72',
  username: 'asdf',
};

export const articles = [article1, article2];

// search
export const searchList = [
  {
    id: 'aaaaaa',
    title: 'mock 글 1',
  },
  {
    id: 'bbbbbb',
    title: 'mock 글 2',
  },
];
export function mockSearch() {
  cy.intercept(
    {
      method: 'GET',
      url: '**/api/search',
    },
    {
      statusCode: 200,
      body: { searchList },
    }
  );
}
