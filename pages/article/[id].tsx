import fb from 'fb';
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

export default function ({ data }: { data: Article | string }) {
  const [artcleInfo, setArticleInfo] = useState<Article>({
    id: '',
    userid: '',
    username: '',
    category: '',
    date: '',
    title: '',
    explanation: '',
  });

  if (typeof data === 'string') {
    return <main className={style['no-content']}>요청하신 자료가 없습니다!</main>;
  }

  const { id: currentUserid, wrote } = useSelector((state: AuthState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const db = getFirestore(fb);

  useEffect(() => {
    setArticleInfo(data);
  }, []);

  const click$edit = () => {
    router.push(`/edit/${artcleInfo.id}`);
  };
  const click$delete = async () => {
    alert('삭제하시겠습니까?');
    try {
      // 삭제하기
      await deleteDoc(doc(db, 'articles', data.id));
      // 삭제한 사실 user에 반영하기
      const newWrote = wrote.filter((articleid) => articleid !== data.id);
      await updateDoc(doc(db, 'users', data.userid), {
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
        <div>카테고리: {artcleInfo.category}</div>
        <div>작성일: {artcleInfo.date}</div>
        <div>작성자: {artcleInfo.username}</div>
      </section>
      <h1 className={style['title']}>{artcleInfo.title}</h1>
      <hr />
      <p className={style['content']}>{artcleInfo.explanation}</p>
      {currentUserid === artcleInfo.userid && (
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
  const fbSnapArticle = await getDoc(doc(db, 'articles', context.query.id));
  if (!fbSnapArticle.exists()) {
    return {
      props: {
        data: 'no article',
      },
    };
  }
  const { userid, category, date, title, explanation } = fbSnapArticle.data();
  const fbSnapUser = await getDoc(doc(db, 'users', userid));
  if (!fbSnapUser.exists()) {
    return;
  }
  const { name: username } = fbSnapUser.data();
  const data = {
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
      data,
    },
  };
}
