import { Context } from 'utils/typeContext';
import getSsrApi from 'utils/getSsrApi';
import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import dateNumToStr from 'utils/dateNumToStr';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import style from 'styles/pages/article.module.scss';
import ToEdit from 'components/article/ToEdit';
import Delete from 'components/article/Delete';
import InterestButton from 'components/article/InterestButton';
import CommentForm from 'components/article/CommentForm';
import Comments from 'components/article/Comments';

export interface CommentType {
  id: string;
  content: string;
  date: number;
  writerid: string;
}

interface Article {
  id: string;
  userid: string;
  username: string;
  category: string;
  date: string;
  title: string;
  explanation: string;
  fileRef: string | null;
  fileURL: string | null;
  interestPeople: string[];
  comments: CommentType[];
}

interface Props {
  status: string;
  message: string;
  article: Article | null;
}

export default function ({ status, message, article }: Props) {
  if (status === 'error') {
    return <main className={style['no-content']}>{message}</main>;
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
      {article.fileURL && (
        <div className={style['file']}>
          <a href={article.fileURL}>파일 다운로드</a>
        </div>
      )}
      {currentUserid === article.userid && (
        <div className={style['edit-delete']}>
          <ToEdit articleid={article.id} />
          <Delete articleid={article.id} fileRef={article.fileRef} />
        </div>
      )}
      {currentUserid && currentUserid !== article.userid && (
        <InterestButton
          articleid={article.id}
          currentUserid={currentUserid}
          interestPeople={article.interestPeople}
        />
      )}
      <h2 className={style['comment-title']}>댓글</h2>
      {currentUserid && <CommentForm writerid={currentUserid} articleid={article.id} />}
      <Comments
        articleid={article.id}
        comments={article.comments}
        currentUserid={currentUserid}
      />
    </main>
  );
}

export async function getServerSideProps(context: Context) {
  // article 정보
  const resArticle = await fetch(
    `${getSsrApi(context)}/articles?doc=${context.query.id}`
  );
  if (resArticle.status !== 200) {
    const { message } = await resArticle.json();
    return {
      props: {
        status: 'error',
        message,
        article: null,
      },
    };
  }
  const { data: dataArticle } = await resArticle.json();
  const {
    userid,
    category,
    date,
    title,
    explanation,
    fileRef,
    fileURL,
    interestPeople,
    comments,
  } = dataArticle;

  // user 정보
  const resUser = await fetch(`${getSsrApi(context)}/user?user=${userid}`);
  if (resUser.status !== 200) {
    return {
      props: {
        status: 'error',
        message: '요청하진 자료의 저자를 찾을 수 없습니다.',
        article: null,
      },
    };
  }
  const { name: username } = await resUser.json();

  // 완성본
  const article = {
    id: context.query.id,
    userid,
    username,
    category: categoryEngToKor(category),
    date: dateNumToStr(date),
    title,
    explanation,
    fileRef,
    fileURL,
    interestPeople,
    comments,
  };

  return {
    props: {
      status: 'succeeded',
      message: '',
      article,
    },
  };
}
