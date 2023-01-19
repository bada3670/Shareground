import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import getSsrApi from 'utils/getSsrApi';
import dateNumToStr from 'utils/dateNumToStr';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import ToEdit from 'components/article/ToEdit';
import Delete from 'components/article/Delete';
import InterestButton from 'components/article/InterestButton';
import CommentForm from 'components/article/CommentForm';
import Comments from 'components/article/Comments';
import style from 'styles/pages/article.module.scss';
import { Context } from 'utils/typeContext';

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
        <div id="article__category">카테고리: {article.category}</div>
        <div id="article__date">작성일: {article.date}</div>
        <div id="article__writer">작성자: {article.username}</div>
      </section>
      <h1 className={style['title']} id="article__title">
        {article.title}
      </h1>
      <hr />
      <p className={style['explanation']} id="article__explanation">
        {article.explanation}
      </p>
      {article.fileURL && (
        <div className={style['file']} id="article__file">
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
      <h2 className={style['comment-title']} id="article__comment-title">
        댓글
      </h2>
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
  const response = await fetch(`${getSsrApi(context)}/articles?ar=${context.query.id}`);

  if (response.status !== 200) {
    return {
      props: {
        status: 'error',
        message: '죄송합니다. 자료를 가져오지 못했습니다.',
        article: null,
      },
    };
  }

  const data = await response.json();

  const {
    userid,
    username,
    category,
    date,
    title,
    explanation,
    fileRef,
    fileURL,
    interestPeople,
    comments,
  } = data;

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
