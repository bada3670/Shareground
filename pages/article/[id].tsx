import { db } from 'fb';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import dateNumToStr from 'utils/dateNumToStr';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import style from 'styles/pages/article.module.scss';
import ToEdit from 'components/article/ToEdit';
import Delete from 'components/article/Delete';
import Interest from 'components/article/Interest';
import CommentForm from 'components/article/CommentForm';
import Comments from 'components/article/Comments';

interface Article {
  id: string;
  userid: string;
  username: string;
  category: string;
  date: string;
  title: string;
  explanation: string;
  fileURL: string;
  interestPeople: string[];
}

export default function ({
  status,
  article,
}: {
  status: string;
  article: Article | null;
}) {
  if (status === 'no article') {
    return <main className={style['no-content']}>요청하신 자료가 없습니다.</main>;
  }

  if (status === 'no user') {
    return (
      <main className={style['no-content']}>
        요청하신 자료의 저자를 찾을 수 없습니다.
      </main>
    );
  }

  if (article === null) {
    return <></>;
  }

  const { id: currentUserid } = useSelector((state: AuthState) => state.auth);

  return (
    <main className={style['content']}>
      <section className={style['section']}>
        <div>카테고리: {article.category}</div>
        <div>작성일: {article.date}</div>
        <div>작성자: {article.username}</div>
      </section>
      <h1 className={style['title']}>{article.title}</h1>
      <hr />
      <p className={style['explanation']}>{article.explanation}</p>
      <div className={style['file']}>
        <a href={article.fileURL}>파일 다운로드</a>
      </div>
      {currentUserid === article.userid && (
        <div className={style['edit-delete']}>
          <ToEdit articleid={article.id} />
          <Delete articleid={article.id} db={db} />
        </div>
      )}
      {currentUserid && currentUserid !== article.userid && (
        <Interest
          articleid={article.id}
          currentUserid={currentUserid}
          interestPeople={article.interestPeople}
        />
      )}
      <h2 className={style['comment-title']}>댓글</h2>
      {currentUserid && <CommentForm writerid={currentUserid} articleid={article.id} />}
      <Comments articleid={article.id} currentUserid={currentUserid} />
    </main>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const snapArticle = await getDoc(doc(db, 'articles', context.query.id));
  if (!snapArticle.exists()) {
    return {
      props: {
        status: 'no article',
        article: null,
      },
    };
  }
  const { userid, category, date, title, explanation, fileURL, interestPeople } =
    snapArticle.data();
  const snapUser = await getDoc(doc(db, 'users', userid));
  if (!snapUser.exists()) {
    return {
      props: {
        status: 'no user',
        article: null,
      },
    };
  }
  const { name: username } = snapUser.data();
  const article = {
    id: context.query.id,
    userid,
    username,
    category: categoryEngToKor(category),
    date: dateNumToStr(date),
    title,
    explanation,
    fileURL,
    interestPeople,
  };

  return {
    props: {
      status: 'succeeded',
      article,
    },
  };
}
