import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import Edit from 'components/edit/Edit';
import style from 'styles/pages/write.module.scss';

export default function () {
  const router = useRouter();
  const authState = useSelector((state: AuthState) => state.auth);
  const [article, setArticle] = useState<DocumentData | null | undefined>(undefined);
  const [articleid, setArticleid] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (router.query.id && typeof router.query.id !== 'object') {
        const resArticle = await fetch(`/api/articles?doc=${router.query.id}`);
        if (resArticle.status !== 200) {
          setArticle(null);
        } else {
          const { data: dataArticle } = await resArticle.json();
          setArticle(dataArticle);
          setArticleid(router.query.id);
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
