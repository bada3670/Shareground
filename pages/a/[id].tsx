import { useRouter } from 'next/router';
import fb from 'fb';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dateNumToStr from 'utils/dateNumToStr';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';

interface Article {
  username: string;
  category: string;
  date: string;
  title: string;
  explanation: string;
}

export default function () {
  const router = useRouter();
  const db = getFirestore(fb);
  const [artcleInfo, setArticleInfo] = useState<Article>({
    username: '',
    category: '',
    date: '',
    title: '',
    explanation: '',
  });

  useEffect(() => {
    if (!router.query.id || typeof router.query.id === 'object') {
      return;
    }
    const fbRefArticle = doc(db, 'articles', router.query.id);
    (async () => {
      const fbSnapArticle = await getDoc(fbRefArticle);
      if (!fbSnapArticle.exists()) {
        return;
      }
      const { userid, category, date, title, explanation } = fbSnapArticle.data();
      const fbSnapUser = await getDoc(doc(db, 'users', userid));
      if (!fbSnapUser.exists()) {
        return;
      }
      const { name: username } = fbSnapUser.data();
      setArticleInfo({
        username,
        category: categoryEngToKor(category),
        date: dateNumToStr(date),
        title,
        explanation,
      });
    })();
  }, [router.isReady]);

  return (
    <main>
      <div>{artcleInfo.category}</div>
      <h1>{artcleInfo.title}</h1>
      <div>{artcleInfo.date}</div>
      <div>작성자: {artcleInfo.username}</div>
      <p>{artcleInfo.explanation}</p>
    </main>
  );
}
