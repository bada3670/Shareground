import { db } from 'fb';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import Card from 'components/Card';
import { useEffect, useState } from 'react';

interface Datum {
  id: string;
  info: DocumentData;
}

export default function Wrote() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Datum[]>([]);
  const userid = useSelector((state: AuthState) => state.auth.id);

  useEffect(() => {
    (async () => {
      const queryMade = query(collection(db, 'articles'), where('userid', '==', userid));
      const snapshot = await getDocs(queryMade);
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        info: doc.data(),
      }));
      setLoading(false);
      setData(result);
    })();
  }, []);

  if (loading) {
    return (
      <>
        <h1>작성</h1>
        <section>로딩 중</section>;
      </>
    );
  }

  if (data.length === 0) {
    return (
      <>
        <h1>작성</h1>
        <section>아직 작성하신 것이 없습니다.</section>;
      </>
    );
  }

  return (
    <section>
      <h1>작성</h1>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
    </section>
  );
}
