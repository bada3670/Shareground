import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import style from 'styles/pages/create.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fb from 'fb';
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';
import Edit from 'components/Edit';

export default function profile() {
  const db = getFirestore(fb);
  const router = useRouter();
  const authState = useSelector((state: AuthState) => state.auth);
  const [article, setArticle] = useState<DocumentData | null | undefined>(undefined);
  const [articleid, setArticleid] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (router.query.id && typeof router.query.id !== 'object') {
        const snap = await getDoc(doc(db, 'articles', router.query.id));
        if (snap.exists()) {
          setArticle(snap.data());
          setArticleid(router.query.id);
        } else {
          setArticle(null);
        }
      }
    })();
  }, [router.isReady]);

  if (article === undefined) {
    return <main className={style['not-confirmed']}>글을 가져오고 있습니다.</main>;
  }

  if (article === null) {
    return <main className={style['not-confirmed']}>해당 글이 존재하지 않습니다.</main>;
  }

  if (article.userid !== authState.id) {
    return (
      <main className={style['not-confirmed']}>작성자만 글을 수정할 수 있습니다.</main>
    );
  }

  return (
    <main className={style['confirmed']}>
      <Edit data={article} articleid={articleid} />
    </main>
  );
}
