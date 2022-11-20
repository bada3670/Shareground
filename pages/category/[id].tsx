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

export default function ({ data }: { data: DocumentData[] }) {
  const [articles, setArticles] = useState<DocumentData[]>([]);

  useEffect(() => {
    setArticles(data);
  }, []);

  return (
    <div>
      {articles.map(({ title, date }, index) => {
        return (
          <div key={index}>
            <div>{title}</div>
            <div>{dateNumToStr(date)}</div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const db = getFirestore(fb);
  const queryMade = query(
    collection(db, 'articles'),
    where('category', '==', context.query.id),
    // orderBy('date', 'desc'),
    limit(1)
  );
  const snapshot = await getDocs(queryMade);
  const data = snapshot.docs.map((result) => result.data());

  return {
    props: {
      data,
    },
  };
}
