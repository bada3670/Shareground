import fb from 'fb';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState } from 'reducers/auth';
import authReducer from 'reducers/auth';
import dateNumToStr from 'utils/dateNumToStr';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import style from 'styles/pages/article.module.scss';
import { useRouter } from 'next/router';

interface Article {
  id: string;
  userid: string;
  username: string;
  category: string;
  date: string;
  title: string;
  explanation: string;
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

  const { id: currentUserid, wrote } = useSelector((state: AuthState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const db = getFirestore(fb);

  const click$edit = () => {
    router.push(`/edit/${article.id}`);
  };
  const click$delete = async () => {
    alert('삭제하시겠습니까?');
    try {
      // 삭제하기
      await deleteDoc(doc(db, 'articles', article.id));
      // 삭제한 사실 user에 반영하기
      const newWrote = wrote.filter((articleid) => articleid !== article.id);
      await updateDoc(doc(db, 'users', article.userid), {
        wrote: newWrote,
      });
      dispatch(authReducer.actions.changeWrote({ wrote: newWrote }));
      // 삭제 처리 성공 페이지로 이동
      router.push('/article/deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={style['content']}>
      <section className={style['section']}>
        <div>카테고리: {article.category}</div>
        <div>작성일: {article.date}</div>
        <div>작성자: {article.username}</div>
      </section>
      <h1 className={style['title']}>{article.title}</h1>
      <hr />
      <p className={style['content']}>{article.explanation}</p>
      {currentUserid === article.userid && (
        <div className={style['delete']}>
          <button onClick={click$edit}>수정</button>
          <button onClick={click$delete}>삭제</button>
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const db = getFirestore(fb);
  const snapArticle = await getDoc(doc(db, 'articles', context.query.id));
  if (!snapArticle.exists()) {
    return {
      props: {
        status: 'no article',
        article: null,
      },
    };
  }
  const { userid, category, date, title, explanation } = snapArticle.data();
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
  };

  return {
    props: {
      status: 'succeeded',
      article,
    },
  };
}
