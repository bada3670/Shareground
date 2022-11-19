import { useRouter } from 'next/router';
import fb from 'fb';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dateNumToStr from 'utils/dateNumToStr';

// interface Article {
//   userid: string;
//   category: string;
//   date: number;
//   title: string;
//   explanation: string;
// }

export default function () {
  const router = useRouter();
  const db = getFirestore(fb);
  const [articles, setArticles] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (!router.query.id || typeof router.query.id === 'object') {
      return;
    }

    (async () => {
      const queryMade = query(
        collection(db, 'articles'),
        where('category', '==', router.query.id)
      );
      const snapshot = await getDocs(queryMade);
      const data = snapshot.docs.map((result) => result.data());
      setArticles(data);
    })();
  }, [router.isReady]);

  return (
    <div>
      {articles.map(({ title, date }) => {
        return (
          <div>
            <div>{title}</div>
            <div>{dateNumToStr(date)}</div>
          </div>
        );
      })}
    </div>
  );
}
